import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Heart, Sparkles } from 'lucide-react';

interface HealthTipsProps {
  onClose: () => void;
}

export const HealthTips: React.FC<HealthTipsProps> = ({ onClose }) => {
  const tips = [
    "১. প্রতিদিন অন্তত ৩০ মিনিট ব্যায়াম করুন। এটি শরীরকে ফিট ও সুস্থ রাখে।",
    "২. প্রতিদিন পর্যাপ্ত পানি পান করুন (কমপক্ষে ২-৩ লিটার)। এটি শরীরকে হাইড্রেটেড রাখে।",
    "৩. প্রতিদিন ৭-৮ ঘণ্টা ঘুমান। ভালো ঘুম মানসিক ও শারীরিক স্বাস্থ্যের জন্য খুবই গুরুত্বপূর্ণ।",
    "৪. প্রতিদিন সময়মতো নামাজ ও মেডিটেশন করুন। এটি মনকে শান্ত রাখে।",
    "৫. ফাস্ট ফুড কম খান এবং পুষ্টিকর খাবার বেশি খান।",
    "৬. প্রতিদিন কিছু সময় হাঁটাহাঁটি করুন, এতে শরীর ও মন দুটোই ভালো থাকে।",
    "৭. অতিরিক্ত মোবাইল ব্যবহার এড়িয়ে চলুন এবং চোখের যত্ন নিন।",
    "৮. প্রতিদিন ফলমূল ও শাকসবজি খান।",
    "৯. মানসিক চাপ কমানোর জন্য নিজের পছন্দের কাজ করুন।",
    "১০. সব সময় পজিটিভ চিন্তা করুন এবং নিজেকে মোটিভেটেড রাখুন।"
  ];

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed inset-0 z-50 bg-dark-bg flex flex-col"
    >
      <header className="p-4 flex items-center gap-4 border-b border-gray-800 bg-dark-bg/80 backdrop-blur-md sticky top-0 z-10">
        <button 
          onClick={onClose}
          className="p-2 rounded-full bg-dark-card gold-border"
        >
          <ArrowLeft className="w-6 h-6 text-gold" />
        </button>
        <h2 className="text-xl font-bold gold-text-gradient">স্বাস্থ্য টিপস</h2>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-12">
        <div className="flex flex-col items-center justify-center py-6 space-y-2">
          <div className="w-16 h-16 rounded-full gold-gradient flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.3)]">
            <Heart className="w-8 h-8 text-dark-bg" />
          </div>
          <p className="text-gold font-medium tracking-widest uppercase text-xs">Healthy Lifestyle</p>
        </div>

        <div className="grid gap-4">
          {tips.map((tip, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-dark-card p-5 rounded-2xl gold-border relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                <Sparkles className="w-12 h-12 text-gold" />
              </div>
              <p className="text-lg leading-relaxed text-gray-200 font-medium">
                {tip}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="pt-8 text-center">
          <p className="text-sm text-gray-500 italic">"সুস্থ শরীর, সুন্দর মন"</p>
          <div className="mt-4 flex justify-center">
            <div className="w-12 h-1 bg-gold/30 rounded-full" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
