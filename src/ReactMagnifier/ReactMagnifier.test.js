import React from 'react';
import { render } from '@testing-library/react';
import ReactMagnifier from './ReactMagnifier';
test('renders learn react link', function () {
    var getByText = render(React.createElement(ReactMagnifier, { zoomSize: 2 })).getByText;
    var linkElement = getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
});
