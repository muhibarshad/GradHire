// This file contains the HTML for the email that is sent to the user when they request a password reset.
exports.emailHtml = resetPasswordLink => {
  return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Reset Password</title>
    <style>
      body {
        font-family: Arial, sans-serif;
      }

      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 5px;
      }

      a {
        color: white;
        background-color: #412a94;
        padding: 10px 10px;
        border-radius: 10px;
        text-decoration: none;
      }

      a:hover {
        text-decoration: underline;
      }

      #cm {
        color: #412a94;
      }

      #link {
        margin: 30px 0px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <p>Hi there,</p>
      <p>We received a request to reset the password for your account. If you made this request, please click the link below to reset your password:</p>
      <p id="link">
        <a href="${resetPasswordLink}">Reset Password</a>
      </p>
      <p>If you did not make this request, you can ignore this email.</p>
      <p>Thanks,</p>
      <p id="cm">The Recruuit team</p>
    </div>
  </body>
</html>
`;
};

// email for sending otp
exports.emailOtp = otp => {
  return `<!DOCTYPE html>
  <html>
    <head>
      <title>OTP Code</title>
      <style>
        /* Add some basic styling */
        body {
          font-family: Arial, sans-serif;
        }
  
        h1 {
          color: #1f5e9e;
          text-align: center;
        }
  
        p {
          font-size: 14px;
          margin-bottom: 20px;
        }
  
        strong {
          color: #e60000;
          font-size: 18px;
        }
      </style>
    </head>
    <body>
      <h1>OTP Code</h1>
      <p>Your OTP code is: <strong> ${otp} </strong>
      </p>
      <p>Don't share this code with anyone for security reasons.</p>
    </body>
  </html>`;
};


//email for sending job acceptance or rejection
exports.emailJobAcceptance = (emailOpt, job, user) => {

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              background-color: #f5f5f5;
              margin: 0;
              padding: 20px;
            }
            
            .container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #fff;
              padding: 20px;
              border-radius: 5px;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }
            
            h1 {
              font-size: 24px;
              color: #333;
              margin-top: 0;
            }
            
            p {
              margin: 0 0 20px;
            }
            
            .regards {
              font-weight: bold;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Dear ${user.name},</h1>
            <p>Greetings from Recruuit!</p>
            <p>Here is the status of your job application for ${job.title} at ${job.company.name}.</p>
            <p>${emailOpt.greeting || 'We hope you are doing well.'}</p>
            <p>${emailOpt.body || 'We are pleased to inform you that you have been selected for the job.'}</p>
            <p class="regards">Best regards,</p>
            <p>${emailOpt.regards || 'Recruuit Team'}</p>
          </div>
        </body>
      </html>
    `;
  
};