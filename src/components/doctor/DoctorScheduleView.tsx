import React from 'react';
import { useApp } from '../../context/AppContext';
import { Calendar, Clock, User, CheckCircle2, MapPin, ShieldCheck, Stethoscope } from 'lucide-react';

export const DoctorScheduleView: React.FC = () => {
  const { appointments, currentUser } = useApp();

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header Bar */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-teal-100 text-teal-800 text-xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Planning des Consultations
            </span>
            <span className="text-xs text-slate-400 font-semibold">{appointments.length} Rendez-vous Programmés</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 mt-1">
            Agenda du Dr. Jean Kodjo
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Synchronisé automatiquement avec l'espace patient et les rappels SMS.
          </p>
        </div>

        <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold px-3 py-1.5 rounded-xl">
          Clinique Sainte-Marie · Salle 3
        </span>
      </div>

      {/* Appointments List */}
      <div className="space-y-3">
        {appointments.map(apt => (
          <div
            key={apt.id}
            className="p-5 bg-white rounded-3xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex flex-col items-center justify-center font-bold shrink-0 border border-teal-200/50">
                <span className="text-xs">{apt.time}</span>
                <span className="text-[9px] uppercase text-teal-600">RDV</span>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-black text-slate-900">{apt.patientName}</h3>
                  <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded-md">
                    {apt.phone}
                  </span>
                </div>
                <p className="text-slate-600 font-medium mt-0.5">
                  Motif : <strong>{apt.reason}</strong> ({apt.specialty})
                </p>
                <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Date : {apt.date}</span>
                  <span>•</span>
                  <span className="text-emerald-700 font-bold">{apt.feeFcfa.toLocaleString()} FCFA</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-center">
              <span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-3 py-1 rounded-xl flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Confirmé
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
