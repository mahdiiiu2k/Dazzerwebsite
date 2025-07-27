// Final working contact function for Netlify
const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
  console.log('Function started - Method:', event.httpMethod);
  
  // CORS headers for all responses
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ 
        success: false, 
        emailSent: false, 
        message: 'Only POST method allowed' 
      })
    };
  }

  try {
    console.log('Parsing request body...');
    const { name, phone, email, message } = JSON.parse(event.body || '{}');
    
    // Validate required fields
    if (!name || !message) {
      console.log('Validation failed - missing required fields');
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          success: false, 
          emailSent: false, 
          message: 'Name and message are required' 
        })
      };
    }

    console.log('Request validated successfully');

    // Check environment variables
    const gmailUser = process.env.GMAIL_USER;
    const gmailPassword = process.env.GMAIL_APP_PASSWORD;
    
    console.log('Environment check:', {
      GMAIL_USER: gmailUser ? 'configured' : 'missing',
      GMAIL_APP_PASSWORD: gmailPassword ? 'configured' : 'missing'
    });
    
    if (!gmailUser || !gmailPassword) {
      console.error('Missing Gmail credentials');
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ 
          success: false, 
          emailSent: false, 
          message: 'Email service not configured - missing environment variables'
        })
      };
    }

    console.log('Creating email transporter...');
    
    // Create email transporter (FIXED: was createTransporter, now createTransport)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmailUser,
        pass: gmailPassword
      }
    });

    console.log('Transporter created successfully');

    // Email content
    const mailOptions = {
      from: gmailUser,
      to: 'chouikimahdiabderrahmane@gmail.com',
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4a0d21;">New Contact Form Submission</h2>
          <div style="background: #f9f9f9; padding: 20px; border-radius: 8px;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
            <p><strong>Email:</strong> ${email || 'Not provided'}</p>
            <hr>
            <p><strong>Message:</strong></p>
            <p style="background: white; padding: 15px; border-radius: 4px; border-left: 4px solid #4a0d21;">${message}</p>
          </div>
          <p style="color: #666; font-size: 12px; margin-top: 20px;">
            Sent from DS Design website on ${new Date().toLocaleString()}
          </p>
        </div>
      `
    };

    console.log('Sending email to:', mailOptions.to);

    // Send email
    const info = await transporter.sendMail(mailOptions);
    
    console.log('Email sent successfully! Message ID:', info.messageId);
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        success: true, 
        emailSent: true, 
        message: 'Email sent successfully',
        contact: { 
          id: Date.now().toString(), 
          name, 
          email: email || '', 
          phone: phone || '',
          message,
          createdAt: new Date().toISOString()
        }
      })
    };

  } catch (error) {
    console.error('Function error:', error);
    console.error('Error stack:', error.stack);
    
    return {
      statusCode: 200, // Don't fail the form submission
      headers,
      body: JSON.stringify({ 
        success: false, 
        emailSent: false, 
        message: 'Failed to send email',
        error: error.message
      })
    };
  }
};