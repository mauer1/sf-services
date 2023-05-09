import { NextFunction, Request, Response } from 'express';
import { AuthResponse, ConnectionOptions } from '../models/models';
import { initConnection } from '../util/sfdc';

export const getSfConnection = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const username = process.env.SFDC_USERNAME;
  const password = process.env.SFDC_PASSWORD;
  const authResponse: AuthResponse = {
    accessToken: '',
    instanceUrl: '',
    organizationId: '',
    conn: null,
  };
  console.log('[getSfConnection]');

  try {
    const connectionOptions: ConnectionOptions = {
      loginUrl: process.env.SFDC_LOGIN_URL,
      clientId: process.env.SFDC_CLIENT_ID,
      clientSecret: process.env.SFDC_CLIENT_SECRET,
      redirectUri: process.env.SFDC_REDIRECT_URI,
    };
    const conn = initConnection(connectionOptions);
    conn.on('refresh', function (accessToken) {
      conn.refreshToken = accessToken;
    });

    req['sfConnection'] = await conn.login(username, password);
    authResponse.conn = conn;
    authResponse.accessToken = conn.accessToken;
    authResponse.instanceUrl = conn.instanceUrl;
    authResponse.organizationId = req['sfConnection'].organizationId;
    next();
  } catch (ex) {
    console.error(ex);
  }
  return authResponse;
};

export const query = async (req: Request, res: Response) => {
  const conn = req['sfConnection'];
  if (conn) {
    conn.query('SELECT ID, Name from Account', function (err, results) {
      if (err) {
        return console.error(err);
      }
      res.status(200);
      res.json({ data: results });
    });
  } else {
    console.error('[sfdc.controller][query] No connection information found.');
  }
};
