import 'styles/index.css';
import { ThemeProvider } from 'styled-components';
import type { AppProps } from 'next/app';
import theme from 'styles/theme';
import { Provider } from 'react-redux';
import { store } from 'store/store';

export const host =
  process.env.NODE_ENV === 'production'
    ? `${process.env.NEXT_PUBLIC_NGINX_HOST}:${process.env.NEXT_PUBLIC_NGINX_PORT}`
    : 'localhost:3001';
export const protocol =
  process.env.NODE_ENV === 'production'
    ? process.env.NEXT_PUBLIC_FRONTEND_PROTOCOL
    : 'http';

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
