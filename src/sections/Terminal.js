import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiTerminal, FiX, FiMinus, FiMaximize2, FiExternalLink, FiInfo, FiCode, FiCommand } from 'react-icons/fi';
import { 
  SiTerraform, SiKubernetes, SiDocker, SiAnsible, 
  SiPrometheus, SiGrafana, SiAmazonaws, SiJenkins,
  SiGithubactions, SiArgo, SiHelm, SiElasticsearch
} from 'react-icons/si';

const Terminal = () => {
  const [commands, setCommands] = useState([]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [currentLine, setCurrentLine] = useState(0);
  const [hoveredTool, setHoveredTool] = useState(null);
  const [clickedTool, setClickedTool] = useState(null);
  const [selectedTool, setSelectedTool] = useState(null);
  const terminalRef = useRef(null);

  // Terminal commands to showcase DevOps skills
  const devopsCommands = [
    { 
      command: 'terraform init', 
      output: 'Initializing Terraform... Terraform has been successfully initialized!',
      tool: 'Terraform'
    },
    { 
      command: 'kubectl get pods', 
      output: 'NAME                     READY   STATUS    RESTARTS   AGE\napi-gateway-7f9c6b7b5-2x8qz   1/1     Running   0          2d\nauth-service-5d8d7c9f8-jk3l2   1/1     Running   0          1d\ndb-service-6f7b8d9c7-rt5y6     1/1     Running   0          3d',
      tool: 'Kubernetes'
    },
    { 
      command: 'docker-compose up -d', 
      output: 'Creating network "app_default" with the default driver\nCreating app_db_1 ... done\nCreating app_redis_1 ... done\nCreating app_api_1 ... done\nCreating app_web_1 ... done',
      tool: 'Docker'
    },
    { 
      command: 'ansible-playbook deploy.yml', 
      output: 'PLAY [Deploy Application] *************************\n\nTASK [Gathering Facts] *****************************\nok: [web-server]\n\nTASK [Pull latest code] ****************************\nchanged: [web-server]\n\nTASK [Restart application] *************************\nchanged: [web-server]\n\nPLAY RECAP *****************************************\nweb-server : ok=3 changed=2 unreachable=0 failed=0',
      tool: 'Ansible'
    },
    { 
      command: 'prometheus --config.file=prometheus.yml', 
      output: 'level=info ts=2023-06-15T10:15:30.123Z caller=main.go:213 msg="Starting Prometheus" version="2.37.0"\nlevel=info ts=2023-06-15T10:15:30.456Z caller=main.go:219 msg="Build context" build_context="go=1.18.3 user=root date=20220610-11:58:21"\nlevel=info ts=2023-06-15T10:15:30.789Z caller=main.go:220 msg="Host details" host_details="Linux 5.15.0-1019-aws #23-Ubuntu x86_64 linux"',
      tool: 'Prometheus'
    },
    { 
      command: 'grafana-server', 
      output: 'INFO[06-15|10:16:00] Starting Grafana                         logger=server version=9.3.2 commit=6bc409be8 branch=HEAD compiled=2023-01-25T10:33:12+00:00\nINFO[06-15|10:16:01] HTTP Server Listen                       logger=http.server address=[::]:3000 protocol=http subUrl= socket=',
      tool: 'Grafana'
    },
    { 
      command: 'aws ec2 describe-instances', 
      output: 'Retrieving EC2 instances...\n{\n    "Reservations": [\n        {\n            "Instances": [\n                {\n                    "InstanceId": "i-0abc123def456",\n                    "InstanceType": "t3.medium",\n                    "State": {\n                        "Name": "running"\n                    }\n                }\n            ]\n        }\n    ]\n}',
      tool: 'AWS'
    },
  ];

  // DevOps tools data with icons and descriptions
  const devopsTools = [
    { 
      name: "Terraform", 
      icon: SiTerraform, 
      color: "#7B42BC",
      description: "Infrastructure as Code",
      category: "IaC",
      url: "https://www.terraform.io/",
      details: "Terraform is an infrastructure as code tool that lets you define both cloud and on-prem resources in human-readable configuration files.",
      commonCommands: [
        "terraform init - Initialize a Terraform working directory",
        "terraform plan - Create an execution plan",
        "terraform apply - Apply changes to reach desired state",
        "terraform destroy - Destroy previously-created infrastructure"
      ]
    },
    { 
      name: "Kubernetes", 
      icon: SiKubernetes, 
      color: "#326CE5",
      description: "Container Orchestration",
      category: "Containers",
      url: "https://kubernetes.io/",
      details: "Kubernetes is an open-source platform for automating deployment, scaling, and management of containerized applications.",
      commonCommands: [
        "kubectl get pods - List all pods",
        "kubectl apply -f file.yaml - Apply a configuration",
        "kubectl logs pod-name - View logs for a pod",
        "kubectl exec -it pod-name -- /bin/bash - Execute a command in a container"
      ]
    },
    { 
      name: "Docker", 
      icon: SiDocker, 
      color: "#2496ED",
      description: "Containerization",
      category: "Containers",
      url: "https://www.docker.com/",
      details: "Docker is a platform for developing, shipping, and running applications in containers, which are lightweight, portable environments.",
      commonCommands: [
        "docker build -t image-name . - Build an image",
        "docker run -d image-name - Run a container in detached mode",
        "docker-compose up -d - Start services defined in docker-compose.yml",
        "docker ps - List running containers"
      ]
    },
    { 
      name: "Ansible", 
      icon: SiAnsible, 
      color: "#EE0000",
      description: "Configuration Management",
      category: "IaC",
      url: "https://www.ansible.com/",
      details: "Ansible is an open-source automation tool that automates software provisioning, configuration management, and application deployment.",
      commonCommands: [
        "ansible-playbook playbook.yml - Run a playbook",
        "ansible host -m ping - Ping a host",
        "ansible-galaxy init role-name - Create a new role",
        "ansible-vault encrypt file.yml - Encrypt sensitive data"
      ]
    },
    { 
      name: "Prometheus", 
      icon: SiPrometheus, 
      color: "#E6522C",
      description: "Monitoring & Alerting",
      category: "Monitoring",
      url: "https://prometheus.io/",
      details: "Prometheus is an open-source monitoring and alerting toolkit designed for reliability and scalability in cloud-native environments.",
      commonCommands: [
        "prometheus --config.file=prometheus.yml - Start Prometheus",
        "promtool check config prometheus.yml - Check configuration",
        "curl http://localhost:9090/metrics - View metrics",
        "promql query - Query time series data"
      ]
    },
    { 
      name: "Grafana", 
      icon: SiGrafana, 
      color: "#F46800",
      description: "Metrics Visualization",
      category: "Monitoring",
      url: "https://grafana.com/",
      details: "Grafana is an open-source platform for monitoring and observability that allows you to query, visualize, and alert on metrics.",
      commonCommands: [
        "grafana-server - Start Grafana server",
        "grafana-cli plugins install plugin-name - Install plugins",
        "curl http://localhost:3000/api/health - Check health",
        "grafana-cli admin reset-admin-password - Reset admin password"
      ]
    },
    { 
      name: "AWS", 
      icon: SiAmazonaws, 
      color: "#FF9900",
      description: "Cloud Platform",
      category: "Cloud",
      url: "https://aws.amazon.com/",
      details: "Amazon Web Services (AWS) is a comprehensive cloud platform offering over 200 fully featured services from data centers globally.",
      commonCommands: [
        "aws ec2 describe-instances - List EC2 instances",
        "aws s3 cp file.txt s3://bucket-name/ - Upload to S3",
        "aws lambda invoke --function-name func output.txt - Invoke Lambda",
        "aws cloudformation deploy --template-file template.yml --stack-name my-stack - Deploy CloudFormation stack"
      ]
    },
    { 
      name: "Jenkins", 
      icon: SiJenkins, 
      color: "#D24939",
      description: "CI/CD Pipeline",
      category: "CI/CD",
      url: "https://www.jenkins.io/",
      details: "Jenkins is an open-source automation server that enables developers to build, test, and deploy their software reliably.",
      commonCommands: [
        "java -jar jenkins.war - Start Jenkins",
        "jenkins-cli create-job jobname < config.xml - Create a job",
        "jenkins-cli build jobname -s - Trigger a build",
        "jenkins-cli reload-configuration - Reload configuration"
      ]
    },
    { 
      name: "GitHub Actions", 
      icon: SiGithubactions, 
      color: "#2088FF",
      description: "CI/CD Automation",
      category: "CI/CD",
      url: "https://github.com/features/actions",
      details: "GitHub Actions is a CI/CD platform that automates build, test, and deployment workflows right in your GitHub repository.",
      commonCommands: [
        "Configuration via .github/workflows/workflow.yml",
        "git push - Trigger workflow",
        "gh workflow run workflow.yml - Manually run workflow",
        "gh run list - List recent workflow runs"
      ]
    },
    { 
      name: "ArgoCD", 
      icon: SiArgo, 
      color: "#EF7B4D",
      description: "GitOps CD",
      category: "CI/CD",
      url: "https://argoproj.github.io/argo-cd/",
      details: "Argo CD is a declarative, GitOps continuous delivery tool for Kubernetes that automates the deployment of applications.",
      commonCommands: [
        "argocd login server - Log in to Argo CD server",
        "argocd app create - Create a new application",
        "argocd app sync app-name - Sync an application",
        "argocd app list - List applications"
      ]
    },
    { 
      name: "Helm", 
      icon: SiHelm, 
      color: "#0F1689",
      description: "Kubernetes Package Manager",
      category: "Containers",
      url: "https://helm.sh/",
      details: "Helm is a package manager for Kubernetes that helps you define, install, and upgrade complex Kubernetes applications.",
      commonCommands: [
        "helm install release-name chart-name - Install a chart",
        "helm upgrade release-name chart-name - Upgrade a release",
        "helm list - List releases",
        "helm create chart-name - Create a new chart"
      ]
    },
    { 
      name: "ELK Stack", 
      icon: SiElasticsearch, 
      color: "#005571",
      description: "Logging & Analysis",
      category: "Monitoring",
      url: "https://www.elastic.co/elastic-stack/",
      details: "The ELK Stack (Elasticsearch, Logstash, Kibana) is a set of tools for searching, analyzing, and visualizing log data in real time.",
      commonCommands: [
        "elasticsearch - Start Elasticsearch",
        "logstash -f config-file.conf - Start Logstash with config",
        "kibana - Start Kibana",
        "filebeat -e -c filebeat.yml - Start Filebeat"
      ]
    }
  ];

  // Group tools by category
  const toolsByCategory = devopsTools.reduce((acc, tool) => {
    if (!acc[tool.category]) {
      acc[tool.category] = [];
    }
    acc[tool.category].push(tool);
    return acc;
  }, {});

  // Handle click on tool
  const handleToolClick = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Set selected tool based on current command
  useEffect(() => {
    if (currentLine < devopsCommands.length) {
      const toolName = devopsCommands[currentLine].tool;
      const tool = devopsTools.find(t => t.name === toolName);
      if (tool) {
        setSelectedTool(tool);
      }
    } else if (currentLine >= devopsCommands.length && commands.length > 0) {
      // When all commands are finished, keep showing the last tool
      const lastToolName = devopsCommands[devopsCommands.length - 1].tool;
      const lastTool = devopsTools.find(t => t.name === lastToolName);
      if (lastTool) {
        setSelectedTool(lastTool);
      }
    } else {
      // Default to showing Terraform if no commands have run yet
      const defaultTool = devopsTools.find(t => t.name === "Terraform");
      if (defaultTool) {
        setSelectedTool(defaultTool);
      }
    }
  }, [currentLine, commands]);

  // Simulate typing effect
  useEffect(() => {
    if (currentLine < devopsCommands.length) {
      const command = devopsCommands[currentLine].command;
      let index = 0;
      
      setIsTyping(true);
      const typingInterval = setInterval(() => {
        if (index <= command.length) {
          setCurrentCommand(command.substring(0, index));
          index++;
        } else {
          clearInterval(typingInterval);
          setTimeout(() => {
            setCommands([...commands, {
              command: command,
              output: devopsCommands[currentLine].output
            }]);
            setCurrentCommand('');
            setIsTyping(false);
            
            // Move to next command after a delay
            setTimeout(() => {
              setCurrentLine(currentLine + 1);
            }, 1000);
          }, 500);
        }
      }, 100);
      
      return () => clearInterval(typingInterval);
    }
  }, [currentLine, commands]);

  // Auto-scroll to bottom of terminal
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [commands, currentCommand]);

  return (
    <section id="terminal" className="py-20 bg-gray-100 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            DevOps in Action
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Watch as I demonstrate my DevOps skills through common command-line operations
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-6xl mx-auto"
        >
          {/* Terminal and Info Panel Container */}
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Terminal Window */}
            <div className="lg:w-3/5 bg-gray-900 rounded-lg overflow-hidden shadow-2xl border border-gray-700">
              {/* Terminal Header */}
              <div className="bg-gray-800 px-4 py-2 flex items-center justify-between">
                <div className="flex items-center">
                  <FiTerminal className="text-gray-400 mr-2" />
                  <span className="text-gray-300 text-sm font-medium">harsha@devops-terminal</span>
                </div>
                <div className="flex space-x-2">
                  <button className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors">
                    <FiMinus className="w-full h-full opacity-0 hover:opacity-100 text-gray-900" />
                  </button>
                  <button className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 transition-colors">
                    <FiMaximize2 className="w-full h-full opacity-0 hover:opacity-100 text-gray-900" />
                  </button>
                  <button className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors">
                    <FiX className="w-full h-full opacity-0 hover:opacity-100 text-gray-900" />
                  </button>
                </div>
              </div>
              
              {/* Terminal Content */}
              <div 
                ref={terminalRef}
                className="bg-gray-900 p-4 font-mono text-sm text-gray-200 h-96 overflow-y-auto"
              >
                {/* Welcome Message */}
                <div className="mb-4">
                  <p className="text-green-400">Welcome to Harsha's DevOps Terminal!</p>
                  <p className="text-gray-400 mt-1">Demonstrating infrastructure as code, containerization, orchestration, and monitoring.</p>
                  <div className="border-b border-gray-700 my-2"></div>
                </div>
                
                {/* Previous Commands */}
                {commands.map((item, index) => (
                  <div key={index} className="mb-4">
                    <div className="flex">
                      <span className="text-green-400 mr-2">harsha@devops:~$</span>
                      <span>{item.command}</span>
                    </div>
                    <pre className="mt-1 text-gray-300 whitespace-pre-wrap">{item.output}</pre>
                  </div>
                ))}
                
                {/* Current Command */}
                {currentLine < devopsCommands.length && (
                  <div className="flex">
                    <span className="text-green-400 mr-2">harsha@devops:~$</span>
                    <span>{currentCommand}</span>
                    {isTyping && <span className="animate-pulse">▌</span>}
                  </div>
                )}
                
                {/* Terminal Completed Message */}
                {currentLine >= devopsCommands.length && (
                  <div className="mt-4 text-green-400">
                    <p>DevOps demonstration completed. These are just a few of the tools I work with daily.</p>
                    <p className="mt-2">Want to see more? Contact me or check out my GitHub repositories!</p>
                  </div>
                )}
              </div>
            </div>

            {/* Tool Info Panel */}
            <motion.div 
              className="lg:w-2/5 bg-white dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden border border-gray-200 dark:border-gray-600"
              initial={{ opacity: 0, x: 20 }}
              animate={{ 
                opacity: 1,
                x: 0
              }}
              transition={{ duration: 0.3 }}
            >
              {/* Info Panel Header */}
              <div className="bg-gray-100 dark:bg-gray-800 px-4 py-3 border-b border-gray-200 dark:border-gray-600 flex items-center justify-between">
                <div className="flex items-center">
                  <FiInfo className="text-blue-500 mr-2" />
                  <h3 className="font-medium text-gray-800 dark:text-gray-200">
                    {selectedTool ? `${selectedTool.name} Info` : 'DevOps Tool Info'}
                  </h3>
                </div>
                {currentLine >= devopsCommands.length && (
                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                    <span className="bg-green-100 dark:bg-green-800/30 text-green-800 dark:text-green-300 px-2 py-0.5 rounded-full">Demo Completed</span>
                  </div>
                )}
              </div>

              {/* Info Panel Content */}
              <div className="p-4 h-[calc(24rem-2.75rem)] overflow-y-auto">
                {selectedTool ? (
                  <div className="space-y-4">
                    {/* Tool Header */}
                    <div className="flex items-center">
                      <div 
                        className="w-12 h-12 rounded-lg flex items-center justify-center mr-3"
                        style={{
                          backgroundColor: `rgba(${parseInt(selectedTool.color.slice(1, 3), 16)}, ${parseInt(selectedTool.color.slice(3, 5), 16)}, ${parseInt(selectedTool.color.slice(5, 7), 16)}, 0.2)`
                        }}
                      >
                        <selectedTool.icon 
                          size={28} 
                          style={{ color: selectedTool.color }} 
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 dark:text-gray-200 text-lg">{selectedTool.name}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{selectedTool.description}</p>
                      </div>
                    </div>

                    {/* Tool Description */}
                    <div>
                      <h5 className="font-medium text-gray-700 dark:text-gray-300 flex items-center mb-2">
                        <FiInfo className="mr-2" /> About
                      </h5>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {selectedTool.details}
                      </p>
                    </div>

                    {/* Common Commands */}
                    <div>
                      <h5 className="font-medium text-gray-700 dark:text-gray-300 flex items-center mb-2">
                        <FiCommand className="mr-2" /> Common Commands
                      </h5>
                      <ul className="space-y-1 text-sm">
                        {selectedTool.commonCommands.map((cmd, index) => (
                          <li key={index} className="text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 px-3 py-1 rounded font-mono">
                            {cmd}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Current Command */}
                    {currentLine < devopsCommands.length && devopsCommands[currentLine].tool === selectedTool.name && (
                      <div className="mt-4 border-t border-gray-200 dark:border-gray-600 pt-4">
                        <h5 className="font-medium text-gray-700 dark:text-gray-300 flex items-center mb-2">
                          <FiCode className="mr-2" /> Current Command
                        </h5>
                        <div className="bg-gray-800 text-green-400 p-2 rounded font-mono text-sm">
                          {devopsCommands[currentLine].command}
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                          This command is currently being executed in the terminal.
                        </p>
                      </div>
                    )}
                    
                    {/* Tool Selection - Show when demo is complete */}
                    {currentLine >= devopsCommands.length && (
                      <div className="mt-4 border-t border-gray-200 dark:border-gray-600 pt-4">
                        <h5 className="font-medium text-gray-700 dark:text-gray-300 flex items-center mb-2">
                          <FiCommand className="mr-2" /> Explore DevOps Tools
                        </h5>
                        
                        {/* Tool Categories */}
                        <div className="mb-3 flex flex-wrap gap-1">
                          {Object.keys(toolsByCategory).map((category) => (
                            <button
                              key={category}
                              onClick={() => {
                                // Select the first tool from this category
                                if (toolsByCategory[category].length > 0) {
                                  setSelectedTool(toolsByCategory[category][0]);
                                }
                              }}
                              className={`px-2 py-1 text-xs rounded-md transition-colors ${
                                selectedTool && toolsByCategory[category].some(t => t.name === selectedTool.name)
                                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' 
                                  : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                              }`}
                            >
                              {category === "IaC" ? "Infrastructure as Code" : 
                               category === "CI/CD" ? "CI/CD" : category}
                            </button>
                          ))}
                        </div>
                        
                        {/* Tool Grid */}
                        <div className="grid grid-cols-3 gap-2">
                          {selectedTool && toolsByCategory[selectedTool.category].map((tool) => (
                            <button
                              key={tool.name}
                              onClick={() => setSelectedTool(tool)}
                              className={`p-2 rounded-md transition-colors flex flex-col items-center ${
                                selectedTool.name === tool.name 
                                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800' 
                                  : 'hover:bg-gray-100 dark:hover:bg-gray-600/30'
                              }`}
                            >
                              <tool.icon 
                                size={20} 
                                style={{ color: tool.color }} 
                              />
                              <span className="text-xs mt-1 text-center text-gray-700 dark:text-gray-300">{tool.name}</span>
                            </button>
                          ))}
                        </div>
                        
                        {/* Visit Website Button */}
                        <div className="mt-3 flex justify-center">
                          <button
                            onClick={() => handleToolClick(selectedTool.url)}
                            className="text-xs flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                          >
                            <span>Visit {selectedTool.name} Website</span>
                            <FiExternalLink size={12} />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center">
                    <p className="text-gray-500 dark:text-gray-400 text-center">
                      <span className="block text-4xl mb-3">👨‍💻</span>
                      Loading tool information...
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
          
          {/* DevOps Tools List - Categorized */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-12"
          >
            <motion.h3 
              className="text-xl font-semibold text-center text-gray-800 dark:text-gray-200 mb-2"
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              My DevOps Toolkit
            </motion.h3>
            
            <motion.div
              className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mx-auto mb-8"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            />
            
            <div className="space-y-8">
              {Object.entries(toolsByCategory).map(([category, tools], categoryIndex) => (
                <motion.div 
                  key={category}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.6, 
                    delay: 0.1 * categoryIndex,
                    ease: "easeOut"
                  }}
                  className="bg-white dark:bg-gray-700 rounded-xl p-4 shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100 dark:border-gray-600"
                >
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 + (0.1 * categoryIndex) }}
                  >
                    <h4 className="text-lg font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 mb-4 border-b border-gray-200 dark:border-gray-600 pb-2 flex items-center">
                      {category === "IaC" ? (
                        <>
                          <motion.span 
                            initial={{ scale: 0.8, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: 0.3 + (0.1 * categoryIndex) }}
                            className="inline-block mr-2 text-blue-500 dark:text-blue-400"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm11 1H6v8l4-2 4 2V6z" clipRule="evenodd" />
                            </svg>
                          </motion.span>
                          Infrastructure as Code
                        </>
                      ) : category === "CI/CD" ? (
                        <>
                          <motion.span 
                            initial={{ scale: 0.8, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: 0.3 + (0.1 * categoryIndex) }}
                            className="inline-block mr-2 text-purple-500 dark:text-purple-400"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                            </svg>
                          </motion.span>
                          CI/CD Pipelines
                        </>
                      ) : category === "Containers" ? (
                        <>
                          <motion.span 
                            initial={{ scale: 0.8, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: 0.3 + (0.1 * categoryIndex) }}
                            className="inline-block mr-2 text-blue-500 dark:text-blue-400"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                            </svg>
                          </motion.span>
                          {category}
                        </>
                      ) : category === "Monitoring" ? (
                        <>
                          <motion.span 
                            initial={{ scale: 0.8, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: 0.3 + (0.1 * categoryIndex) }}
                            className="inline-block mr-2 text-green-500 dark:text-green-400"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          </motion.span>
                          {category}
                        </>
                      ) : category === "Cloud" ? (
                        <>
                          <motion.span 
                            initial={{ scale: 0.8, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: 0.3 + (0.1 * categoryIndex) }}
                            className="inline-block mr-2 text-blue-500 dark:text-blue-400"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z" />
                            </svg>
                          </motion.span>
                          {category} Platforms
                        </>
                      ) : (
                        category
                      )}
                    </h4>
                  </motion.div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {tools.map((tool, index) => (
                      <motion.div
                        key={tool.name}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ 
                          duration: 0.4, 
                          delay: 0.3 + (0.1 * categoryIndex) + (0.05 * index),
                          ease: "easeOut"
                        }}
                        whileHover={{ 
                          scale: 1.05,
                          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                        }}
                        whileTap={{ scale: 0.95 }}
                        onHoverStart={() => setHoveredTool(tool.name)}
                        onHoverEnd={() => setHoveredTool(null)}
                        onClick={() => {
                          setClickedTool(tool.name);
                          handleToolClick(tool.url);
                          setTimeout(() => setClickedTool(null), 500);
                        }}
                        className="flex items-center p-3 rounded-lg cursor-pointer transition-all duration-300 relative group bg-gray-50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-700/50"
                        role="button"
                        aria-label={`Learn more about ${tool.name}`}
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            handleToolClick(tool.url);
                          }
                        }}
                        style={{
                          border: `1px solid ${hoveredTool === tool.name ? tool.color : 'transparent'}`
                        }}
                      >
                        <motion.div 
                          className="w-10 h-10 rounded-lg flex items-center justify-center mr-3 relative overflow-hidden"
                          style={{
                            backgroundColor: `rgba(${parseInt(tool.color.slice(1, 3), 16)}, ${parseInt(tool.color.slice(3, 5), 16)}, ${parseInt(tool.color.slice(5, 7), 16)}, 0.2)`
                          }}
                          whileHover={{
                            backgroundColor: `rgba(${parseInt(tool.color.slice(1, 3), 16)}, ${parseInt(tool.color.slice(3, 5), 16)}, ${parseInt(tool.color.slice(5, 7), 16)}, 0.3)`
                          }}
                          animate={{
                            rotate: clickedTool === tool.name ? [0, -10, 10, -5, 5, 0] : 0
                          }}
                          transition={{
                            duration: 0.5,
                            ease: "easeInOut"
                          }}
                        >
                          <motion.div
                            animate={{ 
                              scale: hoveredTool === tool.name ? 1.2 : 1,
                              rotate: hoveredTool === tool.name ? [0, -5, 5, 0] : 0
                            }}
                            transition={{ 
                              duration: 0.3,
                              ease: "easeInOut",
                              rotate: {
                                repeat: hoveredTool === tool.name ? Infinity : 0,
                                repeatType: "mirror",
                                duration: 1
                              }
                            }}
                          >
                            <tool.icon 
                              size={24} 
                              style={{ 
                                color: tool.color,
                                filter: hoveredTool === tool.name ? `drop-shadow(0 0 3px ${tool.color})` : 'none'
                              }} 
                            />
                          </motion.div>
                        </motion.div>
                        <div>
                          <motion.div 
                            className="font-medium text-gray-800 dark:text-gray-200 flex items-center"
                            animate={{
                              color: hoveredTool === tool.name ? tool.color : ""
                            }}
                            transition={{ duration: 0.3 }}
                          >
                            {tool.name}
                          </motion.div>
                          <motion.div 
                            className="text-xs text-gray-500 dark:text-gray-400"
                            animate={{
                              opacity: hoveredTool === tool.name ? 1 : 0.8
                            }}
                            transition={{ duration: 0.3 }}
                          >
                            {tool.description}
                          </motion.div>
                        </div>
                        
                        {/* Animated arrow indicator on hover */}
                        <motion.div
                          className="absolute right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ 
                            scale: hoveredTool === tool.name ? 1 : 0,
                            opacity: hoveredTool === tool.name ? 1 : 0,
                            x: hoveredTool === tool.name ? [0, 5, 0] : 0
                          }}
                          transition={{ 
                            duration: 0.3,
                            x: {
                              repeat: hoveredTool === tool.name ? Infinity : 0,
                              repeatType: "mirror",
                              duration: 0.8
                            }
                          }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill={tool.color}>
                            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </motion.div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Terminal; 