import nodemailer, { SentMessageInfo } from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
const hostName:string= String(process.env.SMTP_HOST);
const port:number= Number(process.env.SMTP_PORT);
const user :string= String(process.env.SMTP_USER);
const pass:string= String(process.env.SMTP_PASS);
const transporter:SentMessageInfo = nodemailer.createTransport({
  host: hostName,
  port: port,
  auth: {
    user: user,
    pass: pass,
  },
});

export default transporter;
