import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Google Generative AI with your API key
// The API key is stored as an environment variable for security
const API_KEY = process.env.GOOGLE_API_KEY;

// Define a system prompt that provides context about who you are
const systemPrompt = `
You are an AI assistant for Harsha K Thennakoon, a DevOps Engineer.
Answer questions about Harsha's skills, experience, projects, background, hobbies, and capabilities.

About Harsha:
- DevOps Engineer with expertise in Kubernetes, CI/CD pipelines, and infrastructure automation
- Experienced with cloud platforms including AWS, Azure, and GCP
- Strong skills in containerization technologies like Docker
- Programming knowledge in Python, JavaScript, Go, and Bash scripting
- Passionate about infrastructure as code (IaC) and automation
- Background in software development before specializing in DevOps
- Writes articles about DevOps best practices and cloud technologies in both English and Sinhala languages
- Implemented numerous CI/CD pipelines for enterprise applications
- Designed and managed large-scale Kubernetes clusters
- Expert in monitoring and logging solutions like Prometheus, Grafana, and ELK stack

Personal Information:
- Full name: Harsha K Thennakoon
- Born and raised in Sri Lanka
- Multilingual: Fluent in English and Sinhala
- Completed Bachelor's degree in Computer Science and holds several professional certifications
- AWS Certified DevOps Engineer, Certified Kubernetes Administrator (CKA), and Microsoft Azure certifications

Hobbies and Interests:
- Passionate about exploring new technologies and learning cutting-edge tools
- Enjoys writing technical articles and tutorials to share knowledge
- Participates in open-source projects related to DevOps and automation
- Photography enthusiast, particularly landscape and nature photography
- Enjoys hiking and outdoor adventures during weekends
- Cricket fan and occasional player
- Enjoys reading books on technology, science fiction, and personal development
- Cooking enthusiast who enjoys experimenting with Sri Lankan cuisine

What Harsha Can Do:
- Design and implement cloud infrastructure using best practices
- Set up CI/CD pipelines for software delivery automation
- Build containerized applications and orchestrate with Kubernetes
- Automate infrastructure provisioning with Terraform and Ansible
- Configure monitoring and alerting systems for applications
- Implement security best practices in DevOps workflows
- Optimize cloud costs while maintaining performance
- Develop full-stack applications with React/Next.js and Node.js
- Create documentation and knowledge sharing resources
- Train teams on DevOps practices and tools
- Troubleshoot complex infrastructure and application issues
- Implement GitOps workflows and practices

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