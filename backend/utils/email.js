const nodeMailer = require('nodemailer');

// Options for email
const emailOptions = {
  host: '', // Default to Mailtrap for development
  port: 587,
  auth: {
    user: '', // Mailtrap credentials from .env
    pass: '', // Mailtrap password from .env
  }
};

// Set options for email based on the environment (production or development)
const setOptions = (host, port, user, pass) => {
  emailOptions.host = host;
  emailOptions.port = port;
  emailOptions.auth.user = user;
  emailOptions.auth.pass = pass;
};

// Send email
const sendEmail = async (options) => {
  // Check if environment is production
  if (process.env.NODE_ENV === 'production') {
    setOptions(
      process.env.EMAIL_HOST,      // Gmail SMTP host
      process.env.EMAIL_PORT,      // Gmail SMTP port
      process.env.EMAIL_USERNAME,  // Gmail username (Email)
      process.env.EMAIL_PASSWORD   // Gmail password or app password
    );
  }

  // If environment is development (using Mailtrap)
  if (process.env.NODE_ENV === 'development') {
    setOptions(
      process.env.MAIL_TRAP_HOST,      // Mailtrap SMTP host
      process.env.MAIL_TRAP_PORT,      // Mailtrap SMTP port
      process.env.MAIL_TRAP_USERNAME,  // Mailtrap username
      process.env.MAIL_TRAP_PASSWORD   // Mailtrap password
    );
  }

  const transporter = nodeMailer.createTransport(emailOptions);

  const mailOptions = {
    from: 'Gradhire <gradhire.fydp@gmail.com>',  // Sender email
    to: options.email, // Recipient email
    subject: options.subject, // Subject of the email
    text: options.message,    // Plain text content
    html: options.html        // HTML content
  };

  try {
    // Send email using the transporter
    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.error('Error sending email:', err);
    throw new Error('There was an error sending the email. Please try again later.');
  }
};

module.exports = sendEmail;
