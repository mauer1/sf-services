import { Request, Response } from 'express';

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
