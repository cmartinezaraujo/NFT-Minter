import {React, useState, useContext} from 'react'
import './create.css'
import { NFTContext } from '../../Context/NFTContext'
import { NFT } from '../NFT/NFT'
import {Loading} from '../Loading/Loading'
import gradient from '../../../assets/gradient.jpg'

export const Create = () => {

  const {connectWallet, currentAccount, handleChange, sendTransaction, formData, isLoading} = useContext(NFTContext);
  
  // console.log(currentAccount);
  

    const handleSubmit = (e) => {
        const {address, ammount, name, owner, message, file} = formData;
        e.preventDefault();
    
        if(!address || !ammount|| !name || !owner || !message || !file) return;
    
         sendTransaction();
    
      }
    
    const grabImage = (files) => {
        console.log(files[0]);
    }

    //funtion to check character limit in string
  return (
    <section className='create app__container'>

      <div className='NFT-container'>
        <NFT 
          owner = {formData.owner} 
          info={formData.message}  
          img ={
            (formData.file != '') ? URL.createObjectURL(formData.file) : '../../../assets/isometric-nft.jpg'
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
            <input className='input-field backdrop-blur' placeholder='Address' name="address" type="text" onChange={(e) => handleChange(e, 'address')}/>
            <input className='input-field backdrop-blur' placeholder='Amount (ETH)' name="ammount" type="number" onChange={(e) => handleChange(e, 'ammount')}/>
            <input className='input-field backdrop-blur' placeholder='NFT name' name="name" type="text" onChange={(e) => handleChange(e, 'name')}/>
            <input className='input-field backdrop-blur' placeholder='Owner' name="owner" type="text" onChange={(e) => handleChange(e, 'owner')}/>
            <input className='input-field backdrop-blur' placeholder='Message' name="message" type="text" onChange={(e) => handleChange(e, 'message')}/>
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
