import React from 'react';
import Loader from './Loader';

interface WithLoaderProps {
  loading: boolean;
}

function withLoader<P>(Component: React.ComponentType<P>) {
  return function WithLoader({ loading }: WithLoaderProps & P) {
    if (loading) {
      return <Loader />;
    }
    return <React.Fragment></React.Fragment>
  };
}

export default withLoader;