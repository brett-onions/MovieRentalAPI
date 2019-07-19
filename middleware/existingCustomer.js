const {Customer} = require('../models/schemas/customer');

module.exports = async function (req,res,next){
    if(!req.body.customerId) return res.status(400).json({Error: "No customer ID Provided"});

    const customer = await Customer.findById(req.body.customerId);
    if(!customer) return res.status(400).json({error: "The customer does not exist"});
    
    req.body.customer = customer;
    delete req.body.customerId;
    next();
}