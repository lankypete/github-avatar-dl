const fs = require('fs'),
request = require('request'),
inputConfig = require('./inputConfig'),
errors = require('./errors.js');

function getRepoContributors(author, repo) {
  //A couple welcome messages
  console.log('Welcome to the GitHub Avatar Downloader!')

  //Call the config function now that we have all inputs
  const inputObj = inputConfig.inputConfig(author, repo);

  //if input Obj was return undefined, we cannot proceed
  if(!inputObj) { return; }

  //Use the request method the build an array of each contributor
  request( inputObj , function(err, res, body){
    if(err) { console.log('Errors: ', err); return; };

    //Parse the body of the response to an object
    const users = JSON.parse(body);

    //Check the responce for a message "not found" which will be an error
    if(users.message === 'Not Found') {
      errors.apiEmptyError(repo);
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

