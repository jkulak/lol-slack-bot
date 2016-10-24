#!/usr/bin/env bash

# mkdir build
# mv * build
# tar -czf package.tgz build
# scp package.tgz $DEPLOY_USER@$DEPLOY_HOST:$DEPLOY_PATH -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null

echo "I am from the script"
pwd
ls -la

set -ex

# get the time - this will be used as the name of the directory
TIME_TAG=`date +"%y%m%d_%H%M%S"`
PACKAGE_NAME=package-lol-slack-bot-$TIME_TAG.tar.gz
export SSHPASS=$DEPLOY_PASS
TARGET_SERVER="107.170.247.180"
DEPLOYMET_USER=lol-slack-bot

TARGET_DIR="/var/www/lol-slack-bot"

# Compress all content of the directory
tar -czf /tmp/$PACKAGE_NAME *

# Copy package
sshpass -e scp -o "StrictHostKeyChecking no" /tmp/$PACKAGE_NAME $DEPLOYMET_USER@$TARGET_SERVER:/tmp

# Run multiple commands over SSH
sshpass -e ssh -o "StrictHostKeyChecking no" $DEPLOYMET_USER@$TARGET_SERVER /bin/bash << EOF

    # Create directory for new release
    mkdir $TARGET_DIR/releases/$TIME_TAG

    # Extract package to new release directory
    tar xzf /tmp/$PACKAGE_NAME -C $TARGET_DIR/releases/$TIME_TAG

    # Copy configuration from current
    cp $TARGET_DIR/releases/current/lib/config/config.js $TARGET_DIR/releases/$TIME_TAG/lib/config/config.js

    # Remove previous
    rm -r $TARGET_DIR/releases/previous

    # Copy current to previous
    cp -r $TARGET_DIR/releases/current $TARGET_DIR/releases/previous

    # Update symbolic link to point to newest release
    ln -sfn $TARGET_DIR/releases/$TIME_TAG $TARGET_DIR/releases/current

EOF
