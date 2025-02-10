import "@/styles/globals.scss";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from "react-redux";
import { wrapper } from "@/store";
import { appWithTranslation } from "next-i18next";
import { Plus_Jakarta_Sans } from "next/font/google";
import clsx from "clsx";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import MiddleWare from "@/components/MiddleWare";
import SeoHeader from "@/seo/SeoHeader";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
const NavbarLayout = dynamic(() => import('@/components/Module/Navbar/Navbar'))
const Navbar404 = dynamic(() => import('@/components/Module/Navbar/Navbar404'))

const Toaster = dynamic(
  () => import("react-hot-toast").then((c) => c.Toaster),
  {
    ssr: false,
  }
);
const plus_Jakarta_Sans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
});

const App = ({ Component, ...rest }) => {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;
  const router = useRouter()
  const validPaths = [
    "/subscription/payment-successfull",
    "/subscription/payment-failure",
  ];
  const isSpecialPath = validPaths.includes(router.asPath);

  return (
    <Provider store={store}>
      <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID}>
        <MiddleWare>
          <SeoHeader
            {...(pageProps?.seo ? pageProps?.seo : "")}
            backUrl={rest?.router?.pathname ? ((rest?.router?.asPath)) : "/"}
          />
          <main className={clsx(plus_Jakarta_Sans.className, !isSpecialPath ? "gray-bg" : "")}>
            {
              router?.pathname !== "/404" ? (
                <NavbarLayout />
              ) : (
                <Navbar404 />
              )
            }
            <Component {...pageProps} />
            <footer className="w-full p-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t pt-4 border-neutral-300">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <Link href="/">
              <Image
                src="/assests/homepage/market-capsule-rlogo.svg"
                alt="market capsule logo"
                width={150}
                height={40}
              />
            </Link>
          </div>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h5 className="text-lg font-semibold">Contact Information</h5>
              <div className="flex items-center mt-2">
                <Mail className="mr-2" />
                <Link href="mailto:info@marketcapsule.in" className="text-neutral-800 no-underline hover:underline">info@marketcapsule.in</Link>
              </div>
              <div className="flex items-center mt-2">
                <Phone className="mr-2" />
                <Link href="tel:+916284653922" className="text-neutral-800 no-underline hover:underline">+91 62846 53922</Link>
              </div>
              <div className="flex items-center mt-2">
                <MapPin className="mr-2" />
                <p>1st Floor, 31-A Race Course Road, Amritsar (Punjab), India - 143001</p>
              </div>
            </div>
            <div>
              <ul className="pl-0 sm:pl-8 space-y-2">
                <li className="text-lg font-semibold mb-2">Policies</li>
                <li><Link href="/privacy-policy" className="text-neutral-800 no-underline hover:underline">Privacy Policy</Link></li>
                <li><Link href="/terms-and-conditions" className="text-neutral-800 no-underline hover:underline">Terms & Condition</Link></li>
                <li><Link href="/refund-policy" className="text-neutral-800 no-underline hover:underline">Refund Policy</Link></li>
              </ul>
            </div>
            <div>
            <ul className="pl-0 sm:pl-8 space-y-2">
                <li className="text-lg font-semibold mb-2">Useful Links</li>
                <li><Link href="/about-us" className="text-neutral-800 no-underline hover:underline">About Us</Link></li>
                <li><Link href="/contact-us" className="text-neutral-800 no-underline hover:underline">Contact Us</Link></li>
                <li><Link href="/summit" className="text-neutral-800 no-underline hover:underline">Events</Link></li>
                <li><Link href="/ipo" className="text-neutral-800 no-underline hover:underline">IPO</Link></li>
                <li><Link href="/capsule-plus" className="text-neutral-800 no-underline hover:underline">Capsule Plus</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8  text-xs text-center text-neutral-800">
            <p>&copy; {new Date().getFullYear()} Market Capsule. All rights reserved.</p>
          </div>
        </div>
      </footer>
          </main>

          <Toaster
            position="bottom-center"
            reverseOrder={true}
            containerClassName="toasterCss"
          />
        </MiddleWare>
      </GoogleOAuthProvider>
    </Provider>
  )
}

export default appWithTranslation(App);