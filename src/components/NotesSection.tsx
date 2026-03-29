import React from 'react';
import { motion } from 'motion/react';
import { Plus, Trash2, Edit3, Save, X } from 'lucide-react';
import { storage } from '../storage';
import { Note } from '../types';

export const NotesSection: React.FC = () => {
  const [notes, setNotes] = React.useState<Note[]>(storage.getNotes());
  const [editingNote, setEditingNote] = React.useState<Note | null>(null);
  const [isAdding, setIsAdding] = React.useState(false);

  const saveNote = () => {
    if (!editingNote?.title) return;
    storage.saveNote(editingNote);
    setNotes(storage.getNotes());
    setEditingNote(null);
    setIsAdding(false);
  };

  const deleteNote = (id: string) => {
    storage.deleteNote(id);
    setNotes(storage.getNotes());
  };

  const startNewNote = () => {
    setEditingNote({
      id: Date.now().toString(),
      title: '',
      content: '',
      createdAt: Date.now(),
    });
    setIsAdding(true);
  };

  return (
    <div className="p-4 space-y-6 pb-24">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold gold-text-gradient">Personal Notes</h2>
        <button 
          onClick={startNewNote}
          className="p-2 rounded-full bg-gold text-dark-bg"
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>

      {(isAdding || editingNote) && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-dark-card p-4 rounded-2xl gold-border space-y-4"
        >
          <input 
            type="text" 
            placeholder="Note Title"
            className="w-full bg-dark-bg border border-gray-700 rounded-lg p-3 text-white outline-none focus:border-gold font-bold"
            value={editingNote?.title || ''}
            onChange={e => setEditingNote(prev => prev ? {...prev, title: e.target.value} : null)}
          />
          <textarea 
            placeholder="Write your thoughts..."
            rows={6}
            className="w-full bg-dark-bg border border-gray-700 rounded-lg p-3 text-white outline-none focus:border-gold resize-none"
            value={editingNote?.content || ''}
            onChange={e => setEditingNote(prev => prev ? {...prev, content: e.target.value} : null)}
          />
          <div className="flex gap-2">
            <button 
              onClick={() => { setEditingNote(null); setIsAdding(false); }}
              className="flex-1 py-3 rounded-xl bg-gray-800 text-gray-400 font-bold flex items-center justify-center gap-2"
            >
              <X className="w-5 h-5" /> Cancel
            </button>
            <button 
              onClick={saveNote}
              className="flex-1 py-3 rounded-xl bg-gold text-dark-bg font-bold flex items-center justify-center gap-2"
            >
              <Save className="w-5 h-5" /> Save Note
            </button>
          </div>
        </motion.div>
      )}

      <div className="grid gap-4">
        {notes.sort((a, b) => b.createdAt - a.createdAt).map(note => (
          <div key={note.id} className="bg-dark-card p-4 rounded-2xl gold-border space-y-2 group">
            <div className="flex justify-between items-start">
              <h3 className="font-bold text-lg text-gold">{note.title}</h3>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => setEditingNote(note)} className="p-1 text-gray-400 hover:text-gold">
                  <Edit3 className="w-4 h-4" />
                </button>
                <button onClick={() => deleteNote(note.id)} className="p-1 text-gray-400 hover:text-red-500">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <p className="text-gray-300 text-sm line-clamp-3 whitespace-pre-wrap">{note.content}</p>
            <p className="text-[10px] text-gray-500 uppercase tracking-wider">
              {new Date(note.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
        {notes.length === 0 && !isAdding && (
          <div className="text-center py-12 space-y-4">
            <div className="w-16 h-16 bg-dark-card rounded-full gold-border flex items-center justify-center mx-auto opacity-40">
              <Edit3 className="w-8 h-8 text-gold" />
            </div>
            <p className="text-gray-500">Your thoughts deserve a space. Create your first note!</p>
          </div>
        )}
      </div>
    </div>
  );
};
