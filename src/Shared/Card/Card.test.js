import React from 'react';
import { render } from '@testing-library/react';
import Card from './Card';

test('renders learn react link', () => {
  const { getByText } = render(<Card />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
