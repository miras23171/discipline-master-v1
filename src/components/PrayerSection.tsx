import React from 'react';
import { motion } from 'motion/react';
import { 
  CheckCircle2, 
  ExternalLink, 
  RefreshCw,
  ChevronRight,
  Moon
} from 'lucide-react';
import { storage } from '../storage';
import { DailyLog } from '../types';
import { formatDate } from '../lib/utils';

export const PrayerSection: React.FC = () => {
  const today = formatDate(new Date());
  const [log, setLog] = React.useState<DailyLog>(storage.getLogForDate(today));
  const [prayerTimes, setPrayerTimes] = React.useState({
    Fajr: '04:45 AM',
    Dhuhr: '12:15 PM',
    Asr: '03:45 PM',
    Maghrib: '06:15 PM',
    Isha: '07:45 PM',
  });
  const [isAuto, setIsAuto] = React.useState(false);

  const togglePrayer = (name: string) => {
    const newLog = {
      ...log,
      prayers: {
        ...log.prayers,
        [name]: !log.prayers[name],
      },
    };
    setLog(newLog);
    storage.saveDailyLog(newLog);
  };

  const fetchAutoTimes = async () => {
    setIsAuto(true);
    // In a real app, use geolocation and a prayer time API
    // For now, simulate a fetch
    setTimeout(() => {
      setPrayerTimes({
        Fajr: '04:42 AM',
        Dhuhr: '12:12 PM',
        Asr: '03:42 PM',
        Maghrib: '06:12 PM',
        Isha: '07:42 PM',
      });
    }, 1000);
  };

  const prayers = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];

  return (
    <div className="p-4 space-y-6 pb-24">
      <header className="flex justify-between items-center">
        <h2 className="text-2xl font-bold gold-text-gradient">Prayer (Namaz)</h2>
        <button 
          onClick={fetchAutoTimes}
          className="p-2 rounded-full bg-dark-card gold-border"
        >
          <RefreshCw className={`w-5 h-5 text-gold ${isAuto ? 'animate-spin' : ''}`} />
        </button>
      </header>

      <div className="grid gap-4">
        {prayers.map((name) => (
          <motion.div
            key={name}
            whileTap={{ scale: 0.98 }}
            onClick={() => togglePrayer(name)}
            className={`flex items-center justify-between p-4 rounded-2xl gold-border transition-colors ${
              log.prayers[name] ? 'bg-gold/10' : 'bg-dark-card'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                log.prayers[name] ? 'border-gold bg-gold' : 'border-gray-600'
              }`}>
                {log.prayers[name] && <CheckCircle2 className="w-4 h-4 text-dark-bg" />}
              </div>
              <div>
                <h3 className="font-semibold text-lg">{name}</h3>
                <p className="text-sm text-gray-400">{prayerTimes[name as keyof typeof prayerTimes]}</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </motion.div>
        ))}
      </div>

      <div className="bg-dark-card p-4 rounded-2xl gold-border space-y-4">
        <h3 className="font-semibold text-gold flex items-center gap-2">
          <ExternalLink className="w-4 h-4" />
          Quick Links
        </h3>
        <button 
          onClick={() => window.open('https://quran.com', '_blank')}
          className="w-full py-3 rounded-xl bg-gold text-dark-bg font-bold flex items-center justify-center gap-2"
        >
          Read Holy Quran
        </button>
      </div>

      <div className="bg-dark-card p-4 rounded-2xl gold-border">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold">30-Day Streak</h3>
          <span className="text-gold font-bold">{storage.getStreak()} Days</span>
        </div>
        <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
          <div 
            className="bg-gold h-full transition-all duration-500" 
            style={{ width: `${Math.min((storage.getStreak() / 30) * 100, 100)}%` }} 
          />
        </div>
      </div>
    </div>
  );
};
