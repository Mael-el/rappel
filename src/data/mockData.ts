import {
  User,
  Hospital,
  Consultation,
  LabAnalysis,
  Vaccination,
  BloodDonation,
  Appointment,
  TontineGroup,
  BloodAlert,
  HospitalEquipment,
  AuditLogItem,
  MicroserviceHealth,
  BitcoinAnchor
} from '../types';

export const PATIENT_BIENVENUE: User = {
  id: 'usr_pat_001',
  npi: '1097885544901',
  name: 'Bienvenue Segnon',
  phone: '+229 97 00 12 34',
  email: 'bienvenue.segnon@santéplus.bj',
  role: 'patient',
  bloodType: 'O+',
  allergies: ['Pénicilline'],
  chronicConditions: ['Aucune condition chronique'],
  isDonor: true,
  donorBadge: 'Donneur d\'Or',
  donationsCount: 10,
  walletBalanceFcfa: 45000,
  walletBalanceSats: 215000,
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
};

export const DOCTOR_JEAN_KODJO: User = {
  id: 'usr_doc_001',
  name: 'Dr. Jean Kodjo',
  phone: '+229 95 44 88 12',
  email: 'dr.kodjo@clinique-saintemarie.bj',
  role: 'doctor',
  specialty: 'Médecine Générale',
  licenseNumber: 'ONMB-2018-4921',
  hospitalId: 'hosp_001',
  hospitalName: 'Clinique Sainte-Marie',
  avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80'
};

export const ADMIN_SAINTE_MARIE: User = {
  id: 'usr_adm_001',
  name: 'Mme. Claudine Ahouissou',
  phone: '+229 90 11 22 33',
  email: 'admin@clinique-saintemarie.bj',
  role: 'admin',
  hospitalId: 'hosp_001',
  hospitalName: 'Clinique Sainte-Marie',
  avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
};

export const SUPER_ADMIN_MINISTRY: User = {
  id: 'usr_sup_001',
  name: 'Bienvenu ESSEGNON (PO Équipe Winners)',
  phone: '+229 97 88 55 44',
  email: 'bienvenuessegnon01@gmail.com',
  role: 'superadmin',
  hospitalName: 'Ministère de la Santé du Bénin & Équipe Winners',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
};

