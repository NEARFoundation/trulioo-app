# trulioo-app

Frontend and backend for Trulioo KYC

## Requirements

- node.js > v14
- yarn
- mongodb
  - Optional: [MongoDB Compass](https://www.mongodb.com/try/download/compass) (In “Version” dropdown, you can choose Readonly)
- For development: a tunnel tool such as [localtunnel](https://github.com/localtunnel/localtunnel) or [ngrok](https://ngrok.com/download)

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
# 1. Run the following command so that your local server will have a publicly-accessible URL using https. You can choose whatever you want for the subdomain, and the localtunnel service will attempt to honor your request.
npx localtunnel --port 8080 --subdomain trulioo

# 2. Copy the URL with https and paste it in server/.env as the value for EXTERNAL_SERVER_URL. E.g. EXTERNAL_SERVER_URL="https://trulioo.loca.lt"

# 3. (Temporary hack to create a KYC URL) Ensure that your server/.env file has FORCE_CREATE_CODE="true" so that a new code will automatically get created upon page load.
# The hack is at server/src/index.js.

# 4. Run the local dev server via:
yarn dev

# Note: you will always need to update EXTERNAL_SERVER_URL in server/.env (such as if localtunnel makes you change your subdomain) and then restart the `yarn dev` command.

# 5. In that same terminal, look for the console log that says "Please visit", and click its link (such as https://trulioo.loca.lt/6c7079b6022347ada53f37f489fc773a).
```

## How to manually test the flow

You can use fake data (as long as it passes validation) when filling out the forms to test.

1. Click "Get Started". 
2. Choose "France" as your country.
3. Fill out the form with first name "San", last name "Holo", and DOB 01-01-2000. (Yes, it's "Han Solo" misspelled, and yes you're providing a date of birth even though that field isn't marked as required.) You can use any other data for the other required fields and leave optional fields blank.


TODO: Document the other steps here for testing.

## TODO

Throughout the repo, find places where Eslint was disabled. Re-enable Eslint, and fix the issues.