const handler = async (req, res) => {
  console.log('Handler called with method:', req.method);
  
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    console.log('Request body:', req.body);
    const { name, email, service, message } = req.body;

    if (!name || !email || !service || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'All fields are required' 
      });
    }

    console.log('API Key exists:', !!process.env.RESEND_API_KEY);
    
    if (!process.env.RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY not found');
    }

    const emailData = {
      from: 'Shabz Fazl <noreply@shabzfazl.com>',
      to: ['contact@shabzfazl.com'],
      replyTo: email,
      subject: `New Contact Form Message from ${name}`,
      headers: {
        'X-Priority': '1',
        'X-MSMail-Priority': 'High',
        'Importance': 'high',
        'X-Mailer': 'Shabz Fazl Website Contact Form',
        'X-Entity-Ref-ID': `contact-${Date.now()}`,
        'Return-Path': 'noreply@shabzfazl.com',
        'Message-ID': `<contact-${Date.now()}@shabzfazl.com>`,
        'X-Original-Sender': 'noreply@shabzfazl.com',
        'X-Authenticated-Sender': 'noreply@shabzfazl.com'
      },
      html: `
        <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          <title>New Contact Form Message</title>
          <style type="text/css">
            @media only screen and (max-width: 600px) {
              .container { width: 100% !important; }
              .content { padding: 20px !important; }
            }
          </style>
        </head>
        <body style="margin: 0; padding: 0; background-color: #f4f4f7; font-family: Arial, sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f7;">
            <tr>
              <td align="center" style="padding: 20px 0;">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);">
                  
                  <!-- Header -->
                  <tr>
                    <td style="background: linear-gradient(135deg, #6B46C1 0%, #8B5CF6 50%, #A855F7 100%); color: white; padding: 40px 30px; text-align: center;">
                      <h1 style="margin: 0; font-size: 28px; font-weight: 700; letter-spacing: -0.5px; color: white;">Shabz Fazl</h1>
                      <div style="width: 60px; height: 3px; background: rgba(255, 255, 255, 0.8); margin: 15px auto; border-radius: 2px;"></div>
                      <h2 style="margin: 0; font-size: 20px; font-weight: 600; color: white;">New Website Message</h2>
                      <p style="margin: 10px 0 0 0; font-size: 14px; color: rgba(255, 255, 255, 0.9);">Someone contacted you through your website</p>
                    </td>
                  </tr>

                  <!-- Content -->
                  <tr>
                    <td style="padding: 40px 30px; background: #ffffff;">
                      <p style="color: #64748b; margin: 0 0 30px 0; font-size: 16px; line-height: 1.6;">You've received a new message from your Shabz Fazl website contact form:</p>
                      
                      <!-- Name Field -->
                      <table width="100%" cellpadding="0" cellspacing="0" style="background: #f8fafc; border-radius: 12px; border-left: 5px solid #6B46C1; margin-bottom: 20px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);">
                        <tr>
                          <td style="padding: 24px;">
                            <table width="100%" cellpadding="0" cellspacing="0">
                              <tr>
                                <td style="padding-bottom: 8px;">
                                  <table cellpadding="0" cellspacing="0">
                                    <tr>
                                      <td style="width: 8px; height: 8px; background: #6B46C1; border-radius: 50%; margin-right: 12px;"></td>
                                      <td><strong style="color: #6B46C1; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">NAME</strong></td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                              <tr>
                                <td style="color: #1e293b; font-size: 16px; font-weight: 500; padding-left: 20px;">${name}</td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                      
                      <!-- Email Field -->
                      <table width="100%" cellpadding="0" cellspacing="0" style="background: #f8fafc; border-radius: 12px; border-left: 5px solid #8B5CF6; margin-bottom: 20px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);">
                        <tr>
                          <td style="padding: 24px;">
                            <table width="100%" cellpadding="0" cellspacing="0">
                              <tr>
                                <td style="padding-bottom: 8px;">
                                  <table cellpadding="0" cellspacing="0">
                                    <tr>
                                      <td style="width: 8px; height: 8px; background: #8B5CF6; border-radius: 50%; margin-right: 12px;"></td>
                                      <td><strong style="color: #8B5CF6; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">EMAIL</strong></td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                              <tr>
                                <td style="color: #1e293b; font-size: 16px; font-weight: 500; padding-left: 20px;">
                                  <a href="mailto:${email}" style="color: #6B46C1; text-decoration: none; border-bottom: 1px solid #e2e8f0; padding-bottom: 1px;">${email}</a>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                      
                      <!-- Service Field -->
                      <table width="100%" cellpadding="0" cellspacing="0" style="background: #f8fafc; border-radius: 12px; border-left: 5px solid #7C3AED; margin-bottom: 20px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);">
                        <tr>
                          <td style="padding: 24px;">
                            <table width="100%" cellpadding="0" cellspacing="0">
                              <tr>
                                <td style="padding-bottom: 8px;">
                                  <table cellpadding="0" cellspacing="0">
                                    <tr>
                                      <td style="width: 8px; height: 8px; background: #7C3AED; border-radius: 50%; margin-right: 12px;"></td>
                                      <td><strong style="color: #7C3AED; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">SERVICE INTEREST</strong></td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                              <tr>
                                <td style="color: #1e293b; font-size: 16px; font-weight: 500; padding-left: 20px;">${service}</td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                      
                      <!-- Message Field -->
                      <table width="100%" cellpadding="0" cellspacing="0" style="background: #f8fafc; border-radius: 12px; border-left: 5px solid #A855F7; margin-bottom: 30px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);">
                        <tr>
                          <td style="padding: 24px;">
                            <table width="100%" cellpadding="0" cellspacing="0">
                              <tr>
                                <td style="padding-bottom: 12px;">
                                  <table cellpadding="0" cellspacing="0">
                                    <tr>
                                      <td style="width: 8px; height: 8px; background: #A855F7; border-radius: 50%; margin-right: 12px;"></td>
                                      <td><strong style="color: #A855F7; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">MESSAGE</strong></td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                              <tr>
                                <td style="padding-left: 20px;">
                                  <div style="color: #1e293b; font-size: 16px; line-height: 1.6; background: #ffffff; padding: 16px; border-radius: 8px; border: 1px solid #e2e8f0; white-space: pre-wrap;">${message}</div>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>

                      <!-- Call to Action -->
                      <table width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #6B46C1 0%, #8B5CF6 100%); border-radius: 12px; margin-bottom: 30px;">
                        <tr>
                          <td style="padding: 20px; text-align: center;">
                            <p style="margin: 0; color: white; font-size: 16px; font-weight: 600;">Ready to respond?</p>
                            <p style="margin: 5px 0 0 0; color: rgba(255, 255, 255, 0.9); font-size: 14px;">Reply directly to this email to start the conversation</p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="background: #f8fafc; padding: 30px; text-align: center; border-top: 1px solid #e2e8f0;">
                      <div style="margin-bottom: 20px;">
                        <div style="width: 40px; height: 40px; background: linear-gradient(135deg, #6B46C1 0%, #8B5CF6 100%); border-radius: 50%; margin: 0 auto 15px; display: inline-block; line-height: 40px; text-align: center;">
                          <span style="color: white; font-weight: bold; font-size: 16px;">SF</span>
                        </div>
                        <h3 style="margin: 0; color: #1e293b; font-size: 18px; font-weight: 600;">Shabz Fazl</h3>
                        <p style="margin: 5px 0 0 0; color: #64748b; font-size: 14px;">Mindset & Performance Psychology Coach</p>
                      </div>
                      <p style="margin: 0; color: #94a3b8; font-size: 12px; line-height: 1.5;">
                        This message was sent from your Shabz Fazl website contact form.<br>
                        Reply directly to this email to respond to ${name}.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
      text: `
CONTACT FORM SUBMISSION - Shabz Fazl Website

A new message has been received through your website contact form.

CONTACT DETAILS:
================
Name: ${name}
Email: ${email}
Service Interest: ${service}

MESSAGE:
========
${message}

---
This is an automated message from your Shabz Fazl website contact form.
Please reply directly to this email to respond to ${name}.

Website: https://shabzfazl.com
Business: Shabz Fazl - Mindset & Performance Psychology Coach
      `
    };

    console.log('Sending email with data:', emailData);

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData),
    });

    console.log('Response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Resend error:', errorText);
      throw new Error(`Resend API Error: ${response.status}`);
    }

    const result = await response.json();
    console.log('Email sent successfully:', result);
    console.log('Email ID:', result.id);
    console.log('Email status:', result.status);

    res.status(200).json({ 
      success: true, 
      message: 'Message sent successfully! Check your contact@shabzfazl.com inbox.' 
    });

  } catch (error) {
    console.error('Handler error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send message. Please try again later.' 
    });
  }
};

module.exports = handler;
