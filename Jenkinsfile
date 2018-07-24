pipeline {
  agent {
    docker { image 'node:7-alpine' }
  }
  options {
    skipDefaultCheckout true
  }
  stages {
    stage('Prepare') {
      steps {
        cleanWs()
        checkout scm
      }
    }
    stage('Install') {
      steps {
        sh 'npm -v'
        sh 'npm install'
      }
    }
    stage('Build') {
      steps {
        sh 'npm run build'
      }
    }
    stage('Test') {
      steps {
        sh 'npm run test'
      }
    }
    stage('Release') {
      agent {
        docker {
          image 'golang:1.10.3-alpine'
          args '--user=root --privileged'
        }
      }
      steps {
        sh 'go get github.com/aktau/github-release'
      }
    }
  }
  environment {
    CI = 'true'
  }
}
