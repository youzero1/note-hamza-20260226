import { useState } from 'react';
import { useRouter } from 'next/router';
import NoteForm from '../components/NoteForm';
import styles from '../styles/Create.module.css';

export default function CreateNote() {
  const router = useRouter();

  const handleSubmit = async (title: string, content: string) => {
    try {
      const res = await fetch('/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content }),
      });
      if (res.ok) {
        router.push('/');
      } else {
        alert('Failed to create note');
      }
    } catch (error) {
      console.error('Error creating note:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Create New Note</h1>
      <NoteForm onSubmit={handleSubmit} />
    </div>
  );
}