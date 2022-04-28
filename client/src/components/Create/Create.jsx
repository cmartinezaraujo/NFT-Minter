import {React, useState, useContext} from 'react'
import './create.css'
import { NFTContext } from '../../Context/NFTContext'

export const Create = () => {

  const {connectWallet, currentAccount, handleChange, sendTransaction, formData} = useContext(NFTContext);
  console.log(currentAccount);
  

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
    <section className='create'>
        <form className='create-form'>
            <input className='input-field' placeholder='Address' name="address" type="text" onChange={(e) => handleChange(e, 'address')}/>
            <input className='input-field' placeholder='Amount (ETH)' name="ammount" type="number" onChange={(e) => handleChange(e, 'ammount')}/>
            <input className='input-field' placeholder='NFT name' name="name" type="text" onChange={(e) => handleChange(e, 'name')}/>
            <input className='input-field' placeholder='Owner' name="owner" type="text" onChange={(e) => handleChange(e, 'owner')}/>
            <input className='input-field' placeholder='Message' name="message" type="text" onChange={(e) => handleChange(e, 'message')}/>
            <input className='input-brows' type="file" name='file' onChange={(e) => handleChange(e, 'file')}/>

            {/* <div className='h-[1px] w-full bg-gray-400 my-2' /> */}

            {!currentAccount &&(
            <button type='button' onClick={connectWallet} >
              <p>
                Connect Wallet
              </p>
            </button>
          )};

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


    </section>
  )
}
