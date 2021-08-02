const JWT = require("../config/config.jwt")

const jwt = new JWT()

async function auth(req,res,next){
    try{
        const token = req.cookies.token;
        if(!token) return next()
        console.log(token)
        const verified = await jwt.verify(token)
        req.user = verified.data
        next()
    } catch (error){
        res.status(401).json({errorMessage: "Unauthorized"});
    }
}

module.exports = auth;