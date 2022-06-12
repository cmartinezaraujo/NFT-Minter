import {React, useContext} from 'react'
import "./loading.css"
import { NFTContext } from '../../Context/NFTContext'


export const Loading = () => {
  const {connectWallet, currentAccount, handleChange, sendTransaction, formData, isLoading, status} = useContext(NFTContext);
  return (
    <div className="load-wrapp">
    <div className="load-10">
      <div className="bar"></div>
      <p className='loading-prompt'>{status}</p>
    </div>
  </div>
  )
}
