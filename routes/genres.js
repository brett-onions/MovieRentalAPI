const express           = require('express');
const auth              = require('../middleware/auth');
const admin             = require('../middleware/admin');
const validateObjectId  = require('../middleware/validateObjectId');
const {createGenres,deleteGenre,getAllGenres,getGenres,updateGenre} = require('../controllers/genres.controller');
const {validateGenre}  = require('../services/validators/validateGenre');
const router            = express.Router();

router.get('/',[auth], async (req,res) =>{
    const genres = await getAllGenres();
    res.status(200).json(genres);
});

router.get('/:id',[auth,validateObjectId],async(req,res) =>{
    try {
        const genre = await getGenre(req.params.id);
        res.status(200).json(genres);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

router.post('/',[auth], async (req,res)=>{
    const {error} = validateGenre(req.body);
    if(error) return res.status(400).json(error.details[0].message);
    try {
        const genre = await createGenres(req.body);
        res.status(201).json(genre);
    } catch (err) {
        res.status(400).json({error: err.message});
    }
});

router.put('/:id',[auth,validateObjectId], async (req,res) =>{
    const {error} = validateGenre(req.body);
    if(error) return res.status(400).json(error.details[0].message);
    try {
        const genre = await updateGenre(req.params.id,req.body);
        res.status(200).json(genre);
    } catch (error) {
        res.status(400).json({error:error.message});
    }
});

router.delete('/:id',[auth,admin,validateObjectId], async (req,res) =>{
    try {
        const genre = await deleteGenre(req.params.id);
        res.status(200).json(genre);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

module.exports = router;