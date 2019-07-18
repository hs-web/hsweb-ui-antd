#!/usr/bin/env bash
docker rmi registry.cn-shenzhen.aliyuncs.com/zmcsoft/mini-program
docker build -t registry.cn-shenzhen.aliyuncs.com/zmcsoft/mini-program -f ./Dockerfile .
docker push registry.cn-shenzhen.aliyuncs.com/zmcsoft/mini-program
