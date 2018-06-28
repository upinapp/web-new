pipeline {
  agent any
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
  }
  environment {
    CI = 'true'
  }
}
