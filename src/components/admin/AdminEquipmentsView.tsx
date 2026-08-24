import React from 'react';
import { Wrench, ShieldCheck, CheckCircle2, AlertTriangle, Plus } from 'lucide-react';
import { soundFX } from '../../utils/audioAndFx';

export const AdminEquipmentsView: React.FC = () => {
  const equipments = [
    {
      id: 'eq_1',
      name: 'Scanner IRM 1.5 Tesla (Siemens MAGNETOM)',
      room: 'Salle Imagerie A',
      status: 'Opérationnel',
      lastMaintenance: '12/05/2026',
      nextMaintenance: '12/11/2026',
      technician: 'Ing. Bio-médical Bio-Tech Cotonou'
    },
    {
      id: 'eq_2',
      name: 'Échographe Doppler Couleur 3D/4D (GE Healthcare)',
      room: 'Salle Gynécologie 2',
      status: 'Opérationnel',
      lastMaintenance: '20/06/2026',
      nextMaintenance: '20/12/2026',
      technician: 'Service Interne Clinique'
    },
    {
      id: 'eq_3',
      name: 'Table de Radiographie Numérique Fixe',
      room: 'Salle Radiologie B',
      status: 'En Maintenance',
      lastMaintenance: '15/01/2026',
      nextMaintenance: '02/07/2026 (Pièce commandée)',
      technician: 'Maintenance Urgente en cours'
    },
    {
      id: 'eq_4',
      name: 'Analyseur Automatique d\'Hématologie (Sysmex)',
      room: 'Laboratoire Central',
      status: 'Opérationnel',
      lastMaintenance: '28/06/2026',
      nextMaintenance: '28/07/2026',
      technician: 'Contrôle Qualité Quotidien'
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-purple-100 text-purple-800 text-xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Maintenance Préventive & Curative
            </span>
            <span className="text-xs text-slate-400 font-semibold">{equipments.length} Machines Enregistrées</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 mt-1">
            Parc des Équipements Médicaux
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Suivi en temps réel de la disponibilité des blocs, scanners et automates de laboratoire.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {equipments.map(eq => {
          const isOk = eq.status === 'Opérationnel';
          return (
            <div key={eq.id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400">{eq.room}</span>
                  <h3 className="text-base font-black text-slate-900 mt-0.5">{eq.name}</h3>
                </div>
                <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full ${
                  isOk ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'
                }`}>
                  {eq.status}
                </span>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-xs space-y-1 text-slate-600">
                <div className="flex justify-between">
                  <span>Dernière révision :</span>
                  <strong className="text-slate-800">{eq.lastMaintenance}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Prochaine échéance :</span>
                  <strong className={isOk ? 'text-emerald-700' : 'text-amber-700'}>{eq.nextMaintenance}</strong>
                </div>
                <div className="flex justify-between pt-1 border-t border-slate-200/60">
                  <span>Prestataire :</span>
                  <span className="text-slate-700">{eq.technician}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
