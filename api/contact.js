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
        'X-Mailer': 'Shabz Fazl Website Contact Form',
        'X-Entity-Ref-ID': `contact-${Date.now()}`,
        'Return-Path': 'noreply@shabzfazl.com',
        'Message-ID': `<contact-${Date.now()}@shabzfazl.com>`,
        'X-Original-Sender': 'noreply@shabzfazl.com',
        'X-Authenticated-Sender': 'noreply@shabzfazl.com',
        'X-Sender': 'noreply@shabzfazl.com',
        'X-Reply-To': email
      },
      html: `
        <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          <title>New Contact Form Message</title>
        </head>
        <body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc;">
            <tr>
              <td align="center" style="padding: 30px 20px;">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15); border: 1px solid #e2e8f0;">
                  
                  <!-- Header -->
                  <tr>
                    <td style="background: linear-gradient(135deg, #6B46C1 0%, #8B5CF6 50%, #A855F7 100%); padding: 50px 40px; text-align: center; position: relative;">
                      <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><defs><pattern id=\"grain\" width=\"100\" height=\"100\" patternUnits=\"userSpaceOnUse\"><circle cx=\"25\" cy=\"25\" r=\"1\" fill=\"white\" opacity=\"0.1\"/><circle cx=\"75\" cy=\"75\" r=\"1\" fill=\"white\" opacity=\"0.1\"/><circle cx=\"50\" cy=\"10\" r=\"0.5\" fill=\"white\" opacity=\"0.1\"/></pattern></defs><rect width=\"100\" height=\"100\" fill=\"url(%23grain)\"/></svg>') repeat; opacity: 0.3;"></div>
                      <div style="position: relative; z-index: 1;">
                        <div style="width: 80px; height: 80px; background: rgba(255, 255, 255, 0.2); border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
                          <span style="color: white; font-size: 32px; font-weight: bold;">SF</span>
                        </div>
                        <h1 style="margin: 0; font-size: 32px; font-weight: 800; letter-spacing: -1px; color: white; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">Shabz Fazl</h1>
                        <div style="width: 80px; height: 4px; background: rgba(255, 255, 255, 0.9); margin: 20px auto; border-radius: 2px;"></div>
                        <h2 style="margin: 0; font-size: 24px; font-weight: 600; color: white; text-shadow: 0 1px 2px rgba(0,0,0,0.3);">New Website Message</h2>
                        <p style="margin: 15px 0 0 0; font-size: 16px; color: rgba(255, 255, 255, 0.95); font-weight: 400;">Someone contacted you through your website</p>
                      </div>
                    </td>
                  </tr>

                  <!-- Content -->
                  <tr>
                    <td style="padding: 50px 40px; background: #ffffff;">
                      <p style="color: #64748b; margin: 0 0 40px 0; font-size: 18px; line-height: 1.7; text-align: center; font-weight: 500;">You've received a new message from your Shabz Fazl website contact form:</p>
                      
                      <!-- Name Field -->
                      <table width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; border-left: 6px solid #6B46C1; margin-bottom: 25px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);">
                        <tr>
                          <td style="padding: 30px;">
                            <table width="100%" cellpadding="0" cellspacing="0">
                              <tr>
                                <td style="padding-bottom: 12px;">
                                  <table cellpadding="0" cellspacing="0">
                                    <tr>
                                      <td style="width: 12px; height: 12px; background: #6B46C1; border-radius: 50%; margin-right: 15px; vertical-align: middle;"></td>
                                      <td><strong style="color: #6B46C1; font-size: 16px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">NAME</strong></td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                              <tr>
                                <td style="color: #1e293b; font-size: 18px; font-weight: 600; padding-left: 27px; line-height: 1.4;">${name}</td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                      
                      <!-- Email Field -->
                      <table width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; border-left: 6px solid #8B5CF6; margin-bottom: 25px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);">
                        <tr>
                          <td style="padding: 30px;">
                            <table width="100%" cellpadding="0" cellspacing="0">
                              <tr>
                                <td style="padding-bottom: 12px;">
                                  <table cellpadding="0" cellspacing="0">
                                    <tr>
                                      <td style="width: 12px; height: 12px; background: #8B5CF6; border-radius: 50%; margin-right: 15px; vertical-align: middle;"></td>
                                      <td><strong style="color: #8B5CF6; font-size: 16px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">EMAIL</strong></td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                              <tr>
                                <td style="padding-left: 27px;">
                                  <a href="mailto:${email}" style="color: #6B46C1; text-decoration: none; font-size: 18px; font-weight: 600; border-bottom: 2px solid #e2e8f0; padding-bottom: 2px; transition: all 0.3s ease;">${email}</a>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                      
                      <!-- Service Field -->
                      <table width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; border-left: 6px solid #7C3AED; margin-bottom: 25px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);">
                        <tr>
                          <td style="padding: 30px;">
                            <table width="100%" cellpadding="0" cellspacing="0">
                              <tr>
                                <td style="padding-bottom: 12px;">
                                  <table cellpadding="0" cellspacing="0">
                                    <tr>
                                      <td style="width: 12px; height: 12px; background: #7C3AED; border-radius: 50%; margin-right: 15px; vertical-align: middle;"></td>
                                      <td><strong style="color: #7C3AED; font-size: 16px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">SERVICE INTEREST</strong></td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                              <tr>
                                <td style="color: #1e293b; font-size: 18px; font-weight: 600; padding-left: 27px; line-height: 1.4;">${service}</td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                      
                      <!-- Message Field -->
                      <table width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; border-left: 6px solid #A855F7; margin-bottom: 40px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);">
                        <tr>
                          <td style="padding: 30px;">
                            <table width="100%" cellpadding="0" cellspacing="0">
                              <tr>
                                <td style="padding-bottom: 15px;">
                                  <table cellpadding="0" cellspacing="0">
                                    <tr>
                                      <td style="width: 12px; height: 12px; background: #A855F7; border-radius: 50%; margin-right: 15px; vertical-align: middle;"></td>
                                      <td><strong style="color: #A855F7; font-size: 16px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">MESSAGE</strong></td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                              <tr>
                                <td style="padding-left: 27px;">
                                  <div style="color: #1e293b; font-size: 18px; line-height: 1.7; background: #ffffff; padding: 25px; border-radius: 12px; border: 2px solid #e2e8f0; white-space: pre-wrap; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05); font-weight: 500;">${message}</div>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>

                      <!-- Call to Action -->
                      <table width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #6B46C1 0%, #8B5CF6 100%); border-radius: 16px; margin-bottom: 40px; box-shadow: 0 8px 30px rgba(107, 70, 193, 0.3);">
                        <tr>
                          <td style="padding: 30px; text-align: center;">
                            <div style="width: 60px; height: 60px; background: rgba(255, 255, 255, 0.2); border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
                              <span style="color: white; font-size: 24px;">💬</span>
                            </div>
                            <p style="margin: 0; color: white; font-size: 20px; font-weight: 700; text-shadow: 0 1px 2px rgba(0,0,0,0.3);">Ready to respond?</p>
                            <p style="margin: 10px 0 0 0; color: rgba(255, 255, 255, 0.95); font-size: 16px; font-weight: 500;">Reply directly to this email to start the conversation</p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); padding: 40px; text-align: center; border-top: 1px solid #e2e8f0;">
                      <div style="margin-bottom: 25px;">
                        <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #6B46C1 0%, #8B5CF6 100%); border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 15px rgba(107, 70, 193, 0.3);">
                          <span style="color: white; font-weight: bold; font-size: 20px;">SF</span>
                        </div>
                        <h3 style="margin: 0; color: #1e293b; font-size: 22px; font-weight: 700;">Shabz Fazl</h3>
                        <p style="margin: 8px 0 0 0; color: #64748b; font-size: 16px; font-weight: 500;">Mindset & Performance Psychology Coach</p>
                      </div>
                      <p style="margin: 0; color: #94a3b8; font-size: 14px; line-height: 1.6; font-weight: 400;">
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
