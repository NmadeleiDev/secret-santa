import { FC } from 'react';
import Head from 'next/head';
import { mockMeta } from 'data/strings';

type PropsType = {
  url?: string;
};

const CustomHead: FC<PropsType> = ({ url }) => {
  const staticUrl: string | undefined = url;

  return (
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <meta name="format-detection" content="telephone=no" />
      <meta content="true" name="HandheldFriendly" />
      <meta content="width" name="MobileOptimized" />
      <meta content="yes" name="apple-mobile-web-app-capable" />
      <link rel="manifest" href="/site.webmanifest" />

      {mockMeta.title && <title>{mockMeta.title}</title>}
      {mockMeta.description && (
        <meta name="description" content={mockMeta.description} />
      )}
      {mockMeta.keywords && (
        <meta name="keywords" content={mockMeta.keywords} />
      )}
      {mockMeta.ogTitle && (
        <meta property="og:title" content={mockMeta.ogTitle} />
      )}
      {mockMeta.ogDescription && (
        <meta property="og:description" content={mockMeta.ogDescription} />
      )}
      {mockMeta.ogSiteName && (
        <meta property="og:site_name" content={mockMeta.ogSiteName} />
      )}
      {mockMeta.ogUrl && <meta property="og:url" content={mockMeta.ogUrl} />}
      {mockMeta.ogImage && (
        <meta
          property="og:image"
          content={staticUrl && staticUrl + mockMeta.ogImage}
        />
      )}
      {mockMeta.ogImageSecureUrl && (
        <meta
          property="og:image:secure_url"
          content={staticUrl && staticUrl + mockMeta.ogImageSecureUrl}
        />
      )}
      {mockMeta.twitterTitle && (
        <meta property="twitter:title" content={mockMeta.twitterTitle} />
      )}
      {mockMeta.twitterDescription && (
        <meta
          property="twitter:description"
          content={mockMeta.twitterDescription}
        />
      )}
      {mockMeta.twitterUrl && (
        <meta property="twitter:url" content={mockMeta.twitterUrl} />
      )}
      {mockMeta.twitterCard && (
        <meta property="twitter:card" content={mockMeta.twitterCard} />
      )}
      {mockMeta.twitterImage && (
        <meta
          property="twitter:image"
          content={staticUrl && staticUrl + mockMeta.twitterImage}
        />
      )}
    </Head>
  );
};

export default CustomHead;
