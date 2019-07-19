const {Movie} = require('../models/schemas/movie');

async function createMovie(movie = {tile,genre,numberInStock,dailyRentalRate}){
        const newMovie = new Movie(movie);
        return await newMovie.save();
}

async function getMovie(id){
    return new Promise(async(resolve,reject) =>{
        const movie = await Movie.findById(id).select('-__v');
        if(!movie) return reject(new Error('A movie by given ID does not exist'));
        return resolve(movie);
    });
}

async function getAllMovies(){
    const movies = await Movie.find().select('-__v');
    return movies;
}

async function updateMovie(id, movie = {tile,genre,numberInStock,dailyRentalRate}){
    return new Promise(async(resolve,reject) =>{
        const existingMovie = await Movie.findById(id).select('-__v');
        if(!existingMovie) return reject(new Error('The movie ID Provided does not exist'));

        Object.assign(existingMovie,movie);
        return resolve(existingMovie.save());

    });
}

async function deleteMovie(id){
    return new Promise(async (resolve,reject) =>{
        const existingMovie = await Movie.findById(id);
        if(!existingMovie) return reject(new Error('The movie ID Provided does not exist'));

        await Movie.findByIdAndRemove(id);
        resolve(existingMovie);
    });
}

exports.deleteMovie     = deleteMovie;
exports.getAllMovies    = getAllMovies;
exports.getMovie        = getMovie;
exports.createMovie     = createMovie;
exports.updateMovie     = updateMovie;
