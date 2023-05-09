import * as jsforce from 'jsforce';

export interface SfApiVersion {
  label: string;
  url: string;
  version: string;
}

export interface AuthResponse {
  conn: jsforce.Connection;
  accessToken: string;
  instanceUrl: string;
  organizationId: string;
}

export interface oAuth2Options {
  clientId?: string;
  clientSecret?: string;
  loginUrl?: string;
  redirectUri?: string;
}

export interface ConnectionOptions {
  clientId?: string;
  clientSecret?: string;
  loginUrl?: string;
  redirectUrl?: string;
  accessToken?: string;
  callOptions?: object;
  instanceUrl?: string;
  proxyUrl?: string;
  redirectUri?: string;
  refreshToken?: string;
  serverUrl?: string;
  sessionId?: string;
  version?: string;
  oauth2?: Partial<oAuth2Options>;
}
