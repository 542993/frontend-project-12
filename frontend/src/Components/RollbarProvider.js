import React from 'react';
import { Provider, ErrorBoundary } from '@rollbar/react';

const rollbarConfig = {
  accessToken: '3ed12951194c4bfd81d9cd11052481cf',
  environment: 'testenv',
};
const RollbarProvider = ({ children }) => (
  <Provider config={rollbarConfig}>
    <ErrorBoundary>
      {children}
    </ErrorBoundary>
  </Provider>
);

export default RollbarProvider;
