import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import heroShield1 from "../../assets/hero-shield-1.jpg";
import heroShield2 from "../../assets/hero-shield-2.jpg";
import heroShield3 from "../../assets/hero-shield-3.jpg";
import heroBrand1 from "../../assets/hero-brand-1.jpg";
import heroBrand2 from "../../assets/hero-brand-2.jpg";
import heroDashboard1 from "../../assets/hero-dashboard-1.jpg";

const SLIDES = [
  {
    id: 0,
    badge: "🛡️ AGROU TANI",
    badgeColor: "bg-[#2D6A4F]/20 text-[#74C69D] border border-[#2D6A4F]/30",
    title: "Bukan Petaninya yang Salah. Produknya yang Tidak Tepat.",
    subtext: "Selama ini pupuk dan pestisida sering dibeli berdasarkan kebiasaan. Sekarang saatnya memilih berdasarkan diagnosis.",
    cta: "Mulai Diagnosis →",
    ctaClass: "bg-[#2D6A4F] hover:bg-[#1B4332] text-white shadow-lg shadow-[#2D6A4F]/20",
    image: heroShield2,
  },
  {
    id: 1,
    badge: "🏪 AGROU PASAR",
    badgeColor: "bg-[#F77F00]/20 text-[#F77F00] border border-[#F77F00]/30",
    title: "Panen Sudah Bagus, Tapi Harga Masih Segitu-gitu Aja?",
    subtext: "Masalahnya bukan kualitas panenmu — masalahnya belum banyak pembeli yang tahu nilainya.",
    cta: "Jual di Pasar →",
    ctaClass: "bg-[#F77F00] hover:bg-[#E76F51] text-white shadow-lg shadow-[#F77F00]/20",
    image: heroBrand1,
  },
  {
    id: 2,
    badge: "✅ VERIFIED PROTECTED FARM",
    badgeColor: "bg-[#2D6A4F]/20 text-[#74C69D] border border-[#2D6A4F]/30",
    title: "Lahanmu Sakit? Kami Bantu Temukan Obatnya.",
    subtext: "Ceritakan gejalanya, kami bantu rekomendasikan solusi yang paling sesuai — bukan asal tebak.",
    cta: "Pelajari Ekosistem →",
    ctaClass: "bg-transparent border-2 border-white hover:bg-white hover:text-[#2D6A4F] text-white",
    image: heroShield1,
  }
];

const RIGHT_SLIDES = [
  {
    id: 0,
    badge: "🛡️ AGROU TANI",
    badgeColor: "bg-[#2D6A4F]/20 text-[#74C69D] border border-[#2D6A4F]/30",
    title: "47 Komoditas. Langsung dari Sumbernya.",
    subtext: "Produk lokal terbaik dari koperasi dan petani, tanpa perantara berlapis dan tanpa markup tengkulak.",
    tags: ["Pestisida", "Pupuk", "Benih", "Probiotik"],
    cta: "Lihat Produk →",
    targetId: "module-intro",
    overlay: "from-[#1B4332]/90 to-[#2D6A4F]/85",
    image: heroShield3,
  },
  {
    id: 1,
    badge: "🌾 AGROU PASAR",
    badgeColor: "bg-[#F77F00]/20 text-[#F77F00] border border-[#F77F00]/30",
    title: "Restoran Premium Butuh Bahan Baku Terbaik. Kamu Punya Itu.",
    subtext: "Hubungkan hasil panenmu langsung ke pembeli bernilai tinggi yang memang mencari kualitas.",
    tags: ["Ikan", "Padi", "Kopi", "Udang", "Sayuran"],
    cta: "Jelajahi Pasar →",
    targetId: "module-intro",
    overlay: "from-[#F77F00]/90 to-[#E76F51]/85",
    image: heroBrand2,
  },
  {
    id: 2,
    badge: "🏛️ DASHBOARD KOPERASI",
    badgeColor: "bg-[#0077B6]/20 text-[#00B4D8] border border-[#0077B6]/30",
    title: "Koperasimu Sudah Kerja Keras. Administrasinya Biar Kami yang Bantu Urus.",
    subtext: "Stok, pesanan, revenue split — semua lebih rapi dan otomatis dalam satu sistem.",
    tags: ["Stok", "Pesanan", "Laporan", "Revenue"],
    cta: "Daftar Gratis →",
    targetId: "brand",
    overlay: "from-[#0077B6]/90 to-[#023E8A]/85",
    image: heroDashboard1,
  }
];

