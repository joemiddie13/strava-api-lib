import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Strava API Test header', () => {
  render(<App />);
  const headerElement = screen.getByText(/Strava API Test/i);
  expect(headerElement).toBeInTheDocument();
});

test('renders Login with Strava button when not authenticated', () => {
  render(<App />);
  const loginButton = screen.getByText(/Login with Strava/i);
  expect(loginButton).toBeInTheDocument();
});
