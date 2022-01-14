////////////////Modules\\\\\\\\\\\\\\\\\\\\\

//token module
const Createjwt = require("../../config/config.jwt");

//User
const User = require("../../models/models.user");

//classes
const jwt = new Createjwt();

const user = {};

user.login = async (req,res)=>{
    try {
        //get user`s data
        const {email,password} = req.body;

        //get user in the database
        const user = await User.findOne({email,password});
        //check if all is right
        if(!email || !password)
            return res.status(400).json("Fill in all the parameters")
        if(!user)
            return res.status(400).json("the email no exist")
        
    
        //create the token
        const token = jwt.getToken(user);
    
        //send cookie
        res.cookie("token",token,{httpOnly: true,SameSite='None'})
        res.json("ok");

    } catch (error) {
        //send error
        res.status(500).json(error)
    }
}   

module.exports = user;