import React from 'react';
import { motion } from 'motion/react';
import { Moon, Clock, Book } from 'lucide-react';

interface SplashScreenProps {
  onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  React.useEffect(() => {
    const timer = setTimeout(onFinish, 3000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-dark-bg"
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative mb-8"
      >
        <div className="relative w-32 h-32 flex items-center justify-center rounded-full gold-border bg-dark-card shadow-[0_0_30px_rgba(212,175,55,0.3)]">
          <Moon className="absolute top-4 w-12 h-12 text-gold" />
          <Clock className="absolute bottom-4 left-4 w-8 h-8 text-gold opacity-80" />
          <Book className="absolute bottom-4 right-4 w-8 h-8 text-gold opacity-80" />
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold gold-text-gradient mb-2">
          Assalamu Alaikum
        </h1>
        <p className="text-xl text-gray-300 mb-8">আপনাকে স্বাগতম</p>
        
        <div className="mt-12">
          <p className="text-sm tracking-[0.2em] text-gold uppercase opacity-60">
            Created by Miras
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};
