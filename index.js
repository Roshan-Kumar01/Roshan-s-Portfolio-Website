const nodeMailer = require("nodemailer");
const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');


require('dotenv').config({ path: 'config.env' });
const app = express()
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));
const port = 3000

app.post('/sendEmail', async (req, res) => {
  const {name, email, project, message} = req.body;
  try{
    const transporter = nodeMailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
            user: process.env.SMPT_MAIL,
            pass: process.env.SMPT_PASSWORD,
        },
    });

    const mailOptions = {
        from: `"${"Roshan Kumar"}" <${process.env.SMPT_MAIL}>`,
        to: "roshankumarrtk81@gmail.com",
        subject: `New Message from ${name}`,
        text: `Email:${email}\nProject: ${project}\nMessage: ${message}`, 
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully' });
  }catch(error){
    res.status(500).json({message:"Internal server error"})
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})