import Loader from 'components/Loader/Loader';
import React, { Suspense } from 'react';

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