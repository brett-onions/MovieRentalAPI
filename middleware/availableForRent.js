const {Movie} = require('../models/schemas/movie');

module.exports = async function(req,res,next){
    const movie = await Movie.findById(req.body.movie._id);
    if(movie.numberInStock == 0) return res.status(200).json({error: "Movie is out of stock"});

    next();
};