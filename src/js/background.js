import { cookiesToRemove, domains, userAgents } from "./constants";

const doesURLBelongToDomain = (url, domain) => {
    let hostname = url;
    try {
        hostname = new URL(url).hostname;
    }
    catch (e) {}
    return (hostname === domain || hostname.endsWith(`.${domain}`));
}

const rerouteRefererHeader = (requestHeaders, url) => {
    const referer =  doesURLBelongToDomain(url, 'fd.nl') ? 'https://www.facebook.com/'
                  :  doesURLBelongToDomain(url, 'medium.com') ? 'https://t.co/'
                  : 'https://www.google.com/';

    return requestHeaders
        .filter(({ name }) => name !== 'Referer')
        .concat({ 
            'name': 'Referer', 
            'value': referer
        });
}

const spoofUserAgentHeader = (requestHeaders, url) => { 
    const isMobileUserAgent = requestHeaders
        .some(({ name, value }) => (name === 'User-Agent' && value.toLowerCase().includes('mobile')));

    const useBingBot = domains.useBingBot
        .some(domain => doesURLBelongToDomain(url, domain));

    const useGoogleBot = domains.useGoogleBot
        .some(domain => doesURLBelongToDomain(url, domain));
    
    const userAgentDesktop = useBingBot ? userAgents.bingDesktop 
                           : useGoogleBot ? userAgents.googleDesktop 
                           : null;

    const userAgentMobile = useBingBot ? userAgents.bingMobile 
                           : useGoogleBot ? userAgents.googleMobile 
                           : null;
                           
    if (useBingBot || useGoogleBot) {
        requestHeaders = requestHeaders
            .filter(({ name }) => (name !== 'User-Agent' || name !== 'X-Forwarded-For'))
            .concat({ 
                'name': 'User-Agent', 
                'value': isMobileUserAgent ? userAgentMobile : userAgentDesktop
            });

        if (useGoogleBot) {
            requestHeaders = requestHeaders
                .concat({
                    'name': 'X-Forwarded-For', 
                    'value': '66.249.66.1' 
                });
        }
    }

    return requestHeaders;
}

const blockCookiesHeader = (requestHeaders, url) => {
    const doesDomainNeedCookies = domains.allowCookies
        .some(domain => doesURLBelongToDomain(url, domain));

    if (!doesDomainNeedCookies) {
        return requestHeaders
            .map(({ name, value }) => ({ name, value: (name === 'Cookie') ? '' : value }));
    }
        
    return requestHeaders;
}

const bypassPaywall = ({ requestHeaders, url }) => {
    requestHeaders = rerouteRefererHeader(requestHeaders, url);
    requestHeaders = spoofUserAgentHeader(requestHeaders, url);
    requestHeaders = blockCookiesHeader(requestHeaders, url);
    return { requestHeaders };
}

const removeCookies = ({ url }) => {    
    const domain = domains.removeCookies
        .find(domain => doesURLBelongToDomain(url, domain)) || '';
    
    chrome.cookies.getAll({ domain }, cookies => {
        cookies
            .filter(cookie => cookiesToRemove.includes(cookie.name))
            .forEach(cookie => chrome.cookies.remove({ 
                url: `http${cookie.secure && 's'}://${cookie.domain}${cookie.path}`,
                name: cookie.name,
                storeId: cookie.storeId
            }));
    });
}

chrome.webRequest.onBeforeSendHeaders.addListener(
    bypassPaywall, 
    { urls: ['<all_urls>'] }, 
    ['requestHeaders', 'blocking', chrome.webRequest.OnBeforeSendHeadersOptions.EXTRA_HEADERS].filter(Boolean)
);

chrome.webRequest.onCompleted.addListener(
    removeCookies, 
    { urls: ['<all_urls>'] }
);
