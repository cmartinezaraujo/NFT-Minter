import React, {useContext} from 'react'
import './welcome.css'
import nftImage from '../../../assets/brain.jpg'
import { NFT } from '../NFT/NFT'
import { NFTContext } from '../../Context/NFTContext'

export const Welcome = () => {

    const NFT_Example = {
        title: 'AI',
        owner: 'AiLab',
        info: 'This is a  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi asperiores in suscipit quia, culpa optio, veniam ducimus iusto commodi elit.'
    };

  return (
    <section className='welcome app__container'>

        <div className='welcome-intro'>
            <div className='welcome-text'>
                <p className='welcome-intro-sub'>Discover and create unique NFT's</p>
            </div>
            <div className='welcome-intro-buttons'>
                <button className='welcome-btn'>Explore</button>
                <button className='welcome-btn'>Create</button>
            </div>
        </div>

        <div className="welcome-nft">
            <NFT img={nftImage} title={NFT_Example.title} owner={NFT_Example.owner} info={NFT_Example.info}/>
        </div>

    </section>
  )
}
