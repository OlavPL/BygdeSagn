import SagnCard from './sagnCard/sagnCard'
import Sagn from '@/objects/sagn'
interface Props{
    sagnList:   Sagn[]
}

const DisplaySagn = ({sagnList}: Props) => {
    
    return(
        <div className="flex flex-col w-full gap-5 sm:gap-x-5 items-center p-5">
            {sagnList.map((sagn: Sagn, index) => (
                <SagnCard
                    key={index}
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
