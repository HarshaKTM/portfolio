import { GoogleGenerativeAI } from '@google/generative-ai';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Check if API key is available
  const API_KEY = process.env.GOOGLE_API_KEY;
  
  if (!API_KEY || API_KEY === 'your_api_key_here') {
    return res.status(500).json({ 
      error: 'API configuration error',
      details: 'The Google AI API key is not properly configured'
    });
  }

  try {
    // Initialize the API
    const genAI = new GoogleGenerativeAI(API_KEY);
    
    // Access the generative model (Gemini)
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Test simple prompt
    const prompt = "Say hello and confirm you're working";
    const result = await model.generateContent(prompt);
    const response = result.response.text();

    return res.status(200).json({ 
      success: true, 
      response,
      apiKeyPrefix: API_KEY.substring(0, 5) + '...',
      apiKeyLength: API_KEY.length
    });
  } catch (error) {
    console.error('Error communicating with Google AI:', error);
    
    return res.status(500).json({ 
      error: 'Failed to generate response',
      details: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : null
    });
  }
} 