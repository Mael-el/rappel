import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  RoleType,
  Language,
  Hospital,
  Consultation,
  Appointment,
  TontineGroup,
  BloodAlert,
  HospitalEquipment,
  AuditLogItem,
  MicroserviceHealth,
  BitcoinAnchor
} from '../types';
import {
  PATIENT_BIENVENUE,
  DOCTOR_JEAN_KODJO,
  ADMIN_SAINTE_MARIE,
  SUPER_ADMIN_MINISTRY,
  INITIAL_HOSPITALS,
  INITIAL_CONSULTATIONS,
  INITIAL_TONTINES,
  INITIAL_BLOOD_ALERTS,
  INITIAL_EQUIPMENTS,
  INITIAL_AUDIT_LOGS,
  INITIAL_MICROSERVICES,
  INITIAL_BITCOIN_ANCHOR
} from '../data/mockData';
import { soundFX, triggerConfetti } from '../utils/audioAndFx';

interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error' | 'lightning';
  title: string;
  description: string;
  txid?: string;
}

interface AppContextType {
  role: RoleType;
  setRole: (role: RoleType) => void;
  currentUser: User;
  setCurrentUser: (user: User) => void;
  patientTab: string;
  setPatientTab: (tab: string) => void;
  doctorTab: string;
  setDoctorTab: (tab: string) => void;
  adminTab: string;
  setAdminTab: (tab: string) => void;
  superAdminTab: string;
  setSuperAdminTab: (tab: string) => void;
  
  // Data
  hospitals: Hospital[];
  consultations: Consultation[];
  appointments: Appointment[];
  tontines: TontineGroup[];
  bloodAlerts: BloodAlert[];
  equipments: HospitalEquipment[];
  auditLogs: AuditLogItem[];
  microservices: MicroserviceHealth[];
  bitcoinAnchor: BitcoinAnchor;
  
  // Actions
  addConsultation: (consultation: Consultation) => void;
  bookAppointment: (appointment: Omit<Appointment, 'id' | 'status' | 'reminderSent'>) => void;
  payConsultationLightning: (consultationId: string) => Promise<boolean>;
  contributeToTontine: (tontineId: string, amount: number) => void;
  respondToBloodAlert: (alertId: string) => void;
  triggerSOS: () => void;
  cancelSOS: () => void;
  isSosActive: boolean;
  sosCountdown: number;
  
  // Blockchain verification modal
  verifiedTxid: string | null;
  openTxVerifier: (txid: string) => void;
  closeTxVerifier: () => void;
  
