import React from 'react'
import './directions.css'

const featuresData = [
    {
      title: 'Setup Meta Mask',
      text: 'Download MetaMask and install it on your browser or phone. MetaMask is a browser extension that allows you to interact with the Ethereum blockchain.',
    },
    {
      title: 'Setup your crypto wallet',
      text: 'Create or connect to an existing Ethereum wallet. And add some Ether to your wallet.',
    },
    {
      title: 'Connect your wallet',
      text: 'Use MetaMask to connect your wallet to the application.',
    },
    {
      title: 'Mint your NFT\'s',
      text: 'You ar now able to mint NFT\'s! Each NFT you mint will be assigned to the address you connected your wallet to.',
    },
  ];

const Direction = ({ title, text }) =>{
    return(
        <div className="direction-item">
        <div className='direction-title'>
          <h2>{title}</h2>
        </div>
        <div className="direction-text">
          <p>{text}</p>
        </div>
      </div>
    );
}


export const Directions = () => {
  return (
      <section className='directions app__whitebg app__container'>
        <div className="directions-heading">
            <h1 className="main-heading gradient_text">Mint your NFT's here and showcase your work in the gallery.</h1>
             <p className='main-heading-sub'>The process is fast and simple!</p>
        </div>

        <div className="direction-item-container">
            {featuresData.map((item, index) => (
            <Direction title={item.title} text={item.text} key={item.title + index} />
            ))}
        </div>
      </section>
  )
}
