import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

// Define cloud provider and DevOps icons
const cloudIcons = {
    // Cloud Providers
    GoogleCloud: dynamic(() => import('react-icons/si').then(mod => mod.SiGooglecloud), { ssr: false }),
    Azure: dynamic(() => import('react-icons/si').then(mod => mod.SiMicrosoftazure), { ssr: false }),
    HuaweiCloud: dynamic(() => import('react-icons/si').then(mod => mod.SiHuawei), { ssr: false }),
    AWS: dynamic(() => import('react-icons/si').then(mod => mod.SiAmazonaws), { ssr: false }),
    DigitalOcean: dynamic(() => import('react-icons/si').then(mod => mod.SiDigitalocean), { ssr: false }),
    Alibaba: dynamic(() => import('react-icons/si').then(mod => mod.SiAlibabacloud), { ssr: false }),
    OracleCloud: dynamic(() => import('react-icons/si').then(mod => mod.SiOracle), { ssr: false }),
    IBMCloud: dynamic(() => import('react-icons/si').then(mod => mod.SiIbmcloud), { ssr: false }),
    Linode: dynamic(() => import('react-icons/si').then(mod => mod.SiLinode), { ssr: false }),

    // Container & Orchestration
    Docker: dynamic(() => import('react-icons/si').then(mod => mod.SiDocker), { ssr: false }),
    Kubernetes: dynamic(() => import('react-icons/si').then(mod => mod.SiKubernetes), { ssr: false }),
    Helm: dynamic(() => import('react-icons/si').then(mod => mod.SiHelm), { ssr: false }),

    // IaC & Configuration
    Terraform: dynamic(() => import('react-icons/si').then(mod => mod.SiTerraform), { ssr: false }),
    Ansible: dynamic(() => import('react-icons/si').then(mod => mod.SiAnsible), { ssr: false }),
    Pulumi: dynamic(() => import('react-icons/si').then(mod => mod.SiPulumi), { ssr: false }),

    // CI/CD
    Jenkins: dynamic(() => import('react-icons/si').then(mod => mod.SiJenkins), { ssr: false }),
    GitHubActions: dynamic(() => import('react-icons/si').then(mod => mod.SiGithubactions), { ssr: false }),
    GitLab: dynamic(() => import('react-icons/si').then(mod => mod.SiGitlab), { ssr: false }),
    CircleCI: dynamic(() => import('react-icons/si').then(mod => mod.SiCircleci), { ssr: false }),
    ArgoCD: dynamic(() => import('react-icons/si').then(mod => mod.SiArgo), { ssr: false }),
    Travis: dynamic(() => import('react-icons/si').then(mod => mod.SiTravisci), { ssr: false }),

    // Monitoring & Observability
    Prometheus: dynamic(() => import('react-icons/si').then(mod => mod.SiPrometheus), { ssr: false }),
    Grafana: dynamic(() => import('react-icons/si').then(mod => mod.SiGrafana), { ssr: false }),
    Datadog: dynamic(() => import('react-icons/si').then(mod => mod.SiDatadog), { ssr: false }),
    NewRelic: dynamic(() => import('react-icons/si').then(mod => mod.SiNewrelic), { ssr: false }),

    // Security & Secrets Management
    Vault: dynamic(() => import('react-icons/si').then(mod => mod.SiVault), { ssr: false }),
    AWSSecretsManager: dynamic(() => import('react-icons/si').then(mod => mod.SiAmazonaws), { ssr: false }),

    // Service Mesh
    Istio: dynamic(() => import('react-icons/si').then(mod => mod.SiIstio), { ssr: false }),
    Linkerd: dynamic(() => import('react-icons/si').then(mod => mod.SiLinux), { ssr: false }),
    Consul: dynamic(() => import('react-icons/si').then(mod => mod.SiConsul), { ssr: false }),

    // Log Management & Observability
    Elastic: dynamic(() => import('react-icons/si').then(mod => mod.SiElasticsearch), { ssr: false }),
    Logstash: dynamic(() => import('react-icons/si').then(mod => mod.SiLogstash), { ssr: false }),
    Kibana: dynamic(() => import('react-icons/si').then(mod => mod.SiKibana), { ssr: false }),
    Splunk: dynamic(() => import('react-icons/si').then(mod => mod.SiSplunk), { ssr: false }),
    Fluentd: dynamic(() => import('react-icons/si').then(mod => mod.SiFluentd), { ssr: false }),

    // Version Control & Collaboration
    Git: dynamic(() => import('react-icons/si').then(mod => mod.SiGit), { ssr: false }),
    GitHub: dynamic(() => import('react-icons/si').then(mod => mod.SiGithub), { ssr: false }),
    Bitbucket: dynamic(() => import('react-icons/si').then(mod => mod.SiBitbucket), { ssr: false }),

    // Serverless
    Lambda: dynamic(() => import('react-icons/si').then(mod => mod.SiAwslambda), { ssr: false }),
    CloudFunctions: dynamic(() => import('react-icons/si').then(mod => mod.SiGooglecloud), { ssr: false }),
    AzureFunctions: dynamic(() => import('react-icons/si').then(mod => mod.SiMicrosoftazure), { ssr: false }),
    Serverless: dynamic(() => import('react-icons/si').then(mod => mod.SiServerless), { ssr: false }),
};

