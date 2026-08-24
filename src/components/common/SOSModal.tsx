import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  HeartPulse,
  PhoneCall,
  MapPin,
  ShieldAlert,
  Clock,
  Ambulance,
  X,
  AlertOctagon,
  CheckCircle2
} from 'lucide-react';

export const SOSModal: React.FC = () => {
  const { isSosActive, cancelSOS, sosCountdown, hospitals } = useApp();

  if (!isSosActive) return null;

  const minutes = Math.floor(sosCountdown / 60);
  const seconds = sosCountdown % 60;
  const nearestHosp = hospitals[0]; // Clinique Sainte-Marie (1.2km)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-red-500 animate-in zoom-in-95 duration-200">
        
        {/* Header Alert Banner */}
        <div className="bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white p-6 relative">
          <button
            onClick={cancelSOS}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-2 rounded-full hover:bg-white/20 transition"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-white/20 rounded-2xl animate-pulse">
              <HeartPulse className="w-8 h-8 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-white text-red-700 font-extrabold text-xs px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  URGENCE 3 MINUTES
                </span>
                <span className="text-red-100 text-xs font-medium">Protocole National Santé+</span>
              </div>
              <h2 className="text-2xl font-black mt-1">Intervention Médicale d'Urgence</h2>
            </div>
          </div>
          
          <p className="text-sm text-red-100 mt-2">
            Signal de détresse géolocalisé transmis instantanément au SAMU Bénin et à la clinique la plus proche.
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {/* Live Countdown & Target */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-red-600 text-white flex flex-col items-center justify-center font-mono font-bold shadow-md">
                <span className="text-xl leading-none">
                  {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                </span>
                <span className="text-[9px] uppercase tracking-tighter opacity-80 mt-0.5">Objectif</span>
              </div>
              <div>
                <div className="text-xs font-bold text-red-800 uppercase flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-red-600" />
                  Prise en charge
                </div>
                <div className="text-sm font-semibold text-slate-800 mt-0.5">
                  Arrivée équipe sous 3 min
                </div>
                <div className="text-xs text-slate-500">Dispatch en cours...</div>
              </div>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md">
                <Ambulance className="w-7 h-7 animate-bounce" />
              </div>
              <div>
                <div className="text-xs font-bold text-emerald-800 uppercase flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                  Unité Assignée
                </div>
                <div className="text-sm font-bold text-slate-800 mt-0.5">
                  {nearestHosp.name}
                </div>
                <div className="text-xs text-emerald-700 font-semibold">
                  Distance : {nearestHosp.distanceKm} km · Contact direct
                </div>
              </div>
            </div>
          </div>

          {/* Transmitted Medical Passport Info */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-emerald-600" />
                Données Vitales Transmises aux Secouristes
              </span>
              <span className="text-[11px] font-mono bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md font-bold">
                NPI: 1097885544901
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
                <div className="text-[11px] text-slate-500 font-medium">Groupe Sanguin</div>
                <div className="text-lg font-black text-red-600">O+ (Donneur)</div>
              </div>
              <div className="bg-white p-3 rounded-xl border border-red-300 shadow-xs bg-red-50/40">
                <div className="text-[11px] text-red-600 font-bold flex items-center justify-center gap-1">
                  <AlertOctagon className="w-3.5 h-3.5" />
                  Allergie Majeure
                </div>
                <div className="text-base font-extrabold text-red-700">PÉNICILLINE</div>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
                <div className="text-[11px] text-slate-500 font-medium">Antécédent</div>
                <div className="text-sm font-bold text-slate-800">Appendicectomie</div>
              </div>
            </div>

            <div className="text-xs text-slate-600 flex items-center gap-2 pt-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Coordonnées GPS : <strong>6.3578° N, 2.4182° E (Haie Vive, Cotonou)</strong></span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <a
              href="tel:112"
              className="flex-1 bg-red-600 hover:bg-red-700 text-white font-extrabold py-3.5 px-6 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-red-600/30 transition text-base"
            >
              <PhoneCall className="w-5 h-5 animate-pulse" />
              <span>Appeler le SAMU (112 / 118)</span>
            </a>

            <button
              onClick={cancelSOS}
              className="bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold py-3.5 px-6 rounded-2xl transition"
            >
              Désactiver l'alerte
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
