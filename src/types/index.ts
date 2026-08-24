export type RoleType = 'patient' | 'doctor' | 'admin' | 'superadmin' | 'presentation' | 'landing';

export type Language = 'fr' | 'fon' | 'yoruba' | 'en';

export interface User {
  id: string;
  npi?: string;
  name: string;
  phone: string;
  email: string;
  role: RoleType;
  avatar?: string;
  bloodType?: 'O+' | 'O-' | 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-';
  allergies?: string[];
  chronicConditions?: string[];
  hospitalId?: string;
  hospitalName?: string;
  specialty?: string;
  licenseNumber?: string;
  isDonor?: boolean;
  donorBadge?: 'Donneur de Bronze' | 'Donneur d\'Argent' | 'Donneur d\'Or';
  donationsCount?: number;
  walletBalanceFcfa?: number;
  walletBalanceSats?: number;
}

export interface Hospital {
  id: string;
  name: string;
  type: 'Clinique Privée' | 'Centre Hospitalier Universitaire' | 'Centre Hospitalier Départemental' | 'Hôpital de Zone';
  city: string;
  region: string;
  address: string;
  coordinates: { lat: number; lng: number };
  distanceKm: number;
  consultationFeeFcfa: number;
  rating: number;
  reviewsCount: number;
  status: 'normal' | 'alerte' | 'urgence';
  emergencyAvailable: boolean;
  specialties: string[];
  bloodStockStatus: {
    'O+': 'optimal' | 'moyen' | 'critique';
    'O-': 'optimal' | 'moyen' | 'critique';
    'A+': 'optimal' | 'moyen' | 'critique';
    'A-': 'optimal' | 'moyen' | 'critique';
    'B+': 'optimal' | 'moyen' | 'critique';
    'B-': 'optimal' | 'moyen' | 'critique';
    'AB+': 'optimal' | 'moyen' | 'critique';
    'AB-': 'optimal' | 'moyen' | 'critique';
  };
  phone: string;
}

export interface PrescriptionItem {
  id: string;
  medication: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions?: string;
}

export interface Consultation {
  id: string;
  patientId: string;
  patientName: string;
  patientNpi: string;
  patientBloodType: string;
  patientAllergies: string[];
  doctorId: string;
  doctorName: string;
  doctorSpecialty: string;
  hospitalId: string;
  hospitalName: string;
  date: string;
  time: string;
  chiefComplaint: string;
  diagnosis: string;
  clinicalNotes: string;
  prescriptions: PrescriptionItem[];
  feeFcfa: number;
  paymentStatus: 'payée' | 'en_attente' | 'annulée';
  paymentTxid?: string;
  paymentMethod?: 'Lightning Network' | 'Mobile Money' | 'Flooz' | 'Espèces';
  bitcoinTxid: string;
  ipfsCid: string;
  prescriptionImageUrl?: string;
}

export interface LabAnalysis {
  id: string;
  title: string;
  laboratory: string;
  date: string;
  results: { parameter: string; value: string; unit: string; referenceRange: string; status: 'normal' | 'high' | 'low' }[];
  doctorName: string;
  bitcoinTxid: string;
}

export interface Vaccination {
  id: string;
  vaccineName: string;
  disease: string;
  doseNumber: string;
  date: string;
  administeredBy: string;
  nextDoseDate?: string;
  batchNumber: string;
  bitcoinTxid: string;
}

export interface BloodDonation {
  id: string;
  donorNpi: string;
  donorName: string;
  bloodType: string;
  date: string;
  location: string;
  volumeMl: number;
  bagId: string;
  bitcoinTxid: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  patientPhone: string;
  doctorId: string;
  doctorName: string;
  hospitalId: string;
  hospitalName: string;
  specialty: string;
  date: string;
  time: string;
  reason: string;
  feeFcfa: number;
  status: 'confirmé' | 'en_attente' | 'terminé' | 'annulé';
  reminderSent: boolean;
}

export interface TontineGroup {
  id: string;
  name: string;
  description: string;
  membersCount: number;
  monthlyContributionFcfa: number;
  currentBalanceFcfa: number;
  nextPayoutDate: string;
  beneficiaryName: string;
  multisigScheme: '2-of-3 Bitcoin Multi-sig' | '3-of-5 Bitcoin Multi-sig';
  status: 'active' | 'payout_ready' | 'pending';
  bitcoinVaultAddress: string;
  transactionsCount: number;
  members: {
    id: string;
    name: string;
    avatar: string;
    status: 'à jour' | 'en retard';
    lastContributionDate: string;
  }[];
}

export interface BloodAlert {
  id: string;
  hospitalName: string;
  city: string;
  bloodTypeNeeded: string;
  urgencyLevel: 'URGENCE VITALE' | 'ALERTE CRITIQUE' | 'BESOIN STANDARD';
  donorsNearbyCount: number;
  distanceKm: number;
  postedAt: string;
  status: 'active' | 'resolved';
}

export interface HospitalEquipment {
  id: string;
  name: string;
  units: number;
  status: 'Disponible' | 'En maintenance' | 'Hors service';
  nextMaintenance: string;
  department: string;
}

export interface AuditLogItem {
  id: string;
  timestamp: string;
  action: 'Consultation' | 'Accès dossier' | 'Modification inventaire' | 'Paiement Lightning' | 'Don de sang' | 'SOS Urgence';
  actorName: string;
  actorRole: string;
  department: string;
  patientOrTarget: string;
  bitcoinTxid: string;
  merkleRoot: string;
}

export interface MicroserviceHealth {
  id: string;
  name: string;
  port: number;
  status: 'En ligne' | 'Alerte' | 'Dégradé';
  latencyMs: number;
  loadPercent: number;
  uptime: string;
}

export interface BitcoinAnchor {
  blockHeight: number;
  blockHash: string;
  timestamp: string;
  anchoredRecordsCount: number;
  merkleRoot: string;
  status: 'Confirmé (6+ blocks)' | 'En cours de validation';
}
