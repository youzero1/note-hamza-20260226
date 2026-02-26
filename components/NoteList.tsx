import React from 'react';
import Link from 'next/link';
import styles from '../styles/NoteList.module.css';

interface Note {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

interface NoteListProps {
  notes: Note[];
  onDelete: (id: number) => void;
}

const NoteList: React.FC<NoteListProps> = ({ notes, onDelete }) => {
  return (
    <ul className={styles.noteList}>
      {notes.map(note => (
        <li key={note.id} className={styles.noteItem}>
          <div>
            <h2>{note.title}</h2>
            <p>{note.content.substring(0, 100)}...</p>
            <small>Created: {new Date(note.createdAt).toLocaleString()}</small>
          </div>
          <div>
            <Link href={`/edit/${note.id}`}>
              <a>Edit</a>
            </Link>
            <button onClick={() => onDelete(note.id)}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default NoteList;