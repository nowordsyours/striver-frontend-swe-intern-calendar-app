import { HolidayItem, SeasonTheme } from './interfaces';

export const indianHolidays: HolidayItem[] = [
  { date: '2026-01-26', name: 'Republic Day' },
  { date: '2026-03-03', name: 'Holi' },
  { date: '2026-08-15', name: 'Independence Day' },
  { date: '2026-10-02', name: 'Gandhi Jayanti' },
  { date: '2026-11-08', name: 'Diwali' },
  { date: '2026-12-25', name: 'Christmas' },
];

export const yearlyThemes: SeasonTheme[] = [
  { season: 'Winter', imgId: '1035', color: 'bg-indigo-600', ring: 'ring-indigo-500' },
  { season: 'Winter', imgId: '883', color: 'bg-slate-700', ring: 'ring-slate-400' },
  { season: 'Spring', imgId: '152', color: 'bg-emerald-600', ring: 'ring-emerald-500' },
  { season: 'Spring', imgId: '306', color: 'bg-green-600', ring: 'ring-green-500' },
  { season: 'Spring', imgId: '327', color: 'bg-teal-600', ring: 'ring-teal-500' },
  { season: 'Summer', imgId: '1011', color: 'bg-sky-500', ring: 'ring-sky-500' },
  { season: 'Summer', imgId: '124', color: 'bg-blue-600', ring: 'ring-blue-500' },
  { season: 'Summer', imgId: '319', color: 'bg-amber-500', ring: 'ring-amber-500' },
  { season: 'Autumn', imgId: '1043', color: 'bg-orange-600', ring: 'ring-orange-500' },
  { season: 'Autumn', imgId: '1081', color: 'bg-red-600', ring: 'ring-red-500' },
  { season: 'Autumn', imgId: '1048', color: 'bg-stone-700', ring: 'ring-stone-400' },
  { season: 'Winter', imgId: '1057', color: 'bg-purple-600', ring: 'ring-purple-500' },
];

export const weekDaysLabel = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];