const slideVariants = {
  enter: (direction: "left" | "right") => ({
    x: direction === "left" ? "100%" : "-100%",
  }),
  center: {
    x: 0,
  },
  exit: (direction: "left" | "right") => ({
    x: direction === "left" ? "-100%" : "100%",
  }),
};

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeRightSlide, setActiveRightSlide] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("left");
  const [rightDirection, setRightDirection] = useState<"left" | "right">("left");

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection("left");
      setActiveSlide((prev) => (prev + 1) % SLIDES.length);
    }, 15000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setRightDirection("left");
      setActiveRightSlide((prev) => (prev + 1) % RIGHT_SLIDES.length);
    }, 15000);
    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    setDirection("left");
    setActiveSlide((prev) => (prev + 1) % SLIDES.length);
  };

  const handlePrev = () => {
    setDirection("right");
    setActiveSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  const handleRightNext = () => {
    setRightDirection("left");
    setActiveRightSlide((prev) => (prev + 1) % RIGHT_SLIDES.length);
  };

  const handleRightPrev = () => {
    setRightDirection("right");
    setActiveRightSlide((prev) => (prev - 1 + RIGHT_SLIDES.length) % RIGHT_SLIDES.length);
  };

  return (
    <section className="w-full relative z-10 pt-10 pb-4">
      <div className="max-w-[1440px] mx-auto px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-stretch gap-4">
          
          {/* Kolom Kiri (65% width) — Innovation Slider */}
          <div className="w-full lg:w-[65%] h-[420px] relative rounded-2xl overflow-hidden shadow-md group shrink-0">
            <AnimatePresence>
              <motion.div
                key={activeSlide}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "tween", duration: 0.4, ease: "easeInOut" }
                }}
                className="absolute inset-0 w-full h-full"
              >
                {/* Background Image */}
                <img
                  src={SLIDES[activeSlide].image}
                  alt={SLIDES[activeSlide].title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/45" />
                
                {/* Slide Content */}
                <div className="absolute inset-0 p-8 lg:p-12 flex flex-col justify-between z-10 text-white">
                  <div>
                    <span className={`inline-block ${SLIDES[activeSlide].badgeColor} text-[10px] font-bold tracking-widest px-3 py-1 rounded-full mb-4`}>
                      {SLIDES[activeSlide].badge}
                    </span>
                    <h1 className="font-display font-black text-2xl lg:text-4xl leading-tight mb-3 max-w-2xl">
                      {SLIDES[activeSlide].title}
                    </h1>
                    <p className="text-white/80 text-sm lg:text-base max-w-xl font-medium leading-relaxed">
                      {SLIDES[activeSlide].subtext}
                    </p>
                  </div>
                  
                  <div>
                    <button className={`${SLIDES[activeSlide].ctaClass} font-bold px-6 py-3 rounded-full text-sm transition-all hover:scale-105 active:scale-95`}>
                      {SLIDES[activeSlide].cta}
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Subtle Controls */}
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white p-2 rounded-full backdrop-blur-sm transition-colors z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white p-2 rounded-full backdrop-blur-sm transition-colors z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <ChevronRight size={18} />
            </button>

            {/* Dot Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20">
              {SLIDES.map((slide, i) => (
                <button
                  key={slide.id}
                  onClick={() => {
                    setDirection(i > activeSlide ? "left" : "right");
                    setActiveSlide(i);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    activeSlide === i ? "w-6 bg-white" : "w-2 bg-white/40"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Kolom Kanan (35% width) — 1 Card Slider */}
          <div className="w-full lg:w-[35%] h-[420px] relative rounded-2xl overflow-hidden shadow-md group shrink-0">
            <AnimatePresence>
              <motion.div
                key={activeRightSlide}
                custom={rightDirection}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "tween", duration: 0.4, ease: "easeInOut" }
                }}
                className="absolute inset-0 w-full h-full"
              >
                {/* Background Image */}
                <img
                  src={RIGHT_SLIDES[activeRightSlide].image}
                  alt={RIGHT_SLIDES[activeRightSlide].title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {/* Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${RIGHT_SLIDES[activeRightSlide].overlay}`} />
                <div className="absolute inset-0 bg-black/45" />

                {/* Content */}
                <div className="absolute inset-0 p-8 flex flex-col justify-between z-10 text-white">
                  <div>
                    <span className={`inline-block ${RIGHT_SLIDES[activeRightSlide].badgeColor} text-[10px] font-bold tracking-widest px-3 py-1 rounded-full mb-4`}>
                      {RIGHT_SLIDES[activeRightSlide].badge}
                    </span>
                    <h2 className="font-display font-bold text-xl lg:text-2xl leading-tight mb-2">
                      {RIGHT_SLIDES[activeRightSlide].title}
                    </h2>
                    <p className="text-white/80 text-xs font-semibold leading-relaxed mb-4">
                      {RIGHT_SLIDES[activeRightSlide].subtext}
                    </p>
                    {/* Tags row */}
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {RIGHT_SLIDES[activeRightSlide].tags.map((t, idx) => (
                        <span key={idx} className="bg-white/10 backdrop-blur-sm border border-white/20 text-white text-[9px] font-bold px-2 py-0.5 rounded-md">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <button 
                      onClick={() => {
                        const el = document.getElementById(RIGHT_SLIDES[activeRightSlide].targetId);
                        el?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="bg-transparent border border-white hover:bg-white hover:text-gray-900 text-white font-bold px-4 py-2 rounded-full text-xs transition-all active:scale-95"
                    >
                      {RIGHT_SLIDES[activeRightSlide].cta}
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Subtle Controls */}
            <button
              onClick={handleRightPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white p-2 rounded-full backdrop-blur-sm transition-colors z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={handleRightNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white p-2 rounded-full backdrop-blur-sm transition-colors z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <ChevronRight size={16} />
            </button>

            {/* Dot Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20">
              {RIGHT_SLIDES.map((slide, i) => (
                <button
                  key={slide.id}
                  onClick={() => {
                    setRightDirection(i > activeRightSlide ? "left" : "right");
                    setActiveRightSlide(i);
                  }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    activeRightSlide === i ? "w-5 bg-white" : "w-1.5 bg-white/40"
                  }`}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
