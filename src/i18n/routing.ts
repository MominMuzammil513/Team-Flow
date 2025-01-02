import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';
export const locales = ['en', 'te']
export const routing = defineRouting({
  locales,
  defaultLocale: 'en',
  // pathnames: {
  //   '/': '/',
  //   '/:path': {
  //     en: '/pathnames',
  //     te: '/pathnames-te' // Corrected to specify a different pathname for Telugu
  //   }
  // },
  localePrefix: 'always'
});
export const publicPages = [
    '/',
    '/sign-in',
    '/sign-up',
  ];
// export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];
export type LocalePrefixMode = typeof routing.localePrefix;

export const { Link, getPathname, redirect, usePathname, useRouter, } =
  createNavigation(routing);