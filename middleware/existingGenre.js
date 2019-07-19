const {Genre} = require('../models/schemas/genre');

module.exports = async function(req,res,next){
    const genre = await Genre.findById(req.body.genre.id);
    if (!genre) return res.status(400).json({error:"invalid Genre"});

    next();
}