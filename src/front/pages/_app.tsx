import 'styles/index.css';
import { ThemeProvider } from 'styled-components';
import type { AppProps } from 'next/app';
import theme from 'styles/theme';
import { Provider } from 'react-redux';
import { store } from 'store/store';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
