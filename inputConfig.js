require('dotenv').config(),
errors = require('./errors.js');

function inputConfig(author, repo) {
  //A simple if statement to end function if parameters are invalid
  if( author === undefined || repo === undefined ) {
    errors.repoError();
    return;
  }

  //Define the variables used to access the github API
  const GITHUB_U = process.env.GIT_USER;
  const GITHUB_T = process.env.GIT_TOKEN;

  //for errors reading the github username or password
  if( !GITHUB_U || !GITHUB_T ) {
    errors.userTokenError();
    return undefined;
  }

  const urlConfig = {
      //The URL will be added in the function
      method: 'GET',
      headers: {
          'Accept': 'application/json',
          'Accept-Charset': 'utf-8',
          'User-Agent': 'GitHub Avatar Downloader - Student Project'
      }
  };

  //This is the specific project API URL
  urlConfig.url = `https://${GITHUB_U}:${GITHUB_T}@api.github.com/repos/${author}/${repo}/contributors`;

  //So far so good
  console.log('The users avatars of the ' + repo + ' repo will be added to the Avatars directory!')

  return urlConfig;

}

module.exports = {
  inputConfig: inputConfig
}
