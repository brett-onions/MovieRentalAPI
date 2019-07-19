const users         = require('./users');
const auth          = require('./auth');
const customers     = require('./customers');
const genres        = require('./genres');
const movies        = require('./movies');
const rentals       = require('./rentals');
const returns       = require('./returns');
const error         = require('../middleware/error');

module.exports = function(app){
    app.use('/api/auth',auth);
    app.use('/api/users',users);
    app.use('/api/customers',customers);
    app.use('/api/genres',genres);
    app.use('/api/movies',movies);
    app.use('/api/rentals',rentals);
    app.use('/api/returns',returns);
    app.use(error);
}