import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

/*Documentation: https://nextjs.org/docs/app/building-your-application/routing/internationalization */

let locales = ["fi", "en"];

// Get the preferred locale, similar to the above or using a library
function getLocale(request) {
  let headers = { "accept-language": "en-US,en;q=0.5" };
  let languages = new Negotiator({ headers }).languages();
  let defaultLocale = "fi";

  return match(languages, locales, defaultLocale); // -> 'fi'
}

export function middleware(request) {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Redirect if there is no locale
  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  // e.g. incoming request is /products
  // The new URL is now /en-US/products
  return Response.redirect(request.nextUrl);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|images|favicon.ico).*)"],
};
