const express = require('express');
const {validateCustomer} = require('../services/validators/validateCustomer');
const {createNewCustomer,deleteCustomer,getAllCustomer,getCustomer,updateCustomer} = require('../controllers/customer.controller');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/',[auth],async (req,res) => {
    const customers = await getAllCustomer();
    res.json(customers);
});

router.get('/:id',[auth],async (req,res) => {
    try {
        const customer = await getCustomer(req.params.id);
        res.status(200).json(customer);
    } catch (error) {
        res.status(404).json({"error": error.message});
    }
});

router.post('/',[auth],async (req,res)=>{
    const {error} = validateCustomer(req.body);
    if(error) res.status(400).json(error.details[0].message);
    try {
        const newCustomer = await createNewCustomer(req.body);
        res.status(201).json(newCustomer);
    } catch (error) {
        res.status(400).json({"error":error.message});
    }
});

router.put('/:id',[auth],async (req,res)=>{
    const { error } = validateCustomer(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    req.body.id = req.params.id;
    try {
        const customer = await updateCustomer(req.body);
        res.status(200).json(customer);
    } catch (error) {
        res.status(400).json({"error":error.message});
    }
});

router.delete('/:id',[auth],async (req,res)=>{
    try {
        const customer = await deleteCustomer(req.params.id);
        res.status(200).json(customer);
    } catch (error) {
        res.status(400).json({"error":error.message});
    }
});

module.exports = router;