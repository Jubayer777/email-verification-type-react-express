import { IUser } from './../interfaces/user.interface';
import transporter from "./smtp.config";
import dotenv from "dotenv";
dotenv.config();
const sender:string= String(process.env.SMTP_SENDER);
const cypherKey:string = String(process.env.CYPHER_KEY);
import hbs from "nodemailer-express-handlebars";
import path from 'path';
import ejs from 'ejs';
import AES from 'crypto-js/aes';

const sendEmail =async (user:IUser) => {
  const {_id,expireAt,userName,email}=user;
  const expireTime = Math.round(
    (new Date(expireAt).getTime() - new Date().getTime()) / 60000
  );

  var timeConvert = function(expireTime:number){
    var minutes = expireTime%60
    var hours = (expireTime - minutes) / 60
    return hours + ":" + minutes;
   }
  const convertedExpireTime= timeConvert(expireTime);

  const encryptId = (str:string) => {
    const cipherText = AES.encrypt(str, cypherKey);
    return encodeURIComponent(cipherText.toString());
  }

  const templatePath=path.join(__dirname, "../../src/views/email.ejs");
  const data=await ejs.renderFile(templatePath,{
    userName: userName,
    expireTime: convertedExpireTime,
    userId:encryptId(_id.toString())
  });

  // const handlebarOptions = {
  //   viewEngine: {
  //     extName: ".handlebars",
  //     partialsDir: "./views",
  //     defaultLayout: false,
  //   },
  //   viewPath: "./views",
  //   extName: ".handlebars",
  // };
  // transporter.use("compile", hbs(handlebarOptions));

  const mailOptions = {
    from: sender,
    to: email,
    subject: "New email",
    // template: "welcome",
    html: data,
    context: {
      userName: userName,
      expireTime: convertedExpireTime,
      userId:encryptId(_id.toString()),
    },
  };

  transporter.sendMail(mailOptions, function (error:any, info:any) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

export default sendEmail;
