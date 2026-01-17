// GitHub projects data from HarshaKTM's profile
const githubProjects = [
  {
    name: "3-Tier DevSecOps Project",
    description: "End-to-end DevSecOps implementation with 3-tier architecture. Includes CI/CD pipelines, security scanning, Docker, Kubernetes, and AWS deployment.",
    image: "/images/projects/devops.jpg",
    github: "https://github.com/HarshaKTM/3-Tier-DevSecOps-Mega-Project",
    demo: "",
    tags: ["DevOps", "Kubernetes", "AWS", "Docker", "CI/CD"],
    stars: 1,
    forks: 0
  },
  {
    name: "Class Management System",
    description: "Full-stack application with complete CI/CD pipeline, Docker containerization, GitHub Actions, and Terraform infrastructure deployment to AWS.",
    image: "/images/projects/cms.jpg",
    github: "https://github.com/HarshaKTM/Class-Management-System",
    demo: "",
    tags: ["Terraform", "Docker", "GitHub Actions", "AWS", "React"],
    stars: 1,
    forks: 0
  },
  {
    name: "Minikube Setup",
    description: "Comprehensive guide and scripts for setting up Kubernetes locally with Minikube. Includes deployment examples and best practices.",
    image: "/images/projects/kubernetes.jpg",
    github: "https://github.com/HarshaKTM/Minikube_Setup",
    demo: "",
    tags: ["Kubernetes", "Minikube", "Docker", "DevOps"],
    stars: 0,
    forks: 0
  },
  {
    name: "Ansible Automation",
    description: "Ansible playbooks and roles for infrastructure automation, configuration management, and server provisioning.",
    image: "/images/projects/ansible.jpg",
    github: "https://github.com/HarshaKTM/ansible",
    demo: "",
    tags: ["Ansible", "IaC", "Automation", "Linux"],
    stars: 0,
    forks: 0
  },
  {
    name: "DevOps Learning Path",
    description: "Curated resources and hands-on projects for learning DevOps engineering. Covers CI/CD, containers, cloud, and monitoring.",
    image: "/images/projects/devops-learning.jpg",
    github: "https://github.com/HarshaKTM/devops-engineer-learning-path",
    demo: "",
    tags: ["DevOps", "Learning", "Documentation"],
    stars: 0,
    forks: 0
  },
  {
    name: "GitHub Actions Learning",
    description: "Examples and tutorials for GitHub Actions CI/CD workflows. Includes reusable workflows and best practices.",
    image: "/images/projects/github-actions.jpg",
    github: "https://github.com/HarshaKTM/github-actions-learning",
    demo: "",
    tags: ["GitHub Actions", "CI/CD", "Automation"],
    stars: 0,
    forks: 0
  },
  {
    name: "Portfolio",
    description: "Personal portfolio website built with Next.js, Tailwind CSS, and Framer Motion. Deployed via Vercel with GitHub Actions CI/CD.",
    image: "/images/projects/portfolio.jpg",
    github: "https://github.com/HarshaKTM/portfolio",
    demo: "https://harshaktm.qzz.io",
    tags: ["Next.js", "Tailwind CSS", "Vercel", "CI/CD"],
    stars: 1,
    forks: 0
  },
  {
    name: "Cloud Review Analyzer",
    description: "Cloud-native application for analyzing reviews using AI/ML. Implemented with microservices architecture and containerized deployment.",
    image: "/images/projects/cloud.jpg",
    github: "https://github.com/HarshaKTM/cloud-review-analyzer",
    demo: "",
    tags: ["Cloud", "Microservices", "Docker", "Python"],
    stars: 0,
    forks: 0
  }
];

// Image URLs for downloading
export const imageUrls = {
  portfolio: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1955&auto=format&fit=crop",
  devops: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?q=80&w=2070&auto=format&fit=crop",
  kubernetes: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?q=80&w=2070&auto=format&fit=crop",
  ansible: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2070&auto=format&fit=crop",
  cloud: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=2070&auto=format&fit=crop",
  cms: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2070&auto=format&fit=crop"
};

export default githubProjects; 