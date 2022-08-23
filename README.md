# trulioo-app

Frontend and backend for Trulioo KYC

## Requirements

- node.js > v14
- yarn
- mongodb
- ngrok

## Installation

```sh
# 1. Make sure the required dependencies above are installed, and that mongodb is running

# 2. Run the following command
cp server/.env.dist server/.env

# 3. Edit server/.env

# 4. Install dependencies with the following commands
cd server && yarn install
cd ../ui && yarn install
```

## Development

```sh
# 1. Run the following command to have a proxy with https
ngrok http 8080

# 2. Copy the url with https and paste it in server/.env as a value of EXTERNAL_SERVER_URL

# 3. Temporary hack to create a KYC url:
# Edit src/index.js and uncomment those lines
# // let expiryDate = new Date();
# // expiryDate.setDate(expiryDate.getDate() + 30);
# // await createNewCode(expiryDate);

# 4. Run the following command
yarn start-dev

# 5. Go to your mongodb databse with MongoDBCompass for example (or any other explorer) and naviagte to the codes table
# 6. Copy the value code of one of the entries of the codes table
# 7. Go to the url from EXTERNAL_SERVER_URL from ngrok followed by / and the code
```
