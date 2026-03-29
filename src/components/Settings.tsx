import React from 'react';
import { 
  Bell, 
  Mail, 
  Info, 
  Download, 
  X, 
  ChevronRight,
  Shield,
  Star,
  ArrowLeft,
  Moon,
  Clock,
  Book
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { storage } from '../storage';
import { AppSettings } from '../types';

interface SettingsProps {
  onClose: () => void;
}

export const Settings: React.FC<SettingsProps> = ({ onClose }) => {
  const [settings, setSettings] = React.useState<AppSettings>(storage.getSettings());
  const [showAbout, setShowAbout] = React.useState(false);

  const toggleNotifications = () => {
    const newSettings = { ...settings, notificationsEnabled: !settings.notificationsEnabled };
    setSettings(newSettings);
    storage.saveSettings(newSettings);
  };

  const handleFeedback = () => {
    window.location.href = "mailto:mdmirasali10@gmail.com?subject=Discipline Master Feedback";
  };

  return (
    <div className="fixed inset-0 z-50 bg-dark-bg flex flex-col">
      <AnimatePresence mode="wait">
        {!showAbout ? (
          <motion.div 
            key="settings-main"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col h-full"
          >
            <header className="p-4 flex items-center justify-between border-b border-gray-800">
              <h2 className="text-xl font-bold gold-text-gradient">Settings</h2>
              <button onClick={onClose} className="p-2 rounded-full bg-dark-card">
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              <section className="space-y-3">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest px-2">General</h3>
                <div className="bg-dark-card rounded-2xl gold-border overflow-hidden">
                  <div className="p-4 flex items-center justify-between border-b border-gray-800">
                    <div className="flex items-center gap-4">
                      <Bell className="w-5 h-5 text-gold" />
                      <span className="font-medium">Notifications</span>
                    </div>
                    <button 
                      onClick={toggleNotifications}
                      className={`w-12 h-6 rounded-full transition-colors relative ${
                        settings.notificationsEnabled ? 'bg-gold' : 'bg-gray-700'
                      }`}
                    >
                      <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${
                        settings.notificationsEnabled ? 'left-7' : 'left-1'
                      }`} />
                    </button>
                  </div>
                  <div className="p-4 flex items-center justify-between" onClick={handleFeedback}>
                    <div className="flex items-center gap-4">
                      <Mail className="w-5 h-5 text-gold" />
                      <span className="font-medium">Feedback</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-600" />
                  </div>
                </div>
              </section>

              <section className="space-y-3">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest px-2">App Info</h3>
                <div className="bg-dark-card rounded-2xl gold-border overflow-hidden">
                  <div className="p-4 flex items-center justify-between border-b border-gray-800" onClick={() => setShowAbout(true)}>
                    <div className="flex items-center gap-4">
                      <Info className="w-5 h-5 text-gold" />
                      <span className="font-medium">About App</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-600" />
                  </div>
                  <div className="p-4 flex items-center justify-between" onClick={() => alert('Checking for updates...')}>
                    <div className="flex items-center gap-4">
                      <Download className="w-5 h-5 text-gold" />
                      <span className="font-medium">Check for Updates</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-600" />
                  </div>
                </div>
              </section>

              <section className="space-y-3">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest px-2">Privacy & Security</h3>
                <div className="bg-dark-card rounded-2xl gold-border overflow-hidden">
                  <div className="p-4 flex items-center justify-between border-b border-gray-800">
                    <div className="flex items-center gap-4">
                      <Shield className="w-5 h-5 text-gold" />
                      <span className="font-medium">Privacy Policy</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-600" />
                  </div>
                  <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Star className="w-5 h-5 text-gold" />
                      <span className="font-medium">Rate Us</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-600" />
                  </div>
                </div>
              </section>

              <div className="pt-8 text-center space-y-2">
                <p className="text-sm text-gray-500">Discipline Master Premium</p>
                <p className="text-xs tracking-[0.3em] text-gold uppercase opacity-60">
                  Created by Miras
                </p>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="about-screen"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="flex flex-col h-full"
          >
            <header className="p-4 flex items-center gap-4 border-b border-gray-800">
              <button onClick={() => setShowAbout(false)} className="p-2 rounded-full bg-dark-card">
                <ArrowLeft className="w-6 h-6 text-gray-400" />
              </button>
              <h2 className="text-xl font-bold gold-text-gradient">About App</h2>
            </header>

            <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center text-center space-y-8">
              <div className="relative w-32 h-32 flex items-center justify-center rounded-full gold-border bg-dark-card shadow-[0_0_30px_rgba(212,175,55,0.2)]">
                <Moon className="absolute top-4 w-12 h-12 text-gold" />
                <Clock className="absolute bottom-4 left-4 w-8 h-8 text-gold opacity-80" />
                <Book className="absolute bottom-4 right-4 w-8 h-8 text-gold opacity-80" />
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-bold gold-text-gradient">Discipline Master</h3>
                <p className="text-gray-400 leading-relaxed">
                  Discipline Master is a self-improvement app designed to help users build daily discipline through prayer, reading, exercise, and personal growth tracking.
                </p>
              </div>

              <div className="w-full bg-dark-card p-4 rounded-2xl gold-border space-y-2 text-left">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Version</span>
                  <span className="text-gold">1.0.0</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Last Updated</span>
                  <span className="text-gold">March 2026</span>
                </div>
              </div>

              <div className="mt-auto pt-12">
                <p className="text-sm tracking-[0.2em] text-gold uppercase opacity-60 font-bold">
                  Created by Miras
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
