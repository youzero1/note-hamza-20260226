import { DataSource } from 'typeorm';
import { Note } from '../entities/Note';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: process.env.DATABASE_URL || './note.db',
  entities: [Note],
  synchronize: true, // For development; use migrations in production
  logging: true,
});

// Initialize the connection
AppDataSource.initialize().then(() => {
  console.log('Database connected');
}).catch(error => console.log('Database connection error:', error));