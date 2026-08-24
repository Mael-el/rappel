import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  User,
  ShieldCheck,
  Phone,
  Mail,
  MapPin,
  Heart,
  AlertTriangle,
  Fingerprint,
  CheckCircle2,
  Lock,
  Save,
  Globe
} from 'lucide-react';
import { soundFX, triggerConfetti } from '../../utils/audioAndFx';

export const PatientProfileView: React.FC = () => {
  const { currentUser, language, setLanguage } = useApp();
  const [biometricsEnabled, setBiometricsEnabled] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    soundFX.playSuccess();
    triggerConfetti();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-200">
      
      {/* Header Bar */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Paramètres du Compte Citoyen
            </span>
            <span className="text-xs text-slate-400 font-semibold">Identité Sécurisée</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 mt-1">
            Profil & Sécurité Biométrique
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Gérez vos informations personnelles, contacts de secours et préférences d'accessibilité.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-mono font-bold px-3 py-1.5 rounded-xl">
            NPI: {currentUser.npi || '1097885544901'}
          </span>
        </div>
      </div>

      {savedSuccess && (
        <div className="bg-emerald-600 text-white p-4 rounded-2xl shadow-md flex items-center gap-3 animate-in slide-in-from-top-2">
          <CheckCircle2 className="w-5 h-5" />
          <span className="text-xs font-bold">Modifications enregistrées et chiffrées avec succès.</span>
        </div>
      )}

      {/* Main Profile Form */}
      <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left Column: Personal & Medical Info */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4 text-xs">
          <h3 className="font-extrabold text-sm text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3 flex items-center gap-2">
            <User className="w-4 h-4 text-emerald-600" />
            Informations Personnelles
          </h3>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Nom & Prénoms</label>
            <input
              type="text"
              defaultValue={currentUser.name}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Numéro de Téléphone (Mobile Money)</label>
            <input
              type="text"
              defaultValue={currentUser.phone}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Adresse Email</label>
            <input
              type="email"
              defaultValue={currentUser.email}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Groupe Sanguin</label>
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl font-black text-red-700">
                {currentUser.bloodType || 'O+'} (Donneur)
              </div>
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Allergie Déclarée</label>
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl font-black text-rose-700">
                {currentUser.allergies?.join(', ') || 'PÉNICILLINE'}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Biometrics & Emergency Contacts */}
        <div className="space-y-6 text-xs">
          
          {/* Biometrics Box */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
            <h3 className="font-extrabold text-sm text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3 flex items-center gap-2">
              <Fingerprint className="w-4 h-4 text-purple-600" />
              Sécurité & Biométrie
            </h3>

            <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
              <div>
                <span className="font-extrabold text-slate-900 block">Face ID / Empreinte Digitale</span>
                <span className="text-[11px] text-slate-500">Connexion rapide en 1 seconde</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  soundFX.playBeep(900, 0.04);
                  setBiometricsEnabled(!biometricsEnabled);
                }}
                className={`w-12 h-6 rounded-full transition-colors relative ${
                  biometricsEnabled ? 'bg-emerald-600' : 'bg-slate-300'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition-transform transform shadow-sm ${
                    biometricsEnabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Emergency Contacts */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-3">
            <h3 className="font-extrabold text-sm text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3 flex items-center gap-2">
              <Heart className="w-4 h-4 text-red-600" />
              Contacts d'Urgence (Prévenus lors du SOS)
            </h3>

            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
              <div className="font-bold text-slate-900">Aimée Segnon (Épouse)</div>
              <div className="text-slate-500 font-mono">+229 97 45 12 89</div>
            </div>

            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
              <div className="font-bold text-slate-900">Dr. Jean Kodjo (Médecin Traitant)</div>
              <div className="text-slate-500 font-mono">+229 95 44 88 12 (Clinique Ste-Marie)</div>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-[#00D26A] hover:bg-[#00b55b] text-slate-950 font-extrabold py-3.5 px-6 rounded-2xl text-sm flex items-center justify-center gap-2 shadow-md transition"
          >
            <Save className="w-4 h-4" />
            <span>Enregistrer les Préférences</span>
          </button>
        </div>

      </form>
    </div>
  );
};
