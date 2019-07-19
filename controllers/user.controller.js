const bcrypt = require("bcrypt");
const _ = require("lodash");
const {User} = require('../models/schemas/user');
const {validateUser} = require('../services/validators/validateUser');

async function createUser({name,email,password}){
    return new Promise(async(resolve,reject) =>{
        const newUser = {name,email,password};
        const {error} = validateUser(newUser);
        if(error) reject(new Error(error.details[0].message));
        
        const existingUser = await User.findOne({email: email});
        if(existingUser){
            reject(new Error('User is already registered'));
        }else{
            const user      = new User(newUser);
            const salt      = await bcrypt.genSalt(10);
            user.password   = await bcrypt.hash(user.password,salt);
            user.save();

            const token = user.generateAuthToken();
            const returnedUser = _.pick(user,["_id","name","email"]);
            resolve({returnedUser,token});
        }
    });
}

async function findUser(userId){
    return new Promise(async(resolve,reject) => {
        const user = await User.findById(userId).select('-password');
        if(user){
            resolve(user);
        }else{
            reject(new Error('There was an internal error, account not found.'));
        }
    });
}

//todo create user

exports.createUser = createUser;
exports.findUser   = findUser;