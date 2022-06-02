import React, {useContext} from 'react'
import './welcome.css'
import nftImage from '../../../assets/ai.png'
import { NFT } from '../NFT/NFT'
import { NFTContext } from '../../Context/NFTContext'

export const Welcome = () => {

    const NFT_Example = {
        title: 'AI',
        owner: 'AiLab',
        info: 'This is a  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi asperiores in suscipit quia, culpa optio, veniam ducimus iusto commodi elit.'
    };

  return (
    <section className='welcome'>
        <div className='welcome-intro'>
            <div className='welcome-text'>
                <p className='welcome-intro-title'>Welcome to my non-fungible token (NFT) gallery</p>
                <p className='welcome-intro-sub'>Explore some unique art work and mint your own NFT</p>
            </div>
            <div className='welcome-intro-buttons'>
                <button className='explore-button'>Explore</button>
                <button className='create-button'>Create</button>
            </div>
        </div>
        <div class="nft">
            <NFT img={nftImage} title={NFT_Example.title} owner={NFT_Example.owner} info={NFT_Example.info}/>
        </div>
    </section>
  )
}
