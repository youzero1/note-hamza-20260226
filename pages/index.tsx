import { useEffect, useState } from 'react';
import Link from 'next/link';
import NoteList from '../components/NoteList';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetch('/api/notes')
      .then(res => res.json())
      .then(data => setNotes(data))
      .catch(error => console.error('Error fetching notes:', error));
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this note?')) {
      try {
        await fetch(`/api/notes/${id}`, { method: 'DELETE' });
        setNotes(notes.filter(note => note.id !== id));
      } catch (error) {
        console.error('Error deleting note:', error);
      }
    }
  };

  return (
    <div className={styles.container}>
      <h1>Notes</h1>
      <Link href="/create">
        <a>Create New Note</a>
      </Link>
      <NoteList notes={notes} onDelete={handleDelete} />
    </div>
  );
}