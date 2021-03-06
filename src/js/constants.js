const domains = {
    allowCookies: [
        'ad.nl',
        'bd.nl',
        'bndestem.nl',
        'brisbanetimes.com.au',
        'canberratimes.com.au',
        'cen.acs.org',
        'dailytelegraph.com.au',
        'demorgen.be',
        'denverpost.com',
        'destentor.nl',
        'ed.nl',
        'elmundo.es',
        'examiner.com.au',
        'expansion.com',
        'financialpost.com',
        'gelderlander.nl',
        'gelocal.it',
        'gelocal.it',
        'grubstreet.com',
        'haaretz.co.il',
        'haaretz.com',
        'handelsblatt.com',
        'harpers.org',
        'hbr.org',
        'humo.be',
        'lesechos.fr',
        'lrb.co.uk',
        'medium.com',
        'mercurynews.com',
        'newstatesman.com',
        'nrc.nl',
        'nymag.com',
        'nzz.ch',
        'ocregister.com',
        'parool.nl',
        'pzc.nl',
        'qz.com',
        'scientificamerican.com',
        'seattletimes.com',
        'seekingalpha.com',
        'sofrep.com',
        'spectator.co.uk',
        'speld.nl',
        'sueddeutsche.de',
        'techinasia.com',
        'telegraaf.nl',
        'the-american-interest.com',
        'theadvocate.com.au',
        'theage.com.au',
        'theatlantic.com',
        'theaustralian.com.au',
        'thecut.com',
        'thediplomat.com',
        'thehindu.com',
        'themarker.com',
        'themercury.com.au',
        'time.com',
        'towardsdatascience.com',
        'trouw.nl',
        'tubantia.nl',
        'vn.nl',
        'volkskrant.nl',
        'vulture.com',
        'zeit.de',
    ],
    removeCookies: [
        'ad.nl',
        'bd.nl',
        'bloombergquint.com',
        'bndestem.nl',
        'brisbanetimes.com.au',
        'canberratimes.com.au',
        'cen.acs.org',
        'demorgen.be',
        'denverpost.com',
        'destentor.nl',
        'ed.nl',
        'examiner.com.au',
        'gelderlander.nl',
        'globes.co.il',
        'grubstreet.com',
        'harpers.org',
        'hbr.org',
        'humo.be',
        'lesechos.fr',
        'medium.com',
        'mercurynews.com',
        'newstatesman.com',
        'nrc.nl',
        'nymag.com',
        'ocregister.com',
        'pzc.nl',
        'qz.com',
        'scientificamerican.com',
        'seattletimes.com',
        'sofrep.com',
        'spectator.co.uk',
        'speld.nl',
        'telegraaf.nl',
        'theadvocate.com.au',
        'theage.com.au',
        'theatlantic.com',
        'thecut.com',
        'thediplomat.com',
        'towardsdatascience.com',
        'tubantia.nl',
        'vn.nl',
        'vulture.com',
        'wsj.com',
    ],
    useGoogleBot: [
        'adelaidenow.com.au',
        'barrons.com',
        'couriermail.com.au',
        'df.cl',
        'fd.nl',
        'ft.com',
        'genomeweb.com',
        'handelsblatt.com',
        'heraldsun.com.au',
        'kansascity.com',
        'lavoixdunord.fr',
        'ntnews.com.au',
        'nzz.ch',
        'quora.com',
        'republic.ru',
        'seekingalpha.com',
        'telegraph.co.uk',
        'theaustralian.com.au',
        'themercury.com.au',
        'thenational.scot',
        'wired.com',
        'wsj.com',
        'zeit.de',
    ],
    useBingBot: [
        'haaretz.co.il',
        'haaretz.com',
        'themarker.com',
    ]
};

const userAgents = {
    bingDesktop: 'Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)',
    bingMobile: 'Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/W.X.Y.Z Mobile Safari/537.36 Edg/W.X.Y.Z (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)',
    googleDesktop: 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
    googleMobile: 'Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/W.X.Y.Z Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
};

const cookiesToRemove = [
    'counter',
    'socialread',
    'speld-paywall',
    'TDNotesRead',
    'temptationTrackingId', 
    'TID_ID',
];

export { cookiesToRemove, domains, userAgents };
