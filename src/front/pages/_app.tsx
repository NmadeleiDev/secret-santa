import 'styles/index.css';
import { ThemeProvider } from 'styled-components';
import type { AppProps } from 'next/app';
import theme from 'styles/theme';
import { Provider } from 'react-redux';
import { store } from 'store/store';
import Snowfall from 'react-snowfall';
import ym, { YMInitializer } from 'react-yandex-metrika';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';

export const host =
  process.env.NODE_ENV === 'production'
    ? process.env.NEXT_PUBLIC_NGINX_PORT === '80'
      ? `${process.env.NEXT_PUBLIC_NGINX_HOST}`
      : `${process.env.NEXT_PUBLIC_NGINX_HOST}:${process.env.NEXT_PUBLIC_NGINX_PORT}`
    : 'localhost:3000';
export const protocol =
  process.env.NODE_ENV === 'production'
    ? process.env.NEXT_PUBLIC_FRONTEND_PROTOCOL
    : 'http';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (!process.env.NEXT_PUBLIC_YM_ID) return;
      ym('hit', url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!process.env.NEXT_PUBLIC_YM_ID)
    return <div>NEXT_PUBLIC_YM_ID is not set</div>;
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <YMInitializer
          accounts={[+process.env.NEXT_PUBLIC_YM_ID]}
          options={{ defer: true }}
        />
        <Toaster
          position="bottom-left"
          reverseOrder={false}
          toastOptions={{
            success: {
              style: {
                background: theme.colors.accent.green,
              },
            },
            error: {
              style: {
                background: theme.colors.primary.main,
                color: theme.colors.white,
              },
            },
          }}
        />
        <Component {...pageProps} />
        <Snowfall color="white" />
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
