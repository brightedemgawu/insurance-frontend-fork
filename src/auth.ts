import NextAuth, {User} from "next-auth";
import Credentials from "@auth/core/providers/credentials";
import {object, string, ZodError} from "zod";
import jwt from "jsonwebtoken";
import {DecodedRefreshToken} from "@/types/authentication";

export const credentialSchema = object({
    token: string().min(1),
})
export const {handlers, signIn, signOut, auth} = NextAuth({

    session: {
        strategy: "jwt",
        maxAge: 24 * 60 * 60
    },

    providers: [
        Credentials({
            credentials: {
                token: {},
            },
            authorize: async (credentials) => {
                try {

                    const {token} = await credentialSchema.parseAsync(credentials)
                    const decodedToken = jwt.decode(token) as DecodedRefreshToken;
                    return {
                        userId: decodedToken.id,
                        name: decodedToken.name,
                        email: decodedToken.email,
                        userType: decodedToken.userType,
                        accessLevel: decodedToken.accessLevel,
                        photo: decodedToken.photo,
                        position: decodedToken.position,
                        onboarding: decodedToken.onboarding,
                        token: token
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
    callbacks: {
        jwt({token, user}) {
            if (user) {
                const authenticatedUser: any = user;
                token.token = authenticatedUser?.token;
                token.userId = authenticatedUser?.userId;
                token.name = authenticatedUser?.name;
                token.email = authenticatedUser?.email;
                token.userType = authenticatedUser?.userType;
                token.photo = authenticatedUser?.photo;
                token.position = authenticatedUser?.position;
                token.onboarding = authenticatedUser?.onboarding;
                token.accessLevel = authenticatedUser?.accessLevel;
            }
            return token;
        },
        session({session, token}) {
            const newToken: any = {...token}
            const newSession: any = {
                ...session,
                user: {
                    ...session.user,
                    ...newToken,
                }
            };
            return newSession as typeof session;
        }
    },
})
