const nodemailer = require('nodemailer');

module.exports = async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, email, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'All fields are required' 
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid email format' 
      });
    }

    // Create transporter using GoDaddy SMTP
    const transporter = nodemailer.createTransport({
      host: 'smtpout.secureserver.net',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    // Beautiful HTML email template
    const htmlTemplate = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Website Message</title>
        <style>
            body { 
                font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
                background: #f8f9fa; 
                margin: 0; 
                padding: 20px; 
                line-height: 1.6;
            }
            .container { 
                max-width: 600px; 
                margin: 0 auto; 
                background: white; 
                border-radius: 12px; 
                overflow: hidden; 
                box-shadow: 0 8px 32px rgba(107, 70, 193, 0.1);
            }
            .header { 
                background: linear-gradient(135deg, #6B46C1 0%, #8B5CF6 100%); 
                color: white; 
                padding: 40px 30px; 
                text-align: center; 
            }
            .header h1 { 
                margin: 0; 
                font-size: 28px; 
                font-weight: 600; 
                margin-bottom: 8px;
            }
            .header p {
                margin: 0;
                opacity: 0.9;
                font-size: 16px;
            }
            .content { 
                padding: 40px 30px; 
            }
            .intro {
                color: #666;
                font-size: 16px;
                margin-bottom: 30px;
            }
            .field { 
                margin-bottom: 25px; 
                padding: 20px; 
                background: #f8f9fa; 
                border-radius: 8px; 
                border-left: 4px solid #6B46C1; 
            }
            .field-label { 
                font-weight: 600; 
                color: #6B46C1; 
                margin-bottom: 8px; 
                font-size: 14px;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }
            .field-value { 
                color: #333; 
                font-size: 16px;
                word-wrap: break-word;
            }
            .message-field {
                background: #f8f9fa;
                border-radius: 8px;
                padding: 20px;
                border-left: 4px solid #6B46C1;
                white-space: pre-wrap;
                font-size: 16px;
                line-height: 1.6;
                color: #333;
            }
            .footer { 
                background: #f8f9fa; 
                padding: 30px; 
                text-align: center; 
                color: #666; 
                font-size: 14px; 
                border-top: 1px solid #eee;
            }
            .footer p {
                margin: 5px 0;
            }
            .reply-btn {
                display: inline-block;
                background: linear-gradient(135deg, #6B46C1 0%, #8B5CF6 100%);
                color: white;
                padding: 12px 24px;
                text-decoration: none;
                border-radius: 6px;
                font-weight: 500;
                margin-top: 15px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>New Website Message</h1>
                <p>Someone contacted you through your website</p>
            </div>
            <div class="content">
                <p class="intro">You've received a new message from your Shabz Fazl website contact form:</p>
                
                <div class="field">
                    <div class="field-label">Name</div>
                    <div class="field-value">${name}</div>
                </div>
                
                <div class="field">
                    <div class="field-label">Email</div>
                    <div class="field-value">${email}</div>
                </div>
                
                <div class="field">
                    <div class="field-label">Message</div>
                    <div class="message-field">${message.replace(/\n/g, '<br>')}</div>
                </div>
            </div>
            <div class="footer">
                <p><strong>This message was sent from your Shabz Fazl website contact form.</strong></p>
                <p>Reply directly to this email to respond to ${name}.</p>
                <a href="mailto:${email}" class="reply-btn">Reply to ${name}</a>
            </div>
        </div>
    </body>
    </html>
    `;

    // Plain text version
    const textTemplate = `
New Website Message - Shabz Fazl

You've received a new message from your website contact form:

Name: ${name}
Email: ${email}

Message:
${message}

---
This message was sent from your Shabz Fazl website contact form.
Reply directly to this email to respond to ${name}.
    `;

    // Email options
    const mailOptions = {
      from: '"Shabz Fazl Website" <info@shabzfazl.com>',
      to: 'contact@shabzfazl.com',
      replyTo: email,
      subject: `New Message from ${name} - Shabz Fazl Website`,
      html: htmlTemplate,
      text: textTemplate
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ 
      success: true, 
      message: 'Message sent successfully! Shabz will get back to you within 24 hours.' 
    });

  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send message. Please try again later.' 
    });
  }
};
