"use client";

import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { PenLine, Sun, Moon, Plus, X, CalendarDays } from 'lucide-react';
import { DateRange, PlannerNote } from '@/app/interfaces';

interface ActionTimelineProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
  selectionRange: DateRange;
  setSelectionRange: (range: DateRange) => void;
  setCurrentDate: (date: Date) => void;
}

const ActionTimeline: React.FC<ActionTimelineProps> = ({ isDarkMode, toggleTheme, selectionRange, setSelectionRange, setCurrentDate }) => {
  const [savedNotes, setSavedNotes] = useState<PlannerNote[]>([]);
  const [newNoteInput, setNewNoteInput] = useState<string>("");

  useEffect(() => {
    const storedNotes = localStorage.getItem('timeline_calendar_notes');
    if (storedNotes) {
      try {
        const parsed = JSON.parse(storedNotes);
        setSavedNotes(parsed.map((n: any) => ({
          ...n, 
          startDate: n.startDate ? new Date(n.startDate) : null, 
          endDate: n.endDate ? new Date(n.endDate) : null,
        })));
      } catch (e) { setSavedNotes([]); }
    }
  }, []);

  const addNote = () => {
    if (newNoteInput.trim()) {
      const newNote: PlannerNote = { 
        id: Math.random().toString(36).substr(2, 9), 
        text: newNoteInput.trim(), 
        startDate: selectionRange.start, 
        endDate: selectionRange.end 
      };
      const updated = [...savedNotes, newNote];
      setSavedNotes(updated);
      localStorage.setItem('timeline_calendar_notes', JSON.stringify(updated));
      setNewNoteInput("");
    }
  };

  const removeNote = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const updated = savedNotes.filter(x => x.id !== id);
    setSavedNotes(updated);
    localStorage.setItem('timeline_calendar_notes', JSON.stringify(updated));
  }

  return (
    <div className={`p-8 md:p-10 border-b flex flex-col h-auto md:h-[42%] transition-colors duration-500 ${isDarkMode ? 'border-white/5 bg-[#161616]' : 'border-stone-100 bg-stone-50/50'}`}>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2 text-stone-400">
          <PenLine size={16} />
          <h3 className="text-xs font-bold tracking-[0.2em] uppercase">Timeline & Notes</h3>
        </div>
        <button onClick={toggleTheme} className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all text-xs font-bold border shadow-sm ${isDarkMode ? 'bg-white/10 border-white/10 text-yellow-400' : 'bg-white border-stone-200 text-stone-600'}`}>
          {isDarkMode ? <Sun size={14} /> : <Moon size={14} />}
          <span>{isDarkMode ? 'Light' : 'Dark'}</span>
        </button>
      </div>

      <div className="flex gap-2 mb-6">
        <input 
          type="text" 
          value={newNoteInput} 
          onChange={e => setNewNoteInput(e.target.value)}
          placeholder="Select range & add note..."
          className={`flex-grow px-5 py-3 text-sm rounded-xl outline-none border transition-all ${isDarkMode ? 'bg-[#222] border-white/10 text-white focus:border-white/30' : 'bg-white border-stone-200 text-stone-800 focus:border-stone-400'}`}
          onKeyPress={e => e.key === 'Enter' && addNote()}
        />
        <button onClick={addNote} className={`p-4 rounded-xl shadow-lg transition-all ${isDarkMode ? 'bg-white text-black' : 'bg-stone-900 text-white'}`}>
          <Plus size={20} strokeWidth={2.5}/>
        </button>
      </div>

      <div className="flex-grow overflow-y-auto custom-scrollbar space-y-3 pr-2">
        {savedNotes.length === 0 ? (
          <p className="text-sm italic text-stone-400">No events yet.</p>
        ) : (
          savedNotes.map(n => (
            <div key={n.id} onClick={() => { if(n.startDate) setCurrentDate(n.startDate); setSelectionRange({start: n.startDate, end: n.endDate}); }} className={`p-4 rounded-2xl border cursor-pointer group transition-all ${isDarkMode ? 'bg-[#1e1e1e] border-white/5 hover:border-white/10' : 'bg-white border-stone-100 hover:border-stone-300'}`}>
              <div className="flex justify-between items-start">
                <p className={`text-sm font-medium ${isDarkMode ? 'text-stone-200' : 'text-stone-700'}`}>{n.text}</p>
                <button onClick={(e) => removeNote(e, n.id)} className="text-stone-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><X size={16} /></button>
              </div>
              {n.startDate && <div className="text-[10px] font-bold text-stone-400 mt-2 uppercase flex items-center gap-2"><CalendarDays size={12}/> {format(n.startDate, 'MMM d')} - {n.endDate ? format(n.endDate, 'MMM d') : '...'}</div>}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ActionTimeline;