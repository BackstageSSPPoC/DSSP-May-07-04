// pipeline {
//     agent any

//     environment {
//         APP_NAME = "DSSP-May-07-04".toLowerCase()
//         DOCKER_IMAGE = "chaitanyapandeygspann/${APP_NAME}"
//         DOCKER_TAG = "1.0.${BUILD_NUMBER}"
//         IMAGE_TAG = "${DOCKER_IMAGE}:${DOCKER_TAG}"
//         GITOPS_REPO = "https://github.com/BackstageSSPPoC/k8s-manifests.git"
//     }

//     stages {

//         stage('Checkout Code') {
//             steps {
//                 checkout scm
//             }
//         }


//         stage('Install Dependencies') {
//             steps {
//                 script {
//                     if (fileExists('package.json')) {
//                         sh 'npm install'
//                     } else {
//                         echo "No package.json found, skipping npm install"
//                     }
//                 }
//             }
//         }

//         stage('Run Tests') {
//             steps {
//                 script {
//                     if (fileExists('package.json')) {
//                         sh 'npm test || true'
//                     } else {
//                         echo "Skipping tests"
//                     }
//                 }
//             }
//         }

//         stage('Build Docker Image') {
//             steps {
//                 sh 'docker build -t ${IMAGE_TAG} .'
//             }
//         }

//         stage('Login to Docker Hub') {
//             steps {
//                 withCredentials([usernamePassword(
//                     credentialsId: 'dockerhub-credentials',
//                     usernameVariable: 'DOCKER_USER',
//                     passwordVariable: 'DOCKER_PASS'
//                 )]) {
//                     sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
//                 }
//             }
//         }

//         stage('Push Docker Image') {
//             steps {
//                 sh 'docker push ${IMAGE_TAG}'
//             }
//         }

//         stage('Update GitOps Repo') {
//             steps {
//                 withCredentials([string(credentialsId: 'github-token', variable: 'GITHUB_TOKEN')]) {
//                     sh '''
//                     rm -rf k8s-manifests

//                     git clone --depth 1 https://${GITHUB_TOKEN}@github.com/BackstageSSPPoC/k8s-manifests.git
//                     cd k8s-manifests

//                     mkdir -p apps/${APP_NAME}

//                     cp -r ../manifest-templates/* apps/${APP_NAME}/ || true

//                     sed -i "s|\\${APP_NAME}|${APP_NAME}|g" apps/${APP_NAME}/*.yaml || true
//                     sed -i "s|\\${DOCKER_IMAGE}|${IMAGE_TAG}|g" apps/${APP_NAME}/deployment.yaml || true

//                     git config user.email "jenkins@local"
//                     git config user.name "jenkins"

//                     git add .
//                     git commit -m "Deploy ${APP_NAME} build ${BUILD_NUMBER}" || echo "No changes"

//                     git push origin main
//                     '''
//                 }
//             }
//         }
//     }

//     post {
//         always {
//             sh "docker logout || true"
//             sh "docker image prune -f || true"
//         }
//     }
// }


///////////////////////////////////////////////////////////////////////////////////////////////////////////////


// pipeline {
//     agent any

//     environment {
//         APP_NAME = "DSSP-May-07-04".toLowerCase().trim()
//         DOCKER_IMAGE = "chaitanyapandeygspann/${APP_NAME}"
//         DOCKER_TAG = "1.0.${BUILD_NUMBER}"
//         IMAGE_TAG = "${DOCKER_IMAGE}:${DOCKER_TAG}"
//         GITOPS_REPO = "https://github.com/BackstageSSPPoC/k8s-manifests.git"
//         RUN_PIPELINE = "true"
//     }

//     stages {

//         stage('Checkout Code') {
//             steps {
//                 checkout scm
//             }
//         }

//         stage('Check Changes') {
//             steps {
//                 script {
        
//                     def commitMessage = sh(
//                         script: "git log -1 --pretty=%B",
//                         returnStdout: true
//                     ).trim()
        
