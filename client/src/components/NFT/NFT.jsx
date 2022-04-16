import React from 'react'
import './nft.css'

export const NFT = ({img, title, owner, info}) => {
  return (
    <div className='nft-card'>
        <div className='nft-card-image'>
            <img className='image' src={img} alt="nft image" />
        </div>
        <div className="nft-card-title">
            {title}
        </div>
        <div className='nft-card-owner'>
            Owned by <span className='owner'>{owner}</span>
        </div>
        <div className="nft-card-info">
            <p>
                {info}
            </p>
        </div>
    </div>
  )
}
