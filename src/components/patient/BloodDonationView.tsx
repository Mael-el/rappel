import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Droplet,
  Heart,
  AlertTriangle,
  Award,
  MapPin,
  Clock,
  CheckCircle2,
  Share2,
  Navigation,
  ShieldCheck
} from 'lucide-react';
import { soundFX } from '../../utils/audioAndFx';
import { INITIAL_BLOOD_DONATIONS } from '../../data/mockData';

export const BloodDonationView: React.FC = () => {
  const { currentUser, bloodAlerts, respondToBloodAlert, openTxVerifier } = useApp();

  const parakouAlert = bloodAlerts.find(a => a.id === 'alert_001') || bloodAlerts[0];

  const handleConfirmAvailability = (alertId: string) => {
    respondToBloodAlert(alertId);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header Bar */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-red-100 text-red-800 text-xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
              <Droplet className="w-3.5 h-3.5 fill-red-600 text-red-600" />
              Réseau National des Donneurs de Sang
            </span>
            <span className="text-xs text-emerald-600 font-semibold">Sauvez des vies en temps réel</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 mt-1">
            Passeport Donneur de Sang de {currentUser.name}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Groupe Sanguin O+ (Donneur Universel pour globules rouges) · 10 dons certifiés sur Bitcoin.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl flex items-center gap-3">
            <span className="text-2xl">🏅</span>
            <div>
              <span className="text-[10px] text-amber-800 font-bold uppercase block">Badge d'Honneur</span>
              <span className="text-sm font-black text-amber-950">Donneur d'Or (10 Dons)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Urgent Blood Shortage SOS Notification Banner (Parakou O+ Shortage) */}
      <div className="p-6 bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white rounded-3xl shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/20 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center animate-pulse">
              <AlertTriangle className="w-7 h-7 text-white" />
            </div>
            <div>
              <span className="bg-white text-red-800 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                {parakouAlert.urgencyLevel}
              </span>
              <h2 className="text-xl font-black mt-1">
                Besoin Urgent de Sang O+ : {parakouAlert.hospitalName}
              </h2>
            </div>
          </div>

          <span className="text-xs font-mono bg-red-950/60 text-red-200 px-3 py-1 rounded-xl self-start">
            {parakouAlert.postedAt}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="bg-white/10 p-3 rounded-xl">
            <span className="text-red-200 block text-[10px] uppercase font-semibold">Localisation</span>
            <span className="font-bold text-white text-sm">{parakouAlert.city} (Borgou)</span>
          </div>
          <div className="bg-white/10 p-3 rounded-xl">
            <span className="text-red-200 block text-[10px] uppercase font-semibold">Groupe Requis</span>
            <span className="font-bold text-white text-sm">O+ (Compatible avec vous !)</span>
          </div>
          <div className="bg-white/10 p-3 rounded-xl">
            <span className="text-red-200 block text-[10px] uppercase font-semibold">Donneurs Compatibles</span>
            <span className="font-bold text-white text-sm">12 donneurs alertés</span>
          </div>
        </div>

        {/* Action Confirmation Button */}
        <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
          {parakouAlert.status === 'active' ? (
            <button
              onClick={() => handleConfirmAvailability(parakouAlert.id)}
              className="w-full sm:w-auto bg-white hover:bg-red-50 text-red-700 font-extrabold text-sm py-3.5 px-8 rounded-2xl flex items-center justify-center gap-2 shadow-lg transition transform hover:scale-[1.02] active:scale-98"
            >
              <Heart className="w-5 h-5 fill-red-600 text-red-600 animate-pulse" />
              <span>Se Rendre Disponible en 1 Clic (Transmettre GPS)</span>
            </button>
          ) : (
            <div className="bg-white/20 text-white font-extrabold text-xs py-3 px-6 rounded-2xl flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-300" />
              <span>Disponibilité Confirmée · Hôpital de Parakou Notifié</span>
            </div>
          )}

          <span className="text-xs text-red-100">
            Votre réponse est transmise instantanément au service des urgences transfusionnelles.
          </span>
        </div>
      </div>

      {/* Donation History Grid */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
        <h3 className="text-sm uppercase font-extrabold tracking-wider text-slate-500 flex items-center gap-2">
          <Droplet className="w-4 h-4 text-red-600" />
          Historique de mes 10 Dons de Sang
        </h3>

        <div className="space-y-3">
          {INITIAL_BLOOD_DONATIONS.map((don, idx) => (
            <div
              key={don.id}
              className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-red-100 text-red-700 flex items-center justify-center font-black">
                  #{10 - idx}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{don.location}</h4>
                  <p className="text-slate-500 text-xs">
                    {don.date} · Volume : <strong>{don.volumeMl} mL</strong> · Poche : <span className="font-mono">{don.bagId}</span>
                  </p>
                </div>
              </div>

              <button
                onClick={() => openTxVerifier(don.bitcoinTxid)}
                className="self-start sm:self-center font-mono text-[11px] text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-xl flex items-center gap-1.5 border border-emerald-200 font-semibold transition"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>TXID: {don.bitcoinTxid.substring(0, 10)}...</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
