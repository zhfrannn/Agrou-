import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles, Leaf, ShoppingBag, BarChart2, ChevronRight, Send,
  RotateCcw, CheckCircle2, MapPin, Phone, Star, ShieldCheck,
  TrendingUp, Users, Package, Droplets, Bug, Wheat, Fish,
  Coffee, Carrot, Plus, Clock, Settings, User, Menu, X,
  MessageSquare, Inbox, ArrowRight, Zap, Lock, LogOut
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────
type Role = "general" | "koperasi" | null;
type Path = 
  | "diagnosis" 
  | "cari" 
  | "analisis" 
  | "alat" 
  | "roleplay" 
  | "strategi" 
  | "stok" 
  | "keuangan" 
  | null;
type Stage = 0 | 1 | 2 | 3;

interface Message {
  id: string;
  role: "ai" | "user";
  content: React.ReactNode;
  timestamp: Date;
}

// ─── Static Data ─────────────────────────────────────────────────────────────
const GENERAL_HISTORY = [
  { id: 1, label: "Diagnosis Padi — Blast", path: "diagnosis", time: "2j lalu" },
  { id: 2, label: "Rekomendasi Sprayer Elektrik", path: "alat", time: "1 hari lalu" },
  { id: 3, label: "Diagnosis Cabai — Layu", path: "diagnosis", time: "3 hari lalu" },
];

const KOPERASI_HISTORY = [
  { id: 1, label: "Analisis Keuangan Mei", path: "keuangan", time: "30m lalu" },
  { id: 2, label: "Stok Sayuran Overstock", path: "stok", time: "2j lalu" },
  { id: 3, label: "Strategi Ekspansi Rp 100Jt", path: "strategi", time: "Kemarin" },
];

const PATH_COLORS: Record<string, string> = {
  // General Paths
  diagnosis: "#2D6A4F",
  cari: "#F77F00",
  alat: "#10B981",
  roleplay: "#D97706",
  // Koperasi Paths
  analisis: "#6366F1",
  strategi: "#4F46E5",
  stok: "#EC4899",
  keuangan: "#06B6D4",
};

const COMMODITIES_TANI = [
  { label: "Padi", icon: Wheat, color: "#F59E0B" },
  { label: "Jagung", icon: Leaf, color: "#10B981" },
  { label: "Kedelai", icon: Leaf, color: "#6366F1" },
  { label: "Cabai", icon: Carrot, color: "#EF4444" },
  { label: "Tomat", icon: Carrot, color: "#F97316" },
  { label: "Udang", icon: Fish, color: "#0EA5E9" },
  { label: "Ikan Lele", icon: Fish, color: "#3B82F6" },
  { label: "Kopi", icon: Coffee, color: "#92400E" },
];

const SYMPTOMS = [
  { label: "Daun Menguning", desc: "Klorosis / defisiensi nitrogen", emoji: "🍂" },
  { label: "Bercak Coklat", desc: "Indikasi jamur Helminthosporium", emoji: "🟤" },
  { label: "Daun Layu", desc: "Serangan bakteri / kekurangan air", emoji: "🥀" },
  { label: "Bintik Hitam", desc: "Blast atau antraknosa", emoji: "⚫" },
  { label: "Lubang pada Daun", desc: "Hama pemakan daun", emoji: "🔵" },
  { label: "Batang Busuk", desc: "Fusarium / penyakit akar", emoji: "🟢" },
];

const COMMODITIES_PASAR = [
  { label: "Sayuran", icon: Carrot, color: "#10B981" },
  { label: "Ikan & Laut", icon: Fish, color: "#0EA5E9" },
  { label: "Padi & Serealia", icon: Wheat, color: "#F59E0B" },
  { label: "Kopi & Rempah", icon: Coffee, color: "#92400E" },
  { label: "Buah Tropis", icon: Leaf, color: "#F97316" },
  { label: "Udang Vaname", icon: Fish, color: "#6366F1" },
];

const VOLUME_OPTIONS = [
  { label: "< 100 kg", sub: "Skala kecil" },
  { label: "100 kg – 1 Ton", sub: "Skala menengah" },
  { label: "1 – 10 Ton", sub: "Skala besar" },
  { label: "> 10 Ton", sub: "Skala ekspor" },
];

const FREQ_OPTIONS = [
  { label: "Sekali beli", sub: "Satu kali" },
  { label: "Mingguan", sub: "Rutin / minggu" },
  { label: "Bulanan", sub: "Rutin / bulan" },
  { label: "Kontrak Tahunan", sub: "Jangka panjang" },
];

const PROVINCES = [
  "Aceh", "Sumatera Utara", "Riau", "Sumatera Barat",
  "Jawa Barat", "Jawa Tengah", "Jawa Timur", "DI Yogyakarta",
  "Bali", "Nusa Tenggara Barat", "Sulawesi Selatan", "Kalimantan Timur",
];

const ANALYSIS_TYPES = [
  { label: "Tren Harga Pasar", icon: TrendingUp, color: "#6366F1" },
  { label: "Daftar Koperasi Terdekat", icon: Users, color: "#10B981" },
  { label: "Potensi Ekspor Komoditas", icon: Package, color: "#F97316" },
  { label: "Analisis Musim Tanam", icon: Leaf, color: "#059669" },
];

// ─── Shared Chat Bubbles ──────────────────────────────────────────────────────
function AITypingBubble({ isDark }: { isDark?: boolean }) {
  const dotColor = isDark ? "bg-[#10B981]" : "bg-[#2D6A4F]";
  return (
    <div className="flex items-end gap-2.5">
      <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${isDark ? "from-slate-800 to-slate-700 border border-slate-700" : "from-[#2D6A4F] to-[#40916C]"} flex items-center justify-center shrink-0 shadow-sm`}>
        <Sparkles size={13} className="text-white animate-pulse" />
      </div>
      <div className={`${isDark ? "bg-slate-800 border-slate-700" : "bg-white border-gray-100"} border rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm`}>
        <div className="flex gap-1.5 items-center h-4">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className={`w-1.5 h-1.5 rounded-full ${dotColor}`}
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 0.65, repeat: Infinity, delay: i * 0.13 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function AIBubble({ children, isDark }: { children: React.ReactNode; isDark?: boolean }) {
  return (
    <div className="flex items-start gap-2.5">
      <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${isDark ? "from-slate-800 to-slate-700 border border-slate-700" : "from-[#2D6A4F] to-[#40916C]"} flex items-center justify-center shrink-0 shadow-sm mt-0.5`}>
        <Sparkles size={13} className="text-white" />
      </div>
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}

function UserBubble({ children, isDark }: { children: React.ReactNode; isDark?: boolean }) {
  const bubbleBg = isDark ? "bg-[#10B981] text-slate-950 font-bold" : "bg-[#2D6A4F] text-white";
  return (
    <div className="flex justify-end">
      <div className={`${bubbleBg} rounded-2xl rounded-br-sm px-4 py-2.5 text-sm font-semibold max-w-[70%] shadow-sm`}>
        {children}
      </div>
    </div>
  );
}

// ─── Flow Components ──────────────────────────────────────────────────────────

