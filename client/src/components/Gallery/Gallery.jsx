import React from 'react'
import nftImage from '../../../assets/ai.png'
import './gallery.css'
import { NFT } from '../NFT/NFT'

export const Gallery = () => {
    const NFT_Example = {
        title: 'AI',
        owner: 'AiLab',
        info: 'This is a  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi asperiores in suscipit quia, culpa optio, veniam ducimus iusto commodi eveniet ut quaerat harum. that is created by the NFT contract'
    };

  return (
    <section className='gallery'>
        <h1 className="heading" >Gallery</h1>
        <div className='nft-tokens'>
        {[...Array(10)].map((x, i) =>
            <NFT className="nft-card" key={i} img={nftImage} title={NFT_Example.title} owner={NFT_Example.owner} info={NFT_Example.info}/>
        )}
        </div>
    </section>
  )
}
