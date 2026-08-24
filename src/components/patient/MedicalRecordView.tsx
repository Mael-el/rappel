import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  FileText,
  Stethoscope,
  Pill,
  Activity,
  Syringe,
  Droplet,
  ShieldCheck,
  Download,
  Calendar,
  Lock,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  AlertCircle
} from 'lucide-react';
import { soundFX, triggerConfetti } from '../../utils/audioAndFx';
import { INITIAL_LAB_ANALYSES, INITIAL_VACCINATIONS, INITIAL_BLOOD_DONATIONS } from '../../data/mockData';

export const MedicalRecordView: React.FC = () => {
  const { currentUser, consultations, openTxVerifier } = useApp();
  const [activeTab, setActiveTab] = useState<'consultations' | 'prescriptions' | 'analyses' | 'vaccines' | 'donations'>('consultations');
  const [expandedCstId, setExpandedCstId] = useState<string | null>('cst_2026_001');

  const toggleExpand = (id: string) => {
    soundFX.playBeep(800, 0.03);
    setExpandedCstId(expandedCstId === id ? null : id);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header Profile Bar */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Dossier Médical Unique à Vie
            </span>
            <span className="text-xs text-slate-400 font-semibold">Chiffrement AES-256 + IPFS</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 mt-1">
            Historique Médical de {currentUser.name}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Interconnecté avec tous les centres hospitaliers du Bénin et horodaté sur la blockchain.
          </p>
        </div>

        <button
          onClick={() => {
            soundFX.playSuccess();
            triggerConfetti();
          }}
          className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-5 py-3 rounded-2xl flex items-center gap-2 transition shadow-sm"
        >
          <Download className="w-4 h-4 text-emerald-400" />
          <span>Exporter Dossier Complet (PDF)</span>
        </button>
      </div>

      {/* Sub-tabs Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {[
          { id: 'consultations', label: 'Consultations', icon: <Stethoscope className="w-4 h-4" />, count: consultations.length },
          { id: 'prescriptions', label: 'Ordonnances', icon: <Pill className="w-4 h-4" />, count: 3 },
          { id: 'analyses', label: 'Analyses & Examens', icon: <Activity className="w-4 h-4" />, count: INITIAL_LAB_ANALYSES.length },
          { id: 'vaccines', label: 'Carnet de Vaccins', icon: <Syringe className="w-4 h-4" />, count: INITIAL_VACCINATIONS.length },
          { id: 'donations', label: 'Passeport Don de Sang', icon: <Droplet className="w-4 h-4" />, count: INITIAL_BLOOD_DONATIONS.length }
        ].map(tab => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                soundFX.playBeep(850, 0.03);
                setActiveTab(tab.id as typeof activeTab);
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-extrabold text-xs transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
              }`}>
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Consultations */}
      {activeTab === 'consultations' && (
        <div className="space-y-4">
          {consultations.map(cst => {
            const isExpanded = expandedCstId === cst.id;
            return (
              <div
                key={cst.id}
                className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden transition-all"
              >
                {/* Accordion Header */}
                <div
                  onClick={() => toggleExpand(cst.id)}
                  className="p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/70 transition"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-100/80 text-emerald-800 flex items-center justify-center font-bold shrink-0">
                      <Stethoscope className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs text-slate-400 font-semibold flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {cst.date} à {cst.time}
                        </span>
                        <span className="text-[11px] font-bold bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full">
                          {cst.hospitalName}
                        </span>
                      </div>
                      <h3 className="text-base font-black text-slate-900 mt-1">
                        {cst.diagnosis}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5 font-medium">
                        Médecin traitant : <strong>{cst.doctorName}</strong> ({cst.doctorSpecialty})
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">Horodatage Bitcoin</span>
                      <span className="text-xs font-mono text-emerald-600 font-bold">
                        {cst.bitcoinTxid.substring(0, 10)}...
                      </span>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-100 text-slate-600">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="px-6 pb-6 pt-2 border-t border-slate-100 space-y-4 bg-slate-50/40 text-xs">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Left: Clinical Details */}
                      <div className="space-y-3 bg-white p-4 rounded-2xl border border-slate-200/70 shadow-xs">
                        <h4 className="font-extrabold text-slate-900 uppercase text-[11px] tracking-wider text-emerald-800">
                          Motif & Examen Clinique
                        </h4>
                        <p className="text-slate-700 leading-relaxed font-medium">
                          <strong>Motif :</strong> {cst.chiefComplaint}
                        </p>
                        <p className="text-slate-600 leading-relaxed">
                          <strong>Notes du médecin :</strong> {cst.clinicalNotes}
                        </p>
                      </div>

                      {/* Right: Prescriptions */}
                      <div className="space-y-3 bg-white p-4 rounded-2xl border border-slate-200/70 shadow-xs">
                        <h4 className="font-extrabold text-slate-900 uppercase text-[11px] tracking-wider text-emerald-800">
                          Traitements & Prescriptions
                        </h4>
                        {cst.prescriptions.length > 0 ? (
                          <div className="space-y-2">
                            {cst.prescriptions.map(p => (
                              <div key={p.id} className="p-2.5 rounded-xl bg-emerald-50/50 border border-emerald-200/60">
                                <div className="font-extrabold text-slate-900 text-xs">{p.medication} ({p.dosage})</div>
                                <div className="text-[11px] text-slate-600">{p.frequency} · Durée : {p.duration}</div>
                                {p.instructions && <div className="text-[10px] text-emerald-700 italic mt-0.5">{p.instructions}</div>}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-slate-400 italic">Aucune prescription médicamenteuse.</p>
                        )}
                      </div>
                    </div>

                    {/* Bitcoin On-Chain Verification Footer */}
                    <div className="p-3.5 bg-[#001824] text-slate-200 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 font-mono text-[11px]">
                      <div className="flex items-center gap-2">
                        <Lock className="w-4 h-4 text-[#F7931A]" />
                        <span>TXID: {cst.bitcoinTxid.substring(0, 32)}...</span>
                      </div>

                      <button
                        onClick={() => openTxVerifier(cst.bitcoinTxid)}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition text-xs"
                      >
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Vérifier l'Empreinte Blockchain</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Tab 2: Prescriptions */}
      {activeTab === 'prescriptions' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">
                Traitement en Cours
              </span>
              <span className="text-xs text-slate-400 font-mono">Prescrit le 30/06/2026</span>
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900">Ciprofloxacine 500 mg</h3>
              <p className="text-xs text-slate-600 mt-1">2 fois par jour pendant 7 jours. À prendre avec les repas.</p>
            </div>
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500">Dr. Jean Kodjo</span>
              <span className="text-emerald-700 font-bold">Ordonnance Sécurisée</span>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">
                Traitement en Cours
              </span>
              <span className="text-xs text-slate-400 font-mono">Prescrit le 30/06/2026</span>
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900">Paracétamol 1 g</h3>
              <p className="text-xs text-slate-600 mt-1">Toutes les 8h en cas de douleur. Max 3g/24h.</p>
            </div>
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500">Dr. Jean Kodjo</span>
              <span className="text-emerald-700 font-bold">Ordonnance Sécurisée</span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Lab Analyses */}
      {activeTab === 'analyses' && (
        <div className="space-y-4">
          {INITIAL_LAB_ANALYSES.map(lab => (
            <div key={lab.id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div>
                  <span className="text-[10px] font-bold uppercase text-slate-400">{lab.laboratory}</span>
                  <h3 className="text-base font-black text-slate-900 mt-0.5">{lab.title}</h3>
                </div>
                <span className="text-xs font-mono text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                  {lab.date} · {lab.doctorName}
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold">
                    <tr>
                      <th className="p-2.5 rounded-l-xl">Paramètre</th>
                      <th className="p-2.5">Résultat</th>
                      <th className="p-2.5">Unité</th>
                      <th className="p-2.5">Valeurs de Référence</th>
                      <th className="p-2.5 rounded-r-xl">Interprétation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {lab.results.map((res, i) => (
                      <tr key={i} className="hover:bg-slate-50/60">
                        <td className="p-2.5 font-bold text-slate-800">{res.parameter}</td>
                        <td className={`p-2.5 font-black ${res.status === 'high' ? 'text-rose-600' : 'text-slate-900'}`}>{res.value}</td>
                        <td className="p-2.5 text-slate-500">{res.unit}</td>
                        <td className="p-2.5 text-slate-400">{res.referenceRange}</td>
                        <td className="p-2.5">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            res.status === 'high' ? 'bg-red-100 text-red-800' : 'bg-emerald-100 text-emerald-800'
                          }`}>
                            {res.status === 'high' ? 'Élevé (Infection)' : 'Normal'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 4: Vaccines */}
      {activeTab === 'vaccines' && (
        <div className="space-y-4">
          {INITIAL_VACCINATIONS.map(vac => (
            <div key={vac.id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold shrink-0">
                  <Syringe className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900">{vac.vaccineName}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {vac.disease} · {vac.doseNumber}
                  </p>
                  <div className="text-[11px] text-slate-400 mt-1">
                    Administré le {vac.date} par {vac.administeredBy} (Lot: {vac.batchNumber})
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl">
                  ✓ Certificat International Valide
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 5: Blood Donations */}
      {activeTab === 'donations' && (
        <div className="space-y-4">
          <div className="p-6 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-3xl shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full">
                🏅 Donneur d'Or Certifié
              </span>
              <h2 className="text-2xl font-black mt-2">10 Dons de Sang Effectués (Groupe O+)</h2>
              <p className="text-xs text-red-100 mt-1">
                Vos dons ont contribué à sauver environ 30 vies dans les hôpitaux du Bénin.
              </p>
            </div>
            <div className="text-3xl font-black bg-white text-red-600 w-16 h-16 rounded-2xl flex items-center justify-center shadow-md shrink-0">
              O+
            </div>
          </div>

          <div className="space-y-3">
            {INITIAL_BLOOD_DONATIONS.map(don => (
              <div key={don.id} className="bg-white rounded-2xl p-4 border border-slate-200 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-red-100 text-red-600">
                    <Droplet className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-extrabold text-slate-900">{don.location} ({don.volumeMl} mL)</div>
                    <div className="text-slate-400 font-mono text-[11px]">Poche #{don.bagId} · {don.date}</div>
                  </div>
                </div>
                <span className="font-mono text-emerald-600 font-bold bg-emerald-50 px-2.5 py-1 rounded-lg">
                  Ancré Bitcoin
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
