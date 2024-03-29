import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from 'next-auth/providers/google';
import clientPromise from "@/lib/mongodb";
import bcrypt from 'bcrypt';
import * as dotenv from 'dotenv'
dotenv.config()

// Config for Next-Auth.JS

export default NextAuth({
  pages: {
    signIn: '/login',
    signOut: '/auth/signout',
    error: '/auth/error', 
    newUser: '../../register', 
    error: '/login?error=Authentication failed', 
  },
  providers: [
    //'Bygdesagn Provider' for å logge inn med bruker registrert i MongoDb
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
          const match = await bcrypt.compare(credentials.password, user.password);
          if (match) {
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
       //'GoogleProvider' Login for eksisterende brukere
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      idToken: true,
      authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code',
      profileUrl: 'https://www.googleapis.com/oauth2/v3/userinfo',
      async profile(profile) {
        const client = await clientPromise;
        const db = client.db("App_Db");
        const user = await db.collection("users").findOne({ email: profile.email });
        // Sjekk for å finne ut om eposten er registrert i systemet tidligere
        if (!user) { 
          const newUser = {
            email: profile.email,
            name: profile.name,
            created: {
              $date: new Date(new Date().setUTCHours(new Date().getUTCHours() + 1))
            },

            
          };
          await db.collection("users").insertOne(newUser);
        }
        return {
          id: profile.sub, 
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        };
      },
    })
    

  ],
  callbacks: {
    async redirect(url, baseUrl) {
      return "/#";
    },
  },
  secret: process.env.JWT_SECRET,
});
