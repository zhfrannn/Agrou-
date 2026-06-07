import { useEffect, useState, useRef } from "react";
import { motion } from "motion/react";
import {
  Shield,
  Leaf,
  CheckCircle2,
  Star,
  TrendingUp,
  ArrowRight,
  RotateCcw,
} from "lucide-react";
import bgEkosistem from "../../assets/bg-ekosistem.jpg";

const LOOP_NODES = [
  { label: "Beli Proteksi", icon: Shield, bg: "bg-orange-50", iconColor: "text-[#E8720C]" },
  { label: "Lahan Sehat", icon: Leaf, bg: "bg-green-50", iconColor: "text-[#2D6A4F]" },
  { label: "Badge Verified", icon: CheckCircle2, bg: "bg-amber-50", iconColor: "text-[#D4A017]" },
  { label: "Pembeli Premium", icon: Star, bg: "bg-blue-50", iconColor: "text-[#0077B6]" },
  { label: "Harga Tinggi", icon: TrendingUp, bg: "bg-orange-50", iconColor: "text-[#E8720C]" },
  { label: "Loop Berlanjut", icon: RotateCcw, bg: "bg-[#2D6A4F]/10", iconColor: "text-[#2D6A4F]" },
];

const IMPACT_STATS = [
  { target: 2400, prefix: "", suffix: "+", label: "Koperasi Aktif", type: "thousands" },
  { target: 47, prefix: "", suffix: "", label: "Komoditas Tersedia", type: "integer" },
  { target: 4.8, prefix: "", suffix: "/5", label: "Rating Pengguna", type: "rating" },
  { target: 70000, prefix: "", suffix: "", label: "Target Koperasi Desa (Program Merah Putih)", type: "thousands" },
  { target: 37, prefix: "", suffix: " Juta", label: "Petani Indonesia yang Bisa Dijangkau", type: "integer" },
  { target: 30, prefix: "20–", suffix: "%", label: "Potensi Pengurangan Gagal Panen", type: "integer" },
];

function CountUp({
  target,
  prefix = "",
  suffix = "",
  type = "integer",
}: {
  target: number;
  prefix?: string;
  suffix?: string;
  type?: "integer" | "thousands" | "rating";
}) {
  const [count, setCount] = useState(1);
  const [isInView, setIsInView] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (elementRef.current) {
      observer.observe(elementRef.current);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView) return;

    let start = 1;
    const duration = 1200; // ms
    const startTime = performance.now();

    const animate = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const ease = progress * (2 - progress); // easeOutQuad
      const currentVal = start + (target - start) * ease;

      setCount(currentVal);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, target]);

  if (!isInView) {
    return <span ref={elementRef}>{prefix}1{suffix}</span>;
  }

  let formattedCount = "";
  if (type === "thousands") {
    formattedCount = Math.round(count).toLocaleString("id-ID");
  } else if (type === "rating") {
    formattedCount = count.toFixed(1);
  } else {
    formattedCount = Math.round(count).toString();
  }

  return <span ref={elementRef}>{prefix}{formattedCount}{suffix}</span>;
}

