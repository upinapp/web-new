pipeline {
  agent { none }
  options {
    skipDefaultCheckout true
  }
  stages {
    stage('Prepare') {
      agent {
        docker { image 'node:7-alpine' }
      }
      steps {
        cleanWs()
        checkout scm
      }
    }
    stage('Install') {
      agent {
        docker { image 'node:7-alpine' }
      }
      steps {
        sh 'npm -v'
        sh 'npm install'
      }
    }
    stage('Build') {
      agent {
        docker { image 'node:7-alpine' }
      }
      steps {
        sh 'npm run build'
      }
    }
    stage('Test') {
      agent {
        docker { image 'node:7-alpine' }
      }
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
