import React from 'react';

import Loader from './loader';

import utilStyles from '../utility.module.css';

const ApiResourceRenderer: React.FC<ApiResourceRendererProps> = ({ isLoading, loaderWidth, error, empty, render }) => {
    if (isLoading) {
        return <Loader width={ loaderWidth } />;
    }

    if (error) {
        return <h2 className={ utilStyles.errorHeading }>Something happened!</h2>;
    }

    if (empty) {
        return <h2 className={ utilStyles.infoHeading }>No items were found!</h2>;
    }

    return render();
};

type ApiResourceRendererProps = {
    isLoading   : boolean;
    loaderWidth : string | number;
    error       : string | null;
    empty       : boolean;
    render      : () => React.ReactElement;
};

export default ApiResourceRenderer;
