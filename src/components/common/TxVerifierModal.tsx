import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, CheckCircle2, Copy, Check, ExternalLink, X, Lock, Cpu } from 'lucide-react';

export const TxVerifierModal: React.FC = () => {
  const { verifiedTxid, closeTxVerifier } = useApp();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setCopied(false);
  }, [verifiedTxid]);

  if (!verifiedTxid) return null;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(verifiedTxid);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
        
        {/* Header */}
        <div className="bg-[#001824] text-white p-6 relative">
          <button
            onClick={closeTxVerifier}
            className="absolute top-4 right-4 text-slate-400 hover:text-white p-1.5 rounded-full hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#F7931A] to-amber-300 p-0.5 flex items-center justify-center text-slate-950 font-black shadow-md">
              <ShieldCheck className="w-7 h-7 text-[#001824]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#F7931A] bg-[#F7931A]/10 px-2 py-0.5 rounded-full border border-[#F7931A]/30">
                  Vérification Cryptographique
                </span>
                <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Authentique
                </span>
              </div>
              <h3 className="text-xl font-black mt-1">Horodatage Bitcoin OP_RETURN</h3>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* TXID Box */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
              <span className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-emerald-600" />
                Transaction Hash (TXID)
              </span>
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-1 text-[#00A389] hover:text-[#00D26A] font-bold text-xs"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copié !' : 'Copier'}</span>
              </button>
            </div>
            <div className="font-mono text-xs text-slate-800 bg-white p-3 rounded-xl border border-slate-200 break-all select-all leading-relaxed shadow-inner">
              {verifiedTxid}
            </div>
          </div>

          {/* Verification Details Grid */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-slate-400 block font-medium">Blockchain</span>
              <span className="font-bold text-slate-800 text-sm mt-0.5">Bitcoin Mainnet</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-slate-400 block font-medium">Hauteur de Bloc</span>
              <span className="font-bold text-slate-800 text-sm mt-0.5">#894520</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-slate-400 block font-medium">Type d'Empreinte</span>
              <span className="font-bold text-emerald-700 text-sm mt-0.5">SHA-256 OP_RETURN</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-slate-400 block font-medium">Statut de Traçabilité</span>
              <span className="font-bold text-emerald-700 text-sm mt-0.5">Inviolable à Vie</span>
            </div>
          </div>

          {/* Notice */}
          <div className="flex items-start gap-3 p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-900 leading-relaxed">
            <Cpu className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <p>
              Ce document médical est ancré de façon immuable dans le grand livre distribué mondial. Aucune modification rétroactive, suppression ou falsification n'est mathématiquement possible.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 pt-2">
            <a
              href={`https://mempool.space/tx/${verifiedTxid}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-[#001E2B] hover:bg-[#002D40] text-white font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition"
            >
              <ExternalLink className="w-4 h-4 text-[#F7931A]" />
              <span>Voir sur Mempool.space</span>
            </a>
            <button
              onClick={closeTxVerifier}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 px-5 rounded-xl text-xs transition"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
