import React, { useState, useEffect } from 'react';
import StravaAPI from 'strava-api-lib';
import './App.css';

const stravaApi = new StravaAPI({
  clientId: process.env.REACT_APP_STRAVA_CLIENT_ID || '',
  clientSecret: process.env.REACT_APP_STRAVA_CLIENT_SECRET || '',
  redirectUri: process.env.REACT_APP_STRAVA_REDIRECT_URI || '',
});

function App() {
  const [athlete, setAthlete] = useState<any>(null);
  const [activities, setActivities] = useState<any[]>([]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      handleAuthentication(code);
    }
  }, []);

  const handleAuthentication = async (code: string) => {
    try {
      await stravaApi.authenticate(code);
      const athleteData = await stravaApi.getAthlete();
      setAthlete(athleteData);
      const activitiesData = await stravaApi.getActivities();
      setActivities(activitiesData);
    } catch (error) {
      console.error('Authentication failed:', error);
    }
  };

  const handleLogin = () => {
    window.location.href = stravaApi.getAuthorizationUrl();
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Strava API Test</h1>
        {!athlete ? (
          <button onClick={handleLogin}>Login with Strava</button>
        ) : (
          <div>
            <h2>Welcome, {athlete.firstname} {athlete.lastname}!</h2>
            <h3>Your Recent Activities:</h3>
            <ul>
              {activities.map((activity) => (
                <li key={activity.id}>{activity.name} - {activity.type}</li>
              ))}
            </ul>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
