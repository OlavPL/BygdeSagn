import Image from "next/image"

import {useSession,signOut,getSession} from 'next-auth/react'
import { Context } from 'vm';


const ProfilePage=()=> {
    const{data:session,status}= useSession({required:true});
    
    
        if(status==='authenticated'){
            return(
                
            <div><p>Welcome{session.user?.name}</p>
              <button onClick={()=> signOut()}>Sign out</button>
            </div> 
            
            )
        }else{
            return(
                <div><p>You are not signed inn</p></div>
                ) 
        }
    
}
export default ProfilePage;
/*
export const getServerSideProps = async (context:Context)=>{
    const session = await getSession(context);
    
    if(session){
        return{
            redirect:{
               destination: '/profilePage'
            }
        }
    }
    return{
        props:{session},
    } 
} */