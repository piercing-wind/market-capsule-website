import "@/styles/globals.css";
import { Provider } from "react-redux";
import { wrapper } from "@/store";
import { appWithTranslation } from "next-i18next";


const App = ({ Component, ...rest }) => {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;



  return (
    <Provider store={store}>

      <div>
        <Component {...pageProps} />

      </div>
    </Provider>
  )
}

export default wrapper.withRedux(appWithTranslation(App));