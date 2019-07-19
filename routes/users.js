const express = require('express');
const router  = express.Router();
const auth    = require('../middleware/auth');
const {createUser,findUser} = require('../controllers/user.controller');

router.post('/',async(req,res) => {
    try {
        const newUser = await createUser(req.body);
        res.header('x-auth-token',newUser.token).json(newUser.returnedUser);
    } catch (error) {
        res.status(400).json({"error":error.message});
    }
});

router.get('/me',auth,async (req,res) =>{
    try {
        const user = await findUser(req.user._id);
        res.json(user);
    } catch (error) {
        res.status(500).json({"error":error.message});
    }
});

module.exports = router;