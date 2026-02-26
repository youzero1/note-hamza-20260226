import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import NoteForm from '../../components/NoteForm';
import styles from '../../styles/Edit.module.css';

export default function EditNote() {
  const router = useRouter();
  const { id } = router.query;
  const [note, setNote] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`/api/notes/${id}`)
        .then(res => res.json())
        .then(data => setNote(data))
        .catch(error => console.error('Error fetching note:', error));
    }
  }, [id]);

  const handleSubmit = async (title: string, content: string) => {
    try {
      const res = await fetch(`/api/notes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content }),
      });
      if (res.ok) {
        router.push('/');
      } else {
        alert('Failed to update note');
      }
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  if (!note) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <h1>Edit Note</h1>
      <NoteForm
        onSubmit={handleSubmit}
        initialTitle={note.title}
        initialContent={note.content}
      />
    </div>
  );
}