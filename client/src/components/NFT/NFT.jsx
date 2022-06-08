import React from 'react'
import './nft.css'

export const NFT = ({img, title, owner, info}) => {
  return (

    <figure className='nft-card backdrop-blur'>
        <div className='nft-card-image'>
            <img className='image' src={img} alt="nft image" />
        </div>
        <figcaption className='nft-caption'>
            <div className="nft-card-title">
            {title}
            </div>

            <div className='nft-card-owner'>
                Created by <span className='owner'>{owner}</span>
            </div>
        </figcaption>
    </figure>
  )
}
