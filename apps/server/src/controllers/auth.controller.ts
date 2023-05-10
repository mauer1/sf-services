import { NextFunction, Request, Response } from 'express';
import * as jsforce from 'jsforce';
import { AuthResponse, SalesforceConnection } from '../models/models';
import { initConnection } from '../util/sfdc';

export const getSfAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const username = process.env.SFDC_USERNAME;
  const password = process.env.SFDC_PASSWORD;
  const authResponse: AuthResponse = {
    loginUrl: '',
    refreshToken: '',
    accessToken: '',
    instanceUrl: '',
    organizationId: '',
    conn: null,
  };

  try {
    const conn = new jsforce.Connection({
      loginUrl: process.env.SFDC_LOGIN_URL,
      clientId: process.env.SFDC_CLIENT_ID,
      clientSecret: process.env.SFDC_CLIENT_SECRET,
      redirectUri: process.env.SFDC_REDIRECT_URI,
    });

    conn.on('refresh', function (accessToken) {
      conn.refreshToken = accessToken;
    });

    const connection = await conn.login(
      username,
      password,
      function (err, userInfo) {
        if (err) {
          return console.error(err);
        }
      }
    );

    authResponse.loginUrl = conn.loginUrl;
    authResponse.accessToken = conn.accessToken;
    authResponse.refreshToken = conn.refreshToken;
    authResponse.instanceUrl = conn.instanceUrl;
    authResponse.organizationId = conn.organizationId;
    authResponse.conn = connection;
    req['auth'] = authResponse;
    console.debug('[auth.controller][getSfAuth][set authResponse]');
    next();
  } catch (ex) {
    console.error(ex);
  }
  return authResponse;
};

export const callback = async (req, res) => {
  console.debug('[auth.controller][processing callback]');
  const conn = new jsforce.Connection({ oauth2: req.oauth2 });
  const code = req.param('code');
  conn.authorize(code, function (err, userInfo) {
    if (err) {
      return console.error(err);
    }
    res.send('success');
  });
};

export const getSfdcConnection = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const auth: AuthResponse = req['auth'];
  const instanceUrl = auth.instanceUrl;
  const loginUrl = auth.loginUrl;
  const refreshToken = auth.refreshToken;
  const accessToken = auth.accessToken;
  if (instanceUrl && accessToken) {
    const authInfo: Partial<SalesforceConnection> = {
      loginUrl,
      instanceUrl,
      accessToken,
      refreshToken,
    };
    console.debug('[auth.controller][getSfdcConnection][set connection');
    req['sfdcConnection'] = initConnection(authInfo, req.get('apiVersion'));
  }
  next();
};
