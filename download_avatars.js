const peaceArt = require('./peace-art'),
functions = require('./functions'),
errors = require('./errors');

peaceArt();

const inputs = process.argv.slice(2);
if( inputs.length > 2 ) { errors.extraArgs( inputs.length ) }
functions.getRepoContributors(inputs[0], inputs[1]);
