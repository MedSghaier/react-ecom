import React from 'react';

import  { SpinnerOverlay, SpinnerContainer } from './with-spinner.styles';

const WithSpinner = WrapperComponent => ({ isLoading, ...otherProps }) => {
    return isLoading ? (
        <SpinnerOverlay>
            <SpinnerContainer />
        </SpinnerOverlay>
    ) : (
        <WrapperComponent {...otherProps} />
    )
}

export default WithSpinner;