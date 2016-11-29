#!/usr/bin/env bash

docker push jkulak/lol-slack-bot

ssh -oStrictHostKeyChecking=no deploy@$DEPLOY_HOST << EOF

    docker pull jkulak/lol-slack-bot:latest
    docker stop web || true
    docker rm web || true
    docker rmi jkulak/lol-slack-bot:current || true
    docker tag jkulak/lol-slack-bot:latest jkulak/lol-slack-bot:current
    docker run -d --restart always --name lol-slack-bot-web -p 20201:8081 jkulak/lol-slack-bot:current
EOF


# docker-compose stop && docker-compose rm && docker-compose create && docker-compose start
# or
# docker-compose down && docker-compose up -d
