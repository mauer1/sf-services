import * as jsforce from 'jsforce';

export interface SfApiVersion {
  label: string;
  url: string;
  version: string;
}

export interface AuthResponse {
  conn: jsforce.Connection;
  loginUrl: string;
  refreshToken: string;
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
  maxRequest?: number;
}

export interface SalesforceConnection {
  uniqueOrgId: string;
  accessToken: string;
  refreshToken: string;
  instanceUrl: string;
  loginUrl: string;
  user_id: string;
  organization_id: string;
  username: string;
  display_name: string;
  added: Date;
  label?: string;
  Name?: string;
  OrganizationType?: string;
  NamespacePrefix?: string;
  IsSandbox?: boolean;
  userInfo?: any;
  lastRefresh?: Date;
  authorizationError?: boolean;
  failedAttempts?: number;
  customUrl?: string;
  sessionId?: string;
}
