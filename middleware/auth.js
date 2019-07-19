const jwt = require('jsonwebtoken');

module.exports = function(req,res,next){
    const token = req.header("x-auth-token");
    if(!token) res.status(401).json({"error":"Access Denied. No Token Provided"});

    try {
        const decoded = jwt.verify(token,"jwtPrivateKey");
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({"error":"Invalid Token Provided"});
    }
}