import React from 'react';
import { User, Camera, Share2, LogOut, Award, ShieldCheck, Edit2, Save, X } from 'lucide-react';
import { storage } from '../storage';
import { UserProfile } from '../types';

export const ProfileSection: React.FC = () => {
  const [profile, setProfile] = React.useState<UserProfile>(storage.getUserProfile());
  const [isEditing, setIsEditing] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleSave = () => {
    storage.setUserProfile(profile);
    setIsEditing(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile({ ...profile, photo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Discipline Master',
        text: 'Check out this premium discipline tracking app!',
        url: window.location.href,
      });
    } else {
      alert('Sharing not supported on this browser. Copy the URL to share!');
    }
  };

  return (
    <div className="p-4 space-y-8 pb-24">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold gold-text-gradient">My Profile</h2>
        {!isEditing && (
          <button 
            onClick={() => setIsEditing(true)}
            className="p-2 rounded-full bg-dark-card gold-border flex items-center gap-2 text-gold text-sm font-bold"
          >
            <Edit2 className="w-4 h-4" />
            Edit Profile
          </button>
        )}
      </div>

      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <div className="w-32 h-32 rounded-full gold-border p-1">
            <div className="w-full h-full rounded-full bg-dark-card flex items-center justify-center overflow-hidden">
              {profile.photo ? (
                <img src={profile.photo} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <User className="w-16 h-16 text-gold opacity-40" />
              )}
            </div>
          </div>
          {isEditing && (
            <>
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 p-2 rounded-full bg-gold text-dark-bg shadow-lg"
              >
                <Camera className="w-5 h-5" />
              </button>
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*" 
                onChange={handleImageChange}
              />
            </>
          )}
        </div>

        {isEditing ? (
          <div className="w-full max-w-xs space-y-4">
            <div className="space-y-1">
              <label className="text-xs text-gray-500 uppercase tracking-widest ml-2">Name</label>
              <input 
                type="text" 
                className="w-full bg-dark-card border border-gold/30 rounded-xl p-3 text-center text-white outline-none focus:border-gold"
                value={profile.name}
                onChange={e => setProfile({...profile, name: e.target.value})}
                autoFocus
              />
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => {
                  setProfile(storage.getUserProfile());
                  setIsEditing(false);
                }}
                className="flex-1 py-3 bg-dark-card border border-gray-700 text-gray-400 rounded-xl font-bold flex items-center justify-center gap-2"
              >
                <X className="w-4 h-4" />
                Cancel
              </button>
              <button 
                onClick={handleSave}
                className="flex-1 py-3 bg-gold text-dark-bg rounded-xl font-bold flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <h3 className="text-2xl font-bold flex items-center justify-center gap-2">
              {profile.name}
            </h3>
            <p className="text-gold text-sm font-medium tracking-widest uppercase mt-1">Discipline Master</p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-dark-card p-4 rounded-2xl gold-border text-center space-y-1">
          <Award className="w-6 h-6 text-gold mx-auto mb-1" />
          <p className="text-2xl font-bold">Level 5</p>
          <p className="text-xs text-gray-500 uppercase">Current Rank</p>
        </div>
        <div className="bg-dark-card p-4 rounded-2xl gold-border text-center space-y-1">
          <ShieldCheck className="w-6 h-6 text-gold mx-auto mb-1" />
          <p className="text-2xl font-bold">Gold</p>
          <p className="text-xs text-gray-500 uppercase">Membership</p>
        </div>
      </div>

      <div className="space-y-3">
        <button 
          onClick={handleShare}
          className="w-full p-4 rounded-2xl bg-dark-card gold-border flex items-center justify-between group"
        >
          <div className="flex items-center gap-4">
            <div className="p-2 rounded-lg bg-gold/10 text-gold">
              <Share2 className="w-5 h-5" />
            </div>
            <span className="font-semibold">Share App</span>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-gold transition-colors" />
        </button>

        <button 
          className="w-full p-4 rounded-2xl bg-dark-card gold-border flex items-center justify-between group"
        >
          <div className="flex items-center gap-4">
            <div className="p-2 rounded-lg bg-red-500/10 text-red-500">
              <LogOut className="w-5 h-5" />
            </div>
            <span className="font-semibold text-red-500">Logout</span>
          </div>
        </button>
      </div>
    </div>
  );
};

const ChevronRight = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
);
