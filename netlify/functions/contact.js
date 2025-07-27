const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
  // Handle CORS
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: ''
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: 'Method Not Allowed' })
    };
  }

  let requestData;
  try {
    requestData = JSON.parse(event.body || '{}');
  } catch (parseError) {
    console.error('Error parsing request body:', parseError);
    return {
      statusCode: 400,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        success: false, 
        message: 'Invalid request body - not valid JSON' 
      })
    };
  }

  try {
    const { name, email, phone, message } = requestData;

    // Validate required fields
    if (!name || !message) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          success: false, 
          message: 'Name and message are required' 
        })
      };
    }

    // Log all available environment variables (safely)
    console.log('Environment check:', {
      GMAIL_USER: process.env.GMAIL_USER ? 'configured' : 'missing',
      GMAIL_APP_PASSWORD: process.env.GMAIL_APP_PASSWORD ? 'configured' : 'missing',
      NODE_ENV: process.env.NODE_ENV,
      availableEnvVars: Object.keys(process.env).filter(key => key.includes('GMAIL'))
    });

    // Check if Gmail credentials are available
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      console.error('Gmail credentials not found. GMAIL_USER:', process.env.GMAIL_USER ? 'exists' : 'missing');
      console.error('GMAIL_APP_PASSWORD:', process.env.GMAIL_APP_PASSWORD ? 'exists' : 'missing');
      return {
        statusCode: 200, // Changed to 200 to avoid CORS issues
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          success: false,
          emailSent: false,
          message: 'Email service not configured - missing environment variables',
          debug: {
            GMAIL_USER: process.env.GMAIL_USER ? 'configured' : 'missing',
            GMAIL_APP_PASSWORD: process.env.GMAIL_APP_PASSWORD ? 'configured' : 'missing',
            allEnvKeys: Object.keys(process.env).filter(key => key.includes('GMAIL'))
          }
        })
      };
    }

    // Create transporter using Gmail SMTP
    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: 'chouikimahdiabderrahmane@gmail.com',
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f4f4f4; padding: 20px;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #4a0d21; border-bottom: 2px solid #4a0d21; padding-bottom: 10px;">
              New Contact Form Submission
            </h2>
            
            <div style="margin: 20px 0;">
              <h3 style="color: #333; margin-bottom: 5px;">Contact Details:</h3>
              
              <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 10px 0;">
                <p style="margin: 5px 0;"><strong>Name:</strong> ${name}</p>
                <p style="margin: 5px 0;"><strong>Email:</strong> ${email || 'Not provided'}</p>
                ${phone ? `<p style="margin: 5px 0;"><strong>Phone:</strong> ${phone}</p>` : ''}
              </div>
              
              <h3 style="color: #333; margin: 20px 0 10px 0;">Message:</h3>
              <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; border-left: 4px solid #4a0d21;">
                <p style="margin: 0; line-height: 1.6; white-space: pre-wrap;">${message}</p>
              </div>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 14px;">
              <p>This email was sent from your DS Design website contact form.</p>
              <p>Submitted on: ${new Date().toLocaleString()}</p>
            </div>
          </div>
        </div>
      `,
    };

    // Send email
    console.log('Attempting to send email to:', mailOptions.to);
    console.log('From email:', mailOptions.from);
    
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent successfully. Message ID:', info.messageId);
    } catch (emailError) {
      console.error('Failed to send email:', emailError.message);
      console.error('Email error details:', {
        code: emailError.code,
        response: emailError.response,
        responseCode: emailError.responseCode
      });
      
      return {
        statusCode: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          success: false,
          emailSent: false,
          message: 'Failed to send email',
          error: emailError.message,
          details: 'Check function logs in Netlify dashboard for more details'
        })
      };
    }
    
    // Create contact record with same format as Replit backend
    const contact = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email: email || '',
      message,
      createdAt: new Date().toISOString()
    };
    
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        success: true,
        contact: contact,
        emailSent: true
      })
    };

  } catch (processingError) {
    console.error('Error in contact function processing:', processingError);
    
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        success: false,
        emailSent: false,
        message: 'Failed to process contact form',
        error: processingError.message
      })
    };
  }
};