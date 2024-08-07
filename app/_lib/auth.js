import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { getGuest, createGuest } from "./data-service";

const appConfig = {
    providers: [
        Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
        }),
    ],
    callbacks: {
        authorized({ auth, request }) {
            return !!auth?.user;
        },
        async signIn({ user, account, profile }) {

            try {

                const userExists = await getGuest(user.email);

                if (!userExists) {
                    await createGuest({ fullName: user.name, email: user.email });
                }

                return true;
            } catch {
                return false;
            }
        },
        async session({ session, user }) {
            const guest = await getGuest(session.user.email);
            session.user.guestId = guest.id;
        }
    },
    pages: {
        signIn: "/login",
    }
};

export const { auth, signIn, signOut, handlers: { GET, POST } } = NextAuth(appConfig);
