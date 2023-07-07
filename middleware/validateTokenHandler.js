const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');


const validateToken = asyncHandler (async(req,res,next)=>{
    let token;
    let authHeader = req.headers.authorization || req.headers.Authorization;
    if(authHeader){
        token = authHeader;
        jwt.verify(token,process.env.ACCESS_TOKEN,(err,decoded)=>{
            if(err){
                res.status(401);
                throw new Error('User is not uthorized');
            }
            req.user = decoded.user;
            next();
        });
        if(!token){
            res.status(401);
            throw new Error('User is not authorized or token is missing')
        }
    }
});

module.exports = validateToken;