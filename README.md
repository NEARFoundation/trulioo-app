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

# 3. (Temporary hack to create a KYC URL) Ensure that your server/.env file has FORCE_CREATE_CODE="true" so that a new code will automatically get created upon page load.

# 4. Run the following command
yarn dev

# 5. In that same terminal, look for the console log about codeEntity.code to get the GUID (such as 6c7079b6022347ada53f37f489fc773a) and copy it to your clipboard. 

# Or... alternatively you could use MongoDB Compass or any other tool to connect to your database (such as mongodb://localhost:27017/) and browse the `trulioo/codes` table of your Mongo database. Copy the value code of one of the entries of the codes table (such as 6c7079b6022347ada53f37f489fc773a).

# 6. Go to the URL from EXTERNAL_SERVER_URL from ngrok followed by / and the code (such as https://b755-104-176-165-201.ngrok.io/6c7079b6022347ada53f37f489fc773a). 
# (TODO: We should make the browser tab automatically open to this location without requiring the engineer to manually find, copy, and paste the code.)
```

## How to manually test the flow

You can use fake data (as long as it passes validation) when filling out the forms to test.

TODO: Document the steps here.