const Profile = require('./profile');
const renderer = require('./renderer');
const querystring = require('querystring');
const path = require('path');

const commonHeaders = { 'content-type': 'text/html' };
//2. Handle HTTP route GET / and POST / i.e. Home
function homeRoute(request, response) {
    if (request.url === '/') {
        if (request.method.toLowerCase() === 'get') {
            response.writeHead(200, commonHeaders);
            renderer.view('header', {}, response);
            renderer.view('search', {}, response);
            renderer.view('footer', {}, response);
            response.end();
        } else {
            request.on('data', data => {
                const query = querystring.parse(data.toString());
                response.writeHead(303, { 'Location': `/${query.username}` });
                response.end();
            });
        }
    }
}

//3. Handle route GET /:username i.e. /garrettkucinski
function userRoute(request, response) {
    const username = request.url.replace('/', '');
    if (username.length > 0) {
        response.writeHead(200, commonHeaders);
        renderer.view('header', {}, response);

        const studentProfile = new Profile(username);

        studentProfile.on('end', (userProfile) => {
            const userData = {
                avatarUrl: userProfile.gravatar_url,
                username: userProfile.profile_name,
                badgeCount: userProfile.badges.length,
                javascriptPoints: userProfile.points.JavaScript
            };
            renderer.view('profile', userData, response);
            renderer.view('footer', {}, response);
            response.end();
        });

        studentProfile.on('error', error => {
            renderer.view('error', { errorMessage: error.message }, response);
            renderer.view('search', {}, response);
            renderer.view('footer', {}, response);
            response.end();
        });
    }
}

function serveCss(request, response) {
    console.log(request.url);
    if (request.url === '/css/app.css') {
        if (request.method.toLowerCase() === 'get') {
            response.writeHead(200, { 'content-type': 'text/css' });
            renderer.css(response);
            response.end();
        }

        response.on('error', error => {
            console.error(error.message);
        });
    }

}

module.exports.home = homeRoute;
module.exports.user = userRoute;
module.exports.css = serveCss;