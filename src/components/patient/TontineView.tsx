import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  HeartHandshake,
  ShieldCheck,
  Users,
  Calendar,
  DollarSign,
  Plus,
  Lock,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  ExternalLink
} from 'lucide-react';
import { soundFX, triggerConfetti } from '../../utils/audioAndFx';

export const TontineView: React.FC = () => {
  const { tontines, contributeToTontine, openTxVerifier } = useApp();
  const [selectedTontineId, setSelectedTontineId] = useState<string>(tontines[0].id);

  const selectedTontine = tontines.find(t => t.id === selectedTontineId) || tontines[0];

  const handleContribute = (amount: number) => {
    contributeToTontine(selectedTontine.id, amount);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header Bar */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-purple-100 text-purple-800 text-xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
              <Lock className="w-3.5 h-3.5" />
              Multi-signature Bitcoin (2-of-3)
            </span>
            <span className="text-xs text-emerald-600 font-semibold">Aucune Fraude Possible</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 mt-1">
            Tontines Santé & Épargne Médicale
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Fonds de solidarité familial et communautaire bloqués sur contrat Bitcoin sécurisé.
          </p>
        </div>

        <button
          onClick={() => {
            soundFX.playSuccess();
            triggerConfetti();
          }}
          className="bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs px-5 py-3 rounded-2xl flex items-center gap-2 transition shadow-md shadow-purple-600/20"
        >
          <Plus className="w-4 h-4" />
          <span>Créer un Groupe de Tontine</span>
        </button>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Active Tontine Details */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Main Card: Tontine Famille Segnon */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-bold text-purple-600 uppercase tracking-wider">
                  {selectedTontine.multisigScheme}
                </span>
                <h2 className="text-xl font-black text-slate-900 mt-0.5">
                  {selectedTontine.name}
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  {selectedTontine.description}
                </p>
              </div>

              <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full self-start">
                ● Tontine Active
              </span>
            </div>

            {/* Financial Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200/80">
                <span className="text-[10px] uppercase font-bold text-purple-600 block">Solde Actuel Sécurisé</span>
                <span className="text-xl font-black text-purple-950 mt-1 block">
                  {selectedTontine.currentBalanceFcfa.toLocaleString()} FCFA
                </span>
                <span className="text-[11px] text-purple-700 mt-0.5 block font-medium">Coffre Multi-sig Bitcoin</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Cotisation Mensuelle</span>
                <span className="text-xl font-black text-slate-900 mt-1 block">
                  {selectedTontine.monthlyContributionFcfa.toLocaleString()} FCFA
                </span>
                <span className="text-[11px] text-slate-500 mt-0.5 block">5 membres réguliers</span>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                <span className="text-[10px] uppercase font-bold text-emerald-700 block">Prochain Retrait</span>
                <span className="text-sm font-black text-emerald-950 mt-1 block">
                  {selectedTontine.nextPayoutDate}
                </span>
                <span className="text-[11px] text-emerald-700 mt-0.5 block font-bold">
                  Bénéficiaire : {selectedTontine.beneficiaryName}
                </span>
              </div>
            </div>

            {/* Members Status List */}
            <div className="space-y-3">
              <h3 className="text-xs uppercase font-extrabold tracking-wider text-slate-500 flex items-center justify-between">
                <span>Membres du Groupe (5 participants)</span>
                <span className="text-emerald-600 font-bold">100% à jour</span>
              </h3>

              <div className="divide-y divide-slate-100">
                {selectedTontine.members.map(member => (
                  <div key={member.id} className="py-3 flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-3">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-9 h-9 rounded-full object-cover border border-slate-200"
                      />
                      <div>
                        <div className="font-bold text-slate-900">{member.name}</div>
                        <div className="text-slate-400 text-[11px]">Dernière cotisation : {member.lastContributionDate}</div>
                      </div>
                    </div>

                    <span className="flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full font-bold text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      10 000 FCFA payé
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contribution Button */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => handleContribute(10000)}
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-extrabold py-3.5 px-6 rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition transform active:scale-98"
              >
                <ArrowUpRight className="w-4 h-4" />
                <span>Verser ma Cotisation Mensuelle (10 000 FCFA)</span>
              </button>

              <button
                onClick={() => openTxVerifier('0x9b2a11cf88de77cd66ab55ef44cc33bb22aa1199887766554433221100fedcba')}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3.5 px-4 rounded-2xl text-xs transition"
              >
                Voir Preuve On-Chain
              </button>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Multi-sig Explanation & Bitcoin Vault Address */}
        <div className="space-y-6">
          
          <div className="bg-[#001824] text-white rounded-3xl p-6 shadow-md space-y-4">
            <div className="flex items-center gap-2 text-[#F7931A] font-extrabold uppercase text-xs">
              <ShieldCheck className="w-4 h-4" />
              Coffre Bitcoin Multi-Sig 2-sur-3
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Pour débloquer les fonds en cas d'urgence médicale ou à la date convenue, 2 membres clés sur 3 doivent valider la transaction avec leur clé cryptographique.
            </p>

            <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-400 uppercase font-mono block">Adresse du Coffre Transparent</span>
              <span className="font-mono text-xs text-emerald-400 break-all select-all block">
                {selectedTontine.bitcoinVaultAddress}
              </span>
            </div>

            <div className="text-[11px] text-slate-400 space-y-1 pt-1">
              <div>• Zéro trésorier véreux ou fuite de fonds</div>
              <div>• Traçabilité complète des cotisations</div>
              <div>• Prêt d'urgence santé accordé en 30 minutes</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
