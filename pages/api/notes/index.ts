import { NextApiRequest, NextApiResponse } from 'next';
import { AppDataSource } from '../../../utilities/database';
import { Note } from '../../../entities/Note';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }

  if (req.method === 'GET') {
    try {
      const noteRepository = AppDataSource.getRepository(Note);
      const notes = await noteRepository.find();
      res.status(200).json(notes);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch notes' });
    }
  } else if (req.method === 'POST') {
    try {
      const { title, content } = req.body;
      const noteRepository = AppDataSource.getRepository(Note);
      const note = noteRepository.create({ title, content });
      await noteRepository.save(note);
      res.status(201).json(note);
    } catch (error) {
      res.status(400).json({ error: 'Failed to create note' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}