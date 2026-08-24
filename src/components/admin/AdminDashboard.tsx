import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Building2,
  Users,
  Stethoscope,
  DollarSign,
  Droplet,
  Activity,
  AlertTriangle,
  Wrench,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  Radio,
  Clock,
  ArrowRight
} from 'lucide-react';
import { soundFX, triggerConfetti } from '../../utils/audioAndFx';

export const AdminDashboard: React.FC = () => {
  const { setAdminTab, openTxVerifier } = useApp();
  const [bloodAlertSent, setBloodAlertSent] = useState(false);

  const handleBroadcastBloodAlert = () => {
    soundFX.playSuccess();
    triggerConfetti();
    setBloodAlertSent(true);
    setTimeout(() => setBloodAlertSent(false), 5000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* 1. Hospital Header Bar */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center font-black text-2xl shadow-sm">
            🏥
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-black text-slate-900">
                Clinique Sainte-Marie (Cotonou)
              </h1>
              <span className="bg-purple-100 text-purple-900 text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 font-mono">
                <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
                ID: HOSP-BJ-COT-001
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              📍 Haie Vive, Cotonou · Établissement Agréé Réseau Santé+ Bénin · 4.9 ⭐
            </p>
          </div>
        </div>

        {/* Urgent Blood Alert Trigger Button */}
        <button
          onClick={handleBroadcastBloodAlert}
          className="w-full md:w-auto bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-extrabold px-6 py-3.5 rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-red-500/20 transition transform active:scale-95"
        >
          <Droplet className="w-4 h-4" />
          <span>Alerter les Donneurs O+ (12 Proches)</span>
        </button>
      </div>

      {/* Blood Alert Success Banner */}
      {bloodAlertSent && (
        <div className="bg-red-600 text-white p-4 rounded-2xl shadow-lg flex items-center justify-between gap-4 animate-in slide-in-from-top-2">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center font-black">
              ✓
            </div>
            <div>
              <div className="font-extrabold text-sm">Alerte Transfusionnelle Émise avec Succès !</div>
              <div className="text-xs text-red-100">
                Notification push & SMS envoyée aux 12 donneurs O+ dans un rayon de 5 km.
              </div>
            </div>
          </div>
          <span className="text-xs font-bold bg-white text-red-700 px-3 py-1 rounded-lg">
            Temps : 1.2s
          </span>
        </div>
      )}

      {/* 2. Key Performance Indicators (From Demo Script) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Metric 1: Patients */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Patients Inscrits</span>
            <Users className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">
            1 240
          </div>
          <span className="text-[11px] text-emerald-700 font-bold flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> +15% ce mois
          </span>
        </div>

        {/* Metric 2: Consultations */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Consultations / Mois</span>
            <Stethoscope className="w-4 h-4 text-teal-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">
            356
          </div>
          <span className="text-[11px] text-emerald-700 font-bold flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> +20% d'activité
          </span>
        </div>

        {/* Metric 3: Revenues */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Revenus Reçus</span>
            <DollarSign className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">
            2.4M <span className="text-base font-bold text-slate-400">FCFA</span>
          </div>
          <span className="text-[11px] text-emerald-700 font-bold flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> +25% via Lightning
          </span>
        </div>

        {/* Metric 4: Blood Reserves */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Dons Réalisés</span>
            <Droplet className="w-4 h-4 text-red-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">
            12 Dons
          </div>
          <span className="text-[11px] text-rose-700 font-bold">
            ⚠️ Stock O+ Critique (2 poches)
          </span>
        </div>

      </div>

      {/* 3. Medical Equipment Fleet & Blockchain Audit Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Equipment Fleet Monitoring Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-purple-600">Parc Médical</span>
              <h2 className="text-lg font-black text-slate-900">Surveillance des Équipements</h2>
            </div>
            <button
              onClick={() => setAdminTab('equipments')}
              className="text-xs font-bold text-purple-600 hover:text-purple-700 flex items-center gap-1"
            >
              <span>Gérer les machines</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3 text-xs">
            {/* Equipment 1: IRM Scanner */}
            <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200/70 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-800 font-black">
                  IRM
                </div>
                <div>
                  <div className="font-black text-slate-900 text-sm">Scanner IRM 1.5 Tesla (Siemens)</div>
                  <div className="text-slate-500">Salle Radiologie A · Maintenance : 12/05/2026</div>
                </div>
              </div>
              <span className="bg-emerald-600 text-white font-extrabold text-[10px] px-2.5 py-1 rounded-full uppercase">
                Opérationnel
              </span>
            </div>

            {/* Equipment 2: Échographe 3D */}
            <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200/70 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-800 font-black">
                  US
                </div>
                <div>
                  <div className="font-black text-slate-900 text-sm">Échographe Doppler 3D/4D</div>
                  <div className="text-slate-500">Salle Gynécologie 2 · Maintenance : 20/06/2026</div>
                </div>
              </div>
              <span className="bg-emerald-600 text-white font-extrabold text-[10px] px-2.5 py-1 rounded-full uppercase">
                Opérationnel
              </span>
            </div>

            {/* Equipment 3: Radiographe en panne */}
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-amber-200 text-amber-900 font-black">
                  RX
                </div>
                <div>
                  <div className="font-black text-slate-900 text-sm">Radiographe Numérique Fixe</div>
                  <div className="text-slate-500">Salle B · Pièce de rechange commandée</div>
                </div>
              </div>
              <span className="bg-amber-500 text-slate-950 font-black text-[10px] px-2.5 py-1 rounded-full uppercase flex items-center gap-1">
                <Wrench className="w-3 h-3" /> En Maintenance
              </span>
            </div>
          </div>
        </div>

        {/* Real-Time Blockchain Audit Log Feed (1 240 Actions Ancrées) */}
        <div className="bg-[#001824] text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Grand Livre Distribué</span>
              <h2 className="text-lg font-black text-white">Journal d'Audit Blockchain Inviolable</h2>
            </div>
            <span className="text-xs font-mono text-slate-400 bg-slate-900 px-2.5 py-1 rounded-lg">
              1 240 Transactions
            </span>
          </div>

          <div className="space-y-3 font-mono text-xs">
            <div className="p-3 bg-slate-900/80 rounded-2xl border border-slate-800 flex items-center justify-between gap-2">
              <div>
                <span className="text-emerald-400 font-bold">[10:32:14] Consultation Clôturée</span>
                <p className="text-slate-400 text-[11px]">Patient: Bienvenue Segnon · Dr. Jean Kodjo</p>
              </div>
              <button
                onClick={() => openTxVerifier('0x4e3f2a1b9c7d8e6a5f0123456789abcdef0123456789abcdef0123456789abcd')}
                className="text-[11px] text-[#F7931A] hover:underline"
              >
                0x4e3f2a1b...
              </button>
            </div>

            <div className="p-3 bg-slate-900/80 rounded-2xl border border-slate-800 flex items-center justify-between gap-2">
              <div>
                <span className="text-amber-400 font-bold">[10:30:00] Paiement Lightning Reçu</span>
                <p className="text-slate-400 text-[11px]">Montant: 5 000 FCFA · Frais 0.1% (5 FCFA)</p>
              </div>
              <button
                onClick={() => openTxVerifier('0x9b2a11cf88de77cd66ab55ef44cc33bb22aa1199887766554433221100fedcba')}
                className="text-[11px] text-[#F7931A] hover:underline"
              >
                0x9b2a11cf...
              </button>
            </div>

            <div className="p-3 bg-slate-900/80 rounded-2xl border border-slate-800 flex items-center justify-between gap-2">
              <div>
                <span className="text-teal-400 font-bold">[10:28:45] QR Code Patient Scanné</span>
                <p className="text-slate-400 text-[11px]">NPI 1097885544901 · Alerte Pénicilline transmise</p>
              </div>
              <button
                onClick={() => openTxVerifier('0x88bb77aa66cc55dd44ee33ff22001199aabbccddeeff00112233445566778899')}
                className="text-[11px] text-[#F7931A] hover:underline"
              >
                0x88bb77aa...
              </button>
            </div>
          </div>

          <div className="pt-2 text-[11px] text-slate-400 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Aucune modification rétroactive possible sur le registre.</span>
          </div>
        </div>

      </div>
    </div>
  );
};
