import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Users,
  Clock,
  AlertTriangle,
  Heart,
  Stethoscope,
  ShieldCheck,
  ArrowRight,
  Filter,
  CheckCircle2
} from 'lucide-react';
import { soundFX } from '../../utils/audioAndFx';

export const DoctorWaitingRoom: React.FC = () => {
  const { waitingPatients, setDoctorTab } = useApp();

  const handleStartConsultation = (patientId: string) => {
    soundFX.playBeep(900, 0.04);
    setDoctorTab('consultation');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header Bar */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-teal-100 text-teal-800 text-xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              File d'Attente Interactive & Triage
            </span>
            <span className="text-xs text-slate-400 font-semibold">{waitingPatients.length} Patients Présents</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 mt-1">
            Salle d'Attente Clinique Sainte-Marie
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Aiguillage intelligent avec alertes d'allergies critiques et groupe sanguin visibles en amont.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold px-3 py-1.5 rounded-xl flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            File Synchronisée en Temps Réel
          </span>
        </div>
      </div>

      {/* Patient Cards List */}
      <div className="space-y-4">
        {waitingPatients.map((patient, idx) => {
          const isFirst = idx === 0;
          const hasAllergy = patient.allergies && patient.allergies.length > 0;

          return (
            <div
              key={patient.id}
              className={`p-6 rounded-3xl border transition-all flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 ${
                isFirst
                  ? 'bg-gradient-to-r from-emerald-50/70 via-teal-50/50 to-white border-emerald-400 shadow-md ring-2 ring-emerald-200/60'
                  : 'bg-white border-slate-200/90 hover:border-slate-300'
              }`}
            >
              {/* Left Info */}
              <div className="flex items-start gap-4 flex-1">
                <div className="relative">
                  <img
                    src={patient.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&fit=crop&q=80'}
                    alt={patient.name}
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl object-cover border-2 border-slate-200 shadow-xs"
                  />
                  <span className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-slate-900 text-white font-black text-xs flex items-center justify-center shadow-sm">
                    {idx + 1}
                  </span>
                </div>

                <div className="space-y-1 flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-base sm:text-lg font-black text-slate-900">
                      {patient.name}
                    </h3>
                    <span className="font-mono text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
                      NPI: {patient.npi}
                    </span>
                    <span className="bg-red-50 text-red-700 border border-red-200 text-xs font-black px-2 py-0.5 rounded-md">
                      {patient.bloodType}
                    </span>
                  </div>

                  <div className="text-xs text-slate-600 font-medium">
                    Motif : <strong className="text-slate-800">{patient.reason}</strong>
                  </div>

                  <div className="flex items-center gap-4 text-[11px] text-slate-400 pt-1">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      Arrivé à {patient.arrivalTime}
                    </span>
                    <span>•</span>
                    <span>Temps d'attente : <strong className="text-slate-600">{patient.waitingTimeMinutes} min</strong></span>
                  </div>
                </div>
              </div>

              {/* Right Alerts & Action Button */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full lg:w-auto justify-between lg:justify-end">
                {/* Allergy Banner if any */}
                {hasAllergy ? (
                  <div className="bg-rose-600 text-white px-3.5 py-2 rounded-2xl text-xs font-extrabold flex items-center gap-2 shadow-sm animate-pulse">
                    <AlertTriangle className="w-4 h-4" />
                    <span>ALLERGIE : {patient.allergies?.join(', ').toUpperCase()}</span>
                  </div>
                ) : (
                  <div className="bg-slate-100 text-slate-600 px-3 py-1.5 rounded-xl text-xs font-semibold">
                    Aucune allergie connue
                  </div>
                )}

                <button
                  onClick={() => handleStartConsultation(patient.id)}
                  className={`px-5 py-3 rounded-2xl font-extrabold text-xs flex items-center gap-2 transition shadow-sm w-full sm:w-auto justify-center ${
                    isFirst
                      ? 'bg-[#00D26A] hover:bg-[#00b55b] text-slate-950 shadow-emerald-500/20'
                      : 'bg-slate-900 hover:bg-slate-800 text-white'
                  }`}
                >
                  <Stethoscope className="w-4 h-4" />
                  <span>Démarrer Consultation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
