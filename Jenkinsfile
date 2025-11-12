pipeline {
    agent any

    environment {
        IMAGE_NAME = "nextjs-app"
        CONTAINER_NAME = "nextjs-container"
        DATABASE_URL = credentials('DATABASE_URL') // Jenkins Credential
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Tuankiet0903/next_app.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh """
                        docker build \
                        --build-arg DATABASE_URL=${DATABASE_URL} \
                        -t ${IMAGE_NAME}:latest .
                    """
                }
            }
        }

        stage('Stop Old Container') {
            steps {
                script {
                    sh """
                        if [ \$(docker ps -q -f name=${CONTAINER_NAME}) ]; then
                            docker stop ${CONTAINER_NAME}
                            docker rm ${CONTAINER_NAME}
                        fi
                    """
                }
            }
        }

        stage('Run New Container') {
            steps {
                script {
                    sh """
                        docker run -d \
                        --name ${CONTAINER_NAME} \
                        -p 3000:3000 \
                        -e DATABASE_URL=${DATABASE_URL} \
                        ${IMAGE_NAME}:latest
                    """
                }
            }
        }
    }

    post {
        success {
            echo "✅ Deployment completed successfully!"
        }
        failure {
            echo "❌ Build failed!"
        }
    }
}
