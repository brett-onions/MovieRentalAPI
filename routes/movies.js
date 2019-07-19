const express = require('express');
const {createMovie,deleteMovie,getAllMovies,getMovie,updateMovie} = require('../controllers/movies.controller');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const existingGenre = require('../middleware/existingGenre');
const {validateMovie} = require('../services/validators/validateMovie');

router.get('/',[auth], async (req,res) =>{
    const movies = await getAllMovies();
    res.status(200).json(movies);
});

router.get('/:id',[auth], async (req,res) => {
    try {
        const movie = await getMovie(req.params.id);
        res.status(200).json(movie);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

router.post('/',[auth,existingGenre], async (req,res)=>{
    const {error} = validateMovie(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    try {
        const movie = await createMovie(req.body);
        res.status(201).json(movie);    
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

router.put('/:id',[auth,existingGenre],async (req,res)=>{
    const {error} = validateMovie(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    try {
        const movie = await updateMovie(req.params.id,req.body);
        res.status(200).json(movie);    
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

router.delete('/:id',[auth,admin], async (req,res) =>{
    try {
        const movie = await deleteMovie(req.params.id);
        res.status(200).json(movie);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

module.exports = router;
