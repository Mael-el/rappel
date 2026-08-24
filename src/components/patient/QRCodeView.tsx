import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  QrCode,
  ShieldCheck,
  Download,
  Share2,
  AlertTriangle,
  Heart,
  Copy,
  Check,
  Sparkles,
  Smartphone,
  Eye
} from 'lucide-react';
import { soundFX, triggerConfetti } from '../../utils/audioAndFx';

export const QRCodeView: React.FC = () => {
  const { currentUser, openTxVerifier } = useApp();
  const [copied, setCopied] = useState(false);
  const [scannerSimulated, setScannerSimulated] = useState(false);

  const qrDataPayload = JSON.stringify({
    npi: currentUser.npi || '1097885544901',
    name: currentUser.name,
    bloodType: currentUser.bloodType || 'O+',
    allergies: currentUser.allergies || ['Pénicilline'],
    merkleRoot: '0x99fa1b8c66e277d33b8a44c99e11f0a823b49c71',
    timestamp: '2026-06-30T14:30:00Z'
  });

  const handleCopyNpi = () => {
    navigator.clipboard.writeText(currentUser.npi || '1097885544901');
    setCopied(true);
    soundFX.playBeep(1000, 0.04);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSimulateReceptionScan = () => {
    soundFX.playBeep(1200, 0.06);
    setScannerSimulated(true);
    triggerConfetti();
    setTimeout(() => setScannerSimulated(false), 4000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-200">
      
      {/* Title Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Passeport Médical Universel
            </span>
            <span className="text-xs text-slate-400 font-semibold">1 Seconde à l'accueil</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 mt-1">
            Mon QR Code d'Identification Médical
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Présentez simplement ce code à l'accueil de n'importe quel hôpital ou clinique du Bénin.
          </p>
        </div>

        <button
          onClick={handleSimulateReceptionScan}
          className="bg-slate-900 hover:bg-emerald-600 text-white font-extrabold text-xs px-5 py-3 rounded-2xl flex items-center gap-2 transition shadow-md"
        >
          <Smartphone className="w-4 h-4 text-emerald-400" />
          <span>Simuler le Scan d'Accueil (1s)</span>
        </button>
      </div>

      {/* Reception Scan Alert Banner */}
      {scannerSimulated && (
        <div className="bg-emerald-600 text-white p-4 rounded-2xl shadow-lg flex items-center justify-between gap-4 animate-in slide-in-from-top-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center font-black">
              ✓
            </div>
            <div>
              <div className="font-extrabold text-sm">Patient Identifié avec Succès à la Clinique Sainte-Marie !</div>
              <div className="text-xs text-emerald-100 font-mono">
                NPI 1097885544901 · Groupe O+ · Alerte Pénicilline activée sur le poste médecin
              </div>
            </div>
          </div>
          <span className="text-xs font-bold bg-white text-emerald-800 px-3 py-1 rounded-lg">
            Temps : 0.8s
          </span>
        </div>
      )}

      {/* Main QR Code Center Display Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: High Fidelity QR Display */}
        <div className="md:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col items-center justify-center text-center space-y-6">
          
          {/* Stylized QR Card with Bitcoin Stamp */}
          <div className="relative p-6 sm:p-8 bg-gradient-to-b from-slate-50 to-slate-100 rounded-3xl border-2 border-emerald-500/40 shadow-inner flex flex-col items-center justify-center">
            
            {/* SVG QR Visual Representation */}
            <div className="w-56 h-56 sm:w-64 sm:h-64 bg-white p-4 rounded-2xl shadow-lg border border-slate-200 relative flex items-center justify-center">
              <svg viewBox="0 0 200 200" className="w-full h-full text-slate-900 fill-current">
                {/* Outer Markers Top Left */}
                <rect x="10" y="10" width="50" height="50" rx="6" fill="#002B49" />
                <rect x="20" y="20" width="30" height="30" rx="3" fill="#FFFFFF" />
                <rect x="26" y="26" width="18" height="18" rx="2" fill="#00D26A" />

                {/* Outer Markers Top Right */}
                <rect x="140" y="10" width="50" height="50" rx="6" fill="#002B49" />
                <rect x="150" y="20" width="30" height="30" rx="3" fill="#FFFFFF" />
                <rect x="156" y="26" width="18" height="18" rx="2" fill="#00D26A" />

                {/* Outer Markers Bottom Left */}
                <rect x="10" y="140" width="50" height="50" rx="6" fill="#002B49" />
                <rect x="20" y="150" width="30" height="30" rx="3" fill="#FFFFFF" />
                <rect x="26" y="156" width="18" height="18" rx="2" fill="#00D26A" />

                {/* Grid Pattern Dots */}
                <rect x="70" y="20" width="12" height="12" rx="2" />
                <rect x="90" y="20" width="12" height="12" rx="2" fill="#00A389" />
                <rect x="110" y="20" width="12" height="12" rx="2" />

                <rect x="70" y="40" width="12" height="12" rx="2" fill="#003B73" />
                <rect x="100" y="40" width="12" height="12" rx="2" />
                <rect x="120" y="40" width="12" height="12" rx="2" fill="#00D26A" />

                <rect x="20" y="70" width="12" height="12" rx="2" fill="#00D26A" />
                <rect x="40" y="70" width="12" height="12" rx="2" />
                <rect x="70" y="70" width="12" height="12" rx="2" fill="#003B73" />
                <rect x="90" y="70" width="12" height="12" rx="2" />
                <rect x="110" y="70" width="12" height="12" rx="2" fill="#00A389" />
                <rect x="140" y="70" width="12" height="12" rx="2" />
                <rect x="160" y="70" width="12" height="12" rx="2" fill="#00D26A" />

                {/* Center Santé+ Icon */}
                <circle cx="100" cy="100" r="22" fill="#FFFFFF" stroke="#00D26A" strokeWidth="3" />
                <circle cx="100" cy="100" r="16" fill="#001E2B" />
                <text x="100" y="106" textAnchor="middle" fill="#00D26A" fontSize="16" fontWeight="bold" fontFamily="sans-serif">+</text>

                {/* Bottom patterns */}
                <rect x="70" y="140" width="12" height="12" rx="2" fill="#00D26A" />
                <rect x="90" y="140" width="12" height="12" rx="2" />
                <rect x="120" y="140" width="12" height="12" rx="2" fill="#003B73" />
                <rect x="150" y="140" width="12" height="12" rx="2" />
                <rect x="170" y="140" width="12" height="12" rx="2" fill="#00A389" />

                <rect x="70" y="160" width="12" height="12" rx="2" />
                <rect x="100" y="160" width="12" height="12" rx="2" fill="#00D26A" />
                <rect x="130" y="160" width="12" height="12" rx="2" />
                <rect x="160" y="160" width="12" height="12" rx="2" />

                <rect x="80" y="180" width="12" height="12" rx="2" fill="#003B73" />
                <rect x="110" y="180" width="12" height="12" rx="2" fill="#00D26A" />
                <rect x="140" y="180" width="12" height="12" rx="2" />
              </svg>

              {/* Watermark badge */}
              <div className="absolute -bottom-3 bg-slate-900 text-[#00D26A] text-[9px] font-mono font-bold px-3 py-0.5 rounded-full border border-emerald-500/50 shadow-xs">
                BITCOIN TIMESTAMPMED
              </div>
            </div>

            {/* NPI & Quick Actions */}
            <div className="mt-6 flex flex-col items-center space-y-1">
              <span className="text-xs text-slate-400 font-semibold uppercase">Numéro Personnel d'Identification</span>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xl font-black text-slate-900 tracking-wider">
                  {currentUser.npi || '1097885544901'}
                </span>
                <button
                  onClick={handleCopyNpi}
                  className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-emerald-600 transition"
                  title="Copier le NPI"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          {/* Action Download / Share */}
          <div className="flex flex-wrap items-center justify-center gap-3 w-full">
            <button
              onClick={() => {
                soundFX.playSuccess();
                triggerConfetti();
              }}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs px-6 py-3 rounded-2xl flex items-center gap-2 transition shadow-md"
            >
              <Download className="w-4 h-4" />
              <span>Télécharger Carte PDF</span>
            </button>

            <button
              onClick={() => {
                soundFX.playBeep(900, 0.04);
                if (navigator.share) {
                  navigator.share({ title: 'Santé+ QR Code Médical', text: qrDataPayload });
                }
              }}
              className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs px-6 py-3 rounded-2xl flex items-center gap-2 transition"
            >
              <Share2 className="w-4 h-4" />
              <span>Partager</span>
            </button>
          </div>
        </div>

        {/* Right 1 Col: Embedded Medical Emergency Payload Info */}
        <div className="space-y-4">
          
          {/* Card: Embedded Data */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              Données Scannées Instantanément
            </h3>

            <div className="space-y-3">
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80">
                <span className="text-[10px] text-slate-400 font-semibold block uppercase">Identité Patient</span>
                <span className="text-sm font-bold text-slate-900 mt-0.5 block">{currentUser.name}</span>
              </div>

              <div className="p-3 bg-red-50 rounded-2xl border border-red-200">
                <span className="text-[10px] text-red-600 font-bold block uppercase flex items-center gap-1">
                  <Heart className="w-3 h-3 text-red-600" />
                  Groupe Sanguin
                </span>
                <span className="text-base font-black text-red-700 mt-0.5 block">
                  {currentUser.bloodType || 'O+'} (Donneur Actif)
                </span>
              </div>

              <div className="p-3 bg-rose-50 rounded-2xl border border-rose-300">
                <span className="text-[10px] text-rose-700 font-extrabold block uppercase flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3 text-rose-600" />
                  Alerte Allergie Majeure
                </span>
                <span className="text-sm font-black text-rose-900 mt-0.5 block">
                  {currentUser.allergies?.join(', ') || 'PÉNICILLINE'}
                </span>
                <span className="text-[10px] text-rose-600 block mt-0.5">
                  Contre-indication formelle aux bêta-lactamines
                </span>
              </div>

              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80">
                <span className="text-[10px] text-slate-400 font-semibold block uppercase">Preuve Cryptographique</span>
                <span className="text-xs font-mono font-bold text-slate-700 mt-0.5 block break-all">
                  Merkle: 0x99fa1b8c66e277d33b8a44c99e11f0a823b49c71
                </span>
              </div>
            </div>

            <button
              onClick={() => openTxVerifier('0x4e3f2a1b9c7d8e6a5f0123456789abcdef0123456789abcdef0123456789abcd')}
              className="w-full bg-[#001E2B] hover:bg-[#002D40] text-emerald-400 font-mono font-bold text-xs py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Vérifier l'Empreinte Blockchain</span>
            </button>
          </div>

          {/* Zero Friction Notice */}
          <div className="bg-emerald-50/70 border border-emerald-200 p-4 rounded-3xl text-xs text-emerald-950 leading-relaxed space-y-1">
            <div className="font-extrabold flex items-center gap-1.5 text-emerald-900">
              <Eye className="w-4 h-4 text-emerald-600" />
              Zéro Erreur d'Aiguillage
            </div>
            <p>
              Le médecin ne peut pas se tromper de dossier médical ni administrer un médicament dangereux grâce à l'alerte automatique générée au scan.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
