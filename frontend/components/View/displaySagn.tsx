import { useState } from 'react'
import SagnCard from '../LoreCard/sagnCard'
import SagnType from '@/types/SagnType'
interface Props{
    sagnList:   SagnType[]
}

const DisplaySagn = ({sagnList}: Props) => {
    const [data, setData] = useState(sagnList)
    
    return(
        // <div className="flex flex-col w-full grid-cols-3 space-y-4 space-evenly justify-center">
        // <div className="flex flex-col w-full md:max-w-screen-xl gap-5 sm:gap-x-5 md:grid md:grid-cols-2 lg:grid-cols-3 place-content-center p-5">
        //     {props.sagnModel.sagnList.map((saga) => (
        //         <Card_fortelling 
        //             key={saga.id}
        //             title={saga.title} 
        //             text={saga.text}  
        //             tags={saga.tags}
        //             likes={saga.likes}
        //             dislikes={saga.dislikes}
        //         />
        //     ))}
        // </div>

        <div className="flex flex-col w-full gap-5 sm:gap-x-5 items-center p-5">
            {sagnList.map((sagn: SagnType) => (
                <SagnCard
                    key={sagn._id}
                    title={sagn.title}
                    text={sagn.text}
                    tags={sagn.tags}
                    likes={sagn.likes}
                    dislikes={sagn.dislikes}
                />
            ))}
        </div>
    )
}

export default DisplaySagn
