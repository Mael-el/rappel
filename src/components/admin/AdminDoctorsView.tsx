import React from 'react';
import { useApp } from '../../context/AppContext';
import { Stethoscope, Star, Phone, Mail, Award, CheckCircle2, Plus } from 'lucide-react';
import { soundFX, triggerConfetti } from '../../utils/audioAndFx';

export const AdminDoctorsView: React.FC = () => {
  const doctorsList = [
    {
      id: 'doc_1',
      name: 'Dr. Jean Kodjo',
      specialty: 'Médecine Générale & Urgences',
      rating: 4.8,
      consultationsCount: 142,
      phone: '+229 95 44 88 12',
      email: 'jean.kodjo@santeplus.bj',
      avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=120&fit=crop&q=80',
      status: 'En Consultation'
    },
    {
      id: 'doc_2',
      name: 'Dr. Marc Gbaguidi',
      specialty: 'Cardiologie Interventionnelle',
      rating: 4.9,
      consultationsCount: 98,
      phone: '+229 97 12 34 56',
      email: 'marc.gbaguidi@santeplus.bj',
      avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=120&fit=crop&q=80',
      status: 'Disponible'
    },
    {
      id: 'doc_3',
      name: 'Dr. Estelle Sossou',
      specialty: 'Pédiatrie & Néonatalogie',
      rating: 4.7,
      consultationsCount: 116,
      phone: '+229 96 89 77 44',
      email: 'estelle.sossou@santeplus.bj',
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=120&fit=crop&q=80',
      status: 'Disponible'
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-purple-100 text-purple-800 text-xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Corps Médical Clinique Sainte-Marie
            </span>
            <span className="text-xs text-slate-400 font-semibold">{doctorsList.length} Praticiens Agréés</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 mt-1">
            Gestion des Médecins & Spécialistes
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Suivi des plannings, des avis patients et des signatures électroniques.
          </p>
        </div>

        <button
          onClick={() => {
            soundFX.playSuccess();
            triggerConfetti();
          }}
          className="bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs px-5 py-3 rounded-2xl flex items-center gap-2 transition shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Ajouter un Médecin</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {doctorsList.map(doc => (
          <div key={doc.id} className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center gap-4">
              <img
                src={doc.avatar}
                alt={doc.name}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-purple-200 shadow-xs"
              />
              <div>
                <h3 className="font-black text-slate-900 text-base">{doc.name}</h3>
                <p className="text-xs text-slate-500 font-medium">{doc.specialty}</p>
                <div className="flex items-center gap-1 mt-1 text-xs font-black text-amber-600">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <span>{doc.rating} / 5.0</span>
                </div>
              </div>
            </div>

            <div className="space-y-1.5 text-xs text-slate-600 bg-slate-50 p-3 rounded-2xl border border-slate-200/70">
              <div className="flex justify-between">
                <span>Consultations :</span>
                <strong className="text-slate-900">{doc.consultationsCount}</strong>
              </div>
              <div className="flex justify-between">
                <span>Téléphone :</span>
                <span className="font-mono text-slate-700">{doc.phone}</span>
              </div>
              <div className="flex justify-between">
                <span>Statut :</span>
                <span className="text-emerald-700 font-bold">{doc.status}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
