import {ReactChild, useState} from 'react'
import './create.css'

export const Create = () => {

    // const [imageSelected, setImageSelected] = useState(false);

    const handleSubmit = (e) => {
        const {addressTo, ammount, keyword, message} = formData;
        e.preventDefault();
    
        if(!addressTo || !ammount|| !keyword || !message) return;
    
        // sendTransaction();
    
      }
    
    const grabImage = (files) => {
        console.log(files[0]);
    }

  return (
    <section>
        <div >
            <input placeholder='Address To' name="addressTo" type="text" />
            <input placeholder='Amount (ETH)' name="ammount" type="number" />
            <input placeholder='Keyword (Gif)' name="keyword" type="text" />
            <input placeholder='Enter Message' name="message" type="text" />
            <input type="file" name='image' onChange={(e) => {grabImage(e.target.files)}}/>

            {/* <div className='h-[1px] w-full bg-gray-400 my-2' /> */}

            {false ? 
            (<></>) : 
            (<button 
              type='button' 
              onClick={handleSubmit}
              >Send Now</button>)}
          </div>


    </section>
  )
}