export default function EkosistemBridge() {
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - 0.628);

  return (
    <section 
      className="w-full relative z-10 overflow-hidden bg-cover bg-center bg-no-repeat pt-12 pb-16"
      style={{ backgroundImage: `url(${bgEkosistem})` }}
    >
      {/* White Overlay (80% Opacity) */}
      <div className="absolute inset-0 bg-white/80 z-0" />
      <div className="max-w-[1440px] mx-auto px-8 relative z-10">
        
        {/* Layout atas — 2 kolom */}
        <div className="flex flex-col lg:flex-row items-stretch gap-8 mb-12">
          
          {/* Kolom kiri (60% width) */}
          <div className="w-full lg:w-[60%] flex flex-col justify-between">
            <div>
              <span className="text-[#2D6A4F] font-bold text-xs tracking-widest uppercase bg-[#2D6A4F]/8 px-3.5 py-1.5 rounded-full border border-[#2D6A4F]/15 inline-block mb-4">
                EKOSISTEM TERTUTUP
              </span>
              <h2 className="font-display font-black text-3xl lg:text-4xl text-gray-900 mb-4 leading-tight">
                Sehatkan Lahan. Kuatkan Pasar. Buktikan dengan Data.
              </h2>
              <p className="text-gray-600 font-medium text-sm lg:text-base leading-relaxed mb-6">
                Agrou bukan sekadar marketplace — ini ekosistem yang saling mengunci. 
                Setiap pembelian proteksi lahan di Agrou Tani membangun rekam jejak yang otomatis menjadi 
                badge <span className="font-bold text-[#2D6A4F]">Verified Protected Farm</span> di Agrou Pasar 
                — membuka akses ke pembeli premium yang mau bayar lebih tinggi.
              </p>
            </div>

            {/* Loop compact horizontal */}
            <div className="relative pt-4 pb-2">
              <div 
                className="flex items-center justify-between gap-1 flex-nowrap overflow-x-auto pb-2 scrollbar-hide"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {LOOP_NODES.map((node, i) => {
                  const Icon = node.icon;
                  const isLast = i === LOOP_NODES.length - 1;
                  return (
                    <div key={i} className="flex items-center gap-1 shrink-0">
                      <div className="flex items-center gap-2 bg-white border border-gray-100 rounded-xl py-1.5 px-2.5 shadow-[0_4px_12px_rgba(0,0,0,0.03)] hover:shadow-md hover:scale-[1.01] transition-all duration-300 shrink-0">
                        <div className={`${node.bg} w-6 h-6 rounded-lg flex items-center justify-center shrink-0`}>
                          <Icon size={12} className={node.iconColor} />
                        </div>
                        <span className="font-bold text-[10px] text-gray-800 whitespace-nowrap">
                          {node.label}
                        </span>
                      </div>
                      {!isLast && (
                        <ArrowRight size={12} className="text-[#2D6A4F]/40 shrink-0" strokeWidth={2.5} />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Kolom kanan (40% width) */}
          <div className="w-full lg:w-[40%]">
            <div className="bg-white border border-gray-100 rounded-3xl p-6 lg:p-8 flex flex-col items-center justify-center text-center shadow-[0_4px_25px_rgba(232,114,12,0.02)] h-full">
              <div className="relative flex items-center justify-center mb-5">
                {/* Donut Chart SVG */}
                <svg className="w-36 h-36 transform -rotate-90" viewBox="0 0 120 120">
                  <circle
                    cx="60"
                    cy="60"
                    r={radius}
                    className="stroke-orange-50 fill-none"
                    strokeWidth="10"
                  />
                  <motion.circle
                    cx="60"
                    cy="60"
                    r={radius}
                    className="stroke-[#E8720C] fill-none"
                    strokeWidth="10"
                    strokeLinecap="round"
                    initial={{ strokeDashoffset: circumference }}
                    whileInView={{ strokeDashoffset: strokeDashoffset }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    style={{ strokeDasharray: circumference }}
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center">
                  <span className="font-display font-black text-2xl lg:text-3xl text-gray-900 leading-none">62.8%</span>
                </div>
              </div>
              <h4 className="font-display font-bold text-sm lg:text-base text-gray-900 leading-snug mb-1 max-w-[220px]">
                Kehilangan Sayuran dari Suplai Domestik
              </h4>
              <span className="text-[11px] font-semibold text-gray-400">Sumber: Bappenas, 2024</span>
            </div>
          </div>

        </div>

        {/* Layout bawah — grid 6 kolom angka dampak */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {IMPACT_STATS.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="bg-white border border-gray-100 rounded-2xl p-5 text-center shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:shadow-md transition-shadow duration-300 flex flex-col justify-center"
            >
              <div className="font-display font-black text-2xl lg:text-3xl text-[#2D6A4F] mb-1">
                <CountUp target={stat.target} prefix={stat.prefix} suffix={stat.suffix} type={stat.type as any} />
              </div>
              <div className="text-[11px] font-bold text-gray-500 leading-tight">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
