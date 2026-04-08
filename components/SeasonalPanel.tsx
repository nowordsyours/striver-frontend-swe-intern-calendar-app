"use client";

import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Clock, Sparkles } from 'lucide-react';
import { SeasonTheme } from '@/app/interfaces';
import styles from './SeasonalPanel.module.css'; // Optional, if you add specific CSS later

interface SeasonalPanelProps {
  currentDate: Date;
  activeTheme: SeasonTheme;
  isDarkMode: boolean;
}

const SeasonalPanel: React.FC<SeasonalPanelProps> = ({ currentDate, activeTheme, isDarkMode }) => {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const greeting = currentTime.getHours() < 12 ? 'Good Morning' : currentTime.getHours() < 18 ? 'Good Afternoon' : 'Good Evening';

  return (
    <div className="relative w-full md:w-[42%] h-72 md:h-full shrink-0 group">
      <img 
        key={currentDate.getMonth()}
        src={`https://picsum.photos/id/${activeTheme.imgId}/800/1200`}
        alt="Season"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[3000ms] group-hover:scale-105"
      />
      <div className={`absolute inset-0 bg-gradient-to-b ${isDarkMode ? 'from-black/60 via-black/20 to-black/90' : 'from-black/10 via-transparent to-black/60'}`} />
      
      <div className="absolute top-8 left-8 backdrop-blur-lg bg-black/30 p-5 rounded-[1.5rem] border border-white/10 text-white shadow-2xl z-20">
        <div className="flex items-center gap-2 mb-1">
          <Clock size={16} className="text-white/70" />
          <span className="text-[10px] font-black tracking-[0.2em] uppercase opacity-80">{greeting}</span>
        </div>
        <div className="text-2xl font-light tracking-tight">{format(currentTime, 'h:mm a')}</div>
      </div>

      <div className="absolute bottom-12 left-10 text-white z-10">
        <p className="text-[11px] font-bold tracking-[0.3em] uppercase mb-2 opacity-80 flex items-center gap-2">
          <Sparkles size={14} /> {activeTheme.season} Collection
        </p>
        <h1 className="text-5xl lg:text-7xl font-light tracking-tighter mb-2">{format(currentDate, 'MMMM')}</h1>
        <p className="text-sm font-medium tracking-[0.2em] opacity-70">{format(currentDate, 'yyyy')}</p>
      </div>
    </div>
  );
};

export default SeasonalPanel;