// navBar.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import NavBar from './Header';

// Testing if navbar section titles exist
test('navBar sections', () => {
  render(<NavBar />);
  expect(screen.getByText(/HOME/)).toBeInTheDocument();
  expect(screen.getByText(/FAVS/)).toBeInTheDocument();
  expect(screen.getByText(/PROFILE/)).toBeInTheDocument();
});

// Testing navbar links
const links = [
  { text: 'HOME', location: '' },
  { text: 'PROFILE', location: '#' },
];
test.each(links)(
  'Check each navbar href',
  (link) => {
    render(<NavBar />);
    const linkDom = screen.getByText(link.text);
    expect(linkDom).toHaveAttribute('href', link.location);
  },
);
