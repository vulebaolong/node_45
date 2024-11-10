import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: "vulebaolong@gmail.com",
    pass: "pevhtkilhhyesafv",
  },
});

// async..await is not allowed in global scope, must use a wrapper
export async function sendMail(email) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: 'vulebaolong@gmail.com', // sender address
    to: email, // list of receivers
    subject: "hello gay ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

