const express = require('express');
const bcrypt  = require('bcrypt');
const jwt     = require('jsonwebtoken');
const router  = express.Router();
const {User} = require('../models/schemas/user');

async function createAuthToken({email,password}){
    return new Promise(async (resolve,reject) =>{
        const user = await User.findOne({email: email});
        if(!user) return reject(new Error('Account does not exist'));

        const validPassword = await bcrypt.compare(password,user.password);
        if(!validPassword) return reject(new Error("Invalid username/password combination"));

        const token = user.generateAuthToken();
        return resolve(token);
    });
}

exports.createAuthToken = createAuthToken;