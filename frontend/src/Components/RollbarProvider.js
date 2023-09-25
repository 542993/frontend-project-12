import React from 'react';
import { Provider, ErrorBoundary } from '@rollbar/react';

const rollbarConfig = {
  accessToken: '3ed12951194c4bfd81d9cd11052481cf',
  environment: 'testenv',
};

function TestError() {
  const a = null;
  return a.hello();
}
const RollbarProvider = ({ children }) => {
  return (
    <Provider config={rollbarConfig}>
      <ErrorBoundary>
        <TestError />
        {children}
      </ErrorBoundary>
    </Provider>
  );
};
export default RollbarProvider;
