import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import Image from 'next/image';
class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <noscript>
            <div>
              <Image
                src="https://mc.yandex.ru/watch/86791265"
                className="visuallyHidden"
                width={1}
                height={1}
                alt=""
              />
            </div>
          </noscript>
          <link rel="icon" href="/favicon.ico" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <meta
            name="description"
            content="Тайный санта. Собери друзей и твори магию рождества"
          />
          <meta name="msapplication-TileColor" content="#EF233C" />
          <meta name="theme-color" content="#ffffff"></meta>
          <link rel="icon" href="/favicon.ico" />
          <link
            href="https://fonts.googleapis.com/css2?family=Nunito:wght@200;400;800;900&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
MyDocument.getInitialProps = async (ctx) => {
  const sheet = new ServerStyleSheet();
  const originalRenderPage = ctx.renderPage;

  try {
    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
      });

    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          {sheet.getStyleElement()}
        </>
      ),
    };
  } finally {
    sheet.seal();
  }
};

export default MyDocument;
