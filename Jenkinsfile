pipeline {
  agent any
  stages {
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
