import { NextApiRequest, NextApiResponse } from 'next';
import { AppDataSource } from '../../../utilities/database';
import { Note } from '../../../entities/Note';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }

  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const noteRepository = AppDataSource.getRepository(Note);
      const note = await noteRepository.findOneBy({ id: parseInt(id as string) });
      if (note) {
        res.status(200).json(note);
      } else {
        res.status(404).json({ error: 'Note not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch note' });
    }
  } else if (req.method === 'PUT') {
    try {
      const { title, content } = req.body;
      const noteRepository = AppDataSource.getRepository(Note);
      let note = await noteRepository.findOneBy({ id: parseInt(id as string) });
      if (note) {
        note.title = title;
        note.content = content;
        await noteRepository.save(note);
        res.status(200).json(note);
      } else {
        res.status(404).json({ error: 'Note not found' });
      }
    } catch (error) {
      res.status(400).json({ error: 'Failed to update note' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const noteRepository = AppDataSource.getRepository(Note);
      const result = await noteRepository.delete(parseInt(id as string));
      if (result.affected && result.affected > 0) {
        res.status(204).end();
      } else {
        res.status(404).json({ error: 'Note not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete note' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}