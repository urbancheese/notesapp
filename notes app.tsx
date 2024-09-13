import React, { useState } from 'react';

interface Note {
  id: number;
  title: string;
  content: string;
}

const NotesApp = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editingNote) {
      setNotes(notes.map(note => note.id === editingNote.id ? { ...note, title, content } : note));
      setEditingNote(null);
    } else {
      if (notes.some(note => note.title.toLowerCase().trim() === title.toLowerCase().trim())) {
        setError('A note with this title already exists');
      } else {
        setNotes([...notes, { id: notes.length + 1, title, content }]);
        setError('');
      }
    }
    setTitle('');
    setContent('');
  };

  const handleDelete = (id: number) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const handleEdit = (note: Note) => {
    setEditingNote(note);
    setTitle(note.title);
    setContent(note.content);
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Notes App</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Title"
          className="block w-full p-2 mb-2 border border-gray-300 rounded"
        />
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="Content"
          className="block w-full p-2 mb-2 border border-gray-300 rounded"
        />
        <button
          type="submit"
          disabled={!title.trim() || !content.trim() || (notes.some(note => note.title.toLowerCase().trim() === title.toLowerCase().trim()) && !editingNote)}
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${!title.trim() || !content.trim() || (notes.some(note => note.title.toLowerCase().trim() === title.toLowerCase().trim()) && !editingNote) ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {editingNote ? 'Save' : 'Create'}
        </button>
      </form>
      <ul>
        {notes.map(note => (
          <li key={note.id} className="mb-4">
            <h2 className="text-lg font-bold">{note.title}</h2>
            <p>{note.content}</p>
            <button
              onClick={() => handleEdit(note)}
              className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(note.id)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotesApp;