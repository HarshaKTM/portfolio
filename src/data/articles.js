export const initialArticles = [
  {
    id: 1,
    title: "Getting Started with DevOps: A Comprehensive Guide",
    excerpt: "Learn the fundamental concepts of DevOps and how to implement them in your development workflow...",
    content: `
      <h2>Introduction to DevOps</h2>
      <p>DevOps is a set of practices that combines software development (Dev) and IT operations (Ops). It aims to shorten the systems development life cycle and provide continuous delivery with high software quality.</p>

      <h2>Key DevOps Practices</h2>
      <p>1. Continuous Integration (CI)<br>
      CI is the practice of automating the integration of code changes from multiple contributors into a single software project.</p>

      <p>2. Continuous Delivery (CD)<br>
      CD is a software engineering approach in which teams produce software in short cycles, ensuring that the software can be reliably released at any time.</p>

      <p>3. Infrastructure as Code<br>
      Managing and provisioning infrastructure through code instead of manual processes.</p>

      <h2>Essential DevOps Tools</h2>
      <p>• Jenkins for CI/CD pipelines<br>
      • Docker for containerization<br>
      • Kubernetes for container orchestration<br>
      • Terraform for infrastructure as code</p>
    `,
    category: "DevOps",
    readTime: "8 min read",
    date: "2024-03-15",
    image: "/images/1.png"
  },
  {
    id: 2,
    title: "Modern Full Stack Development with Next.js",
    excerpt: "Explore the power of Next.js for building full-stack applications with React and Node.js...",
    content: `
      <h2>Why Next.js?</h2>
      <p>Next.js is a powerful React framework that enables features like server-side rendering and static site generation.</p>

      <h2>Key Features</h2>
      <p>1. Server-Side Rendering<br>
      Pre-render pages on the server for better performance and SEO.</p>

      <p>2. API Routes<br>
      Create API endpoints easily within your Next.js application.</p>

      <p>3. File-System Routing<br>
      Simple and intuitive routing based on your file structure.</p>

      <h2>Building Modern Applications</h2>
      <p>Learn how to create full-stack applications using Next.js, incorporating:</p>
      <p>• Database integration<br>
      • Authentication<br>
      • API development<br>
      • Deployment strategies</p>
    `,
    category: "Web Development",
    readTime: "10 min read",
    date: "2024-03-10",
    image: "/images/articles/nextjs.jpg"
  }
]; 