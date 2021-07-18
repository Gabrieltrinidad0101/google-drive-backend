const jwt = require("jsonwebtoken");

class createJWT{
    getToken(data){
        return jwt.sign({data},"djaksjdkasjdkjaskdjaksjdkasjkdjaskldjaskljdklasjkllasjkdlaldjkashdjhasjkdhjkashkd")
    }

    async verify(token){
        return await jwt.verify(token,"djaksjdkasjdkjaskdjaksjdkasjkdjaskldjaskljdklasjkllasjkdlaldjkashdjhasjkdhjkashkd");
    }
}

module.exports = createJWT;