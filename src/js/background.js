const userAgentDesktop = 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)';
const userAgentMobile = 'Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/W.X.Y.Z Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)';

const bypassPaywall = ({ requestHeaders }) => {
    requestHeaders = requestHeaders
        .filter(({ name }) => name !== 'Referer')
        .concat({ 
            'name': 'Referer', 
            'value': 'https://t.co/' 
        });

    requestHeaders = requestHeaders
        .filter(({ name }) => (name !== 'User-Agent' || name !== 'X-Forwarded-For'))
        .concat({ 
            'name': 'User-Agent', 
            'value': userAgentDesktop
        }, { 
            'name': 'X-Forwarded-For', 
            'value': '66.249.66.1' 
        });
 
    return { requestHeaders };
}

chrome.webRequest.onBeforeSendHeaders.addListener(
    bypassPaywall, 
    { urls: ['<all_urls>'] }, 
    ['requestHeaders', 'blocking', chrome.webRequest.OnBeforeSendHeadersOptions.EXTRA_HEADERS].filter(Boolean)
);