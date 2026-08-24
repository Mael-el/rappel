import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Stethoscope,
  Users,
  Clock,
  Pill,
  ShieldCheck,
  Calendar,
  Sparkles,
  Bot,
  AlertTriangle,
  ArrowRight,
  Activity,
  CheckCircle2
} from 'lucide-react';
import { soundFX } from '../../utils/audioAndFx';

export const DoctorDashboard: React.FC = () => {
  const { setDoctorTab, waitingPatients } = useApp();

  const handleOpenConsultation = (patientId?: string) => {
    soundFX.playBeep(900, 0.04);
    setDoctorTab('consultation');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* 1. Doctor Header Info */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&fit=crop&q=80"
            alt="Dr. Jean Kodjo"
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-teal-500 shadow-md ring-4 ring-teal-50"
          />
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-black text-slate-900">
                Dr. Jean Kodjo
              </h1>
              <span className="bg-teal-100 text-teal-900 text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 font-mono">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                Matricule: MED-BJ-89104
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              🏥 Clinique Sainte-Marie (Cotonou) · Médecine Générale & Urgences · 4.8 ⭐
            </p>
          </div>
        </div>

        {/* Quick Consultation Trigger */}
        <button
          onClick={() => handleOpenConsultation()}
          className="w-full md:w-auto bg-gradient-to-r from-teal-600 to-[#00D26A] hover:from-teal-700 hover:to-[#00b55b] text-slate-950 font-black px-6 py-4 rounded-2xl text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition transform hover:scale-[1.02] active:scale-95"
        >
          <Stethoscope className="w-5 h-5" />
          <span>Lancer Consultation Express 2-Min</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* 2. Today's Clinical Key Performance Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Metric 1 */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">File d'Attente</span>
            <Users className="w-4 h-4 text-teal-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">
            {waitingPatients.length} Patients
          </div>
          <span className="text-[11px] text-teal-700 font-semibold block">
            1 En salle d'attente prioritaire
          </span>
        </div>

        {/* Metric 2 */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Consultations Jour</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">
            8 / 12
          </div>
          <span className="text-[11px] text-emerald-700 font-semibold block">
            Temps moyen : 2 min 45s
          </span>
        </div>

        {/* Metric 3 */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Ordonnances</span>
            <Pill className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">
            15 émises
          </div>
          <span className="text-[11px] text-purple-700 font-semibold block">
            100% horodatées Bitcoin
          </span>
        </div>

        {/* Metric 4 */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Assistant IA</span>
            <Sparkles className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">
            Actif
          </div>
          <span className="text-[11px] text-amber-700 font-semibold block">
            Aide au diagnostic Gemini
          </span>
        </div>

      </div>

      {/* 3. Waiting Room Preview & Quick AI Assistant Box */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Next Patient in Line (Bienvenue Segnon) */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-teal-600">Prochain Patient</span>
              <h2 className="text-lg font-black text-slate-900">Salle d'Attente Interactive</h2>
            </div>
            <button
              onClick={() => setDoctorTab('waiting_room')}
              className="text-xs font-bold text-teal-600 hover:text-teal-700 flex items-center gap-1"
            >
              <span>Voir les 4 patients</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* First Patient Highlight: Bienvenue Segnon */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-slate-50 border-2 border-emerald-300 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&fit=crop&q=80"
                  alt="Bienvenue Segnon"
                  className="w-12 h-12 rounded-xl object-cover border border-emerald-500 shadow-xs"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-black text-slate-900 text-base">Bienvenue Segnon</h3>
                    <span className="bg-red-100 text-red-800 text-[10px] font-black px-2 py-0.5 rounded-full">
                      O+
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 font-mono">
                    NPI: 1097885544901 · Arrivé à 10:28
                  </div>
                </div>
              </div>

              {/* Red Allergy Alert Tag */}
              <div className="bg-rose-600 text-white px-3 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 shadow-sm animate-pulse self-start sm:self-center">
                <AlertTriangle className="w-4 h-4" />
                <span>ALLERGIE : PÉNICILLINE</span>
              </div>
            </div>

            <div className="bg-white p-3.5 rounded-xl border border-slate-200 text-xs">
              <span className="font-bold text-slate-700 block">Motif de consultation :</span>
              <p className="text-slate-800 font-medium mt-0.5">
                « Douleur au ventre depuis 3 jours, brûlures mictionnelles. »
              </p>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-xs text-slate-500">
                Temps d'attente : <strong className="text-slate-800">4 minutes</strong>
              </span>

              <button
                onClick={() => handleOpenConsultation('pat_001')}
                className="bg-slate-900 hover:bg-[#00D26A] hover:text-slate-950 text-white font-extrabold text-xs px-5 py-2.5 rounded-xl transition flex items-center gap-1.5 shadow-sm"
              >
                <span>Faire Entrer le Patient</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Quick AI Decision Assistant */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-[#001824] to-[#002D40] text-white rounded-3xl p-6 shadow-md space-y-4">
            <div className="flex items-center gap-2 text-emerald-400 font-extrabold uppercase text-xs">
              <Bot className="w-4 h-4" />
              Assistant Clinique IA (Gemini)
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Interrogez l'intelligence médicale pour vérifier des interactions médicamenteuses ou synthétiser instantanément un historique de patient.
            </p>

            <div className="space-y-2 text-xs">
              <button
                onClick={() => setDoctorTab('ai_assistant')}
                className="w-full text-left p-3 rounded-xl bg-white/10 hover:bg-white/20 transition text-slate-200 flex items-center justify-between"
              >
                <span>« Résume le dossier de Koffi Mensah »</span>
                <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
              </button>

              <button
                onClick={() => setDoctorTab('ai_assistant')}
                className="w-full text-left p-3 rounded-xl bg-white/10 hover:bg-white/20 transition text-slate-200 flex items-center justify-between"
              >
                <span>« Interaction Amoxicilline + Ibuprofène ? »</span>
                <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
              </button>
            </div>

            <button
              onClick={() => setDoctorTab('ai_assistant')}
              className="w-full bg-[#00D26A] hover:bg-[#00b55b] text-slate-950 font-black py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 transition"
            >
              <span>Ouvrir l'Assistant IA Complet</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
