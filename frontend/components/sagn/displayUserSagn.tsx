import SagnCard from './sagnCard/sagnCard'
import Sagn from '@/objects/sagn'
import UserSagnCard from './sagnCard/userSagnCard'
interface Props{
    sagnList:   Sagn[]
    className?: string
}

const DisplayUserSagn = ({sagnList, className}: Props) => {
    
    return(
        <div className={`${className} flex flex-col w-full gap-5 sm:gap-x-5 items-center`}>
            {sagnList.map((sagn: Sagn, index) => (
                <UserSagnCard
                    key={index}
                    title={sagn.title}
                    text={sagn.text}
                    tags={sagn.tags}
                    sagn = {sagn}
                />
            ))}
        </div>
    )
}

export default DisplayUserSagn