export const INITIAL_HOSPITALS: Hospital[] = [
  {
    id: 'hosp_001',
    name: 'Clinique Sainte-Marie',
    type: 'Clinique Privée',
    city: 'Cotonou',
    region: 'Littoral',
    address: 'Haie Vive, Rue 380, Cotonou',
    coordinates: { lat: 6.3578, lng: 2.4182 },
    distanceKm: 1.2,
    consultationFeeFcfa: 5000,
    rating: 4.9,
    reviewsCount: 142,
    status: 'normal',
    emergencyAvailable: true,
    specialties: ['Médecine Générale', 'Pédiatrie', 'Cardiologie', 'Gynécologie', 'Orthopédie'],
    bloodStockStatus: {
      'O+': 'critique',
      'O-': 'moyen',
      'A+': 'optimal',
      'A-': 'moyen',
      'B+': 'optimal',
      'B-': 'critique',
      'AB+': 'optimal',
      'AB-': 'moyen'
    },
    phone: '+229 21 30 15 88'
  },
  {
    id: 'hosp_002',
    name: 'CNHU Hubert Koutoukou Maga',
    type: 'Centre Hospitalier Universitaire',
    city: 'Cotonou',
    region: 'Littoral',
    address: 'Avenue Jean-Paul II, Cotonou',
    coordinates: { lat: 6.3689, lng: 2.4285 },
    distanceKm: 3.4,
    consultationFeeFcfa: 4000,
    rating: 4.6,
    reviewsCount: 480,
    status: 'alerte',
    emergencyAvailable: true,
    specialties: ['Urgences / Réanimation', 'Chirurgie Générale', 'Neurologie', 'Cardiologie', 'Hématologie', 'Pédiatrie'],
    bloodStockStatus: {
      'O+': 'moyen',
      'O-': 'critique',
      'A+': 'optimal',
      'A-': 'optimal',
      'B+': 'optimal',
      'B-': 'moyen',
      'AB+': 'optimal',
      'AB-': 'critique'
    },
    phone: '+229 21 30 01 55'
  },
  {
    id: 'hosp_003',
    name: 'Centre Hospitalier Départemental du Borgou (CHD)',
    type: 'Centre Hospitalier Départemental',
    city: 'Parakou',
    region: 'Borgou',
    address: 'Quartier Albarika, Parakou',
    coordinates: { lat: 9.3372, lng: 2.6303 },
    distanceKm: 415,
    consultationFeeFcfa: 3500,
    rating: 4.7,
    reviewsCount: 210,
    status: 'urgence',
    emergencyAvailable: true,
    specialties: ['Médecine Interne', 'Pédiatrie', 'Chirurgie', 'Maternité', 'Banque de Sang'],
    bloodStockStatus: {
      'O+': 'critique',
      'O-': 'critique',
      'A+': 'moyen',
      'A-': 'moyen',
      'B+': 'moyen',
      'B-': 'critique',
      'AB+': 'optimal',
      'AB-': 'critique'
    },
    phone: '+229 23 61 03 14'
  },
  {
    id: 'hosp_004',
    name: 'CHUD Ouémé / Plateau',
    type: 'Centre Hospitalier Départemental',
    city: 'Porto-Novo',
    region: 'Ouémé',
    address: 'Boulevard Lagunaire, Porto-Novo',
    coordinates: { lat: 6.4969, lng: 2.6288 },
    distanceKm: 32,
    consultationFeeFcfa: 4000,
    rating: 4.5,
    reviewsCount: 175,
    status: 'normal',
    emergencyAvailable: true,
    specialties: ['Médecine Générale', 'Pédiatrie', 'Ophtalmologie', 'Gynécologie'],
    bloodStockStatus: {
      'O+': 'optimal',
      'O-': 'moyen',
      'A+': 'optimal',
      'A-': 'optimal',
      'B+': 'optimal',
      'B-': 'moyen',
      'AB+': 'optimal',
      'AB-': 'optimal'
    },
    phone: '+229 20 21 23 45'
  },
  {
    id: 'hosp_005',
    name: 'Hôpital de Zone d\'Abomey-Calavi / Sô-Ava',
    type: 'Hôpital de Zone',
    city: 'Abomey-Calavi',
    region: 'Atlantique',
    address: 'Carrefour KPOTA, Abomey-Calavi',
    coordinates: { lat: 6.4485, lng: 2.3556 },
    distanceKm: 14.5,
    consultationFeeFcfa: 3500,
    rating: 4.8,
    reviewsCount: 189,
    status: 'normal',
    emergencyAvailable: true,
    specialties: ['Urgences', 'Médecine Générale', 'Maternité', 'Pédiatrie'],
    bloodStockStatus: {
      'O+': 'optimal',
      'O-': 'optimal',
      'A+': 'optimal',
      'A-': 'moyen',
      'B+': 'optimal',
      'B-': 'optimal',
      'AB+': 'optimal',
      'AB-': 'moyen'
    },
    phone: '+229 21 36 00 12'
  },
  {
    id: 'hosp_006',
    name: 'Centre Hospitalier Départemental de l\'Atacora',
    type: 'Centre Hospitalier Départemental',
    city: 'Natitingou',
    region: 'Atacora',
    address: 'Route de Djougou, Natitingou',
    coordinates: { lat: 10.3042, lng: 1.3796 },
    distanceKm: 530,
    consultationFeeFcfa: 3000,
    rating: 4.6,
    reviewsCount: 95,
    status: 'normal',
    emergencyAvailable: true,
    specialties: ['Médecine Générale', 'Chirurgie', 'Pédiatrie'],
    bloodStockStatus: {
      'O+': 'moyen',
      'O-': 'critique',
      'A+': 'optimal',
      'A-': 'moyen',
      'B+': 'optimal',
      'B-': 'optimal',
      'AB+': 'optimal',
      'AB-': 'moyen'
    },
    phone: '+229 23 82 11 02'
  }
];

