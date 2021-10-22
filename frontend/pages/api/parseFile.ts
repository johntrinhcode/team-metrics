import { NextApiRequest, NextApiResponse } from 'next';

export default function parseFileHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(400).send({ message: 'Only POST requests allowed' });
  }

  res.status(200).send({ message: 'Success! '});
}