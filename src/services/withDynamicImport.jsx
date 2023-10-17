import React, { Suspense } from 'react';
import Loader from '../components/Loader/Loader';

function withDynamicImport(importComponent) {
  const LazyComponent = React.lazy(importComponent);

  return function WrappedComponent(props) {
    return (
      <Suspense fallback={<Loader />}>
        <LazyComponent {...props} />
      </Suspense>
    );
  };
}

export default withDynamicImport;