import React from 'react'
import './welcome.css'
 import nft from '../../../assets/ai.png'

export const Welcome = () => {
  return (
    <section className='welcome'>
        <div className='welcome-intro'>
            <div>
                <p className='welcome-intro-title'>Welcome to my non-fungible token (NFT) gallery</p>
                <p className='welcome-intro-sub'>Explore some unique art work and mint your own NFT</p>
            </div>
            <div className='welcome-intro-buttons'>
                <button className='explore'>Explore</button>
                <button className='create'>Create</button>
            </div>
        </div>
        <div className='nft-card'>
            <div className='nft-card-image'>
                <img className='image' src={nft} alt="" />
            </div>
            <div className="nft-card-title">
                AIClub Token
            </div>
            <div className="nft-card-owner">
                Created by <span className='creator'>AiLab</span>
            </div>
            <div className="nft-card-info">
                <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi asperiores in suscipit quia, culpa optio, veniam ducimus iusto commodi eveniet ut quaerat harum.
                
                </p>
            </div>
        </div>
    </section>
  )
}
