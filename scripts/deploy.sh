#!/usr/bin/env bash

# Env variavles
export SSHPASS=$PROD_DEPLOY_PASS
DEPLOY_HOST=$PROD_DEPLOY_HOST
DEPLOY_USER=$PROD_DEPLOY_USER
DEPLOY_PATH=$PROD_DEPLOY_PATH

# Local variables
TIME_TAG=`date +"%y%m%d_%H%M%S"`
PACKAGE_NAME=package-lol-slack-bot-$TIME_TAG.tar.gz

# Compress all content of the directory
tar -czf /tmp/$PACKAGE_NAME *

# Copy package
sshpass -e scp -o "StrictHostKeyChecking no" /tmp/$PACKAGE_NAME $DEPLOY_USER@$DEPLOY_HOST:/tmp

# Run multiple commands over SSH
sshpass -e ssh -o "StrictHostKeyChecking no" $DEPLOY_USER@$DEPLOY_HOST /bin/bash << EOF

    # Create directory for new release
    mkdir $DEPLOY_PATH/releases/$TIME_TAG

    # Extract package to new release directory
    tar xzf /tmp/$PACKAGE_NAME -C $DEPLOY_PATH/releases/$TIME_TAG

    # Copy configuration from current
    cp $DEPLOY_PATH/releases/current/lib/config/config.js $DEPLOY_PATH/releases/$TIME_TAG/lib/config/config.js

    # Remove previous
    rm -r $DEPLOY_PATH/releases/previous

    # Copy current to previous
    cp -r $DEPLOY_PATH/releases/current $DEPLOY_PATH/releases/previous

    # Update symbolic link to point to newest release
    ln -sfn $DEPLOY_PATH/releases/$TIME_TAG $DEPLOY_PATH/releases/current

    pm2 kill
    cd $DEPLOY_PATH/www
    pm2 start process.json
    touch $DEPLOY_PATH/www/_release_$TIME_TAG

EOF
