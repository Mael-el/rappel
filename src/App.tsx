import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { SOSModal } from './components/common/SOSModal';
import { TxVerifierModal } from './components/common/TxVerifierModal';
import { ToastContainer } from './components/common/ToastContainer';

// Presentation Mode
import { DemoPresentationMode } from './components/presentation/DemoPresentationMode';

// Patient Portal Views
import { PatientDashboard } from './components/patient/PatientDashboard';
import { QRCodeView } from './components/patient/QRCodeView';
import { MedicalRecordView } from './components/patient/MedicalRecordView';
import { PaymentLightningView } from './components/patient/PaymentLightningView';
import { TontineView } from './components/patient/TontineView';
import { BloodDonationView } from './components/patient/BloodDonationView';
import { PatientProfileView } from './components/patient/PatientProfileView';

// Doctor Portal Views
import { DoctorDashboard } from './components/doctor/DoctorDashboard';
import { DoctorWaitingRoom } from './components/doctor/DoctorWaitingRoom';
import { ExpressConsultationView } from './components/doctor/ExpressConsultationView';
import { DoctorAiAssistantView } from './components/doctor/DoctorAiAssistantView';
import { DoctorScheduleView } from './components/doctor/DoctorScheduleView';

// Hospital Admin Views
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminDoctorsView } from './components/admin/AdminDoctorsView';
import { AdminEquipmentsView } from './components/admin/AdminEquipmentsView';

// Super Admin Views
import { SuperAdminDashboard } from './components/superadmin/SuperAdminDashboard';
import { NationalMapView } from './components/superadmin/NationalMapView';
import { MicroservicesArchitectureView } from './components/superadmin/MicroservicesArchitectureView';

import {
  LayoutDashboard,
  QrCode,
  FileText,
  CreditCard,
  HeartHandshake,
  Droplet,
  User,
  Users,
  Stethoscope,
  Sparkles,
  Calendar,
  Building2,
  Wrench,
  BarChart3,
  Globe2,
  Server,
  Activity,
  ChevronRight
} from 'lucide-react';
import { soundFX } from './utils/audioAndFx';

