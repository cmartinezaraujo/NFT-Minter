import {React, useState, useContext} from 'react'
import './create.css'
import { NFTContext } from '../../Context/NFTContext'
import { NFT } from '../NFT/NFT'
import {Loading} from '../Loading/Loading'

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
    <section className='create'>

      <div className='NFT-container'>
        <NFT 
          owner = {formData.owner} 
          info={formData.message}  
          img ={
            (formData.file != '') ? URL.createObjectURL(formData.file) : 'https://www.placecage.com/200/200'
          } 
          title={formData.name}/>
      </div>

      {isLoading ? (<Loading />) : (
      <div className='form-container'>
        <form className='create-form'>
            <input className='input-field' placeholder='Address' name="address" type="text" onChange={(e) => handleChange(e, 'address')}/>
            <input className='input-field' placeholder='Amount (ETH)' name="ammount" type="number" onChange={(e) => handleChange(e, 'ammount')}/>
            <input className='input-field' placeholder='NFT name' name="name" type="text" onChange={(e) => handleChange(e, 'name')}/>
            <input className='input-field' placeholder='Owner' name="owner" type="text" onChange={(e) => handleChange(e, 'owner')}/>
            <input className='input-field' placeholder='Message' name="message" type="text" onChange={(e) => handleChange(e, 'message')}/>
            <input className='input-brows' type="file" name='file' onChange={(e) => handleChange(e, 'file')}/>

           

            {!currentAccount &&(
            <button type='button' onClick={connectWallet} >
              <p>
                Connect Wallet
              </p>
            </button>
          )}

            {!currentAccount ? 
            (<button 
              type='button' 
              className='button-disabled'
              >Send Now</button>) : 
            (<button 
              type='button' 
              onClick={handleSubmit}
              >Send Now</button>)}
         </form>         
      </div>
      )}

    </section>
  )
}
