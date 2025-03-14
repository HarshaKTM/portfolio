import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Google Generative AI with your API key
// The API key is stored as an environment variable for security
const API_KEY = process.env.GOOGLE_API_KEY;

// Define a system prompt that provides context about who you are
const systemPrompt = `
You are an AI assistant for Harsha Kumarasingha, a DevOps Engineer.
Answer questions about Harsha's skills, experience, projects, and background.

About Harsha:
- DevOps Engineer with expertise in Kubernetes, CI/CD pipelines, and infrastructure automation
- Experienced with cloud platforms including AWS, Azure, and GCP
- Strong skills in containerization technologies like Docker
- Programming knowledge in Python, JavaScript, and Go
- Passionate about infrastructure as code and automation
- Background in software development before specializing in DevOps
- Writes articles about DevOps best practices and cloud technologies

Keep responses friendly, professional, and concise (under 150 words when possible).
If asked about contacting Harsha, direct users to the contact form on the website
or provide the email address visible on the portfolio site.
If you don't know the answer to a question, kindly say so rather than making up information.
`;

export default async function handler(req, res) {
  // Only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  // Check if API key is available
  if (!API_KEY || API_KEY === 'your_api_key_here') {
    console.error('Missing or invalid Google API key');
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

    // Start a chat session
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: "Please act as described in the following instructions:" }],
        },
        {
          role: "model", 
          parts: [{ text: "I understand and will follow these instructions." }],
        },
        {
          role: "user",
          parts: [{ text: systemPrompt }],
        },
        {
          role: "model",
          parts: [{ text: "I'll act as Harsha's AI assistant, providing information about his DevOps skills, experience, and background while keeping responses friendly, professional, and concise. I'll direct contact inquiries to the appropriate channels and will acknowledge when I don't know something rather than inventing information." }],
        }
      ],
      generationConfig: {
        maxOutputTokens: 500,
        temperature: 0.7,
      },
    });

    // Send the user's message and get a response
    const result = await chat.sendMessage(message);
    const response = result.response.text();

    return res.status(200).json({ response });
  } catch (error) {
    console.error('Error communicating with Google AI:', error);
    
    // Create a more informative error message
    let errorMessage = 'Failed to generate response';
    let errorDetails = error.message;
    
    // Handle specific error types
    if (error.message?.includes('API key')) {
      errorMessage = 'API key error';
      errorDetails = 'There is an issue with the Google AI API key';
    } else if (error.message?.includes('network')) {
      errorMessage = 'Network error';
      errorDetails = 'Failed to connect to the Google AI service';
    } else if (error.message?.includes('rate limit')) {
      errorMessage = 'Rate limit exceeded';
      errorDetails = 'The Google AI API rate limit has been reached. Please try again later.';
    }
    
    return res.status(500).json({ 
      error: errorMessage,
      details: process.env.NODE_ENV === 'development' ? errorDetails : 'Check server logs for details'
    });
  }
} 