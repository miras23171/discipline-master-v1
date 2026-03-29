export interface UserProfile {
  name: string;
  photo: string | null;
}

export interface Prayer {
  id: string;
  name: string;
  completed: boolean;
  time: string;
}

export interface DailyLog {
  date: string; // YYYY-MM-DD
  prayers: { [key: string]: boolean };
  readingMinutes: number;
  exerciseMinutes: number;
  waterIntake: number; // glasses
}

export interface BookPlan {
  id: string;
  title: string;
  day: string;
  time: string;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: number;
}

export interface AppSettings {
  notificationsEnabled: boolean;
}
