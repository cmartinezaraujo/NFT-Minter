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
    <section>
        <div >
            <input placeholder='Address' name="address" type="text" onChange={(e) => handleChange(e, 'address')}/>
            <input placeholder='Amount (ETH)' name="ammount" type="number" onChange={(e) => handleChange(e, 'ammount')}/>
            <input placeholder='NFT name' name="name" type="text" onChange={(e) => handleChange(e, 'name')}/>
            <input placeholder='Owner' name="owner" type="text" onChange={(e) => handleChange(e, 'owner')}/>
            <input placeholder='Message' name="message" type="text" onChange={(e) => handleChange(e, 'message')}/>
            <input type="file" name='file' onChange={(e) => handleChange(e, 'file')}/>

            {/* <div className='h-[1px] w-full bg-gray-400 my-2' /> */}

            {!currentAccount &&(
            <button type='button' onClick={connectWallet} >
              <p>
                Connect Wallet
              </p>
            </button>
          )};

            {false ? 
            (<></>) : 
            (<button 
              type='button' 
              onClick={handleSubmit}
              >Send Now</button>)}
          </div>


    </section>
  )
}
