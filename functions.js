const fs = require('fs'),
request = require('request');
require('dotenv').config();
//Define the variables used to access the github API
const GITHUB_U = process.env.GIT_USER;
const GITHUB_T = process.env.GIT_TOKEN;
const urlConfig = {
    //The URL will be added in the function
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Accept-Charset': 'utf-8',
        'User-Agent': 'GitHub Avatar Downloader - Student Project'
    }
};

function getRepoContributors(author, repo) {
  //A simple if statement to end function if parameters are invalid
  if( author === undefined || repo === undefined ) {
    console.log('Please enter a valid Account and Repo name')
    return;
  }

  //A couple welcome messages
  console.log('Welcome to the GitHub Avatar Downloader!')
  console.log('The users avatars of the ' + repo + ' repo will be added to the Avatars directory!')

  //Firstly, we build an array of contributors to a repo
  //This is the specific project API URL
  urlConfig.url = `https://${GITHUB_U}:${GITHUB_T}@api.github.com/repos/${author}/${repo}/contributors`;

  //Use the request method the build an array of each contributor
  request( urlConfig , function(err, res, body){
    if(err) { console.log('Errors: ', err); return; };

    //Parse the body of the response to an object
    const users = JSON.parse(body);

    //Check the responce for a message "not found" which will be an error
    if(users.message === 'Not Found') {
      console.log('\n!!! Something Went Wrong, There\'s no data on this repository !!!\n');
      return;
    }

    //Build an array with more specific properties,
    //All we need is the Username and Avatar URL
    const userNameAndAvatarURLs = users.map(function(a){
      const userNameAvatarObj = {
        userLogin : a.login,
        avatarURL : a.avatar_url
      }
      return userNameAvatarObj;
    })

    //Loop through the users and call downloadImageByURL function
    userNameAndAvatarURLs.forEach(function(user){
      const avatarURL = user.avatarURL;
      const filePath = "./Avatars/" + user.userLogin + '.png';
      downloadImageByURL(avatarURL, filePath);
    })

  });

}
//To download the desired images inside the Avatars directory
function downloadImageByURL(imgURL, path) {
  //if statement to create a directory if none exists
  if (!fs.existsSync('Avatars')){
      fs.mkdirSync('Avatars');
  }
  //send the stream request to download and pipe the images into the Avatars directory
  request(imgURL)
  .on('error', function(err) { throw err; })
  .pipe(fs.createWriteStream(path))
  .on('finish', function(){ console.log('Downloaded an Image!' ); });

}

module.exports = {
  getRepoContributors: getRepoContributors,
  downloadImageByURL: downloadImageByURL
}
































