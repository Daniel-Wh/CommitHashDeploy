/* eslint-disable no-useless-escape */
'use strict';


function parseCookies(headers) {
    const parsedCookie = {};
    if (headers.cookie) {
        headers.cookie[0].value.split(';').forEach((cookie) => {
            if (cookie) {
                const parts = cookie.split('=');
                parsedCookie[parts[0].trim()] = parts[1].trim();
            }
        });
    }
    return parsedCookie;
}

const pointsToFile = uri => /\/[^/]+\.[^/]+$/.test(uri);

export const handler = (event, context, callback) => {
    // Cookie name that will be used to determine the if dynamic routing needed
    const sourceHash = 'X-source';
    // path for develop environment --- This value should be unique for each environment
    const developPath = 'develop';

    var request = event.Records[0].cf.request;
    const headers = request.headers;


    // Extract the URI from the request and validate route to file or folder
    var oldUri = request.uri;
    var newUri;

    // Spa App only needs to route to the base path in s3, browser routing will handle in app routes
    // Can later distinguish between microfrontends by checking the path here
    const paths = oldUri.split('/');
    if (paths.length > 1) {
        oldUri = '/' + paths[paths.length - 1];
    }
    // If the URI points to an html file that is not index.html, set it as index.html
    // else return base app (spa entry point is index.html)
    if (pointsToFile(oldUri)) {
        if(oldUri.includes('html')) {
            newUri = '/develop/index.html'
        } else {
            newUri = '/develop/assets' + oldUri
        }
        
    } else {
        newUri = oldUri.replace(/\/$/, '\/develop\/index.html');
    }


    // Log the URI as received by CloudFront and the new URI to be used to fetch from origin
    console.log("Old URI: " + oldUri);
    console.log("New URI: " + newUri);

    // Replace the received URI with the URI that includes the index page
    request.uri = newUri;


    if (headers.cookie) {
        for (let i = 0; i < headers.cookie.length; i++) {
            if (headers.cookie[i].value.indexOf(sourceHash) >= 0) {
                console.log('source has cookie found');
                const parsedCookies = parseCookies(headers)
                request.uri = request.uri.replace(developPath, parsedCookies[sourceHash]);
                break;
            }
        }
    }



    console.log(`Request uri set to "${request.uri}"`);
    callback(null, request);
};
