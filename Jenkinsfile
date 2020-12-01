@Library('jenkins-library' ) _

String agentLabel = 'docker-build-agent'
String registry = "docker.soramitsu.co.jp"
String dockerBuildToolsUserId = 'bot-build-tools-ro'
String dockerRegistryRWUserId = 'bot-soraneo-rw'
String appImageName = "docker.soramitsu.co.jp/soraneo/polkadot-js-app"
String secretScannerExclusion = ''
Boolean disableSecretScanner = false

pipeline {
    options {
        buildDiscarder(logRotator(numToKeepStr: '20'))
        timestamps()
        disableConcurrentBuilds()
    }

    agent {
        label agentLabel
    }

    stages {
        stage('Secret scanner'){
            steps {
                script {
                    docker.withRegistry( "https://" + registry, dockerBuildToolsUserId) {
                        secretScanner(disableSecretScanner, secretScannerExclusion)
                    }
                }
            }
        }
        stage('Build image') {
            steps{
                script {
                    sh "docker build -t ${appImageName} ."
                }
            }
        }
        stage('Push Image') {
            when {
                expression { getPushVersion() }
            }
            steps{
                script {
                    baseImageTag = "${getPushVersion()}"
                    docker.withRegistry( "https://" + registry, dockerRegistryRWUserId) {
                        sh """
                            docker tag ${appImageName} ${appImageName}:${baseImageTag}
                            docker push ${appImageName}:${baseImageTag}
                        """
                    }
                }
            }
        }
    }
    post {
        cleanup { cleanWs() }
    }
}