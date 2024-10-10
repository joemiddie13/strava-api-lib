# Strava API Library and Test Application

This project consists of three main parts:
1. A JavaScript library wrapper for the Strava API (`strava-api-lib`)
2. A React test application that demonstrates the usage of the library (`strava-test-app`)
3. Uploaded to NPM as `strava-api-lib`: https://www.npmjs.com/package/strava-api-lib

## Strava API Library

The `strava-api-lib` is a TypeScript library that provides a simple interface to interact with the Strava API. It handles authentication and provides methods to fetch athlete data and activities.

### Installation

To install the library in your project:

bash
npm install ../path/to/strava-api-lib

### Usage

typescript
```
import StravaAPI from 'strava-api-lib';
const stravaApi = new StravaAPI({
clientId: 'YOUR_CLIENT_ID',
clientSecret: 'YOUR_CLIENT_SECRET',
redirectUri: 'YOUR_REDIRECT_URI',
});
// Authenticate
await stravaApi.authenticate(code);
// Get athlete data
const athleteData = await stravaApi.getAthlete();
// Get activities
const activities = await stravaApi.getActivities();
```


## React Test Application

The `strava-test-app` is a React application that demonstrates how to use the Strava API library. It allows users to log in with their Strava account and view their recent activities.

### Setup

1. Navigate to the `strava-test-app` directory
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on the `.env.example` (see Environment Variables section)
4. Start the development server:
   ```bash
   npm start
   ```

### Environment Variables

Create a `.env` file in the `strava-test-app` directory with the following content:

```
REACT_APP_STRAVA_CLIENT_ID=YOUR_CLIENT_ID
REACT_APP_STRAVA_CLIENT_SECRET=YOUR_CLIENT_SECRET
REACT_APP_STRAVA_REDIRECT_URI=YOUR_REDIRECT_URI
```

Replace `YOUR_CLIENT_ID`, `YOUR_CLIENT_SECRET`, and `YOUR_REDIRECT_URI` with your actual Strava API credentials.

## Project Structure

- `strava-api-lib/`: Contains the library code
- `strava-test-app/`: Contains the test application code

## Development

To make changes to the library:

1. Edit the files in `strava-api-lib/src`
2. Rebuild the library:
   ```bash
   cd strava-api-lib
   npm run build
   ```
3. Reinstall the library in the test app:
   ```bash
   cd ../strava-test-app
   npm install ../path/to/strava-api-lib
   ```

4. Start the test app:
   ```bash
   npm start
   ```

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.
