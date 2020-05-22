import React from 'react';
import { render } from '@testing-library/react';
import Country from './Country';

test('renders learn react link', () => {
  const { getByText } = render(<Country />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
