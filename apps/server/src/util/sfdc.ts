import * as jsforce from 'jsforce';
import { SF_API_VERSION } from '../constants';
import { ConnectionOptions, SalesforceConnection } from '../models/models';

export const getOAuth2 = (loginUrl?: string) => {
  return new jsforce.OAuth2({
    loginUrl: loginUrl || 'https://login.salesforce.com',
    clientId: process.env.clientId,
    clientSecret: process.env.clientSecret,
    redirectUri: process.env.redirectUri,
  });
};

export const initConnection = (
  authInfo: Partial<SalesforceConnection>,
  version = SF_API_VERSION.version
) => {
  if (!version) {
    version = SF_API_VERSION.version;
  }
  const connData: ConnectionOptions = {
    oauth2: getOAuth2(authInfo.loginUrl),
    instanceUrl: authInfo.instanceUrl,
    accessToken: authInfo.accessToken,
    refreshToken: authInfo.refreshToken,
    maxRequest: 5,
    version,
  };
  return new jsforce.Connection(connData);
};