const MainAppContent: React.FC = () => {
  const {
    role,
    patientTab,
    setPatientTab,
    doctorTab,
    setDoctorTab,
    adminTab,
    setAdminTab,
    superAdminTab,
    setSuperAdminTab,
    isSeniorMode
  } = useApp();

  const handleTabChange = (tabSetter: (tab: string) => void, tabKey: string) => {
    soundFX.playBeep(850, 0.03);
    tabSetter(tabKey);
  };

  return (
    <div className={`min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900 transition-colors ${
      isSeniorMode ? 'text-lg select-text font-medium' : ''
    }`}>
      {/* Header */}
      <Header />

      {/* Role-Specific Secondary Subnav Bar */}
      {role !== 'presentation' && (
        <div className="bg-white border-b border-slate-200/80 sticky top-20 z-30 shadow-2xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-1.5 overflow-x-auto py-2.5 no-scrollbar">
              
              {/* PATIENT SUBTABS */}
              {role === 'patient' && (
                <>
                  {[
                    { id: 'dashboard', label: 'Tableau de bord', icon: <LayoutDashboard className="w-4 h-4" /> },
                    { id: 'qrcode', label: 'Mon QR Code', icon: <QrCode className="w-4 h-4" /> },
                    { id: 'records', label: 'Dossier Médical à Vie', icon: <FileText className="w-4 h-4" /> },
                    { id: 'payment', label: 'Paiements Lightning ⚡', icon: <CreditCard className="w-4 h-4" /> },
                    { id: 'tontine', label: 'Tontines Santé (Multi-sig)', icon: <HeartHandshake className="w-4 h-4" /> },
                    { id: 'blood', label: 'Don de Sang & SOS', icon: <Droplet className="w-4 h-4" /> },
                    { id: 'profile', label: 'Profil & Biométrie', icon: <User className="w-4 h-4" /> }
                  ].map(tab => {
                    const isActive = patientTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => handleTabChange(setPatientTab, tab.id)}
                        className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                          isActive
                            ? 'bg-blue-600 text-white shadow-xs'
                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                        }`}
                      >
                        {tab.icon}
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </>
              )}

              {/* DOCTOR SUBTABS */}
              {role === 'doctor' && (
                <>
                  {[
                    { id: 'dashboard', label: 'Tableau Clinique', icon: <LayoutDashboard className="w-4 h-4" /> },
                    { id: 'waiting_room', label: 'Salle d\'Attente & Triage', icon: <Users className="w-4 h-4" /> },
                    { id: 'consultation', label: 'Consultation 2-Min (IA Vocale)', icon: <Stethoscope className="w-4 h-4" /> },
                    { id: 'ai_assistant', label: 'Assistant IA (Gemini RAG)', icon: <Sparkles className="w-4 h-4" /> },
                    { id: 'schedule', label: 'Agenda & Rendez-vous', icon: <Calendar className="w-4 h-4" /> }
                  ].map(tab => {
                    const isActive = doctorTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => handleTabChange(setDoctorTab, tab.id)}
                        className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                          isActive
                            ? 'bg-teal-600 text-white shadow-xs'
                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                        }`}
                      >
                        {tab.icon}
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </>
              )}

              {/* ADMIN SUBTABS */}
              {role === 'admin' && (
                <>
                  {[
                    { id: 'dashboard', label: 'Tableau de Bord Hôpital', icon: <LayoutDashboard className="w-4 h-4" /> },
                    { id: 'doctors', label: 'Corps Médical', icon: <Users className="w-4 h-4" /> },
                    { id: 'equipments', label: 'Équipements & Maintenance', icon: <Wrench className="w-4 h-4" /> }
                  ].map(tab => {
                    const isActive = adminTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => handleTabChange(setAdminTab, tab.id)}
                        className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                          isActive
                            ? 'bg-purple-600 text-white shadow-xs'
                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                        }`}
                      >
                        {tab.icon}
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </>
              )}

              {/* SUPER ADMIN SUBTABS */}
              {role === 'superadmin' && (
                <>
                  {[
                    { id: 'dashboard', label: 'Supervision Nationale', icon: <Activity className="w-4 h-4" /> },
                    { id: 'map', label: 'Cartographie Sanitaire Bénin', icon: <Globe2 className="w-4 h-4" /> },
                    { id: 'microservices', label: '12 Microservices Backend', icon: <Server className="w-4 h-4" /> }
                  ].map(tab => {
                    const isActive = superAdminTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => handleTabChange(setSuperAdminTab, tab.id)}
                        className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                          isActive
                            ? 'bg-slate-900 text-white shadow-xs'
                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                        }`}
                      >
                        {tab.icon}
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </>
              )}

            </div>
          </div>
        </div>
      )}

      {/* Main View Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* PRESENTATION MODE */}
        {role === 'presentation' && <DemoPresentationMode />}

        {/* PATIENT ROLE */}
        {role === 'patient' && (
          <>
            {patientTab === 'dashboard' && <PatientDashboard />}
            {patientTab === 'qrcode' && <QRCodeView />}
            {patientTab === 'records' && <MedicalRecordView />}
            {patientTab === 'appointments' && <PatientDashboard />}
            {patientTab === 'payment' && <PaymentLightningView />}
            {patientTab === 'tontine' && <TontineView />}
            {patientTab === 'blood' && <BloodDonationView />}
            {patientTab === 'profile' && <PatientProfileView />}
          </>
        )}

        {/* DOCTOR ROLE */}
        {role === 'doctor' && (
          <>
            {doctorTab === 'dashboard' && <DoctorDashboard />}
            {doctorTab === 'waiting_room' && <DoctorWaitingRoom />}
            {doctorTab === 'consultation' && <ExpressConsultationView />}
            {doctorTab === 'ai_assistant' && <DoctorAiAssistantView />}
            {doctorTab === 'schedule' && <DoctorScheduleView />}
          </>
        )}

        {/* ADMIN CLINIQUE ROLE */}
        {role === 'admin' && (
          <>
            {adminTab === 'dashboard' && <AdminDashboard />}
            {adminTab === 'doctors' && <AdminDoctorsView />}
            {adminTab === 'equipments' && <AdminEquipmentsView />}
          </>
        )}

        {/* SUPER ADMIN ROLE */}
        {role === 'superadmin' && (
          <>
            {superAdminTab === 'dashboard' && <SuperAdminDashboard />}
            {superAdminTab === 'map' && <NationalMapView />}
            {superAdminTab === 'microservices' && <MicroservicesArchitectureView />}
          </>
        )}

      </main>

      {/* Global Modals & Notifications */}
      <SOSModal />
      <TxVerifierModal />
      <ToastContainer />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
