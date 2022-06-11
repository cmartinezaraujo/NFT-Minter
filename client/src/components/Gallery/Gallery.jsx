import {React,useContext, useState} from 'react'
import nftImage from '../../../assets/ai.png'
import './gallery.css'
import { NFT } from '../NFT/NFT'
import { NFTContext } from '../../Context/NFTContext'
import { HiChevronLeft, HiChevronRight , HiOutlineDotsHorizontal} from 'react-icons/hi';
import { arrayify } from 'ethers/lib/utils'


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
    const [currentIndex, setCurrentIndex] = useState(0);
    console.log(transactions);
    let i = transactions[0]
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
                        
                        <GalleryItem  nftImage={`https:/ipfs.io/ipfs/${transaction.image}`} key={index}/>

                        // <NFT
                        //     key={index}
                        //     img={`https:/ipfs.io/ipfs/${transaction.image}`} 
                        //     title={transaction.name} 
                        //     owner={transaction.owner} 
                        // info={transaction.message}/>
                        
                    )
                })}
            </div>
        )}


    </section>
  )
}
