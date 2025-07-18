import nodemailer from "nodemailer";
import { MAIL_ID, MAIL_APP_PASS } from "./serverConfig.js";

export default nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: MAIL_ID,
    pass: MAIL_APP_PASS,
  },
});
