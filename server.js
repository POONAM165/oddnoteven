require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// ✅ Define transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
// app.get('/', (req, res) => {
//   res.send('Server is running');
// });

app.post('/send', async (req, res) => {
  const { name, email, message, budget, projectType } = req.body;

  console.log("📥 Request received:", req.body);

  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.SMTP_USER,
     subject: `📩 New Inquiry Received – ${name}`,
html: `
  <div style="background-color: #1a1a1a; padding: 30px; font-family: 'Segoe UI', Tahoma, sans-serif; color: #ffffff;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #2b2b2b; border-radius: 10px; padding: 25px;">
      
      <h2 style="color: #ffffff;">📥 Contact Request Received</h2>
      <p style="color: #bbbbbb; font-size: 14px; line-height: 1.5;">
        A visitor has submitted a new inquiry through ODDNOTEVEN STUDIO portfolio contact form. Below is the recorded information for your review.
      </p>

      <table style="width: 100%; margin-top: 20px; border-collapse: collapse; font-size: 15px;">
        <tr style="border-bottom: 1px solid #444;">
          <td style="padding: 10px; color: #aaaaaa;">👤 Name</td>
          <td style="padding: 10px; color: #ffffff;">${name}</td>
        </tr>
        <tr style="border-bottom: 1px solid #444;">
          <td style="padding: 10px; color: #aaaaaa;">📧 Email</td>
          <td style="padding: 10px;">
            <a href="mailto:${email}" style="color: #4ea8ff;">${email}</a>
          </td>
        </tr>
        <tr style="border-bottom: 1px solid #444;">
          <td style="padding: 10px; color: #aaaaaa;">📂 Project Type</td>
          <td style="padding: 10px; color: #ffffff;">${projectType}</td>
        </tr>
        <tr style="border-bottom: 1px solid #444;">
          <td style="padding: 10px; color: #aaaaaa;">💰 Budget</td>
          <td style="padding: 10px; color: #ffffff;">${budget}</td>
        </tr>
        <tr>
          <td style="padding: 10px; color: #aaaaaa; vertical-align: top;">📝 Message</td>
          <td style="padding: 10px;  color:#ffffff;">
            ${message}
          </td>
        </tr>
      </table>

      <p style="margin-top: 25px; font-size: 13px; color: #cccccc;">
        OddNotEven Studio has received a new contact form submission. Feel free to connect with the sender to explore their project request.
      </p>

      <p style="margin-top: 15px; font-size: 12px; color: #666666;">
        — OddNotEven Studio Contact Form Notification
      </p>

    </div>
  </div>
`,

    });

    console.log("✅ Email sent:", info.messageId);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("❌ Failed to send email:", error);
    res.status(500).json({ error: "Something went wrong." });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
