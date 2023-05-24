import User from "@/models/user";
import { connectToDB } from "@/utils/db";
import { clientId, clientSecret} from "@/utils/googleCredentials";
import NextAuth, {NextAuthOptions} from "next-auth";
import GoogleProvider from "next-auth/providers/google"

export const authOptions : NextAuthOptions = {
    providers : [
        GoogleProvider({ clientId, clientSecret })
    ],
    callbacks : {
      // first sign user in to get user session
      async signIn({ profile}) {
        // profile is the credentials gotten from the client when they attempt to sign in
        try {
          await connectToDB();

          // check if user already exist
          const userExists = await User.findOne({
            email : profile?.email
          })

          // create user if it doesn't exists
          if (!userExists) {
            await User.create({
              email : profile?.email,
              userName : profile?.name?.replace(" ", "").toLowerCase(),
              image : profile?.picture
            })
          }

          return true
        } catch (error) {
          throw new Error("Failed to connect to database")
        }
      },

      async session({session}) {
        const sessionUser = await User.findOne({
          email : session.user?.email
        })

        if (!sessionUser) return session

        session.user.id = sessionUser?._id.toString()

        return session;
      },
    
        
    }
    
}

const handler = NextAuth(authOptions)
export {handler as GET, handler as POST};