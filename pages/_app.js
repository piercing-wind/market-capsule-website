import "@/styles/globals.scss";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from "react-redux";
import { wrapper } from "@/store";
import { appWithTranslation } from "next-i18next";
import { Plus_Jakarta_Sans } from "next/font/google";
import clsx from "clsx";
import toast, { Toaster } from 'react-hot-toast';
import dynamic from "next/dynamic";
const NavbarLayout = dynamic(() => import('@/components/Module/Navbar/Navbar'))

const plus_Jakarta_Sans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
});

const App = ({ Component, ...rest }) => {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;


  return (
    <Provider store={store}>

      <main className={clsx(`${plus_Jakarta_Sans.className}`, "gray-bg")}>
        <NavbarLayout />

        <Component {...pageProps} />
        <Toaster
          position="bottom-center"
          reverseOrder={false}
        />
      </main>
    </Provider>
  )
}

export default appWithTranslation(App);