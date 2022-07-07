import React, {useContext, useState, useEffect} from "react";
import {ethers} from "ethers";
import { contractABI, contractAddress } from "../utils/constants";
import axios from 'axios';

export const NFTContext = React.createContext();

const {ethereum} = window;

const getEthereumContract = () => {
    const porovider = new ethers.providers.Web3Provider(ethereum);
    const signer = porovider.getSigner();
    const cmGalleryContract = new ethers.Contract(contractAddress, contractABI, signer);

    return cmGalleryContract;
}

export const NFTProvider = ({children}) => {
    const [hasMetaMask, setHasMetaMask] = useState(false);
    const [currentAccount,  setCurrentAccount] = useState('');
    const [formData, setFormData] = useState({address:'', ammount:'', name: '',  owner: '', message: '', file: ''});
    const [isLoading, setIsLoading] = useState(false);
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'));
    const [transactions, setTransactions] = useState([]);
    const [status, setStatus] = useState("Loading...");

    const handleChange = (e, name) => {
        setFormData((prevState) => ({
             ...prevState, [name]: (name === `file`) ? e.target.files[0] : e.target.value
        }));
    }

    const getAllNfts = async () => {
        try {
            
            let nfts = [];
            let count = 0;
            
            const res = await axios.get('https://juiwtoxgm0.execute-api.us-west-2.amazonaws.com/Get-All-Nfts')
            .then(function (response) {
                nfts = response.data.uris;
                count = response.data.count;
            })
            .catch(function (error) {
                console.log(error);
            });
            
            setTransactionCount(parseInt(count));
            window.localStorage.setItem('transactionCount', parseInt(count));

            const nftData = [];
            for(let i = 0; i < transactionCount; i++) {
                
                const resp = await fetch(`https://nft-minted-meta.s3.us-west-2.amazonaws.com/${nfts[i]}`);
                const data = await resp.json();
                nftData.push(data);
            }


             setTransactions(nftData);

        } catch (error) {
            console.log(error);
        }
    }

    const checkIfWalletIsConnected = async () => {

        try {
            if(!ethereum) {
                setCurrentAccount('');
                setHasMetaMask(false);
                return;
            }
    
            const accounts = await ethereum.request({method: 'eth_accounts'});
    
            if(accounts.length){
                setCurrentAccount(accounts[0]);

            }else{
                console.log('No accounts found');
            }
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object.");
        }

    }
    

    const connectWallet = async () => {
        try {
            if(!ethereum) {
                setCurrentAccount('');
                setHasMetaMask(false);
                return;
            }

            const accounts = await ethereum.request({method: 'eth_requestAccounts'});

            setCurrentAccount(accounts[0]);
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object.");
        }
    }

    const uploadNftData = async (formData) => {
        setIsLoading(true);
        let imgCID
        let tokenCID;


        await axios.post('https://juiwtoxgm0.execute-api.us-west-2.amazonaws.com/NFT-Data-Upload', formData.file, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'content-type': formData.file.type
          }
        })
        .then(function (response) {
            imgCID = response.data.data;
            console.log("Image CID response", imgCID);
        })
        .catch(function (error) {
            console.log(error);
            return "error";
        });

        const metaData = {
            name: formData.name,
            creator: formData.owner,
            description: formData.message,
            image: imgCID
        }

        setStatus("Uploading meta data...");
        await axios.post('https://juiwtoxgm0.execute-api.us-west-2.amazonaws.com/NFT-Meta-Upload', metaData, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'content-type': 'application/json'
            }
        })
        .then(function (response) {
            tokenCID = response.data.data;
            console.log("Token ID response", tokenCID);
        })
        .catch(function (error) {
            console.log(error);
            return "error";
        });

        return tokenCID;
    }

    const sendTransaction = async () => {
        try{
            if(!ethereum) return alert('Please install MetaMask');

            const {address, ammount, name, owner, message, file} = formData;


            const galleryContract = getEthereumContract();

        setStatus("Uploading image...");
            const tokenCID = await uploadNftData(formData);

        setStatus("Minting NFT...");
            const parsedAmount = ethers.utils.parseEther(ammount);
            const transactionHash = await galleryContract.safeMint(currentAccount, tokenCID, {
                from: currentAccount,
                value: parsedAmount._hex
            });
           setIsLoading(true);
            console.log(`Loading - ${transactionHash.hash}`);
            await transactionHash.wait();
           setIsLoading(false);
            console.log(`Success - ${transactionHash.hash}`);

            const nftCount = await galleryContract.totalSupply();
            console.log("Supply", nftCount)
           setTransactionCount(parseInt(nftCount));
            window.location.reload();
        setIsLoading(false);
        } catch(error){
            setIsLoading(false);
            console.log(error);
            throw new Error("Transaction failed");
        }
    }

    useEffect(() => {
        checkIfWalletIsConnected();
        getAllNfts();
    }, []);

    return(
        <NFTContext.Provider value={{connectWallet, currentAccount, handleChange, sendTransaction, formData, transactions, transactionCount, isLoading, status}}>
            {children}
        </NFTContext.Provider>
    );
}