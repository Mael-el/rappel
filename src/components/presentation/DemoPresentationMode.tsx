import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Play,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  User,
  Stethoscope,
  Building2,
  Activity,
  Volume2,
  ShieldCheck,
  Zap,
  HeartPulse,
  Flame,
  Award,
  Users,
  ExternalLink
} from 'lucide-react';
import { soundFX, speakText } from '../../utils/audioAndFx';

interface DemoSlide {
  id: string;
  chapter: string;
  speaker: string;
  title: string;
  duration: string;
  roleTarget: 'patient' | 'doctor' | 'admin' | 'superadmin' | 'presentation';
  targetTab?: string;
  scriptLines: string[];
  keyHighlights: { label: string; value: string; badge?: string }[];
  actionLabel?: string;
  speechAudioPrompt?: string;
}

export const DemoPresentationMode: React.FC = () => {
  const { setRole, setPatientTab, setDoctorTab, setAdminTab, setSuperAdminTab, demoStepIndex, setDemoStepIndex } = useApp();
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);

  const slides: DemoSlide[] = [
    {
      id: 'slide_0',
      chapter: 'Introduction',
      speaker: 'Bienvenu ESSEGNON (Product Owner)',
      title: 'Bienvenue sur Santé+ Bénin',
      duration: '1 min',
      roleTarget: 'presentation',
      scriptLines: [
        'Bonjour à toutes et à tous. Je suis Bienvenu ESSEGNON, Product Owner de l\'équipe Winners, accompagné de mes coéquipiers : Adorée, Orphet, Ismail et Prince.',
        'Santé+, c\'est une infrastructure nationale de santé numérique qui interconnecte tous les hôpitaux du Bénin et d\'Afrique.',
        'Notre promesse est simple : De l\'urgence au soin en 3 minutes, un dossier médical pour la vie.',
        'Aujourd\'hui, nous allons vous montrer le fonctionnement de Santé+ à travers 3 utilisateurs réels : Bienvenue Segnon (Patient), Dr. Jean Kodjo (Médecin) et l\'Administrateur de la Clinique Sainte-Marie.'
      ],
      keyHighlights: [
        { label: 'Promesse', value: '3 Minutes de l\'urgence au soin', badge: 'Vital' },
        { label: 'Sécurité', value: 'Ancrage Bitcoin Mainnet', badge: 'Immuable' },
        { label: 'Paiements', value: 'Lightning Network (2 sec)', badge: '0.1% frais' },
        { label: 'Équipe', value: 'Winners (5 ingénieurs)', badge: 'Bénin' }
      ],
      actionLabel: 'Démarrer le Parcours Patient',
      speechAudioPrompt: 'Bonjour à toutes et à tous. Je suis Bienvenu Essegnon de l\'équipe Winners. Bienvenue sur Santé Plus, de l\'urgence au soin en 3 minutes.'
    },
    {
      id: 'slide_1',
      chapter: 'Partie 1 : Patient',
      speaker: 'Bienvenue Segnon (Patient)',
      title: '1.1 Connexion & Tableau de bord',
      duration: '1 min',
      roleTarget: 'patient',
      targetTab: 'dashboard',
      scriptLines: [
        'Bienvenue ouvre l\'application sur son téléphone. Il se connecte avec son numéro de téléphone ou Face ID pour un accès instantané.',
        'Une fois connecté, il arrive sur son tableau de bord avec les hôpitaux à proximité et ses 6 modules clés : QR Code, Dossier, Paiements, Tontines, Rendez-vous, Don de sang.'
      ],
      keyHighlights: [
        { label: 'Utilisateur', value: 'Bienvenue Segnon', badge: 'NPI 1097885544901' },
        { label: 'Connexion', value: 'Biométrie / Téléphone', badge: '1 seconde' },
        { label: 'Accessibilité', value: 'Règle des 3 Clics', badge: 'Senior-ready' }
      ],
      actionLabel: 'Voir le Dashboard Patient',
      speechAudioPrompt: 'Bienvenue arrive sur son tableau de bord personnalisé avec tous ses services en un coup d\'œil.'
    },
    {
      id: 'slide_2',
      chapter: 'Partie 1 : Patient',
      speaker: 'Bienvenue Segnon (Patient)',
      title: '1.2 & 1.3 QR Code d\'Identification & Dossier Médical à Vie',
      duration: '1 min',
      roleTarget: 'patient',
      targetTab: 'qrcode',
      scriptLines: [
        'Bienvenue se présente à l\'accueil. Il n\'a pas de papier, pas de carte : il présente son QR Code.',
        'Le QR Code contient son NPI (1097885544901), son groupe sanguin O+ et son allergie à la Pénicilline, horodatés sur Bitcoin.',
        'Il peut consulter son historique complet à vie : consultations, prescriptions, analyses, vaccins et dons de sang.'
      ],
      keyHighlights: [
        { label: 'Identifiant NPI', value: '1097885544901', badge: 'Vérifié' },
        { label: 'Groupe & Allergie', value: 'O+ | Allergie Pénicilline', badge: 'Alerte Rouge' },
        { label: 'Historique', value: 'Consultations, Vaccins, Analyses', badge: 'Crypté' }
      ],
      actionLabel: 'Afficher le QR Code & Dossier',
      speechAudioPrompt: 'En présentant son QR code, Bienvenue transmet instantanément ses informations vitales et son dossier médical à vie.'
    },
    {
      id: 'slide_3',
      chapter: 'Partie 1 : Patient',
      speaker: 'Bienvenue Segnon (Patient)',
      title: '1.4 & 1.5 Recherche d\'Hôpital & Prise de Rendez-vous',
      duration: '1 min',
      roleTarget: 'patient',
      targetTab: 'appointments',
      scriptLines: [
        'Bienvenue veut consulter un généraliste. Il filtre les hôpitaux à moins de 5 km et prix max 5 000 FCFA.',
        'Il trouve la Clinique Sainte-Marie, notée 4.9 étoiles à 1,2 km, et prend rendez-vous avec le Dr. Jean Kodjo pour demain 10h30.'
      ],
      keyHighlights: [
        { label: 'Hôpital sélectionné', value: 'Clinique Sainte-Marie (1,2 km)', badge: '4.9 ⭐' },
        { label: 'Médecin', value: 'Dr. Jean Kodjo', badge: 'Médecine Générale' },
        { label: 'Tarif consultation', value: '5 000 FCFA', badge: 'Confirmation instantanée' }
      ],
      actionLabel: 'Tester la Réservation en Direct',
      speechAudioPrompt: 'Prise de rendez-vous confirmée avec le docteur Jean Kodjo pour demain à 10 heures 30.'
    },
    {
      id: 'slide_4',
      chapter: 'Partie 1 : Patient',
      speaker: 'Bienvenue Segnon (Patient)',
      title: '1.6 & 1.7 Paiement Lightning & Tontine Santé Bitcoin (2-of-3)',
      duration: '1 min',
      roleTarget: 'patient',
      targetTab: 'payment',
      scriptLines: [
        'Après sa consultation, Bienvenue paie sa facture de 5 000 FCFA en 2 secondes via Lightning Network avec 0.1% de frais.',
        'Il participe aussi à une Tontine Santé familiale de 5 membres (10 000 FCFA/mois) sécurisée en multi-signature Bitcoin (2-of-3), solde actuel : 120 000 FCFA.'
      ],
      keyHighlights: [
        { label: 'Paiement Lightning', value: 'Règlement en 2s · Frais 0.1%', badge: '⚡ Instantané' },
        { label: 'Tontine Santé', value: 'Solde 120 000 FCFA (5 membres)', badge: '2-of-3 Multi-sig' },
        { label: 'Prochain retrait', value: '15 Juillet 2026', badge: 'Sans fraude' }
      ],
      actionLabel: 'Tester le Paiement Lightning & Tontine',
      speechAudioPrompt: 'Paiement instantané en 2 secondes via Lightning et fonds de tontine protégés par multisignature.'
    },
    {
      id: 'slide_5',
      chapter: 'Partie 1 : Patient',
      speaker: 'Bienvenue Segnon (Patient)',
      title: '1.8 Don de Sang & SOS Pénurie O+ à Parakou',
      duration: '1 min',
      roleTarget: 'patient',
      targetTab: 'blood',
      scriptLines: [
        'Bienvenue est Donneur d\'Or avec 10 dons au compteur. Il reçoit une alerte urgente : l\'hôpital de Parakou a un besoin critique de sang O+.',
        'En un clic, il confirme sa disponibilité géolocalisée et la notification est transmise en temps réel à l\'hôpital.'
      ],
      keyHighlights: [
        { label: 'Statut donneur', value: 'Donneur d\'Or (10 dons)', badge: 'O+ Universel' },
        { label: 'Alerte Urgente', value: 'Pénurie O+ CHD Borgou (Parakou)', badge: 'Alerte Rouge' },
        { label: 'Impact', value: 'Sauve des vies en 1 clic', badge: 'GPS partagé' }
      ],
      actionLabel: 'Voir le Module Don de Sang',
      speechAudioPrompt: 'Alerte pénurie de sang à Parakou. Bienvenue se rend disponible en un clic.'
    },
    {
      id: 'slide_6',
      chapter: 'Partie 2 : Médecin',
      speaker: 'Dr. Jean Kodjo (Clinique Sainte-Marie)',
      title: '2.1 & 2.2 Dashboard Médecin & File d\'Attente avec Triage',
      duration: '1 min',
      roleTarget: 'doctor',
      targetTab: 'waiting_room',
      scriptLines: [
        'Le Dr. Jean Kodjo ouvre son espace clinique : 12 patients aujourd\'hui, 8 consultations effectuées, 15 ordonnances émises.',
        'La file d\'attente lui signale immédiatement le groupe O+ et l\'allergie Pénicilline de Bienvenue Segnon pour une prise en charge sécurisée.'
      ],
      keyHighlights: [
        { label: 'Médecin en poste', value: 'Dr. Jean Kodjo', badge: 'Clinique Ste-Marie' },
        { label: 'Patients du jour', value: '12 patients (8 terminés)', badge: 'En cours' },
        { label: 'Sécurité Triage', value: 'Alerte Allergie Pénicilline', badge: 'Priorité' }
      ],
      actionLabel: 'Ouvrir la Salle d\'Attente Médecin',
      speechAudioPrompt: 'Le docteur Kodjo consulte sa file d attente et repère immédiatement les alertes d allergie.'
    },
    {
      id: 'slide_7',
      chapter: 'Partie 2 : Médecin',
      speaker: 'Dr. Jean Kodjo (Clinique Sainte-Marie)',
      title: '2.3 à 2.6 Consultation Express 2-min avec Saisie Vocale IA',
      duration: '2 min',
      roleTarget: 'doctor',
      targetTab: 'consultation',
      scriptLines: [
        'Dr. Kodjo scanne le QR code du patient en 1 seconde. Il utilise la dictée vocale :',
        '« Douleur au ventre depuis 3 jours. Infection urinaire suspectée. Prescrire Ciprofloxacine 500 mg deux fois par jour pendant 7 jours. Prochain rendez-vous dans une semaine. »',
        'L\'IA remplit le motif, diagnostic et ordonnance en 30s. L\'ordonnance est horodatée sur Bitcoin (TXID: 0x4e3f2a1b...) et la facture de 5 000 FCFA envoyée.'
      ],
      keyHighlights: [
        { label: 'Identification QR', value: 'Scan en 1 seconde', badge: 'Zéro papier' },
        { label: 'Saisie Vocale IA', value: 'Remplissage automatique en 30s', badge: 'Gemini IA' },
        { label: 'Horodatage On-Chain', value: 'TXID 0x4e3f2a1b...', badge: 'OP_RETURN' },
        { label: 'Facturation', value: '5 000 FCFA envoyée au patient', badge: 'Lightning 2s' }
      ],
      actionLabel: 'Lancer la Consultation 2-Min en Direct',
      speechAudioPrompt: 'Dictée vocale enregistrée. L intelligence artificielle remplit automatiquement le diagnostic et la prescription.'
    },
    {
      id: 'slide_8',
      chapter: 'Partie 2 : Médecin',
      speaker: 'Dr. Jean Kodjo (Clinique Sainte-Marie)',
      title: '2.7 Assistant IA Médical (RAG & Interactions)',
      duration: '1 min',
      roleTarget: 'doctor',
      targetTab: 'ai_assistant',
      scriptLines: [
        'Dr. Kodjo interroge l\'assistant IA : « Résume le dossier de Koffi Mensah » -> Réponse : 45 ans, B+, donneur actif, antécédent douleur thoracique.',
        '« Y a-t-il des interactions entre Amoxicilline et Ibuprofène ? » -> Réponse : Aucune interaction majeure, mais précautions gastriques recommandées avec les repas.'
      ],
      keyHighlights: [
        { label: 'Dossier Koffi Mensah', value: 'Synthèse clinique instantanée', badge: 'RAG Médical' },
        { label: 'Interactions Médicaments', value: 'Amoxicilline + Ibuprofène validés', badge: 'Sécurité' },
        { label: 'Assistant Clinique', value: 'Aide à la décision médicale', badge: 'IA Gemini' }
      ],
      actionLabel: 'Interroger l\'Assistant IA',
      speechAudioPrompt: 'L assistant IA analyse les interactions médicamenteuses et résume les antécédents des patients.'
    },
    {
      id: 'slide_9',
      chapter: 'Partie 3 : Admin Clinique',
      speaker: 'Claudine Ahouissou (Administratrice Clinique Sainte-Marie)',
      title: '3.1 à 3.8 Dashboard Hôpital, Équipements, Revenus & Alerte Stock',
      duration: '3 min',
      roleTarget: 'admin',
      targetTab: 'dashboard',
      scriptLines: [
        'L\'administrateur de la Clinique Sainte-Marie supervise l\'établissement : 1 240 patients (+15%), 356 consultations/mois (+20%), 2.4M FCFA de revenus (+25%).',
        'Gestion des médecins (Dr. Kodjo 4.8⭐, Dr. Gbaguidi 4.9⭐), suivi du parc d\'équipements (IRM, Échographe, Radiographe en maintenance) et déclenchement d\'alerte rupture de stock O+ vers 12 donneurs proches.',
        'Toutes les 1 240 actions sont enregistrées dans le journal d\'audit blockchain immuable.'
      ],
      keyHighlights: [
        { label: 'Volume Patients', value: '1 240 patients (+15%)', badge: 'Clinique Ste-Marie' },
        { label: 'Revenus du mois', value: '2.4M FCFA (+25%)', badge: 'Sécurisé' },
        { label: 'Parc Équipements', value: 'Scanner IRM, Écho, Radio', badge: 'Maintenance' },
        { label: 'Journal Blockchain', value: '1 240 actions ancrées', badge: 'Inviolable' }
      ],
      actionLabel: 'Ouvrir l\'Espace Admin Clinique',
      speechAudioPrompt: 'Vue globale de la clinique Sainte-Marie : indicateurs clés, équipements médicaux et alertes de stock.'
    },
    {
      id: 'slide_10',
      chapter: 'Partie 4 : Super Admin',
      speaker: 'Ministère de la Santé / Équipe Winners',
      title: '4.1 à 4.6 Tableau de Bord National & Architecture Microservices',
      duration: '3 min',
      roleTarget: 'superadmin',
      targetTab: 'dashboard',
      scriptLines: [
        'Vue nationale pour le Ministère de la Santé : 15 hôpitaux connectés, 1.2M patients inscrits, 125M FCFA de volume, 45 000 transactions ancrées sur Bitcoin.',
        'Carte interactive du réseau hospitalier béninois avec alertes en temps réel (pénurie O+ à Parakou, AB- à Cotonou).',
        'Supervision en direct des 12 microservices (Auth, Patient API, Lightning Node, Tontine Ledger, Blood Bank Sync, etc.) et flux de transactions blockchain.'
      ],
      keyHighlights: [
        { label: 'Hôpitaux connectés', value: '15 hôpitaux au Bénin', badge: 'National' },
        { label: 'Patients couverts', value: '1.2 Million de citoyens', badge: '+5%' },
        { label: 'Microservices actifs', value: '12 services opérationnels', badge: 'Port 3881-8880' },
        { label: 'Transactions On-Chain', value: '45 000 TXIDs ancrés', badge: 'Mainnet' }
      ],
      actionLabel: 'Explorer la Vue Nationale Bénin',
      speechAudioPrompt: 'Supervision nationale de l ensemble du réseau hospitalier béninois et état des microservices.'
    },
    {
      id: 'slide_11',
      chapter: 'Conclusion',
      speaker: 'Équipe Winners',
      title: 'La Révolution Santé+ pour l\'Afrique',
      duration: '1 min',
      roleTarget: 'presentation',
      scriptLines: [
        'Notre force, c\'est un écosystème complet :',
        '• Un dossier médical à vie pour chaque patient.',
        '• Des paiements en 2 secondes via Lightning Network.',
        '• Une sécurité inégalée grâce à Bitcoin.',
        '• Un fonctionnement hors-ligne, accessible partout en 2G.',
        '• Des tontines santé communautaires en multi-signature.',
        '• Une IA médicale bienveillante pour assister nos médecins.',
        'Notre mission : Rendre les soins de santé accessibles, traçables et sécurisés pour chaque citoyen africain.'
      ],
      keyHighlights: [
        { label: 'Slogan', value: 'De l\'urgence au soin en 3 minutes', badge: 'Santé+' },
        { label: 'Dossier', value: 'Un dossier médical pour la vie', badge: 'Universel' },
        { label: 'Équipe', value: 'Bienvenu, Adorée, Orphet, Ismail, Prince', badge: 'Winners' }
      ],
      actionLabel: 'Recommencer la Démonstration',
      speechAudioPrompt: 'Merci pour votre attention. Santé Plus, de l urgence au soin en 3 minutes, un dossier médical pour la vie.'
    }
  ];

  const currentSlide = slides[demoStepIndex] || slides[0];

  const handleNext = () => {
    soundFX.playBeep(700, 0.05);
    if (demoStepIndex < slides.length - 1) {
      setDemoStepIndex(demoStepIndex + 1);
    }
  };

  const handlePrev = () => {
    soundFX.playBeep(600, 0.05);
    if (demoStepIndex > 0) {
      setDemoStepIndex(demoStepIndex - 1);
    }
  };

  const handleExecuteLive = () => {
    soundFX.playSuccess();
    if (currentSlide.roleTarget !== 'presentation') {
      setRole(currentSlide.roleTarget);
      if (currentSlide.targetTab) {
        if (currentSlide.roleTarget === 'patient') setPatientTab(currentSlide.targetTab);
        if (currentSlide.roleTarget === 'doctor') setDoctorTab(currentSlide.targetTab);
        if (currentSlide.roleTarget === 'admin') setAdminTab(currentSlide.targetTab);
        if (currentSlide.roleTarget === 'superadmin') setSuperAdminTab(currentSlide.targetTab);
      }
    } else {
      setDemoStepIndex(1);
    }
  };

  const handlePlayVoice = async () => {
    if (currentSlide.speechAudioPrompt) {
      setIsPlayingVoice(true);
      await speakText(currentSlide.speechAudioPrompt);
      setIsPlayingVoice(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 animate-in fade-in duration-300">
      
      {/* Top Demo Banner */}
      <div className="bg-gradient-to-r from-[#001E2B] via-[#003B46] to-[#075E54] text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 bg-[#00D26A]/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="bg-[#00D26A] text-slate-950 font-extrabold text-xs px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                SCRIPT DE DÉMONSTRATION OFFICIEL
              </span>
              <span className="text-emerald-300 text-xs font-semibold bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-700/50">
                Étape {demoStepIndex + 1} / {slides.length} · {currentSlide.chapter}
              </span>
              <span className="text-slate-300 text-xs font-medium">
                ⏱️ Durée : {currentSlide.duration}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white mt-2">
              {currentSlide.title}
            </h1>
            <p className="text-emerald-200 text-sm font-medium flex items-center gap-2">
              <span>🎤 Orateur / Rôle :</span>
              <strong className="text-white bg-white/10 px-2.5 py-0.5 rounded-lg">{currentSlide.speaker}</strong>
            </p>
          </div>

          {/* Audio Speech Trigger & Navigation */}
          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            {currentSlide.speechAudioPrompt && (
              <button
                onClick={handlePlayVoice}
                disabled={isPlayingVoice}
                className={`flex items-center gap-2 px-4 py-3 rounded-2xl font-bold text-xs transition ${
                  isPlayingVoice
                    ? 'bg-amber-400 text-slate-950 animate-pulse'
                    : 'bg-white/15 hover:bg-white/25 text-white border border-white/20'
                }`}
                title="Écouter la voix de synthèse du pitch"
              >
                <Volume2 className="w-4 h-4" />
                <span>{isPlayingVoice ? 'Lecture en cours...' : 'Écouter la Présentation'}</span>
              </button>
            )}

            <button
              onClick={handleExecuteLive}
              className="flex-1 sm:flex-none bg-[#00D26A] hover:bg-[#00b55b] text-slate-950 font-extrabold px-6 py-3.5 rounded-2xl text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/30 transition transform hover:scale-[1.02] active:scale-95"
            >
              <span>{currentSlide.actionLabel || 'Tester en Direct'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Progress Bar & Slide Jumpers */}
        <div className="mt-8 pt-6 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1">
            {slides.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => {
                  soundFX.playBeep(800, 0.03);
                  setDemoStepIndex(idx);
                }}
                className={`h-2.5 rounded-full transition-all ${
                  idx === demoStepIndex
                    ? 'w-8 bg-[#00D26A]'
                    : idx < demoStepIndex
                    ? 'w-4 bg-emerald-400/80 hover:bg-emerald-300'
                    : 'w-3 bg-white/20 hover:bg-white/40'
                }`}
                title={`Aller à l'étape ${idx + 1}: ${s.title}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            <button
              onClick={handlePrev}
              disabled={demoStepIndex === 0}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:pointer-events-none transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Précédent</span>
            </button>

            <button
              onClick={handleNext}
              disabled={demoStepIndex === slides.length - 1}
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-bold bg-[#00D26A] text-slate-950 hover:bg-[#00b55b] disabled:opacity-30 disabled:pointer-events-none transition shadow-sm"
            >
              <span>Suivant</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Slide Content Grid: Script Box & Interactive Highlights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Speech Script Box */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00D26A]"></span>
              Texte du Discours & Déroulé Live
            </h3>
            <span className="text-xs font-semibold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-lg">
              Script Mot-à-Mot
            </span>
          </div>

          <div className="space-y-4">
            {currentSlide.scriptLines.map((line, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-50 border border-slate-200/60 hover:bg-emerald-50/40 hover:border-emerald-200 transition text-slate-800 leading-relaxed text-sm sm:text-base font-medium"
              >
                <span className="w-6 h-6 rounded-full bg-[#00D26A]/20 text-[#067A45] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <p>{line}</p>
              </div>
            ))}
          </div>

          {/* Quick CTA to jump into module */}
          <div className="pt-2 flex items-center justify-between flex-wrap gap-4">
            <div className="text-xs text-slate-500 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Chaque action montrée dans ce pitch est 100% fonctionnelle en direct.</span>
            </div>

            <button
              onClick={handleExecuteLive}
              className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-5 py-2.5 rounded-xl flex items-center gap-2 transition"
            >
              <span>Accéder à l'écran du rôle</span>
              <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
            </button>
          </div>
        </div>

        {/* Right 1 Col: Key Metrics & Technical Proof Badges */}
        <div className="space-y-6">
          
          {/* Key Metric Cards */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#00D26A]" />
              Points Clés de l'Étape
            </h3>

            <div className="space-y-3">
              {currentSlide.keyHighlights.map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500 font-medium">{item.label}</span>
                    {item.badge && (
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <div className="text-sm font-black text-slate-900">{item.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 3 Pillars Summary Card */}
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl p-6 border border-emerald-200/80 space-y-3">
            <div className="flex items-center gap-2 text-emerald-800 font-extrabold text-xs uppercase tracking-wider">
              <Award className="w-4 h-4 text-emerald-600" />
              Les 3 Piliers Santé+
            </div>

            <div className="text-xs text-emerald-950 space-y-2 leading-relaxed">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-[10px] shrink-0">1</span>
                <span><strong>Simplicité :</strong> 3 clics max pour n'importe quelle tâche.</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-[10px] shrink-0">2</span>
                <span><strong>Inviolabilité :</strong> Dossier médical ancré sur Bitcoin à vie.</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-[10px] shrink-0">3</span>
                <span><strong>Accessibilité :</strong> Fonctionne hors ligne & vocal en 2G.</span>
              </div>
            </div>
          </div>

          {/* Team Winners presentation banner */}
          <div className="bg-slate-900 text-white rounded-3xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#00D26A]">
              <Users className="w-4 h-4" />
              Équipe Winners (Bénin)
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Bienvenu ESSEGNON · Adorée KPENONHOUN · Orphet AHILIHAN · Ismail AGOHOUNDJE · Prince BONGO
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
