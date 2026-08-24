import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, Zap, X, ShieldCheck } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast, openTxVerifier } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-md w-full pointer-events-none px-4 sm:px-0">
      {toasts.map(toast => {
        const isLightning = toast.type === 'lightning';
        const isSuccess = toast.type === 'success';
        const isError = toast.type === 'error';
        const isWarning = toast.type === 'warning';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-2xl shadow-xl border backdrop-blur-md transition-all animate-in slide-in-from-bottom-5 duration-200 ${
              isLightning
                ? 'bg-slate-900/95 text-white border-amber-400/40 shadow-amber-500/10'
                : isSuccess
                ? 'bg-emerald-950/95 text-white border-emerald-500/40 shadow-emerald-500/10'
                : isError
                ? 'bg-red-950/95 text-white border-red-500/40 shadow-red-500/10'
                : isWarning
                ? 'bg-amber-950/95 text-white border-amber-500/40 shadow-amber-500/10'
                : 'bg-slate-900/95 text-white border-slate-700'
            }`}
          >
            <div className="shrink-0 mt-0.5">
              {isLightning && <Zap className="w-5 h-5 text-amber-400 animate-pulse" />}
              {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
              {isError && <AlertCircle className="w-5 h-5 text-rose-400" />}
              {isWarning && <AlertTriangle className="w-5 h-5 text-amber-400" />}
              {!isLightning && !isSuccess && !isError && !isWarning && <Info className="w-5 h-5 text-blue-400" />}
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-bold leading-tight">{toast.title}</h4>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">{toast.description}</p>
              
              {toast.txid && (
                <button
                  onClick={() => openTxVerifier(toast.txid!)}
                  className="mt-2 text-[11px] font-mono text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-semibold underline underline-offset-2"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Vérifier On-Chain (OP_RETURN)</span>
                </button>
              )}
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
