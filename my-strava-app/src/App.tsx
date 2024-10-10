import React from 'react';
import AthleteInfo from './components/AthleteInfo';
import './App.css';

function App() {
  // Mock athlete data
  const athlete = {
    name: 'Jane Doe',
    profilePicture: 'https://via.placeholder.com/150',
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Strava Athlete Dashboard</h1>
        <AthleteInfo
          name={athlete.name}
          profilePicture={athlete.profilePicture}
        />
      </header>
    </div>
  );
}

export default App;