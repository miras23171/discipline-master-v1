import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';
import { storage } from '../storage';
import { formatDate } from '../lib/utils';
import { TrendingUp, Award, Calendar } from 'lucide-react';

export const SummarySection: React.FC = () => {
  const logs = storage.getDailyLogs();
  const today = formatDate(new Date());
  const todayLog = storage.getLogForDate(today);

  const chartData = React.useMemo(() => {
    // Get last 7 days
    const data = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = formatDate(d);
      const log = storage.getLogForDate(dateStr);
      
      const prayersDone = Object.values(log.prayers).filter(Boolean).length;
      
      data.push({
        name: d.toLocaleDateString('en-US', { weekday: 'short' }),
        prayers: prayersDone,
        reading: log.readingMinutes,
        exercise: log.exerciseMinutes,
      });
    }
    return data;
  }, [logs]);

  const stats = [
    { label: 'Prayers', value: `${Object.values(todayLog.prayers).filter(Boolean).length}/5`, color: 'text-gold' },
    { label: 'Reading', value: `${todayLog.readingMinutes}m`, color: 'text-blue-400' },
    { label: 'Exercise', value: `${todayLog.exerciseMinutes}m`, color: 'text-orange-400' },
  ];

  return (
    <div className="p-4 space-y-6 pb-24">
      <h2 className="text-2xl font-bold gold-text-gradient">Analytics & Summary</h2>

      <div className="grid grid-cols-3 gap-3">
        {stats.map(s => (
          <div key={s.label} className="bg-dark-card p-3 rounded-2xl gold-border text-center">
            <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">{s.label}</p>
            <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-dark-card p-4 rounded-2xl gold-border space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-gold" />
            Weekly Progress
          </h3>
          <span className="text-xs text-gray-500">Last 7 Days</span>
        </div>
        
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorGold" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
              <XAxis dataKey="name" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis hide />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1A1A1A', border: '1px solid #D4AF37', borderRadius: '8px' }}
                itemStyle={{ color: '#D4AF37' }}
              />
              <Area 
                type="monotone" 
                dataKey="reading" 
                stroke="#D4AF37" 
                fillOpacity={1} 
                fill="url(#colorGold)" 
                strokeWidth={3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-dark-card p-4 rounded-2xl gold-border space-y-4">
        <h3 className="font-semibold flex items-center gap-2">
          <Award className="w-4 h-4 text-gold" />
          Prayer Consistency
        </h3>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
              <XAxis dataKey="name" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis domain={[0, 5]} hide />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1A1A1A', border: '1px solid #D4AF37', borderRadius: '8px' }}
              />
              <Bar dataKey="prayers" fill="#D4AF37" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-gold/5 p-4 rounded-2xl border border-gold/20 flex items-center gap-4">
        <div className="w-12 h-12 rounded-full gold-gradient flex items-center justify-center text-dark-bg">
          <Calendar className="w-6 h-6" />
        </div>
        <div>
          <h4 className="font-bold text-gold">30-Day Challenge</h4>
          <p className="text-sm text-gray-400">You've completed 7 days of full discipline!</p>
        </div>
      </div>
    </div>
  );
};
