pipeline {

agent any

stages {

stage('sonar') {

steps {

sh 'sonar-scanner \
-Dsonar.projectKey=td-addon \
-Dsonar.sources=. \
-Dsonar.host.url=http://10.100.110.180:9000 \
-Dsonar.login=877d74bb1686380509619170a28723636e9d06dc'

}}}}