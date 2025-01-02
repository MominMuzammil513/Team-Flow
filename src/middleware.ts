// import createMiddleware from "next-intl/middleware";
// import { routing } from "./i18n/routing";

// export default createMiddleware(routing);

// export const config = {
//   matcher: ["/((?!api|_next|.*\\..*).*)"],
// };

//..........................................................

// import createMiddleware from 'next-intl/middleware';
// import { routing } from './lib/routing';
// import { auth } from './lib/auth';
// import { NextRequest, NextResponse } from 'next/server';


// const publicPages = ["/", "/sign-in", "/sign-up"];
// const locales = ["en", "te"];
// const intMiddleWare = createMiddleware(routing);

// export default async function middleware(request: NextRequest) {
// 	const session = await auth()
//     const publicPathnameRegex = RegExp(`^(${locales.join('|')})?(${publicPages.join('|')})?/?$`, 'i');
//     const isPublicPages = publicPathnameRegex.test(request.nextUrl.pathname);
// 	if (isPublicPages) {
//         return intMiddleWare(request)
// 	}else if(!session){
// 		return  NextResponse.redirect(new URL('/sign-in', request.url));
//     }

// }
// export const config = {
//     matcher: ['/((?!api|_next|.*\\..*).*)']
//   };

// import { NextRequest, NextResponse } from 'next/server';
// import createIntlMiddleware from 'next-intl/middleware';
// import { auth } from './lib/auth';
// import { routing } from './lib/routing';

// // Define public routes dynamically
// const publicPages = [
//   '/',
//   '/sign-in',
//   '/sign-up',
//   '/forgot-password'
// ];

// export default async function middleware(request: NextRequest) {
//   // Create internationalization middleware
//   const intlMiddleware = createIntlMiddleware(routing);

//   // Check if the route is a public page
//   const isPublicPage = publicPages.some(page => 
//     request.nextUrl.pathname === page || 
//     routing.locales.some(locale => 
//       request.nextUrl.pathname.startsWith(`/${locale}${page}`)
//     )
//   );

//   // Exit early for public pages
//   if (isPublicPage) {
//     return NextResponse.next();
//   }

//   // Check authentication for protected pages
//   const session = await auth();
//   console.log("Session:", session); // Debugging session info

//   if (!session) {
//     // Redirect to sign-in page if not authenticated
//     return NextResponse.redirect(new URL('/sign-in', request.url));
//   }

//   // Handle internationalization for all routes
//   return intlMiddleware(request);
// }

// export const config = {
//   // Dynamically create the matcher using routing.locales
//   matcher: (() => {
//     const publicMatchers = publicPages.flatMap(page => [
//       page,
//       ...routing.locales.map(locale => `/${locale}${page}`)
//     ]);

//     const excludePatterns = [
//       '/api/:path*',
//       '/_next/static/:path*',
//       '/_next/image/:path*',
//       '/favicon.ico'
//     ];

//     // Combine all matchers dynamically
//     return [
//       ...publicMatchers,
//       '/((?!api|_next/static|_next/image|favicon.ico).*)',
//       `/:locale(${routing.locales.join('|')})/:path*`
//     ].filter(pattern => !excludePatterns.includes(pattern));
//   })()
// };

// import { NextRequest, NextResponse } from "next/server";
// import createIntlMiddleware from 'next-intl/middleware';
// import { auth } from "@/lib/auth";
// import { locales, publicPages, routing } from "./i18n/routing";

// const intlMiddleware = createIntlMiddleware(routing);

// export default async function middleware(request: NextRequest) {
//   const publicPathnameRegex = RegExp(`^(${locales.join('|')})?(${publicPages.join('|')})?/?$`, 'i');

//   const isPublicPage = publicPathnameRegex.test(request.nextUrl.pathname);

//   // Apply internationalization middleware for all routes
//   const response = intlMiddleware(request);

//   // If it's a public page, return the response without checking auth
//   if (isPublicPage) {
//     return response;
//   }

//   // For protected routes, check authentication
//   const session = await auth();
//   if (!session) {
//     // Redirect to sign-in page if not authenticated
//     const signInUrl = new URL("/sign-in", request.url);
//     signInUrl.searchParams.set("callbackUrl", request.url);
//     return NextResponse.redirect(signInUrl);
//   }

//   return response;
// }

// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
// };




import createMiddleware from "next-intl/middleware";
import { withAuth } from "next-auth/middleware";
import { NextRequest } from "next/server";

const locales = ["te", "en"];
const publicPages = ["/", "/sign-in", "/sign-up"];

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale: "en",
});

const authMiddleware = withAuth(
  function onSuccess(req) {
    return intlMiddleware(req);
  },
  {
    callbacks: {
      authorized: ({ token }) => token !== null,
    },
    pages: {
      signIn: "/login",
    },
  }
);

export default function middleware(req: NextRequest) {
  const publicPathnameRegex = RegExp(
    `^(/(${locales.join("|")}))?(${publicPages.join("|")})?/?$`,
    "i"
  );
  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);

  if (isPublicPage) {
    return intlMiddleware(req);
  } else {
    return (authMiddleware as any)(req);
  }
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};