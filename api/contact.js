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
      from: 'noreply@shabzfazl.com',
      to: ['contact@shabzfazl.com'],
      replyTo: email,
      subject: `New Message from ${name} - Shabz Fazl Website`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Contact Form Message</title>
        </head>
        <body style="margin: 0; padding: 0; background-color: #f4f4f7; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1); border-radius: 16px; overflow: hidden;">
            
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #6B46C1 0%, #8B5CF6 50%, #A855F7 100%); color: white; padding: 40px 30px; text-align: center; position: relative;">
              <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><defs><pattern id=\"grain\" width=\"100\" height=\"100\" patternUnits=\"userSpaceOnUse\"><circle cx=\"25\" cy=\"25\" r=\"1\" fill=\"white\" opacity=\"0.1\"/><circle cx=\"75\" cy=\"75\" r=\"1\" fill=\"white\" opacity=\"0.1\"/><circle cx=\"50\" cy=\"10\" r=\"0.5\" fill=\"white\" opacity=\"0.1\"/></pattern></defs><rect width=\"100\" height=\"100\" fill=\"url(%23grain)\"/></svg>') repeat; opacity: 0.3;"></div>
              <div style="position: relative; z-index: 1;">
                <h1 style="margin: 0; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">Shabz Fazl</h1>
                <div style="width: 60px; height: 3px; background: rgba(255, 255, 255, 0.8); margin: 15px auto; border-radius: 2px;"></div>
                <h2 style="margin: 0; font-size: 20px; font-weight: 600; opacity: 0.95;">New Website Message</h2>
                <p style="margin: 10px 0 0 0; font-size: 14px; opacity: 0.9; font-weight: 400;">Someone contacted you through your website</p>
              </div>
            </div>

            <!-- Content -->
            <div style="padding: 40px 30px; background: #ffffff;">
              <p style="color: #64748b; margin: 0 0 30px 0; font-size: 16px; line-height: 1.6;">You've received a new message from your Shabz Fazl website contact form:</p>
              
              <!-- Name Field -->
              <div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); padding: 24px; border-radius: 12px; border-left: 5px solid #6B46C1; margin-bottom: 20px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);">
                <div style="display: flex; align-items: center; margin-bottom: 8px;">
                  <div style="width: 8px; height: 8px; background: #6B46C1; border-radius: 50%; margin-right: 12px;"></div>
                  <strong style="color: #6B46C1; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Name</strong>
                </div>
                <div style="color: #1e293b; font-size: 16px; font-weight: 500; margin-left: 20px;">${name}</div>
              </div>
              
              <!-- Email Field -->
              <div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); padding: 24px; border-radius: 12px; border-left: 5px solid #8B5CF6; margin-bottom: 20px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);">
                <div style="display: flex; align-items: center; margin-bottom: 8px;">
                  <div style="width: 8px; height: 8px; background: #8B5CF6; border-radius: 50%; margin-right: 12px;"></div>
                  <strong style="color: #8B5CF6; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Email</strong>
                </div>
                <div style="color: #1e293b; font-size: 16px; font-weight: 500; margin-left: 20px;">
                  <a href="mailto:${email}" style="color: #6B46C1; text-decoration: none; border-bottom: 1px solid #e2e8f0; padding-bottom: 1px;">${email}</a>
                </div>
              </div>
              
              <!-- Service Field -->
              <div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); padding: 24px; border-radius: 12px; border-left: 5px solid #7C3AED; margin-bottom: 20px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);">
                <div style="display: flex; align-items: center; margin-bottom: 8px;">
                  <div style="width: 8px; height: 8px; background: #7C3AED; border-radius: 50%; margin-right: 12px;"></div>
                  <strong style="color: #7C3AED; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Service Interest</strong>
                </div>
                <div style="color: #1e293b; font-size: 16px; font-weight: 500; margin-left: 20px;">${service}</div>
              </div>
              
              <!-- Message Field -->
              <div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); padding: 24px; border-radius: 12px; border-left: 5px solid #A855F7; margin-bottom: 30px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);">
                <div style="display: flex; align-items: center; margin-bottom: 12px;">
                  <div style="width: 8px; height: 8px; background: #A855F7; border-radius: 50%; margin-right: 12px;"></div>
                  <strong style="color: #A855F7; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Message</strong>
                </div>
                <div style="color: #1e293b; font-size: 16px; line-height: 1.6; margin-left: 20px; white-space: pre-wrap; background: #ffffff; padding: 16px; border-radius: 8px; border: 1px solid #e2e8f0;">${message}</div>
              </div>

              <!-- Call to Action -->
              <div style="background: linear-gradient(135deg, #6B46C1 0%, #8B5CF6 100%); padding: 20px; border-radius: 12px; text-align: center; margin-bottom: 30px;">
                <p style="margin: 0; color: white; font-size: 16px; font-weight: 600;">Ready to respond?</p>
                <p style="margin: 5px 0 0 0; color: rgba(255, 255, 255, 0.9); font-size: 14px;">Reply directly to this email to start the conversation</p>
              </div>
            </div>

            <!-- Footer -->
            <div style="background: #f8fafc; padding: 30px; text-align: center; border-top: 1px solid #e2e8f0;">
              <div style="margin-bottom: 20px;">
                <div style="width: 40px; height: 40px; background: linear-gradient(135deg, #6B46C1 0%, #8B5CF6 100%); border-radius: 50%; margin: 0 auto 15px; display: flex; align-items: center; justify-content: center;">
                  <span style="color: white; font-weight: bold; font-size: 16px;">SF</span>
                </div>
                <h3 style="margin: 0; color: #1e293b; font-size: 18px; font-weight: 600;">Shabz Fazl</h3>
                <p style="margin: 5px 0 0 0; color: #64748b; font-size: 14px;">Mindset & Performance Psychology Coach</p>
              </div>
              <p style="margin: 0; color: #94a3b8; font-size: 12px; line-height: 1.5;">
                This message was sent from your Shabz Fazl website contact form.<br>
                Reply directly to this email to respond to ${name}.
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
New Message from ${name} - Shabz Fazl Website

You've received a new message from your website contact form:

Name: ${name}
Email: ${email}
Service Interest: ${service}

Message:
${message}

---
This message was sent from your Shabz Fazl website.
Reply directly to this email to respond to ${name}.
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
