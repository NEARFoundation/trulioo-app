# trulioo-app

Frontend and backend for Trulioo KYC

## Requirements

- node.js > v14
- yarn
- mongodb
  - Optional: [MongoDB Compass](https://www.mongodb.com/try/download/compass) (In “Version” dropdown, you can choose Readonly)
- For development: [ngrok](https://ngrok.com/download)

## Installation

```sh
# 1. Make sure the required dependencies above are installed, and that mongodb is running. There seems to be no setup or data population required.

# 2. Run the following command
cp server/.env.dist server/.env

# 3. Edit values in `server/.env`. See https://my.1password.com/vaults/if2irxw2lpt6pd7h4t6ietepty/allitems/a5ryfgfk4eja6kmyjusnirl56q.

# 4. Install dependencies with the following commands
cd server && yarn install
cd ../ui && yarn install
```

## Development

```sh
# 1. Run the following command so that your local server will have a publicly-accessible URL using https
ngrok http 8080

# 2. Copy the URL with https and paste it in server/.env as the value for EXTERNAL_SERVER_URL

# 3. (Temporary hack to create a KYC URL) Edit server/src/index.js and uncomment these lines in it:
# // let expiryDate = new Date();
# // expiryDate.setDate(expiryDate.getDate() + 30);
# // await createNewCode(expiryDate);

# 4. Run the following command
yarn start-dev

# 5. Use MongoDB Compass or any other tool to connect to your database (such as mongodb://localhost:27017/) and browse the `trulioo/codes` table of your Mongo database.
# 6. Copy the value code of one of the entries of the codes table (such as 6c7079b6022347ada53f37f489fc773a)
# 7. Go to the URL from EXTERNAL_SERVER_URL from ngrok followed by / and the code (such as https://b755-104-176-165-201.ngrok.io/6c7079b6022347ada53f37f489fc773a)
# 8. You can use fake data (as long as it passes validation) when filling out the forms to test.
```
