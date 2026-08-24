import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Activity,
  Building2,
  Users,
  DollarSign,
  ShieldCheck,
  Zap,
  Server,
  MapPin,
  TrendingUp,
  AlertTriangle,
  Radio,
  Cpu,
  Lock,
  ArrowRight
} from 'lucide-react';
import { INITIAL_MICROSERVICES } from '../../data/mockData';

export const SuperAdminDashboard: React.FC = () => {
  const { setSuperAdminTab, openTxVerifier, bloodAlerts } = useApp();

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* 1. National Command Banner */}
      <div className="bg-gradient-to-r from-[#00141E] via-[#002837] to-[#01384D] text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="bg-[#00D26A] text-slate-950 text-xs font-black px-3 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                MINISTÈRE DE LA SANTÉ · RÉPUBLIQUE DU BÉNIN
              </span>
              <span className="text-emerald-300 text-xs font-mono">Infrastructure Centrale Santé+</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black mt-2">
              Supervision Nationale du Réseau Hospitalier
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Tableau de bord souverain interconnectant les 12 départements du Bénin sur grand livre immuable.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/10 rounded-2xl border border-white/15 text-center">
              <span className="text-[10px] uppercase font-bold text-emerald-400 block">Horodatage Bitcoin</span>
              <span className="text-base font-black font-mono">Bloc #894520</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. National Key Figures (From Demo Script) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Stat 1: 15 Hospitals */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Hôpitaux Connectés</span>
            <Building2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">
            15 <span className="text-base font-bold text-slate-400">Centres</span>
          </div>
          <span className="text-[11px] text-emerald-700 font-bold block">
            100% interconnectés en 2G/3G/4G
          </span>
        </div>

        {/* Stat 2: 1.2M Patients */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Patients Couverts</span>
            <Users className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">
            1.2M <span className="text-base font-bold text-slate-400">Citoyens</span>
          </div>
          <span className="text-[11px] text-emerald-700 font-bold flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> +5% ce trimestre
          </span>
        </div>

        {/* Stat 3: 125M FCFA Transacted */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Volume des Paiements</span>
            <Zap className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">
            125M <span className="text-base font-bold text-slate-400">FCFA</span>
          </div>
          <span className="text-[11px] text-amber-700 font-bold block">
            Lightning Network (Frais moyen : 0.1%)
          </span>
        </div>

        {/* Stat 4: 45,000 Anchored TXs */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Empreintes Bitcoin</span>
            <Lock className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">
            45 000 <span className="text-base font-bold text-slate-400">TX</span>
          </div>
          <span className="text-[11px] text-purple-700 font-bold block">
            OP_RETURN Immuables
          </span>
        </div>

      </div>

      {/* 3. National Alerts Map & 12 Microservices Matrix Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Interactive Benin Map & Critical Alerts */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">Cartographie Nationale</span>
              <h2 className="text-lg font-black text-slate-900">Alertes & Répartition Géographique Bénin</h2>
            </div>
            <button
              onClick={() => setSuperAdminTab('map')}
              className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
            >
              <span>Vue Plein Écran</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Map Visual Box with Cities and Active Shortage Pins */}
          <div className="relative bg-slate-900 text-white rounded-2xl p-6 h-72 flex flex-col justify-between overflow-hidden shadow-inner">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#00D26A_1px,transparent_1px)] [background-size:16px_16px]"></div>

            {/* Simulated Benin Map Grid Markers */}
            <div className="relative z-10 flex items-start justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-emerald-400">Nord (Borgou / Alibori)</span>
                <div className="mt-2 flex items-center gap-2 bg-red-600/90 text-white px-3 py-1.5 rounded-xl text-xs font-black animate-pulse shadow-md">
                  <AlertTriangle className="w-4 h-4" />
                  <span>PARAKOU : Alerte Pénurie O+ (CHD Borgou)</span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-slate-400">Centre (Zou / Collines)</span>
                <div className="mt-1 text-xs text-slate-300 font-mono">Abomey & Bohicon : 100% Nominal</div>
              </div>
            </div>

            <div className="relative z-10 flex items-end justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-emerald-400">Sud (Littoral / Atlantique)</span>
                <div className="mt-1 flex items-center gap-2">
                  <div className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-3 py-1 rounded-xl text-xs font-bold">
                    Cotonou : 8 Hôpitaux en ligne (Clinique Sainte-Marie, CNHU)
                  </div>
                </div>
              </div>

              <div className="text-xs font-mono text-slate-400">
                Lat: 6.3703° N · Lon: 2.3912° E
              </div>
            </div>
          </div>

          {/* Active National Transfusion Alerts */}
          <div className="space-y-2 text-xs">
            <span className="font-extrabold uppercase text-slate-500 tracking-wider block">
              Incidents & Alertes Nationales Ouvertes
            </span>
            {bloodAlerts.map(alert => (
              <div key={alert.id} className="p-4 rounded-2xl bg-red-50 border border-red-200 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-red-600 text-white font-bold">
                    {alert.urgencyLevel}
                  </div>
                  <div>
                    <div className="font-black text-slate-900">{alert.hospitalName} ({alert.city})</div>
                    <div className="text-slate-600 text-xs">Besoin critique : Groupe {alert.bloodTypeNeeded} · {alert.compatibleDonorsAlerted} donneurs notifiés</div>
                  </div>
                </div>
                <span className="text-xs font-bold text-red-700 bg-white px-3 py-1 rounded-lg border border-red-200">
                  Actif
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right 1 Col: 12 Microservices Infrastructure Matrix */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Backend Distributed</span>
                <h3 className="text-sm font-black text-slate-900">12 Microservices Opérationnels</h3>
              </div>
              <button
                onClick={() => setSuperAdminTab('microservices')}
                className="text-xs font-bold text-emerald-600 hover:text-emerald-700"
              >
                Détails
              </button>
            </div>

            <div className="space-y-2.5 max-h-[380px] overflow-y-auto no-scrollbar pr-1">
              {INITIAL_MICROSERVICES.map(service => (
                <div
                  key={service.id}
                  className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs"
                >
                  <div className="space-y-0.5">
                    <div className="font-extrabold text-slate-900 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      <span>{service.name}</span>
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono">
                      Port {service.port} · Latence {service.latencyMs}ms
                    </div>
                  </div>

                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md font-mono">
                    {service.uptime}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-semibold">
              <span>Synchronisation Consensus :</span>
              <strong className="text-emerald-700">100% des nœuds au vert</strong>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
