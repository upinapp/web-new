pipeline {
  agent none
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
        stash includes: 'build/**/*', name: 'staticContent'
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
        sh 'apk add --no-cache git'
        sh 'go get github.com/aktau/github-release'
        unstash 'staticContent'
      }
    }
  }
  environment {
    CI = 'true'
  }
}
