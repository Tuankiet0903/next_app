pipeline {
    agent any

    environment {
        IMAGE_NAME = "nextjs-app"
        CONTAINER_NAME = "nextjs-container"
        DATABASE_URL = credentials('DATABASE_URL')
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
                    echo "Building Docker image..."
                    sh """
                        docker build \
                        --build-arg DATABASE_URL=${DATABASE_URL} \
                        -t ${IMAGE_NAME}:latest .
                    """
                }
            }
        }

        stage('Stop & Remove Old Container') {
            steps {
                script {
                    echo "Stopping and removing old container if exists..."
                    sh """
                        OLD_CONTAINER=\$(docker ps -a -q -f name=${CONTAINER_NAME})
                        if [ ! -z "\$OLD_CONTAINER" ]; then
                            docker stop ${CONTAINER_NAME} || true
                            docker rm ${CONTAINER_NAME} || true
                        fi
                    """
                }
            }
        }

        stage('Run New Container') {
            steps {
                script {
                    echo "Starting new container..."
                    if (env.DATABASE_URL) {
                        echo "✅ DATABASE_URL set. Running container with Prisma migrations."
                        sh """
                            docker run -d \
                            --name ${CONTAINER_NAME} \
                            -p 3000:3000 \
                            -e DATABASE_URL=${DATABASE_URL} \
                            --restart unless-stopped \
                            ${IMAGE_NAME}:latest \
                            sh -c "npx prisma migrate deploy && npm start"
                        """
                    } else {
                        echo "⚠️ DATABASE_URL not set. Running container without Prisma migrations."
                        sh """
                            docker run -d \
                            --name ${CONTAINER_NAME} \
                            -p 3000:3000 \
                            --restart unless-stopped \
                            ${IMAGE_NAME}:latest
                        """
                    }
                }
            }
        }

        stage('Show Container Logs') {
            steps {
                script {
                    echo "📄 Attaching container logs..."
                    sh """
                        docker logs -f ${CONTAINER_NAME}
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
            echo "❌ Deployment failed!"
        }
    }
}
