
// import { PrismaAdapter } from "@auth/prisma-adapter";
// import NextAuth from "next-auth";
// import { db, prisma } from "./db";
// import Google from "next-auth/providers/google";
// import GitHub, { GitHubProfile } from "next-auth/providers/github";
// import Credentials from "next-auth/providers/credentials";
// import bcrypt from 'bcryptjs';
// import { generateFromEmail } from 'unique-username-generator';

// export const { handlers, signIn, signOut, auth } = NextAuth({
//   providers: [
//     Google({
//       clientId: process.env.GOOGLE_CLIENT_ID as string,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
//       async profile(profile) {
//         const username = generateFromEmail(profile.email, 5);
//         return {
//           id: profile.sub,
//           username,
//           name: profile.given_name ? profile.given_name : profile.name,
//           surname: profile.family_name ? profile.family_name : "",
//           email: profile.email,
//           image: profile.picture,
//         };
//       },
//     }),
//     GitHub({
//       clientId: process.env.GITHUB_CLIENT_ID as string,
//       clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
//       async profile(profile: GitHubProfile) {
//         const username = generateFromEmail(profile.email as string, 5);
//         const fullName = profile.name?.split(" ");
//         return {
//           id: profile.id.toString(),
//           username: profile.login ? profile.login : username,
//           name: fullName?.at(0),
//           surname: fullName?.at(1),
//           email: profile.email,
//           image: profile.avatar_url,
//         };
//       },
//     }),
//     Credentials({
//       credentials: {
//         username: { label: "Username", type: "text", placeholder: "username" },
//         email: { label: "Email", type: "email", placeholder: "email" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         const { email, password } = credentials as {
//           email: string;
//           password: string;
//         };
//         if (!email || !password) {
//           throw new Error("please enter email or password");
//         }
//         const user = await prisma.user.findUnique({
//           where: {
//             email,
//           },
//         });
//         if (!user || !user.hashedPassword) {
//           throw new Error("User was not found, Please enter a valid email.");
//         }
//         const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);
//         if (!isPasswordValid) {
//           throw new Error("Invalid password, please enter the valid password");
//         }
//         return user;
//       },
//     }),
//   ],
//   session: {
//     strategy: "jwt",
//   },
//   pages: {
//     error: "/sign-in",
//     signIn: "sign-in",
//   },
//   adapter: PrismaAdapter(db),
//   secret: process.env.AUTH_SECRET as string,
//   callbacks: {
//     async session({ session, token }) {
//       console.log("Session Callback:", { session, token });
//       if (token) {
//         session.user.id = token.id as string;
//         session.user.name = token.name as string;
//         session.user.email = token.email as string;
//         session.user.image = token.picture as string;
//         session.user.username = token.username as string;
//         session.user.completeOnBoarding = !!token.completeOnBoarding as boolean;
//       }
//       const user = await db.user.findUnique({
//         where: {
//           id: token.id as string,
//         },
//       });
//       if (user) {
//         session.user.image = user.image as string;
//         session.user.completeOnBoarding = user.completedOnBoarding as boolean;
//       }
//       return session;
//     },
//     async jwt({ token, user }) {
//       console.log("JWT Callback:", { token, user });
//       const dbUser = await db.user.findUnique({
//         where: {
//           email: token.email as string,
//         },
//       });
//       if (!dbUser) {
//         token.id = user.id as string;
//         return token;
//       }
//       return {
//         id: dbUser.id as string,
//         username: dbUser.username as string,
//         email: dbUser.email as string,
//         picture: dbUser.image as string,
//         completeOnBoarding: dbUser.completedOnBoarding || false,
//       };
//     },
//     authorized({ auth, request: { nextUrl } }) {
//       const isLoggedIn = !!auth?.user
//       const isOnDashboard = nextUrl.pathname.startsWith('/dashboard')
//       if (isOnDashboard) {
//         if (isLoggedIn) return true
//         return false // Redirect unauthenticated users to login page
//       } else if (isLoggedIn) {
//         return Response.redirect(new URL('/dashboard', nextUrl))
//       }
//       return true
//     },
//   },
// });

import { PrismaAdapter } from "@auth/prisma-adapter";
import { getServerSession, NextAuthOptions } from "next-auth";
import { db } from "./db";
import { Adapter } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import AppleProvider from "next-auth/providers/apple";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { generateFromEmail } from "unique-username-generator";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    error: "/sign-in",
    signIn: "/sign-in",
  },
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      async profile(profile) {
        const username = generateFromEmail(profile.email, 5);
        return {
          id: profile.sub,
          username,
          name: profile.given_name ? profile.given_name : profile.name,
          surname: profile.family_name ? profile.family_name : "",
          email: profile.email,
          image: profile.picture,
        };
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      async profile(profile) {
        const username = generateFromEmail(profile.email, 5);
        const fullName = profile.name.split(" ");
        return {
          id: profile.id,
          username: profile.login ? profile.login : username,
          name: fullName.at(0),
          surname: fullName.at(1),
          email: profile.email,
          image: profile.avatar_url,
        };
      },
    }),
    AppleProvider({
      clientId: process.env.APPLE_CLIENT_ID!,
      clientSecret: process.env.APPLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Username" },
        email: { label: "Email", type: "text", placeholder: "Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Please enter email and password.");
        }

        const user = await db.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user?.hashedPassword) {
          throw new Error("User was not found, Please enter valid email");
        }
        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (!passwordMatch) {
          throw new Error(
            "The entered password is incorrect, please enter the correct one."
          );
        }

        return user;
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
        session.user.username = token.username;
        session.user.surname = token.surname;
        session.user.completeOnBoarding = !!token.completeOnBoarding;
      }

      const user = await db.user.findUnique({
        where: {
          id: token.id,
        },
      });

      if (user) {
        session.user.image = user.image;
        session.user.completeOnBoarding = user.completedOnBoarding;
        session.user.username = user.username;
      }
     

      return session;
    },
    async jwt({ token, user }) {
      const dbUser = await db.user.findFirst({
        where: {
          email: token.email,
        },
      });

      if (!dbUser) {
        token.id = user!.id;
        return token;
      }

      return {
        id: dbUser.id,
        username: dbUser.username,
        email: dbUser.email,
        picture: dbUser.image,
      };
    },
  },
};

export const getAuthSession = () => getServerSession(authOptions);