import {React,useContext, useState} from 'react'
import './gallery.css'
import { NFTContext } from '../../context/NFTContext'


const GalleryItem = ({nftImage}) =>{
    return(
        <div className='gallery-item'>
            <div className='img-container'>
                <img className='gallery-item-img' src={nftImage} alt='nft'/>
            </div>
        </div>
    );
}



export const Gallery = () => {
    const NFT_Example = {
        title: 'AI',
        owner: 'AiLab',
        info: 'This is a Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi asperiores in suscipit quia, culpa optio, veniam ducimus iusto commodi elit.'
    };

    const {transactions} = useContext(NFTContext);
    
  return (
    <section id = 'gallery' className='app__container gallery'>
        <h3 className="heading" >Gallery</h3>

        {(transactions == undefined || transactions.length < 1) ? 
        (
            <div>
                <p>Loading</p>
            </div>
        ) : 
        
        (
            <div className='gallery-layout'>
                {transactions.map((transaction, index) => {
                    return(
                        
                        <GalleryItem  nftImage={`https://nft-minted-img.s3.us-west-2.amazonaws.com/${transaction.image}`} key={index}/>                        
                    )
                })}
            </div>
        )}


    </section>
  )
}
