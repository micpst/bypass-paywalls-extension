import { cookiesToRemove, domains, userAgents } from "./constants";

const doesURLBelongToDomain = (url, domain) => {
    const { hostname } = new URL(url);
    return (hostname === domain || hostname.endsWith(`.${domain}`));
}

const rerouteRefererHeader = (requestHeaders, url) => 
    requestHeaders
        .filter(({ name }) => name !== 'Referer')
        .concat({ 
            'name': 'Referer', 
            'value': 'https://t.co/' 
        });

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
    const allowCookies = domains.allowCookies
        .some(domain => doesURLBelongToDomain(url, domain));

    if (!allowCookies) {
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
            .forEach(cookie => chrome.cookies.remove(cookie));
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
