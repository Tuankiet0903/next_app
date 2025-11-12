pipeline {
    agent any

    environment {
        // Lấy biến bí mật từ Jenkins Credentials
        NEXTAUTH_SECRET = credentials('NEXTAUTH_SECRET')
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Tuankiet0903/next_app.git'
            }
        }

        stage('Check Docker Compose') {
            steps {
                echo "Checking Docker Compose version..."
                sh 'docker-compose version'
            }
        }

        stage('Deploy with Docker Compose') {
            steps {
                script {
                    echo "Stopping old containers (if any)..."
                    sh "docker-compose down || true"

                    echo "Building and starting containers..."
                    // Truyền biến bí mật an toàn qua withEnv
                    withEnv(["NEXTAUTH_SECRET=${NEXTAUTH_SECRET}"]) {
                        sh "docker-compose up -d --build"
                    }

                    echo "Waiting for containers to be healthy..."
                    sh "sleep 10"

                    echo "Attaching container logs..."
                    sh "docker-compose logs -f"
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
