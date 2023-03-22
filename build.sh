#!/usr/bin/env sh

PACKAGE_VERSION=$(npm pkg get version |  sed 's/"//g' | sed 's/"//g' )
DOCKER_IMAGE_NAME=acidiney/core

echo "****************************************";
echo "****************************************";
echo "**                                    **";
echo "** DEPLOYING NEW DOCKER IMAGE VERSION **";
echo "**                                    **";
echo "****************************************";
echo "****************************************";

echo "Version: $PACKAGE_VERSION"
echo "Date: $(date)"

echo "** 1. BUNDLING APPLICATION AND GENERATE ARTIFACTS **"
npm run build

echo "** 2. CREATE A NEW DOCKER IMAGE WITH VERSION $PACKAGE_VERSION **"
docker build . -t $DOCKER_IMAGE_NAME:latest
docker build . -t $DOCKER_IMAGE_NAME:$PACKAGE_VERSION