const devOpsData = [
    {
        category: "Cloud Platforms",
        technologies: [
            { name: "Google Cloud", iconKey: "GoogleCloud", color: "#4285F4", url: "https://cloud.google.com/" },
            { name: "Microsoft Azure", iconKey: "Azure", color: "#0078D4", url: "https://azure.microsoft.com/" },
            { name: "Huawei Cloud", iconKey: "HuaweiCloud", color: "#FF0000", url: "https://www.huaweicloud.com/" },
            { name: "AWS", iconKey: "AWS", color: "#FF9900", url: "https://aws.amazon.com/" },
            { name: "DigitalOcean", iconKey: "DigitalOcean", color: "#0080FF", url: "https://www.digitalocean.com/" },
            { name: "Alibaba Cloud", iconKey: "Alibaba", color: "#FF6A00", url: "https://www.alibabacloud.com/" },
            { name: "Oracle Cloud", iconKey: "OracleCloud", color: "#F80000", url: "https://www.oracle.com/cloud/" },
            { name: "IBM Cloud", iconKey: "IBMCloud", color: "#0F62FE", url: "https://www.ibm.com/cloud" },
            { name: "Linode", iconKey: "Linode", color: "#00A95C", url: "https://www.linode.com/" }
        ]
    },
    {
        category: "Container & Orchestration",
        technologies: [
            { name: "Docker", iconKey: "Docker", color: "#2496ED", url: "https://www.docker.com/" },
            { name: "Kubernetes", iconKey: "Kubernetes", color: "#326CE5", url: "https://kubernetes.io/" },
            { name: "Helm", iconKey: "Helm", color: "#0F1689", url: "https://helm.sh/" }
        ]
    },
    {
        category: "Infrastructure as Code",
        technologies: [
            { name: "Terraform", iconKey: "Terraform", color: "#7B42BC", url: "https://www.terraform.io/" },
            { name: "Ansible", iconKey: "Ansible", color: "#EE0000", url: "https://www.ansible.com/" },
            { name: "Pulumi", iconKey: "Pulumi", color: "#8A3391", url: "https://www.pulumi.com/" }
        ]
    },
    {
        category: "CI/CD Pipeline",
        technologies: [
            { name: "Jenkins", iconKey: "Jenkins", color: "#D24939", url: "https://www.jenkins.io/" },
            { name: "GitHub Actions", iconKey: "GitHubActions", color: "#2088FF", url: "https://github.com/features/actions" },
            { name: "GitLab CI", iconKey: "GitLab", color: "#FCA121", url: "https://about.gitlab.com/" },
            { name: "CircleCI", iconKey: "CircleCI", color: "#343434", url: "https://circleci.com/" },
            { name: "ArgoCD", iconKey: "ArgoCD", color: "#EF7B4D", url: "https://argoproj.github.io/argo-cd/" },
            { name: "Travis CI", iconKey: "Travis", color: "#3EAAAF", url: "https://travis-ci.org/" }
        ]
    },
    {
        category: "Monitoring & Observability",
        technologies: [
            { name: "Prometheus", iconKey: "Prometheus", color: "#E6522C", url: "https://prometheus.io/" },
            { name: "Grafana", iconKey: "Grafana", color: "#F46800", url: "https://grafana.com/" },
            { name: "Datadog", iconKey: "Datadog", color: "#632CA6", url: "https://www.datadoghq.com/" },
            { name: "New Relic", iconKey: "NewRelic", color: "#008C99", url: "https://newrelic.com/" }
        ]
    },
    {
        category: "Security & Secrets Management",
        technologies: [
            { name: "HashiCorp Vault", iconKey: "Vault", color: "#FFEC6E", url: "https://www.vaultproject.io/" },
            { name: "AWS Secrets Manager", iconKey: "AWSSecretsManager", color: "#DD344C", url: "https://aws.amazon.com/secrets-manager/" }
        ]
    },
    {
        category: "Service Mesh",
        technologies: [
            { name: "Istio", iconKey: "Istio", color: "#466BB0", url: "https://istio.io/" },
            { name: "Linkerd", iconKey: "Linkerd", color: "#2DCEAA", url: "https://linkerd.io/" },
            { name: "Consul", iconKey: "Consul", color: "#DC477D", url: "https://www.consul.io/" }
        ]
    },
    {
        category: "Log Management & Analysis",
        technologies: [
            { name: "Elasticsearch", iconKey: "Elastic", color: "#005571", url: "https://www.elastic.co/elasticsearch/" },
            { name: "Logstash", iconKey: "Logstash", color: "#FEC514", url: "https://www.elastic.co/logstash/" },
            { name: "Kibana", iconKey: "Kibana", color: "#E8478B", url: "https://www.elastic.co/kibana/" },
            { name: "Splunk", iconKey: "Splunk", color: "#000000", url: "https://www.splunk.com/" },
            { name: "Fluentd", iconKey: "Fluentd", color: "#0E83C8", url: "https://www.fluentd.org/" }
        ]
    },
    {
        category: "Version Control & Collaboration",
        technologies: [
            { name: "Git", iconKey: "Git", color: "#F05032", url: "https://git-scm.com/" },
            { name: "GitHub", iconKey: "GitHub", color: "#181717", url: "https://github.com/" },
            { name: "Bitbucket", iconKey: "Bitbucket", color: "#0052CC", url: "https://bitbucket.org/" }
        ]
    },
    {
        category: "Serverless Computing",
        technologies: [
            { name: "AWS Lambda", iconKey: "Lambda", color: "#FF9900", url: "https://aws.amazon.com/lambda/" },
            { name: "Google Cloud Functions", iconKey: "CloudFunctions", color: "#4285F4", url: "https://cloud.google.com/functions" },
            { name: "Azure Functions", iconKey: "AzureFunctions", color: "#0078D4", url: "https://azure.microsoft.com/en-us/services/functions/" },
            { name: "Serverless Framework", iconKey: "Serverless", color: "#FD5750", url: "https://www.serverless.com/" }
        ]
    }
];

