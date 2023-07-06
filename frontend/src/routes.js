const apiPath = '/api/v1';

export default {
  signInPath: () => [apiPath, 'login'].join('/'),
  dataPath: () => [apiPath, 'data'].join('/'),
};
