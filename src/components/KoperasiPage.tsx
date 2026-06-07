import { useState } from "react";
import { motion } from "motion/react";
import { 
  Search, MapPin, Users, Award, Star, Store, 
  ChevronRight, ChevronLeft, Building2, CheckCircle2, 
  MessageSquare, UserPlus
} from "lucide-react";

const PROVINSI_FILTERS = [
  "Semua Provinsi", "Aceh", "Sumatera Utara", "Jawa Barat", 
  "Jawa Tengah", "Jawa Timur", "Sulawesi", "NTB", "NTT", "Papua"
];

const KOMODITAS_FILTERS = [
  "Semua", "🐟 Ikan & Laut", "🌾 Padi", "☕ Kopi & Rempah", 
  "🥬 Sayuran", "🦐 Udang", "🌿 Rumput Laut", "🍯 Olahan"
];

const KOPERASI_DATA = [
  {
    id: 1,
    name: "Koperasi Tani Maju Gayo",
    location: "Bener Meriah, Aceh",
    members: 47,
    verified: true,
    tags: ["☕ Kopi", "🌿 Rempah", "🫙 Olahan"],
    desc: "Koperasi kopi arabika generasi ketiga di dataran tinggi Gayo dengan proses natural premium.",
    rating: 4.9,
    reviews: 124,
    banner: "https://images.unsplash.com/photo-1504630083234-14187a9df0f5?auto=format&fit=crop&q=80&w=800",
    avatar: "https://ui-avatars.com/api/?name=Gayo&background=F77F00&color=fff&size=100",
    products: [
      { name: "Kopi Natural", price: "Rp180rb", img: "https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&q=80&w=200" },
      { name: "Honey Process", price: "Rp210rb", img: "https://images.unsplash.com/photo-1611162458324-aae1eb4129a4?auto=format&fit=crop&q=80&w=200" },
      { name: "Green Bean", price: "Rp95rb", img: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?auto=format&fit=crop&q=80&w=200" }
    ]
  },
  {
    id: 2,
    name: "KUB Nelayan Lampulo",
    location: "Banda Aceh, Aceh",
    members: 82,
    verified: true,
    tags: ["🐟 Ikan", "🦐 Udang"],
    desc: "Kelompok usaha bersama nelayan Lampulo yang fokus pada hasil tangkapan ikan pelagis dan udang segar.",
    rating: 4.8,
    reviews: 89,
    banner: "https://images.unsplash.com/photo-1534062590479-79a0cf833215?auto=format&fit=crop&q=80&w=800",
    avatar: "https://ui-avatars.com/api/?name=Lampulo&background=0077B6&color=fff&size=100",
    products: [
      { name: "Tuna Loin", price: "Rp110rb", img: "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?auto=format&fit=crop&q=80&w=200" },
      { name: "Ikan Asin", price: "Rp85rb", img: "https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&q=80&w=200" },
      { name: "Udang Tiger", price: "Rp145rb", img: "https://images.unsplash.com/photo-1621852004158-f3bc188ace2d?auto=format&fit=crop&q=80&w=200" }
    ]
  },
  {
    id: 3,
    name: "Koperasi Tani Sejahtera",
    location: "Lembang, Jawa Barat",
    members: 115,
    verified: false,
    tags: ["🥬 Sayuran", "🌾 Padi"],
    desc: "Sentra sayuran organik dataran tinggi dan padi sawah dengan sertifikasi pertanian baik.",
    rating: 4.7,
    reviews: 65,
    banner: "https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?auto=format&fit=crop&q=80&w=800",
    avatar: "https://ui-avatars.com/api/?name=Sejahtera&background=2D6A4F&color=fff&size=100",
    products: [
      { name: "Beras Merah", price: "Rp28rb", img: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=200" },
      { name: "Tomat Cherry", price: "Rp35rb", img: "https://images.unsplash.com/photo-1592982537447-6f29fb443831?auto=format&fit=crop&q=80&w=200" },
      { name: "Selada Air", price: "Rp15rb", img: "https://images.unsplash.com/photo-1628186100298-b8058204b7b6?auto=format&fit=crop&q=80&w=200" }
    ]
  },
  {
    id: 4,
    name: "Koperasi Garam Madura",
    location: "Sumenep, Jawa Timur",
    members: 58,
    verified: true,
    tags: ["🫙 Garam Laut", "🐟 Ikan"],
    desc: "Penghasil garam laut kristal murni dan ikan asin kualitas ekspor langsung dari petani garam tradisional.",
    rating: 4.9,
    reviews: 156,
    banner: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?auto=format&fit=crop&q=80&w=800",
    avatar: "https://ui-avatars.com/api/?name=Madura&background=E76F51&color=fff&size=100",
    products: [
      { name: "Garam Kasar", price: "Rp12rb", img: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?auto=format&fit=crop&q=80&w=200" },
      { name: "Fish Salted", price: "Rp65rb", img: "https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&q=80&w=200" },
      { name: "Garam Halus", price: "Rp18rb", img: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?auto=format&fit=crop&q=80&w=200" }
    ]
  },
  {
    id: 5,
    name: "KUB Rumput Laut Sumbawa",
    location: "Sumbawa Besar, NTB",
    members: 34,
    verified: true,
    tags: ["🌿 Rumput Laut"],
    desc: "Kelompok pembudidaya rumput laut kualitas super untuk bahan baku industri dan konsumsi langsung.",
    rating: 4.8,
    reviews: 42,
    banner: "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?auto=format&fit=crop&q=80&w=800",
    avatar: "https://ui-avatars.com/api/?name=Sumbawa&background=2A9D8F&color=fff&size=100",
    products: [
      { name: "Gracilaria", price: "Rp35rb", img: "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?auto=format&fit=crop&q=80&w=200" },
      { name: "Eucheuma", price: "Rp45rb", img: "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?auto=format&fit=crop&q=80&w=200" },
      { name: "Bubuk Agar", price: "Rp85rb", img: "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?auto=format&fit=crop&q=80&w=200" }
    ]
  },
  {
    id: 6,
    name: "Koperasi Kopi Toraja",
    location: "Tana Toraja, Sulsel",
    members: 62,
    verified: true,
    tags: ["☕ Kopi Premium"],
    desc: "Spesialisasi kopi Toraja Kalosi dengan profil rasa herbal khas yang dirawat secara organik.",
    rating: 5.0,
    reviews: 215,
    banner: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=800",
    avatar: "https://ui-avatars.com/api/?name=Toraja&background=3E2723&color=fff&size=100",
    products: [
      { name: "Toraja Peaberry", price: "Rp280rb", img: "https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&q=80&w=200" },
      { name: "Full Washed", price: "Rp190rb", img: "https://images.unsplash.com/photo-1611162458324-aae1eb4129a4?auto=format&fit=crop&q=80&w=200" },
      { name: "Drip Bags", price: "Rp65rb", img: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?auto=format&fit=crop&q=80&w=200" }
    ]
  },
  {
    id: 7,
    name: "Koperasi Pangan Lestari",
    location: "Klaten, Jawa Tengah",
    members: 210,
    verified: false,
    tags: ["🌾 Beras", "🌽 Jagung"],
    desc: "Koperasi andalan penyedia beras rojolele dan pangan pokok lainnya untuk ketahanan pangan nasional.",
    rating: 4.6,
    reviews: 180,
    banner: "https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?auto=format&fit=crop&q=80&w=800",
    avatar: "https://ui-avatars.com/api/?name=Lestari&background=457B9D&color=fff&size=100",
    products: [
      { name: "Beras Rojolele", price: "Rp85rb", img: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=200" },
      { name: "Jagung Pipil", price: "Rp15rb", img: "https://images.unsplash.com/photo-1592982537447-6f29fb443831?auto=format&fit=crop&q=80&w=200" },
      { name: "Dedak Halus", price: "Rp8rb", img: "https://images.unsplash.com/photo-1628186100298-b8058204b7b6?auto=format&fit=crop&q=80&w=200" }
    ]
  },
  {
    id: 8,
    name: "KUB Udang Vaname",
    location: "Tulang Bawang, Lampung",
    members: 45,
    verified: false,
    tags: ["🦐 Udang", "🐟 Ikan"],
    desc: "Pembudidaya udang vaname dan bandeng di pesisir Timur Sumatera dengan sistem bioflok berkelanjutan.",
    rating: 4.5,
    reviews: 32,
    banner: "https://images.unsplash.com/photo-1621852004158-f3bc188ace2d?auto=format&fit=crop&q=80&w=800",
    avatar: "https://ui-avatars.com/api/?name=Vaname&background=E63946&color=fff&size=100",
    products: [
      { name: "Vaname Size 40", price: "Rp110rb", img: "https://images.unsplash.com/photo-1621852004158-f3bc188ace2d?auto=format&fit=crop&q=80&w=200" },
      { name: "Vaname Size 80", price: "Rp85rb", img: "https://images.unsplash.com/photo-1621852004158-f3bc188ace2d?auto=format&fit=crop&q=80&w=200" },
      { name: "Ikan Bandeng", price: "Rp25rb", img: "https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&q=80&w=200" }
    ]
  },
  {
    id: 9,
    name: "Koperasi Madu Hutan Papua",
    location: "Merauke, Papua",
    members: 28,
    verified: true,
    tags: ["🍯 Madu", "🌿 Hasil Hutan"],
    desc: "Kumpulan petani hutan mengelola madu murni dan hasil bumi tanpa merusak vegetasi alami hutan Papua.",
    rating: 5.0,
    reviews: 104,
    banner: "https://images.unsplash.com/photo-1587049352847-4d4b1ed74dc4?auto=format&fit=crop&q=80&w=800",
    avatar: "https://ui-avatars.com/api/?name=Papua&background=D4A373&color=fff&size=100",
    products: [
      { name: "Madu Hitam", price: "Rp180rb", img: "https://images.unsplash.com/photo-1587049352847-4d4b1ed74dc4?auto=format&fit=crop&q=80&w=200" },
      { name: "Sarang Madu", price: "Rp150rb", img: "https://images.unsplash.com/photo-1587049352847-4d4b1ed74dc4?auto=format&fit=crop&q=80&w=200" },
      { name: "Madu Flora", price: "Rp120rb", img: "https://images.unsplash.com/photo-1587049352847-4d4b1ed74dc4?auto=format&fit=crop&q=80&w=200" }
    ]
  }
];

export default function KoperasiPage({ onViewChange }: { onViewChange?: (view: 'app' | 'shield' | 'brand' | 'dashboard' | 'koperasi' | 'profile') => void }) {
  const [activeProv, setActiveProv] = useState("Semua Provinsi");
  const [activeKomoditas, setActiveKomoditas] = useState("Semua");

  return (
    <div className="w-full bg-[#FFFDF7] min-h-screen">
      
      {/* PAGE HEADER SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-orange-50/50 to-[#FFFDF7] pt-12 pb-8 border-b border-gray-100">
        
        {/* Organic Blobs */}
        <div className="absolute top-0 right-10 w-96 h-96 bg-[#74C69D]/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#FFD166]/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-[1440px] mx-auto px-8 relative z-10 flex flex-col items-center text-center">
          
          <div className="flex items-center justify-center gap-2 text-sm font-medium text-gray-500 mb-6">
            <a href="#" className="hover:text-[#F77F00] transition-colors">Beranda</a>
            <ChevronRight size={14} />
            <span className="font-bold text-gray-800">Koperasi</span>
          </div>

          <h1 className="font-display font-black text-4xl lg:text-5xl text-[#2D6A4F] mb-4">Temukan Koperasi Terpercaya</h1>
          <p className="text-lg font-medium text-gray-600 mb-10 max-w-xl text-center">
            2.400+ koperasi aktif dari seluruh Indonesia siap melayani kebutuhanmu
          </p>

          <div className="w-full max-w-3xl relative">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
              <Search className="text-gray-400" size={24} />
            </div>
            <input 
              type="text" 
              placeholder="Cari nama koperasi atau komoditas..." 
              className="w-full pl-14 pr-32 py-4 rounded-full border-2 border-gray-200 focus:border-[#2D6A4F] focus:ring-4 focus:ring-[#2D6A4F]/10 outline-none transition-all text-lg font-medium bg-white shadow-sm"
            />
            <button className="absolute inset-y-2 right-2 bg-[#2D6A4F] hover:bg-[#1B4332] text-white px-8 rounded-full font-bold transition-colors shadow-md">
              Cari
            </button>
          </div>
        </div>
      </section>

      {/* FILTER BAR */}
      <section className="bg-white border-b border-gray-100 sticky top-[73px] z-40 shadow-sm">
        <div className="max-w-[1440px] mx-auto px-8 py-4">
          
          <div className="flex flex-col xl:flex-row justify-between gap-4">
            
            <div className="flex-1 min-w-0 pr-4">
              {/* Row 1 - Provinsi */}
              <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-1 scrollbar-hide">
                {PROVINSI_FILTERS.map(prov => (
                  <button 
                    key={prov}
                    onClick={() => setActiveProv(prov)}
                    className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-bold transition-all border ${
                      activeProv === prov 
                      ? "bg-[#F77F00] text-white border-[#F77F00] shadow-sm" 
                      : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-orange-50 hover:border-orange-200"
                    }`}
                  >
                    {prov}
                  </button>
                ))}
              </div>
              
              {/* Row 2 - Komoditas */}
              <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
                {KOMODITAS_FILTERS.map(komo => (
                  <button 
                    key={komo}
                    onClick={() => setActiveKomoditas(komo)}
                    className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-bold transition-all border ${
                      activeKomoditas === komo 
                      ? "bg-[#2D6A4F] text-white border-[#2D6A4F] shadow-sm" 
                      : "bg-white text-gray-600 border-gray-200 hover:bg-green-50 hover:border-green-200"
                    }`}
                  >
                    {komo}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort Dropdown */}
            <div className="shrink-0 flex items-end xl:pb-0">
              <select className="appearance-none bg-gray-50 border border-gray-200 text-gray-700 font-bold py-2.5 px-4 pr-8 rounded-xl focus:outline-none focus:border-[#2D6A4F] cursor-pointer text-sm w-full xl:w-auto">
                <option>Terpopuler ▼</option>
                <option>Paling Baru</option>
                <option>Rating Tertinggi</option>
                <option>Paling Banyak Diulas</option>
              </select>
            </div>

          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <div className="max-w-[1440px] mx-auto px-8 py-4 flex flex-wrap items-center gap-2 md:gap-4 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100/50 mb-10">
        <span className="text-gray-800">Menampilkan 2.418 koperasi</span>
        <span className="hidden md:block w-1.5 h-1.5 bg-gray-300 rounded-full"></span>
        <span className="flex items-center gap-1.5 text-[#F77F00]"><Award size={14} className="fill-[#F77F00]/20" /> 847 Verified Protected Farm</span>
        <span className="hidden md:block w-1.5 h-1.5 bg-gray-300 rounded-full"></span>
        <span className="flex items-center gap-1.5"><MapPin size={14} /> 34 Provinsi</span>
      </div>

      {/* MAIN CONTENT */}
      <main className="max-w-[1440px] mx-auto px-8 pb-24">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* LEFT: GRID SECTION */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
              {KOPERASI_DATA.map((kop, idx) => (
                <motion.div 
                  key={kop.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="bg-white rounded-[1.5rem] border border-gray-200 shadow-sm overflow-hidden flex flex-col group hover:-translate-y-1 hover:shadow-xl hover:border-orange-200 transition-all duration-300 relative"
                >
                  {/* Card Header (Banner) */}
                  <div className="h-32 bg-gray-100 relative overflow-hidden shrink-0">
                    <img src={kop.banner} alt={kop.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                    
                    {/* Badge */}
                    {kop.verified && (
                      <div className="absolute top-3 right-3 bg-gradient-to-r from-[#FFB703] to-[#F77F00] text-white text-[10px] font-bold px-2.5 py-1.5 rounded-md shadow-md flex items-center gap-1 border border-white/20">
                        <Award size={12} className="fill-white/80" />
                        Verified Protected Farm
                      </div>
                    )}
                  </div>

                  {/* Avatar overlaping banner */}
                  <div className="absolute top-[96px] left-5 w-16 h-16 rounded-full border-4 border-white overflow-hidden bg-white shadow-md z-10">
                    <img src={kop.avatar} alt="Logo" className="w-full h-full object-cover" />
                  </div>

                  {/* Card Body */}
                  <div className="p-5 pt-12 flex-1 flex flex-col">
                    <h3 className="font-display font-bold text-xl text-gray-900 mb-2 leading-tight group-hover:text-[#F77F00] transition-colors">{kop.name}</h3>
                    
                    <div className="flex items-center gap-x-4 gap-y-2 mb-3">
                      <div className="flex items-center gap-1 text-gray-500 text-xs font-medium">
                        <MapPin size={12} className="text-[#2D6A4F]" />
                        {kop.location}
                      </div>
                      <div className="flex items-center gap-1 text-gray-500 text-xs font-medium">
                        <Users size={12} className="text-[#0077B6]" />
                        {kop.members} Anggota
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {kop.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="bg-gray-50 px-2 py-0.5 rounded-md text-[10px] font-bold text-gray-600 border border-gray-100">
                          {tag}
                        </span>
                      ))}
                      {kop.tags.length > 3 && (
                        <span className="bg-gray-50 px-2 py-0.5 rounded-md text-[10px] font-bold text-gray-500 border border-gray-100">
                          +{kop.tags.length - 3} lagi
                        </span>
                      )}
                    </div>

                    <p className="text-sm text-gray-600 mb-5 line-clamp-2 min-h-[40px]">
                      {kop.desc}
                    </p>

                    {/* Products Row */}
                    <div className="grid grid-cols-3 gap-2 mb-5">
                      {kop.products.map((p, i) => (
                        <div key={i} className="flex flex-col">
                          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-1.5 border border-gray-100">
                             <img src={p.img} alt={p.name} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
                          </div>
                          <span className="text-[10px] font-bold text-gray-700 truncate leading-tight">{p.name}</span>
                          <span className="text-[10px] font-bold text-[#F77F00] leading-tight">{p.price}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-auto">
                       {/* Stats Bottom */}
                       <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
                          <div className="flex items-center gap-3">
                             <div className="flex items-center gap-1 text-sm">
                               <Star size={14} className="text-[#FFB703] fill-[#FFB703]" />
                               <span className="font-bold text-gray-800">{kop.rating}</span>
                             </div>
                             <div className="text-xs text-gray-500 font-medium flex items-center gap-1">
                               <MessageSquare size={12} className="text-gray-400" /> {kop.reviews} ulasan
                             </div>
                          </div>
                          <div className="text-[10px] font-bold text-[#2D6A4F] bg-[#74C69D]/10 px-2 py-1 rounded">📦 Stok tersedia</div>
                       </div>

                       {/* Action Row */}
                       <div className="flex items-center gap-3">
                          <button 
                            onClick={() => onViewChange && onViewChange('profile')}
                            className="flex-1 bg-orange-50 text-[#F77F00] hover:bg-[#F77F00] hover:text-white py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors text-sm border border-orange-100 hover:border-[#F77F00]"
                          >
                            <Store size={16} /> Kunjungi Toko
                          </button>
                          <button className="text-xs font-bold text-gray-500 hover:text-gray-900 transition-colors">
                            + Bandingkan
                          </button>
                       </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-16 flex items-center justify-center gap-2">
              <button className="flex items-center gap-1 px-4 py-2 border border-gray-200 rounded-lg text-sm font-bold text-gray-500 hover:bg-gray-50 transition-colors mr-2">
                <ChevronLeft size={16} /> Sebelumnya
              </button>
              <button className="w-10 h-10 rounded-lg bg-[#2D6A4F] text-white font-bold flex items-center justify-center shadow-md">1</button>
              <button className="w-10 h-10 rounded-lg bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 font-bold flex items-center justify-center transition-colors">2</button>
              <button className="w-10 h-10 rounded-lg bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 font-bold flex items-center justify-center transition-colors">3</button>
              <span className="px-2 text-gray-400 font-bold">...</span>
              <button className="w-10 h-10 rounded-lg bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 font-bold flex items-center justify-center transition-colors">81</button>
              <button className="flex items-center gap-1 px-4 py-2 border border-gray-200 rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors ml-2">
                Berikutnya <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* RIGHT: SIDE PANEL */}
          <div className="w-full lg:w-[280px] shrink-0">
            <div className="sticky top-[160px] bg-gradient-to-br from-[#74C69D]/20 to-[#2D6A4F]/10 border border-[#74C69D]/30 rounded-[2rem] p-6 shadow-sm overflow-hidden relative">
              <div className="absolute -top-10 -right-10 text-[120px] opacity-20 pointer-events-none">👩‍🌾</div>
              
              <div className="relative z-10">
                <h3 className="font-display font-black text-2xl text-[#2D6A4F] leading-tight mb-3">Belum punya koperasi di Agrou?</h3>
                <p className="text-sm font-medium text-gray-700 mb-6 leading-relaxed">
                  Buka akses pasar yang lebih besar untuk hasil panen desa Anda. Daftarkan sekarang!
                </p>

                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-[#2D6A4F] shrink-0 mt-0.5" />
                    <span className="text-sm font-bold text-gray-800 leading-tight">Dashboard gratis selamanya</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-[#2D6A4F] shrink-0 mt-0.5" />
                    <span className="text-sm font-bold text-gray-800 leading-tight">Akses pembeli premium nasional</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-[#2D6A4F] shrink-0 mt-0.5" />
                    <span className="text-sm font-bold text-gray-800 leading-tight">Revenue split otomatis</span>
                  </li>
                </ul>

                <button className="w-full bg-[#2D6A4F] hover:bg-[#1B4332] text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors shadow-lg shadow-[#2D6A4F]/30 hover:scale-105 active:scale-95">
                  <UserPlus size={18} /> Daftarkan Koperasi
                </button>
              </div>
            </div>
          </div>

        </div>
      </main>

    </div>
  );
}
