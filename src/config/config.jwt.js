const jwt = require("jsonwebtoken");

class createJWT{
    getToken(data){
        return jwt.sign({data},process.env.KEY)
    }

    async verify(token){
        return await jwt.verify(token,process.env.KEY);
    }
}

module.exports = createJWT;