export const INITIAL_CONSULTATIONS: Consultation[] = [
  {
    id: 'cst_2026_001',
    patientId: 'usr_pat_001',
    patientName: 'Bienvenue Segnon',
    patientNpi: '1097885544901',
    patientBloodType: 'O+',
    patientAllergies: ['Pénicilline'],
    doctorId: 'usr_doc_001',
    doctorName: 'Dr. Jean Kodjo',
    doctorSpecialty: 'Médecine Générale',
    hospitalId: 'hosp_001',
    hospitalName: 'Clinique Sainte-Marie',
    date: '2026-06-30',
    time: '14:35',
    chiefComplaint: 'Douleur au ventre depuis 3 jours, brûlures mictionnelles.',
    diagnosis: 'Infection urinaire basse aiguë (sans signe d\'obstruction ni pyélonéphrite).',
    clinicalNotes: 'Examen abdominal souple mais sensible en hypogastre. Bandelette urinaire positive pour leucocytes et nitrites. Allergie à la pénicilline confirmée, évitement impératif des bêta-lactamines.',
    prescriptions: [
      {
        id: 'rx_01',
        medication: 'Ciprofloxacine',
        dosage: '500 mg',
        frequency: '2 fois par jour (Matin et Soir)',
        duration: '7 jours',
        instructions: 'À prendre au milieu des repas avec un grand verre d\'eau.'
      },
      {
        id: 'rx_02',
        medication: 'Paracétamol',
        dosage: '1 g',
        frequency: 'Toutes les 8 heures si douleur',
        duration: '5 jours',
        instructions: 'Ne pas dépasser 3g par 24 heures.'
      }
    ],
    feeFcfa: 5000,
    paymentStatus: 'payée',
    paymentTxid: 'ln_inv_98f42c710d8e',
    paymentMethod: 'Lightning Network',
    bitcoinTxid: '0x4e3f2a1b9c7d8e6a5f0123456789abcdef0123456789abcdef0123456789abcd',
    ipfsCid: 'QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco',
    prescriptionImageUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 'cst_2026_002',
    patientId: 'usr_pat_001',
    patientName: 'Bienvenue Segnon',
    patientNpi: '1097885544901',
    patientBloodType: 'O+',
    patientAllergies: ['Pénicilline'],
    doctorId: 'usr_doc_002',
    doctorName: 'Dr. Gbaguidi',
    doctorSpecialty: 'Médecine Préventive',
    hospitalId: 'hosp_001',
    hospitalName: 'Clinique Sainte-Marie',
    date: '2026-03-12',
    time: '09:15',
    chiefComplaint: 'Bilan de santé annuel et certificat d\'aptitude physique.',
    diagnosis: 'Examen clinique sans anomalie. Constantes hémodynamiques stables.',
    clinicalNotes: 'Tension artérielle 120/75 mmHg. FC 68 bpm. IMC 22.4 kg/m². Bonne condition cardiorespiratoire.',
    prescriptions: [
      {
        id: 'rx_03',
        medication: 'Complexe Multivitaminé & Zinc',
        dosage: '1 comprimé',
        frequency: '1 fois par jour au petit déjeuner',
        duration: '30 jours'
      }
    ],
    feeFcfa: 5000,
    paymentStatus: 'payée',
    paymentTxid: 'ln_inv_88b13d56',
    paymentMethod: 'Lightning Network',
    bitcoinTxid: '0x8a9b2c3d4e5f60718293a4b5c6d7e8f90123456789abcdef0123456789abcdef',
    ipfsCid: 'QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG'
  },
  {
    id: 'cst_2022_003',
    patientId: 'usr_pat_001',
    patientName: 'Bienvenue Segnon',
    patientNpi: '1097885544901',
    patientBloodType: 'O+',
    patientAllergies: ['Pénicilline'],
    doctorId: 'usr_doc_003',
    doctorName: 'Dr. Devigan',
    doctorSpecialty: 'Chirurgie Viscérale',
    hospitalId: 'hosp_002',
    hospitalName: 'CNHU Hubert K. Maga',
    date: '2022-10-18',
    time: '11:00',
    chiefComplaint: 'Appendicite aiguë compliquée opérée par laparoscopie.',
    diagnosis: 'Appendicectomie laparoscopique réussie. Suites opératoires simples.',
    clinicalNotes: 'Intervention sous anesthésie générale. Sortie d\'hospitalisation à J+3. Cicatrisation parfaite au contrôle.',
    prescriptions: [],
    feeFcfa: 75000,
    paymentStatus: 'payée',
    paymentMethod: 'Mobile Money',
    bitcoinTxid: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
    ipfsCid: 'QmZtmD2qtqBPDBhn5C21mQLWP65GQCasMn8uhXjQqHrL2K'
  }
];

