import NextAuth, {User} from "next-auth";
import Credentials from "@auth/core/providers/credentials";
import {object, string, ZodError} from "zod";

export const credentialSchema = object({
    accessToken: string().min(1),
})
export const {handlers, signIn, signOut, auth} = NextAuth({

    session: {
        strategy: "jwt",
        maxAge: 24 * 60 * 60
    },

    providers: [
        Credentials({
            credentials: {
                accessToken: {},
            },
            authorize: async (credentials) => {
                try {

                    const {accessToken} = await credentialSchema.parseAsync(credentials)
                    return {
                        email: accessToken,
                    } as User;

                } catch (error) {
                    if (error instanceof ZodError) {
                        return null
                    }
                }
                return null
            },
        }),
    ],


})
