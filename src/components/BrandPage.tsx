import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronRight, Store, MapPin, Users, Award, Star,
  ShoppingBag, MessageSquare, ArrowRight, Sparkles,
  BadgeCheck, Leaf, ShoppingCart
} from "lucide-react";

// ─── DATA ─────────────────────────────────────────────────────────────────────

const CATEGORIES = [
  { id: "semua",    emoji: "🛒", label: "Semua" },
  { id: "ikan",     emoji: "🐟", label: "Ikan & Laut" },
  { id: "padi",     emoji: "🌾", label: "Padi & Serealia" },
  { id: "kopi",     emoji: "☕", label: "Kopi & Rempah" },
  { id: "sayur",    emoji: "🥬", label: "Sayuran" },
  { id: "udang",    emoji: "🦐", label: "Udang & Budidaya" },
  { id: "rumput",   emoji: "🌿", label: "Rumput Laut" },
  { id: "olahan",   emoji: "🍯", label: "Produk Olahan" },
];

const FEATURED_KOPERASI = [
  {
    id: 1,
    name: "Koperasi Tani Maju Gayo",
    location: "Bener Meriah, Aceh",
    members: 47,
    rating: 4.9,
    reviews: 124,
    tags: ["☕ Kopi", "🌿 Rempah"],
    cover: "https://images.unsplash.com/photo-1524803507119-a9a3b6f2fb48?auto=format&fit=crop&q=80&w=800",
    logo: "https://ui-avatars.com/api/?name=Koperasi+Gayo&background=F77F00&color=fff&size=100",
    products: [
      "https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&q=80&w=200",
      "https://images.unsplash.com/photo-1611162458324-aae1eb4129a4?auto=format&fit=crop&q=80&w=200",
      "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?auto=format&fit=crop&q=80&w=200"
    ]
  },
  {
    id: 2,
    name: "Koperasi Nelayan Sejahtera",
    location: "Demak, Jawa Tengah",
    members: 112,
    rating: 4.8,
    reviews: 89,
    tags: ["🐟 Hasil Laut", "🦐 Tangkapan"],
    cover: "https://images.unsplash.com/photo-1534062590479-79a0cf833215?auto=format&fit=crop&q=80&w=800",
    logo: "https://ui-avatars.com/api/?name=Nelayan+Sejahtera&background=0077B6&color=fff&size=100",
    products: [
      "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?auto=format&fit=crop&q=80&w=200",
      "https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&q=80&w=200",
      "https://images.unsplash.com/photo-1534062590479-79a0cf833215?auto=format&fit=crop&q=80&w=200"
    ]
  },
  {
    id: 3,
    name: "KUD Subur Makmur",
    location: "Cianjur, Jawa Barat",
    members: 230,
    rating: 5.0,
    reviews: 215,
    tags: ["🌾 Padi", "🥬 Sayuran"],
    cover: "https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?auto=format&fit=crop&q=80&w=800",
    logo: "https://ui-avatars.com/api/?name=Subur+Makmur&background=2D6A4F&color=fff&size=100",
    products: [
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=200",
      "https://images.unsplash.com/photo-1628186100298-b8058204b7b6?auto=format&fit=crop&q=80&w=200",
      "https://images.unsplash.com/photo-1592982537447-6f29fb443831?auto=format&fit=crop&q=80&w=200"
    ]
  }
];

