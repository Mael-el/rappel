import React from 'react';
import { INITIAL_MICROSERVICES } from '../../data/mockData';
import { Server, Cpu, Zap, ShieldCheck, CheckCircle2, RefreshCw } from 'lucide-react';
import { soundFX } from '../../utils/audioAndFx';

export const MicroservicesArchitectureView: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header Bar */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-slate-900 text-white text-xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
              <Server className="w-3.5 h-3.5 text-emerald-400" />
              Infrastructure Backend Distribuée
            </span>
            <span className="text-xs text-emerald-600 font-semibold">12 Microservices Opérationnels</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 mt-1">
            Architecture des Microservices Santé+
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Haute disponibilité (99.98%), nœuds de réplication régionaux et validation cryptographique.
          </p>
        </div>

        <button
          onClick={() => soundFX.playSuccess()}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs px-5 py-3 rounded-2xl flex items-center gap-2 transition shadow-sm"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Synchroniser les Nœuds</span>
        </button>
      </div>

      {/* Grid of Microservices */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {INITIAL_MICROSERVICES.map(svc => (
          <div key={svc.id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
                <h3 className="font-extrabold text-slate-900 text-sm">{svc.name}</h3>
              </div>
              <span className="text-[10px] font-mono font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md">
                Port {svc.port}
              </span>
            </div>

            <div className="space-y-1.5 text-xs text-slate-600 bg-slate-50 p-3.5 rounded-2xl border border-slate-200/70 font-mono">
              <div className="flex justify-between">
                <span className="text-slate-400">Status:</span>
                <span className="text-emerald-700 font-bold">● {svc.status}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Latence:</span>
                <span className="text-slate-800 font-bold">{svc.latencyMs} ms</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Disponibilité:</span>
                <span className="text-emerald-700 font-bold">{svc.uptime}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
