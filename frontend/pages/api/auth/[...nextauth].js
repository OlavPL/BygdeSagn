import NextAuth from "next-auth/next"
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from "next-auth/providers/credentials"
export default NextAuth({
    providers:[
        
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    CredentialsProvider({
        id: "mongo-db-login",
        name: "Epost & Passord",
        async authorize(credentials, req) {
          const user = {
            
          }
          return user
        },
        credentials: {
          username: { label: "Epost", type: "text ", placeholder: "eksempel@gmail.com" },
          password: { label: "Passord", type: "password" },
        },
      }),
    ],
    callbacks:{
        async redirect(url, baseUrl){
            return "/#"
        }
    },
    secret:process.JWT_SECRET
})




