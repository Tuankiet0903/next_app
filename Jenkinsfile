pipeline {
  agent any

  environment {
    DOCKER_IMAGE = 'nextjs-app'
    CONTAINER_NAME = 'nextjs-container'
    PORT = '3000'
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
            docker build -t ${DOCKER_IMAGE}:latest .
          """
        }
      }
    }

    stage('Run Container') {
      steps {
        script {
          sh """
            docker stop ${CONTAINER_NAME} || true
            docker rm ${CONTAINER_NAME} || true
            docker run -d --name ${CONTAINER_NAME} -p ${PORT}:3000 ${DOCKER_IMAGE}:latest
          """
        }
      }
    }
  }

  post {
    success {
      echo "✅ Next.js container is up at http://localhost:${PORT}"
    }
    failure {
      echo "❌ Build failed."
    }
  }
}
