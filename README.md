[![Build Status](https://travis-ci.org/jkulak/lol-slack-bot.svg?branch=master)](https://travis-ci.org/jkulak/lol-slack-bot)

# 📃 Documentation

## Installation

Prerequisite: You have your API_RIOT_KEY (you can get it here: https://developer.riotgames.com/)

1. Use https://github.com/jkulak/lol-slack-bot-kitchen to provision your environment (I like using https://www.linode.com, https://www.vultr.com and https://www.digitalocean.com)
2. `$ git clone https://github.com/jkulak/lol-slack-bot` - clone this repository to your preferred location on the provisioned server (`/var/www/lol-slack-bot` is my choice)
3. `$ npm install` - install node dependencies
4. `$ gulp` - build the app
5. `cp lib/config/config.js.example lib/config/config.js` - create your configuration file by copying the given example file
6. Update your `config.js` file with your RIOT_API_KEY
7. `pm2 start process.json` - start the application at the default port 8081
8. You application is now available at http://YOU_SERVER_IP:8018

Currently only one route is available, try: http://YOUR_SERVER_IP:8081/summoners/almostroy/games

# We love badges and emojis

[![GitHub version](https://badge.fury.io/gh/jkulak%2Flol-slack-bot.svg)](https://badge.fury.io/gh/jkulak%2Flol-slack-bot)
[![StackShare](http://img.shields.io/badge/tech-stack-0690fa.svg?style=flat)](http://stackshare.io/jkulak/lol-slack-bot)
[![Dependecies](https://david-dm.org/jkulak/lol-slack-bot.svg)](https://david-dm.org/jkulak/lol-slack-bot)
[![codecov](https://codecov.io/gh/jkulak/lol-slack-bot/branch/master/graph/badge.svg)](https://codecov.io/gh/jkulak/lol-slack-bot)
