import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Mic,
  MicOff,
  Stethoscope,
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  Send,
  Lock,
  CheckCircle2,
  Clock,
  Pill,
  Trash2,
  Plus,
  Zap,
  Volume2,
  FileText
} from 'lucide-react';
import { soundFX, triggerConfetti, speakText } from '../../utils/audioAndFx';
import { PrescriptionItem } from '../../types';

export const ExpressConsultationView: React.FC = () => {
  const { addConsultation, openTxVerifier, setDoctorTab } = useApp();

  const [isRecording, setIsRecording] = useState(false);
  const [isAiProcessing, setIsAiProcessing] = useState(false);
  const [spokenTranscript, setSpokenTranscript] = useState('');

  // Clinical Form Fields
  const [chiefComplaint, setChiefComplaint] = useState('Douleur au ventre depuis 3 jours, brûlures mictionnelles.');
  const [diagnosis, setDiagnosis] = useState('Infection urinaire basse aiguë (Cystite aiguë non compliquée).');
  const [clinicalNotes, setClinicalNotes] = useState('Examen abdominal : sensibilité sus-pubienne sans défense. Pas de fièvre (37.2°C). Bandelette urinaire : Leucocytes +++, Nitrites +.');
  const [prescriptions, setPrescriptions] = useState<PrescriptionItem[]>([
    {
      id: 'rx_1',
      medication: 'Ciprofloxacine',
      dosage: '500 mg',
      frequency: '2 fois par jour',
      duration: '7 jours',
      instructions: 'À prendre au milieu des repas avec un grand verre d\'eau.'
    },
    {
      id: 'rx_2',
      medication: 'Paracétamol',
      dosage: '1 g',
      frequency: 'Si douleur (max 3g/jour)',
      duration: '7 jours',
      instructions: 'Espacer les prises d\'au moins 6 heures.'
    }
  ]);

  const [allergyNotice, setAllergyNotice] = useState<string | null>(
    'Alerte Pénicilline Active : Les dérivés de bêta-lactamines ont été formellement exclus. Ciprofloxacine (Fluoroquinolone) 100% sécurisée.'
  );

  const [completedTxid, setCompletedTxid] = useState<string | null>(null);

  const sampleVoiceDictation = "Douleur au ventre depuis 3 jours. Infection urinaire suspectée. Prescrire Ciprofloxacine 500 mg deux fois par jour pendant 7 jours. Prochain rendez-vous dans une semaine.";

  const handleSimulateVoiceInput = async () => {
    soundFX.playBeep(1100, 0.05);
    setIsRecording(true);
    setSpokenTranscript('');

    // Speak audio prompt or simulate speech
    await speakText(sampleVoiceDictation);

    setSpokenTranscript(sampleVoiceDictation);
    setIsRecording(false);

    // Call server AI parser
    setIsAiProcessing(true);
    soundFX.playBeep(900, 0.04);

    try {
      const res = await fetch('/api/ai/parse-consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          spokenText: sampleVoiceDictation,
          patientName: 'Bienvenue Segnon',
          patientAllergies: ['Pénicilline']
        })
      });

      if (res.ok) {
        const json = await res.json();
        if (json.data) {
          setChiefComplaint(json.data.motif || chiefComplaint);
          setDiagnosis(json.data.diagnostic || diagnosis);
          if (json.data.prescriptions && json.data.prescriptions.length > 0) {
            setPrescriptions(json.data.prescriptions);
          }
          if (json.data.allergyWarning) {
            setAllergyNotice(json.data.allergyWarning);
          }
        }
      }
    } catch (e) {
      console.warn('AI Parsing fallback', e);
    } finally {
      setIsAiProcessing(false);
      soundFX.playSuccess();
    }
  };

  const handleAddMedication = () => {
    soundFX.playBeep(800, 0.03);
    const newRx: PrescriptionItem = {
      id: `rx_${Date.now()}`,
      medication: 'Spasfon (Phloroglucinol)',
      dosage: '80 mg',
      frequency: '3 fois par jour si spasmes',
      duration: '5 jours',
      instructions: 'Par voie orale'
    };
    setPrescriptions([...prescriptions, newRx]);
  };

  const handleRemoveMedication = (id: string) => {
    soundFX.playBeep(600, 0.03);
    setPrescriptions(prescriptions.filter(p => p.id !== id));
  };

  const handleFinalizeAndTimestamp = () => {
    const generatedTxid = '0x4e3f2a1b9c7d8e6a5f0123456789abcdef0123456789abcdef0123456789abcd';
    
    addConsultation({
      patientId: 'pat_001',
      patientName: 'Bienvenue Segnon',
      patientNpi: '1097885544901',
      doctorId: 'usr_doc_001',
      doctorName: 'Dr. Jean Kodjo',
      doctorSpecialty: 'Médecine Générale',
      hospitalId: 'hosp_001',
      hospitalName: 'Clinique Sainte-Marie',
      date: '2026-06-30',
      time: '10:32',
      chiefComplaint,
      diagnosis,
      clinicalNotes,
      prescriptions,
      feeFcfa: 5000,
      paymentStatus: 'en_attente',
      bitcoinTxid: generatedTxid,
      merkleProof: 'valid_merkle_sha256_opreturn'
    });

    setCompletedTxid(generatedTxid);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-200">
      
      {/* Header Bar */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-teal-100 text-teal-800 text-xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Consultation Express 2-Minutes
            </span>
            <span className="text-xs text-emerald-600 font-semibold">Assistance Vocale IA Gemini</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 mt-1">
            Consultation de Bienvenue Segnon
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            NPI: <strong className="font-mono text-slate-800">1097885544901</strong> · Prise en charge Dr. Jean Kodjo
          </p>
        </div>

        {/* Big Allergy Banner */}
        <div className="bg-rose-600 text-white p-3.5 rounded-2xl flex items-center gap-3 shadow-md animate-pulse">
          <AlertTriangle className="w-6 h-6 shrink-0" />
          <div className="text-left">
            <span className="text-[10px] uppercase font-bold tracking-wider block opacity-90">Alerte Sécurité Clinique</span>
            <span className="text-sm font-black">ALLERGIE : PÉNICILLINE</span>
          </div>
        </div>
      </div>

      {/* Completed Success Box if finalized */}
      {completedTxid && (
        <div className="bg-[#001824] text-white p-6 sm:p-8 rounded-3xl border-2 border-emerald-500 shadow-2xl space-y-4 animate-in zoom-in-95">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#00D26A] text-slate-950 flex items-center justify-center font-black">
                ✓
              </div>
              <div>
                <h3 className="text-xl font-black text-white">Consultation Clôturée & Ancrée sur Bitcoin !</h3>
                <p className="text-xs text-slate-300">
                  L'ordonnance est horodatée de manière inviolable et la facture de 5 000 FCFA est transmise au patient.
                </p>
              </div>
            </div>

            <button
              onClick={() => openTxVerifier(completedTxid)}
              className="bg-[#00D26A] hover:bg-[#00b55b] text-slate-950 font-black text-xs px-5 py-3 rounded-xl flex items-center gap-2 transition shadow-md"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Vérifier le TXID On-Chain</span>
            </button>
          </div>

          <div className="p-3 bg-slate-900 rounded-xl font-mono text-xs text-emerald-400 break-all border border-slate-800">
            TXID: {completedTxid}
          </div>

          <div className="pt-2 flex justify-end gap-3">
            <button
              onClick={() => setDoctorTab('waiting_room')}
              className="bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-4 py-2 rounded-xl transition"
            >
              Retour à la salle d'attente
            </button>
          </div>
        </div>
      )}

      {/* Voice Dictation Simulation Bar */}
      <div className="bg-gradient-to-r from-teal-900 via-slate-900 to-[#001824] text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition shadow-md ${
              isRecording ? 'bg-red-500 animate-pulse text-white' : 'bg-white/10 text-emerald-400'
            }`}>
              {isRecording ? <Mic className="w-6 h-6" /> : <Sparkles className="w-6 h-6" />}
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-400 bg-emerald-950 px-2.5 py-0.5 rounded-full border border-emerald-800">
                Dictée Vocale Intelligente (30 secondes)
              </span>
              <h3 className="text-lg font-black text-white mt-1">
                Saisie Vocale & Structuration IA Clinique
              </h3>
            </div>
          </div>

          <button
            onClick={handleSimulateVoiceInput}
            disabled={isRecording || isAiProcessing}
            className={`px-6 py-3.5 rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition transform hover:scale-[1.02] active:scale-95 disabled:opacity-50 ${
              isRecording
                ? 'bg-red-600 text-white animate-pulse'
                : 'bg-[#00D26A] text-slate-950 hover:bg-[#00b55b]'
            }`}
          >
            <Mic className="w-4 h-4" />
            <span>
              {isRecording ? 'Enregistrement en cours...' : isAiProcessing ? 'Structuration IA...' : 'Tester la Dictée Vocale (Audio)'}
            </span>
          </button>
        </div>

        {/* Live Audio Transcript Box */}
        {spokenTranscript && (
          <div className="p-4 bg-white/10 rounded-2xl border border-white/15 text-xs space-y-1">
            <span className="text-[10px] uppercase font-bold text-emerald-300 flex items-center gap-1">
              <Volume2 className="w-3.5 h-3.5" />
              Transcription Vocale Captée
            </span>
            <p className="text-slate-100 font-medium italic text-sm">
              « {spokenTranscript} »
            </p>
          </div>
        )}
      </div>

      {/* Structured Medical Form (Auto-filled by IA) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6 text-xs">
        
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-teal-600" />
            Dossier de Consultation Structuré
          </h3>
          <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
            ✓ Auto-complété par IA
          </span>
        </div>

        {/* Complaint & Diagnosis */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Motif de Consultation</label>
            <textarea
              rows={2}
              value={chiefComplaint}
              onChange={e => setChiefComplaint(e.target.value)}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-hidden text-slate-800"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Diagnostic Clinique Retenu</label>
            <textarea
              rows={2}
              value={diagnosis}
              onChange={e => setDiagnosis(e.target.value)}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-hidden text-slate-800"
            />
          </div>
        </div>

        {/* Clinical Notes */}
        <div>
          <label className="block font-bold text-slate-700 mb-1">Observations & Examen Clinique</label>
          <textarea
            rows={2}
            value={clinicalNotes}
            onChange={e => setClinicalNotes(e.target.value)}
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-hidden text-slate-800"
          />
        </div>

        {/* Prescriptions Table */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="block font-extrabold text-slate-900 text-sm flex items-center gap-1.5">
              <Pill className="w-4 h-4 text-purple-600" />
              Prescriptions & Posologie
            </label>
            <button
              type="button"
              onClick={handleAddMedication}
              className="text-xs font-bold text-teal-600 hover:text-teal-700 flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Ajouter une ligne</span>
            </button>
          </div>

          <div className="space-y-2.5">
            {prescriptions.map(rx => (
              <div
                key={rx.id}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-0.5">
                  <div className="font-black text-slate-900 text-sm flex items-center gap-2">
                    <span>{rx.medication}</span>
                    <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md">
                      {rx.dosage}
                    </span>
                  </div>
                  <div className="text-slate-600 font-medium">
                    {rx.frequency} · Durée : <strong>{rx.duration}</strong>
                  </div>
                  {rx.instructions && (
                    <div className="text-[11px] text-slate-400 italic">{rx.instructions}</div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => handleRemoveMedication(rx.id)}
                  className="text-slate-400 hover:text-red-600 p-2 rounded-lg hover:bg-slate-200/60 transition self-end sm:self-center"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Allergy Verification Notice */}
        {allergyNotice && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3 text-emerald-950">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <p className="font-semibold text-xs leading-relaxed">{allergyNotice}</p>
          </div>
        )}

        {/* Finalize Action Button */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-500 font-medium">
            Facture de consultation : <strong className="text-slate-800">5 000 FCFA</strong> (Transmise sur le wallet du patient)
          </div>

          <button
            type="button"
            onClick={handleFinalizeAndTimestamp}
            disabled={completedTxid !== null}
            className="w-full sm:w-auto bg-gradient-to-r from-teal-600 to-[#00D26A] hover:from-teal-700 hover:to-[#00b55b] text-slate-950 font-black py-4 px-8 rounded-2xl text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition transform hover:scale-[1.02] active:scale-95 disabled:opacity-50"
          >
            <Lock className="w-4 h-4" />
            <span>{completedTxid ? '✓ Consultation Horodatée On-Chain' : 'Terminer & Horodater sur Bitcoin'}</span>
          </button>
        </div>

      </div>

    </div>
  );
};
