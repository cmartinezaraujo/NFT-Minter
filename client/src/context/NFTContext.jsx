import React, {useContext, useState, useEffect} from "react";
import {ethers} from "ethers";
import { contractABI, contractAddress } from "../utils/constants";
// import { uploadMetaData } from "../utils/metaData.js";
import axios from 'axios';

export const NFTContext = React.createContext();

const {ethereum} = window;

//Function to get the contract instance
const getEthereumContract = () => {
    const porovider = new ethers.providers.Web3Provider(ethereum);
    const signer = porovider.getSigner();
    const cmGalleryContract = new ethers.Contract(contractAddress, contractABI, signer);

    return cmGalleryContract;
}

const getDefaultProvider = () => {
    const provider = new ethers.getDefaultProvider('ropsten');
    // const signer = provider.getSigner();
    const cmGalleryContract = new ethers.Contract(contractAddress, contractABI, provider);

    return cmGalleryContract;
}


export const NFTProvider = ({children}) => {
    const [hasMetaMask, setHasMetaMask] = useState(false);
    const [currentAccount,  setCurrentAccount] = useState('');
    const [formData, setFormData] = useState({address:'', ammount:'', name: '',  owner: '', message: '', file: ''});
    const [isLoading, setIsLoading] = useState(false);
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'));
    const [transactions, setTransactions] = useState([]);

    const handleChange = (e, name) => {
        setFormData((prevState) => ({
             ...prevState, [name]: (name === `file`) ? e.target.files[0] : e.target.value
        }));
        // console.log(formData.file);
        let data = new Blob([formData.file], {type: formData.type});
        console.log("data:", data);
    }

    const getAllNfts = async () => {
        try {
            const galleryContract = getDefaultProvider();
            const nftCount = await galleryContract.totalSupply();

            console.log("NFT count:",parseInt(nftCount));
            setTransactionCount(parseInt(nftCount));
            window.localStorage.setItem('transactionCount', parseInt(nftCount));

            // console.log("galleryContract:", await galleryContract.tokenURI(1));

            const nfts = [];
            // const token = await galleryContract.tokenURI(0);
            //console.log("The token", token);

            for(let i = 0; i < transactionCount; i++) {
                const token = await galleryContract.tokenURI(i);
                nfts.push(token);
            }

            console.log("The nfts", nfts);

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
                setHasMetaMask(false);
                return;
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
        let imgCID
        let tokenCID;

        // let form = new FormData();
        // form.append('file', formData.file);
        // form.append('name', formData.name);
        // form.append('owner', formData.owner);
        // form.append('message', formData.message);
        console.log("form data sent:", formData);
        //https://juiwtoxgm0.execute-api.us-west-2.amazonaws.com//NFT-Data-Upload
        //https://cma-gallery-api.herokuapp.com/upload/

        // let data = new Blob([formData.file], {type: formData.type});
        // console.log("data:", data);
        await axios.post('https://juiwtoxgm0.execute-api.us-west-2.amazonaws.com/NFT-Data-Upload', formData.file, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'content-type': formData.file.type
          }
        })
        .then(function (response) {
            imgCID = response.data.data;
            console.log("response", response);
            console.log("img ID", imgCID);
        })
        .catch(function (error) {
            console.log(error);
            return "error";
        });

        const metaData = {
            name: formData.name,
            owner: formData.owner,
            message: formData.message,
            imageCID: imgCID
        }

        await axios.post('https://juiwtoxgm0.execute-api.us-west-2.amazonaws.com/NFT-Meta-Upload', metaData, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'content-type': 'application/json'
            }
        })
        .then(function (response) {
            tokenCID = response.data.data;
            console.log("response", response);
            console.log("token ID", tokenCID);
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

            // console.log("Blocked");
            // return;
            const {address, ammount, name, owner, message, file} = formData;


            // const galleryContract = getEthereumContract();
            // console.log("Constract obj",galleryContract);

            const tokenCID = await uploadNftData(formData);
            console.log("Meta data", tokenCID);

        //     const parsedAmount = ethers.utils.parseEther(ammount);
        //     const transactionHash = await galleryContract.safeMint(currentAccount, tokenCID, {
        //         from: currentAccount,
        //         value: parsedAmount._hex
        //     });
        //    setIsLoading(true);
        //     console.log(`Loading - ${transactionHash.hash}`);
        //     await transactionHash.wait();
        //    setIsLoading(false);
        //     console.log(`Success - ${transactionHash.hash}`);

        //     const nftCount = await galleryContract.totalSupply();
        //     console.log("Supply", nftCount)
        //    setTransactionCount(transactionCount.toNumber());
        //     window.location.reload();
        } catch(error){
            console.log(error);
            throw new Error("Traansaction failed");
        }
    }

    useEffect(() => {
        checkIfWalletIsConnected();
        getAllNfts();
        // checkIfNftsExist();
    }, []);

    return(
        <NFTContext.Provider value={{connectWallet, currentAccount, handleChange, sendTransaction, formData, transactions, transactionCount}}>
            {children}
        </NFTContext.Provider>
    );
}