import React from 'react';
import { motion } from 'motion/react';
import { Play, Square, BookOpen, Plus, Trash2, Calendar } from 'lucide-react';
import { storage } from '../storage';
import { BookPlan, DailyLog } from '../types';
import { formatDate } from '../lib/utils';

export const ReadingSection: React.FC = () => {
  const [isRunning, setIsRunning] = React.useState(false);
  const [seconds, setSeconds] = React.useState(0);
  const [plans, setPlans] = React.useState<BookPlan[]>(storage.getBookPlans());
  const [showAddPlan, setShowAddPlan] = React.useState(false);
  const [newPlan, setNewPlan] = React.useState({ title: '', day: 'Monday', time: '10:00' });

  const today = formatDate(new Date());
  const [log, setLog] = React.useState<DailyLog>(storage.getLogForDate(today));

  React.useEffect(() => {
    let interval: any;
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds(s => s + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const handleStop = () => {
    setIsRunning(false);
    const minutesRead = Math.floor(seconds / 60);
    const newLog = {
      ...log,
      readingMinutes: log.readingMinutes + minutesRead,
    };
    setLog(newLog);
    storage.saveDailyLog(newLog);
    setSeconds(0);
  };

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const addPlan = () => {
    if (!newPlan.title) return;
    const plan: BookPlan = {
      id: Date.now().toString(),
      ...newPlan
    };
    storage.saveBookPlan(plan);
    setPlans(storage.getBookPlans());
    setShowAddPlan(false);
    setNewPlan({ title: '', day: 'Monday', time: '10:00' });
  };

  const deletePlan = (id: string) => {
    storage.deleteBookPlan(id);
    setPlans(storage.getBookPlans());
  };

  return (
    <div className="p-4 space-y-6 pb-24">
      <h2 className="text-2xl font-bold gold-text-gradient">Reading (Books)</h2>

      <div className="bg-dark-card p-8 rounded-3xl gold-border flex flex-col items-center justify-center space-y-6">
        <div className="text-6xl font-mono text-gold">{formatTime(seconds)}</div>
        <div className="flex gap-4">
          {!isRunning ? (
            <button 
              onClick={() => setIsRunning(true)}
              className="w-16 h-16 rounded-full bg-gold text-dark-bg flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.4)]"
            >
              <Play className="w-8 h-8 fill-current" />
            </button>
          ) : (
            <button 
              onClick={handleStop}
              className="w-16 h-16 rounded-full bg-red-500 text-white flex items-center justify-center"
            >
              <Square className="w-8 h-8 fill-current" />
            </button>
          )}
        </div>
        <p className="text-gray-400">Today: {log.readingMinutes} mins read</p>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <Calendar className="w-5 h-5 text-gold" />
            Reading Plans
          </h3>
          <button 
            onClick={() => setShowAddPlan(true)}
            className="p-2 rounded-full bg-gold/10 text-gold"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        {showAddPlan && (
          <div className="bg-dark-card p-4 rounded-2xl gold-border space-y-3">
            <input 
              type="text" 
              placeholder="Book Title"
              className="w-full bg-dark-bg border border-gray-700 rounded-lg p-2 text-white outline-none focus:border-gold"
              value={newPlan.title}
              onChange={e => setNewPlan({...newPlan, title: e.target.value})}
            />
            <div className="flex gap-2">
              <select 
                className="flex-1 bg-dark-bg border border-gray-700 rounded-lg p-2 text-white outline-none"
                value={newPlan.day}
                onChange={e => setNewPlan({...newPlan, day: e.target.value})}
              >
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
              <input 
                type="time"
                className="flex-1 bg-dark-bg border border-gray-700 rounded-lg p-2 text-white outline-none"
                value={newPlan.time}
                onChange={e => setNewPlan({...newPlan, time: e.target.value})}
              />
            </div>
            <div className="flex gap-2">
              <button onClick={() => setShowAddPlan(false)} className="flex-1 py-2 text-gray-400">Cancel</button>
              <button onClick={addPlan} className="flex-1 py-2 bg-gold text-dark-bg rounded-lg font-bold">Add</button>
            </div>
          </div>
        )}

        <div className="grid gap-3">
          {plans.map(plan => (
            <div key={plan.id} className="bg-dark-card p-4 rounded-xl gold-border flex justify-between items-center">
              <div>
                <h4 className="font-semibold">{plan.title}</h4>
                <p className="text-sm text-gray-400">{plan.day} at {plan.time}</p>
              </div>
              <button onClick={() => deletePlan(plan.id)} className="text-red-500 opacity-60 hover:opacity-100">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
          {plans.length === 0 && (
            <p className="text-center text-gray-500 py-4">No plans yet. Start planning!</p>
          )}
        </div>
      </div>
    </div>
  );
};
