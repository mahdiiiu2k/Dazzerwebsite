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

    // Check if Gmail credentials are available
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      console.error('Gmail credentials not found');
      return {
        statusCode: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          success: false, 
          message: 'Email service not configured' 
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
    await transporter.sendMail(mailOptions);
    
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