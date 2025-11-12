pipeline {
    agent any

    environment {
        IMAGE_NAME = "nextjs-app"
        CONTAINER_NAME = "nextjs-container"
        // Lấy DATABASE_URL từ Jenkins Credentials (Secret Text)
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

        stage('Stop Old Container') {
            steps {
                script {
                    echo "Stopping old container if exists..."
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
            echo "Starting new container..."
            if [ -z "${DATABASE_URL}" ]; then
                echo "⚠️ DATABASE_URL not set. Container will start but Prisma migrations will be skipped."
                sh """
                    docker run -d \
                    --name ${CONTAINER_NAME} \
                    -p 3000:3000 \
                    --restart unless-stopped \
                    ${IMAGE_NAME}:latest
                """
            else
                echo "✅ DATABASE_URL set. Container will run Prisma migrations on start."
                sh """
                    docker run -d \
                    --name ${CONTAINER_NAME} \
                    -p 3000:3000 \
                    -e DATABASE_URL=${DATABASE_URL} \
                    --restart unless-stopped \
                    ${IMAGE_NAME}:latest \
                    sh -c "npx prisma migrate deploy && npm start"
                """
            fi
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
