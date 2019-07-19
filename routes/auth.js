const mongoose = require('mongoose');
const express = require('express');
const {validateAuth} = require('../services/validators/validateAuth');
const {createAuthToken} = require('../controllers/auth.controller');
const router  = express.Router();

router.post('/', async (req,res) =>{
    const {error} = validateAuth(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    try {
        const token = await createAuthToken(req.body);
        res.status(201).header('x-auth-token',token).json({success:"Login Successful"});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
    
});

module.exports = router;