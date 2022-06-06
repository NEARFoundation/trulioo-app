#!/bin/bash

cd ui
rm -rf build
yarn build:staging
cd ../server/public
rm -rf $(find . -name "*" ! -name ".gitignore")
cp -R ../../ui/build/* ./
