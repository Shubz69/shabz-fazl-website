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
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <title>New Contact Form Message</title>
        </head>
        <body style="margin: 0; padding: 20px; font-family: Arial, sans-serif; background-color: #f5f5f5;">
          <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            
            <!-- Header -->
            <div style="background-color: #6B46C1; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
              <h1 style="margin: 0; font-size: 24px;">New Contact Form Submission</h1>
            </div>
            
            <!-- Content -->
            <div style="padding: 30px;">
              <p style="margin: 0 0 20px 0; color: #333; font-size: 16px;">You've received a new message from your website contact form:</p>
              
              <div style="margin-bottom: 20px;">
                <strong style="color: #6B46C1; font-size: 14px;">Contact Details:</strong><br>
                <strong>Name:</strong> ${name}<br>
                <strong>Email:</strong> ${email}<br>
                <strong>Service Interest:</strong> ${service}<br>
                <strong>Message:</strong><br>
                <div style="background-color: #f8f9fa; padding: 15px; border-left: 4px solid #6B46C1; margin-top: 10px; white-space: pre-wrap;">${message}</div>
              </div>
              
              <p style="margin: 20px 0 0 0; color: #666; font-size: 14px;">
                This message was sent from the Shabz Fazl website contact form.
              </p>
            </div>
            
          </div>
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