//                     // ✅ ONLY first template injection skip
//                     if (commitMessage.toLowerCase().contains("skip ci")) {
//                         echo "Skipping ONLY template injection commit"
//                         env.RUN_PIPELINE = "false"
//                         return
//                     }
        
//                     def changedFiles = sh(
//                         script: "git diff --name-only HEAD~1 HEAD || echo ''",
//                         returnStdout: true
//                     ).trim()
        
//                     echo "Changed Files:\n${changedFiles}"
        
//                     // ✅ ONLY allow run when app changes
//                     def shouldRun = changedFiles.split("\n").any { file ->
//                         file.trim() == "server.js" || file.trim() == "package.json"
//                     }
        
//                     if (!shouldRun) {
//                         echo "No app changes → Skipping pipeline"
//                         env.RUN_PIPELINE = "false"
//                     } else {
//                         echo "App changes detected → Running pipeline"
//                     }
//                 }
//             }
//         }

//         stage('Stop Pipeline') {
//             when {
//                 expression { env.RUN_PIPELINE == "false" }
//             }
//             steps {
//                 script {
//                     echo "Stopping pipeline as RUN_PIPELINE is false"
//                     currentBuild.result = 'SUCCESS'
//                     error("Pipeline stopped intentionally")
//                 }
//             }
//         }

//         stage('Install Dependencies') {
//             when {
//                 expression { env.RUN_PIPELINE == "true" }
//             }
//             steps {
//                 script {
//                     if (fileExists('package.json')) {
//                         sh 'npm install'
//                     } else {
//                         echo "No package.json found"
//                     }
//                 }
//             }
//         }

//         stage('Run Tests') {
//             when {
//                 expression { env.RUN_PIPELINE == "true" }
//             }
//             steps {
//                 script {
//                     if (fileExists('package.json')) {
//                         sh 'npm test || true'
//                     } else {
//                         echo "Skipping tests"
//                     }
//                 }
//             }
//         }

//         stage('Build Docker Image') {
//             when {
//                 expression { env.RUN_PIPELINE == "true" }
//             }
//             steps {
//                 sh 'docker build -t ${IMAGE_TAG} .'
//             }
//         }

//         stage('Login to Docker Hub') {
//             when {
//                 expression { env.RUN_PIPELINE == "true" }
//             }
//             steps {
//                 withCredentials([usernamePassword(
//                     credentialsId: 'dockerhub-credentials',
//                     usernameVariable: 'DOCKER_USER',
//                     passwordVariable: 'DOCKER_PASS'
//                 )]) {
//                     sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
//                 }
//             }
//         }

//         stage('Push Docker Image') {
//             when {
//                 expression { env.RUN_PIPELINE == "true" }
//             }
//             steps {
//                 sh 'docker push ${IMAGE_TAG}'
//             }
//         }

//         stage('Update GitOps Repo') {
//             when {
//                 expression { env.RUN_PIPELINE == "true" }
//             }
//             steps {
//                 withCredentials([string(credentialsId: 'github-token', variable: 'GITHUB_TOKEN')]) {
//                     sh '''
//                     rm -rf k8s-manifests

//                     git clone --depth 1 https://${GITHUB_TOKEN}@github.com/BackstageSSPPoC/k8s-manifests.git
//                     cd k8s-manifests

//                     mkdir -p apps/${APP_NAME}

//                     cp -r ../manifest-templates/* apps/${APP_NAME}/ || true

//                     sed -i "s|\\${APP_NAME}|${APP_NAME}|g" apps/${APP_NAME}/*.yaml || true
//                     sed -i "s|\\${DOCKER_IMAGE}|${IMAGE_TAG}|g" apps/${APP_NAME}/deployment.yaml || true

//                     git config user.email "jenkins@local"
//                     git config user.name "jenkins"

//                     git add .
//                     git commit -m "Deploy ${APP_NAME} build ${BUILD_NUMBER}" || echo "No changes"

//                     git push origin main
//                     '''
//                 }
//             }
//         }
//     }

