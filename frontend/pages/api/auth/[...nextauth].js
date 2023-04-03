import NextAuth from "next-auth/next"
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from 'next-auth/providers/google'
import clientPromise from "@/lib/mongodb";
import SimpleCrypto from "simple-crypto-js"
const SECRET_KEY= "my-secret-key"

export default NextAuth({
  
    pages: {
        signIn: '../../login',
        signOut: '/auth/signout',
        error: '/auth/error', // Error code passed in query string as ?error=
        newUser: '../../register' // New users will be directed here on first sign in (leave the property out if not of interest)
      },
    providers:[
        
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    CredentialsProvider({
        name: "BygdeSagn Konto",
        credentials: {
          email: { label: "Email", type: "text", placeholder: "jsmith" },
          password: { label: "Password", type: "password" }
        },
        async authorize(credentials, req) {
          if(!credentials?.password||!credentials?.email){

            throw new Error('Email and password required')

          }
          const client = await clientPromise;
          const db = client.db("App_Db");
          
          const user = await db.collection("users").findOne({email:credentials.email})
          if (user) {
            const sc = new SimpleCrypto(SECRET_KEY);
            const decryptedPassword = sc.decrypt(user.password);
             /*console.log("Credentials passord: "+credentials.password)
            console.log("db passord: "+ user.password)
            console.log("decryptert db passord: " +decryptedPassword) */
           if(credentials.password == decryptedPassword){
            console.log("User logged inn")
              return user
           }
          } else {
            console.log("User failed")
            return null
            
            // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
          }
        }
      })
    ],
    callbacks:{
        async redirect(url, baseUrl){
            return "/#"
        },
    },
    secret:process.env.JWT_SECRET
})




