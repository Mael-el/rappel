import React from 'react';
import { Logo } from './Logo';
import { Shield, PhoneCall, Mail, Award, Heart, Cpu, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#00141E] text-slate-400 text-xs border-t border-slate-800 mt-16 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1: Brand & Slogan */}
          <div className="space-y-4 md:col-span-1">
            <Logo size="md" />
            <p className="text-slate-300 text-sm leading-relaxed font-medium">
              « De l'urgence au soin en 3 minutes, un dossier médical pour la vie. »
            </p>
            <div className="flex items-center gap-2 text-[11px] text-emerald-400 font-semibold bg-emerald-950/60 border border-emerald-800/60 px-3 py-1.5 rounded-xl w-fit">
              <Shield className="w-4 h-4" />
              <span>Infrastructure Nationale Bénin · Bitcoin Mainnet</span>
            </div>
          </div>

          {/* Col 2: Equipe Winners */}
          <div className="space-y-3">
            <h4 className="text-white text-xs uppercase font-extrabold tracking-wider flex items-center gap-1.5">
              <Award className="w-4 h-4 text-[#00D26A]" />
              Équipe Winners (Porteurs)
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="text-slate-300">
                <span className="font-bold text-white">Bienvenu ESSEGNON</span>
                <span className="block text-[11px] text-slate-400">Product Owner & Full-Stack</span>
              </li>
              <li className="text-slate-300">
                <span className="font-bold text-white">Adorée KPENONHOUN</span>
                <span className="block text-[11px] text-slate-400">Développeuse Full-Stack</span>
              </li>
              <li className="text-slate-300">
                <span className="font-bold text-white">Orphet AHILIHAN</span>
                <span className="block text-[11px] text-slate-400">Backend & Blockchain</span>
              </li>
              <li className="text-slate-300">
                <span className="font-bold text-white">Ismail AGOHOUNDJE</span>
                <span className="block text-[11px] text-slate-400">Frontend & UI/UX</span>
              </li>
              <li className="text-slate-300">
                <span className="font-bold text-white">Prince BONGO</span>
                <span className="block text-[11px] text-slate-400">Backend & IA</span>
              </li>
            </ul>
          </div>

          {/* Col 3: Urgence & Contacts */}
          <div className="space-y-3">
            <h4 className="text-white text-xs uppercase font-extrabold tracking-wider flex items-center gap-1.5">
              <PhoneCall className="w-4 h-4 text-red-500" />
              Lignes d'Urgence Nationales
            </h4>
            <div className="space-y-2.5">
              <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                <span className="text-[11px] text-slate-400 block">SAMU Bénin (Secours Médical)</span>
                <span className="text-white font-black text-sm">112 / +229 21 30 06 56</span>
              </div>
              <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                <span className="text-[11px] text-slate-400 block">Sapeurs-Pompiers Bénin</span>
                <span className="text-white font-black text-sm">118</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400 text-[11px]">
                <Mail className="w-3.5 h-3.5 text-emerald-400" />
                <span>bienvenuessegnon01@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Col 4: Architecture & Sécurité */}
          <div className="space-y-3">
            <h4 className="text-white text-xs uppercase font-extrabold tracking-wider flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-amber-400" />
              Garanties Techniques
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              • Horodatage immuable sur Bitcoin (OP_RETURN)<br />
              • Micro-paiements Lightning en 2 secondes<br />
              • Tontines Santé sécurisées en Multi-sig 2-of-3<br />
              • Fonctionnement hors-ligne et basse connectivité 2G
            </p>
            <div className="flex items-center gap-2 text-slate-500 text-[11px]">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Conforme aux normes éthiques et RGPD/Bénin</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <div>
            © 2026 Santé+ (Équipe Winners). Tous droits réservés. Cotonou, République du Bénin.
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Conçu avec</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 mx-0.5" />
            <span>pour la santé de chaque citoyen africain.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