const PRODUCTS = [
  {
    id: 1,
    name: "Kopi Arabika Gayo Grade 1",
    koperasi: "Koperasi Tani Maju Gayo",
    location: "Bener Meriah, Aceh",
    price: "Rp 85.000",
    unit: "/ kg",
    stock: "320 kg",
    minOrder: "5 kg",
    tag: "☕ Kopi",
    category: "kopi",
    verified: true,
    image: "https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 2,
    name: "Ikan Asin Jambal Roti",
    koperasi: "Koperasi Nelayan Sejahtera",
    location: "Demak, Jateng",
    price: "Rp 120.000",
    unit: "/ kg",
    stock: "45 kg",
    minOrder: "1 kg",
    tag: "🐟 Hasil Laut",
    category: "ikan",
    verified: true,
    image: "https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 3,
    name: "Beras Merah Organik Premium",
    koperasi: "KUD Subur Makmur",
    location: "Cianjur, Jabar",
    price: "Rp 24.000",
    unit: "/ kg",
    stock: "1.2 Ton",
    minOrder: "10 kg",
    tag: "🌾 Pertanian",
    category: "padi",
    verified: true,
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 4,
    name: "Udang Kering (Ebi) Super",
    koperasi: "Koperasi Bahari Jaya",
    location: "Sidoarjo, Jatim",
    price: "Rp 150.000",
    unit: "/ kg",
    stock: "80 kg",
    minOrder: "2 kg",
    tag: "🦐 Hasil Laut",
    category: "udang",
    verified: false,
    image: "https://images.unsplash.com/photo-1621852004158-f3bc188ace2d?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 5,
    name: "Rumput Laut Kering Grade A",
    koperasi: "KUD Samudra Hijau",
    location: "Nusa Penida, Bali",
    price: "Rp 35.000",
    unit: "/ kg",
    stock: "500 kg",
    minOrder: "5 kg",
    tag: "🌿 Hasil Laut",
    category: "rumput",
    verified: true,
    image: "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 6,
    name: "Garam Laut Kusamba Asli",
    koperasi: "Koperasi Garam Kusamba",
    location: "Klungkung, Bali",
    price: "Rp 18.000",
    unit: "/ kg",
    stock: "250 kg",
    minOrder: "10 kg",
    tag: "🍯 Olahan",
    category: "olahan",
    verified: true,
    image: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 7,
    name: "Madu Hutan Liar Sumbawa",
    koperasi: "Koperasi Wanabakti",
    location: "Sumbawa, NTB",
    price: "Rp 145.000",
    unit: "/ botol",
    stock: "120 botol",
    minOrder: "2 botol",
    tag: "🍯 Olahan",
    category: "olahan",
    verified: true,
    image: "https://images.unsplash.com/photo-1587049352847-4d4b1ed74dc4?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 8,
    name: "Kopi Bubuk Robusta Lereng Kelud",
    koperasi: "KUD Lereng Kelud",
    location: "Kediri, Jatim",
    price: "Rp 65.000",
    unit: "/ kg",
    stock: "180 kg",
    minOrder: "3 kg",
    tag: "☕ Kopi",
    category: "kopi",
    verified: false,
    image: "https://images.unsplash.com/photo-1611162458324-aae1eb4129a4?auto=format&fit=crop&q=80&w=800"
  }
];

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

