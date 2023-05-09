import * as jsforce from 'jsforce';
import { SF_API_VERSION } from '../constants';
import { ConnectionOptions } from '../models/models';

export const initConnection = (connectionOptions: ConnectionOptions) => {
  const options = { ...connectionOptions, version: SF_API_VERSION };
  options.oauth2 = {
    clientId: options.clientId,
    clientSecret: options.clientSecret,
    loginUrl: options.loginUrl,
    redirectUri: options.redirectUri,
  };
  return new jsforce.Connection(options);
};
