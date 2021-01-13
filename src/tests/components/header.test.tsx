import { render, screen } from '@testing-library/react';
import { MemoryRouter }   from 'react-router-dom';

import Header from '../../components/header';


describe('Header Component', () => {
    test('Renders the correct content', () => {
        render(<Header />, { wrapper: MemoryRouter });

        expect(screen.getByText('Pokepedia')).toBeInTheDocument();
        expect(screen.getByText(/Welcome to Pokepedia/)).toBeInTheDocument();
    });
});
