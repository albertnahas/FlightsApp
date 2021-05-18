import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders start button', () => {
  render(<App />);
  const linkElement = screen.getAllByText(/Plan/i);
  expect(linkElement).toBeTruthy();
});
