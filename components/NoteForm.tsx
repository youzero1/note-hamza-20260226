import React, { useState } from 'react';
import styles from '../styles/NoteForm.module.css';

interface NoteFormProps {
  onSubmit: (title: string, content: string) => void;
  initialTitle?: string;
  initialContent?: string;
}

const NoteForm: React.FC<NoteFormProps> = ({ onSubmit, initialTitle = '', initialContent = '' }) => {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && content.trim()) {
      onSubmit(title, content);
    } else {
      alert('Title and content are required');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className={styles.input}
        />
      </div>
      <div>
        <label>Content:</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          className={styles.textarea}
        />
      </div>
      <button type="submit" className={styles.button}>Submit</button>
    </form>
  );
};

export default NoteForm;