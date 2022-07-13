import {React, useContext} from 'react'
import "./loading.css"
import { NFTContext } from '../../context/NFTContext'


export const Loading = () => {
  const {status} = useContext(NFTContext);
  return (
    <div className="load-wrapp">
    <div className="load-10">
      <div className="bar"></div>
      <p className='loading-prompt'>{status}</p>
    </div>
  </div>
  )
}