  // Preferences & UI
  language: Language;
  setLanguage: (lang: Language) => void;
  isSeniorMode: boolean;
  toggleSeniorMode: () => void;
  toasts: ToastMessage[];
  addToast: (toast: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;
  
  // Presentation Mode state
  demoStepIndex: number;
  setDemoStepIndex: (idx: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<RoleType>('presentation');
  const [currentUser, setCurrentUser] = useState<User>(PATIENT_BIENVENUE);
  
  const [patientTab, setPatientTab] = useState<string>('dashboard');
  const [doctorTab, setDoctorTab] = useState<string>('consultation');
  const [adminTab, setAdminTab] = useState<string>('dashboard');
  const [superAdminTab, setSuperAdminTab] = useState<string>('dashboard');

  const [hospitals] = useState<Hospital[]>(INITIAL_HOSPITALS);
  const [consultations, setConsultations] = useState<Consultation[]>(INITIAL_CONSULTATIONS);
  const [tontines, setTontines] = useState<TontineGroup[]>(INITIAL_TONTINES);
  const [bloodAlerts, setBloodAlerts] = useState<BloodAlert[]>(INITIAL_BLOOD_ALERTS);
  const [equipments, setEquipments] = useState<HospitalEquipment[]>(INITIAL_EQUIPMENTS);
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>(INITIAL_AUDIT_LOGS);
  const [microservices] = useState<MicroserviceHealth[]>(INITIAL_MICROSERVICES);
  const [bitcoinAnchor, setBitcoinAnchor] = useState<BitcoinAnchor>(INITIAL_BITCOIN_ANCHOR);

  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: 'apt_001',
      patientId: 'usr_pat_001',
      patientName: 'Bienvenue Segnon',
      patientPhone: '+229 97 00 12 34',
      doctorId: 'usr_doc_001',
      doctorName: 'Dr. Jean Kodjo',
      hospitalId: 'hosp_001',
      hospitalName: 'Clinique Sainte-Marie',
      specialty: 'Médecine Générale',
      date: 'Demain (24 Juin 2026)',
      time: '10:30',
      reason: 'Consultation de suivi général',
      feeFcfa: 5000,
      status: 'confirmé',
      reminderSent: true
    }
  ]);

  const [isSosActive, setIsSosActive] = useState<boolean>(false);
  const [sosCountdown, setSosCountdown] = useState<number>(180); // 3 minutes = 180s
  const [verifiedTxid, setVerifiedTxid] = useState<string | null>(null);

  const [language, setLanguage] = useState<Language>('fr');
  const [isSeniorMode, setIsSeniorMode] = useState<boolean>(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [demoStepIndex, setDemoStepIndex] = useState<number>(0);

  // Sync user with active role
  useEffect(() => {
    if (role === 'patient') {
      setCurrentUser(PATIENT_BIENVENUE);
    } else if (role === 'doctor') {
      setCurrentUser(DOCTOR_JEAN_KODJO);
    } else if (role === 'admin') {
      setCurrentUser(ADMIN_SAINTE_MARIE);
    } else if (role === 'superadmin') {
      setCurrentUser(SUPER_ADMIN_MINISTRY);
    }
  }, [role]);

  // Live Bitcoin blockchain ticker simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setBitcoinAnchor(prev => ({
        ...prev,
        anchoredRecordsCount: prev.anchoredRecordsCount + Math.floor(Math.random() * 3) + 1
      }));
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  // SOS Countdown timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isSosActive && sosCountdown > 0) {
      timer = setInterval(() => {
        setSosCountdown(c => (c > 0 ? c - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isSosActive, sosCountdown]);

  const addToast = (toast: Omit<ToastMessage, 'id'>) => {
    const id = 'toast_' + Date.now() + Math.random().toString(36).substring(2, 5);
    const newToast: ToastMessage = { ...toast, id };
    setToasts(prev => [newToast, ...prev.slice(0, 4)]);
    setTimeout(() => {
      removeToast(id);
    }, 6000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const addConsultation = (newCst: Consultation) => {
    setConsultations(prev => [newCst, ...prev]);
    
    // Add to audit logs with real Bitcoin OP_RETURN anchor simulation
    const newLog: AuditLogItem = {
      id: 'log_' + Date.now(),
      timestamp: `${newCst.date} ${newCst.time}`,
      action: 'Consultation',
      actorName: newCst.doctorName,
      actorRole: 'Médecin',
      department: newCst.hospitalName,
      patientOrTarget: `${newCst.patientName} (NPI ${newCst.patientNpi})`,
      bitcoinTxid: newCst.bitcoinTxid,
      merkleRoot: '0x' + Array.from({ length: 12 }, () => Math.floor(Math.random() * 16).toString(16)).join('')
    };
    setAuditLogs(prev => [newLog, ...prev]);

    soundFX.playSuccess();
    addToast({
      type: 'success',
      title: 'Consultation Horodatée sur Bitcoin !',
      description: `Dossier de ${newCst.patientName} ancré sur la blockchain. Facture de ${newCst.feeFcfa.toLocaleString()} FCFA générée.`,
      txid: newCst.bitcoinTxid
    });
  };

  const bookAppointment = (appointmentData: Omit<Appointment, 'id' | 'status' | 'reminderSent'>) => {
    const newApt: Appointment = {
      ...appointmentData,
      id: 'apt_' + Date.now(),
      status: 'confirmé',
      reminderSent: true
    };
    setAppointments(prev => [newApt, ...prev]);
    soundFX.playSuccess();
    triggerConfetti();
    addToast({
      type: 'success',
      title: 'Rendez-vous confirmé !',
      description: `RDV pris avec ${newApt.doctorName} le ${newApt.date} à ${newApt.time}. Un rappel sera envoyé 1h avant.`
    });
  };

  const payConsultationLightning = async (consultationId: string): Promise<boolean> => {
    soundFX.playBeep(1200, 0.05);
    await new Promise(res => setTimeout(res, 1200)); // 1.2s Lightning Network fast settlement

    setConsultations(prev =>
      prev.map(c => {
        if (c.id === consultationId) {
          return {
            ...c,
            paymentStatus: 'payée',
            paymentMethod: 'Lightning Network',
            paymentTxid: 'ln_tx_' + Array.from({ length: 16 }, () => Math.floor(Math.random() * 16).toString(16)).join('')
          };
        }
        return c;
      })
    );

    const txid = '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    
    // Add audit log
    setAuditLogs(prev => [
      {
        id: 'log_' + Date.now(),
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
        action: 'Paiement Lightning',
        actorName: currentUser.name,
        actorRole: 'Patient',
        department: 'Lightning Node LNBits (Port 3884)',
        patientOrTarget: 'Paiement Consultation (5 000 FCFA - Frais 0.1%)',
        bitcoinTxid: txid,
        merkleRoot: '0x' + Array.from({ length: 12 }, () => Math.floor(Math.random() * 16).toString(16)).join('')
      },
      ...prev
    ]);

    soundFX.playSuccess();
    triggerConfetti();
    addToast({
      type: 'lightning',
      title: '⚡ Paiement Lightning Réussi en 2s !',
      description: 'Facture de 5 000 FCFA réglée avec seulement 5 FCFA (0.1%) de frais.',
      txid
    });
    return true;
  };

  const contributeToTontine = (tontineId: string, amount: number) => {
    setTontines(prev =>
      prev.map(t => {
        if (t.id === tontineId) {
          return {
            ...t,
            currentBalanceFcfa: t.currentBalanceFcfa + amount,
            transactionsCount: t.transactionsCount + 1
          };
        }
        return t;
      })
    );
    soundFX.playSuccess();
    triggerConfetti();
    addToast({
      type: 'success',
      title: 'Cotisation Tontine Enregistrée',
      description: `Versement de ${amount.toLocaleString()} FCFA sécurisé par Multi-signature Bitcoin (2-of-3).`
    });
  };

  const respondToBloodAlert = (alertId: string) => {
    setBloodAlerts(prev =>
      prev.map(a => {
        if (a.id === alertId) {
          return {
            ...a,
            status: 'resolved'
          };
        }
        return a;
      })
    );
    soundFX.playSuccess();
    triggerConfetti();
    addToast({
      type: 'success',
      title: '🩸 Disponibilité Donneur Transmise !',
      description: 'Vos coordonnées et localisation GPS ont été envoyées en priorité à l\'hôpital de Parakou. Merci pour votre don !'
    });
  };

  const triggerSOS = () => {
    setIsSosActive(true);
    setSosCountdown(180);
    soundFX.playEmergency();
    addToast({
      type: 'error',
      title: '🚨 URGENCE MÉDICALE DÉCLENCHÉE',
      description: 'SAMU 112 & Clinique Sainte-Marie alertés. Géolocalisation GPS et dossier vital (O+, Allergie Pénicilline) transmis.'
    });
  };

  const cancelSOS = () => {
    setIsSosActive(false);
    addToast({
      type: 'info',
      title: 'Alerte Urgence Annulée',
      description: 'Le signal de détresse a été désactivé.'
    });
  };

  const openTxVerifier = (txid: string) => {
    soundFX.playBeep(900, 0.04);
    setVerifiedTxid(txid);
  };

  const closeTxVerifier = () => {
    setVerifiedTxid(null);
  };

  const toggleSeniorMode = () => {
    setIsSeniorMode(prev => !prev);
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        currentUser,
        setCurrentUser,
        patientTab,
        setPatientTab,
        doctorTab,
        setDoctorTab,
        adminTab,
        setAdminTab,
        superAdminTab,
        setSuperAdminTab,
        hospitals,
        consultations,
        appointments,
        tontines,
        bloodAlerts,
        equipments,
        auditLogs,
        microservices,
        bitcoinAnchor,
        addConsultation,
        bookAppointment,
        payConsultationLightning,
        contributeToTontine,
        respondToBloodAlert,
        triggerSOS,
        cancelSOS,
        isSosActive,
        sosCountdown,
        verifiedTxid,
        openTxVerifier,
        closeTxVerifier,
        language,
        setLanguage,
        isSeniorMode,
        toggleSeniorMode,
        toasts,
        addToast,
        removeToast,
        demoStepIndex,
        setDemoStepIndex
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
