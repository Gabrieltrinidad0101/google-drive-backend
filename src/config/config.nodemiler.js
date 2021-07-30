const {frontend} = require("../urls")
const nodemailer = require("nodemailer");

class email{
    send = async (email,token) => new Promise((res,rej)=>{
        //data
        this.email = email;
        this.token = token;

        this.urlFrontend = frontend

        if(this.urlFrontend === "https://gabrieltrinidad0101.github.io"){
            this.urlFrontend = "https://gabrieltrinidad0101.github.io/google-drive-frontend"
        }

        //transporter
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: 'gabrielemprende1112@gmail.com',
                pass: 'GABRIELEMPRENDE1112'
            }
        }); 

        /* 
        host: 'giow7.siteground.us',
            port: '465',
            secure: true,
            auth: {
                user: 'gabriel123gabriel@frontend-myown-drive.xyz',
                pass: 'gabriel123gabriel'
            },
            ssl: {
                rejectUnauthorized: false
            }
        */

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
        return this.contentHTML = `
        <table class="signature" id="signature"
        style="table-layout: auto; margin-bottom: 0px; font-family: arial; border-collapse: initial; width: max-content; min-width: auto; height: 90px; padding: 10px 16px; border: 1px solid rgb(239, 243, 245); border-radius: 4px;">
        <tr style="border: none;">
            <td class="signature-avatar change-image" style="padding: 0px 4px 0px 0px; background: none;"><a
                    target="_self" href="#"><img
                        src="https://edteam-media.s3.amazonaws.com/users/avatar/d87f1dd3-c232-4156-839e-5ab5d9bdbb32.png"
                        alt="gabrieltriniadadgabrieltriniadad" loading="auto"
                        style="display: block; object-fit: cover; width: 85px; height: 85px; border-radius: 50%; margin-right: 8px; float: left;"></a>
            </td>
            <td style="text-align: left; background: none; padding: 0px 14px 0px 3px;"><b
                    style="margin-bottom: 4px; font-size: 20px; color: rgb(42, 59, 71); line-height: 24px; height: 24px; display: block;">gabriel
                    Trinidad</b>
                <p style="font-size: 14px; margin: 0px 0px 8px;"><span
                        style="color: rgb(105, 116, 119); margin: 0px;">Programador web</span></p>
                <div id="sociales"></div>
            </td>
            <td style="padding: 0px; min-width: auto;">
                <div class="color-signature"
                    style="width: 4px; height: 85px; box-sizing: border-box; border-radius: 50px; background-color: rgb(17, 146, 238); border: 2px solid rgb(17, 146, 238);">
                </div>
            </td>
            <td style="background: none; padding: 10px 0px 7px 14px;"><span
                    class="s-whitespace-nowrap s-text-ellipsis mw-signature"
                    style="margin-bottom: 4px; font-size: 14px; color: rgb(105, 116, 119); line-height: 24px; height: 24px; display: block; text-align: left;"><img
                        src="https://ed.team/static/images/utils/firma/theme/phone-blue.png" alt="" width="20"
                        height="20"
                        style="margin-top: 3px; float: left; margin-right: 7px; border-radius: 50%; display: block;">8094436276</span><span
                    class="s-whitespace-nowrap s-text-ellipsis mw-signature"
                    style="margin-bottom: 4px; font-size: 14px; color: rgb(105, 116, 119); line-height: 24px; height: 24px; display: block; text-align: left;"><img
                        src="https://ed.team/static/images/utils/firma/theme/pin-blue.png" alt="" width="20" height="20"
                        style="margin-top: 3px; float: left; margin-right: 7px; border-radius: 50%; display: block;">Republica
                    Dominica, Jarabacoa</span><span class="s-whitespace-nowrap s-text-ellipsis mw-signature"
                    style="margin-bottom: 4px; font-size: 14px; color: rgb(105, 116, 119); line-height: 24px; height: 24px; display: block; text-align: left;"><img
                        src="https://ed.team/static/images/utils/firma/theme/url-blue.png" alt="" width="20" height="20"
                        style="margin-top: 3px; float: left; margin-right: 7px; border-radius: 50%; display: block;"> <a href="${this.urlFrontend}/active.html?token=${this.token}">Verify your account</a></span>
            </td>
        </tr>
    </table>`
    }

    info(){
        return {
            from: "gabrieldrive@frontend-myown-drive.xyz", // sender address
            to: this.email, // list of receivers
            subject: "Verify your account ✔", // Subject line
            html: this.template(), // html body
        }
    };
}

module.exports = email;