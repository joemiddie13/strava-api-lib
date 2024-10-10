import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Strava Athlete Dashboard', () => {
  render(<App />);
  const dashboardElement = screen.getByText(/Strava Athlete Dashboard/i);
  expect(dashboardElement).toBeInTheDocument();
});
