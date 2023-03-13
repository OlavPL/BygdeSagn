import NextAuth from "next-auth/next"
import GoogleProvider from 'next-auth/providers/google'
export default NextAuth({
    providers:[
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    ],
    callbacks:{
        async redirect(url, baseUrl){
            return "/#"
        }
    },
    secret:process.JWT_SECRET
})