import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Logo } from './Logo';
import {
  HeartPulse,
  ShieldCheck,
  Zap,
  Globe,
  Eye,
  User as UserIcon,
  PlayCircle,
  Stethoscope,
  Building2,
  Activity,
  AlertTriangle,
  ChevronDown
} from 'lucide-react';
import { RoleType, Language } from '../../types';

export const Header: React.FC = () => {
  const {
    role,
    setRole,
    currentUser,
    bitcoinAnchor,
    triggerSOS,
    isSosActive,
    language,
    setLanguage,
    isSeniorMode,
    toggleSeniorMode
  } = useApp();

  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const roleConfigs: { id: RoleType; label: string; icon: React.ReactNode; color: string }[] = [
    { id: 'presentation', label: 'Script Démo (15 min)', icon: <PlayCircle className="w-4 h-4" />, color: 'bg-emerald-600 text-white' },
    { id: 'patient', label: 'Espace Patient', icon: <UserIcon className="w-4 h-4" />, color: 'bg-blue-600 text-white' },
    { id: 'doctor', label: 'Espace Médecin', icon: <Stethoscope className="w-4 h-4" />, color: 'bg-teal-600 text-white' },
    { id: 'admin', label: 'Admin Clinique', icon: <Building2 className="w-4 h-4" />, color: 'bg-purple-600 text-white' },
    { id: 'superadmin', label: 'Super Admin National', icon: <Activity className="w-4 h-4" />, color: 'bg-slate-900 text-white' }
  ];

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'fr', label: 'Français', flag: '🇧🇯' },
    { code: 'fon', label: 'Fɔngbe (Fon)', flag: '🌴' },
    { code: 'yoruba', label: 'Yorùbá', flag: '☀️' },
    { code: 'en', label: 'English', flag: '🌐' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all">
      {/* Top micro-bar with Bitcoin network proof & live anchors */}
      <div className="bg-[#001E2B] text-slate-300 text-xs px-4 py-1.5 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-[#00D26A] font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#00D26A] animate-pulse"></span>
            Réseau National Santé+ En Ligne
          </span>
          <span className="hidden md:inline text-slate-400">|</span>
          <span className="hidden md:flex items-center gap-1 text-slate-300 font-mono text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#F7931A]" />
            Bitcoin Block #{bitcoinAnchor.blockHeight} (OP_RETURN ancré)
          </span>
          <span className="hidden lg:inline text-slate-400">|</span>
          <span className="hidden lg:flex items-center gap-1 text-slate-300 font-mono text-[11px]">
            <Zap className="w-3.5 h-3.5 text-[#00D26A]" />
            Lightning Network : 0.1% frais · 2 sec
          </span>
        </div>

        <div className="flex items-center gap-3 ml-auto">
          {/* Senior / Accessibility Toggle */}
          <button
            onClick={toggleSeniorMode}
            className={`flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium transition ${
              isSeniorMode ? 'bg-amber-400 text-slate-900 font-bold' : 'hover:text-white bg-slate-800 text-slate-300'
            }`}
            title="Mode Senior : Grands textes & contrastes renforcés"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Mode Senior {isSeniorMode ? 'Actif' : ''}</span>
          </button>

          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center gap-1 px-2 py-0.5 rounded text-[11px] bg-slate-800 hover:bg-slate-700 text-slate-200 transition"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-400" />
              <span>{languages.find(l => l.code === language)?.flag} {languages.find(l => l.code === language)?.label}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {langMenuOpen && (
              <div className="absolute right-0 mt-1 w-44 bg-white text-slate-800 rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 animate-in fade-in zoom-in-95">
                <div className="px-3 py-1 text-[10px] uppercase font-bold text-slate-400 border-b border-slate-100">
                  Langues Disponibles
                </div>
                {languages.map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                      setLangMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-50 transition ${
                      language === lang.code ? 'font-bold text-[#00D26A] bg-emerald-50/50' : ''
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>{lang.flag}</span>
                      <span>{lang.label}</span>
                    </span>
                    {language === lang.code && <span className="text-xs">✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          
          {/* Brand Logo & Slogan */}
          <div className="flex items-center gap-3">
            <button onClick={() => setRole('presentation')} className="text-left focus:outline-hidden">
              <Logo size="md" />
            </button>
          </div>

          {/* Interactive Role Switcher Selector */}
          <div className="hidden md:flex items-center bg-slate-100/90 p-1 rounded-2xl border border-slate-200 shadow-inner">
            {roleConfigs.map(item => {
              const isActive = role === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setRole(item.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? `${item.color} shadow-sm scale-[1.02]`
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Quick SOS Trigger & User Profile */}
          <div className="flex items-center gap-3">
            {/* Urgent SOS Button */}
            <button
              onClick={triggerSOS}
              className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-2xl font-bold text-xs sm:text-sm text-white transition-all transform active:scale-95 shadow-md ${
                isSosActive
                  ? 'bg-rose-600 animate-bounce shadow-rose-500/50'
                  : 'bg-gradient-to-r from-red-600 to-rose-500 hover:from-red-700 hover:to-rose-600 shadow-red-500/20'
              }`}
            >
              <HeartPulse className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
              <span>{isSosActive ? 'SOS EN COURS' : 'URGENCE 3 MIN'}</span>
            </button>

            {/* User Profile Snapshot */}
            <div className="hidden lg:flex items-center gap-2.5 pl-2 border-l border-slate-200">
              <img
                src={currentUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&fit=crop&q=80'}
                alt={currentUser.name}
                className="w-9 h-9 rounded-full object-cover border-2 border-emerald-500 ring-2 ring-emerald-100"
              />
              <div className="text-left leading-tight">
                <div className="text-xs font-bold text-slate-800 line-clamp-1">{currentUser.name}</div>
                <div className="text-[11px] text-slate-500 font-medium capitalize">
                  {currentUser.role === 'patient' ? (
                    <span className="text-blue-600 font-semibold">Patient · O+</span>
                  ) : currentUser.role === 'doctor' ? (
                    <span className="text-teal-600 font-semibold">{currentUser.specialty}</span>
                  ) : currentUser.role === 'admin' ? (
                    <span className="text-purple-600 font-semibold">Clinique Ste-Marie</span>
                  ) : currentUser.role === 'superadmin' ? (
                    <span className="text-slate-800 font-semibold">Équipe Winners · PO</span>
                  ) : (
                    <span>Démo Live</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Role Switcher Scrollable row */}
        <div className="flex md:hidden overflow-x-auto pb-2 pt-1 gap-1.5 no-scrollbar">
          {roleConfigs.map(item => (
            <button
              key={item.id}
              onClick={() => setRole(item.id)}
              className={`whitespace-nowrap flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                role === item.id ? item.color : 'bg-slate-100 text-slate-700'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};
