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
# 1. You might need to disable your firewall.

# 2. Run a tunneling command so that your local server will have a publicly-accessible URL using https. You can choose whatever you want for the subdomain, and the localtunnel service will attempt to honor your request. But ngrok might be more reliable than localtunnel, so try ngrok if any part of the flow doesn't work on localtunnel.
npx localtunnel --port 8080 --subdomain trulioo

# 3. Copy the URL with https and paste it in server/.env as the value for EXTERNAL_SERVER_URL. E.g. EXTERNAL_SERVER_URL="https://trulioo.loca.lt"

# 4. (Temporary hack to create a KYC URL) Ensure that your server/.env file has FORCE_CREATE_CODE="true" so that a new code will automatically get created upon page load.
# The hack is at server/src/index.js.

# 5. Run the local dev server via:
yarn dev

# Note: you will always need to update EXTERNAL_SERVER_URL in server/.env (such as if localtunnel makes you change your subdomain) and then restart the `yarn dev` command.

# 6. In your browser, visit the URL such as https://trulioo.loca.lt/kyc/secret-create-url which is determined by your environment variables EXTERNAL_SERVER_URL and GENERIC_CREATE_CODE_TOKEN like this: `${EXTERNAL_SERVER_URL}/kyc/${GENERIC_CREATE_CODE_TOKEN}`.

```

## How to manually test the flow

As an admin:

1. You need to log in as a special user with certain permissions.
1. Create test entities (see https://trulioo.freshdesk.com/support/solutions/articles/13000009316-how-do-i-create-test-entities-)

As a user:

1. Click "Get Started".
1. Choose "France" as your country.
1. Fill out the form with values that match a test entity, such as: first name "San", last name "Holo", and DOB 01-01-2000. (Yes, it's "Han Solo" misspelled, and yes you're providing a date of birth even though that field isn't marked as required.) You can use any other (fake) data for the other required fields and leave optional fields blank.
1. Use your phone to visit the QR code's website.
1. Take a photo of a passport such as https://www.pinterest.com/pin/buy-your-real-passportsid-cardsvisasdrivers-licensessnieltstoefl-and-scan-onlinecontact-us-o--1078541810733589539/ It will likely say "document not recognized" and will allow you to take the photo again manually, which you should.

## TODO

Throughout the repo, find places where Eslint was disabled. Re-enable Eslint, and fix the issues.

```

```
