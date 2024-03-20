import Head from "next/head";
import React from "react";
const SeoHeader = ({ title = 'Iplanted Foundation', description = 'Iplanted Foundation', url = '/', image = '/uploads/iplantedlogog_77d9c996c8.png', social }) => {
    return (
        <Head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="theme-color" content="#000000" />
            <meta name="description" content={description} />
            {
                social?.map((n, i) =>
                    n?.type === 'og' ?
                        <React.Fragment key={i}>
                            <meta name="og:locale" content="en_US" />
                            <meta name="og:title" content={n?.title ? n?.title : title} />
                            <meta name="og:type" content="website" />
                            <meta property="og:url" content={url} />
                            {
                                n?.image || image ?
                                    <meta property="og:image:secure_url" content={process.env.IMG + (n?.image ? n?.image : image)} />
                                    : null
                            }

                            {
                                n?.image || image ?
                                    <meta name="og:image" content={process.env.IMG + (n?.image ? n?.image : image)} />
                                    : null
                            }
                            <meta name="og:image:alt" content={n?.title ? n?.title : title} />
                            <meta name="og:site_name" content="Iplanted Foundation" />
                            <meta name="og:description" content={n?.description ? n?.description : description} />
                        </React.Fragment>
                        :
                        <React.Fragment key={i}>
                            <meta name="twitter:card" content="summary_large_image" />
                            <meta name="twitter:description" content={n?.description ? n?.description : description} />
                            <meta name="twitter:title" content={n?.title ? n?.title : title} />
                            <meta name="twitter:site" content={url} />
                            {
                                n?.image || image ?
                                    <meta name="twitter:image" content={process.env.IMG + (n?.image ? n?.image : image)} />
                                    : null
                            }
                        </React.Fragment>
                )
            }
            <meta name="image_src" content={process.env.IMG + image} />
            <meta name="image_url" content={process.env.IMG + image} />
            <meta name="image" property="og:image" content={process.env.IMG + image} />
            <title>{title}</title>
            <link rel="icon" href="favicon.ico" sizes="32x32" />
            <link rel="icon" href="favicon.ico" sizes="192x192" />
            <link rel="apple-touch-icon-precomposed" href="favicon.ico" />
            <link rel='canonical' href={url} />
        </Head>
    )
}
export default SeoHeader;