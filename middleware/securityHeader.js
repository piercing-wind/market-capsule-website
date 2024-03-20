const secureHeader = (req, res, lang) => {
    res.setHeader('cache-control', 'no-cache, no-transform')
    res.setHeader('expires', '-1')
    res.setHeader('pragma', 'no-cache');
    res.setHeader('X-XSS-Protection', '1');
    res.setHeader('x-frame-options', 'SAMEORIGIN');
    res.setHeader('accept-language', lang);
}
export { secureHeader };