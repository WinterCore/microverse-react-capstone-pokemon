import { render, screen } from '@testing-library/react';

import ApiResourceRenderer from '../../components/api-resource-renderer';

describe('ApiResourceRenderer', () => {
    it('Should show the <Loader /> component when isLoading is true', () => {
        render(
            <ApiResourceRenderer
                isLoading={ true }
                loaderWidth="100%"
                error={ null }
                empty={ false }
                render={ () => null }
            />
        );

        expect(screen.getByTestId('loader')).toBeInTheDocument();
    });

    it('Should show an error message when isLoading is false and there\'s an error', () => {
        render(
            <ApiResourceRenderer
                isLoading={ false }
                loaderWidth="100%"
                error={ 'error' }
                empty={ false }
                render={ () => null }
            />
        );

        expect(screen.getByText('Something happened!')).toBeInTheDocument();
    });

    it('Should show an info message that no items were found when empty is true and isLoading is false', () => {
        render(
            <ApiResourceRenderer
                isLoading={ false }
                loaderWidth="100%"
                error={ null }
                empty={ true }
                render={ () => null }
            />
        );

        expect(screen.getByText('No items were found!')).toBeInTheDocument();
    });

    it('Render what\'s returned by the render prop when isLoading is false and there aren\'t any errors', () => {
        render(
            <ApiResourceRenderer
                isLoading={ false }
                loaderWidth="100%"
                error={ null }
                empty={ false }
                render={ () => <h1>Hello World</h1> }
            />
        );

        expect(screen.getByText('Hello World')).toBeInTheDocument();
    });
});
