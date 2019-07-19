const {Movie} = require('../models/schemas/movie');

module.exports = async function(req,res,next){
    const movie = await Movie.findById(req.body.movieId);
    if(!movie) return res.status(400).json({error:"The movie ID provided does not exist"});
    req.body.movie = movie;
    delete req.body.movieId;
    next();
}