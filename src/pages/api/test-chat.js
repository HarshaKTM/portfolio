// This endpoint tests if the Google Gemini API key is properly configured
export default function handler(req, res) {
  // Return the status of our configuration
  const apiKey = process.env.GOOGLE_API_KEY;
  
  return res.status(200).json({
    apiKeyExists: !!apiKey,
    apiKeyLength: apiKey ? apiKey.length : 0,
    apiKeyPrefix: apiKey ? apiKey.substring(0, 5) + '...' : 'none',
    nodeEnv: process.env.NODE_ENV || 'not set',
    timestamp: new Date().toISOString()
  });
} 