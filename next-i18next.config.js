
module.exports = {
    // debug: process.env.MODE === 'development',
    debug: false,
    i18n: {
        defaultLocale: "en",
        locales: ['ar', 'en'],
        localeDetection: false,
    },
    reloadOnPrerender: process.env.MODE === 'development',
};