// --- ALUR PETANI (GENERAL) ---
function DiagnosisStep1({ onChoice }: { onChoice: (v: string) => void }) {
  return (
    <AIBubble>
      <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-sm p-4 shadow-sm">
        <p className="text-sm font-bold text-gray-800 mb-3">Komoditas apa yang sedang Anda tanam?</p>
        <div className="grid grid-cols-4 gap-2">
          {COMMODITIES_TANI.map((c) => {
            const Icon = c.icon;
            return (
              <button
                key={c.label}
                onClick={() => onChoice(c.label)}
                className="flex flex-col items-center gap-1.5 p-2.5 rounded-xl border-2 border-gray-100 hover:border-[#2D6A4F] hover:bg-green-50 transition-all cursor-pointer group"
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${c.color}18` }}>
                  <Icon size={16} style={{ color: c.color }} />
                </div>
                <span className="text-[10px] font-bold text-gray-600 group-hover:text-[#2D6A4F] text-center leading-tight">{c.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </AIBubble>
  );
}

function DiagnosisStep2({ commodity, onChoice }: { commodity: string; onChoice: (v: string) => void }) {
  return (
    <AIBubble>
      <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-sm p-4 shadow-sm">
        <p className="text-sm font-bold text-gray-800 mb-1">
          Pilih gejala paling mirip di lahan <span className="text-[#2D6A4F]">{commodity}</span> Anda.
        </p>
        <p className="text-xs text-gray-400 mb-3">Pilih satu yang paling dominan</p>
        <div className="grid grid-cols-2 gap-2">
          {SYMPTOMS.map((s) => (
            <button
              key={s.label}
              onClick={() => onChoice(s.label)}
              className="flex items-start gap-2.5 p-3 rounded-xl border-2 border-gray-100 hover:border-[#2D6A4F] hover:bg-green-50 transition-all cursor-pointer text-left group"
            >
              <span className="text-xl leading-none">{s.emoji}</span>
              <div>
                <p className="text-xs font-bold text-gray-800 group-hover:text-[#2D6A4F]">{s.label}</p>
                <p className="text-[10px] text-gray-400 mt-0.5">{s.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </AIBubble>
  );
}

function AlatStep1({ onChoice }: { onChoice: (v: string) => void }) {
  return (
    <AIBubble>
      <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-sm p-4 shadow-sm">
        <p className="text-sm font-bold text-gray-800 mb-3">Pilih komoditas utama yang Anda budidayakan:</p>
        <div className="grid grid-cols-4 gap-2">
          {COMMODITIES_TANI.map((c) => {
            const Icon = c.icon;
            return (
              <button
                key={c.label}
                onClick={() => onChoice(c.label)}
                className="flex flex-col items-center gap-1.5 p-2.5 rounded-xl border-2 border-gray-100 hover:border-[#2D6A4F] hover:bg-green-50 transition-all cursor-pointer group"
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${c.color}18` }}>
                  <Icon size={16} style={{ color: c.color }} />
                </div>
                <span className="text-[10px] font-bold text-gray-600 group-hover:text-[#2D6A4F] text-center leading-tight">{c.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </AIBubble>
  );
}

function AlatStep2({ commodity, onChoice }: { commodity: string; onChoice: (v: string) => void }) {
  const options = [
    { label: "Skala Kecil (< 1 Ha)", desc: "Cocok untuk alat manual / portabel", icon: Leaf },
    { label: "Skala Menengah (1 - 5 Ha)", desc: "Cocok untuk alat mekanis sedang", icon: Sparkles },
    { label: "Skala Besar (> 5 Ha)", desc: "Butuh alat berat / otomasi penuh", icon: BarChart2 },
  ];
  return (
    <AIBubble>
      <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-sm p-4 shadow-sm">
        <p className="text-sm font-bold text-gray-800 mb-1">
          Berapa estimasi luas lahan komoditas <span className="text-[#2D6A4F]">{commodity}</span> Anda?
        </p>
        <p className="text-xs text-gray-400 mb-3">Pilih skala kepemilikan lahan</p>
        <div className="space-y-2">
          {options.map((o) => {
            const Icon = o.icon;
            return (
              <button
                key={o.label}
                onClick={() => onChoice(o.label)}
                className="w-full flex items-center gap-3 p-3 rounded-xl border-2 border-gray-100 hover:border-[#2D6A4F] hover:bg-green-50 transition-all cursor-pointer text-left group"
              >
                <div className="w-8 h-8 rounded-lg bg-gray-100 group-hover:bg-[#2D6A4F]/10 flex items-center justify-center shrink-0">
                  <Icon size={14} className="text-gray-500 group-hover:text-[#2D6A4F]" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-800 group-hover:text-[#2D6A4F]">{o.label}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">{o.desc}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </AIBubble>
  );
}

// --- ALUR KOPERASI (B2B) ---
function AnalisisStep1({ onChoice, isDark }: { onChoice: (v: string) => void; isDark?: boolean }) {
  const panelBg = isDark ? "bg-slate-800 border-slate-700 text-white" : "bg-white border-gray-100";
  return (
    <AIBubble isDark={isDark}>
      <div className={`${panelBg} border rounded-2xl rounded-tl-sm p-4 shadow-sm`}>
        <p className="text-sm font-bold mb-3">Di wilayah mana koperasi Anda beroperasi?</p>
        <div className="grid grid-cols-3 gap-1.5 mb-3">
          {PROVINCES.map((p) => (
            <button key={p} onClick={() => onChoice(p)}
              className={`px-2.5 py-2 rounded-xl border-2 text-xs font-bold transition-all cursor-pointer ${
                isDark 
                  ? "border-slate-700 text-slate-300 hover:border-[#10B981] hover:bg-slate-700" 
                  : "border-gray-100 text-gray-600 hover:border-gray-300"
              }`}>
              {p}
            </button>
          ))}
        </div>
      </div>
    </AIBubble>
  );
}

function AnalisisStep2({ region, onChoice, isDark }: { region: string; onChoice: (v: string) => void; isDark?: boolean }) {
  const panelBg = isDark ? "bg-slate-800 border-slate-700 text-white" : "bg-white border-gray-100";
  return (
    <AIBubble isDark={isDark}>
      <div className={`${panelBg} border rounded-2xl rounded-tl-sm p-4 shadow-sm`}>
        <p className="text-sm font-bold mb-3">
          Informasi analitik apa untuk wilayah <span className="text-[#6366F1]">{region}</span>?
        </p>
        <div className="grid grid-cols-2 gap-2">
          {ANALYSIS_TYPES.map((a) => {
            const Icon = a.icon;
            return (
              <button key={a.label} onClick={() => onChoice(a.label)}
                className={`flex items-center gap-2.5 p-3 rounded-xl border-2 transition-all cursor-pointer text-left group ${
                  isDark
                    ? "border-slate-700 hover:border-[#10B981] hover:bg-slate-700 text-slate-300"
                    : "border-gray-100 hover:border-[#6366F1] hover:bg-indigo-50"
                }`}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 animate-in fade-in" style={{ backgroundColor: `${a.color}15` }}>
                  <Icon size={14} style={{ color: a.color }} />
                </div>
                <span className={`text-xs font-bold leading-tight group-hover:text-white`}>{a.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </AIBubble>
  );
}

function StrategiStep1({ onChoice, isDark }: { onChoice: (v: string) => void; isDark?: boolean }) {
  const panelBg = isDark ? "bg-slate-800 border-slate-700 text-white" : "bg-white border-gray-100";
  const options = [
    { label: "< Rp 50 Juta", desc: "Skala lokal / mikro-koperasi", icon: Zap },
    { label: "Rp 50 Juta - Rp 200 Juta", desc: "Skala wilayah / menengah", icon: Sparkles },
    { label: "> Rp 200 Juta", desc: "Skala industri / makro-koperasi", icon: BarChart2 },
  ];
  return (
    <AIBubble isDark={isDark}>
      <div className={`${panelBg} border rounded-2xl rounded-tl-sm p-4 shadow-sm`}>
        <p className="text-sm font-bold mb-3">Berapa alokasi budget ekspansi koperasi Anda?</p>
        <div className="space-y-2">
          {options.map((o) => (
            <button
              key={o.label}
              onClick={() => onChoice(o.label)}
              className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all cursor-pointer text-left group ${
                isDark
                  ? "border-slate-700 hover:border-[#10B981] hover:bg-slate-700 text-slate-300"
                  : "border-gray-100 hover:border-[#6366F1] hover:bg-indigo-50"
              }`}
            >
              <div className="w-8 h-8 rounded-lg bg-slate-700 flex items-center justify-center shrink-0">
                <o.icon size={14} className="text-indigo-400 group-hover:text-white" />
              </div>
              <div>
                <p className="text-xs font-bold group-hover:text-white">{o.label}</p>
                <p className="text-[10px] text-gray-400 mt-0.5">{o.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </AIBubble>
  );
}

function StrategiStep2({ budget, onChoice, isDark }: { budget: string; onChoice: (v: string) => void; isDark?: boolean }) {
  const panelBg = isDark ? "bg-slate-800 border-slate-700 text-white" : "bg-white border-gray-100";
  const focuses = [
    { label: "Penambahan Anggota Koperasi", desc: "Rekrutmen & edukasi petani lokal" },
    { label: "Peralatan Pengolahan Modern", desc: "Mesin sortir, pengering, & kemasan" },
    { label: "Pembukaan Lahan Baru", desc: "Kemitraan sewa lahan & ekspansi area" },
  ];
  return (
    <AIBubble isDark={isDark}>
      <div className={`${panelBg} border rounded-2xl rounded-tl-sm p-4 shadow-sm`}>
        <p className="text-sm font-bold mb-1">
          Pilih fokus ekspansi dengan budget <span className="text-indigo-400">{budget}</span>:
        </p>
        <p className="text-xs text-gray-400 mb-3">Pilih pilar utama strategi koperasi Anda</p>
        <div className="space-y-2">
          {focuses.map((f) => (
            <button
              key={f.label}
              onClick={() => onChoice(f.label)}
              className={`w-full p-3 rounded-xl border-2 transition-all cursor-pointer text-left group ${
                isDark
                  ? "border-slate-700 hover:border-[#10B981] hover:bg-slate-700 text-slate-300"
                  : "border-gray-100 hover:border-[#6366F1] hover:bg-indigo-50"
              }`}
            >
              <p className="text-xs font-bold group-hover:text-white">{f.label}</p>
              <p className="text-[10px] text-gray-400 mt-0.5">{f.desc}</p>
            </button>
          ))}
        </div>
      </div>
    </AIBubble>
  );
}

function StokStep1({ onChoice, isDark }: { onChoice: (v: string) => void; isDark?: boolean }) {
  const panelBg = isDark ? "bg-slate-800 border-slate-700 text-white" : "bg-white border-gray-100";
  return (
    <AIBubble isDark={isDark}>
      <div className={`${panelBg} border rounded-2xl rounded-tl-sm p-4 shadow-sm`}>
        <p className="text-sm font-bold mb-3">Komoditas apa yang ingin diatur produksinya?</p>
        <div className="grid grid-cols-3 gap-2">
          {COMMODITIES_PASAR.map((c) => {
            const Icon = c.icon;
            return (
              <button
                key={c.label}
                onClick={() => onChoice(c.label)}
                className={`flex flex-col items-center gap-1.5 p-2.5 rounded-xl border-2 transition-all cursor-pointer group ${
                  isDark
                    ? "border-slate-700 hover:border-[#10B981] hover:bg-slate-700 text-slate-300"
                    : "border-gray-100 hover:border-[#6366F1] hover:bg-indigo-50"
                }`}
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${c.color}18` }}>
                  <Icon size={15} style={{ color: c.color }} />
                </div>
                <span className="text-[10px] font-bold text-center leading-tight group-hover:text-white">{c.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </AIBubble>
  );
}

function StokStep2({ commodity, onChoice, isDark }: { commodity: string; onChoice: (v: string) => void; isDark?: boolean }) {
  const panelBg = isDark ? "bg-slate-800 border-slate-700 text-white" : "bg-white border-gray-100";
  const options = [
    { label: "Kelebihan Stok (Overstock)", desc: "Hasil panen berlebih dari proyeksi awal" },
    { label: "Stok Stabil", desc: "Pasokan petani seimbang dengan serapan pasar" },
    { label: "Kekurangan Stok (Understock)", desc: "Permintaan pasar tinggi, suplai menipis" },
  ];
  return (
    <AIBubble isDark={isDark}>
      <div className={`${panelBg} border rounded-2xl rounded-tl-sm p-4 shadow-sm`}>
        <p className="text-sm font-bold mb-1">
          Bagaimana status inventori komoditas <span className="text-indigo-400">{commodity}</span> saat ini?
        </p>
        <p className="text-xs text-gray-400 mb-3">Tentukan status pasokan untuk mitigasi logistik</p>
        <div className="space-y-2">
          {options.map((o) => (
            <button
              key={o.label}
              onClick={() => onChoice(o.label)}
              className={`w-full p-3 rounded-xl border-2 transition-all cursor-pointer text-left group ${
                isDark
                  ? "border-slate-700 hover:border-[#10B981] hover:bg-slate-700 text-slate-300"
                  : "border-gray-100 hover:border-[#6366F1] hover:bg-indigo-50"
              }`}
            >
              <p className="text-xs font-bold group-hover:text-white">{o.label}</p>
              <p className="text-[10px] text-gray-400 mt-0.5">{o.desc}</p>
            </button>
          ))}
        </div>
      </div>
    </AIBubble>
  );
}

function KeuanganStep1({ onChoice, isDark }: { onChoice: (v: string) => void; isDark?: boolean }) {
  const panelBg = isDark ? "bg-slate-800 border-slate-700 text-white" : "bg-white border-gray-100";
  const options = [
    { label: "< Rp 100 Juta / Bulan", desc: "Koperasi skala kecil / mikro" },
    { label: "Rp 100 Juta - Rp 500 Juta / Bulan", desc: "Koperasi skala menengah" },
    { label: "> Rp 500 Juta / Bulan", desc: "Koperasi skala besar / B2B Enterprise" },
  ];
  return (
    <AIBubble isDark={isDark}>
      <div className={`${panelBg} border rounded-2xl rounded-tl-sm p-4 shadow-sm`}>
        <p className="text-sm font-bold mb-3">Berapa rata-rata omzet bulanan koperasi Anda?</p>
        <div className="space-y-2">
          {options.map((o) => (
            <button
              key={o.label}
              onClick={() => onChoice(o.label)}
              className={`w-full p-3 rounded-xl border-2 transition-all cursor-pointer text-left group ${
                isDark
                  ? "border-slate-700 hover:border-[#10B981] hover:bg-slate-700 text-slate-300"
                  : "border-gray-100 hover:border-[#6366F1] hover:bg-indigo-50"
              }`}
            >
              <p className="text-xs font-bold group-hover:text-white">{o.label}</p>
              <p className="text-[10px] text-gray-400 mt-0.5">{o.desc}</p>
            </button>
          ))}
        </div>
      </div>
    </AIBubble>
  );
}

function KeuanganStep2({ omzet, onChoice, isDark }: { omzet: string; onChoice: (v: string) => void; isDark?: boolean }) {
  const panelBg = isDark ? "bg-slate-800 border-slate-700 text-white" : "bg-white border-gray-100";
  const expenses = [
    { label: "Gaji & Operasional Koperasi", desc: "Gaji pengurus, administrasi kantor, listrik" },
    { label: "Pembelian Saprotan & Pupuk", desc: "Penyediaan benih dan pupuk untuk petani" },
    { label: "Logistik & Transportasi", desc: "Pengangkutan hasil panen petani ke gudang" },
  ];
  return (
    <AIBubble isDark={isDark}>
      <div className={`${panelBg} border rounded-2xl rounded-tl-sm p-4 shadow-sm`}>
        <p className="text-sm font-bold mb-1">
          Pilih pengeluaran terbesar dari omzet <span className="text-indigo-400">{omzet}</span> koperasi Anda:
        </p>
        <p className="text-xs text-gray-400 mb-3">Tentukan alokasi beban operasional utama</p>
        <div className="space-y-2">
          {expenses.map((e) => (
            <button
              key={e.label}
              onClick={() => onChoice(e.label)}
              className={`w-full p-3 rounded-xl border-2 transition-all cursor-pointer text-left group ${
                isDark
                  ? "border-slate-700 hover:border-[#10B981] hover:bg-slate-700 text-slate-300"
                  : "border-gray-100 hover:border-[#6366F1] hover:bg-indigo-50"
              }`}
            >
              <p className="text-xs font-bold group-hover:text-white">{e.label}</p>
              <p className="text-[10px] text-gray-400 mt-0.5">{e.desc}</p>
            </button>
          ))}
        </div>
      </div>
    </AIBubble>
  );
}

// ─── RIGHT PANEL RESULTS ─────────────────────────────────────────────────────
function DiagnosisResult({ commodity, symptom }: { commodity: string; symptom: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      className="space-y-4 p-5"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4"
      >
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 rounded-lg bg-amber-100 flex items-center justify-center">
            <Bug size={13} className="text-amber-600" />
          </div>
          <span className="text-[10px] font-black text-amber-600 uppercase tracking-wider">Hasil Diagnosis AI</span>
        </div>
        <h3 className="font-display font-black text-gray-900 text-base mb-1">Blast ({commodity})</h3>
        <p className="text-xs text-gray-500 leading-relaxed mb-3">
          Gejala <strong>{symptom}</strong> pada <strong>{commodity}</strong> mengindikasikan infeksi jamur{" "}
          <em>Pyricularia oryzae</em>. Risiko kegagalan panen mencapai 80% jika dibiarkan.
        </p>
        <div className="flex gap-1.5 flex-wrap">
          <span className="bg-red-50 text-red-600 text-[10px] font-bold px-2 py-1 rounded-full border border-red-100">⚠ Risiko Tinggi</span>
          <span className="bg-amber-50 text-amber-600 text-[10px] font-bold px-2 py-1 rounded-full border border-amber-100">Akurasi 92%</span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.22, duration: 0.4 }}
        className="bg-gradient-to-br from-[#1B4332] to-[#2D6A4F] rounded-2xl p-4 shadow-lg relative overflow-hidden"
      >
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/5 rounded-full" />
        <div className="relative z-10">
          <div className="flex items-center gap-1.5 mb-2">
            <ShieldCheck size={13} className="text-emerald-300" />
            <span className="text-[10px] font-black text-emerald-300 uppercase tracking-wider">Bundle Proteksi Rekomendasi</span>
          </div>
          <h4 className="font-display font-black text-white text-sm mb-1">Bundle Blast Control Pro</h4>
          <p className="text-white/60 text-[11px] mb-3 leading-relaxed">
            Fungisida Trifloxystrobin + Pupuk Booster Silika + Panduan Penggunaan Digital
          </p>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/40 text-[10px] line-through">Rp 285.000</p>
              <p className="text-white font-black text-lg">Rp 215.000</p>
              <p className="text-emerald-300 text-[10px] font-bold">Hemat 25% • Tersedia</p>
            </div>
            <button className="bg-white text-[#2D6A4F] px-4 py-2 rounded-full font-black text-xs hover:bg-emerald-50 transition-colors shadow-md flex items-center gap-1.5 cursor-pointer">
              <ShoppingBag size={12} /> Beli
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function AlatResult({ commodity, scale }: { commodity: string; scale: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      className="space-y-4 p-5"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4"
      >
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 rounded-lg bg-green-100 flex items-center justify-center">
            <Leaf size={13} className="text-[#2D6A4F]" />
          </div>
          <span className="text-[10px] font-black text-[#2D6A4F] uppercase tracking-wider">Mekanisasi Lahan</span>
        </div>
        <h3 className="font-display font-black text-gray-900 text-base mb-1">Rekomendasi Alat Tani ({commodity})</h3>
        <p className="text-xs text-gray-500 leading-relaxed">
          Berdasarkan skala lahan **{scale}**, Anda disarankan mengadopsi alat pertanian modern untuk mengoptimalkan efisiensi produksi.
        </p>
      </motion.div>

      {[
        { name: "Alat Semprot Elektrik Pro", type: "Sprayer", desc: "Kapasitas 16 Liter, baterai tahan 6 jam pemakaian kontinu.", price: "Rp 450.000", discount: "Rp 580.000" },
        { name: "Kultivator Tangan Mini", type: "Pengolah Tanah", desc: "Mesin 4 tak efisien bensin, lebar bajak 40cm, sangat cocok untuk sela tanaman.", price: "Rp 3.800.000", discount: "Rp 4.500.000" }
      ].map((item, i) => (
        <motion.div key={i}
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 + i * 0.1, duration: 0.4 }}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 hover:shadow-md transition-all"
        >
          <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">{item.type}</span>
          <h4 className="font-display font-black text-gray-900 text-sm mt-0.5 mb-1">{item.name}</h4>
          <p className="text-[11px] text-gray-400 leading-snug mb-3">{item.desc}</p>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] line-through text-gray-300">{item.discount}</p>
              <p className="font-black text-[#2D6A4F] text-sm">{item.price}</p>
            </div>
            <button className="bg-[#2D6A4F] text-white px-3 py-1.5 rounded-xl font-bold text-xs hover:bg-[#1B4332] transition-colors flex items-center gap-1.5 cursor-pointer">
              <ShoppingBag size={11} /> Beli
            </button>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

function RoleplayResult() {
  return (
    <div className="p-5 flex flex-col h-full justify-center text-center">
      <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center mx-auto mb-4">
        <MessageSquare className="text-amber-600" size={20} />
      </div>
      <h3 className="font-display font-black text-gray-900 text-sm mb-1">Konsultasi Terbuka Aktif</h3>
      <p className="text-xs text-gray-400 leading-relaxed max-w-[220px] mx-auto">
        Ketik pertanyaan Anda secara langsung di input bar bawah. AI Konsultan Lahan siap merespon secara dinamis.
      </p>
    </div>
  );
}

function CariResult({ commodity }: { commodity: string }) {
  const kops = [
    { name: "KUD Tani Maju Sejahtera", location: "Cianjur, Jawa Barat", cap: "5–20 Ton/bln", rating: 4.9, verified: true, badge: "Export Ready", badgeColor: "#6366F1" },
    { name: "Koperasi Nelayan Muara Baru", location: "Jakarta Utara", cap: "2–15 Ton/bln", rating: 4.7, verified: true, badge: "Verified Protected Farm", badgeColor: "#2D6A4F" },
    { name: "Koperasi Bumi Harapan", location: "Malang, Jawa Timur", cap: "1–8 Ton/bln", rating: 4.6, verified: false, badge: "New Seller", badgeColor: "#F59E0B" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      className="space-y-3 p-5"
    >
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl border border-orange-100 px-4 py-3">
        <p className="text-xs font-black text-[#F77F00]">
          3 Koperasi terbaik untuk <span className="font-black">{commodity}</span>
        </p>
        <p className="text-[10px] text-orange-400 mt-0.5">Berdasarkan kapasitas pasokan & rating</p>
      </motion.div>

      {kops.map((k, i) => (
        <motion.div key={i}
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 + i * 0.1, duration: 0.4 }}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 hover:shadow-md transition-all"
        >
          <div className="flex items-start justify-between mb-2.5">
            <div>
              <div className="flex items-center gap-1.5 mb-0.5">
                {k.verified && <ShieldCheck size={12} className="text-[#2D6A4F]" />}
                <h4 className="font-display font-black text-gray-900 text-sm leading-tight">{k.name}</h4>
              </div>
              <div className="flex items-center gap-1 text-gray-400">
                <MapPin size={10} />
                <span className="text-[10px]">{k.location}</span>
              </div>
            </div>
            <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-full">
              <Star size={9} className="text-amber-400 fill-amber-400" />
              <span className="text-[10px] font-bold text-amber-700">{k.rating}</span>
            </div>
          </div>
          <div className="flex gap-1.5 mb-3 flex-wrap">
            <span className="text-[9px] font-bold px-2 py-0.5 rounded-full border"
              style={{ color: k.badgeColor, backgroundColor: `${k.badgeColor}12`, borderColor: `${k.badgeColor}25` }}>
              {k.badge}
            </span>
            <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 border border-gray-200">📦 {k.cap}</span>
          </div>
          <button className="w-full bg-[#F77F00] text-white py-1.5 rounded-xl font-bold text-xs hover:bg-[#E06D00] transition-colors flex items-center justify-center gap-1.5 cursor-pointer">
            <Phone size={11} /> Hubungi Koperasi
          </button>
        </motion.div>
      ))}
    </motion.div>
  );
}

function AnalisisResult({ region, infoType }: { region: string; infoType: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      className="space-y-4 p-5"
    >
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp size={13} className="text-indigo-500" />
          <span className="text-[10px] font-black text-indigo-600 uppercase tracking-wider">
            {infoType} — {region}
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2 mb-3">
          {[
            { label: "Komoditas Unggulan", value: "Kopi Arabika", color: "#92400E" },
            { label: "Harga Rata-rata", value: "Rp 85k/kg", color: "#059669" },
            { label: "Tren 30 Hari", value: "+12.4% ↑", color: "#6366F1" },
          ].map((s) => (
            <div key={s.label} className="rounded-xl p-2.5 text-center" style={{ backgroundColor: `${s.color}0D` }}>
              <p className="text-[9px] text-gray-400 font-medium mb-0.5">{s.label}</p>
              <p className="text-xs font-black" style={{ color: s.color }}>{s.value}</p>
            </div>
          ))}
        </div>
        <div>
          <p className="text-[9px] font-black text-gray-400 uppercase tracking-wide mb-1.5">Volume Perdagangan (6 Bln)</p>
          <div className="flex items-end gap-1 h-12">
            {[40, 65, 55, 80, 72, 90].map((h, i) => (
              <div key={i} className="flex-1 rounded-t-sm" style={{ height: `${h}%`, background: "linear-gradient(to top, #6366F1, #4F46E5)", opacity: 0.55 + i * 0.075 }} />
            ))}
          </div>
          <div className="flex justify-between mt-1">
            {["Jan", "Feb", "Mar", "Apr", "Mei", "Jun"].map((m) => (
              <span key={m} className="text-[8px] text-gray-400 flex-1 text-center">{m}</span>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22 }}
        className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
        <div className="flex items-center gap-2 mb-3">
          <Users size={13} className="text-green-600" />
          <span className="text-[10px] font-black text-green-700 uppercase tracking-wider">Koperasi Terdekat — {region}</span>
        </div>
        {[
          { name: "KUD Makmur Bersama", city: "Pusat Kota", products: "Kopi, Kakao", verified: true },
          { name: "Koperasi Tani Lestari", city: "Kec. Barat", products: "Padi, Sayuran", verified: true },
        ].map((k, i) => (
          <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
            <div className="flex items-center gap-2">
              {k.verified
                ? <ShieldCheck size={13} className="text-[#2D6A4F] shrink-0" />
                : <div className="w-3 h-3 rounded-full border-2 border-gray-300 shrink-0" />}
              <div>
                <p className="text-xs font-bold text-gray-800">{k.name}</p>
                <p className="text-[10px] text-gray-400">{k.city} • {k.products}</p>
              </div>
            </div>
            <button className="text-[11px] font-bold text-[#6366F1] hover:underline cursor-pointer flex items-center gap-0.5">
              Lihat <ArrowRight size={10} />
            </button>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}

function StrategiResult({ budget, focus }: { budget: string; focus: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      className="space-y-4 p-5"
    >
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="bg-slate-900 text-white rounded-2xl shadow-lg p-4 border border-slate-800">
        <div className="flex items-center gap-2 mb-2.5">
          <div className="w-7 h-7 rounded-lg bg-indigo-500/20 flex items-center justify-center">
            <TrendingUp size={13} className="text-indigo-400" />
          </div>
          <span className="text-[10px] font-black text-indigo-400 uppercase tracking-wider">Strategi Ekspansi Koperasi</span>
        </div>
        <h3 className="font-display font-black text-base mb-1">Proposal Ekspansi</h3>
        <p className="text-[11px] text-slate-400 leading-relaxed">
          Dengan alokasi dana **{budget}**, strategi utama adalah **{focus}** untuk pertumbuhan maksimal.
        </p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
        <h4 className="text-xs font-black text-gray-800 uppercase tracking-wide mb-3">Milestone Eksekusi</h4>
        {[
          { day: "30 Hari", title: "Persiapan & Regulasi", desc: "Sosialisasi ke anggota kelompok tani dan pengadaan infrastruktur tahap awal." },
          { day: "60 Hari", title: "Operasionalisasi", desc: "Instalasi peralatan atau integrasi lahan baru ke dalam kelolaan koperasi." },
          { day: "90 Hari", title: "Evaluasi & Skalabilitas", desc: "Penyaluran komoditas segar perdana ke rantai industri Agrou Pasar B2B." }
        ].map((m, i) => (
          <div key={i} className="flex gap-3 mb-4 last:mb-0 items-start">
            <div className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-600 text-[9px] font-black shrink-0 mt-0.5">{m.day}</div>
            <div>
              <p className="text-xs font-bold text-gray-800 leading-tight">{m.title}</p>
              <p className="text-[10px] text-gray-400 mt-0.5 leading-snug">{m.desc}</p>
            </div>
          </div>
        ))}
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
        <h4 className="text-xs font-black text-gray-800 uppercase tracking-wide mb-3">Proyeksi Hasil AI</h4>
        <div className="grid grid-cols-2 gap-2">
          <div className="p-2.5 bg-green-50/50 rounded-xl text-center">
            <p className="text-[9px] text-gray-400 font-medium">Kenaikan Efisiensi</p>
            <p className="text-xs font-black text-green-700">+35%</p>
          </div>
          <div className="p-2.5 bg-indigo-50/50 rounded-xl text-center">
            <p className="text-[9px] text-gray-400 font-medium">Payback Period</p>
            <p className="text-xs font-black text-indigo-700">~ 7 Bulan</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function StokResult({ commodity, status }: { commodity: string; status: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      className="space-y-4 p-5"
    >
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
        <div className="flex items-center gap-2 mb-2.5">
          <div className="w-7 h-7 rounded-lg bg-orange-100 flex items-center justify-center">
            <Package size={13} className="text-orange-600" />
          </div>
          <span className="text-[10px] font-black text-orange-600 uppercase tracking-wider">Optimasi Pasokan</span>
        </div>
        <h3 className="font-display font-black text-gray-900 text-sm mb-1">Manajemen Stok {commodity}</h3>
        <p className="text-[11px] text-gray-500 leading-relaxed">
          Kondisi saat ini: **{status}**. AI menganalisis mitigasi rantai pasokan dan distribusi berikut.
        </p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
        <h4 className="text-xs font-black text-gray-800 uppercase tracking-wide mb-3">Tindakan Mitigasi Stok</h4>
        {status.includes("Overstock") ? (
          <div className="space-y-3">
            <div className="p-3 bg-orange-50/70 border border-orange-100 rounded-xl">
              <p className="text-xs font-bold text-orange-800">Alihkan ke Pembeli Industri B2B</p>
              <p className="text-[10px] text-orange-600 mt-1">Gunakan gateway Agrou Pasar B2B untuk menyalurkan komoditas berlebih secara langsung ke pabrik pengolahan dengan harga partai besar.</p>
            </div>
            <div className="p-3 bg-blue-50/70 border border-blue-100 rounded-xl">
              <p className="text-xs font-bold text-blue-800">Gunakan Cold Storage Koperasi</p>
              <p className="text-[10px] text-blue-600 mt-1">Simpan komoditas segar dalam cold storage selama 3-5 hari untuk menyeimbangkan penawaran pasar.</p>
            </div>
          </div>
        ) : status.includes("Understock") ? (
          <div className="space-y-3">
            <div className="p-3 bg-red-50/70 border border-red-100 rounded-xl">
              <p className="text-xs font-bold text-red-800">Kemitraan Petani Kilat</p>
              <p className="text-[10px] text-red-600 mt-1">Buka skema pinjaman bibit dan pupuk bersubsidi melalui koperasi untuk merangsang perluasan tanam tani.</p>
            </div>
            <div className="p-3 bg-indigo-50/70 border border-indigo-100 rounded-xl">
              <p className="text-xs font-bold text-indigo-800">Hubungkan Jaringan Antar Koperasi</p>
              <p className="text-[10px] text-indigo-600 mt-1">Beli surplus pasokan dari Koperasi terdekat di provinsi yang sama demi memenuhi kuota B2B Anda.</p>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="p-3 bg-green-50/70 border border-green-100 rounded-xl">
              <p className="text-xs font-bold text-green-800">Pertahankan Harga Kontrak</p>
              <p className="text-[10px] text-green-600 mt-1">Kondisi ideal. Kunci kontrak harga dengan pembeli grosir untuk jangka waktu 3 bulan ke depan.</p>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

function KeuanganResult({ omzet, expenseType }: { omzet: string; expenseType: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      className="space-y-4 p-5"
    >
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="bg-slate-900 text-white rounded-2xl shadow-lg p-4 border border-slate-800">
        <div className="flex items-center gap-2 mb-2.5">
          <div className="w-7 h-7 rounded-lg bg-emerald-500/20 flex items-center justify-center">
            <BarChart2 size={13} className="text-emerald-400" />
          </div>
          <span className="text-[10px] font-black text-emerald-400 uppercase tracking-wider">Laporan Finansial Koperasi</span>
        </div>
        <h3 className="font-display font-black text-base mb-1">Financial Scorecard</h3>
        <p className="text-[11px] text-slate-400 leading-relaxed">
          Analisis alokasi kas bulanan pada koperasi Anda dengan omzet **{omzet}**.
        </p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
        <h4 className="text-xs font-black text-gray-800 uppercase tracking-wide mb-3">Rekomendasi Efisiensi</h4>
        <div className="space-y-3">
          <div className="flex items-start gap-2.5">
            <div className="w-1.5 h-1.5 rounded-full bg-[#10B981] shrink-0 mt-1.5" />
            <div>
              <p className="text-xs font-bold text-gray-800">Mitigasi Pengeluaran Pos {expenseType}</p>
              <p className="text-[10px] text-gray-400 mt-0.5 leading-relaxed">Beban {expenseType} terdeteksi cukup tinggi. Disarankan melakukan audit berkala untuk rasio pengeluaran ideal di bawah 30% dari omzet.</p>
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <div className="w-1.5 h-1.5 rounded-full bg-[#10B981] shrink-0 mt-1.5" />
            <div>
              <p className="text-xs font-bold text-gray-800">Skema Pendanaan Saprotan</p>
              <p className="text-[10px] text-gray-400 mt-0.5 leading-relaxed">Gunakan fitur konsolidasi pembelian saprotan bersubsidi bersama mitra Koperasi KUD lainnya di Agrou untuk memangkas margin modal.</p>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
        <h4 className="text-xs font-black text-gray-800 uppercase tracking-wide mb-3">Struktur Pengeluaran (Estimasi)</h4>
        <div className="space-y-2">
          {[
            { label: expenseType, percent: 45, color: "#EF4444" },
            { label: "Bahan Baku & Produksi", percent: 35, color: "#10B981" },
            { label: "Lain-lain & Cadangan Kas", percent: 20, color: "#6366F1" },
          ].map((bar, idx) => (
            <div key={idx}>
              <div className="flex justify-between text-[10px] font-bold text-gray-600 mb-1">
                <span>{bar.label}</span>
                <span>{bar.percent}%</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${bar.percent}%`, backgroundColor: bar.color }} />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── RIGHT PANEL PLACEHOLDER ──────────────────────────────────────────────────
function RightPanelPlaceholder({ isDark }: { isDark?: boolean }) {
  const textMuted = isDark ? "text-slate-500" : "text-gray-300";
  const bgCard = isDark ? "bg-slate-800/50 border-slate-700/50" : "bg-gray-50 border-gray-200";
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${isDark ? "from-slate-800 to-slate-900 border-slate-700" : "from-gray-100 to-gray-50 border-gray-200"} border-2 border-dashed flex items-center justify-center mx-auto mb-4`}>
          <Inbox size={24} className={isDark ? "text-slate-700" : "text-gray-300"} />
        </div>
        <h3 className={`font-display font-black ${isDark ? "text-slate-500" : "text-gray-300"} text-sm mb-1`}>Kanvas Analisis</h3>
        <p className={`text-xs ${textMuted} leading-relaxed max-w-[200px] mx-auto`}>
          Rekomendasi strategis &amp; visualisasi akan muncul di sini setelah sesi AI selesai.
        </p>
      </motion.div>
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function LadangAIPage() {
  const [userRole, setUserRole] = useState<Role>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  
  // Chat States
  const [path, setPath] = useState<Path>(null);
  const [stage, setStage] = useState<Stage>(0);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [selectedCommodity, setSelectedCommodity] = useState("");
  const [selectedSymptom, setSelectedSymptom] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedInfoType, setSelectedInfoType] = useState("");
  
  // Custom Flow Inputs
  const [roleplayText, setRoleplayText] = useState("");

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const pushUserMsg = (text: string) => {
    setMessages((m) => [...m, { id: Date.now().toString(), role: "user", content: text, timestamp: new Date() }]);
  };

  const pushAIMsg = (node: React.ReactNode) => {
    setMessages((m) => [...m, { id: (Date.now() + 1).toString(), role: "ai", content: node, timestamp: new Date() }]);
  };

  const simulateTyping = (cb: () => void, delay = 900) => {
    setIsTyping(true);
    setTimeout(() => { setIsTyping(false); cb(); }, delay);
  };

  const handleReset = () => {
    setPath(null);
    setStage(0);
    setMessages([]);
    setIsTyping(false);
    setSelectedCommodity("");
    setSelectedSymptom("");
    setSelectedRegion("");
    setSelectedInfoType("");
    setRoleplayText("");
  };

  const handleExitRole = () => {
    handleReset();
    setUserRole(null);
  };

  const handlePathSelect = (p: Path) => {
    setPath(p);
    setStage(1);
    const isDark = userRole === "koperasi";
    simulateTyping(() => {
      if (p === "diagnosis") {
        pushAIMsg(<DiagnosisStep1 onChoice={handleStep1} />);
      } else if (p === "alat") {
        pushAIMsg(<AlatStep1 onChoice={handleStep1} />);
      } else if (p === "roleplay") {
        pushAIMsg(
          <AIBubble>
            <div className={`border rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm ${isDark ? "bg-slate-800 border-slate-700 text-white" : "bg-white border-gray-100 text-gray-800"}`}>
              <p className="text-sm">
                Halo! Saya adalah <strong>AI Konsultan Lahan Anda</strong>. Tanyakan apa saja tentang pengolahan tanah, pemupukan, hama, atau optimalisasi hasil panen.
              </p>
            </div>
          </AIBubble>
        );
      } else if (p === "analisis") {
        pushAIMsg(<AnalisisStep1 onChoice={handleStep1} isDark={isDark} />);
      } else if (p === "strategi") {
        pushAIMsg(<StrategiStep1 onChoice={handleStep1} isDark={isDark} />);
      } else if (p === "stok") {
        pushAIMsg(<StokStep1 onChoice={handleStep1} isDark={isDark} />);
      } else if (p === "keuangan") {
        pushAIMsg(<KeuanganStep1 onChoice={handleStep1} isDark={isDark} />);
      }
    });
  };

  const handleStep1 = (val: string) => {
    const isDark = userRole === "koperasi";
    if (path === "diagnosis" || path === "alat") setSelectedCommodity(val);
    if (path === "analisis") setSelectedRegion(val);
    if (path === "strategi") setSelectedRegion(val); // budget
    if (path === "stok") setSelectedCommodity(val); // commodity
    if (path === "keuangan") setSelectedRegion(val); // omzet

    pushUserMsg(val);
    setStage(2);
    simulateTyping(() => {
      if (path === "diagnosis") pushAIMsg(<DiagnosisStep2 commodity={val} onChoice={handleStep2} />);
      else if (path === "alat") pushAIMsg(<AlatStep2 commodity={val} onChoice={handleStep2} />);
      else if (path === "analisis") pushAIMsg(<AnalisisStep2 region={val} onChoice={handleStep2} isDark={isDark} />);
      else if (path === "strategi") pushAIMsg(<StrategiStep2 budget={val} onChoice={handleStep2} isDark={isDark} />);
      else if (path === "stok") pushAIMsg(<StokStep2 commodity={val} onChoice={handleStep2} isDark={isDark} />);
      else if (path === "keuangan") pushAIMsg(<KeuanganStep2 omzet={val} onChoice={handleStep2} isDark={isDark} />);
    });
  };

  const handleStep2 = (val: string) => {
    const isDark = userRole === "koperasi";
    if (path === "diagnosis") setSelectedSymptom(val);
    if (path === "alat") setSelectedSymptom(val); // scale
    if (path === "analisis") setSelectedInfoType(val);
    if (path === "strategi") setSelectedInfoType(val); // focus
    if (path === "stok") setSelectedSymptom(val); // status
    if (path === "keuangan") setSelectedInfoType(val); // expense

    pushUserMsg(val);
    setStage(3);
    simulateTyping(() => {
      let finalMsg = "";
      if (path === "diagnosis") {
        finalMsg = "Analisis selesai. Kami mendeteksi indikasi penyakit Blast pada tanaman Anda. Solusi penanganan dan rekomendasi produk kimia/booster sudah siap di panel kanan. ✅";
      } else if (path === "alat") {
        finalMsg = "Rekomendasi mekanisasi selesai. Kami merekomendasikan alat tani yang efisien untuk menunjang produktivitas lahan Anda di panel kanan. ✅";
      } else if (path === "analisis") {
        finalMsg = "Analisis wilayah selesai. Statistik komoditas unggulan dan daftar koperasi aktif dapat dipelajari di panel kanan. ✅";
      } else if (path === "strategi") {
        finalMsg = "Pemetaan rencana bisnis selesai. AI telah merancang milestone 30-90 hari dan estimasi efisiensi di panel kanan. ✅";
      } else if (path === "stok") {
        finalMsg = "Analisis stok selesai. Rekomendasi mitigasi logistik & penyeimbangan pasokan inventori koperasi tersedia di panel kanan. ✅";
      } else if (path === "keuangan") {
        finalMsg = "Audit keuangan mandiri selesai. Penilaian rasio pengeluaran beserta tindakan pemangkasan biaya operasional ada di panel kanan. ✅";
      }

      pushAIMsg(
        <AIBubble isDark={isDark}>
          <div className={`border rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm ${isDark ? "bg-slate-800 border-slate-700 text-white" : "bg-white border-gray-100 text-gray-800"}`}>
            <p className="text-sm">{finalMsg}</p>
          </div>
        </AIBubble>
      );
    }, 1200);
  };

  const handleSendRoleplay = () => {
    if (!roleplayText.trim()) return;
    const txt = roleplayText;
    setRoleplayText("");
    pushUserMsg(txt);
    simulateTyping(() => {
      let reply = "Terima kasih atas pertanyaannya. Sebagai AI konsultan lahan, saya sangat menyarankan Anda memeriksa tingkat keasaman tanah (pH) serta memastikan drainase air optimal di lahan tanaman Anda.";
      const lower = txt.toLowerCase();
      if (lower.includes("hama") || lower.includes("penyakit") || lower.includes("ulat")) {
        reply = "Untuk serangan hama pengganggu, Anda dapat mencoba pestisida organik ekstrak daun mimba atau menyemprotkan fungisida bersertifikasi. Gunakan menu 'Diagnosis Lahan' di sidebar untuk hasil diagnosis spesifik.";
      } else if (lower.includes("pupuk") || lower.includes("subur") || lower.includes("nutrisi")) {
        reply = "Pemupukan berimbang adalah kunci utama. Campurkan NPK dengan pupuk kandang matang berbanding 1:2 untuk mendukung pertumbuhan batang utama komoditas Anda.";
      } else if (lower.includes("air") || lower.includes("irigasi") || lower.includes("kering")) {
        reply = "Metode irigasi tetes (drip irrigation) sangat hemat air untuk lahan kering dan menyalurkan air presisi ke zona perakaran tanaman.";
      }
      pushAIMsg(
        <AIBubble>
          <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm text-gray-800">
            <p className="text-sm">{reply}</p>
          </div>
        </AIBubble>
      );
    }, 1000);
  };

  const pathConfig = path
    ? {
        diagnosis: { label: "Diagnosis Lahan", color: "#2D6A4F" },
        alat: { label: "Rekomendasi Alat Tani", color: "#10B981" },
        roleplay: { label: "Konsultan Lahan AI", color: "#D97706" },
        analisis: { label: "Analisis Pasar", color: "#6366F1" },
        strategi: { label: "Strategi Koperasi", color: "#4F46E5" },
        stok: { label: "Manajemen Stok", color: "#EC4899" },
        keuangan: { label: "Pencatatan Keuangan", color: "#06B6D4" },
      }[path]
    : null;

  const isDarkTheme = userRole === "koperasi";

  // Login Handler untuk Koperasi
  const handleKoperasiLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim() && passwordInput.trim()) {
      setIsAuthModalOpen(false);
      setUserRole("koperasi");
      setEmailInput("");
      setPasswordInput("");
    }
  };

  return (
    <div className={`relative flex h-[calc(100vh-52px)] overflow-hidden font-sans transition-colors duration-300 ${isDarkTheme ? "bg-slate-950 text-slate-100" : "bg-gray-50 text-gray-800"}`}>
      
      {/* ── PHASE 1: ROLE SELECTION GATEWAY ── */}
      <AnimatePresence mode="wait">
        {userRole === null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-white z-[99] flex items-center justify-center p-6"
          >
            <div className="w-full max-w-2xl text-center">
              <motion.div
                initial={{ scale: 0.95, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="space-y-6"
              >
                <div className="flex justify-center">
                  <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-[#2D6A4F] to-[#40916C] flex items-center justify-center shadow-lg shadow-green-950/20">
                    <Sparkles size={30} className="text-white" />
                  </div>
                </div>
                
                <div>
                  <h1 className="font-display font-black text-3xl text-gray-900 leading-tight">
                    Masuk ke <span className="text-[#2D6A4F]">LadangAI Hub</span>
                  </h1>
                  <p className="text-gray-500 text-sm mt-2 max-w-md mx-auto">
                    Pilih gerbang asisten AI sesuai dengan peran operasional Anda untuk kustomisasi modul yang optimal.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl mx-auto mt-8">
                  {/* General Card */}
                  <button
                    onClick={() => setUserRole("general")}
                    className="flex flex-col items-center justify-center p-6 bg-white border-2 border-gray-100 rounded-2xl text-center hover:border-[#2D6A4F] hover:bg-green-50/20 transition-all cursor-pointer shadow-sm group hover:-translate-y-0.5"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center text-[#2D6A4F] mb-4 group-hover:scale-105 transition-transform">
                      <User size={22} className="stroke-[2.5]" />
                    </div>
                    <h3 className="font-display font-black text-gray-800 text-base mb-1">Petani / Pembeli</h3>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      Akses cepat untuk diagnosis perlindungan lahan, rekomendasi alat, &amp; konsultasi budidaya mandiri.
                    </p>
                    <span className="text-xs font-bold text-[#2D6A4F] mt-4 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      Masuk Gratis <ChevronRight size={14} />
                    </span>
                  </button>

                  {/* Koperasi Card */}
                  <button
                    onClick={() => setIsAuthModalOpen(true)}
                    className="flex flex-col items-center justify-center p-6 bg-white border-2 border-gray-100 rounded-2xl text-center hover:border-indigo-600 hover:bg-indigo-50/20 transition-all cursor-pointer shadow-sm group hover:-translate-y-0.5"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 mb-4 group-hover:scale-105 transition-transform">
                      <Users size={22} className="stroke-[2.5]" />
                    </div>
                    <h3 className="font-display font-black text-gray-800 text-base mb-1">Pengurus Koperasi</h3>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      Akses khusus modul analitik B2B, strategi bisnis, manajemen suplai petani, &amp; laporan keuangan.
                    </p>
                    <span className="text-xs font-bold text-indigo-600 mt-4 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      Akses Korporat <ChevronRight size={14} />
                    </span>
                  </button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── AUTH LOGIN MODAL FOR KOPERASI ── */}
      <AnimatePresence>
        {isAuthModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAuthModalOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] flex items-center justify-center"
            >
              <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-3xl w-full max-w-[420px] p-8 shadow-2xl overflow-hidden relative"
              >
                <button
                  onClick={() => setIsAuthModalOpen(false)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 transition-colors p-1"
                >
                  <X size={20} />
                </button>

                <div className="text-center mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-3">
                    <Lock size={22} />
                  </div>
                  <h3 className="font-display font-black text-gray-900 text-lg">Otentikasi Koperasi</h3>
                  <p className="text-gray-400 text-xs mt-1">Masukkan kredensial pengurus koperasi Anda.</p>
                </div>

                <form onSubmit={handleKoperasiLoginSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wider">Email Koperasi</label>
                    <input
                      type="email"
                      required
                      placeholder="kud.makmur@agrou.id"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      className="w-full h-11 px-4 rounded-xl border border-gray-200 focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition-all text-sm font-medium text-gray-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wider">Kata Sandi Koperasi</label>
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      className="w-full h-11 px-4 rounded-xl border border-gray-200 focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition-all text-sm font-medium text-gray-900"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full h-11 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-sm transition-all shadow-md shadow-indigo-600/10 flex items-center justify-center gap-2 cursor-pointer mt-6"
                  >
                    Masuk Dasbor Koperasi
                  </button>
                </form>

                <p className="text-center text-[10px] text-gray-300 mt-4 leading-normal">
                  Hanya pengurus KUD terdaftar yang dapat memproses modul manajemen finansial &amp; inventori internal.
                </p>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── PHASE 2: DYNAMIC 3-COLUMN DASHBOARD ── */}
      
      {/* ── COLUMN 1: LEFT SIDEBAR ── */}
      {/* Mobile overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            className="fixed inset-0 bg-black/40 z-[90] lg:hidden"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      <motion.aside
        className={`
          w-[270px] shrink-0 flex flex-col fixed lg:relative top-0 left-0 h-full z-[98] lg:z-auto
          transition-transform duration-300 ease-in-out border-r
          ${isDarkTheme ? "bg-slate-900 border-slate-800 text-slate-100" : "bg-white border-gray-200 text-gray-800"}
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Sidebar Header */}
        <div className={`p-4 border-b ${isDarkTheme ? "border-slate-800" : "border-gray-100"}`}>
          <div className="flex items-center gap-2 mb-3">
            <div className={`w-7 h-7 rounded-lg flex items-center justify-center shadow-sm ${isDarkTheme ? "bg-indigo-600" : "bg-gradient-to-br from-[#2D6A4F] to-[#40916C]"}`}>
              <Sparkles size={13} className="text-white" />
            </div>
            <span className={`font-display font-black text-sm ${isDarkTheme ? "text-indigo-400" : "text-[#2D6A4F]"}`}>
              {isDarkTheme ? "Manajemen KUD" : "Asisten Tani"}
            </span>
            <span className={`text-[8px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-wide ${isDarkTheme ? "bg-indigo-900/50 text-indigo-300" : "bg-emerald-100 text-emerald-700"}`}>
              {isDarkTheme ? "Enterprise" : "Beta"}
            </span>
            <button className="ml-auto lg:hidden text-gray-400" onClick={() => setSidebarOpen(false)}>
              <X size={16} />
            </button>
          </div>
          
          <button
            onClick={handleReset}
            className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-sm transition-colors cursor-pointer shadow-sm ${
              isDarkTheme
                ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                : "bg-[#2D6A4F] hover:bg-[#1B4332] text-white"
            }`}
          >
            <Plus size={15} />
            Konsultasi Baru
          </button>
        </div>

        {/* Dynamic Sidebar Sections based on Role */}
        <div className="flex-1 overflow-y-auto py-3 scrollbar-hide space-y-4 px-2">
          {/* Scenario A: Petani / Pembeli Sidebar Menu */}
          {!isDarkTheme ? (
            <>
              <div>
                <p className="px-3 py-1.5 text-[10px] font-black text-gray-400 uppercase tracking-wider">Template Konsultasi</p>
                <div className="space-y-1">
                  <button
                    onClick={() => handlePathSelect("diagnosis")}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left text-xs font-bold transition-all cursor-pointer ${
                      path === "diagnosis" ? "bg-green-50 text-[#2D6A4F]" : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <Bug size={14} className={path === "diagnosis" ? "text-[#2D6A4F]" : "text-gray-400"} />
                    <span>Diagnosis Hama &amp; Lahan</span>
                  </button>

                  <button
                    onClick={() => handlePathSelect("alat")}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left text-xs font-bold transition-all cursor-pointer ${
                      path === "alat" ? "bg-green-50 text-[#2D6A4F]" : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <Settings size={14} className={path === "alat" ? "text-[#2D6A4F]" : "text-gray-400"} />
                    <span>Rekomendasi Alat Tani</span>
                  </button>

                  <button
                    onClick={() => handlePathSelect("roleplay")}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left text-xs font-bold transition-all cursor-pointer ${
                      path === "roleplay" ? "bg-green-50 text-[#2D6A4F]" : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <MessageSquare size={14} className={path === "roleplay" ? "text-[#2D6A4F]" : "text-gray-400"} />
                    <span>Konsultan Lahan (Open AI)</span>
                  </button>
                </div>
              </div>

              <div>
                <p className="px-3 py-1.5 text-[10px] font-black text-gray-400 uppercase tracking-wider">Riwayat Chat</p>
                <div className="space-y-0.5">
                  {GENERAL_HISTORY.map((h, i) => (
                    <button
                      key={i}
                      onClick={() => handlePathSelect(h.path as Path)}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left text-xs text-gray-600 hover:bg-gray-50 transition-colors"
                    >
                      <Clock size={12} className="text-gray-300" />
                      <span className="truncate flex-1">{h.label}</span>
                      <span className="text-[9px] text-gray-400 shrink-0">{h.time}</span>
                    </button>
                  ))}
                </div>
              </div>
            </>
          ) : (
            /* Scenario B: Pengurus Koperasi Sidebar Menu (Premium Dark Theme) */
            <>
              <div>
                <p className="px-3 py-1.5 text-[10px] font-black text-slate-500 uppercase tracking-wider">Fitur Analitikal</p>
                <div className="space-y-1">
                  <button
                    onClick={() => handlePathSelect("analisis")}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left text-xs font-bold transition-all cursor-pointer ${
                      path === "analisis" ? "bg-indigo-950 text-indigo-400 border-l-2 border-indigo-500" : "text-slate-400 hover:bg-slate-800"
                    }`}
                  >
                    <TrendingUp size={14} className={path === "analisis" ? "text-indigo-400" : "text-slate-500"} />
                    <span>Analitik &amp; Tren Pasar</span>
                  </button>

                  <button
                    onClick={() => handlePathSelect("strategi")}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left text-xs font-bold transition-all cursor-pointer ${
                      path === "strategi" ? "bg-indigo-950 text-indigo-400 border-l-2 border-indigo-500" : "text-slate-400 hover:bg-slate-800"
                    }`}
                  >
                    <Zap size={14} className={path === "strategi" ? "text-indigo-400" : "text-slate-500"} />
                    <span>Strategi Bisnis &amp; Ekspansi</span>
                  </button>

                  <button
                    onClick={() => handlePathSelect("stok")}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left text-xs font-bold transition-all cursor-pointer ${
                      path === "stok" ? "bg-indigo-950 text-indigo-400 border-l-2 border-indigo-500" : "text-slate-400 hover:bg-slate-800"
                    }`}
                  >
                    <Package size={14} className={path === "stok" ? "text-indigo-400" : "text-slate-500"} />
                    <span>Manajemen Produksi &amp; Stok</span>
                  </button>

                  <button
                    onClick={() => handlePathSelect("keuangan")}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left text-xs font-bold transition-all cursor-pointer ${
                      path === "keuangan" ? "bg-indigo-950 text-indigo-400 border-l-2 border-indigo-500" : "text-slate-400 hover:bg-slate-800"
                    }`}
                  >
                    <BarChart2 size={14} className={path === "keuangan" ? "text-indigo-400" : "text-slate-500"} />
                    <span>Pencatatan Keuangan</span>
                  </button>
                </div>
              </div>

              <div>
                <p className="px-3 py-1.5 text-[10px] font-black text-slate-500 uppercase tracking-wider">Riwayat Analisis</p>
                <div className="space-y-0.5">
                  {KOPERASI_HISTORY.map((h, i) => (
                    <button
                      key={i}
                      onClick={() => handlePathSelect(h.path as Path)}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left text-xs text-slate-400 hover:bg-slate-800 transition-colors"
                    >
                      <Clock size={12} className="text-slate-600" />
                      <span className="truncate flex-1">{h.label}</span>
                      <span className="text-[9px] text-slate-500 shrink-0">{h.time}</span>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Sidebar Footer with Role Reset Button */}
        <div className={`p-3 border-t ${isDarkTheme ? "border-slate-800" : "border-gray-100"} space-y-1`}>
          <button
            onClick={handleExitRole}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl transition-all cursor-pointer text-left hover:scale-[1.01] ${
              isDarkTheme 
                ? "hover:bg-slate-800 text-slate-400 hover:text-white" 
                : "hover:bg-gray-50 text-gray-500 hover:text-gray-800"
            }`}
          >
            <LogOut size={14} />
            <span className="text-xs font-bold">Ganti Peran / Keluar</span>
          </button>
        </div>
      </motion.aside>

      {/* ── COLUMN 2: CENTER COLUMN (AI INTERACTION) ── */}
      <div className={`flex-1 min-w-0 flex flex-col border-r transition-colors duration-300 ${
        isDarkTheme 
          ? "bg-slate-900 border-slate-800 text-slate-100" 
          : "bg-white border-gray-200 text-gray-800"
      }`}>
        
        {/* Top Header Bar */}
        <div className={`px-5 h-12 flex items-center gap-3 border-b shrink-0 ${
          isDarkTheme ? "bg-slate-900 border-slate-800" : "bg-white border-gray-100"
        }`}>
          <button
            className="lg:hidden text-gray-500 hover:text-gray-800 cursor-pointer"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={18} />
          </button>
          
          <div className="flex items-center gap-2">
            {path && pathConfig ? (
              <>
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: pathConfig.color }} />
                <span className="text-xs font-bold" style={{ color: pathConfig.color }}>{pathConfig.label}</span>
                {path !== "roleplay" && (
                  <>
                    <span className="text-gray-300 font-medium">•</span>
                    <div className="flex gap-1">
                      {[1, 2, 3].map((s) => (
                        <div key={s} className={`w-4 h-1 rounded-full transition-all ${stage >= s ? "opacity-100" : "opacity-20"}`}
                          style={{ backgroundColor: stage >= s ? pathConfig.color : "#D1D5DB" }} />
                      ))}
                    </div>
                  </>
                )}
              </>
            ) : (
              <>
                <Zap size={13} className={isDarkTheme ? "text-indigo-400" : "text-[#2D6A4F]"} />
                <span className="text-xs font-bold text-gray-400">Pilih alur/modul di sidebar untuk memulai</span>
              </>
            )}
          </div>
          
          {path && (
            <button
              onClick={handleReset}
              className={`ml-auto flex items-center gap-1.5 text-gray-400 hover:text-gray-700 text-xs font-bold transition-colors cursor-pointer px-2 py-1 rounded-lg hover:bg-gray-50`}
            >
              <RotateCcw size={12} />
              <span className="hidden sm:inline">Ulang</span>
            </button>
          )}
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          <AnimatePresence mode="wait">
            {stage === 0 ? (
              /* Scenario B: Initial Role Landing Grid of Cards */
              <motion.div
                key="triage"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16, scale: 0.98 }}
                transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
                className="flex flex-col items-center justify-center min-h-full p-6 text-center"
              >
                <div className="mb-8">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg ${
                    isDarkTheme 
                      ? "bg-indigo-600 shadow-indigo-950/20" 
                      : "bg-[#2D6A4F] shadow-green-950/20"
                  }`}>
                    <Sparkles size={22} className="text-white" />
                  </div>
                  <h2 className="font-display font-black text-xl mb-1.5">
                    Halo! Apa yang ingin <span className={isDarkTheme ? "text-indigo-400" : "text-[#2D6A4F]"}>LadangAI</span> bantu hari ini?
                  </h2>
                  <p className="text-gray-400 text-xs max-w-sm mx-auto">
                    {isDarkTheme 
                      ? "Gunakan asisten analitik pintar Koperasi untuk mengawasi strategi operasional koperasi Anda." 
                      : "Pilih salah satu template konsultasi untuk diagnosis lahan, alat, atau obrolan terarah."}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-3 w-full max-w-md">
                  {!isDarkTheme ? (
                    /* Petani Cards */
                    <>
                      {[
                        { path: "diagnosis" as Path, icon: Bug, title: "Diagnosis Hama & Lahan", desc: "Temukan penyakit dan bundel pestisida yang sesuai.", color: "from-[#2D6A4F] to-[#1B4332]" },
                        { path: "alat" as Path, icon: Settings, title: "Rekomendasi Alat Tani", desc: "Peralatan mekanisasi lahan berdasarkan ukuran lahan.", color: "from-[#10B981] to-[#0D9488]" },
                        { path: "roleplay" as Path, icon: MessageSquare, title: "Konsultan Lahan AI", desc: "Obrolan bebas terarah mengenai budidaya pertanian.", color: "from-[#D97706] to-[#B45309]" },
                      ].map((card, i) => (
                        <button
                          key={i}
                          onClick={() => handlePathSelect(card.path)}
                          className={`relative overflow-hidden rounded-2xl p-4 text-left cursor-pointer shadow-md bg-gradient-to-r ${card.color} text-white group hover:scale-[1.01] transition-transform`}
                        >
                          <div className="relative z-10 flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                              <card.icon size={18} />
                            </div>
                            <div>
                              <h4 className="font-display font-black text-sm leading-tight">{card.title}</h4>
                              <p className="text-white/60 text-[10px] mt-0.5 leading-snug">{card.desc}</p>
                            </div>
                          </div>
                        </button>
                      ))}
                    </>
                  ) : (
                    /* Koperasi Cards */
                    <>
                      {[
                        { path: "analisis" as Path, icon: TrendingUp, title: "Analitik & Tren Pasar", desc: "Prediksi tren harga pasar & list koperasi terdekat.", color: "from-[#6366F1] to-[#4F46E5]" },
                        { path: "strategi" as Path, icon: Zap, title: "Strategi Bisnis & Ekspansi", desc: "Proposal bisnis koperasi berdasarkan anggaran Anda.", color: "from-[#4F46E5] to-[#3730A3]" },
                        { path: "stok" as Path, icon: Package, title: "Manajemen Produksi & Stok", desc: "Menyeimbangkan inventori komoditas fresh pertanian.", color: "from-[#EC4899] to-[#BE185D]" },
                        { path: "keuangan" as Path, icon: BarChart2, title: "Pencatatan Keuangan", desc: "Formulir input audit mandiri rasio pengeluaran KUD.", color: "from-[#06B6D4] to-[#0891B2]" },
                      ].map((card, i) => (
                        <button
                          key={i}
                          onClick={() => handlePathSelect(card.path)}
                          className={`relative overflow-hidden rounded-2xl p-4 text-left cursor-pointer shadow-md bg-gradient-to-r ${card.color} text-white group hover:scale-[1.01] transition-transform`}
                        >
                          <div className="relative z-10 flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                              <card.icon size={18} />
                            </div>
                            <div>
                              <h4 className="font-display font-black text-sm leading-tight">{card.title}</h4>
                              <p className="text-white/60 text-[10px] mt-0.5 leading-snug">{card.desc}</p>
                            </div>
                          </div>
                        </button>
                      ))}
                    </>
                  )}
                </div>
              </motion.div>
            ) : (
              /* Chat Flow */
              <motion.div
                key="chat"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="p-5 space-y-4"
              >
                {/* AI Intro Bubble */}
                <AIBubble isDark={isDarkTheme}>
                  <div className={`border rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm ${
                    isDarkTheme ? "bg-slate-800 border-slate-700 text-white" : "bg-white border-gray-100 text-gray-800"
                  }`}>
                    <p className="text-sm">
                      Mulai memproses alur modul:{" "}
                      <strong className={isDarkTheme ? "text-indigo-400" : "text-[#2D6A4F]"}>
                        {pathConfig?.label}
                      </strong>. Silakan selesaikan form interaktif di bawah.
                    </p>
                    
                    {path !== "roleplay" && (
                      <div className="flex gap-1 mt-2.5">
                        {[1, 2, 3].map((s) => (
                          <div key={s} className="flex items-center gap-1">
                            <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-black ${
                              stage >= s 
                                ? (isDarkTheme ? "bg-indigo-500 text-slate-900" : "bg-[#2D6A4F] text-white") 
                                : "bg-gray-100 text-gray-400"
                            }`}>
                              {stage > s ? <CheckCircle2 size={9} /> : s}
                            </div>
                            {s < 3 && <div className={`w-5 h-0.5 ${stage > s ? (isDarkTheme ? "bg-indigo-500" : "bg-[#2D6A4F]") : "bg-gray-200"}`} />}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </AIBubble>

                {/* Message Stack */}
                {messages.map((msg) => (
                  <motion.div key={msg.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
                    {msg.role === "user" ? <UserBubble isDark={isDarkTheme}>{msg.content}</UserBubble> : msg.content}
                  </motion.div>
                ))}

                {isTyping && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                    <AITypingBubble isDark={isDarkTheme} />
                  </motion.div>
                )}

                <div ref={chatEndRef} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Persistent Input Bar */}
        <div className={`border-t p-4 shrink-0 transition-colors duration-300 ${
          isDarkTheme ? "bg-slate-900 border-slate-800" : "bg-white border-gray-100"
        }`}>
          {path === "roleplay" ? (
            /* Open Chat Input for Roleplay AI */
            <div className="flex gap-2.5 items-center">
              <input
                type="text"
                value={roleplayText}
                onChange={(e) => setRoleplayText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendRoleplay()}
                placeholder="Ketik pertanyaan Anda tentang lahan..."
                className={`flex-1 h-11 px-4 rounded-full border text-sm transition-all focus:outline-none ${
                  isDarkTheme 
                    ? "bg-slate-800 border-slate-700 text-slate-100 focus:border-indigo-500" 
                    : "bg-gray-50 border-gray-200 text-gray-800 focus:border-[#2D6A4F]"
                }`}
              />
              <button
                onClick={handleSendRoleplay}
                className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 transition-colors cursor-pointer ${
                  isDarkTheme 
                    ? "bg-indigo-600 text-white hover:bg-indigo-700" 
                    : "bg-[#2D6A4F] text-white hover:bg-[#1B4332]"
                }`}
              >
                <Send size={15} />
              </button>
            </div>
          ) : (
            /* Template Flow Input Muted */
            <div className="flex gap-2.5 items-center">
              <input
                type="text"
                disabled
                placeholder={
                  stage === 0 
                    ? "Pilih modul/template di atas untuk memulai..." 
                    : "Pilih opsi jawaban dari kartu pertanyaan di atas..."
                }
                className={`flex-1 h-11 px-4 rounded-full border text-sm text-gray-400 placeholder:text-gray-300 focus:outline-none disabled:cursor-not-allowed ${
                  isDarkTheme ? "bg-slate-800/50 border-slate-800" : "bg-gray-50 border-gray-150"
                }`}
              />
              <button disabled className="w-11 h-11 rounded-full bg-gray-200 text-gray-400 flex items-center justify-center shrink-0 cursor-not-allowed">
                <Send size={15} />
              </button>
            </div>
          )}
        </div>

      </div>

      {/* ── COLUMN 3: RIGHT PANEL (RESULTS CARD & VISUAL CHARTS) ── */}
      <div
        className={`w-[390px] shrink-0 flex flex-col border-l transition-colors duration-300 hidden xl:flex ${
          isDarkTheme ? "bg-slate-900 border-slate-800" : "bg-gray-50/80 border-gray-100"
        }`}
      >
        {/* Panel Header */}
        <div className={`px-5 h-12 flex items-center gap-2 border-b shrink-0 bg-white ${
          isDarkTheme ? "bg-slate-900 border-slate-800 text-slate-100" : "bg-white border-gray-100 text-gray-800"
        }`}>
          <Inbox size={14} className="text-gray-400" />
          <span className="text-xs font-black text-gray-500 uppercase tracking-wider">Kanvas Hasil</span>
          {stage === 3 && (
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
              className={`ml-auto flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-full ${
                isDarkTheme ? "bg-indigo-900/40 text-indigo-300" : "bg-green-100 text-green-700"
              }`}>
              <CheckCircle2 size={10} />
              Selesai
            </motion.div>
          )}
        </div>

        {/* Panel Content Scrollable */}
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          <AnimatePresence mode="wait">
            {stage < 3 && path !== "roleplay" ? (
              <motion.div key="placeholder" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full flex flex-col">
                <RightPanelPlaceholder isDark={isDarkTheme} />
              </motion.div>
            ) : (
              <motion.div key="result" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                {path === "diagnosis" && <DiagnosisResult commodity={selectedCommodity} symptom={selectedSymptom} />}
                {path === "alat" && <AlatResult commodity={selectedCommodity} scale={selectedSymptom} />}
                {path === "roleplay" && <RoleplayResult />}
                {path === "analisis" && <AnalisisResult region={selectedRegion} infoType={selectedInfoType} />}
                {path === "strategi" && <StrategiResult budget={selectedRegion} focus={selectedInfoType} />}
                {path === "stok" && <StokResult commodity={selectedCommodity} status={selectedSymptom} />}
                {path === "keuangan" && <KeuanganResult omzet={selectedRegion} expenseType={selectedInfoType} />}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Panel Footer */}
        {stage === 3 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className={`p-4 border-t ${isDarkTheme ? "bg-slate-900 border-slate-800" : "bg-white border-gray-100"}`}
          >
            <button
              onClick={handleReset}
              className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-sm transition-colors cursor-pointer border-2 ${
                isDarkTheme
                  ? "border-indigo-500 text-indigo-400 hover:bg-slate-800"
                  : "border-[#2D6A4F] text-[#2D6A4F] hover:bg-green-50"
              }`}
            >
              <Plus size={14} /> Konsultasi Baru
            </button>
          </motion.div>
        )}
      </div>

      {/* MOBILE SHEET FOR RESULTS (Shown under chat area on < xl screen when stage=3) */}
      <AnimatePresence>
        {stage === 3 && (
          <motion.div
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 40 }}
            className="fixed bottom-0 left-0 right-0 z-50 xl:hidden bg-white border-t-2 border-[#2D6A4F] shadow-2xl max-h-[55vh] overflow-y-auto rounded-t-2xl text-gray-800"
          >
            <div className="sticky top-0 bg-white px-5 py-3 flex items-center justify-between border-b border-gray-100">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-[#2D6A4F]" />
                <span className="text-xs font-black text-[#2D6A4F] uppercase tracking-wide">Hasil Rekomendasi</span>
              </div>
              <button onClick={handleReset} className="text-[11px] font-bold text-gray-400 hover:text-gray-700 flex items-center gap-1 cursor-pointer">
                <RotateCcw size={11} /> Ulang
              </button>
            </div>
            {path === "diagnosis" && <DiagnosisResult commodity={selectedCommodity} symptom={selectedSymptom} />}
            {path === "alat" && <AlatResult commodity={selectedCommodity} scale={selectedSymptom} />}
            {path === "analisis" && <AnalisisResult region={selectedRegion} infoType={selectedInfoType} />}
            {path === "strategi" && <StrategiResult budget={selectedRegion} focus={selectedInfoType} />}
            {path === "stok" && <StokResult commodity={selectedCommodity} status={selectedSymptom} />}
            {path === "keuangan" && <KeuanganResult omzet={selectedRegion} expenseType={selectedInfoType} />}
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
