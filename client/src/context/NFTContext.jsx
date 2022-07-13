import React, {useState, useEffect} from "react";
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

/*
* NFTProvider component is used to wrap the entire application.
* It provides the NFTContext to all the components.
* It also provides the functions to interact with the contract. 
*/
export const NFTProvider = ({children}) => {
    /*
    * The state of the NFTContext is an object that contains the following properties:
    * transactions: an array of objects that contains the information of the NFTs
    * hasMetaMask: a boolean that indicates if the user has metamask installed
    * formData: an object that contains the current form data for the transaction to be made
    * isLoading: a boolean that indicates if the app is processing a transaction
    * transactionCount: a number that indicates the number of transactions made
    * connectWallet: a function that connects the user's wallet
    * currentAccount: the address of the user's wallet
    * status: a string that indicates the status of the loading 
    */

    const [transactions, setTransactions] = useState([]);
    const [hasMetaMask, setHasMetaMask] = useState(true);
    const [currentAccount,  setCurrentAccount] = useState('');
    const [formData, setFormData] = useState({address:'', ammount:'', name: '',  owner: '', message: '', file: ''});
    const [isLoading, setIsLoading] = useState(false);
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'));
    const [status, setStatus] = useState("Loading...");

    /*
    * @param {object} e - the event object
    * @param {string} name - the name of the input field
    * @returns {void}
    * @description - This function is used to update the formData state. 
    */
    const handleChange = (e, name) => {
        setFormData((prevState) => ({
             ...prevState, [name]: (name === `file`) ? e.target.files[0] : e.target.value
        }));
    }

    /*
    * @returns {void}
    * @description - This function is used to request the URI's of the NFTs from the contract.
    */
    const getAllNfts = async () => {
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

            getTransactionData(nfts);
    }

    /*
    * @param {array} nfts - an array of strings that contains the uris of the NFTs
    * @returns {void}
    * @description - This function is used to request the data of the NFTs using the uris.
    */
    const getTransactionData = async(nfts) => {

        let nftData = [];
            for(let i = 0; i < nfts.length; i++) {

                const resp = await fetch(`https://nft-minted-meta.s3.us-west-2.amazonaws.com/${nfts[i]}`)
                .catch(function (error) {
                    console.log(error);
                });

                const data = await resp.json();
                nftData.push(data);
            }

            setTransactions(nftData);
    }


    /*
    * @returns {void}
    * @description - This function is used to check if there is a wallet that can be used. 
    */
    const connectWallet = async () => {
        try {
            if(!ethereum) {
                setCurrentAccount('');
                setHasMetaMask(false);
                return;
            }

            setHasMetaMask(true);
    
            const accounts = await ethereum.request({method: 'eth_requestAccounts'});

            if(accounts.length){
                setCurrentAccount(accounts[0]);

            }else{
                setCurrentAccount('');
            }

        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object.");
        }
    }

    /*
    * @param {object} formData - an object that contains the form data for the NFT.
    * @returns {string} - a string of the URI to be used for the NFT.
    * @description - This function is used to create the URI for the NFT.
    */
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

    /*
    * @returns {void}
    * @description - This function is used to mint the NFT.
    */
    const sendTransaction = async () => {
        try{
            if(!ethereum) return alert('Please install MetaMask');

            const {ammount, name, owner, message, file} = formData;


            const galleryContract = getEthereumContract();

        setStatus("Uploading image...");
            const tokenCID = await uploadNftData(formData);
        
        if(tokenCID === "error") return alert("Error uploading NFT data.");

        setStatus("Minting NFT...");
            const parsedAmount = ethers.utils.parseEther(ammount);
            const transactionHash = await galleryContract.safeMint(currentAccount, tokenCID, {
                from: currentAccount,
                value: parsedAmount._hex
            });
           setIsLoading(true);
            await transactionHash.wait();
           setIsLoading(false);

           const nftCount = await galleryContract.totalSupply();
           setTransactionCount(parseInt(nftCount));

           addNewTransaction(tokenCID);
        } catch(error){
            setIsLoading(false);
            console.log(error);
            return alert("Transaction failed.");
        }
    }

    /*
    * @param {string} tokenCID - a string that contains the URI of the NFT.
    * @returns {void}
    * @description - This function is used to add the new NFT to the list of transactions instead of requesting all of them again.
    */

    const addNewTransaction = async (transaction) => {

        const resp = await fetch(`https://nft-minted-meta.s3.us-west-2.amazonaws.com/${transaction}`)
        .catch(function (error) {
            console.log(error);
        });

        const data = await resp.json();
        let nftData = [...transactions];
        nftData.push(data);

        setTransactions(nftData);
    }

    useEffect(() => {
        connectWallet();
        getAllNfts();
        setHasMetaMask(true);
    }, []);

    return(
        <NFTContext.Provider value={{connectWallet, currentAccount, handleChange, sendTransaction, formData, transactions, transactionCount, isLoading, status, hasMetaMask}}>
            {children}
        </NFTContext.Provider>
    );
}