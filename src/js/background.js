const bypassPaywall = ({ requestHeaders }) => {
    requestHeaders = requestHeaders
        .filter(({ name }) => name !== "Referer")
        .push({ "name": "Referer", "value": "https://t.co/" });

    return { requestHeaders };
}

chrome.webRequest.onBeforeSendHeaders.addListener(
    bypassPaywall, 
    { urls: ['<all_urls>'] }, 
    ['requestHeaders', 'blocking', chrome.webRequest.OnBeforeSendHeadersOptions.EXTRA_HEADERS].filter(Boolean)
);