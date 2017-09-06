# Project discontinued, won't work with current version of RIOT Games API.

# 📃 Installation

Prerequisite: You have your API_RIOT_KEY (you can get it here: https://developer.riotgames.com/)

## 🐳 If you are using Docker

1. Clone this repository `$ git clone https://github.com/jkulak/lol-slack-bot`
* Create a `docker-compose.yml` file, using the provided template `docker-compose.yml.example` and fill it in with your configuration
* Run `$ docker-compose up`
* Log-in to your running container `docker exec -ti lolslackbot_web_1 sh`
* `$ npm install` - install dependencies
* `$ ./node_modules/.bin/gulp` - build the application

## 🍳 If you are using Chef

1. Provision your environment using: https://github.com/jkulak/lol-slack-bot-kitchen
* `$ git clone https://github.com/jkulak/lol-slack-bot` - clone this repository to your preferred location on the provisioned server (`/var/www/lol-slack-bot` is my choice)
* `$ npm install` - install dependencies
* `$ ./node_modules/.bin/gulp` - build the application
* Update your `config.js` file with your RIOT_API_KEY (or set RIOT_API_KEY environment variable)
* `$ pm2 start process.json` - start the application at the default port 8081
* You application is now available at http://YOU_SERVER_IP:8081

Currently only one route is available, try: http://YOUR_SERVER_IP:8081/summoners/almostroy/games

# We love badges

CircleCI deployment, with Docker: [![CircleCI](https://circleci.com/gh/jkulak/lol-slack-bot.svg?style=svg)](https://circleci.com/gh/jkulak/lol-slack-bot)

[![GitHub version](https://badge.fury.io/gh/jkulak%2Flol-slack-bot.svg)](https://badge.fury.io/gh/jkulak%2Flol-slack-bot)
[![StackShare](http://img.shields.io/badge/tech-stack-0690fa.svg?style=flat)](http://stackshare.io/jkulak/lol-slack-bot)
[![Dependecies](https://david-dm.org/jkulak/lol-slack-bot.svg)](https://david-dm.org/jkulak/lol-slack-bot)
[![codecov](https://codecov.io/gh/jkulak/lol-slack-bot/branch/master/graph/badge.svg)](https://codecov.io/gh/jkulak/lol-slack-bot)
