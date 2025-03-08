// Description: This file is used to send email to the user
const nodeMailer = require('nodemailer');

// Options for email
const emailOptions = {
  host: '',
  port: 587,
  auth: {
    user: '',
    pass: ''
  }
};
// Set options for email based on the environment
const setOptions = (host, port, user, pass) => {
  emailOptions.host = host;
  emailOptions.port = port;
  emailOptions.auth.user = user;
  emailOptions.auth.pass = pass;
};

// Send email
const sendEmail = async options => {
  // 1. if production
  if (process.env.NODE_ENV === 'production') {
   
    setOptions(
      process.env.EMAIL_HOST,
      process.env.EMAIL_PORT,
      process.env.EMAIL_USERNAME,
      process.env.EMAIL_PASSWORD
    );
  }
  // 2. if development
  if (process.env.NODE_ENV === 'development') {
    setOptions(
      process.env.EMAIL_HOST,
      process.env.EMAIL_PORT,
      process.env.EMAIL_USERNAME,
      process.env.EMAIL_PASSWORD
    );
    // process.env.MAIL_TRAP_HOST,
    // process.env.MAIL_TRAP_PORT,
    // process.env.MAIL_TRAP_USERNAME,
    // process.env.MAIL_TRAP_PASSWORD
  }
  const transporter = nodeMailer.createTransport(emailOptions);

  const mailOptions = {
    from: 'Recruuit',
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
