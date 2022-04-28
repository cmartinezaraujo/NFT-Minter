import React, {useContext, useState, useEffect} from "react";
import {ethers} from "ethers";
import { contractABI, contractAddress } from "../utils/constants";
import { uploadMetaData } from "../utils/metaData.js";
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
    const [currentAccount,  setCurrentAccount] = useState('');
    const [formData, setFormData] = useState({address:'', ammount:'', name: '',  owner: '', message: '', file: ''});
    const [isLoading, setIsLoading] = useState(false);
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'));
    const [transactions, setTransactions] = useState([]);

    const handleChange = (e, name) => {
        setFormData((prevState) => ({
             ...prevState, [name]: (name === `file`) ? e.target.files[0] : e.target.value
        }));
        console.log(formData);
    }

    const getAllNfts = async () => {
        try {
            if(!ethereum) return alert('Please install MetaMask');
            const galleryContract = getEthereumContract();

            const nfts = [];
            // const token = await galleryContract.tokenURI(0);
            //console.log("The token", token);

            for(let i = 0; i < transactionCount; i++) {
                const token = await galleryContract.tokenURI(i);
                nfts.push(token);
            }

            const nftData = [];
            for(let i = 0; i < transactionCount; i++) {
                
                const resp = await fetch(`https://ipfs.io/ipfs/${nfts[i]}`);
                const data = await resp.json();
                nftData.push(data);
            }

            console.log("nft data" ,nftData);


             setTransactions(nftData);

        } catch (error) {
            console.log(error);
        }
    }

    const checkIfWalletIsConnected = async () => {

        try {
            if(!ethereum) {
                setCurrentAccount('');
                return alert('Please install MetaMask');
            }
    
            const accounts = await ethereum.request({method: 'eth_accounts'});
    
            if(accounts.length){
                setCurrentAccount(accounts[0]);
    
                getAllNfts();
            }else{
                console.log('No accounts found');
            }
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object.");
        }

    }

    const checkIfNftsExist = async () => {
        try {
            if(!ethereum) {
                setCurrentAccount('');
                return alert('Please install MetaMask');
            }

            const galleryContract = getEthereumContract();
            const nftCount = await galleryContract.totalSupply();
            console.log("NFT count:",parseInt(nftCount));
            setTransactionCount(parseInt(nftCount));
            window.localStorage.setItem('transactionCount', parseInt(nftCount));
        } catch (error) {
            throw new Error("No ethereum object.");
        }
    }
    

    const connectWallet = async () => {
        try {
            if(!ethereum) {
                return alert('Please install MetaMask');
            }

            const accounts = await ethereum.request({method: 'eth_requestAccounts'});

            setCurrentAccount(accounts[0]);
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object.");
        }
    }

    const uploadNftData = async (formData) => {
        let tokenCID;

        let form = new FormData();
        form.append('file', formData.file);
        form.append('name', formData.name);
        form.append('owner', formData.owner);
        form.append('message', formData.message);
        console.log("form data sent:", formData);

        await axios.post('https://cma-gallery-api.herokuapp.com/upload/', form, {
        headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(function (response) {
            tokenCID = response.data;
            console.log(response);
            console.log(tokenCID);
        })
        .catch(function (error) {
            console.log(error);
        });

        return tokenCID;
    }

    const sendTransaction = async () => {
        try{
            // if(!ethereum) return alert('Please install MetaMask');

            // console.log("Blocked");
            // return;
            const {address, ammount, name, owner, message, file} = formData;


            // const galleryContract = getEthereumContract();
            // console.log("Constract obj",galleryContract);

            const tokenCID = await uploadNftData(formData);
            console.log("Meta data", tokenCID);

            // const parsedAmount = ethers.utils.parseEther(ammount);
            // const transactionHash = await galleryContract.safeMint(currentAccount, tokenCID, {
            //     from: currentAccount,
            //     value: parsedAmount._hex
            // });
        //    setIsLoading(true);
            // console.log(`Loading - ${transactionHash.hash}`);
            // await transactionHash.wait();
        //    setIsLoading(false);
            // console.log(`Success - ${transactionHash.hash}`);

            // const nftCount = await galleryContract.totalSupply();
            // console.log("Supply", nftCount)
        //    setTransactionCount(transactionCount.toNumber());
            window.location.reload();
        } catch(error){
            console.log(error);
            throw new Error("Traansaction failed");
        }
    }

    useEffect(() => {
        checkIfWalletIsConnected();
        checkIfNftsExist();
    }, []);

    return(
        <NFTContext.Provider value={{connectWallet, currentAccount, handleChange, sendTransaction, formData, transactions, transactionCount}}>
            {children}
        </NFTContext.Provider>
    );
}