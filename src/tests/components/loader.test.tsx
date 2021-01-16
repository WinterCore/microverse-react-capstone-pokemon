import React from 'react';
import { render } from '@testing-library/react';

import Loader from '../../components/loader';

describe('Header Component', () => {
  test('Renders without crashing', () => {
    render(<Loader />);
  });
});