const DevOps = () => {
    const [mounted, setMounted] = useState(false);
    const [hoveredTech, setHoveredTech] = useState(null);
    const [clickedTech, setClickedTech] = useState(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Handle click on tech icon
    const handleTechClick = (url) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08,
                delayChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 30, scale: 0.8 },
        show: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 10
            }
        }
    };

    const categoryVariants = {
        hidden: { opacity: 0, y: 50, rotateX: -15 },
        show: {
            opacity: 1,
            y: 0,
            rotateX: 0,
            transition: {
                duration: 0.7,
                ease: "easeOut"
            }
        }
    };

    // Don't render until client-side
    if (!mounted) {
        return (
            <section id="devops" className="relative py-20 bg-gray-900 dark:bg-black overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-4">DevOps & Cloud</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            Loading...
                        </p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="devops" className="relative py-20 bg-gray-900 dark:bg-black overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Gradient Orbs */}
                <motion.div
                    className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                        x: [0, 50, 0],
                        y: [0, 30, 0]
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.2, 0.4, 0.2],
                        x: [0, -50, 0],
                        y: [0, -30, 0]
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.2, 0.3, 0.2],
                        rotate: [0, 180, 360]
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />

                {/* Grid Pattern */}
                <div className="absolute inset-0 bg-grid-pattern opacity-5"
                    style={{
                        backgroundImage: `linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)`,
                        backgroundSize: '50px 50px'
                    }}
                />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-center mb-16"
                >
                    <motion.h2
                        className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400 mb-4"
                        animate={{
                            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                        }}
                        transition={{
                            duration: 5,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        style={{
                            backgroundSize: '200% auto'
                        }}
                    >
                        DevOps & Cloud
                    </motion.h2>
                    <motion.p
                        className="text-gray-400 max-w-2xl mx-auto text-lg"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        Expertise in cloud platforms and DevOps tools for building scalable,
                        reliable infrastructure and streamlined deployment pipelines.
                    </motion.p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
                    {devOpsData.map((category, categoryIndex) => (
                        <motion.div
                            key={category.category}
                            variants={categoryVariants}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                            className="relative group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100" />

                            <div className="relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-gray-700/50 hover:border-purple-500/50 transition-all duration-500">
                                <motion.h3
                                    className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-8"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {category.category}
                                </motion.h3>

                                <motion.div
                                    className="grid grid-cols-3 gap-6"
                                    variants={container}
                                    initial="hidden"
                                    whileInView="show"
                                    viewport={{ once: true }}
                                >
                                    {category.technologies.map((tech) => {
                                        const IconComponent = cloudIcons[tech.iconKey];
                                        const isHovered = hoveredTech === tech.name;
                                        const isClicked = clickedTech === tech.name;

                                        return (
                                            <motion.div
                                                key={tech.name}
                                                variants={item}
                                                whileHover={{
                                                    scale: 1.15,
                                                    y: -8,
                                                    transition: { duration: 0.2 }
                                                }}
                                                whileTap={{ scale: 0.95 }}
                                                onHoverStart={() => setHoveredTech(tech.name)}
                                                onHoverEnd={() => setHoveredTech(null)}
                                                onClick={() => {
                                                    setClickedTech(tech.name);
                                                    handleTechClick(tech.url);
                                                    setTimeout(() => setClickedTech(null), 500);
                                                }}
                                                className="flex flex-col items-center gap-3 cursor-pointer group/item"
                                                role="button"
                                                aria-label={`Learn more about ${tech.name}`}
                                                tabIndex={0}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter' || e.key === ' ') {
                                                        handleTechClick(tech.url);
                                                    }
                                                }}
                                            >
                                                <motion.div
                                                    className="relative w-20 h-20 rounded-2xl bg-gray-800/80 flex items-center justify-center shadow-lg overflow-hidden"
                                                    animate={{
                                                        backgroundColor: isHovered ? 'rgba(30, 30, 40, 0.95)' : 'rgba(30, 30, 40, 0.6)',
                                                        boxShadow: isHovered
                                                            ? `0 20px 40px -12px ${tech.color}40, 0 0 20px ${tech.color}30`
                                                            : '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                                                        scale: isClicked ? 0.9 : 1
                                                    }}
                                                    transition={{ duration: 0.3 }}
                                                    style={{
                                                        border: '2px solid',
                                                        borderColor: isHovered ? tech.color : 'rgba(75, 75, 90, 0.3)'
                                                    }}
                                                >
                                                    {/* Glow effect on hover */}
                                                    {isHovered && (
                                                        <motion.div
                                                            className="absolute inset-0 rounded-2xl"
                                                            style={{
                                                                background: `radial-gradient(circle at center, ${tech.color}30, transparent 70%)`
                                                            }}
                                                            initial={{ opacity: 0 }}
                                                            animate={{ opacity: 1 }}
                                                            transition={{ duration: 0.3 }}
                                                        />
                                                    )}

                                                    {IconComponent && (
                                                        <motion.div
                                                            className="relative z-10"
                                                            animate={{
                                                                scale: isHovered ? 1.3 : 1,
                                                                rotate: isHovered ? [0, -5, 5, 0] : 0
                                                            }}
                                                            transition={{
                                                                duration: 0.3,
                                                                rotate: {
                                                                    duration: 0.5,
                                                                    ease: "easeInOut"
                                                                }
                                                            }}
                                                        >
                                                            <IconComponent
                                                                className="w-10 h-10"
                                                                style={{
                                                                    color: isHovered ? tech.color : 'rgba(255, 255, 255, 0.7)',
                                                                    filter: isHovered ? `drop-shadow(0 0 12px ${tech.color})` : 'none'
                                                                }}
                                                            />
                                                        </motion.div>
                                                    )}
                                                </motion.div>

                                                <motion.span
                                                    className="text-gray-300 font-medium text-center text-xs leading-tight max-w-[80px]"
                                                    animate={{
                                                        color: isHovered ? tech.color : '#d1d5db',
                                                        scale: isHovered ? 1.05 : 1
                                                    }}
                                                    transition={{ duration: 0.2 }}
                                                >
                                                    {tech.name}
                                                </motion.span>
                                            </motion.div>
                                        );
                                    })}
                                </motion.div>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default DevOps;
