const fs = require('fs'),
stringifyObj = require('stringify-object'),
request = require('request');


console.log(`      \u2502\u2592\u2502 \/\u2592\/\r\n      \u2502\u2592\u2502\/\u2592\/\r\n      \u2502\u2592 \/\u2592\/\u2500\u252C\u2500\u2510\r\n      \u2502\u2592\u2502\u2592|\u2592\u2502\u2592\u2502\r\n      \u250C\u2534\u2500\u2534\u2500\u2510-\u2518\u2500\u2518 \r\n      \u2502\u2592\u250C\u2500\u2500\u2518\u2592\u2592\u2592\u2502\r\n      \u2514\u2510\u2592\u2592\u2592\u2592\u2592\u2592\u250C\u2518\r\n      \u2514\u2510\u2592\u2592\u2592\u2592\u250C\u2518\r\n`);
console.log('Welcome to the GitHub Avatar Downloader!')


const GITHUB_U = 'lankypete',
GITHUB_T = 'bf20d225f96dd06c538f3fe8b7eedbee31303174';

const urlConfig = {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Accept-Charset': 'utf-8',
        'User-Agent': 'GitHub Avatar Downloader - Student Project'
    }
};



function getRepoContributors(author, repo) {

  urlConfig.url = `https://${GITHUB_U}:${GITHUB_T}@api.github.com/repos/${author}/${repo}/contributors`;

  request( urlConfig , function(err, res, body){
    console.log('Errors: ', err);

    const users = JSON.parse(body);

    const userAvatarURLs = users.map(function(a){
      return a.avatar_url;
    })

  });
}


getRepoContributors('jquery', 'jquery');























