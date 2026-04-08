export interface DateRange {
  start: Date | null;
  end: Date | null;
}

export interface PlannerNote {
  id: string;
  text: string;
  startDate: Date | null;
  endDate: Date | null;
}

export interface HolidayItem {
  date: string;
  name: string;
}

export interface SeasonTheme {
  season: string;
  imgId: string;
  color: string;
  ring: string;
}