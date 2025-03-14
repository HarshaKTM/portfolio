export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  // Always respond with success
  return res.status(200).json({ 
    response: `Thank you for your message: "${message}". This is a test response that shows the chat API is working properly.`
  });
} 