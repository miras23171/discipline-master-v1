import { DailyLog, UserProfile, BookPlan, Note, AppSettings } from './types';

const STORAGE_KEYS = {
  USER_PROFILE: 'dm_user_profile',
  DAILY_LOGS: 'dm_daily_logs',
  BOOK_PLANS: 'dm_book_plans',
  NOTES: 'dm_notes',
  SETTINGS: 'dm_settings',
};

export const storage = {
  getUserProfile: (): UserProfile => {
    const data = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
    return data ? JSON.parse(data) : { name: 'Guest User', photo: null };
  },
  setUserProfile: (profile: UserProfile) => {
    localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
  },

  getDailyLogs: (): DailyLog[] => {
    const data = localStorage.getItem(STORAGE_KEYS.DAILY_LOGS);
    return data ? JSON.parse(data) : [];
  },
  saveDailyLog: (log: DailyLog) => {
    const logs = storage.getDailyLogs();
    const index = logs.findIndex(l => l.date === log.date);
    if (index > -1) {
      logs[index] = log;
    } else {
      logs.push(log);
    }
    localStorage.setItem(STORAGE_KEYS.DAILY_LOGS, JSON.stringify(logs));
  },
  getLogForDate: (date: string): DailyLog => {
    const logs = storage.getDailyLogs();
    return logs.find(l => l.date === date) || {
      date,
      prayers: { Fajr: false, Dhuhr: false, Asr: false, Maghrib: false, Isha: false },
      readingMinutes: 0,
      exerciseMinutes: 0,
      waterIntake: 0,
    };
  },

  getBookPlans: (): BookPlan[] => {
    const data = localStorage.getItem(STORAGE_KEYS.BOOK_PLANS);
    return data ? JSON.parse(data) : [];
  },
  saveBookPlan: (plan: BookPlan) => {
    const plans = storage.getBookPlans();
    plans.push(plan);
    localStorage.setItem(STORAGE_KEYS.BOOK_PLANS, JSON.stringify(plans));
  },
  deleteBookPlan: (id: string) => {
    const plans = storage.getBookPlans().filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEYS.BOOK_PLANS, JSON.stringify(plans));
  },

  getNotes: (): Note[] => {
    const data = localStorage.getItem(STORAGE_KEYS.NOTES);
    return data ? JSON.parse(data) : [];
  },
  saveNote: (note: Note) => {
    const notes = storage.getNotes();
    const index = notes.findIndex(n => n.id === note.id);
    if (index > -1) {
      notes[index] = note;
    } else {
      notes.push(note);
    }
    localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(notes));
  },
  deleteNote: (id: string) => {
    const notes = storage.getNotes().filter(n => n.id !== id);
    localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(notes));
  },

  getSettings: (): AppSettings => {
    const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return data ? JSON.parse(data) : { notificationsEnabled: true };
  },
  saveSettings: (settings: AppSettings) => {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  },

  getStreak: (): number => {
    const logs = storage.getDailyLogs().sort((a, b) => b.date.localeCompare(a.date));
    let streak = 0;
    const today = new Date();
    
    for (let i = 0; i < 30; i++) {
      const d = new Date();
      d.setDate(today.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const log = logs.find(l => l.date === dateStr);
      
      if (log && Object.values(log.prayers).every(Boolean)) {
        streak++;
      } else if (i === 0) {
        // If today isn't finished, don't break streak yet, but don't count it
        continue;
      } else {
        break;
      }
    }
    return streak;
  }
};