export const INITIAL_LAB_ANALYSES: LabAnalysis[] = [
  {
    id: 'lab_001',
    title: 'Examen Cytobactériologique des Urines (ECBU)',
    laboratory: 'Laboratoire Central Sainte-Marie',
    date: '2026-06-30',
    doctorName: 'Dr. Jean Kodjo',
    bitcoinTxid: '0x99a8b7c6d5e4f3a2b1c09876543210fedcba9876543210fedcba9876543210fe',
    results: [
      { parameter: 'Leucocytes', value: '145 000', unit: '/mL', referenceRange: '< 10 000', status: 'high' },
      { parameter: 'Hématies', value: '12 000', unit: '/mL', referenceRange: '< 1 000', status: 'high' },
      { parameter: 'Germe isolé', value: 'Escherichia coli', unit: '', referenceRange: 'Absence', status: 'high' },
      { parameter: 'Sensibilité Ciprofloxacine', value: 'SENSIBLE (CMI ≤ 0.25)', unit: '', referenceRange: 'Sensible', status: 'normal' }
    ]
  },
  {
    id: 'lab_002',
    title: 'Bilan Lipidique & Glycémie à Jeun',
    laboratory: 'Laboratoire de Biochimie CNHU',
    date: '2026-03-12',
    doctorName: 'Dr. Gbaguidi',
    bitcoinTxid: '0x77f6e5d4c3b2a10987654321fedcba9876543210fedcba9876543210fedcba98',
    results: [
      { parameter: 'Glycémie à jeun', value: '0.88', unit: 'g/L', referenceRange: '0.70 - 1.10', status: 'normal' },
      { parameter: 'Cholestérol Total', value: '1.75', unit: 'g/L', referenceRange: '< 2.00', status: 'normal' },
      { parameter: 'HDL (Bon cholestérol)', value: '0.55', unit: 'g/L', referenceRange: '> 0.40', status: 'normal' },
      { parameter: 'Triglycérides', value: '0.92', unit: 'g/L', referenceRange: '< 1.50', status: 'normal' }
    ]
  }
];

export const INITIAL_VACCINATIONS: Vaccination[] = [
  {
    id: 'vac_001',
    vaccineName: 'Stamaril (Fièvre Jaune)',
    disease: 'Fièvre Jaune',
    doseNumber: 'Dose unique à vie (Règlement Sanitaire Int.)',
    date: '2021-05-10',
    administeredBy: 'Centre de Vaccination International Cotonou',
    batchNumber: 'STAM-BJ-9021',
    bitcoinTxid: '0x55aa66bb77cc88dd99ee00ff112233445566778899aabbccddeeff0011223344'
  },
  {
    id: 'vac_002',
    vaccineName: 'Engerix B (Hépatite B)',
    disease: 'Hépatite B',
    doseNumber: 'Dose 3/3 (Schéma complet)',
    date: '2022-01-15',
    administeredBy: 'Clinique Sainte-Marie',
    batchNumber: 'ENG-HB-4412',
    bitcoinTxid: '0x66bb77cc88dd99ee00ff112233445566778899aabbccddeeff001122334455'
  },
  {
    id: 'vac_003',
    vaccineName: 'Tétanos-Diphtérie (Td)',
    disease: 'Tétanos & Diphtérie',
    doseNumber: 'Rappel 10 ans',
    date: '2024-08-20',
    administeredBy: 'Clinique Sainte-Marie',
    nextDoseDate: '2034-08-20',
    batchNumber: 'TD-RAP-8930',
    bitcoinTxid: '0x77cc88dd99ee00ff112233445566778899aabbccddeeff00112233445566'
  }
];

