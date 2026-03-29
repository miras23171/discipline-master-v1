import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Dumbbell, Droplets, Heart, Timer, ChevronRight, ArrowRight } from 'lucide-react';
import { storage } from '../storage';
import { DailyLog } from '../types';
import { formatDate } from '../lib/utils';
import { HealthTips } from './HealthTips';

export const ExerciseSection: React.FC = () => {
  const today = formatDate(new Date());
  const [log, setLog] = React.useState<DailyLog>(storage.getLogForDate(today));
  const [isRunning, setIsRunning] = React.useState(false);
  const [seconds, setSeconds] = React.useState(0);
  const [showHealthTips, setShowHealthTips] = React.useState(false);

  React.useEffect(() => {
    let interval: any;
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds(s => s + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const toggleTimer = () => {
    if (isRunning) {
      const mins = Math.floor(seconds / 60);
      const newLog = { ...log, exerciseMinutes: log.exerciseMinutes + mins };
      setLog(newLog);
      storage.saveDailyLog(newLog);
      setSeconds(0);
    }
    setIsRunning(!isRunning);
  };

  const addWater = () => {
    const newLog = { ...log, waterIntake: log.waterIntake + 1 };
    setLog(newLog);
    storage.saveDailyLog(newLog);
  };

  const workouts = [
    { name: 'Pushups', icon: '💪', reps: '3 sets of 15' },
    { name: 'Squats', icon: '🦵', reps: '3 sets of 20' },
    { name: 'Plank', icon: '🧘', reps: '3 sets of 1 min' },
    { name: 'Jumping Jacks', icon: '🏃', reps: '3 sets of 30' },
  ];

  const healthTips = [
    "Drink at least 8 glasses of water daily.",
    "Consistency is better than intensity.",
    "Always warm up before exercising.",
    "Listen to your body and rest when needed."
  ];

  return (
    <div className="p-4 space-y-6 pb-24">
      <h2 className="text-2xl font-bold gold-text-gradient">Exercise & Fitness</h2>

      <div className="bg-dark-card p-6 rounded-3xl gold-border flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-gray-400 text-sm">Session Timer</p>
          <div className="text-3xl font-mono text-gold">
            {Math.floor(seconds / 60).toString().padStart(2, '0')}:{(seconds % 60).toString().padStart(2, '0')}
          </div>
        </div>
        <button 
          onClick={toggleTimer}
          className={`px-6 py-2 rounded-full font-bold transition-all ${
            isRunning ? 'bg-red-500 text-white' : 'bg-gold text-dark-bg'
          }`}
        >
          {isRunning ? 'Stop' : 'Start'}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-dark-card p-4 rounded-2xl gold-border flex flex-col items-center text-center space-y-2">
          <Droplets className="w-8 h-8 text-blue-400" />
          <h3 className="font-semibold">Water Intake</h3>
          <p className="text-2xl font-bold text-gold">{log.waterIntake} <span className="text-sm font-normal text-gray-400">/ 8</span></p>
          <button onClick={addWater} className="w-full py-1 bg-blue-500/20 text-blue-400 rounded-lg text-sm font-bold">+ Add Glass</button>
        </div>
        <div className="bg-dark-card p-4 rounded-2xl gold-border flex flex-col items-center text-center space-y-2">
          <Timer className="w-8 h-8 text-orange-400" />
          <h3 className="font-semibold">Total Time</h3>
          <p className="text-2xl font-bold text-gold">{log.exerciseMinutes} <span className="text-sm font-normal text-gray-400">mins</span></p>
          <p className="text-xs text-gray-500">Today's goal: 30m</p>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <Dumbbell className="w-5 h-5 text-gold" />
          Home Workouts
        </h3>
        <div className="grid gap-3">
          {workouts.map(w => (
            <div key={w.name} className="bg-dark-card p-4 rounded-xl gold-border flex items-center gap-4">
              <span className="text-3xl">{w.icon}</span>
              <div className="flex-1">
                <h4 className="font-semibold">{w.name}</h4>
                <p className="text-sm text-gray-400">{w.reps}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </div>
          ))}
        </div>
      </div>

      <motion.div 
        whileTap={{ scale: 0.98 }}
        onClick={() => setShowHealthTips(true)}
        className="bg-gold/5 p-5 rounded-2xl border border-gold/20 space-y-3 cursor-pointer group"
      >
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-gold flex items-center gap-2 text-lg">
            <Heart className="w-5 h-5" />
            স্বাস্থ্য টিপস (Health Tips)
          </h3>
          <ArrowRight className="w-5 h-5 text-gold group-hover:translate-x-1 transition-transform" />
        </div>
        <p className="text-sm text-gray-300">
          সুস্থ জীবনযাপনের জন্য গুরুত্বপূর্ণ ১০টি স্বাস্থ্য টিপস দেখুন।
        </p>
      </motion.div>

      <AnimatePresence>
        {showHealthTips && (
          <HealthTips onClose={() => setShowHealthTips(false)} />
        )}
      </AnimatePresence>
    </div>
  );
};