export default function BrandPage() {
  const [activeCategory, setActiveCategory] = useState("semua");

  const filteredProducts = PRODUCTS.filter((p) =>
    activeCategory === "semua" || p.category === activeCategory
  );

  return (
    <div className="w-full bg-white min-h-screen">

      {/* ════════════════════════════════════════════════════════════════════════
          1. HERO BANNER — card layout matching ShieldPage exactly
      ════════════════════════════════════════════════════════════════════════ */}
      <div className="max-w-[1440px] mx-auto px-8 pt-6">
        <div
          className="relative w-full overflow-hidden rounded-2xl shadow-xl"
          style={{ minHeight: 280 }}
        >
          {/* Gradient background — dark orange → light orange */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#7A2E00] via-[#C25100] to-[#F77F00]" />

          {/* Decorative blobs */}
          <div className="absolute top-0 right-1/3 w-[500px] h-[500px] bg-[#FFD166]/15 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
          <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-white/8 rounded-full blur-2xl pointer-events-none" />

          {/* Dot pattern overlay */}
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          <div
            className="relative z-10 max-w-[1440px] mx-auto px-8 flex items-center justify-between gap-8"
            style={{ minHeight: 280 }}
          >
            {/* ── LEFT: Text content ── */}
            <div className="flex flex-col justify-center py-10 max-w-xl">
              {/* Eyebrow pill */}
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-[#FFD166] text-xs font-bold px-3 py-1.5 rounded-full mb-5 w-fit backdrop-blur-sm">
                <Sparkles size={12} className="text-[#FFD166]" />
                Platform Pasar Terpercaya #1 Indonesia
              </div>

              {/* Main heading */}
              <h1
                className="font-sans font-black text-white leading-tight mb-3"
                style={{ fontSize: "clamp(1.75rem, 3vw, 2.75rem)" }}
              >
                Produk Segar Langsung<br />
                <span className="text-[#FFD166]">dari Koperasi Desa</span>
              </h1>

              {/* Subtitle */}
              <p className="text-white/70 font-medium text-sm leading-relaxed mb-7 max-w-md">
                Temukan hasil panen terbaik langsung dari koperasi desa terverifikasi — tanpa perantara, harga adil, kualitas terjamin dari sumber aslinya.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3">
                <button className="inline-flex items-center gap-2 bg-white hover:bg-orange-50 text-[#C25100] font-bold px-6 py-3 rounded-xl transition-all hover:scale-105 active:scale-95 shadow-xl shadow-black/20 text-sm">
                  <MessageSquare size={16} />
                  Ceritakan Kebutuhanmu
                </button>
                <button
                  onClick={() => setActiveCategory("semua")}
                  className="inline-flex items-center gap-2 bg-transparent hover:bg-white/10 text-white font-bold px-6 py-3 rounded-xl border-2 border-white/40 hover:border-white/70 transition-all text-sm"
                >
                  Cari &amp; Filter Produk
                  <ArrowRight size={16} />
                </button>
              </div>

              {/* Trust badges */}
              <div className="flex items-center gap-5 mt-6">
                {[
                  { icon: BadgeCheck, text: "Produk Terverifikasi" },
                  { icon: Award,      text: "Koperasi Terpercaya" },
                  { icon: Leaf,       text: "Harga Langsung Petani" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-1.5 text-white/60 text-xs font-medium">
                    <Icon size={13} className="text-[#FFD166]" />
                    {text}
                  </div>
                ))}
              </div>
            </div>

            {/* ── RIGHT: Floating product card illustration ── */}
            <div
              className="hidden lg:flex items-center justify-center shrink-0 relative"
              style={{ width: 340, minHeight: 280 }}
            >
              {/* Glow rings */}
              <div className="absolute w-64 h-64 rounded-full border-2 border-white/10 animate-spin" style={{ animationDuration: "25s" }} />
              <div className="absolute w-44 h-44 rounded-full border border-white/10 animate-spin" style={{ animationDuration: "16s", animationDirection: "reverse" }} />

              {/* Main product card */}
              <div className="relative z-10 w-56 h-56 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 overflow-hidden shadow-2xl rotate-3">
                <img
                  src="https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&q=80&w=500"
                  alt="Komoditas unggulan"
                  className="w-full h-full object-cover opacity-90"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#7A2E00]/60 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="text-white text-xs font-bold">Komoditas Unggulan</div>
                  <div className="text-white/70 text-[11px]">800+ produk tersedia</div>
                </div>
              </div>

              {/* Floating commodity badges */}
              <div className="absolute top-6 -left-4 bg-white rounded-xl shadow-xl px-3 py-2 flex items-center gap-2 text-xs font-bold text-gray-700 border border-gray-100">
                <span>🐟</span> Ikan
              </div>
              <div className="absolute top-16 -right-6 bg-white rounded-xl shadow-xl px-3 py-2 flex items-center gap-2 text-xs font-bold text-gray-700 border border-gray-100">
                <span>🌾</span> Padi
              </div>
              <div className="absolute bottom-12 -left-6 bg-white rounded-xl shadow-xl px-3 py-2 flex items-center gap-2 text-xs font-bold text-gray-700 border border-gray-100">
                <span>☕</span> Kopi
              </div>

              {/* Discount badge */}
              <div className="absolute bottom-4 right-2 z-20">
                <div className="relative w-20 h-20 flex flex-col items-center justify-center text-center">
                  {/* Spinning ring */}
                  <div className="absolute inset-0 rounded-full border-4 border-dashed border-[#FFD166]/60 animate-spin" style={{ animationDuration: "8s" }} />
                  {/* Badge fill */}
                  <div className="absolute inset-1.5 rounded-full bg-[#F77F00] shadow-lg shadow-[#F77F00]/40" />
                  {/* Text */}
                  <div className="relative z-10 flex flex-col items-center leading-none">
                    <span className="text-white text-[10px] font-bold">Hemat</span>
                    <span className="text-white font-black text-xl leading-none">15%</span>
                    <span className="text-white/80 text-[9px] font-bold">Beli Langsung</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════════════════
          2. CATEGORY PILLS — equal-width grid, matching ShieldPage exactly
      ════════════════════════════════════════════════════════════════════════ */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-[1440px] mx-auto px-8 py-4">
          <div
            className="grid py-1"
            style={{ gridTemplateColumns: `repeat(${CATEGORIES.length}, 1fr)`, gap: "8px" }}
          >
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex flex-col items-center gap-1.5 py-2.5 px-1 rounded-2xl border-2 transition-all duration-200 w-full ${
                    isActive
                      ? "bg-[#C25100] border-[#C25100] shadow-md shadow-[#C25100]/20"
                      : "bg-white border-gray-200 hover:border-[#F77F00] hover:bg-orange-50"
                  }`}
                >
                  <span className="text-xl leading-none">{cat.emoji}</span>
                  <span
                    className={`text-[10px] font-bold leading-tight text-center ${
                      isActive ? "text-white" : "text-gray-600"
                    }`}
                    style={{ overflowWrap: "break-word", wordBreak: "break-word" }}
                  >
                    {cat.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════════════════
          3. FEATURED KOPERASI
      ════════════════════════════════════════════════════════════════════════ */}
      <div className="max-w-[1440px] mx-auto px-8 py-10">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-sans font-bold text-3xl text-gray-900">Koperasi Pilihan Minggu Ini</h2>
          <button className="text-[#F77F00] font-bold hover:text-[#C25100] transition-colors flex items-center gap-1">
            Lihat Koperasi Lainnya <ChevronRight size={20} />
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURED_KOPERASI.map((kop, idx) => (
            <motion.div
              key={kop.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="bg-white rounded-[2rem] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.06)] overflow-hidden flex flex-col group hover:-translate-y-1.5 transition-all duration-300 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)]"
            >
              {/* Cover and Logo */}
              <div className="h-40 relative bg-gray-100">
                <img src={kop.cover} alt={kop.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                {/* Verified Badge */}
                <div className="absolute top-4 right-4 bg-gradient-to-r from-[#FFB703] to-[#F77F00] text-white text-[11px] font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 border border-white/20">
                  <Award size={14} className="fill-white/80" />
                  Verified Protected Farm
                </div>

                {/* Logo */}
                <div className="absolute -bottom-8 left-6 w-16 h-16 rounded-full border-4 border-white overflow-hidden bg-white shadow-md z-10">
                  <img src={kop.logo} alt="Logo" className="w-full h-full object-cover" />
                </div>
              </div>

              <div className="p-6 pt-10 flex-1 flex flex-col">
                <h3 className="font-sans font-bold text-xl text-gray-900 mb-2 leading-tight">{kop.name}</h3>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4">
                  <div className="flex items-center gap-1 text-gray-500 text-sm font-medium">
                    <MapPin size={14} className="text-[#F77F00]" />
                    {kop.location}
                  </div>
                  <div className="flex items-center gap-1 text-gray-500 text-sm font-medium">
                    <Users size={14} className="text-[#2D6A4F]" />
                    {kop.members} anggota
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {kop.tags.map(tag => (
                    <span key={tag} className="bg-gray-50 px-2.5 py-1 rounded-lg text-xs font-bold text-gray-600 border border-gray-100">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Products Preview */}
                <div className="grid grid-cols-3 gap-2 mb-6">
                  {kop.products.map((pImg, pIdx) => (
                    <div key={pIdx} className="aspect-square bg-gray-100 rounded-xl overflow-hidden border border-gray-50">
                      <img src={pImg} alt="Preview" className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
                    </div>
                  ))}
                </div>

                <div className="mt-auto flex items-center justify-between">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1">
                      <Star size={16} className="text-[#FFB703] fill-[#FFB703]" />
                      <span className="font-bold text-gray-800">{kop.rating}</span>
                    </div>
                    <span className="text-xs text-gray-400 font-medium tracking-wide">({kop.reviews} ulasan)</span>
                  </div>

                  <button className="bg-orange-50 hover:bg-[#F77F00] text-[#F77F00] hover:text-white px-5 py-2.5 rounded-xl font-bold transition-colors flex items-center gap-2">
                    Kunjungi Toko <Store size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════════════════
          4. PRODUCT CATALOG
      ════════════════════════════════════════════════════════════════════════ */}
      <div className="max-w-[1440px] mx-auto px-8 pb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-sans font-bold text-3xl text-gray-900">Produk Tersedia Sekarang</h2>
          <span className="text-sm text-gray-400 font-medium">
            <span className="text-gray-700 font-bold">{filteredProducts.length}</span> produk ditemukan
          </span>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="py-24 flex flex-col items-center text-center">
            <div className="text-6xl mb-4">🌾</div>
            <p className="font-bold text-gray-500 text-lg mb-1">Produk tidak ditemukan</p>
            <p className="text-gray-400 text-sm">Coba pilih kategori lain</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((prod, idx) => (
              <motion.div
                key={prod.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="bg-white rounded-3xl border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.04)] overflow-hidden flex flex-col group hover:-translate-y-1 hover:shadow-[0_12px_30px_rgb(247,127,0,0.08)] transition-all"
              >
                <div className="h-48 relative overflow-hidden bg-gray-100">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-lg text-xs font-bold text-gray-700 shadow-sm border border-gray-100 inline-block w-fit">
                      {prod.tag}
                    </span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex items-center gap-1.5 mb-2">
                    <Store size={14} className="text-gray-400 shrink-0" />
                    <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wide truncate">{prod.koperasi}</span>
                    {prod.verified && (
                      <Award size={14} className="text-[#F77F00] fill-[#F77F00]/20 shrink-0" title="Verified Farm" />
                    )}
                  </div>

                  <h3 className="font-sans font-bold text-lg text-gray-800 mb-1 leading-snug line-clamp-2">{prod.name}</h3>
                  <div className="text-xs text-gray-400 font-medium mb-4 flex items-center gap-1">
                    <MapPin size={12} /> {prod.location}
                  </div>

                  <div className="mt-auto">
                    <div className="bg-orange-50 border border-orange-100 rounded-lg p-2.5 flex items-center justify-between mb-4">
                      <span className="text-xs font-bold text-gray-500">Stok: <span className="text-[#2D6A4F]">{prod.stock}</span></span>
                      <span className="text-xs font-bold text-gray-500">Min: <span className="text-gray-700">{prod.minOrder}</span></span>
                    </div>

                    <div className="flex items-end justify-between mb-4">
                      <div>
                        <div className="font-sans font-black text-[#F77F00] text-xl leading-none">{prod.price}</div>
                        <div className="text-xs font-medium text-gray-400 mt-1">{prod.unit}</div>
                      </div>
                    </div>

                    <button className="w-full bg-white border-2 border-[#F77F00] hover:bg-[#F77F00] text-[#F77F00] hover:text-white font-bold py-2.5 px-4 rounded-xl transition-all shadow-sm flex justify-center items-center gap-2 group-hover:shadow-[0_4px_15px_rgb(247,127,0,0.2)]">
                      <ShoppingBag size={18} />
                      Pesan Sekarang
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {filteredProducts.length > 0 && (
          <div className="mt-12 flex justify-center">
            <button className="flex items-center gap-2 border-2 border-gray-200 hover:border-[#F77F00] hover:bg-orange-50 text-gray-600 hover:text-[#F77F00] font-bold text-sm px-8 py-3 rounded-2xl transition-all">
              Tampilkan Lebih Banyak
            </button>
          </div>
        )}
      </div>

      {/* ════════════════════════════════════════════════════════════════════════
          FLOATING CHATBOT BUTTON
      ════════════════════════════════════════════════════════════════════════ */}
      <div className="fixed bottom-10 right-10 z-50 group">
        <div className="absolute inset-0 bg-[#F77F00] rounded-full animate-ping opacity-50" />
        <button className="relative bg-[#F77F00] hover:bg-[#C25100] text-white p-5 rounded-full shadow-2xl transition-transform hover:scale-110 flex items-center justify-center border-4 border-white">
          <MessageSquare size={26} className="fill-white/20" />
        </button>
        <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-[#7A2E00] text-white text-xs font-bold py-2 px-3.5 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap pointer-events-none shadow-xl">
          Ceritakan Kebutuhanmu
          <div className="absolute right-[-5px] top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-[#7A2E00] rotate-45" />
        </div>
      </div>

    </div>
  );
}
