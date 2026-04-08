"use client";

import React, { useState, useEffect } from 'react';
import SeasonalPanel from './SeasonalPanel';
import ActionTimeline from './ActionTimeline';
import DateMatrix from './DateMatrix';
import { DateRange } from '@/app/interfaces';
import { yearlyThemes } from '@/app/calendar-data';

const DashboardBoard = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectionRange, setSelectionRange] = useState<DateRange>({ start: null, end: null });
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
    const storedTheme = localStorage.getItem('timeline_calendar_theme');
    if (storedTheme === 'dark') setIsDarkMode(true);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('timeline_calendar_theme', !isDarkMode ? 'dark' : 'light');
  };

  if (!isMounted) return null;

  const activeTheme = yearlyThemes[currentDate.getMonth()];

  return (
    <div className={`min-h-screen w-full flex items-center justify-center p-2 md:p-10 transition-colors duration-500 ${isDarkMode ? 'bg-black dark' : 'bg-gray-100'}`}>
      <div className={`flex flex-col md:flex-row w-full max-w-[1150px] md:h-[850px] rounded-[2.5rem] overflow-hidden shadow-2xl border ${isDarkMode ? 'bg-[#121212] border-white/5' : 'bg-white border-gray-100'}`}>
        
        <SeasonalPanel 
          currentDate={currentDate} 
          activeTheme={activeTheme} 
          isDarkMode={isDarkMode} 
        />

        <div className="flex flex-col w-full md:w-[58%] h-full bg-white dark:bg-transparent overflow-y-auto md:overflow-hidden relative">
          <ActionTimeline 
            isDarkMode={isDarkMode}
            toggleTheme={toggleTheme}
            selectionRange={selectionRange}
            setSelectionRange={setSelectionRange}
            setCurrentDate={setCurrentDate}
          />
          <DateMatrix 
            currentDate={currentDate}
            setCurrentDate={setCurrentDate}
            selectionRange={selectionRange}
            setSelectionRange={setSelectionRange}
            activeTheme={activeTheme}
            isDarkMode={isDarkMode}
          />
        </div>

      </div>
    </div>
  );
};

export default DashboardBoard;