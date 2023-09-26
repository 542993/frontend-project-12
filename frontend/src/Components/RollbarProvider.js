import React from 'react';
import { Provider, ErrorBoundary } from '@rollbar/react';

const rollbarConfig = {
  accessToken: '92bf07b1b0654985bc4fecf668e08806',
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
