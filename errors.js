function userTokenError() {
  console.log('There was a problem accessing your github credidentials\n -');
  console.log('Please make sure to include them in a .env file..\n -');
  console.log('Reference these instructions: https://github.com/motdotla/dotenv\n');
}

function repoError() {
  console.log('\nTry again with a valid Account and Repo name in the prompt..\n');
}

function apiEmptyError(repo) {
  console.log('\nhmmm.. There\'s no data on this repository "' + repo + '".. typo?\n');

}

function extraArgs(num) {
  console.log('\n! ! ! You entered ' + num + ' arguments, that\'s too many.. we\'ll try and carry on anyway..\n. . .');
}

module.exports = {
  userTokenError: userTokenError,
  repoError: repoError,
  apiEmptyError: apiEmptyError,
  extraArgs: extraArgs
}