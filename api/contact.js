const handler = async (req, res) => {
  console.log('Handler called with method:', req.method);
  
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    console.log('Request body:', req.body);
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
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
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8f9fa; padding: 20px;">
          <div style="background: linear-gradient(135deg, #6B46C1 0%, #8B5CF6 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0; font-size: 24px;">New Website Message</h1>
            <p style="margin: 5px 0 0 0; opacity: 0.9;">Someone contacted you through your website</p>
          </div>
          <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px;">
            <p style="color: #666; margin-bottom: 25px;">You've received a new message from your Shabz Fazl website contact form:</p>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #6B46C1; margin-bottom: 20px;">
              <strong style="color: #6B46C1;">Name:</strong><br>
              <span style="color: #333;">${name}</span>
            </div>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #6B46C1; margin-bottom: 20px;">
              <strong style="color: #6B46C1;">Email:</strong><br>
              <span style="color: #333;">${email}</span>
            </div>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #6B46C1;">
              <strong style="color: #6B46C1;">Message:</strong><br>
              <div style="color: #333; margin-top: 10px; white-space: pre-wrap;">${message}</div>
            </div>
          </div>
          <div style="background: #f8f9fa; padding: 20px; text-align: center; color: #666; font-size: 14px; border-radius: 0 0 10px 10px;">
            <p><strong>This message was sent from your Shabz Fazl website contact form.</strong></p>
            <p>Reply directly to this email to respond to ${name}.</p>
          </div>
        </div>
      `,
      text: `
New Message from ${name} - Shabz Fazl Website

You've received a new message from your website contact form:

Name: ${name}
Email: ${email}

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
