const express                                           = require('express');
const router                                            = express.Router();
const {createRental,getAllRentals,getRental}            = require('../controllers/rentals.controller');
const auth                                              = require('../middleware/auth');
const admin                                             = require('../middleware/admin');
const existingMovie                                     = require('../middleware/existingMovie');
const availableForRent                                  = require('../middleware/availableForRent');
const existingCustomer                                  = require('../middleware/existingCustomer');
const {validateRental} = require('../services/validators/validateRental');

router.get('/',[auth],async(req,res) => {
    try{
        const rentals = await getAllRentals();
        res.status(200).json(rentals);
    }catch(err){
        res.status(400).json({error: err.message});
    }
});

router.get('/:id',[auth],async(req,res) => {
    try{
        const rental = await getRental(req.params.id);
        res.status(200).json(rental);
    }catch(err){
        res.status(400).json({error: err.message});
    }
});

router.post('/',[auth,existingMovie,existingCustomer,availableForRent],async(req,res) => {
    const {error} = validateRental(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    try {
        const rental = await createRental(req.body);
        console.log(rental);
        res.status(201).json(rental);
    } catch (err) {
        res.status(400).json({error:err.message});
    }
});

module.exports = router;