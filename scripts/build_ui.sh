#!/bin/bash

cd ui
rm -rf build
yarn build
cd ../server/public
rm -rf $(find . -name "*" ! -name ".gitignore")
cp -R ../../ui/build/* ./
