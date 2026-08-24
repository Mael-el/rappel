import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  Bot,
  Send,
  User,
  ShieldCheck,
  HelpCircle,
  Pill,
  FileSearch,
  CheckCircle2,
  AlertTriangle,
  Loader2
} from 'lucide-react';
import { soundFX } from '../../utils/audioAndFx';

interface ChatMessage {
  id: string;
  sender: 'doctor' | 'ai';
  text: string;
  timestamp: string;
  safetyFlag?: 'safe' | 'warning';
}

export const DoctorAiAssistantView: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg_1',
      sender: 'ai',
      text: 'Bonjour Dr. Kodjo. Je suis votre assistant clinique d\'aide à la décision médicale Santé+. Comment puis-je vous aider aujourd\'hui ? Vous pouvez me demander de synthétiser le dossier d\'un patient, vérifier des contre-indications médicamenteuses ou analyser des résultats d\'examen.',
      timestamp: '10:30',
      safetyFlag: 'safe'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);

  const quickPrompts = [
    'Résume le dossier de Koffi Mensah',
    'Y a-t-il des interactions entre Amoxicilline et Ibuprofène ?',
    'Posologie de la Ciprofloxacine chez l\'adulte de 70kg',
    'Vérifier les antécédents d\'allergies de Bienvenue Segnon'
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    soundFX.playBeep(900, 0.04);
    const userMsg: ChatMessage = {
      id: `msg_${Date.now()}`,
      sender: 'doctor',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query,
          patientContext: {
            currentPatient: 'Bienvenue Segnon',
            allergies: ['Pénicilline'],
            bloodType: 'O+'
          }
        })
      });

      if (res.ok) {
        const json = await res.json();
        const aiMsg: ChatMessage = {
          id: `msg_${Date.now() + 1}`,
          sender: 'ai',
          text: json.answer || 'Analyse clinique effectuée avec succès.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          safetyFlag: 'safe'
        };
        setMessages(prev => [...prev, aiMsg]);
        soundFX.playSuccess();
      }
    } catch (err) {
      console.warn('AI query fallback', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-200">
      
      {/* Header Bar */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-teal-100 text-teal-800 text-xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
              <Bot className="w-3.5 h-3.5" />
              IA Gemini Clinique & RAG Dossiers
            </span>
            <span className="text-xs text-slate-400 font-semibold">Aide à la Décision Médicale</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 mt-1">
            Assistant Clinique du Dr. Jean Kodjo
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Interrogation en langage naturel connectée au grand livre blockchain et aux bases pharmacologiques.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Conforme Déontologie Médicale
          </span>
        </div>
      </div>

      {/* Suggested Quick Prompts */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {quickPrompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(prompt)}
            className="text-xs font-bold bg-white hover:bg-teal-50 text-slate-700 hover:text-teal-900 px-3.5 py-2 rounded-2xl border border-slate-200/80 shadow-2xs whitespace-nowrap transition flex items-center gap-1.5 shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>{prompt}</span>
          </button>
        ))}
      </div>

      {/* Chat Messages Feed */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs flex flex-col h-[460px] overflow-hidden">
        
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          {messages.map(msg => {
            const isDoctor = msg.sender === 'doctor';
            return (
              <div
                key={msg.id}
                className={`flex items-start gap-3 ${isDoctor ? 'justify-end' : 'justify-start'}`}
              >
                {!isDoctor && (
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-teal-600 to-[#00D26A] text-slate-950 flex items-center justify-center font-black shrink-0 shadow-xs">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-lg p-4 rounded-2xl text-xs leading-relaxed ${
                    isDoctor
                      ? 'bg-slate-900 text-white rounded-tr-none font-medium'
                      : 'bg-slate-50 text-slate-800 border border-slate-200/80 rounded-tl-none font-medium'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                  <span className={`block text-[10px] mt-1.5 ${isDoctor ? 'text-slate-400' : 'text-slate-400'}`}>
                    {msg.timestamp}
                  </span>
                </div>

                {isDoctor && (
                  <img
                    src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=80&fit=crop&q=80"
                    alt="Dr. Kodjo"
                    className="w-8 h-8 rounded-xl object-cover border border-slate-200 shrink-0"
                  />
                )}
              </div>
            );
          })}

          {loading && (
            <div className="flex items-center gap-3 text-slate-400 text-xs italic">
              <Loader2 className="w-4 h-4 animate-spin text-teal-600" />
              <span>Analyse clinique et pharmacologique en cours...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex items-center gap-3">
          <input
            type="text"
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
            placeholder="Posez une question clinique ou demandez une synthèse..."
            className="flex-1 p-3 bg-white border border-slate-200 rounded-2xl text-xs font-medium focus:ring-2 focus:ring-teal-500 focus:outline-hidden text-slate-800"
          />

          <button
            onClick={() => handleSendMessage()}
            disabled={!inputText.trim() || loading}
            className="bg-[#00D26A] hover:bg-[#00b55b] text-slate-950 font-black p-3 rounded-2xl transition disabled:opacity-40 shadow-sm"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
};
