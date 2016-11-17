#!/usr/bin/env bash

docker push jkulak/lol-slack-bot

ssh -oStrictHostKeyChecking=no deploy@$DEPLOY_HOST << EOF

    docker pull jkulak/lol-slack-bot:latest
    docker stop web || true
    docker rm web || true
    docker rmi jkulak/lol-slack-bot:current || true
    docker tag jkulak/lol-slack-bot:latest jkulak/lol-slack-bot:current
    docker run -d --restart always --name web -p 3000:3000 jkulak/lol-slack-bot:current
EOF
