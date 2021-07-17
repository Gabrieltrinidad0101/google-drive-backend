const {frontend} = require("../urls")
const nodemailer = require("nodemailer");

class email{
    send = async (email,token) => new Promise((res,rej)=>{
        //data
        this.email = email;
        this.token = token;

        this.urlFrontend = frontend


        //transporter
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'IdknoseIdk@gmail.com',
                pass: 'E=cm2E=cm2'
            },
        });


        // send mail with defined transport object
        transporter.sendMail(this.info(), (error,info)=>{
            if(error){
                rej(error.message);
            }else{
                res(info);
            }
        });
    });


    template(){
        return this.contentHTML = `<h1 style="text-align: center">Verify</h1>
                         <a href="${this.urlFrontend}/active.html?token=${this.token}">Verify</a>`
    }

    info(){
        return {
            from: this.email, // sender address
            to: this.email, // list of receivers
            subject: "Verify your account ✔", // Subject line
            html: this.template(), // html body
        }
    };
}

module.exports = email;