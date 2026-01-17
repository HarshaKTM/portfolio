import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    console.log('Starting email send process...');
    
    // Create a test account using Ethereal for development
    console.log('Creating test account...');
    let testAccount;
    try {
      testAccount = await nodemailer.createTestAccount();
      console.log('Test account created successfully:', testAccount.user);
    } catch (testAccountError) {
      console.error('Error creating test account:', testAccountError);
      return res.status(500).json({ 
        error: 'Failed to create test email account', 
        details: testAccountError.message 
      });
    }
    
    // Create a transporter
    console.log('Creating email transporter...');
    const transportConfig = {
      host: process.env.SMTP_HOST || 'smtp.ethereal.email',
      port: process.env.SMTP_PORT || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER || testAccount.user,
        pass: process.env.SMTP_PASS || testAccount.pass,
      },
    };
    
    console.log('Transport config:', JSON.stringify(transportConfig, null, 2));
    
    const transporter = nodemailer.createTransport(transportConfig);
    
    // Verify the connection
    try {
      await transporter.verify();
      console.log('SMTP connection verified successfully');
    } catch (verifyError) {
      console.error('SMTP connection verification failed:', verifyError);
      return res.status(500).json({ 
        error: 'Failed to connect to email server', 
        details: verifyError.message 
      });
    }

    // Prepare email data
    const mailOptions = {
      from: `"Portfolio Contact" <${email}>`,
      to: process.env.RECIPIENT_EMAIL || 'your-email@example.com',
      subject: `Portfolio Contact: ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      html: `<p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Message:</strong> ${message}</p>`,
    };
    
    console.log('Sending email with options:', JSON.stringify(mailOptions, null, 2));

    // Send email
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Message sent successfully:', info.messageId);
      
      // For development, you can use the preview URL
      let previewUrl = null;
      if (testAccount && testAccount.user) {
        previewUrl = nodemailer.getTestMessageUrl(info);
        console.log('Preview URL:', previewUrl);
      }

      return res.status(200).json({ 
        success: true, 
        message: 'Email sent successfully',
        previewUrl: previewUrl
      });
    } catch (sendError) {
      console.error('Error sending email:', sendError);
      return res.status(500).json({ 
        error: 'Failed to send email', 
        details: sendError.message 
      });
    }
  } catch (error) {
    console.error('Unexpected error in email sending process:', error);
    return res.status(500).json({ 
      error: 'Failed to send email', 
      details: error.message || 'Unknown error'
    });
  }
} 