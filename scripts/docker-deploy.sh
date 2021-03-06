#!/usr/bin/env bash

docker push jkulak/lol-slack-bot

ssh -oStrictHostKeyChecking=no deploy@$DEPLOY_HOST << EOF

    docker pull jkulak/lol-slack-bot:latest
    docker stop lol-slack-bot-web || true
    docker rm lol-slack-bot-web || true
    docker rmi jkulak/lol-slack-bot:current || true
    docker tag jkulak/lol-slack-bot:latest jkulak/lol-slack-bot:current
    docker run -d --env RIOT_API_KEY=\$RIOT_API_KEY --env MONGO_HOST=\$LOL_SLACK_BOT_MONGO_HOST --restart always --name lol-slack-bot-web -p 20201:8081 jkulak/lol-slack-bot:current
    echo "docker run -d --env RIOT_API_KEY=\$RIOT_API_KEY --env MONGO_HOST=\$LOL_SLACK_BOT_MONGO_HOST --restart always --name lol-slack-bot-web -p 20201:8081 jkulak/lol-slack-bot:current" >> ~/DEPLOY_COMMAND
EOF


# docker-compose stop && docker-compose rm && docker-compose create && docker-compose start
# or
# docker-compose down && docker-compose up -d
