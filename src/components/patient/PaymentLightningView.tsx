import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Zap,
  CreditCard,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Smartphone,
  ArrowUpRight,
  ArrowDownLeft,
  DollarSign,
  AlertCircle,
  Copy,
  Check,
  QrCode
} from 'lucide-react';
import { soundFX, triggerConfetti } from '../../utils/audioAndFx';

export const PaymentLightningView: React.FC = () => {
  const { currentUser, consultations, payConsultationLightning, openTxVerifier } = useApp();
  const [payingId, setPayingId] = useState<string | null>(null);
  const [activePaymentMethod, setActivePaymentMethod] = useState<'lightning' | 'momo' | 'flooz'>('lightning');
  const [copiedInvoice, setCopiedInvoice] = useState(false);

  const sampleLightningInvoice = 'lnbc50000n1p3xxxxpp598f42c710d8e2a3b4c5d6e7f8g9h0j1k2l3m4n5p6q7r8s9t0u1v2w3x4y5z...';

  const pendingConsultation = consultations.find(c => c.paymentStatus === 'en_attente') || consultations[0];

  const handlePayNow = async (consultationId: string) => {
    setPayingId(consultationId);
    await payConsultationLightning(consultationId);
    setPayingId(null);
  };

  const handleCopyInvoice = () => {
    navigator.clipboard.writeText(sampleLightningInvoice);
    setCopiedInvoice(true);
    soundFX.playBeep(900, 0.04);
    setTimeout(() => setCopiedInvoice(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-200">
      
      {/* Header Bar */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-amber-100 text-amber-900 text-xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              Lightning Network & Mobile Money
            </span>
            <span className="text-xs text-emerald-600 font-bold">Frais 0.1% · Règlement en 2 secondes</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 mt-1">
            Paiements Médicaux Ultra-Rapides
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Réglez instantanément vos consultations, actes de laboratoire et médicaments sans intermédiaire bancaire lourd.
          </p>
        </div>

        {/* Live Wallet Balance */}
        <div className="bg-[#001824] text-white p-4 rounded-2xl flex items-center gap-4 shadow-md">
          <div>
            <span className="text-[10px] text-slate-400 font-semibold uppercase block">Solde Portefeuille Santé+</span>
            <span className="text-xl font-black text-amber-400">
              {(currentUser.walletBalanceFcfa || 45000).toLocaleString()} FCFA
            </span>
            <span className="text-[11px] text-slate-300 font-mono block">
              ≈ {(currentUser.walletBalanceSats || 215000).toLocaleString()} sats
            </span>
          </div>
        </div>
      </div>

      {/* Main Payment Card & Invoice */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Consultation Invoice to Pay */}
        <div className="md:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
          
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400">Facture Numérique #9081</span>
              <h3 className="text-lg font-black text-slate-900">
                Consultation Clinique Sainte-Marie
              </h3>
            </div>
            <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full">
              {pendingConsultation.paymentStatus === 'payée' ? '✓ Facture Réglée' : 'En attente de règlement'}
            </span>
          </div>

          {/* Invoice Breakdown */}
          <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200/70 text-xs">
            <div className="flex justify-between py-1">
              <span className="text-slate-600">Patient</span>
              <span className="font-bold text-slate-900">{currentUser.name} (NPI {currentUser.npi})</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-600">Praticien</span>
              <span className="font-bold text-slate-900">Dr. Jean Kodjo (Médecine Générale)</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-600">Diagnostic</span>
              <span className="font-semibold text-slate-800">Infection urinaire aiguë</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-600">Frais de réseau Lightning (0.1%)</span>
              <span className="font-bold text-emerald-700">5 FCFA (vs 250 FCFA banques classiques)</span>
            </div>
            <div className="border-t border-slate-200 pt-2 flex justify-between text-sm font-black">
              <span className="text-slate-900">Montant Total :</span>
              <span className="text-emerald-700 font-extrabold text-base">
                {pendingConsultation.feeFcfa.toLocaleString()} FCFA
              </span>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              Sélectionnez le moyen de règlement
            </span>

            <div className="grid grid-cols-3 gap-2.5">
              <button
                onClick={() => setActivePaymentMethod('lightning')}
                className={`p-3 rounded-2xl border flex flex-col items-center justify-center gap-1 transition ${
                  activePaymentMethod === 'lightning'
                    ? 'border-amber-400 bg-amber-50 text-amber-950 font-extrabold ring-2 ring-amber-300'
                    : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Zap className="w-5 h-5 text-amber-500" />
                <span className="text-xs">Lightning ⚡</span>
                <span className="text-[9px] text-amber-700">2s · 0.1% frais</span>
              </button>

              <button
                onClick={() => setActivePaymentMethod('momo')}
                className={`p-3 rounded-2xl border flex flex-col items-center justify-center gap-1 transition ${
                  activePaymentMethod === 'momo'
                    ? 'border-yellow-400 bg-yellow-50 text-yellow-950 font-extrabold ring-2 ring-yellow-300'
                    : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Smartphone className="w-5 h-5 text-yellow-600" />
                <span className="text-xs">MTN MoMo</span>
                <span className="text-[9px] text-slate-500">Passerelle Bénin</span>
              </button>

              <button
                onClick={() => setActivePaymentMethod('flooz')}
                className={`p-3 rounded-2xl border flex flex-col items-center justify-center gap-1 transition ${
                  activePaymentMethod === 'flooz'
                    ? 'border-blue-400 bg-blue-50 text-blue-950 font-extrabold ring-2 ring-blue-300'
                    : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                }`}
              >
                <CreditCard className="w-5 h-5 text-blue-600" />
                <span className="text-xs">Moov Flooz</span>
                <span className="text-[9px] text-slate-500">Passerelle Bénin</span>
              </button>
            </div>
          </div>

          {/* Instant Payment Trigger Button */}
          <div>
            <button
              onClick={() => handlePayNow(pendingConsultation.id)}
              disabled={payingId !== null}
              className="w-full bg-[#00D26A] hover:bg-[#00b55b] text-slate-950 font-extrabold py-4 px-6 rounded-2xl text-base flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/30 transition transform active:scale-98 disabled:opacity-50"
            >
              <Zap className="w-5 h-5" />
              <span>
                {payingId ? 'Paiement en cours sur le Lightning Node (2s)...' : 'Payer 5 000 FCFA en 2 Secondes'}
              </span>
            </button>
          </div>
        </div>

        {/* Right 1 Col: Lightning Invoice QR & Proof */}
        <div className="space-y-4">
          
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4 text-center">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-700 flex items-center justify-center gap-1.5">
              <QrCode className="w-4 h-4 text-amber-500" />
              Facture Lightning LNURL
            </h3>

            {/* Lightning QR Code */}
            <div className="w-44 h-44 mx-auto bg-slate-900 p-3 rounded-2xl shadow-md flex items-center justify-center relative">
              <svg viewBox="0 0 100 100" className="w-full h-full fill-white">
                <rect x="5" y="5" width="25" height="25" rx="3" fill="#F7931A" />
                <rect x="70" y="5" width="25" height="25" rx="3" fill="#F7931A" />
                <rect x="5" y="70" width="25" height="25" rx="3" fill="#F7931A" />
                <rect x="35" y="10" width="8" height="8" />
                <rect x="50" y="10" width="8" height="8" />
                <rect x="35" y="25" width="8" height="8" />
                <rect x="10" y="35" width="8" height="8" />
                <rect x="25" y="35" width="8" height="8" />
                <rect x="50" y="35" width="8" height="8" />
                <rect x="70" y="35" width="8" height="8" />
                <rect x="85" y="35" width="8" height="8" />
                <rect x="45" y="45" width="10" height="10" fill="#00D26A" />
                <rect x="35" y="70" width="8" height="8" />
                <rect x="50" y="70" width="8" height="8" />
                <rect x="65" y="70" width="8" height="8" />
                <rect x="80" y="70" width="8" height="8" />
                <rect x="50" y="85" width="8" height="8" />
              </svg>
            </div>

            <button
              onClick={handleCopyInvoice}
              className="w-full text-xs font-mono bg-slate-50 hover:bg-slate-100 text-slate-700 py-2 px-3 rounded-xl border border-slate-200 flex items-center justify-center gap-1.5 transition"
            >
              {copiedInvoice ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedInvoice ? 'Invoice copiée !' : 'Copier LN Invoice'}</span>
            </button>
          </div>

          {/* On-Chain Security Badge */}
          <div className="bg-[#001824] text-slate-300 p-5 rounded-3xl text-xs space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-extrabold uppercase text-[11px]">
              <ShieldCheck className="w-4 h-4" />
              Garantie Anti-Fraude
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Chaque facture réglée émet une signature cryptographique automatique transmise à la comptabilité de l'hôpital et ancrée dans le bloc Bitcoin.
            </p>
            <button
              onClick={() => openTxVerifier('0x9b2a11cf88de77cd66ab55ef44cc33bb22aa1199887766554433221100fedcba')}
              className="text-[11px] font-mono text-[#F7931A] hover:underline flex items-center gap-1"
            >
              <span>Voir la preuve TXID comptable →</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
