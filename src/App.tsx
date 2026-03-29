import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Moon, 
  Book, 
  Dumbbell, 
  FileText, 
  BarChart3, 
  User as UserIcon,
  Settings as SettingsIcon
} from 'lucide-react';
import { SplashScreen } from './components/SplashScreen';
import { PrayerSection } from './components/PrayerSection';
import { ReadingSection } from './components/ReadingSection';
import { ExerciseSection } from './components/ExerciseSection';
import { NotesSection } from './components/NotesSection';
import { SummarySection } from './components/SummarySection';
import { ProfileSection } from './components/ProfileSection';
import { Settings } from './components/Settings';
import { cn } from './lib/utils';

type Section = 'prayer' | 'reading' | 'exercise' | 'notes' | 'summary' | 'profile';

export default function App() {
  const [showSplash, setShowSplash] = React.useState(true);
  const [activeSection, setActiveSection] = React.useState<Section>('prayer');
  const [showSettings, setShowSettings] = React.useState(false);

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  const navItems = [
    { id: 'prayer', icon: Moon, label: 'Prayer' },
    { id: 'reading', icon: Book, label: 'Read' },
    { id: 'exercise', icon: Dumbbell, label: 'Fit' },
    { id: 'notes', icon: FileText, label: 'Notes' },
    { id: 'summary', icon: BarChart3, label: 'Stats' },
    { id: 'profile', icon: UserIcon, label: 'User' },
  ];

  const renderSection = () => {
    switch (activeSection) {
      case 'prayer': return <PrayerSection />;
      case 'reading': return <ReadingSection />;
      case 'exercise': return <ExerciseSection />;
      case 'notes': return <NotesSection />;
      case 'summary': return <SummarySection />;
      case 'profile': return <ProfileSection />;
      default: return <PrayerSection />;
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg text-white max-w-md mx-auto relative overflow-hidden flex flex-col">
      {/* Header */}
      <header className="p-4 flex justify-between items-center bg-dark-bg/80 backdrop-blur-md sticky top-0 z-30">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg gold-gradient flex items-center justify-center">
            <Moon className="w-5 h-5 text-dark-bg" />
          </div>
          <h1 className="text-lg font-bold gold-text-gradient">Discipline Master</h1>
        </div>
        <button 
          onClick={() => setShowSettings(true)}
          className="p-2 rounded-full bg-dark-card gold-border"
        >
          <SettingsIcon className="w-5 h-5 text-gold" />
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderSection()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-dark-card/90 backdrop-blur-lg border-t border-gold/20 px-2 py-3 z-40">
        <div className="flex justify-around items-center">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id as Section)}
                className="flex flex-col items-center gap-1 relative group"
              >
                <div className={cn(
                  "p-2 rounded-xl transition-all duration-300",
                  isActive ? "bg-gold text-dark-bg shadow-[0_0_15px_rgba(212,175,55,0.4)]" : "text-gray-500 group-hover:text-gold/60"
                )}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className={cn(
                  "text-[10px] font-bold uppercase tracking-tighter transition-all",
                  isActive ? "text-gold" : "text-gray-600"
                )}>
                  {item.label}
                </span>
                {isActive && (
                  <motion.div 
                    layoutId="nav-indicator"
                    className="absolute -top-3 w-1 h-1 bg-gold rounded-full"
                  />
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Settings Overlay */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-50"
          >
            <Settings onClose={() => setShowSettings(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
