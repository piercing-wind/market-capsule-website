import "@/styles/globals.css";
import { Provider } from "react-redux";
import { wrapper } from "@/store";
import { appWithTranslation } from "next-i18next";
import { Plus_Jakarta_Sans } from "next/font/google";
const plus_Jakarta_Sans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
});

const App = ({ Component, ...rest }) => {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;



  return (
    <Provider store={store}>

      <main className={`${plus_Jakarta_Sans.className}`}>
        <Component {...pageProps} />

      </main>
    </Provider>
  )
}

export default wrapper.withRedux(appWithTranslation(App));