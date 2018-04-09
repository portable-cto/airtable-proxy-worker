/**
 * HTTP Proxy to Airtable API with Cloudflare Worker.
 */
const airtableBaseUrl = '';
const airtableKey = '';
const allowedRoutes = [];
const prefix = '/api/';

function canProxy(request) {
    const url = new URL(request.url);

    return allowedRoutes.find(route => {
        return (
            url.pathname.startsWith(prefix) &&
            url.pathname.endsWith(route.path) &&
            request.method === route.method
        );
    });
}

function getTargetUrl(request) {
    const url = new URL(request.url);
    const remainingUrl = url.pathname.replace(new RegExp('^' + prefix), '');
    let targetUrl = airtableBaseUrl + decodeURIComponent(remainingUrl);

    if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
        targetUrl = url.protocol + '//' + targetUrl;
    }

    return targetUrl;
}

async function proxyRequest(request) {
    if (canProxy(request)) {
        return fetch(getTargetUrl(request), {
            headers: {
                'Authorization': `Bearer ${airtableKey}`,
                'Content-type': 'application/json'
            }
        });
    } else {
        return new Response('Bad Request', { status: 400, statusText: 'Bad Request' });
    }
}

if (typeof addEventListener === 'function') {
    addEventListener('fetch', (fe) => fe.respondWith(proxyRequest(fe.request)));
}
