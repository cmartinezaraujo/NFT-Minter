import {React, useContext} from 'react'
import './create.css'
import { NFTContext } from '../../context/NFTContext'
import { NFT } from '../NFT/NFT'
import {Loading} from '../Loading/Loading'
import defaultNFT from '../../../assets/isometric-nft.jpg';

export const Create = () => {

  const {connectWallet, currentAccount, handleChange, sendTransaction, formData, isLoading, hasMetaMask} = useContext(NFTContext);

    const handleSubmit = (e) => {
        const {address, ammount, name, owner, message, file} = formData;
        e.preventDefault();
    
        if(!address || !ammount|| !name || !owner || !message || !file) return;
    
         sendTransaction();
    
      }
    
    const grabImage = (files) => {
        console.log(files[0]);
    }

  return (
    <section id="create" className='create app__container'>

      <div className='NFT-container'>
        <NFT 
          owner = {formData.owner} 
          info={formData.message}  
          img ={
            (formData.file != '') ? URL.createObjectURL(formData.file) : defaultNFT
          } 
          title={formData.name}/>
      </div>

      {isLoading ? (<Loading />) : (!currentAccount) ? 
      (
        <div className='connect-prompt'>
          <h3>Connect your Wallet</h3>
          <p>Connect your Etherum wallet useing MetaMask. When you are ready to mint
            your NFT you will be prompted by MetaMask to approave the transaction.
            A minimum of .1 ETH is required to mint your NFT.
          </p>
          {!hasMetaMask && (
            <div className='app__prompt'>
              <p>MetaMask has not been detected on your browser. Please <a href="https://metamask.io" target="_blank" rel="noopener noreferrer">Download</a> MetaMask and before trying to connect your wallet. 
              You may need to reload your window after the MetaMask is installed.</p>
            </div>
          )}
            <button 
                type='button' 
                className='button-send'
                onClick={connectWallet}
                >Connect Wallet</button>
        </div>
      )
      :(
      <div className='form-container'>
        <form className='create-form'>
            <p className='form-account'>MetaMask Address: {currentAccount.slice(0, 5)}...{currentAccount.slice(currentAccount.length - 4)}</p>
            <input className='input-field backdrop-blur' placeholder='Amount (ETH) Minimum .1' name="ammount" type="number" onChange={(e) => handleChange(e, 'ammount')}/>
            <input className='input-field backdrop-blur' placeholder='NFT name' name="name" type="text" onChange={(e) => handleChange(e, 'name')}/>
            <input className='input-field backdrop-blur' placeholder='Creator' name="owner" type="text" onChange={(e) => handleChange(e, 'owner')}/>
            <input className='input-field backdrop-blur' placeholder='Description' name="message" type="text" onChange={(e) => handleChange(e, 'message')}/>
            <input className='input-browse backdrop-blur' type="file" name='file' onChange={(e) => handleChange(e, 'file')}/>
          

          <button 
              type='button' 
              className='button-send'
              onClick={handleSubmit}
              >Mint NFT</button>
         </form>         
      </div>
      )}

    </section>
  )
}
