const {Genre}           = require('../models/schemas/genre');

async function getAllGenres(){
    return await Genre.find().select('-__v');
}

async function getGenre(id){
    return new Promise(async (resolve,reject)=>{
        const genre = await Genre.findById(id).select('-__v');
        if (!genre) {
            reject(new Error('No genre found with given id'));
        } else {
            resolve(genre);
        }
    });
}

async function createGenres({name}){
    return new Promise(async (resolve,reject) => {
        const existingGenre = await Genre.findOne({name:name});
        console.log(existingGenre);
        if(existingGenre){
            return reject(new Error('The genre provided already exists'));
        }
        
        const newGenre = await new Genre({name});
        newGenre.save();
        if (!newGenre) {
            reject(new Error('There was an error creating a genre'));
        } else {
            resolve(newGenre);
        }
    });
}

async function updateGenre(id,{name}){
    return new Promise(async (resolve,reject)=>{
        const genre = await Genre.findByIdAndUpdate(id,{name},{new:true}).select('-__v');
        if(!genre){
            reject(new Error('The Genre ID provided does not exist'));
        }else{
            resolve(genre);
        }
    });
}

async function deleteGenre(id){
    return new Promise(async (resolve, reject)=>{
        const genre = await Genre.findById(id);
        const deleteGenre = await Genre.findByIdAndRemove(id);
        if(!genre){
            reject(new Error('The Genre ID does not exist'));
        }else{
            resolve(genre);
        }
    });
}

exports.getAllGenres    = getAllGenres;
exports.getGenre        = getGenre;
exports.createGenres    = createGenres;
exports.updateGenre     = updateGenre;
exports.deleteGenre     = deleteGenre;