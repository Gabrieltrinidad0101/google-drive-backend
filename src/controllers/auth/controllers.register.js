////////////////////////modules\\\\\\\\\\\\\\\\\\\\\\\\\\

//user database
const User = require("../../models/models.user");

//email module
const Email = require("../../config/config.nodemiler");

//token module
const Createjwt = require("../../config/config.jwt");

//user
const user = {};

//clases
const jwt = new Createjwt();
const newEmail = new Email();

//register
user.register = async (req,res)=>{
    try {
        //get parameters
        const {name,email,password,passwordVerify} = req.body;

        //Number for the password
        const NUMBER = 8;

        //find user
        const user = await User.findOne({email});
        //check if all is right
        if(name === null || email === null || password === null || passwordVerify === null)
            return res.status(500).json("Fill in all the parameters");
        if(password.length < NUMBER)
            return res.status(500).json("the password need to be more then 8 caracters");
        if(password !== passwordVerify)
            return res.status(500).json("the password are not same");
        if(user)
            return res.status(500).json("the email exist");
        //create the user
        const dataUser = {
            name,
            email,
            password
        }

        //create the token
        const token = await jwt.getToken(dataUser);

        //send email
        await newEmail.send(email,token);

        //send OK
        res.status(200).json("Verify your email");

    }catch (error) {
        console.log(error);
        res.status(500).json("error")
    }
}

//comfir email`s token
user.comfirEmail = async (req,res)=>{
    try {
        //get token
        const token = req.params.token;

        //verifycation
        const info = await jwt.verify(token);

        //get data
        const {name,email,password} = info.data;

        //find user
        const user = await User.findOne({email});
        if(user) return res.json("Error");
        
        //save in database
        const newUser = new User({
            name,
            email,
            password
        });
        await newUser.save();

        //send cookie
        res.cookie("token",token,{httpOnly: true,sameSite='None'})
        res.json("ok");
    } catch (error) {
        //if the token is invalid
        res.status(404).json("the user is invalid")
    }
};

user.comfircookie = async (req,res)=>{
    try {
        if(!req.user) return res.status(404).json(false);
        res.send(true);
    } catch (error) {
        res.status(500).json(error);
    }
}


//user router
module.exports = user;