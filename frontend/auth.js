import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [Google],
    pages: {
        signIn: "/auth/signin",
    },
    callbacks: {
        async signIn({ user, account, profile }) {
            if (account.provider === "google") {
                try {
                    const response = await fetch(
                        `${
                            process.env.NEXT_PUBLIC_API_URL ||
                            "http://localhost:8000"
                        }/api/auth/sync`,
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                email: user.email,
                                name: user.name,
                                image: user.image,
                            }),
                        }
                    );

                    if (!response.ok) {
                        console.error("Failed to sync user with backend");
                        return false;
                    }

                    const data = await response.json();
                    user.isOnboarded = data.user.isOnboarded;
                    return true;
                } catch (error) {
                    console.error("Error syncing user:", error);
                    return false;
                }
            }
            return true;
        },
        async jwt({ token, user, trigger, session }) {
            if (user) {
                token.isOnboarded = user.isOnboarded;
            }
            if (trigger === "update" && session?.isOnboarded !== undefined) {
                token.isOnboarded = session.isOnboarded;
            }
            return token;
        },
        async session({ session, token }) {
            session.user.isOnboarded = token.isOnboarded;
            return session;
        },
    },
});
