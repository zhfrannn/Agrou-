import { useRef } from "react";
import { motion } from "motion/react";
import { CheckCircle2, MapPin, Star, Users, ArrowRight, ShieldCheck, ChevronLeft, ChevronRight } from "lucide-react";

const KOPERASI_LIST = [
  {
    id: "k1",
    name: "Koperasi Gayo Mandiri",
    location: "Bener Meriah, Aceh",
    members: 320,
    rating: 4.9,
    products: ["Kopi Arabika", "Kakao", "Rempah"],
    color: "from-[#2D6A4F] to-[#1B4332]",
    initials: "GM",
    totalProducts: 24,
    thumbnail: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: "k2",
    name: "KUD Tani Makmur",
    location: "Cianjur, Jawa Barat",
    members: 245,
    rating: 4.8,
    products: ["Padi", "Cabai", "Jagung"],
    color: "from-[#E8720C] to-[#D4A017]",
    initials: "TM",
    totalProducts: 18,
    thumbnail: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: "k3",
    name: "KUD Sari Laut",
    location: "Demak, Jawa Tengah",
    members: 156,
    rating: 4.7,
    products: ["Ikan Asin", "Udang", "Bandeng"],
    color: "from-[#0077B6] to-[#023E8A]",
    initials: "SL",
    totalProducts: 15,
    thumbnail: "https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: "k4",
    name: "KUD Sejahtera",
    location: "Malang, Jawa Timur",
    members: 210,
    rating: 5.0,
    products: ["Beras", "Singkong", "Kelapa"],
    color: "from-[#2D6A4F] to-[#40916C]",
    initials: "SJ",
    totalProducts: 21,
    thumbnail: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: "k5",
    name: "Koperasi Nelayan Mandiri",
    location: "Aceh Besar",
    members: 98,
    rating: 4.5,
    products: ["Tuna", "Cakalang", "Cumi"],
    color: "from-[#0077B6] to-[#0096C7]",
    initials: "NM",
    totalProducts: 12,
    thumbnail: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: "k6",
    name: "KUD Rimba Lestari",
    location: "Kalimantan Barat",
    members: 178,
    rating: 4.8,
    products: ["Madu Hutan", "Karet", "Lada"],
    color: "from-[#D4A017] to-[#E8720C]",
    initials: "RL",
    totalProducts: 16,
    thumbnail: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=400",
  },
];

export default function KoperasiTerpercaya() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 296; // 280px width + 16px gap
    scrollRef.current.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section className="w-full bg-transparent pt-12 pb-12 relative z-10">
      <div className="max-w-[1440px] mx-auto px-8 relative">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="bg-[#2D6A4F]/10 p-2.5 rounded-xl">
              <ShieldCheck size={22} className="text-[#2D6A4F]" />
            </div>
          </div>
          <h2 className="font-display font-black text-3xl lg:text-4xl text-gray-900 mb-3">
            Koperasi Terpercaya
          </h2>
          <p className="text-gray-500 font-medium text-lg max-w-2xl mx-auto">
            Koperasi desa terverifikasi dengan rekam jejak perlindungan lahan dan kualitas produk terjamin
          </p>
        </div>

        {/* Carousel Wrapper */}
        <div className="relative">
          {/* Scroll Buttons */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-[-20px] top-1/2 -translate-y-1/2 z-20 bg-white hover:bg-gray-50 text-[#2D6A4F] p-3 rounded-full shadow-lg border border-gray-100 flex items-center justify-center hover:scale-105 active:scale-95 transition-all"
          >
            <ChevronLeft size={20} strokeWidth={2.5} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="absolute right-[-20px] top-1/2 -translate-y-1/2 z-20 bg-white hover:bg-gray-50 text-[#2D6A4F] p-3 rounded-full shadow-lg border border-gray-100 flex items-center justify-center hover:scale-105 active:scale-95 transition-all"
          >
            <ChevronRight size={20} strokeWidth={2.5} />
          </button>

          {/* Scrollable Container */}
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {KOPERASI_LIST.map((kop, idx) => (
              <motion.div
                key={kop.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="w-[280px] min-w-[280px] max-w-[280px] min-h-[390px] shrink-0 snap-start bg-white rounded-2xl overflow-hidden flex flex-col relative
                           border border-gray-100/50 shadow-lg
                           hover:shadow-xl hover:scale-[1.02]
                           transition-all duration-300 group"
              >
                <div className="p-4 flex-1 flex flex-col gap-3.5">
                  {/* 1. Header (Avatar + Nama Koperasi + Badge Verified) */}
                  <div className="flex items-center justify-between gap-2.5 min-w-0">
                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1B4332] to-[#74C69D] flex items-center justify-center shrink-0 shadow-sm">
                        <span className="text-white font-bold text-xs">{kop.initials}</span>
                      </div>
                      <h4 className="font-semibold text-sm text-gray-900 truncate leading-snug flex-1">
                        {kop.name}
                      </h4>
                    </div>
                    <div className="bg-[#E8F5E9] text-[#2D6A4F] text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5 shadow-sm border border-[#2D6A4F]/10 shrink-0">
                      <CheckCircle2 size={10} className="fill-[#2D6A4F]/10 text-[#2D6A4F]" />
                      <span>Verified</span>
                    </div>
                  </div>

                  {/* 2. Lokasi */}
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <MapPin size={12} className="text-gray-400 shrink-0" />
                    <span className="truncate">{kop.location}</span>
                  </div>

                  {/* 3. Statistik (Anggota • Rating • Komoditas) */}
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                    <span>{kop.members} anggota</span>
                    <span className="text-gray-300">•</span>
                    <span className="flex items-center gap-0.5 text-amber-600 font-bold">
                      <Star size={12} className="fill-amber-400 text-amber-400" />
                      {kop.rating}
                    </span>
                    <span className="text-gray-300">•</span>
                    <span>{kop.totalProducts} komoditas</span>
                  </div>

                  {/* 4. Tag Komoditas */}
                  <div className="flex flex-wrap gap-1">
                    {kop.products.map((prod, j) => (
                      <span
                        key={j}
                        className="bg-[#E8F5E9] text-[#2D6A4F] text-[9.5px] font-bold px-2 py-0.5 rounded-full border border-[#2D6A4F]/10"
                      >
                        {prod}
                      </span>
                    ))}
                  </div>

                  {/* 5. Thumbnail Gambar (16:9) */}
                  <div className="w-full aspect-video rounded-lg overflow-hidden border border-gray-100/50">
                    <img 
                      src={kop.thumbnail} 
                      alt={kop.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* 6. Lihat Profil Koperasi */}
                  <div className="pt-3 mt-auto border-t border-gray-100/60">
                    <a
                      href="#"
                      className="inline-flex items-center gap-1.5 text-[#2D6A4F] hover:text-[#1B4332] font-bold text-xs hover:underline transition-colors"
                    >
                      Lihat Profil Koperasi
                      <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
