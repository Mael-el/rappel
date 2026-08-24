import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  QrCode,
  FileText,
  CreditCard,
  Calendar,
  HeartHandshake,
  Droplet,
  MapPin,
  Star,
  Clock,
  ShieldCheck,
  AlertTriangle,
  ChevronRight,
  Filter,
  CheckCircle2,
  PhoneCall,
  Search
} from 'lucide-react';
import { soundFX } from '../../utils/audioAndFx';

export const PatientDashboard: React.FC = () => {
  const {
    currentUser,
    setPatientTab,
    hospitals,
    bookAppointment,
    openTxVerifier,
    isSeniorMode
  } = useApp();

  const [maxPrice, setMaxPrice] = useState<number>(5000);
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('all');
  const [bookingModalHospital, setBookingModalHospital] = useState<typeof hospitals[0] | null>(null);
  const [bookingDate, setBookingDate] = useState('2026-07-01');
  const [bookingTime, setBookingTime] = useState('10:30');
  const [bookingReason, setBookingReason] = useState('Consultation de Médecine Générale');

  const filteredHospitals = hospitals.filter(h => {
    const matchesPrice = h.consultationFeeFcfa <= maxPrice;
    const matchesSpecialty = selectedSpecialty === 'all' || h.specialties.includes(selectedSpecialty);
    return matchesPrice && matchesSpecialty;
  });

  const handleOpenBooking = (h: typeof hospitals[0]) => {
    soundFX.playBeep(900, 0.04);
    setBookingModalHospital(h);
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingModalHospital) return;

    bookAppointment({
      patientId: currentUser.id,
      patientName: currentUser.name,
      patientPhone: currentUser.phone,
      doctorId: 'usr_doc_001',
      doctorName: 'Dr. Jean Kodjo',
      hospitalId: bookingModalHospital.id,
      hospitalName: bookingModalHospital.name,
      specialty: 'Médecine Générale',
      date: bookingDate,
      time: bookingTime,
      reason: bookingReason,
      feeFcfa: bookingModalHospital.consultationFeeFcfa
    });

    setBookingModalHospital(null);
  };

  return (
    <div className={`space-y-6 animate-in fade-in duration-200 ${isSeniorMode ? 'text-lg' : ''}`}>
      
      {/* 1. Patient Vital Identity Header Bar */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={currentUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&fit=crop&q=80'}
              alt={currentUser.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-emerald-500 shadow-md ring-4 ring-emerald-50"
            />
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900">
                  {currentUser.name}
                </h1>
                <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 font-mono">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  NPI: {currentUser.npi}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                📍 Cotonou, Littoral · {currentUser.phone} · Dossier actif
              </p>
            </div>
          </div>

          {/* Quick Vital Badges */}
          <div className="flex items-center gap-2.5 flex-wrap w-full md:w-auto">
            {/* Blood Type */}
            <div className="flex-1 md:flex-none bg-red-50 border border-red-200 p-3 rounded-2xl text-center min-w-[90px]">
              <span className="text-[10px] uppercase font-bold text-red-600 block">Groupe</span>
              <span className="text-lg font-black text-red-700">{currentUser.bloodType || 'O+'}</span>
            </div>

            {/* Red Allergy Alert */}
            <div className="flex-1 md:flex-none bg-rose-100/80 border border-rose-300 p-3 rounded-2xl text-left">
              <div className="flex items-center gap-1 text-[10px] uppercase font-extrabold text-rose-700">
                <AlertTriangle className="w-3.5 h-3.5" />
                Allergie Critique
              </div>
              <span className="text-sm font-black text-rose-900 block mt-0.5">
                {currentUser.allergies?.join(', ') || 'PÉNICILLINE'}
              </span>
            </div>

            {/* Donor Badge */}
            <div className="flex-1 md:flex-none bg-amber-50 border border-amber-200 p-3 rounded-2xl text-center min-w-[110px]">
              <span className="text-[10px] uppercase font-bold text-amber-700 block">Statut Donneur</span>
              <span className="text-xs font-black text-amber-900 block mt-1">
                🏅 {currentUser.donorBadge || "Donneur d'Or"} ({currentUser.donationsCount || 10} dons)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Six Primary 1-Click Action Cards (3-Clicks Rule) */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <h2 className="text-sm uppercase font-extrabold tracking-wider text-slate-500 flex items-center gap-2">
            <span>Mes Services de Santé (Règle des 3 clics)</span>
          </h2>
          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
            Accès 1 clic
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
          
          {/* Card 1: QR Code */}
          <button
            onClick={() => {
              soundFX.playBeep(900, 0.04);
              setPatientTab('qrcode');
            }}
            className="flex flex-col items-center justify-center p-5 bg-white hover:bg-emerald-50/60 rounded-3xl border border-slate-200/80 hover:border-emerald-300 shadow-xs hover:shadow-md transition-all group text-center"
          >
            <div className="w-14 h-14 rounded-2xl bg-emerald-100/70 text-[#00A389] group-hover:bg-[#00D26A] group-hover:text-slate-950 flex items-center justify-center transition shadow-xs">
              <QrCode className="w-7 h-7" />
            </div>
            <span className="font-extrabold text-sm text-slate-800 group-hover:text-emerald-900 mt-3 block">
              QR Code
            </span>
            <span className="text-[11px] text-slate-400 mt-0.5 block">
              Accueil hôpital
            </span>
          </button>

          {/* Card 2: Dossier Médical */}
          <button
            onClick={() => {
              soundFX.playBeep(900, 0.04);
              setPatientTab('records');
            }}
            className="flex flex-col items-center justify-center p-5 bg-white hover:bg-blue-50/60 rounded-3xl border border-slate-200/80 hover:border-blue-300 shadow-xs hover:shadow-md transition-all group text-center"
          >
            <div className="w-14 h-14 rounded-2xl bg-blue-100/70 text-blue-600 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center transition shadow-xs">
              <FileText className="w-7 h-7" />
            </div>
            <span className="font-extrabold text-sm text-slate-800 group-hover:text-blue-900 mt-3 block">
              Dossier à Vie
            </span>
            <span className="text-[11px] text-slate-400 mt-0.5 block">
              3 consultations
            </span>
          </button>

          {/* Card 3: Rendez-vous */}
          <button
            onClick={() => {
              soundFX.playBeep(900, 0.04);
              setPatientTab('appointments');
            }}
            className="flex flex-col items-center justify-center p-5 bg-white hover:bg-teal-50/60 rounded-3xl border border-slate-200/80 hover:border-teal-300 shadow-xs hover:shadow-md transition-all group text-center"
          >
            <div className="w-14 h-14 rounded-2xl bg-teal-100/70 text-teal-600 group-hover:bg-teal-600 group-hover:text-white flex items-center justify-center transition shadow-xs">
              <Calendar className="w-7 h-7" />
            </div>
            <span className="font-extrabold text-sm text-slate-800 group-hover:text-teal-900 mt-3 block">
              Rendez-vous
            </span>
            <span className="text-[11px] text-slate-400 mt-0.5 block">
              Demain 10h30
            </span>
          </button>

          {/* Card 4: Paiements & Lightning */}
          <button
            onClick={() => {
              soundFX.playBeep(900, 0.04);
              setPatientTab('payment');
            }}
            className="flex flex-col items-center justify-center p-5 bg-white hover:bg-amber-50/60 rounded-3xl border border-slate-200/80 hover:border-amber-300 shadow-xs hover:shadow-md transition-all group text-center"
          >
            <div className="w-14 h-14 rounded-2xl bg-amber-100/70 text-amber-600 group-hover:bg-amber-500 group-hover:text-slate-950 flex items-center justify-center transition shadow-xs">
              <CreditCard className="w-7 h-7" />
            </div>
            <span className="font-extrabold text-sm text-slate-800 group-hover:text-amber-900 mt-3 block">
              Paiements ⚡
            </span>
            <span className="text-[11px] text-slate-400 mt-0.5 block">
              Lightning (2s)
            </span>
          </button>

          {/* Card 5: Tontines Santé */}
          <button
            onClick={() => {
              soundFX.playBeep(900, 0.04);
              setPatientTab('tontine');
            }}
            className="flex flex-col items-center justify-center p-5 bg-white hover:bg-purple-50/60 rounded-3xl border border-slate-200/80 hover:border-purple-300 shadow-xs hover:shadow-md transition-all group text-center"
          >
            <div className="w-14 h-14 rounded-2xl bg-purple-100/70 text-purple-600 group-hover:bg-purple-600 group-hover:text-white flex items-center justify-center transition shadow-xs">
              <HeartHandshake className="w-7 h-7" />
            </div>
            <span className="font-extrabold text-sm text-slate-800 group-hover:text-purple-900 mt-3 block">
              Tontines
            </span>
            <span className="text-[11px] text-slate-400 mt-0.5 block">
              120 000 FCFA
            </span>
          </button>

          {/* Card 6: Don de sang */}
          <button
            onClick={() => {
              soundFX.playBeep(900, 0.04);
              setPatientTab('blood');
            }}
            className="flex flex-col items-center justify-center p-5 bg-white hover:bg-red-50/60 rounded-3xl border border-slate-200/80 hover:border-red-300 shadow-xs hover:shadow-md transition-all group text-center"
          >
            <div className="w-14 h-14 rounded-2xl bg-red-100/70 text-red-600 group-hover:bg-red-600 group-hover:text-white flex items-center justify-center transition shadow-xs">
              <Droplet className="w-7 h-7" />
            </div>
            <span className="font-extrabold text-sm text-slate-800 group-hover:text-red-900 mt-3 block">
              Don de Sang
            </span>
            <span className="text-[11px] text-red-500 font-semibold mt-0.5 block">
              1 Alerte SOS
            </span>
          </button>

        </div>
      </div>

      {/* 3. Nearby Hospitals & Smart Filter (Clinique Sainte-Marie: 1.2km, 4.9⭐, 5 000 FCFA) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-emerald-600" />
              Hôpitaux & Cliniques Interconnectés à Proximité
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Trouvez un médecin disponible, comparez les tarifs et réservez en 1 clic.
            </p>
          </div>

          {/* Filter Bars */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700">
              <Filter className="w-3.5 h-3.5 text-slate-500" />
              <span>Prix Max :</span>
              <select
                value={maxPrice}
                onChange={e => setMaxPrice(Number(e.target.value))}
                className="bg-transparent font-bold text-emerald-700 focus:outline-hidden"
              >
                <option value={3500}>3 500 FCFA</option>
                <option value={5000}>5 000 FCFA (Clinique Sainte-Marie)</option>
                <option value={10000}>10 000 FCFA</option>
              </select>
            </div>

            <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700">
              <span>Spécialité :</span>
              <select
                value={selectedSpecialty}
                onChange={e => setSelectedSpecialty(e.target.value)}
                className="bg-transparent font-bold text-slate-800 focus:outline-hidden"
              >
                <option value="all">Toutes spécialités</option>
                <option value="Médecine Générale">Médecine Générale</option>
                <option value="Pédiatrie">Pédiatrie</option>
                <option value="Cardiologie">Cardiologie</option>
              </select>
            </div>
          </div>
        </div>

        {/* Hospitals Cards List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredHospitals.map(hosp => {
            const isSainteMarie = hosp.id === 'hosp_001';
            return (
              <div
                key={hosp.id}
                className={`p-5 rounded-2xl border transition-all flex flex-col justify-between space-y-4 ${
                  isSainteMarie
                    ? 'border-emerald-400 bg-emerald-50/30 shadow-md ring-2 ring-emerald-200'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        {hosp.type}
                      </span>
                      <h3 className="font-extrabold text-base text-slate-900 mt-0.5">
                        {hosp.name}
                      </h3>
                      <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        {hosp.address} ({hosp.distanceKm} km)
                      </p>
                    </div>

                    <div className="flex items-center gap-1 bg-amber-100 text-amber-800 text-xs font-black px-2 py-1 rounded-xl shrink-0">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      <span>{hosp.rating}</span>
                    </div>
                  </div>

                  {/* Specialties Pills */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {hosp.specialties.slice(0, 3).map((spec, i) => (
                      <span key={i} className="text-[10px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
                        {spec}
                      </span>
                    ))}
                    {hosp.specialties.length > 3 && (
                      <span className="text-[10px] font-medium bg-slate-100 text-slate-400 px-1.5 py-0.5 rounded-md">
                        +{hosp.specialties.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Bottom Card Action */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Tarif Consultation</span>
                    <span className="text-sm font-black text-emerald-700">
                      {hosp.consultationFeeFcfa.toLocaleString()} FCFA
                    </span>
                  </div>

                  <button
                    onClick={() => handleOpenBooking(hosp)}
                    className="bg-slate-900 hover:bg-[#00D26A] hover:text-slate-950 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition flex items-center gap-1.5 shadow-sm"
                  >
                    <span>Prendre RDV</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Booking Modal */}
      {bookingModalHospital && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 animate-in zoom-in-95">
            <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-emerald-600" />
              Prendre Rendez-vous
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Établissement : <strong>{bookingModalHospital.name}</strong> ({bookingModalHospital.consultationFeeFcfa.toLocaleString()} FCFA)
            </p>

            <form onSubmit={handleConfirmBooking} className="mt-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Médecin Référent</label>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 flex items-center gap-2">
                  <span>👨‍⚕️ Dr. Jean Kodjo (Médecine Générale)</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Date</label>
                  <input
                    type="date"
                    value={bookingDate}
                    onChange={e => setBookingDate(e.target.value)}
                    className="w-full p-3 bg-white border border-slate-300 rounded-xl font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Heure</label>
                  <input
                    type="time"
                    value={bookingTime}
                    onChange={e => setBookingTime(e.target.value)}
                    className="w-full p-3 bg-white border border-slate-300 rounded-xl font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Motif de consultation</label>
                <input
                  type="text"
                  value={bookingReason}
                  onChange={e => setBookingReason(e.target.value)}
                  placeholder="Ex: Douleur au ventre depuis 3 jours..."
                  className="w-full p-3 bg-white border border-slate-300 rounded-xl font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                />
              </div>

              <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900 space-y-1">
                <div className="font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Rappel SMS automatique
                </div>
                <div className="text-[11px] text-emerald-800">
                  Un rappel vous sera envoyé 1h avant la consultation au <strong>{currentUser.phone}</strong>.
                </div>
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  type="submit"
                  className="flex-1 bg-[#00D26A] hover:bg-[#00b55b] text-slate-950 font-extrabold py-3 rounded-xl transition text-sm shadow-md"
                >
                  Confirmer le Rendez-vous
                </button>
                <button
                  type="button"
                  onClick={() => setBookingModalHospital(null)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 px-5 rounded-xl transition"
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
