import Sagn from '@/objects/sagn';
import UserSagnCard from './sagnCard/userSagnCard';

interface Props {
  sagnList: Sagn[];
  className?: string;
  onDelete: (postId: number) => Promise<void>;
}

const DisplayUserSagn = ({ sagnList, className, onDelete }: Props) => {
  return (
    <div className={`${className} flex flex-col w-full gap-5 sm:gap-x-5 items-center`}>
      {sagnList.map((sagn: Sagn, index) => (
        <UserSagnCard key={index} sagn={sagn} onDelete={onDelete} title={sagn.title} text={''} tags={[]}/>
      ))}
    </div>
  );
};

export default DisplayUserSagn;
