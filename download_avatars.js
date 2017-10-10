const peaceArt = require('./peace-art'),
functions = require('./functions.js');

peaceArt();

const inputs = process.argv.slice(2);
functions.getRepoContributors(inputs[0], inputs[1]);

























