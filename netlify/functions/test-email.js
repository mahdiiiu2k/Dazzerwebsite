const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
  // Handle CORS
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, OPTIONS'
      },
      body: ''
    };
  }

  try {
    // Environment variable check
    const envCheck = {
      GMAIL_USER: process.env.GMAIL_USER ? 'configured' : 'missing',
      GMAIL_APP_PASSWORD: process.env.GMAIL_APP_PASSWORD ? 'configured' : 'missing',
      NODE_ENV: process.env.NODE_ENV || 'not set'
    };

    console.log('Environment variables check:', envCheck);

    // If credentials are missing, return diagnostic info
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          status: 'error',
          message: 'Email credentials not configured',
          environment: envCheck,
          instructions: 'Add GMAIL_USER and GMAIL_APP_PASSWORD to Netlify environment variables'
        })
      };
    }

    // Test email connection
    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // Verify connection
    await transporter.verify();

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        status: 'success',
        message: 'Email service is properly configured',
        environment: envCheck,
        timestamp: new Date().toISOString()
      })
    };

  } catch (error) {
    console.error('Test function error:', error);

    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        status: 'error',
        message: 'Email service test failed',
        error: error.message,
        code: error.code,
        timestamp: new Date().toISOString()
      })
    };
  }
};