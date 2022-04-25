import {React,useContext} from 'react'
import nftImage from '../../../assets/ai.png'
import './gallery.css'
import { NFT } from '../NFT/NFT'
import { NFTContext } from '../../Context/NFTContext'

export const Gallery = () => {
    const NFT_Example = {
        title: 'AI',
        owner: 'AiLab',
        info: 'This is a  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi asperiores in suscipit quia, culpa optio, veniam ducimus iusto commodi eveniet ut quaerat harum. that is created by the NFT contract'
    };

    const {transactions} = useContext(NFTContext);
  return (
    <section className='gallery'>
        <h1 className="heading" >Gallery</h1>
        <div className='nft-tokens'>
        {/* {[...Array(10)].map((x, i) =>
            <NFT className="nft-card" key={i} img={nftImage} title={NFT_Example.title} owner={NFT_Example.owner} info={NFT_Example.info}/>
        )} */}
        {transactions.map((token, i) =>{
            //const img = 
            console.log("consumable", token);
            return <NFT className="nft-card" key={i} img={`https://ipfs.io/ipfs/${token.image}`} title={token.name} owner={token.owner} info={token.description}/>
        })}
        </div>
    </section>
  )
}
