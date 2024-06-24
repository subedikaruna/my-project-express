import nodemailer from "nodemailer";
import { email, password } from "../validation/constant.js";

// Transporter configuration for Nodemailer
const transporterInfo = {
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: email,
    pass: password,
  },
};

// Function to send an email
export const sendEmail = async (mailInfo) => {
  try {
    const transporter = nodemailer.createTransport(transporterInfo);
    await transporter.sendMail(mailInfo);
    console.log("Email sent successfully");
  } catch (error) {
    console.log("Error occurred while sending email:", error.message);
  }
};

// Example usage of sendEmail function
// await sendEmail({
//   from: '"Unique" <uniquekc425@gmail.com>',
//   to: ["abc@gmail.com", "nitanthapa425@gmail.com"],
//   subject: "My first system email",
//   html: `<h1>Hello world</h1>`,
// });

// Example with attachments
// await sendEmail({
//   from: '"Fred Foo" <nitanthapa425@gmail.com>',
//   to: ["nitanthapa123@gmail.com", "sandeshbca5@arunima.edu.np"],
//   cc: ["ram@gmail.com"],
//   bcc: ["hari@gmail.com"],
//   attachments: [
//     {
//       filename: 'example.pdf',
//       path: '/path/to/example.pdf'
//     }
//   ],
//   subject: "This is the subject",
//   html: `<h1>Hello World</h1>`,
// });
