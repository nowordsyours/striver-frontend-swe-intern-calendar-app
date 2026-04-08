"use client";

import React, { useState } from 'react';
import { 
  format, addMonths, subMonths, startOfMonth, endOfMonth, 
  startOfWeek, endOfWeek, isSameMonth, isSameDay, isWithinInterval, 
  isAfter, isBefore, addDays, isToday, setYear, setMonth
} from 'date-fns';
import { ChevronLeft, ChevronRight, Zap, Gift } from 'lucide-react';
import { DateRange, SeasonTheme } from '@/app/interfaces';
import { indianHolidays, weekDaysLabel } from '@/app/calendar-data';

interface DateMatrixProps {
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
  selectionRange: DateRange;
  setSelectionRange: (range: DateRange) => void;
  activeTheme: SeasonTheme;
  isDarkMode: boolean;
}

const DateMatrix: React.FC<DateMatrixProps> = ({ currentDate, setCurrentDate, selectionRange, setSelectionRange, activeTheme, isDarkMode }) => {
  const [hoverDate, setHoverDate] = useState<Date | null>(null);
  const [showPicker, setShowPicker] = useState<'month' | 'year' | null>(null);

  const monthStart = startOfMonth(currentDate);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(endOfMonth(monthStart));
  const days: Date[] = [];
  let day = startDate;
  
  while (day <= endDate) { 
    days.push(day); 
    day = addDays(day, 1); 
  }

  const allMonths = Array.from({ length: 12 }, (_, i) => format(setMonth(new Date(), i), 'MMMM'));
  const allYears = Array.from({ length: 11 }, (_, i) => 2026 - 5 + i);
  const currentHoliday = indianHolidays.find(h => isSameDay(new Date(h.date), hoverDate || currentDate));

  const handleDateClick = (clickedDay: Date) => {
    if (!selectionRange.start || (selectionRange.start && selectionRange.end)) {
      setSelectionRange({ start: clickedDay, end: null });
    } else {
      if (isBefore(clickedDay, selectionRange.start)) {
        setSelectionRange({ start: clickedDay, end: selectionRange.start });
      } else {
        setSelectionRange({ ...selectionRange, end: clickedDay });
      }
    }
  };

  return (
    <div className={`p-8 md:p-10 flex flex-col justify-center flex-grow transition-colors duration-500 relative ${isDarkMode ? 'bg-[#121212]' : 'bg-white'}`}>
      <div className="flex justify-between items-center mb-10 relative">
        <div className="flex items-center gap-4">
          <h2 onClick={() => setShowPicker(showPicker === 'month' ? null : 'month')} className={`text-4xl md:text-5xl font-light cursor-pointer hover:opacity-60 transition-all ${isDarkMode ? 'text-white' : 'text-stone-900'}`}>{format(currentDate, 'MMMM')}</h2>
          <h3 onClick={() => setShowPicker(showPicker === 'year' ? null : 'year')} className={`text-xl md:text-2xl font-light cursor-pointer hover:opacity-60 transition-all ${isDarkMode ? 'text-stone-500' : 'text-stone-400'}`}>{format(currentDate, 'yyyy')}</h3>
        </div>

        {showPicker && (
          <div className={`absolute top-full left-0 z-[100] mt-2 w-full max-w-[300px] p-4 rounded-3xl shadow-2xl border grid ${showPicker === 'month' ? 'grid-cols-3' : 'grid-cols-4'} gap-2 ${isDarkMode ? 'bg-[#1e1e1e] border-white/10 text-white' : 'bg-white border-stone-100'}`}>
            {(showPicker === 'month' ? allMonths : allYears).map((item, i) => (
              <button key={item} onClick={() => { if(showPicker === 'month') setCurrentDate(setMonth(currentDate, i)); else setCurrentDate(setYear(currentDate, Number(item))); setShowPicker(null); }} className="py-2 text-xs font-bold rounded-xl hover:bg-stone-500/10 transition-all">{item}</button>
            ))}
          </div>
        )}

        {/* YE RAHI TERI DARK MODE WALI FIX KIYI HUI ARROWS */}
        <div className="flex gap-2">
          <button onClick={() => setCurrentDate(subMonths(currentDate, 1))} className={`p-3 border rounded-full transition-all ${isDarkMode ? 'border-white/10 hover:bg-white/20 text-white' : 'border-stone-200 hover:bg-stone-100 text-stone-600'}`}>
            <ChevronLeft size={20}/>
          </button>
          <button onClick={() => setCurrentDate(addMonths(currentDate, 1))} className={`p-3 border rounded-full transition-all ${isDarkMode ? 'border-white/10 hover:bg-white/20 text-white' : 'border-stone-200 hover:bg-stone-100 text-stone-600'}`}>
            <ChevronRight size={20}/>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 mb-4">
        {weekDaysLabel.map(wd => <div key={wd} className={`text-center text-[11px] font-black tracking-widest ${isDarkMode ? 'text-stone-700' : 'text-stone-300'}`}>{wd}</div>)}
      </div>

      <div className="grid grid-cols-7 gap-y-2 gap-x-1 relative h-auto min-h-[300px]">
        {days.map(d => {
          const isCur = isSameMonth(d, monthStart);
          const isSelStart = selectionRange.start && isSameDay(d, selectionRange.start);
          const isSelEnd = selectionRange.end && isSameDay(d, selectionRange.end);
          const isBetween = selectionRange.start && selectionRange.end && isWithinInterval(d, { start: selectionRange.start, end: selectionRange.end });
          const isHol = indianHolidays.find(h => isSameDay(new Date(h.date), d));

          return (
            <div key={d.toString()} className={`relative flex items-center justify-center h-14 w-full ${!isCur ? 'opacity-20' : ''}`}>
              {isBetween && isCur && <div className={`absolute inset-0 ${isDarkMode ? 'bg-white/5' : 'bg-stone-50'}`} />}
              <button 
                onClick={() => handleDateClick(d)} 
                onMouseEnter={() => setHoverDate(d)} 
                onMouseLeave={() => setHoverDate(null)}
                disabled={!isCur}
                className={`relative z-10 h-11 w-11 md:h-12 md:w-12 rounded-full flex items-center justify-center text-sm md:text-base transition-all
                  ${(isSelStart || isSelEnd) && isCur ? `${activeTheme.color} text-white shadow-xl scale-110 font-bold` : (isCur ? (isDarkMode ? 'text-stone-300 hover:bg-white/10' : 'text-stone-700 hover:bg-stone-200') : 'text-stone-500')}
                  ${isToday(d) && !isSelStart && !isSelEnd && isCur ? `ring-2 ring-offset-2 ${activeTheme.ring} ${isDarkMode ? 'ring-offset-[#121212]' : 'ring-offset-white'}` : ''}
                  ${isHol && isCur && !isSelStart && !isSelEnd ? 'bg-red-500/10 text-red-500 font-bold' : ''}
                `}
              > 
                {format(d, 'd')} 
              </button>
              {isHol && isCur && <div className={`absolute bottom-1 w-1 h-1 rounded-full ${isSelStart || isSelEnd ? 'bg-white' : 'bg-red-500'}`} />}
            </div>
          );
        })}
      </div>

      <div className={`mt-8 pt-6 border-t border-stone-100 flex justify-between items-center text-xs tracking-wide ${isDarkMode ? 'border-white/5' : ''}`}>
         <div className="flex items-center gap-2">
           {currentHoliday ? <Gift size={14} className="text-red-500" /> : <Zap size={14} className={isDarkMode ? 'text-stone-500' : 'text-stone-400'} />}
           <span className={isDarkMode ? 'text-stone-400' : 'text-stone-500 font-medium'}> 
              {currentHoliday ? `Holiday: ${currentHoliday.name}` : selectionRange.start ? `Active: ${format(selectionRange.start, 'MMM d')}` : 'Plan your month.'} 
           </span>
         </div>
         {selectionRange.start && <button onClick={() => setSelectionRange({start:null, end:null})} className="font-bold text-stone-400 hover:text-black uppercase tracking-widest transition-colors">Clear</button>}
      </div>
    </div>
  );
};

export default DateMatrix;