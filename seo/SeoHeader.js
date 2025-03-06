import Head from "next/head";
import Script from "next/script";
import React from "react";
const SeoHeader = ({ title = 'Market Capsule', description = 'Market Capsule', imageUrl = `/assests/capsule-plus/bolt.svg`, backUrl }) => {
    const fullUrl = process.env.WEB + backUrl;
    return (
      <>
        <Head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="theme-color" content="#000000" />
            <meta name="description" content={description || 'Market Capsule Description'} />
            <meta httpEquiv="Cache-Control" content="max-age=31536000, no-cache, no-store, must-revalidate" />
            <meta httpEquiv="Pragma" content="no-cache" />
            <meta httpEquiv="Content-Type" content="text/html;  charset=utf-8" />
            <meta name="og:locale" content="en_US" />
            <meta name="og:title" content={title || 'Market Capsule'} />
            <meta name="og:type" content="website" />
            <meta property="og:url" content={fullUrl} />
            <meta name="image_src" content={imageUrl} />
            <meta name="image_url" content={imageUrl} />
            <meta name="image" property="og:image" content={imageUrl} />
            <meta property="og:image:secure_url" content={imageUrl} />
            <meta name="og:image" content={imageUrl} />
            <meta name="og:image:alt" content={title || 'Market Capsule'} />
            <meta name="og:site_name" content="inMorphis" />
            <meta name="og:description" content={description || 'Market Capsule Description '} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:description" content={description || 'Market Capsule Description'} />
            <meta name="twitter:title" content={title || 'Market Capsule'} />
            <meta name="twitter:site" content={fullUrl} />
            <meta name="twitter:image" content={imageUrl} />
            <title>{title}</title>
            <link rel="icon" href="/assests/meta/brand-logo32.svg" sizes="32x32" />
            <link rel="icon" href="/assests/meta/brand-logo192.svg" sizes="192x192" />
            <link rel="apple-touch-icon-precomposed" href="/assests/meta/brand-logo32.svg" />
            <link rel='canonical' href={fullUrl} />
        </Head>
            <Script
                id="twitter-pixel"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
                        !function(e,t,n,s,u,a){e.twq||(s=e.twq=function(){s.exe?s.exe.apply(s,arguments):s.queue.push(arguments);
                        },s.version='1.1',s.queue=[],u=t.createElement(n),u.async=!0,u.src='https://static.ads-twitter.com/uwt.js',
                        a=t.getElementsByTagName(n)[0],a.parentNode.insertBefore(u,a))}(window,document,'script');
                        twq('config','p84d1');
                        twq('event', 'tw-p84d1-p84d2', {});
                    `,
                }}
            />
         </>
    )
}
export default SeoHeader;