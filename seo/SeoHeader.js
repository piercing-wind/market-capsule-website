import Head from "next/head";
import React from "react";
const SeoHeader = ({ title = 'Market Capsule', description = 'Market Capsule', imageUrl = `/assests/capsule-plus/bolt.svg`, backUrl }) => {
    const fullUrl = process.env.WEB + backUrl;
    return (
        <Head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="theme-color" content="#000000" />
            <meta name="description" content={description} />
            <meta httpEquiv="Cache-Control" content="max-age=31536000, no-cache, no-store, must-revalidate" />
            <meta httpEquiv="Pragma" content="no-cache" />
            <meta httpEquiv="Content-Type" content="text/html;  charset=utf-8" />
            <meta name="og:locale" content="en_US" />
            <meta name="og:title" content={title} />
            <meta name="og:type" content="website" />
            <meta property="og:url" content={fullUrl} />
            <meta name="image_src" content={imageUrl} />
            <meta name="image_url" content={imageUrl} />
            <meta name="image" property="og:image" content={imageUrl} />
            <meta property="og:image:secure_url" content={imageUrl} />
            <meta name="og:image" content={imageUrl} />
            <meta name="og:image:alt" content={title} />
            <meta name="og:site_name" content="inMorphis" />
            <meta name="og:description" content={description} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:site" content={fullUrl} />
            <meta name="twitter:image" content={imageUrl} />
            <title>{title}</title>
            <link rel="icon" href="/assests/capsule-plus/bolt.svg" sizes="32x32" />
            <link rel="icon" href="/assests/capsule-plus/bolt.svg" sizes="192x192" />
            <link rel="apple-touch-icon-precomposed" href="/assests/capsule-plus/bolt.svg" />
            <link rel='canonical' href={fullUrl} />
        </Head>
    )
}
export default SeoHeader;