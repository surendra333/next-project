
import 'styles/index.scss'
import "react-toggle/style.css"
import { library } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/free-solid-svg-icons';
import {faSun,faMoon, faBorderAll, faList,faSortNumericDown,faSortNumericUp  } from '@fortawesome/free-solid-svg-icons';
import ThemeProvider from 'provider/ThemeProvider';
import "bootstrap/dist/css/bootstrap.min.css";

library.add(faSun,
  faMoon,faBorderAll, faList,faSortNumericDown,
  faSortNumericUp );

function MyApp({ Component, pageProps }) {
  return <ThemeProvider><Component {...pageProps} /></ThemeProvider>
}

export default MyApp
