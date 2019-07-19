const {Customer} = require('../models/schemas/customer');

async function getAllCustomer(){
    return await Customer.find().select("-__v").sort("name");
}

async function getCustomer(id){
    return new Promise(async (resolve,reject) =>{
        const customer = await Customer.findById(id);
        if(!customer){
            reject(new Error('The customer id was not found'));
        }else{
            resolve(customer);
        }
    });
}

async function createNewCustomer(customer = {name,isGold,phone}){
    const newCustomer = new Customer(customer);
    return await newCustomer.save();
}

async function updateCustomer({id,name,isGold,phone}){
    return new Promise( async (resolve,reject)=>{
        const customer = await Customer.findByIdAndUpdate(
            id,
            {
                name,
                isGold,
                phone
            },
            {new:true}
        );
        if (!customer) {
            reject(new Error('The customer id given does not exist'));
        } else {
            resolve(customer);
        }
    });
}

async function deleteCustomer(id){
    return new Promise(async (resolve,reject) =>{
        const customer = await Customer.findById(id).select('-__v');
        const deletedCustomer = await Customer.findByIdAndRemove(id);
        if(!customer){
            reject(new Error('The customer id given does not exist'));
        }else{
            resolve(customer);
        }
    });
}

exports.getAllCustomer      = getAllCustomer;
exports.getCustomer         = getCustomer;
exports.createNewCustomer   = createNewCustomer;
exports.updateCustomer      = updateCustomer;
exports.deleteCustomer      = deleteCustomer;