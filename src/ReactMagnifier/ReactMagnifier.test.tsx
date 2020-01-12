import React from 'react';
import { render } from '@testing-library/react';
import ReactMagnifier from './ReactMagnifier';

test('renders learn react link', () => {
  const { getByText } = render(<ReactMagnifier zoomSize={2} />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
