pipeline {
    agent any

    environment {
        NEXTAUTH_SECRET = credentials('NEXTAUTH_SECRET')
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Tuankiet0903/next_app.git'
            }
        }

        stage('Deploy with Docker Compose') {
            steps {
                script {
                    echo "Stopping old containers (if any)..."
                    sh "docker-compose down || true"

                    echo "Building and starting containers..."
                    sh "NEXTAUTH_SECRET=${NEXTAUTH_SECRET} docker-compose up -d --build"

                    echo "Waiting for containers to be healthy..."
                    // Docker healthcheck tự handle, optional sleep
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
