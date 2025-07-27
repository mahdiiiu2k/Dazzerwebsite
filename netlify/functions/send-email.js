const sgMail = require('@sendgrid/mail');

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' })
    };
  }

  try {
    // Parse the request body
    const { name, email, phone, message } = JSON.parse(event.body);

    // Validate required fields
    if (!name || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ 
          success: false, 
          message: 'Name and message are required' 
        })
      };
    }

    // Check if SendGrid API key is available
    if (!process.env.SENDGRID_API_KEY) {
      console.error('SENDGRID_API_KEY environment variable is not set');
      return {
        statusCode: 500,
        body: JSON.stringify({ 
          success: false, 
          message: 'Email service not configured' 
        })
      };
    }

    // Set SendGrid API key
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    // Email content
    const msg = {
      to: 'chouikimahdiabderrahmane@gmail.com',
      from: 'noreply@dsdesign.netlify.app', // Use a verified sender domain
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
    await sgMail.send(msg);
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: JSON.stringify({ 
        success: true, 
        message: 'Email sent successfully' 
      })
    };

  } catch (error) {
    console.error('Error sending email:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ 
        success: false, 
        message: 'Failed to send email',
        error: error.message
      })
    };
  }
};