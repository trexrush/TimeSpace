import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "../../../lib/prisma"

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      // @ts-ignore
      clientId: process.env.GOOGLE_ID,
      // @ts-ignore
      clientSecret: process.env.GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
  ],
  secret: process.env.SECRET,

  // session: {
  //   // Use JSON Web Tokens for session instead of database sessions.
  //   // This option can be used with or without a database for users/accounts.
  //   // Note: `strategy` should be set to 'jwt' if no database is used.
  //   strategy: 'jwt',
  // },

  // jwt: {
  //   secret: process.env.SECRET,
  //     // @ts-ignore
  //   encryption: true,
  // },
  debug: true
})