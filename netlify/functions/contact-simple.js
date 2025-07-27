// Simple, robust contact function for Netlify
const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
  // CORS headers for all responses
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle preflight
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
    // Parse request
    const { name, phone, email, message } = JSON.parse(event.body || '{}');
    
    // Validate required fields
    if (!name || !message) {
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

    // Check environment variables
    const gmailUser = process.env.GMAIL_USER;
    const gmailPassword = process.env.GMAIL_APP_PASSWORD;
    
    if (!gmailUser || !gmailPassword) {
      console.error('Missing Gmail credentials');
      return {
        statusCode: 200, // Don't fail the form submission
        headers,
        body: JSON.stringify({ 
          success: false, 
          emailSent: false, 
          message: 'Email service not configured',
          debug: 'Environment variables missing'
        })
      };
    }

    // Create email transporter
    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: gmailUser,
        pass: gmailPassword
      }
    });

    // Email content
    const mailOptions = {
      from: gmailUser,
      to: 'chouikimahdiabderrahmane@gmail.com',
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Email:</strong> ${email || 'Not provided'}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <hr>
        <p><small>Sent from DS Design website on ${new Date().toLocaleString()}</small></p>
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        success: true, 
        emailSent: true, 
        message: 'Email sent successfully',
        contact: { id: Date.now().toString(), name, email, message }
      })
    };

  } catch (error) {
    console.error('Function error:', error);
    
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