export const INITIAL_BLOOD_DONATIONS: BloodDonation[] = [
  {
    id: 'don_010',
    donorNpi: '1097885544901',
    donorName: 'Bienvenue Segnon',
    bloodType: 'O+',
    date: '2026-05-18',
    location: 'Banque Nationale de Sang Cotonou',
    volumeMl: 450,
    bagId: 'P-O-2026-0518-88',
    bitcoinTxid: '0x1f7c22e033ba99df88ac11ee22ff33aa44bb55cc66dd77ee88ff9900aabbccdd'
  },
  {
    id: 'don_009',
    donorNpi: '1097885544901',
    donorName: 'Bienvenue Segnon',
    bloodType: 'O+',
    date: '2026-01-10',
    location: 'Clinique Sainte-Marie',
    volumeMl: 450,
    bagId: 'P-O-2026-0110-42',
    bitcoinTxid: '0x2a8d33f144cb00ea99bd22ff33aa44bb55cc66dd77ee88ff9900aabbccdd11'
  },
  {
    id: 'don_008',
    donorNpi: '1097885544901',
    donorName: 'Bienvenue Segnon',
    bloodType: 'O+',
    date: '2025-08-22',
    location: 'Banque de Sang CNHU',
    volumeMl: 450,
    bagId: 'P-O-2025-0822-19',
    bitcoinTxid: '0x3b9e44a255dc11fb00ce33aa44bb55cc66dd77ee88ff9900aabbccdd1122'
  }
];

