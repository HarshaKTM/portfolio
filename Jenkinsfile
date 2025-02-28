pipeline {
    agent any
    
    environment {
        DOCKER_IMAGE = 'your-docker-username/portfolio'
        DOCKER_TAG = "${env.BUILD_NUMBER}"
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        
        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }
        
        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("${DOCKER_IMAGE}:${DOCKER_TAG}")
                }
            }
        }
        
        stage('Push Docker Image') {
            steps {
                script {
                    docker.withRegistry('https://registry.hub.docker.com', 'docker-hub-credentials') {
                        docker.image("${DOCKER_IMAGE}:${DOCKER_TAG}").push()
                        docker.image("${DOCKER_IMAGE}:${DOCKER_TAG}").push('latest')
                    }
                }
            }
        }
        
        stage('Deploy to Development') {
            when {
                branch 'develop'
            }
            steps {
                script {
                    // Deploy to development environment
                    sh """
                        ssh user@dev-server 'docker pull ${DOCKER_IMAGE}:${DOCKER_TAG} && \
                        docker stop portfolio || true && \
                        docker rm portfolio || true && \
                        docker run -d --name portfolio -p 3000:3000 ${DOCKER_IMAGE}:${DOCKER_TAG}'
                    """
                }
            }
        }
        
        stage('Deploy to Production') {
            when {
                branch 'main'
            }
            steps {
                script {
                    // Deploy to production environment
                    sh """
                        ssh user@prod-server 'docker pull ${DOCKER_IMAGE}:${DOCKER_TAG} && \
                        docker stop portfolio || true && \
                        docker rm portfolio || true && \
                        docker run -d --name portfolio -p 3000:3000 ${DOCKER_IMAGE}:${DOCKER_TAG}'
                    """
                }
            }
        }
    }
    
    post {
        success {
            slackSend(
                color: 'good',
                message: "Build Successful: ${env.JOB_NAME} #${env.BUILD_NUMBER}"
            )
        }
        failure {
            slackSend(
                color: 'danger',
                message: "Build Failed: ${env.JOB_NAME} #${env.BUILD_NUMBER}"
            )
        }
    }
} 