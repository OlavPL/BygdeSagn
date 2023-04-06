import SagnListController from './controller/sagnListController'
import SagnCard from './sagnCard/sagnCard'
import Sagn from '@/objects/sagn'
interface Props{
    sagnList:   Sagn[]
    className?: string
    controller: SagnListController
    updateSagn: (postID: number) => void
}

const DisplaySagn = ({sagnList, className, updateSagn}: Props) => {


    
    return(
        <div className={`${className} flex flex-col w-full gap-5 sm:gap-x-5 items-center`}>
            {sagnList.map((sagn: Sagn, index) => (
                <SagnCard
                    sagn={sagn}
                    key={index}
                    // title={sagn.title}
                    // text={sagn.text}
                    // tags={sagn.tags}
                    // likes={sagn.likes}
                    // dislikes={sagn.dislikes}
                    // postID={sagn.postID}
                    updateSagn = {updateSagn}

                />
            ))}
        </div>
    )
}

export default DisplaySagn