export const INITIAL_TONTINES: TontineGroup[] = [
  {
    id: 'tnt_001',
    name: 'Tontine Santé Famille Segnon',
    description: 'Fonds d\'urgence médicale et prévoyance familiale partagée.',
    membersCount: 5,
    monthlyContributionFcfa: 10000,
    currentBalanceFcfa: 120000,
    nextPayoutDate: '15 Juillet 2026',
    beneficiaryName: 'Bienvenue Segnon',
    multisigScheme: '2-of-3 Bitcoin Multi-sig',
    status: 'active',
    bitcoinVaultAddress: 'bc1q9v8t6l0w2k5y4x3z7p1n9m8j7h6g5f4d3s2a1q',
    transactionsCount: 14,
    members: [
      { id: 'm1', name: 'Bienvenue Segnon (Admin)', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&fit=crop&q=80', status: 'à jour', lastContributionDate: '2026-06-01' },
      { id: 'm2', name: 'Aimée Segnon', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&fit=crop&q=80', status: 'à jour', lastContributionDate: '2026-06-02' },
      { id: 'm3', name: 'Koffi Segnon', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&fit=crop&q=80', status: 'à jour', lastContributionDate: '2026-06-05' },
      { id: 'm4', name: 'Rosine Houngbo', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&fit=crop&q=80', status: 'à jour', lastContributionDate: '2026-06-04' },
      { id: 'm5', name: 'Gervais Segnon', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&fit=crop&q=80', status: 'à jour', lastContributionDate: '2026-06-03' }
    ]
  },
  {
    id: 'tnt_002',
    name: 'Tontine Solidarité Artisans Cotonou',
    description: 'Couverture des accidents de travail et consultations spécialistes.',
    membersCount: 12,
    monthlyContributionFcfa: 5000,
    currentBalanceFcfa: 240000,
    nextPayoutDate: '01 Août 2026',
    beneficiaryName: 'Armand Agossa',
    multisigScheme: '3-of-5 Bitcoin Multi-sig',
    status: 'active',
    bitcoinVaultAddress: 'bc1qw508d6qejxtdg4y5r3zarvary0c5xw7kv8f3t4',
    transactionsCount: 36,
    members: [
      { id: 't2_m1', name: 'Armand Agossa', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=80&fit=crop&q=80', status: 'à jour', lastContributionDate: '2026-06-10' },
      { id: 't2_m2', name: 'Bienvenue Segnon', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&fit=crop&q=80', status: 'à jour', lastContributionDate: '2026-06-10' }
    ]
  }
];

export const INITIAL_BLOOD_ALERTS: BloodAlert[] = [
  {
    id: 'alert_001',
    hospitalName: 'Centre Hospitalier Départemental du Borgou (CHD)',
    city: 'Parakou',
    bloodTypeNeeded: 'O+',
    urgencyLevel: 'ALERTE CRITIQUE',
    donorsNearbyCount: 12,
    distanceKm: 415,
    postedAt: 'Il y a 22 minutes',
    status: 'active'
  },
  {
    id: 'alert_002',
    hospitalName: 'CNHU Hubert Koutoukou Maga',
    city: 'Cotonou',
    bloodTypeNeeded: 'AB-',
    urgencyLevel: 'URGENCE VITALE',
    donorsNearbyCount: 3,
    distanceKm: 3.4,
    postedAt: 'Il y a 1 heure',
    status: 'active'
  }
];

export const INITIAL_EQUIPMENTS: HospitalEquipment[] = [
  { id: 'eq_01', name: 'Scanner IRM 1.5 Tesla', units: 2, status: 'Disponible', nextMaintenance: '2026-09-01', department: 'Imagerie Médicale' },
  { id: 'eq_02', name: 'Échographe Doppler Couleur', units: 3, status: 'Disponible', nextMaintenance: '2026-07-15', department: 'Gynécologie & Cardologie' },
  { id: 'eq_03', name: 'Radiographe Numérique Capteur Plan', units: 1, status: 'Hors service', nextMaintenance: '2026-06-30', department: 'Radiologie' },
  { id: 'eq_04', name: 'Électrocardiographe 12 Dérivations', units: 2, status: 'Disponible', nextMaintenance: 'À jour', department: 'Cardiologie' },
  { id: 'eq_05', name: 'Analyseur Automatique d\'Hématologie', units: 1, status: 'Disponible', nextMaintenance: 'À jour', department: 'Laboratoire Central' }
];

export const INITIAL_DOCTORS_STATS = [
  { id: 'doc_1', name: 'Dr. Jean Kodjo', specialty: 'Médecine Générale', patientsPerDay: 15, rating: 4.8, consultationsMonth: 145 },
  { id: 'doc_2', name: 'Dr. Estelle Gbaguidi', specialty: 'Pédiatrie', patientsPerDay: 12, rating: 4.9, consultationsMonth: 118 },
  { id: 'doc_3', name: 'Dr. Marc Devigan', specialty: 'Cardiologie', patientsPerDay: 10, rating: 4.7, consultationsMonth: 93 }
];

export const INITIAL_SPECIALTY_REPORTS = [
  { specialty: 'Cardiologie', consultations: 120, sharePercent: 33.7, revenueFcfa: 840000 },
  { specialty: 'Pédiatrie', consultations: 95, sharePercent: 26.6, revenueFcfa: 570000 },
  { specialty: 'Gynécologie', consultations: 80, sharePercent: 22.4, revenueFcfa: 640000 },
  { specialty: 'Médecine Générale', consultations: 61, sharePercent: 17.3, revenueFcfa: 350000 }
];

export const INITIAL_AUDIT_LOGS: AuditLogItem[] = [
  {
    id: 'log_001',
    timestamp: '2026-06-30 14:35:12',
    action: 'Consultation',
    actorName: 'Dr. Jean Kodjo',
    actorRole: 'Médecin Généraliste',
    department: 'Cabinet 02',
    patientOrTarget: 'Bienvenue Segnon (NPI 1097885544901)',
    bitcoinTxid: '0x4e3f2a1b9c7d8e6a5f0123456789abcdef0123456789abcdef0123456789abcd',
    merkleRoot: '0x99fa1b8c66e2'
  },
  {
    id: 'log_002',
    timestamp: '2026-06-30 14:30:04',
    action: 'Accès dossier',
    actorName: 'Dr. Jean Kodjo',
    actorRole: 'Médecin Généraliste',
    department: 'Cabinet 02',
    patientOrTarget: 'Bienvenue Segnon (Scan QR Instantané)',
    bitcoinTxid: '0x4e3f2a1c8b9d7e6a5f0123456789abcdef0123456789abcdef0123456789abce',
    merkleRoot: '0x99fa1b8c66e2'
  },
  {
    id: 'log_003',
    timestamp: '2026-06-29 10:15:30',
    action: 'Modification inventaire',
    actorName: 'Mme. Claudine Ahouissou',
    actorRole: 'Administratrice',
    department: 'Pharmacie Centrale',
    patientOrTarget: 'Restock Ciprofloxacine 500mg (+200 boîtes)',
    bitcoinTxid: '0x4e3f2a1d7a9c6e5b4f0123456789abcdef0123456789abcdef0123456789abcf',
    merkleRoot: '0x88ea2c9b55d1'
  },
  {
    id: 'log_004',
    timestamp: '2026-06-28 16:45:00',
    action: 'Paiement Lightning',
    actorName: 'Bienvenue Segnon',
    actorRole: 'Patient',
    department: 'Caisse Automatique LN',
    patientOrTarget: 'Facture Consultation #9081 (5 000 FCFA)',
    bitcoinTxid: '0x9b2a11cf88de77cd66ab55ef44cc33bb22aa1199887766554433221100fedcba',
    merkleRoot: '0x77db3d0c44c0'
  }
];

export const INITIAL_MICROSERVICES: MicroserviceHealth[] = [
  { id: 'srv_01', name: 'Auth Service', port: 3881, status: 'En ligne', latencyMs: 18, loadPercent: 19, uptime: '99.98%' },
  { id: 'srv_02', name: 'Patient API & Dossier', port: 3882, status: 'En ligne', latencyMs: 24, loadPercent: 28, uptime: '99.99%' },
  { id: 'srv_03', name: 'Consultation Engine', port: 3883, status: 'En ligne', latencyMs: 31, loadPercent: 34, uptime: '99.95%' },
  { id: 'srv_04', name: 'Lightning Node (LNbits)', port: 3884, status: 'En ligne', latencyMs: 14, loadPercent: 22, uptime: '99.99%' },
  { id: 'srv_05', name: 'SOS Urgence & Dispatch', port: 3885, status: 'En ligne', latencyMs: 12, loadPercent: 15, uptime: '100%' },
  { id: 'srv_06', name: 'Tontine Ledger Multi-sig', port: 3886, status: 'En ligne', latencyMs: 29, loadPercent: 26, uptime: '99.94%' },
  { id: 'srv_07', name: 'Blood Bank Sync', port: 3887, status: 'En ligne', latencyMs: 22, loadPercent: 30, uptime: '99.97%' },
  { id: 'srv_08', name: 'Prescription Hub', port: 3888, status: 'En ligne', latencyMs: 20, loadPercent: 21, uptime: '99.96%' },
  { id: 'srv_09', name: 'Audit Logger OP_RETURN', port: 3889, status: 'En ligne', latencyMs: 35, loadPercent: 41, uptime: '99.99%' },
  { id: 'srv_10', name: 'Analytics DB (PostgreSQL)', port: 5432, status: 'En ligne', latencyMs: 15, loadPercent: 38, uptime: '99.99%' },
  { id: 'srv_11', name: 'Notification Queue (RabbitMQ)', port: 5672, status: 'En ligne', latencyMs: 19, loadPercent: 27, uptime: '99.95%' },
  { id: 'srv_12', name: 'Legacy Hospital Bridge', port: 8880, status: 'Alerte', latencyMs: 450, loadPercent: 78, uptime: '98.80%' }
];

export const INITIAL_BITCOIN_ANCHOR: BitcoinAnchor = {
  blockHeight: 894520,
  blockHash: '00000000000000000001a4b5c7e89f0123456789abcdef123456789abcdef01',
  timestamp: 'Il y a 4 min 12 s',
  anchoredRecordsCount: 45210,
  merkleRoot: '0x99fa1b8c66e277d33b8a44c99e11f0a823b49c71',
  status: 'Confirmé (6+ blocks)'
};

export const DOCTOR_WAITING_QUEUE = [
  {
    id: 'wq_01',
    patientId: 'usr_pat_001',
    name: 'Bienvenue Segnon',
    npi: '1097885544901',
    bloodType: 'O+',
    allergies: ['Pénicilline'],
    hasAllergyAlert: true,
    waitTime: '5 min',
    status: 'en_attente',
    reason: 'Douleur abdominale & brûlures'
  },
  {
    id: 'wq_02',
    patientId: 'usr_pat_002',
    name: 'Alice Dovonou',
    npi: '1098442211874',
    bloodType: 'A+',
    allergies: [],
    hasAllergyAlert: false,
    waitTime: '10 min',
    status: 'en_attente',
    reason: 'Suivi tensionnel'
  },
  {
    id: 'wq_03',
    patientId: 'usr_pat_003',
    name: 'Koffi Mensah',
    npi: '1096338877112',
    bloodType: 'B+',
    allergies: [],
    hasAllergyAlert: false,
    waitTime: '18 min',
    status: 'donneur_actif',
    reason: 'Douleur thoracique à l\'effort'
  }
];
