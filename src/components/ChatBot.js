import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoMdChatbubbles } from 'react-icons/io';
import { FiSend, FiX, FiInfo } from 'react-icons/fi';
import { HiOutlineLightBulb } from 'react-icons/hi';

const ChatBot = () => {
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([
    { 
      type: 'bot', 
      content: "Hi there! 👋 I'm Harsha's AI assistant. How can I help you today?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [useLocalFallback, setUseLocalFallback] = useState(false); // Set to false to use Gemini API by default
  const [apiErrorShown, setApiErrorShown] = useState(false); // Track if we've shown an API error
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (showChat) {
      setTimeout(scrollToBottom, 100);
      inputRef.current?.focus();
    }
  }, [showChat, messages, scrollToBottom]);

  // Check if the Gemini API is configured correctly
  useEffect(() => {
    if (!apiErrorShown && !useLocalFallback) {
      const checkApiConfig = async () => {
        try {
          const response = await fetch('/api/test-chat');
          const data = await response.json();
          
          if (!data.apiKeyExists || data.apiKeyLength < 10) {
            console.warn('API key not properly configured, switching to local mode');
            setUseLocalFallback(true);
            setApiErrorShown(true);
            
            // Add a system message about using local mode
            setMessages(prev => [
              ...prev,
              {
                type: 'bot',
                content: "I'm currently operating in local mode as the Gemini API isn't configured. To enable AI-powered chat:\n\n1. Get a free API key from https://aistudio.google.com/app/apikey\n2. Add it to your .env.local file as GOOGLE_API_KEY=your_key_here\n3. Restart your Next.js server\n\nI'll still be able to answer questions about Harsha's skills and experience using my pre-programmed responses!",
                timestamp: new Date(),
                isError: true
              }
            ]);
          }
        } catch (error) {
          console.error('Error checking API configuration:', error);
          // Default to local fallback on error
          setUseLocalFallback(true);
        }
      };
      
      checkApiConfig();
    }
  }, [apiErrorShown, useLocalFallback]);

  const formatTimestamp = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).format(date);
  };

  // Comprehensive fallback responses when API is not available
  const getFallbackResponse = (message) => {
    const messageLower = message.toLowerCase();
    
    // DevOps Experience
    if (messageLower.includes('devops') || 
        messageLower.includes('experience') || 
        messageLower.includes('background')) {
      return "Harsha is a skilled DevOps Engineer with extensive experience in cloud infrastructure and automation. He has worked with various technologies including Kubernetes, Docker, AWS, Azure, and GCP. He specializes in building and optimizing CI/CD pipelines and implementing infrastructure as code solutions. His DevOps expertise includes continuous integration, deployment automation, container orchestration, and cloud-native architecture.";
    }
    
    // Technical Skills
    if (messageLower.includes('technologies') || 
        messageLower.includes('tech stack') || 
        messageLower.includes('skills') ||
        messageLower.includes('work with')) {
      return "Harsha's technical skills include:\n\n• Cloud Platforms: AWS, Azure, GCP\n• Containers: Docker, Kubernetes\n• CI/CD: Jenkins, GitLab CI, GitHub Actions\n• IaC: Terraform, Ansible, CloudFormation\n• Monitoring: Prometheus, Grafana, ELK Stack\n• Programming: Python, JavaScript, Go, Bash\n• Version Control: Git, GitHub, GitLab\n• Frontend: React, Next.js, Vue.js, Tailwind CSS\n• Backend: Node.js, Express, Django, Flask\n• Databases: MongoDB, PostgreSQL, MySQL\n• AI/ML: TensorFlow, PyTorch, Scikit-learn, LLM integration";
    }
    
    // Fullstack Skills
    if (messageLower.includes('fullstack') || 
        messageLower.includes('full stack') || 
        messageLower.includes('full-stack')) {
      return "Harsha is a capable fullstack developer with expertise in both frontend and backend technologies. His fullstack skills include:\n\n• Frontend: React, Next.js, Vue.js, Tailwind CSS, Material UI, HTML5/CSS3/JavaScript\n• Backend: Node.js, Express, Django, Flask, RESTful APIs, GraphQL\n• Databases: MongoDB, PostgreSQL, MySQL, Redis\n• Authentication: OAuth, JWT, Firebase Auth\n• State Management: Redux, Vuex, Context API\n• Testing: Jest, Cypress, Mocha, Chai\n• Build Tools: Webpack, Babel, Vite\n\nHe has built several fullstack applications with responsive designs, secure authentication, and efficient database operations.";
    }
    
    // Frontend Skills
    if (messageLower.includes('frontend') || 
        messageLower.includes('front end') || 
        messageLower.includes('front-end') ||
        messageLower.includes('ui') ||
        messageLower.includes('interface')) {
      return "Harsha has strong frontend development skills with expertise in creating responsive, accessible, and visually appealing web interfaces. His frontend skills include:\n\n• Frameworks: React, Next.js, Vue.js\n• Styling: Tailwind CSS, Material UI, Styled Components, CSS3, SASS\n• State Management: Redux, Vuex, Context API\n• Animation: Framer Motion, GSAP, CSS Animations\n• Performance Optimization: Code splitting, lazy loading, memoization\n• Responsive Design: Mobile-first approach, Flexbox, CSS Grid\n• Testing: Jest, React Testing Library, Cypress\n• Accessibility: WCAG standards, semantic HTML\n\nHe focuses on creating intuitive user experiences with modern design principles.";
    }
    
    // AI Skills
    if (messageLower.includes('ai') || 
        messageLower.includes('artificial intelligence') || 
        messageLower.includes('machine learning') ||
        messageLower.includes('ml') ||
        messageLower.includes('gpt')) {
      return "Harsha has developed expertise in AI integration and implementation, with skills in:\n\n• AI Tools Integration: OpenAI API, Google Gemini, Claude API, Hugging Face\n• LLM Implementation: Prompt engineering, context management, fine-tuning\n• AI Development: TensorFlow, PyTorch, Scikit-learn\n• NLP: Sentiment analysis, text classification, entity recognition\n• AI Application Development: Building AI-powered features and products\n• Data Processing: Data preparation and cleaning for AI models\n• AI Ethics: Responsible AI implementation and bias mitigation\n\nHe specializes in integrating AI capabilities into applications to enhance functionality and user experience.";
    }
    
    // AI Tools Management
    if (messageLower.includes('ai tool') || 
        messageLower.includes('manage ai') || 
        messageLower.includes('ai management')) {
      return "Harsha expertly manages AI tools and integrations through:\n\n• API Integration: Secure implementation of OpenAI, Google, and Claude APIs\n• Cost Optimization: Token usage monitoring and optimization strategies\n• Prompt Engineering: Creating effective prompts for specific use cases\n• Fallback Systems: Designing robust systems with graceful degradation\n• Performance Tuning: Balancing response quality with performance requirements\n• AI Orchestration: Managing multiple AI services for optimal results\n• Security: Implementing proper authentication and data protection\n\nHe has successfully integrated AI capabilities into various applications while ensuring reliability, security, and cost-effectiveness.";
    }
    
    // DevOps Tools
    if (messageLower.includes('devops tool') || 
        messageLower.includes('devops knowledge') || 
        messageLower.includes('infrastructure tool')) {
      return "Harsha has comprehensive knowledge of DevOps tools and practices:\n\n• Containerization: Docker, Podman, container security scanning\n• Orchestration: Kubernetes, EKS, AKS, GKE, k3s, OpenShift\n• CI/CD: Jenkins, GitHub Actions, GitLab CI, CircleCI, ArgoCD\n• Infrastructure as Code: Terraform, AWS CloudFormation, Pulumi\n• Configuration Management: Ansible, Chef, Puppet\n• Monitoring & Observability: Prometheus, Grafana, ELK Stack, Datadog\n• Cloud Services: AWS, Azure, GCP, specialized services within each\n• Security: HashiCorp Vault, SAST/DAST tools, container scanning\n• Version Control: Git workflows, branch strategies, code reviews\n• Networking: Service meshes, ingress controllers, network policies\n\nHe implements DevOps best practices to create efficient, secure, and scalable infrastructure.";
    }
    
    // Contact Info
    if (messageLower.includes('contact') || 
        messageLower.includes('email') || 
        messageLower.includes('reach') ||
        messageLower.includes('phone')) {
      return "You can contact Harsha through the contact form on this website, or via his professional email: harsha@example.com. He's also active on LinkedIn where you can connect with him professionally.";
    }
    
    // Education
    if (messageLower.includes('education') || 
        messageLower.includes('university') || 
        messageLower.includes('degree') ||
        messageLower.includes('college')) {
      return "Harsha has a Bachelor's degree in Computer Science and has completed several professional certifications including AWS Certified DevOps Engineer, Certified Kubernetes Administrator (CKA), and Microsoft Certified: Azure DevOps Engineer Expert.";
    }
    
    // Projects
    if (messageLower.includes('project') || 
        messageLower.includes('portfolio') || 
        messageLower.includes('work')) {
      return "Harsha has worked on numerous projects, including:\n\n• Building scalable Kubernetes clusters for production workloads\n• Implementing GitOps workflows with ArgoCD\n• Designing cost-effective cloud infrastructure\n• Creating self-healing infrastructure solutions\n• Developing monitoring and alerting systems\n\nYou can find more details about his projects on the Portfolio section of this website.";
    }

    // Articles
    if (messageLower.includes('article') || 
        messageLower.includes('blog') || 
        messageLower.includes('publication') ||
        messageLower.includes('write')) {
      return "Harsha regularly writes technical articles on DevOps practices, cloud infrastructure, and automation. His recent articles include topics like 'Implementing GitOps in Enterprise Environments', 'Cost Optimization Strategies for AWS', and 'Building Self-healing Infrastructure'. You can find all his articles in the Articles section of this website and on his LinkedIn profile.";
    }

    // Greeting responses
    if (messageLower.includes('hello') || 
        messageLower.includes('hi') || 
        messageLower.includes('hey') ||
        messageLower === 'hi' || 
        messageLower === 'hello' || 
        messageLower === 'hey') {
      return "Hello! I'm Harsha's virtual assistant. I can tell you about his skills, experience, projects, or publications. What would you like to know?";
    }

    // About the website
    if (messageLower.includes('website') || 
        messageLower.includes('portfolio site') || 
        messageLower.includes('this site')) {
      return "This website showcases Harsha's professional portfolio as a DevOps Engineer. It features his projects, articles, skills, and contact information. The site was built using modern web technologies and reflects his attention to detail and technical capabilities.";
    }

    // Fallback for other questions
    return "I can provide information about Harsha's DevOps experience, technical skills, projects, articles, education, and contact information. Could you please be more specific about what you'd like to know?";
  };

  const handleSendMessage = async (e) => {
    e?.preventDefault();
    
    if (!inputMessage.trim()) return;
    
    // Mark as having had an interaction
    setHasInteracted(true);
    
    // Add user message
    const userMessage = {
      type: 'user',
      content: inputMessage.trim(),
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);
    
    // Simulate typing delay for better UX
    const typingDelay = Math.max(500, Math.min(userMessage.content.length * 20, 1500));
    
    try {
      if (useLocalFallback) {
        // Use local fallback instead of API
        setTimeout(() => {
          setMessages(prev => [
            ...prev, 
            { 
              type: 'bot', 
              content: getFallbackResponse(userMessage.content),
              timestamp: new Date()
            }
          ]);
          setIsTyping(false);
        }, typingDelay);
        return;
      }

      // Send request directly to our Gemini API endpoint
      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: userMessage.content }),
          signal: AbortSignal.timeout(15000) // 15 second timeout
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          console.error('API error:', errorData);
          throw new Error(errorData.error || 'Failed to get response');
        }
        
        const data = await response.json();
        
        // Add bot response
        setTimeout(() => {
          setMessages(prev => [
            ...prev, 
            { 
              type: 'bot', 
              content: data.response || "I'm having trouble generating a response right now.",
              timestamp: new Date()
            }
          ]);
          setIsTyping(false);
        }, typingDelay);
        return;
      } catch (apiError) {
        console.error('Gemini API error:', apiError);
        // If the main API fails, try the test endpoint as backup
        console.log('Trying test endpoint as backup...');
        throw apiError; // Rethrow to trigger the test endpoint
      }
      
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Try the test endpoint if the main endpoint failed
      try {
        const testResponse = await fetch('/api/test', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: userMessage.content }),
        });
        
        if (testResponse.ok) {
          const testData = await testResponse.json();
          setTimeout(() => {
            setMessages(prev => [
              ...prev, 
              { 
                type: 'bot', 
                content: testData.response,
                timestamp: new Date()
              }
            ]);
            setIsTyping(false);
          }, typingDelay);
          return;
        }
      } catch (testError) {
        console.log('Both endpoints failed, using local fallback:', testError);
      }
      
      // Switch to fallback mode after an error
      setUseLocalFallback(true);
      
      // Add error message only if we haven't shown one yet
      if (!apiErrorShown) {
        setApiErrorShown(true);
        setMessages(prev => [
          ...prev, 
          { 
            type: 'bot', 
            content: "I'm having trouble connecting to the Gemini AI service. This could be due to:\n\n• API key issues\n• Network connectivity problems\n• Rate limiting\n\nYou can verify your setup by visiting /api/chat-test in your browser. For now, I'll switch to local mode and continue assisting you with information about Harsha.",
            timestamp: new Date(),
            isError: true
          }
        ]);
      }
      
      // Add a fallback response after the error message
      setTimeout(() => {
        setMessages(prev => [
          ...prev, 
          { 
            type: 'bot', 
            content: getFallbackResponse(userMessage.content),
            timestamp: new Date()
          }
        ]);
        setIsTyping(false);
      }, typingDelay);
    }
  };

  const suggestedQuestions = [
    "What's your DevOps experience?",
    "What technologies do you work with?",
    "Tell me about your fullstack skills",
    "What are your frontend skills?",
    "How do you work with AI tools?",
    "Tell me about your projects",
    "Where can I read your articles?"
  ];

  const handleSuggestedQuestion = (question) => {
    setInputMessage(question);
    setTimeout(() => handleSendMessage(), 100);
  };

  const resetChat = () => {
    setMessages([
      { 
        type: 'bot', 
        content: "Chat has been reset. What would you like to know about Harsha?",
        timestamp: new Date()
      }
    ]);
    setHasInteracted(false);
  };

  if (!isMounted) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50">
      {/* Chat toggle button */}
      <motion.button
        className={`w-12 h-12 rounded-full ${showChat ? 'bg-purple-700' : 'bg-purple-600'} text-white flex items-center justify-center shadow-lg hover:bg-purple-700 transition-colors relative`}
        onClick={() => setShowChat(prevState => !prevState)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label={showChat ? "Close chat" : "Open chat"}
      >
        {showChat ? (
          <FiX className="text-xl" />
        ) : (
          <IoMdChatbubbles className="text-xl" />
        )}
        
        {!hasInteracted && !showChat && (
          <motion.div 
            className="absolute -right-2 -top-2 bg-green-500 w-3 h-3 rounded-full"
            animate={{ 
              scale: [1, 1.4, 1],
              backgroundColor: ["#10b981", "#34d399", "#10b981"] 
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </motion.button>
      
      {/* Chat window */}
      <AnimatePresence>
        {showChat && (
          <motion.div
            className="absolute bottom-16 left-0 w-80 sm:w-96 bg-gray-800 rounded-lg shadow-xl border border-purple-800/20 overflow-hidden"
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {/* Chat header */}
            <div className="bg-gradient-to-r from-purple-700 to-indigo-800 p-3 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                  <IoMdChatbubbles className="text-white text-lg" />
                </div>
                <div>
                  <h3 className="text-white font-medium">Ask Harsha</h3>
                  <p className="text-purple-200 text-xs">
                    {useLocalFallback 
                      ? "Virtual assistant ready to help" 
                      : "Connected to AI assistant"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  className="text-xs px-2 py-1 bg-purple-600/50 hover:bg-purple-600 rounded-full text-white/80 hover:text-white"
                  onClick={resetChat}
                  title="Reset conversation"
                >
                  Reset
                </button>
                <button 
                  className="text-white/70 hover:text-white"
                  onClick={() => setShowChat(false)}
                  aria-label="Close chat"
                >
                  <FiX />
                </button>
              </div>
            </div>

            {/* Info banner - only show in local mode */}
            {useLocalFallback && (
              <div className="bg-blue-600/20 border-b border-blue-500/20 px-3 py-2 flex items-start gap-2">
                <FiInfo className="text-blue-400 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-blue-200">
                  I'm answering based on pre-programmed information about Harsha's skills, experience, and portfolio.
                </p>
              </div>
            )}
            
            {/* Messages container */}
            <div className="h-80 overflow-y-auto p-4 flex flex-col gap-3 custom-scrollbar">
              {messages.map((message, index) => (
                <div 
                  key={index}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] rounded-2xl p-3 relative ${
                      message.type === 'user' 
                        ? 'bg-purple-600 text-white rounded-br-none' 
                        : message.isError 
                          ? 'bg-blue-500/20 text-blue-200' 
                          : 'bg-gray-700 text-gray-100 rounded-bl-none'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{message.content}</p>
                    <span className="text-xs opacity-70 mt-1 block text-right">
                      {formatTimestamp(message.timestamp)}
                    </span>
                  </div>
                </div>
              ))}
              
              {/* Typing indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-700 text-white rounded-2xl p-3 rounded-bl-none">
                    <div className="flex gap-1 items-center">
                      <motion.div 
                        className="w-2 h-2 bg-gray-400 rounded-full"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity, repeatType: 'loop' }}
                      />
                      <motion.div 
                        className="w-2 h-2 bg-gray-400 rounded-full"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity, repeatType: 'loop', delay: 0.15 }}
                      />
                      <motion.div 
                        className="w-2 h-2 bg-gray-400 rounded-full"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity, repeatType: 'loop', delay: 0.3 }}
                      />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            
            {/* Suggested questions */}
            {!hasInteracted && (
              <div className="px-4 pb-3">
                <div className="flex items-center gap-2 mb-2">
                  <HiOutlineLightBulb className="text-yellow-500" />
                  <p className="text-gray-300 text-sm">Try asking:</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {suggestedQuestions.map((question, index) => (
                    <button
                      key={index}
                      className="text-xs bg-gray-700 hover:bg-gray-600 text-gray-300 py-1 px-2 rounded-full"
                      onClick={() => handleSuggestedQuestion(question)}
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Input area */}
            <form 
              onSubmit={handleSendMessage}
              className="border-t border-gray-700 p-3 flex gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-gray-700 text-white placeholder-gray-400 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim()}
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  inputMessage.trim() 
                    ? 'bg-purple-600 hover:bg-purple-700 text-white' 
                    : 'bg-gray-700 text-gray-500'
                }`}
                aria-label="Send message"
              >
                <FiSend className={inputMessage.trim() ? 'text-white' : 'text-gray-400'} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatBot; 