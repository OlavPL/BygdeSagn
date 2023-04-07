import SagnCard from './sagnCard/sagnCard'
import Sagn from '@/objects/sagn'
interface Props{
    sagnList:   Sagn[]
    className?: string
}

const DisplaySagn = ({sagnList, className}: Props) => {
    
    return(
        <div className={`${className} flex flex-col w-full gap-5 sm:gap-x-5 items-center`}>
            {sagnList.map((sagn: Sagn, index) => (
                <SagnCard
                    key={index}
                    title={sagn.title}
                    text={sagn.text}
                    tags={sagn.tags}
                    likes={sagn.likes}
                    dislikes={sagn.dislikes}
                    sagn = {sagn}
                />
            ))}
        </div>
    )
}

export default DisplaySagn
