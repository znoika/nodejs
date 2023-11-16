const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require('url');
const PORT = 3500;
const qs = require('querystring');

let cookie;

const users = require('./users');

const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.wav': 'audio/wav',
    '.mp4': 'video/mp4',
    '.woff': 'application/font-woff',
    '.ttf': 'application/font-ttf',
    '.eot': 'application/vnd.ms-fontobject',
    '.otf': 'application/font-otf',
    '.wasm': 'application/wasm',
};

function staticFile(res, filePath, ext) {
    res.setHeader('Content-Type', mimeTypes[ext]);
    fs.readFile('./public' + filePath, (error, data) => {
        if (error) {
            res.statusCode = 404;
            res.end();
        }
        res.end(data);
    });
}

function parseCookies (request) {
    const list = {};
    const cookieHeader = request.headers?.cookie;
    if (!cookieHeader) return list;

    cookieHeader.split(`;`).forEach(function(cookie) {
        let [ name, ...rest] = cookie.split(`=`);
        name = name?.trim();
        if (!name) return;
        const value = rest.join(`=`).trim();
        if (!value) return;
        list[name] = decodeURIComponent(value);
    });
    return list;
}

function findUser(name, pass) {
    for (let uid in users) {
        if (users[uid].name === name && users[uid].pass === pass) return uid;
    }
    return false;
}

http.createServer(function(req, res){
    let url = req.url;
    url = url.split('?')[0];
    console.log(url);

    switch (url) {
        case '/':
            console.log('main page');
            staticFile(res, '/html/main.html', '.html');
            break;

        case '/about':
            console.log('main page');
            staticFile(res, '/html/about.html', '.html');
            break;

        case '/contact':
            console.log('main page');
            staticFile(res, '/html/contact.html', '.html');
            break;

        case '/admin':
            console.log('admin page');
            cookies = parseCookies(req);
            console.log(cookies);
            if (cookies.uid in users) {
                staticFile(res, '/html/admin.html', '.html');
            }
            else {
                staticFile(res, '/html/not_admin.html', '.html');
            }
            break;
          
          
        case '/login':
            console.log('login page');
            cookies = parseCookies(req);

            cookie = parseCookies(req);
            if ('uid' in cookie) {
                res.setHeader('Set-Cookie', ['uid="";max-age=-1', 'u=;max-age=0']);
                staticFile(res, '/html/exit.html', '.html');
            }
            else {
                staticFile(res, '/html/login.html', '.html');
            }
            break;

        case '/cabinet':
            console.log('checkuser');

            let body = '';

            req.on('data', function (data) {
                body += data;
                if (body.length > 1e6)
                    request.connection.destroy();
            });
    
            req.on('end', function () {
                let post = qs.parse(body);
                const login = post.login;
                const password = post.password;

                let uid = findUser(login, password);
                if (uid) {
                    console.log('yes');
                    res.setHeader('Set-Cookie',['uid='+ uid,  'u='+ users[uid]['name'] ]);
                    staticFile(res, '/html/cabinet.html', '.html');
                }
                else {
                    res.writeHead(200, {
                        "Set-Cookie": ['uid=;max-age=0', 'u=;max-age=0'], 
                        "Content-Type": 'text/plain'
                    });
                }
            });
            break;

        case '/exit':  {
            console.log('exit');
            res.setHeader('Set-Cookie', ['uid="";max-age=-1','u=;max-age=0']);
            staticFile(res, '/html/exit.html', '.html');
            break;
        }
        default:
            const extname = String(path.extname(url)).toLocaleLowerCase();
            if(extname in mimeTypes) staticFile(res, url, extname);
            else {
                res.statusCode = 404;
                res.end();
            }
    }

}).listen(PORT);


// ItGid.info - education platform
// course NODE.JS 2024
// https://itgid.info/course/nodejs-2024