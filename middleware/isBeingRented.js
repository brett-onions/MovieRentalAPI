const {Rental} = require('../models/schemas/rental');

module.exports = async function(req,res,next){

    
    
    rental.return();
    
    console.log(req.body.movieId);
    delete rental.__v;

    req.body.rental = rental;

    next();
    
}