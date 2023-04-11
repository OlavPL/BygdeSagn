import SagnListController from '../controller/sagnListController'
import SagnCard from './sagnCard/sagnCard'
import Sagn from '@/objects/sagn'
interface Props{
    sagnList:   Sagn[]
    className?: string
    controller: SagnListController
}

const DisplaySagn = ({sagnList, className}: Props) => {


    
    return(
        <div className={`${className} flex flex-col w-full gap-5 sm:gap-x-5 items-center`}>
            {sagnList.map((sagn: Sagn, index) => (
                <SagnCard
                    sagn={sagn}
                    key={index}
                />
            ))}
        </div>
    )
}

export default DisplaySagn
