import * as jsforce from 'jsforce';
import { Request, Response } from 'express';
import { AuthResponse } from '../models/models';

export async function login(req: Request, res: Response): Promise<AuthResponse> {
  const username = process.env.SFDC_USERNAME;
  const password = process.env.SFDC_PASSWORD;
  const authResponse: AuthResponse = { accessToken: '', instanceUrl: '', organizationId: '' };

  try {
    const conn = new jsforce.Connection({
      oauth2: {
        loginUrl: process.env.SFDC_LOGIN_URL,
        clientId: process.env.SFDC_CLIENT_ID,
        clientSecret: process.env.SFDC_CLIENT_SECRET,
        redirectUri: process.env.SFDC_REDIRECT_URI,
      },
    });

    const auth = await conn.login(username, password);
    authResponse.accessToken = conn.accessToken;
    authResponse.instanceUrl = conn.instanceUrl;
    authResponse.organizationId = auth.organizationId;
  } catch (ex) {
    console.error(ex);
  }
  return authResponse;
}
