    import {useSession,signOut,getSession} from 'next-auth/react'
    import { Context } from 'vm';


    const account =()=> {
        // const{data:session,status}= useSession({required:true});
        
        
            if(status==='authenticated'){
                return(
                    
                <div>
                    {/* <p>Welcome{session.user?.name}</p> */}
                <button onClick={()=> signOut()}>Sign out</button>
                </div> 
                
                )
            }else{
                return(
                    <div><p>You are not signed inn</p></div>
                    ) 
            }
        
    }
    export default account;

    export const getServerSideProps = async (context:Context)=>{
        const session = await getSession(context);

        if(session){
            return{
                redirect:{
                destination: '/'
                }
            }
        }
        return{
            props:{session},
        }
    } 