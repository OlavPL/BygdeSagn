import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from 'next-auth/providers/google';
import clientPromise from "@/lib/mongodb";
import SimpleCrypto from "simple-crypto-js";

//const SECRET_KEY = "h9#E6CAjvzfN9";
const SECRET_KEY= process.env.SECRET_KEY
export default NextAuth({
  pages: {
    signIn: '/login',
    signOut: '/auth/signout',
    error: '/auth/error', 
    newUser: '../../register', 
    error: '/login?error=Authentication failed', 
  },
  providers: [
    CredentialsProvider({
      name: "BygdeSagn Konto",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        if (!credentials?.password || !credentials?.email) {
          throw new Error('Email and password required');
        }
        const client = await clientPromise;
        const db = client.db("App_Db");
        const user = await db.collection("users").findOne({ email: credentials.email });
        if (user) {
          const sc = new SimpleCrypto(SECRET_KEY);
          const decryptedPassword = sc.decrypt(user.password);
          if (credentials.password == decryptedPassword) {
            console.log("User logged in");
            return user;
          } else {
            throw new Error('Invalid email or password');
          }
        } else {
          throw new Error('Invalid email or password');
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async redirect(url, baseUrl) {
      return "/#";
    },
  },
  secret: process.env.JWT_SECRET,
});
