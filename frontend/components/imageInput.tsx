import Image from 'next/image';
import React, { useState } from 'react';
import { createWorker } from 'tesseract.js';

interface ImageInputProps {
  onImageChange: (images: FileList | null) => void;
  onConvertToText: (text:string) => void;
  images: FileList | null
  className?: string
}

const ImageInput: React.FC<ImageInputProps> = ({ onImageChange, images, className, onConvertToText}) => {
    const [progress, setProgress] = useState(0)
    const [progressLabel, setProgressLabel] = useState("")
    const worker = createWorker();
    const [selectedImage, setSelectedImage] = useState<File | null>(null)
    
    const hiddenFileInput = React.useRef<HTMLInputElement>(null);


    const handleClick = () => {
        hiddenFileInput.current?.click();
    };
    

    const imgToText = async () => {
        if(selectedImage!=null){
            await (await worker).load();
            await (await worker).loadLanguage('eng');
            await (await worker).initialize('eng');
            
            const {data} = await (await worker).recognize(URL.createObjectURL(selectedImage));
            onConvertToText(data.text)
        }
        else{console.log("No image")}
    }
    

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            onImageChange(e.target.files);
            setSelectedImage(e.target.files[0])
        }
    };

return (
    <div className={`${className} ${""}`}>
        <input type="file" accept='image/*' ref={hiddenFileInput} onChange={handleImageChange} className="invisible"/>

            <div className='flex felx-row space-x-5 py-2 justify-between w-full'>
                <button onClick={handleClick} className=" transition duration-500 active:scale-95 py-2 px-4 bg-primary-200 hover:bg-primary-700
                        text-textColor shadow shadow-primary-600/25 rounded-md hover:shadow-primary-600/75 justify-self-end opacity-100"
                > Hent tekst fra bilde
                </button>
                {images && (
                    <button className=" transition duration-500 active:scale-95 py-2 px-4 bg-emphasis-300 hover:bg-emphasis-700
                            text-textColor shadow shadow-primary-600/25 rounded-md hover:shadow-emphasis-600/75 justify-self-end"
                            onClick={imgToText}
                    > 
                        Omgjør til tekst 
                    </button> 
                )}
            </div>
            {images && (
                    <div className="flex felx-row space-x-5" >
                        {Array.from(images).map((image, index) => (
                            <Image key={index} src={URL.createObjectURL(image)} width={100} height={100} alt={`image-${index}`} />
                        ))}
                    </div>
                    
                )}
    </div>
  );
};

export default ImageInput;