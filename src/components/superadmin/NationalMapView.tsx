import React from 'react';
import { useApp } from '../../context/AppContext';
import { MapPin, Building2, AlertTriangle, ShieldCheck, Droplet, Activity } from 'lucide-react';

export const NationalMapView: React.FC = () => {
  const { hospitals, bloodAlerts } = useApp();

  const departments = [
    { name: 'Littoral (Cotonou)', hospitalsCount: 8, patientsCount: '620k', status: 'Optimal', alerts: 0 },
    { name: 'Atlantique (Abomey-Calavi / Ouidah)', hospitalsCount: 3, patientsCount: '280k', status: 'Optimal', alerts: 0 },
    { name: 'Ouémé (Porto-Novo)', hospitalsCount: 2, patientsCount: '150k', status: 'Optimal', alerts: 0 },
    { name: 'Borgou (Parakou)', hospitalsCount: 1, patientsCount: '95k', status: 'Alerte O+', alerts: 1 },
    { name: 'Zou (Abomey / Bohicon)', hospitalsCount: 1, patientsCount: '55k', status: 'Optimal', alerts: 0 }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header Bar */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-slate-900 text-white text-xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              SIG Santé Bénin
            </span>
            <span className="text-xs text-emerald-600 font-semibold">15 Hôpitaux Géolocalisés</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 mt-1">
            Cartographie Sanitaire Nationale & Réseau Transfusionnel
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Interconnexion en temps réel des centres de référence et des réserves de sang critiques.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold px-3 py-1.5 rounded-xl">
            Couverture : 12 / 12 Départements
          </span>
        </div>
      </div>

      {/* Grid: Map Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map((dept, i) => (
          <div
            key={i}
            className={`bg-white rounded-3xl p-6 border shadow-xs space-y-4 ${
              dept.alerts > 0 ? 'border-red-300 ring-2 ring-red-100' : 'border-slate-200/80'
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase text-slate-400">Département</span>
                <h3 className="text-base font-black text-slate-900 mt-0.5">{dept.name}</h3>
              </div>
              <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full ${
                dept.alerts > 0 ? 'bg-red-100 text-red-800' : 'bg-emerald-100 text-emerald-800'
              }`}>
                {dept.status}
              </span>
            </div>

            <div className="space-y-1.5 text-xs text-slate-600 bg-slate-50 p-3.5 rounded-2xl border border-slate-200/70">
              <div className="flex justify-between">
                <span>Hôpitaux interconnectés :</span>
                <strong className="text-slate-900">{dept.hospitalsCount} centres</strong>
              </div>
              <div className="flex justify-between">
                <span>Population couverte :</span>
                <strong className="text-slate-900">{dept.patientsCount}</strong>
              </div>
              <div className="flex justify-between">
                <span>Urgences transfusionnelles :</span>
                <strong className={dept.alerts > 0 ? 'text-red-600' : 'text-emerald-700'}>
                  {dept.alerts > 0 ? '1 Alerte O+ Active' : 'Aucune'}
                </strong>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
