import Image from 'next/image';
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import Tesseract, { ImageLike } from 'tesseract.js';
import { createWorker } from 'tesseract.js';

interface ImageInputProps {
  onImageChange: (images: File | null) => void;
  onConvertToText: (text:string) => void;
  images: File | null
  className?: string
}

const ImageInput: React.FC<ImageInputProps> = ({ onImageChange, images, className, onConvertToText}) => {
    const [loading, setLoading] = useState(false)
    const [progress, setProgress] = useState(0)
    
    const hiddenFileInput = React.useRef<HTMLInputElement>(null);

    const handleSelectImage = () => {
        hiddenFileInput.current?.click();
    }; 

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            onImageChange(e.target.files[0]);
        }
    };

    const handleOCR = () => {
        if( images != null){
            setLoading(true)
            
            Tesseract.recognize(images, 'nor',{
                logger: (m) => {
                    if(m.status == "recognizing text"){
                        setProgress( Number((parseFloat(m.progress)  * 100).toPrecision(2)) )
                    }
                }
            })
            .then( ({data: {text} }) => {
                onConvertToText(text)
                setLoading(false)
            })
            .finally( ()=>{
                toast.success("Tekst ble hentet fra bilde", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                    theme: "light",
                } )
                
                setProgress(0)
            })
        }
    }

return (
    <div className={`${className} ${""}`}>
        <ToastContainer/>
        <input type="file" accept='image/*' ref={hiddenFileInput} onChange={(e) => handleImageChange(e)} className="invisible"/>
        {/* <input type="file" accept='image/*' ref={hiddenFileInput} onChange={handleImageChange} className="invisible"/> */}

            <div className='flex felx-row space-x-5 py-2 justify-between w-full'>
                <button onClick={handleSelectImage} type="button" className=" transition duration-300 active:scale-95 py-2 px-4 bg-primary-200 hover:bg-primary-400
                        text-textColor shadow shadow-primary-600/25 rounded-md hover:shadow-primary-600/75 justify-self-end opacity-100"
                > Omgjør bilde til tekst
                </button>
                {images && (
                    <button type="button" className=" transition duration-300 active:scale-95 py-2 px-4 bg-emphasis-300 hover:bg-emphasis-500
                            text-textColor shadow shadow-primary-600/25 rounded-md hover:shadow-emphasis-400/75 justify-self-end"
                            onClick={handleOCR}
                    > 
                        Omgjør til tekst 
                    </button> 
                )}
            </div>
            
            {/* Visualization of image to be processed  */}
            {images && (    
                    <div className="flex felx-row space-x-5" >
                        {images != null}
                            <Image src={URL.createObjectURL(images)} width={100} height={100} alt={`image`} />
                    </div>
            )}
            

            {/* progress bar */}
        { 
            loading 
            && (
                <div className='flex flex-row text-lg font-semibold justify-center mt-5'>
                    <p>Omgjør bilde til tekst... {progress}%</p> 
                 </div>
            )
        }

    </div>
  );
};


export default ImageInput;