//     post {
//         always {
//             sh "docker logout || true"
//             sh "docker image prune -f || true"
//         }
//     }
// }


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


pipeline {
    agent any
    
    environment {
        APP_NAME = "DSSP-May-07-04".toLowerCase().trim()
        DOCKER_IMAGE = "chaitanyapandeygspann/${APP_NAME}"
        DOCKER_TAG = "1.0.${BUILD_NUMBER}"
        IMAGE_TAG = "${DOCKER_IMAGE}:${DOCKER_TAG}"
        GITOPS_REPO = "https://github.com/BackstageSSPPoC/k8s-manifests.git"
    }
    
    stages {
    
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }
    
        stage('Decide Pipeline Flow') {
            steps {
                script {
    
                    echo "Branch: ${env.BRANCH_NAME}"
                    echo "GIT_BRANCH: ${env.GIT_BRANCH}"
    
                    // ✅ MAIN → CI + CD
                    if (env.BRANCH_NAME == "main" || env.BRANCH_NAME.endsWith("/main") || env.GIT_BRANCH?.endsWith("main")) {
                        echo "Main branch detected → CI + CD"
                        env.RUN_MODE = "cd"
                    } 
                    // ✅ ANY OTHER BRANCH → CI ONLY
                    else {
                        echo "Non-main branch → CI only"
                        env.RUN_MODE = "ci"
                    }
                }
            }
        }
    
// ================= CI STAGES =================
    
        stage('Install Dependencies') {
            steps {
                script {
                    if (fileExists('package.json')) {
                        sh 'npm install'
                    } else {
                        echo "No package.json found"
                    }
                }
            }
        }
    
        stage('Run Tests') {
            steps {
                script {
                    if (fileExists('package.json')) {
                        sh 'npm test || true'
                    } else {
                        echo "Skipping tests"
                    }
                }
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('SonarQube') {
                    sh '''
                    npx sonar-scanner \
                      -Dsonar.projectKey=${APP_NAME} \
                      -Dsonar.sources=.
                    '''
                }
            }
        }

        stage('Quality Gate') {
            steps {
                timeout(time: 5, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }
    
// ================= CD STAGES =================

        stage('Build Docker Image') { 
                when { 
                    expression { env.RUN_MODE == "cd" } 
                } 
                steps { 
                    sh 'docker build -t ${IMAGE_TAG} .' 
                } 
        }
    
        stage('Login to Docker Hub') {
            when {
                expression { env.RUN_MODE == "cd" }
            }
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-credentials',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
                }
            }
        }
    
        stage('Push Docker Image') {
            when {
                expression { env.RUN_MODE == "cd" }
            }
            steps {
                sh 'docker push ${IMAGE_TAG}'
            }
        }
    
        stage('Update GitOps Repo') {
            when {
                expression { env.RUN_MODE == "cd" }
            }
            steps {
                withCredentials([string(credentialsId: 'github-token', variable: 'GITHUB_TOKEN')]) {
                    sh '''
                    rm -rf k8s-manifests
    
                    git clone --depth 1 https://${GITHUB_TOKEN}@github.com/BackstageSSPPoC/k8s-manifests.git
                    cd k8s-manifests
    
                    mkdir -p apps/${APP_NAME}
    
                    cp -r ../manifest-templates/* apps/${APP_NAME}/ || true
    
                    sed -i "s|\\${APP_NAME}|${APP_NAME}|g" apps/${APP_NAME}/*.yaml || true
                    sed -i "s|\\${DOCKER_IMAGE}|${IMAGE_TAG}|g" apps/${APP_NAME}/deployment.yaml || true
    
                    git config user.email "jenkins@local"
                    git config user.name "jenkins"
    
                    git add .
                    git commit -m "Deploy ${APP_NAME} build ${BUILD_NUMBER}" || echo "No changes"
    
                    git push origin main
                    '''
                }
            }
        }
    }
    
    post {
        always {
            sh "docker logout || true"
            sh "docker image prune -f || true"
        }
    }
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////

