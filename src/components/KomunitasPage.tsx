import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Search, X, Heart, Share2, Eye, MessageSquare, ChevronDown,
  Globe, Package, ShieldCheck, MapPin, Clock, Send, Star,
  BookOpen, Recycle, Filter, ArrowRight, CheckCircle2, Sparkles,
  Upload, ChevronRight, ExternalLink, User
} from "lucide-react";

// ═══════════════════════════════════════════════════════════════════════════════
// BILINGUAL SYSTEM
// ═══════════════════════════════════════════════════════════════════════════════
type Lang = "id" | "en";

const TRANSLATIONS: Record<string, Record<Lang, string>> = {
  // Hero
  heroLabel: { id: "🌐 EXPORT HUB", en: "🌐 EXPORT HUB" },
  heroHeading: { id: "Hubungkan Koperasimu ke Pasar Global", en: "Connect Your Cooperative to Global Markets" },
  heroSub: { id: "Importir dari seluruh dunia mencari produk agro-marine Indonesia yang terverifikasi. Temukan mereka — atau biarkan mereka menemukan kamu.", en: "Importers worldwide are seeking verified Indonesian agro-marine products. Find them — or let them find you." },
  heroCtaPrimary: { id: "Post Penawaran", en: "Post Offer" },
  heroCtaSecondary: { id: "Cari Produk", en: "Find Products" },
  statKoperasi: { id: "Koperasi Terverifikasi", en: "Verified Cooperatives" },
  statNegara: { id: "Negara Pembeli Aktif", en: "Active Buyer Countries" },
  statTransaksi: { id: "Nilai Transaksi Bulan Ini", en: "Transaction Value This Month" },
  // Stats Bar
  statsOffers: { id: "Penawaran Aktif", en: "Active Offers" },
  statsRequests: { id: "Permintaan Terbuka", en: "Open Requests" },
  statsMatches: { id: "Match Berhasil", en: "Successful Matches" },
  statsRating: { id: "Rating Koperasi", en: "Cooperative Rating" },
  // Filter
  searchPlaceholder: { id: "Cari komoditas, koperasi, atau kebutuhan...", en: "Search commodities, cooperatives, or needs..." },
  askGroAI: { id: "🤖 Tanya Gro AI", en: "🤖 Ask Gro AI" },
  filterAll: { id: "Semua", en: "All" },
  filterOffer: { id: "Penawaran", en: "Offers" },
  filterRequest: { id: "Permintaan", en: "Requests" },
  filterEducation: { id: "Edukasi", en: "Education" },
  filterCoffee: { id: "Kopi & Rempah", en: "Coffee & Spices" },
  filterFish: { id: "Ikan & Laut", en: "Fish & Sea" },
  filterRice: { id: "Padi", en: "Rice" },
  filterShrimp: { id: "Udang", en: "Shrimp" },
  filterVegetable: { id: "Sayuran", en: "Vegetables" },
  filterPlantation: { id: "Perkebunan", en: "Plantation" },
  filterCircular: { id: "Limbah Sirkular", en: "Circular Waste" },
  filterVerified: { id: "✅ Verified Only", en: "✅ Verified Only" },
  filterExportReady: { id: "🌍 Ekspor Ready", en: "🌍 Export Ready" },
  filterStockReady: { id: "🔥 Stok Tersedia", en: "🔥 Stock Available" },
  filterSort: { id: "Urutkan ▾", en: "Sort ▾" },
  // Feed
  createPost: { id: "+ Buat Penawaran atau Permintaan", en: "+ Create Offer or Request" },
  loadMore: { id: "Muat Lebih Banyak", en: "Load More" },
  labelOffer: { id: "PENAWARAN", en: "OFFER" },
  labelRequest: { id: "PERMINTAAN", en: "REQUEST" },
  labelEducation: { id: "EDUKASI", en: "EDUCATION" },
  labelCircular: { id: "♻️ LIMBAH SIRKULAR", en: "♻️ CIRCULAR WASTE" },
  commodity: { id: "Komoditas", en: "Commodity" },
  volume: { id: "Volume", en: "Volume" },
  pricePerKg: { id: "Harga/kg", en: "Price/kg" },
  minOrder: { id: "Min. Order", en: "Min. Order" },
  frequency: { id: "Frekuensi", en: "Frequency" },
  standard: { id: "Standar", en: "Standard" },
  viewed: { id: "dilihat", en: "views" },
  responses: { id: "respons", en: "responses" },
  contactCoop: { id: "Hubungi Koperasi", en: "Contact Cooperative" },
  viewProfile: { id: "Lihat Profil", en: "View Profile" },
  submitOffer: { id: "Ajukan Penawaran", en: "Submit Offer" },
  checkGro: { id: "🤖 Cek Kelayakan di Gro AI", en: "🤖 Check Eligibility in Gro AI" },
  readMore: { id: "Baca Selengkapnya →", en: "Read More →" },
  contact: { id: "Hubungi", en: "Contact" },
  wasteType: { id: "Jenis", en: "Type" },
  condition: { id: "Kondisi", en: "Condition" },
  price: { id: "Harga", en: "Price" },
  // Sidebar
  profileComplete: { id: "Profil {n}% lengkap", en: "Profile {n}% complete" },
  completeProfile: { id: "Lengkapi Profil", en: "Complete Profile" },
  postOfferNow: { id: "Post Penawaran Sekarang", en: "Post Offer Now" },
  joinAs: { id: "Bergabung sebagai Koperasi atau Pembeli", en: "Join as Cooperative or Buyer" },
  registerFree: { id: "Daftar Gratis", en: "Register Free" },
  login: { id: "Masuk", en: "Sign In" },
  globalRequests: { id: "🌍 Permintaan dari Importir Global", en: "🌍 Requests from Global Importers" },
  apply: { id: "Ajukan", en: "Apply" },
  viewAllRequests: { id: "Lihat Semua Permintaan →", en: "View All Requests →" },
  groAITitle: { id: "🤖 Gro AI — Export Consultant", en: "🤖 Gro AI — Export Consultant" },
  groAISub: { id: "Siap ekspor? Tanya Gro AI tentang regulasi, dokumen, dan harga pasar.", en: "Ready to export? Ask Gro AI about regulations, documents, and market prices." },
  groAIPlaceholder: { id: "Contoh: Syarat ekspor udang ke Eropa?", en: "Example: Shrimp export requirements to Europe?" },
  groAIBtn: { id: "Tanya Gro AI →", en: "Ask Gro AI →" },
  featuredCoop: { id: "⭐ Koperasi Pilihan Minggu Ini", en: "⭐ Featured Cooperatives This Week" },
  exportGuide: { id: "📋 Mulai Ekspor dalam 4 Langkah", en: "📋 Start Exporting in 4 Steps" },
  guideStep1: { id: "Dapatkan Badge Verified Protected Farm", en: "Get Verified Protected Farm Badge" },
  guideStep2: { id: "Konsultasi kelayakan di Gro AI", en: "Consult eligibility with Gro AI" },
  guideStep3: { id: "Post penawaran di Connect", en: "Post offers on Connect" },
  guideStep4: { id: "Match dengan importir & mulai transaksi", en: "Match with importers & start trading" },
  guideQuestion: { id: "Punya pertanyaan? Tanya Gro AI →", en: "Have questions? Ask Gro AI →" },
  // Modal
  modalChooseType: { id: "Pilih Tipe Post", en: "Choose Post Type" },
  modalOfferProduct: { id: "📦 Penawaran Produk", en: "📦 Product Offer" },
  modalRequest: { id: "🔍 Permintaan / Kebutuhan", en: "🔍 Request / Need" },
  modalCircular: { id: "♻️ Limbah Sirkular", en: "♻️ Circular Waste" },
  modalEducation: { id: "📚 Edukasi / Tips", en: "📚 Education / Tips" },
  modalNext: { id: "Lanjut", en: "Next" },
  modalBack: { id: "Kembali", en: "Back" },
  modalPostTitle: { id: "Judul post *", en: "Post title *" },
  modalCommodity: { id: "Komoditas *", en: "Commodity *" },
  modalVolume: { id: "Volume tersedia *", en: "Available volume *" },
  modalPrice: { id: "Harga *", en: "Price *" },
  modalMinOrder: { id: "Minimum order", en: "Minimum order" },
  modalDesc: { id: "Deskripsi", en: "Description" },
  modalPhotos: { id: "Foto produk (max 3)", en: "Product photos (max 3)" },
  modalCerts: { id: "Sertifikasi", en: "Certifications" },
  modalExportReady: { id: "Ekspor ready?", en: "Export ready?" },
  modalPreview: { id: "Preview & Post", en: "Preview & Post" },
  modalPostNow: { id: "Post Sekarang", en: "Post Now" },
  // Empty
  emptyTitle: { id: "Belum ada post yang cocok dengan filter ini.", en: "No posts match this filter." },
  emptySub: { id: "Jadilah yang pertama post di kategori ini!", en: "Be the first to post in this category!" },
  emptyBtn: { id: "Buat Post", en: "Create Post" },
  // CTA
  ctaHeading: { id: "Siap Membawa Koperasimu ke Pasar Global?", en: "Ready to Take Your Cooperative Global?" },
  ctaSub: { id: "Bergabung dengan ribuan koperasi terverifikasi yang sudah terhubung dengan importir dari seluruh dunia.", en: "Join thousands of verified cooperatives already connected with importers worldwide." },
  ctaBtn: { id: "Mulai Sekarang — Gratis", en: "Get Started — Free" },
  // Toast
  toastSuccess: { id: "Post berhasil dibuat! 🎉", en: "Post created successfully! 🎉" },
  // Verified badge labels
  verifiedFarm: { id: "Verified Protected Farm", en: "Verified Protected Farm" },
  exportReady: { id: "Ekspor Ready", en: "Export Ready" },
  buyerVerified: { id: "Buyer Terverifikasi", en: "Verified Buyer" },
  // Country labels
  countryLabel: { id: "Negara", en: "Country" },
};

// ═══════════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════════
type PostType = "penawaran" | "permintaan" | "edukasi" | "limbah";
type FilterType = "semua" | "penawaran" | "permintaan" | "edukasi";
type CommodityFilter = "" | "kopi" | "ikan" | "padi" | "udang" | "sayuran" | "perkebunan" | "limbah";

interface PostBase {
  id: number;
  type: PostType;
  timestamp: string;
  views: number;
  responses: number;
  likes: number;
  tags: string[];
}

interface PostPenawaran extends PostBase {
  type: "penawaran";
  coopName: string;
  coopAvatar: string;
  coopLocation: string;
  verified: boolean;
  exportReady: boolean;
  title: string;
  description: string;
  commodity: string;
  volume: string;
  pricePerKg: string;
  minOrder: string;
  photos: string[];
}

interface PostPermintaan extends PostBase {
  type: "permintaan";
  buyerName: string;
  buyerAvatar: string;
  buyerCountry: string;
  buyerFlag: string;
  verified: boolean;
  title: string;
  description: string;
  commodity: string;
  volume: string;
  frequency: string;
  standard: string;
}

interface PostEdukasi extends PostBase {
  type: "edukasi";
  authorName: string;
  authorAvatar: string;
  title: string;
  preview: string;
}

interface PostLimbah extends PostBase {
  type: "limbah";
  coopName: string;
  coopAvatar: string;
  coopLocation: string;
  verified: boolean;
  title: string;
  wasteType: string;
  volume: string;
  condition: string;
  price: string;
}

type Post = PostPenawaran | PostPermintaan | PostEdukasi | PostLimbah;

// ═══════════════════════════════════════════════════════════════════════════════
// MOCK DATA
// ═══════════════════════════════════════════════════════════════════════════════
const MOCK_POSTS: Post[] = [
  {
    id: 1,
    type: "penawaran",
    coopName: "KUD Gayo Mandiri",
    coopAvatar: "GM",
    coopLocation: "Aceh Tengah, Aceh",
    verified: true,
    exportReady: true,
    title: "Kopi Arabika Gayo — Specialty Grade, Natural Process",
    description: "Kopi Arabika Gayo grade specialty dari ketinggian 1.400 mdpl. Diproses secara natural, rasa fruity dengan body tebal. Sudah lolos cupping test SCA 84+. Siap ekspor dengan dokumen lengkap.",
    commodity: "Kopi Arabika",
    volume: "500 kg/bln",
    pricePerKg: "Rp 85.000",
    minOrder: "100 kg",
    photos: [],
    timestamp: "2 jam lalu",
    views: 234,
    responses: 12,
    likes: 45,
    tags: ["Specialty Grade", "Natural Process", "Sertifikat Halal", "Aceh Tengah"],
  },
  {
    id: 2,
    type: "permintaan",
    buyerName: "Yamashita Trading Co., Ltd.",
    buyerAvatar: "YT",
    buyerCountry: "Jepang",
    buyerFlag: "🇯🇵",
    verified: true,
    title: "Mencari: Kopi Arabika Specialty Grade — 2 ton/bulan",
    description: "Kami perusahaan importir kopi Jepang yang mencari mitra koperasi Indonesia untuk pasokan rutin kopi arabika specialty. Dibutuhkan sertifikasi JAS Organic dan cupping score minimal 82.",
    commodity: "Kopi Arabika",
    volume: "2.000 kg/bln",
    frequency: "Bulanan",
    standard: "JAS Organic",
    timestamp: "5 jam lalu",
    views: 567,
    responses: 28,
    likes: 89,
    tags: ["Bersedia Kontrak Panjang", "FOB Banda Aceh", "Harga Kompetitif"],
  },
  {
    id: 3,
    type: "penawaran",
    coopName: "KUD Sari Laut",
    coopAvatar: "SL",
    coopLocation: "Aceh Besar, Aceh",
    verified: true,
    exportReady: true,
    title: "Udang Vaname Premium — Fresh Frozen, HACCP Certified",
    description: "Udang vaname ukuran 30-40 count, diproses di cold storage berstandar HACCP. Pengiriman via reefer container, minimum order 1 ton. Sudah ekspor ke Singapura dan Malaysia.",
    commodity: "Udang Vaname",
    volume: "3 ton/bln",
    pricePerKg: "Rp 120.000",
    minOrder: "1 ton",
    photos: [],
    timestamp: "6 jam lalu",
    views: 189,
    responses: 8,
    likes: 34,
    tags: ["HACCP", "Fresh Frozen", "30-40 Count", "Cold Chain"],
  },
  {
    id: 4,
    type: "edukasi",
    authorName: "Tim Agrou Connect",
    authorAvatar: "AC",
    title: "Panduan Lengkap: Cara Mendapatkan Sertifikat Ekspor untuk Komoditas Perikanan",
    preview: "Mengekspor produk perikanan membutuhkan beberapa sertifikat penting. Artikel ini membahas langkah demi langkah cara mendapatkan Health Certificate, HACCP, dan sertifikasi lainnya yang diperlukan untuk ekspor ke berbagai negara tujuan.",
    timestamp: "1 hari lalu",
    views: 1203,
    responses: 45,
    likes: 178,
    tags: ["Ekspor Perikanan", "Sertifikasi", "Panduan"],
  },
  {
    id: 5,
    type: "limbah",
    coopName: "KUD Padi Sejahtera",
    coopAvatar: "PS",
    coopLocation: "Subang, Jawa Barat",
    verified: true,
    title: "Tersedia: 800 kg Sekam Padi — cocok untuk bahan bakar biomass atau media tanam",
    wasteType: "Sekam Padi",
    volume: "800 kg",
    condition: "Kering, bersih",
    price: "Rp 500/kg",
    timestamp: "3 jam lalu",
    views: 78,
    responses: 3,
    likes: 12,
    tags: ["Biomass", "Media Tanam", "Tersedia Sekarang"],
  },
  {
    id: 6,
    type: "permintaan",
    buyerName: "Al Habtoor Foods LLC",
    buyerAvatar: "AH",
    buyerCountry: "UAE",
    buyerFlag: "🇦🇪",
    verified: true,
    title: "Mencari: Udang Vaname Head-On, 5 ton/bulan untuk Hotel Chain",
    description: "Kami perusahaan F&B yang memasok ke hotel chain di Dubai dan Abu Dhabi. Butuh udang vaname head-on ukuran 16-20 count dengan standar halal MUI dan HACCP compliance.",
    commodity: "Udang Vaname",
    volume: "5.000 kg/bln",
    frequency: "Bulanan",
    standard: "Halal MUI + HACCP",
    timestamp: "8 jam lalu",
    views: 412,
    responses: 15,
    likes: 67,
    tags: ["Kontrak 12 Bulan", "CIF Dubai", "Premium Grade"],
  },
  {
    id: 7,
    type: "penawaran",
    coopName: "KUD Mina Bahari",
    coopAvatar: "MB",
    coopLocation: "Cilacap, Jawa Tengah",
    verified: true,
    exportReady: false,
    title: "Ikan Tuna Sirip Kuning — Sashimi Grade, Hook & Line",
    description: "Ikan tuna sirip kuning ditangkap dengan metode hook & line untuk menjaga kualitas sashimi grade. Diproses langsung di TPI dengan suhu terjaga. Tersedia CO treated dan non-CO.",
    commodity: "Ikan Tuna",
    volume: "2 ton/bln",
    pricePerKg: "Rp 95.000",
    minOrder: "500 kg",
    photos: [],
    timestamp: "12 jam lalu",
    views: 156,
    responses: 6,
    likes: 23,
    tags: ["Sashimi Grade", "Hook & Line", "Sustainable Fishing"],
  },
  {
    id: 8,
    type: "edukasi",
    authorName: "Dinas Perikanan Aceh",
    authorAvatar: "DP",
    title: "Tips Sukses: Cara Memenuhi Standar Food Safety untuk Pasar Uni Eropa",
    preview: "Pasar Uni Eropa memiliki standar food safety yang ketat. Pelajari bagaimana koperasi perikanan di Aceh berhasil memenuhi regulasi EU dan meraih kontrak ekspor pertama mereka ke Spanyol dan Belanda.",
    timestamp: "2 hari lalu",
    views: 890,
    responses: 32,
    likes: 145,
    tags: ["Food Safety", "Uni Eropa", "Best Practice"],
  },
  {
    id: 9,
    type: "permintaan",
    buyerName: "BioGreen GmbH",
    buyerAvatar: "BG",
    buyerCountry: "Jerman",
    buyerFlag: "🇩🇪",
    verified: true,
    title: "Mencari: Minyak Kelapa Virgin Organic — 1 ton/bulan",
    description: "Perusahaan produk organik Jerman mencari mitra koperasi untuk minyak kelapa virgin cold-pressed. Wajib sertifikasi EU Organic dan fair trade preferred.",
    commodity: "Minyak Kelapa",
    volume: "1.000 kg/bln",
    frequency: "Bulanan",
    standard: "EU Organic",
    timestamp: "1 hari lalu",
    views: 345,
    responses: 19,
    likes: 56,
    tags: ["Cold Pressed", "Fair Trade", "FOB Jakarta"],
  },
  {
    id: 10,
    type: "limbah",
    coopName: "KUD Kelapa Jaya",
    coopAvatar: "KJ",
    coopLocation: "Indragiri Hilir, Riau",
    verified: true,
    title: "Tersedia: 2 ton Sabut Kelapa & Tempurung — siap kirim untuk industri",
    wasteType: "Sabut Kelapa & Tempurung",
    volume: "2.000 kg",
    condition: "Kering, sudah sortir",
    price: "Rp 1.200/kg",
    timestamp: "4 jam lalu",
    views: 95,
    responses: 5,
    likes: 18,
    tags: ["Cocopeat", "Arang Aktif", "Industri"],
  },
];

const GLOBAL_REQUESTS = [
  { flag: "🇯🇵", country: "Jepang", commodity: "Kopi Arabika", volume: "2T/bln" },
  { flag: "🇦🇪", country: "UAE", commodity: "Udang Vaname", volume: "5T/bln" },
  { flag: "🇩🇪", country: "Jerman", commodity: "Minyak Kelapa Virgin", volume: "1T/bln" },
  { flag: "🇸🇬", country: "Singapura", commodity: "Beras Organik", volume: "3T/bln" },
];

const FEATURED_COOPS = [
  { avatar: "SL", name: "KUD Sari Laut", location: "Aceh Besar", commodities: "Ikan Tuna, Udang, Rumput Laut" },
  { avatar: "GM", name: "KUD Gayo Mandiri", location: "Aceh Tengah", commodities: "Kopi Arabika, Rempah" },
];

// ═══════════════════════════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════════════════════════
function Avatar({ initials, size = 48, color = "#1B4332" }: { initials: string; size?: number; color?: string }) {
  return (
    <div
      className="rounded-full flex items-center justify-center font-black text-white shrink-0"
      style={{
        width: size, height: size,
        background: `linear-gradient(135deg, ${color}, ${color}dd)`,
        fontSize: size * 0.33,
      }}
    >
      {initials}
    </div>
  );
}

function VerifiedBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1 text-[10px] font-semibold tracking-wide px-2 py-0.5 rounded-full border"
      style={{ background: "#ECFDF5", borderColor: "#6EE7B7", color: "#065F46" }}>
      <ShieldCheck size={10} /> {label}
    </span>
  );
}

function ExportReadyBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1 text-[10px] font-semibold tracking-wide px-2 py-0.5 rounded-full border animate-pulse-subtle"
      style={{ background: "#EFF6FF", borderColor: "#BFDBFE", color: "#1D4ED8" }}>
      🌍 {label}
    </span>
  );
}

// Count-up hook
function useCountUp(target: number, duration: number = 1500) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started) {
        setStarted(true);
      }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [started, target, duration]);

  return { count, ref };
}

// ═══════════════════════════════════════════════════════════════════════════════
// HERO SECTION
// ═══════════════════════════════════════════════════════════════════════════════
function HeroSection({ t, onOpenModal, onScrollToFeed }: { t: (k: string) => string; onOpenModal: () => void; onScrollToFeed: () => void }) {
  return (
    <section className="relative overflow-hidden" style={{ minHeight: 320, background: "linear-gradient(135deg, #1B4332 0%, #0F766E 100%)" }}>
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-[0.05]"
        style={{ backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.5) 10px, rgba(255,255,255,0.5) 11px)" }} />
      <div className="max-w-[1280px] mx-auto px-6 md:px-8 py-12 md:py-16 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Left Column (60%) */}
          <div className="flex-1 lg:w-[60%] text-center lg:text-left">
            <div className="inline-flex items-center gap-2 border border-white/30 rounded-full px-4 py-1.5 mb-5">
              <span className="text-[11px] font-black text-white/90 uppercase tracking-[0.1em]">{t("heroLabel")}</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-[42px] font-black text-white leading-[1.15] tracking-[-0.02em] mb-4">
              {t("heroHeading")}
            </h1>
            <p className="text-base md:text-lg text-white/75 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
              {t("heroSub")}
            </p>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <button
                onClick={onOpenModal}
                className="px-7 py-3 rounded-full font-bold text-sm text-white shadow-lg shadow-orange-900/30 transition-all hover:brightness-110 active:scale-[0.97] cursor-pointer"
                style={{ background: "#F4A261" }}
              >
                {t("heroCtaPrimary")}
              </button>
              <button
                onClick={onScrollToFeed}
                className="px-7 py-3 rounded-full font-bold text-sm text-white border-[1.5px] border-white/60 hover:bg-white/10 active:scale-[0.97] transition-all cursor-pointer"
              >
                {t("heroCtaSecondary")}
              </button>
            </div>
          </div>
          {/* Right Column (40%) — Stat Cards */}
          <div className="w-full lg:w-[40%] flex flex-row lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 scrollbar-hide">
            {[
              { icon: "🌾", value: "2.400+", label: t("statKoperasi") },
              { icon: "🌍", value: "47", label: t("statNegara") },
              { icon: "📦", value: "Rp 12M+", label: t("statTransaksi") },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.15, duration: 0.5 }}
                className="min-w-[160px] lg:min-w-0 flex items-center gap-4 px-5 py-4 rounded-xl"
                style={{ background: "rgba(255,255,255,0.13)", backdropFilter: "blur(8px)" }}
              >
                <span className="text-2xl">{s.icon}</span>
                <div>
                  <p className="text-xl font-black text-white leading-tight">{s.value}</p>
                  <p className="text-[11px] font-semibold text-white/65 mt-0.5">{s.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// STATS BAR
// ═══════════════════════════════════════════════════════════════════════════════
function StatsBar({ t }: { t: (k: string) => string }) {
  const s1 = useCountUp(847);
  const s2 = useCountUp(234);
  const s3 = useCountUp(1203);

  return (
    <div ref={s1.ref} className="bg-white border-b border-[#E5E7EB]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8">
        <div className="flex items-center justify-center gap-0 h-12 overflow-x-auto scrollbar-hide text-center">
          {[
            { icon: "✅", val: s1.count, label: t("statsOffers") },
            { icon: "🔍", val: s2.count, label: t("statsRequests") },
            { icon: "🤝", val: s3.count, label: t("statsMatches") },
            { icon: "⭐", val: "4.8/5", label: t("statsRating"), isStr: true },
          ].map((item, i) => (
            <div key={i} className="flex items-center">
              {i > 0 && <div className="w-px h-5 bg-gray-200 mx-3 md:mx-5 shrink-0" />}
              <div className="flex items-center gap-1.5 whitespace-nowrap shrink-0">
                <span className="text-xs">{item.icon}</span>
                <span className="text-sm font-black text-gray-900">
                  {(item as any).isStr ? item.val : item.val.toLocaleString()}
                </span>
                <span className="text-[11px] font-medium text-gray-500">{item.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// STICKY FILTER & SEARCH BAR
// ═══════════════════════════════════════════════════════════════════════════════
function FilterBar({
  t, activeFilter, setActiveFilter, activeCommodity, setActiveCommodity,
  searchQuery, setSearchQuery, verifiedOnly, setVerifiedOnly,
  exportOnly, setExportOnly, stockOnly, setStockOnly, onAskGroAI,
}: {
  t: (k: string) => string;
  activeFilter: FilterType; setActiveFilter: (f: FilterType) => void;
  activeCommodity: CommodityFilter; setActiveCommodity: (c: CommodityFilter) => void;
  searchQuery: string; setSearchQuery: (s: string) => void;
  verifiedOnly: boolean; setVerifiedOnly: (v: boolean) => void;
  exportOnly: boolean; setExportOnly: (v: boolean) => void;
  stockOnly: boolean; setStockOnly: (v: boolean) => void;
  onAskGroAI: () => void;
}) {
  const filterTypes: { key: FilterType; label: string }[] = [
    { key: "semua", label: t("filterAll") },
    { key: "penawaran", label: t("filterOffer") },
    { key: "permintaan", label: t("filterRequest") },
    { key: "edukasi", label: t("filterEducation") },
  ];

  const commodityFilters: { key: CommodityFilter; label: string }[] = [
    { key: "kopi", label: t("filterCoffee") },
    { key: "ikan", label: t("filterFish") },
    { key: "padi", label: t("filterRice") },
    { key: "udang", label: t("filterShrimp") },
    { key: "sayuran", label: t("filterVegetable") },
    { key: "perkebunan", label: t("filterPlantation") },
    { key: "limbah", label: t("filterCircular") },
  ];

  const PillBtn = ({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) => (
    <button
      onClick={onClick}
      className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-150 cursor-pointer shrink-0 active:scale-95 ${
        active ? "bg-[#1B4332] text-white shadow-sm" : "border border-gray-300 text-gray-600 hover:border-gray-400 hover:bg-gray-50"
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className="sticky top-[52px] z-40 bg-white border-b border-[#F3F4F6] shadow-sm">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8 py-3">
        {/* Search Row */}
        <div className="relative mb-3">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder={t("searchPlaceholder")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 pl-10 pr-36 rounded-xl border border-gray-200 text-sm font-medium text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-[#1B4332] focus:ring-2 focus:ring-[#1B4332]/10 transition-all"
          />
          <button
            onClick={onAskGroAI}
            className="absolute right-1.5 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] text-white text-[11px] font-bold hover:brightness-110 transition-all cursor-pointer"
          >
            {t("askGroAI")}
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-1">
          {filterTypes.map((f) => (
            <PillBtn key={f.key} active={activeFilter === f.key} onClick={() => setActiveFilter(f.key)}>
              {f.label}
            </PillBtn>
          ))}
          <div className="w-px h-5 bg-gray-200 shrink-0 mx-1" />
          {commodityFilters.map((c) => (
            <PillBtn key={c.key} active={activeCommodity === c.key} onClick={() => setActiveCommodity(activeCommodity === c.key ? "" : c.key)}>
              {c.label}
            </PillBtn>
          ))}
          <div className="w-px h-5 bg-gray-200 shrink-0 mx-1" />
          <PillBtn active={verifiedOnly} onClick={() => setVerifiedOnly(!verifiedOnly)}>{t("filterVerified")}</PillBtn>
          <PillBtn active={exportOnly} onClick={() => setExportOnly(!exportOnly)}>{t("filterExportReady")}</PillBtn>
          <PillBtn active={stockOnly} onClick={() => setStockOnly(!stockOnly)}>{t("filterStockReady")}</PillBtn>
          <PillBtn active={false} onClick={() => {}}>{t("filterSort")}</PillBtn>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// POST CARDS
// ═══════════════════════════════════════════════════════════════════════════════

// ── PENAWARAN CARD ──
function PenawaranCard({ post, t, onViewProfile }: { post: PostPenawaran; t: (k: string) => string; onViewProfile: () => void }) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="bg-white rounded-2xl overflow-hidden transition-all duration-200 hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] hover:-translate-y-0.5 group"
      style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}
    >
      {/* Hover accent border */}
      <div className="flex">
        <div className="w-0 group-hover:w-[3px] bg-[#1B4332] transition-all duration-200 shrink-0" />
        <div className="flex-1 p-5">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-start gap-3">
              <Avatar initials={post.coopAvatar} size={48} color="#1B4332" />
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-[#111827] text-sm">{post.coopName}</span>
                  {post.verified && <VerifiedBadge label={t("verifiedFarm")} />}
                </div>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <span className="text-[11px] text-[#6B7280] flex items-center gap-1"><MapPin size={10} /> {post.coopLocation}</span>
                  <span className="text-[11px] text-[#6B7280] flex items-center gap-1"><Clock size={10} /> {post.timestamp}</span>
                  {post.exportReady && <ExportReadyBadge label={t("exportReady")} />}
                </div>
              </div>
            </div>
          </div>

          {/* Label */}
          <div className="inline-flex items-center gap-1.5 bg-orange-50 border border-orange-200 text-[#F4A261] px-3 py-1 rounded-full mb-3">
            <Package size={11} />
            <span className="text-[10px] font-black uppercase tracking-[0.05em]">{t("labelOffer")}</span>
          </div>

          {/* Title & Description */}
          <h3 className="font-bold text-[#111827] text-[15px] mb-2 leading-snug">{post.title}</h3>
          <p className="text-sm text-[#6B7280] leading-relaxed mb-4 line-clamp-3">{post.description}</p>

          {/* Info Grid */}
          <div className="bg-[#FAFAF8] border border-[#E5E7EB] rounded-xl p-3.5 mb-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { icon: "📦", label: t("commodity"), value: post.commodity },
                { icon: "📊", label: t("volume"), value: post.volume },
                { icon: "💰", label: t("pricePerKg"), value: post.pricePerKg },
                { icon: "🚢", label: t("minOrder"), value: post.minOrder },
              ].map((item, i) => (
                <div key={i}>
                  <p className="text-[9px] font-black text-[#6B7280] uppercase tracking-wider mb-0.5">{item.icon} {item.label}</p>
                  <p className="text-xs font-bold text-[#111827]">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {post.tags.map((tag) => (
              <span key={tag} className="text-[10px] font-bold text-[#1B4332] bg-green-50 border border-green-100 px-2 py-0.5 rounded-full">
                {tag}
              </span>
            ))}
          </div>

          {/* Engagement */}
          <div className="flex items-center gap-4 text-[11px] text-[#6B7280] mb-4">
            <span className="flex items-center gap-1"><Eye size={12} /> {post.views} {t("viewed")}</span>
            <span className="flex items-center gap-1"><MessageSquare size={12} /> {post.responses} {t("responses")}</span>
            <span className="flex items-center gap-1">❤️ {likeCount}</span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 flex-wrap">
            <button className="px-5 py-2.5 rounded-full bg-[#1B4332] text-white font-bold text-xs hover:bg-[#14532D] transition-all cursor-pointer active:scale-[0.97]">
              {t("contactCoop")}
            </button>
            <button
              onClick={onViewProfile}
              className="px-5 py-2.5 rounded-full border-[1.5px] border-[#1B4332] text-[#1B4332] font-bold text-xs hover:bg-[#ECFDF5] transition-all cursor-pointer active:scale-[0.97]"
            >
              {t("viewProfile")}
            </button>
            <button className="ml-auto p-2 rounded-full hover:bg-gray-100 text-[#6B7280] transition-all cursor-pointer">
              <Share2 size={14} />
            </button>
            <button
              onClick={() => { setLiked(!liked); setLikeCount(c => liked ? c - 1 : c + 1); }}
              className={`p-2 rounded-full transition-all cursor-pointer ${liked ? "bg-red-50 text-red-500" : "hover:bg-gray-100 text-[#6B7280]"}`}
            >
              <Heart size={14} className={liked ? "fill-red-500" : ""} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── PERMINTAAN CARD ──
function PermintaanCard({ post, t, onAskGroAI }: { post: PostPermintaan; t: (k: string) => string; onAskGroAI: (prompt: string) => void }) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="bg-white rounded-2xl overflow-hidden transition-all duration-200 hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] hover:-translate-y-0.5 group"
      style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}
    >
      <div className="flex">
        <div className="w-0 group-hover:w-[3px] bg-[#1D4ED8] transition-all duration-200 shrink-0" />
        <div className="flex-1 p-5">
          {/* Header */}
          <div className="flex items-start gap-3 mb-3">
            <Avatar initials={post.buyerAvatar} size={48} color="#1D4ED8" />
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-[#111827] text-sm">{post.buyerName}</span>
                {post.verified && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full border"
                    style={{ background: "#EFF6FF", borderColor: "#BFDBFE", color: "#1D4ED8" }}>
                    🌍 {t("buyerVerified")}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 mt-1 flex-wrap">
                <span className="text-[11px] text-[#6B7280]">{t("countryLabel")}: {post.buyerCountry} {post.buyerFlag}</span>
                <span className="text-[11px] text-[#6B7280] flex items-center gap-1"><Clock size={10} /> {post.timestamp}</span>
              </div>
            </div>
          </div>

          {/* Label */}
          <div className="inline-flex items-center gap-1.5 bg-blue-50 border border-blue-200 text-[#1D4ED8] px-3 py-1 rounded-full mb-3">
            <Search size={11} />
            <span className="text-[10px] font-black uppercase tracking-[0.05em]">{t("labelRequest")}</span>
          </div>

          <h3 className="font-bold text-[#111827] text-[15px] mb-2 leading-snug">{post.title}</h3>
          <p className="text-sm text-[#6B7280] leading-relaxed mb-4 line-clamp-3">{post.description}</p>

          {/* Info Grid */}
          <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-3.5 mb-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { icon: "📦", label: t("commodity"), value: post.commodity },
                { icon: "📊", label: t("volume"), value: post.volume },
                { icon: "🗓️", label: t("frequency"), value: post.frequency },
                { icon: "🏅", label: t("standard"), value: post.standard },
              ].map((item, i) => (
                <div key={i}>
                  <p className="text-[9px] font-black text-[#6B7280] uppercase tracking-wider mb-0.5">{item.icon} {item.label}</p>
                  <p className="text-xs font-bold text-[#111827]">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5 mb-4">
            {post.tags.map((tag) => (
              <span key={tag} className="text-[10px] font-bold text-[#1D4ED8] bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-full">
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-4 text-[11px] text-[#6B7280] mb-4">
            <span className="flex items-center gap-1"><Eye size={12} /> {post.views} {t("viewed")}</span>
            <span className="flex items-center gap-1"><MessageSquare size={12} /> {post.responses} {t("responses")}</span>
            <span className="flex items-center gap-1">❤️ {likeCount}</span>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button className="px-5 py-2.5 rounded-full bg-[#1D4ED8] text-white font-bold text-xs hover:bg-[#1E40AF] transition-all cursor-pointer active:scale-[0.97]">
              {t("submitOffer")}
            </button>
            <button
              onClick={() => onAskGroAI(`Ada importir dari ${post.buyerCountry} yang butuh ${post.volume} ${post.commodity} per bulan dengan standar ${post.standard}. Apakah koperasi saya layak dan apa yang perlu disiapkan?`)}
              className="px-5 py-2.5 rounded-full border-[1.5px] border-[#1D4ED8] text-[#1D4ED8] font-bold text-xs hover:bg-blue-50 transition-all cursor-pointer active:scale-[0.97]"
            >
              {t("checkGro")}
            </button>
            <button
              onClick={() => { setLiked(!liked); setLikeCount(c => liked ? c - 1 : c + 1); }}
              className={`ml-auto p-2 rounded-full transition-all cursor-pointer ${liked ? "bg-red-50 text-red-500" : "hover:bg-gray-100 text-[#6B7280]"}`}
            >
              <Heart size={14} className={liked ? "fill-red-500" : ""} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── EDUKASI CARD ──
function EdukasiCard({ post, t }: { post: PostEdukasi; t: (k: string) => string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="rounded-2xl overflow-hidden transition-all duration-200 hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] hover:-translate-y-0.5"
      style={{ background: "#F0FDF4", border: "1px solid #BBF7D0", boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}
    >
      <div className="p-5">
        <div className="flex items-start gap-3 mb-3">
          <Avatar initials={post.authorAvatar} size={48} color="#0F766E" />
          <div>
            <span className="font-bold text-[#111827] text-sm">{post.authorName}</span>
            <div className="flex items-center gap-2 mt-1">
              <div className="inline-flex items-center gap-1.5 bg-green-100 border border-green-200 text-[#065F46] px-3 py-1 rounded-full">
                <BookOpen size={11} />
                <span className="text-[10px] font-black uppercase tracking-[0.05em]">{t("labelEducation")}</span>
              </div>
              <span className="text-[11px] text-[#6B7280] flex items-center gap-1"><Clock size={10} /> {post.timestamp}</span>
            </div>
          </div>
        </div>

        <h3 className="font-bold text-[#111827] text-[15px] mb-2 leading-snug">{post.title}</h3>
        <p className="text-sm text-[#6B7280] leading-relaxed mb-4 line-clamp-3">{post.preview}</p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {post.tags.map((tag) => (
            <span key={tag} className="text-[10px] font-bold text-[#065F46] bg-green-100 px-2 py-0.5 rounded-full">{tag}</span>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-[11px] text-[#6B7280]">
            <span className="flex items-center gap-1"><Eye size={12} /> {post.views} {t("viewed")}</span>
            <span className="flex items-center gap-1"><MessageSquare size={12} /> {post.responses}</span>
          </div>
          <button className="text-[#0F766E] font-bold text-xs hover:underline cursor-pointer flex items-center gap-1">
            {t("readMore")} <ArrowRight size={12} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ── LIMBAH SIRKULAR CARD ──
function LimbahCard({ post, t }: { post: PostLimbah; t: (k: string) => string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="bg-white rounded-2xl overflow-hidden transition-all duration-200 hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] hover:-translate-y-0.5 group"
      style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}
    >
      <div className="flex">
        <div className="w-0 group-hover:w-[3px] bg-[#7C3AED] transition-all duration-200 shrink-0" />
        <div className="flex-1 p-5">
          <div className="flex items-start gap-3 mb-3">
            <Avatar initials={post.coopAvatar} size={48} color="#7C3AED" />
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-[#111827] text-sm">{post.coopName}</span>
                {post.verified && <VerifiedBadge label={t("verifiedFarm")} />}
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[11px] text-[#6B7280] flex items-center gap-1"><MapPin size={10} /> {post.coopLocation}</span>
                <span className="text-[11px] text-[#6B7280] flex items-center gap-1"><Clock size={10} /> {post.timestamp}</span>
              </div>
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 bg-purple-50 border border-purple-200 text-[#7C3AED] px-3 py-1 rounded-full mb-3">
            <Recycle size={11} />
            <span className="text-[10px] font-black uppercase tracking-[0.05em]">{t("labelCircular")}</span>
          </div>

          <h3 className="font-bold text-[#111827] text-[15px] mb-3 leading-snug">{post.title}</h3>

          <div className="bg-purple-50/50 border border-purple-100 rounded-xl p-3.5 mb-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: t("wasteType"), value: post.wasteType },
                { label: t("volume"), value: post.volume },
                { label: t("condition"), value: post.condition },
                { label: t("price"), value: post.price },
              ].map((item, i) => (
                <div key={i}>
                  <p className="text-[9px] font-black text-[#6B7280] uppercase tracking-wider mb-0.5">{item.label}</p>
                  <p className="text-xs font-bold text-[#111827]">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5 mb-4">
            {post.tags.map((tag) => (
              <span key={tag} className="text-[10px] font-bold text-[#7C3AED] bg-purple-50 border border-purple-100 px-2 py-0.5 rounded-full">{tag}</span>
            ))}
          </div>

          <button className="px-5 py-2.5 rounded-full bg-[#7C3AED] text-white font-bold text-xs hover:bg-[#6D28D9] transition-all cursor-pointer active:scale-[0.97]">
            {t("contact")}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SKELETON LOADER
// ═══════════════════════════════════════════════════════════════════════════════
function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl p-5 animate-pulse" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
      <div className="flex items-start gap-3 mb-4">
        <div className="w-12 h-12 rounded-full bg-gray-200" />
        <div className="flex-1">
          <div className="h-4 bg-gray-200 rounded-full w-2/3 mb-2" />
          <div className="h-3 bg-gray-100 rounded-full w-1/2" />
        </div>
      </div>
      <div className="h-3 bg-gray-200 rounded-full w-1/4 mb-3" />
      <div className="h-4 bg-gray-200 rounded-full w-full mb-2" />
      <div className="h-4 bg-gray-200 rounded-full w-5/6 mb-4" />
      <div className="bg-gray-100 rounded-xl p-3 mb-4">
        <div className="grid grid-cols-4 gap-3">
          {[1,2,3,4].map(i => <div key={i} className="h-8 bg-gray-200 rounded" />)}
        </div>
      </div>
      <div className="flex gap-2">
        <div className="h-8 bg-gray-200 rounded-full w-24" />
        <div className="h-8 bg-gray-200 rounded-full w-20" />
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SIDEBAR CARDS
// ═══════════════════════════════════════════════════════════════════════════════

function SidebarProfile({ t, onOpenModal }: { t: (k: string) => string; onOpenModal: () => void }) {
  const isLoggedIn = true; // mock

  if (!isLoggedIn) {
    return (
      <div className="bg-white rounded-2xl p-5" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
        <p className="text-sm font-bold text-[#111827] mb-3">{t("joinAs")}</p>
        <div className="flex gap-2">
          <button className="flex-1 py-2 rounded-full bg-[#1B4332] text-white font-bold text-xs cursor-pointer">{t("registerFree")}</button>
          <button className="flex-1 py-2 rounded-full border-[1.5px] border-[#1B4332] text-[#1B4332] font-bold text-xs cursor-pointer">{t("login")}</button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-5" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
      <div className="flex items-center gap-3 mb-3">
        <Avatar initials="MH" size={56} color="#1B4332" />
        <div>
          <p className="font-bold text-[#111827] text-sm">KUD Tani Makmur</p>
          <VerifiedBadge label={t("verifiedFarm")} />
        </div>
      </div>
      {/* Progress bar */}
      <div className="mb-3">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[11px] font-medium text-[#6B7280]">{t("profileComplete").replace("{n}", "70")}</span>
          <button className="text-[11px] font-bold text-[#0F766E] hover:underline cursor-pointer">{t("completeProfile")}</button>
        </div>
        <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-[#1B4332] to-[#0F766E] rounded-full" style={{ width: "70%" }} />
        </div>
      </div>
      <button
        onClick={onOpenModal}
        className="w-full py-2.5 rounded-full bg-[#1B4332] text-white font-bold text-xs hover:bg-[#14532D] transition-all cursor-pointer active:scale-[0.97]"
      >
        {t("postOfferNow")}
      </button>
    </div>
  );
}

function SidebarGlobalRequests({ t }: { t: (k: string) => string }) {
  return (
    <div className="bg-white rounded-2xl p-5" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
      <h3 className="font-bold text-[#111827] text-sm mb-3">{t("globalRequests")}</h3>
      <div className="space-y-2.5">
        {GLOBAL_REQUESTS.map((req, i) => (
          <div key={i} className="flex items-center justify-between gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-[#111827] truncate">
                {req.flag} {req.country} — {req.commodity}
              </p>
              <p className="text-[10px] text-[#6B7280]">{req.volume}</p>
            </div>
            <button className="text-[10px] font-bold text-[#1D4ED8] hover:underline cursor-pointer shrink-0">[{t("apply")}]</button>
          </div>
        ))}
      </div>
      <button className="w-full mt-3 text-[11px] font-bold text-[#0F766E] hover:underline cursor-pointer text-center">
        {t("viewAllRequests")}
      </button>
    </div>
  );
}

function SidebarGroAI({ t, onNavigateGroAI }: { t: (k: string) => string; onNavigateGroAI: (prompt: string) => void }) {
  const [input, setInput] = useState("");

  return (
    <div className="rounded-2xl p-5 text-white" style={{ background: "linear-gradient(135deg, #1E3A5F, #1D4ED8)" }}>
      <h3 className="font-bold text-sm mb-1">{t("groAITitle")}</h3>
      <p className="text-xs text-white/70 leading-relaxed mb-3">{t("groAISub")}</p>
      <div className="relative mb-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter" && input.trim()) onNavigateGroAI(input); }}
          placeholder={t("groAIPlaceholder")}
          className="w-full h-9 pl-3 pr-3 rounded-lg bg-white/15 border border-white/20 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-white/50 transition-all"
        />
      </div>
      <button
        onClick={() => { if (input.trim()) onNavigateGroAI(input); }}
        className="w-full py-2 rounded-lg bg-white/20 hover:bg-white/30 text-white font-bold text-xs transition-all cursor-pointer active:scale-[0.97]"
      >
        {t("groAIBtn")}
      </button>
    </div>
  );
}

function SidebarFeaturedCoops({ t }: { t: (k: string) => string }) {
  return (
    <div className="bg-white rounded-2xl p-5" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
      <h3 className="font-bold text-[#111827] text-sm mb-3">{t("featuredCoop")}</h3>
      <div className="space-y-3">
        {FEATURED_COOPS.map((coop, i) => (
          <div key={i} className="p-3 rounded-xl border border-gray-100 hover:border-[#1B4332]/30 hover:bg-green-50/30 transition-all cursor-pointer">
            <div className="flex items-center gap-2.5 mb-1.5">
              <Avatar initials={coop.avatar} size={36} color="#1B4332" />
              <div>
                <p className="text-xs font-bold text-[#111827]">{coop.name}</p>
                <p className="text-[10px] text-[#6B7280]">{coop.location}</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[9px] font-semibold text-[#065F46] bg-green-50 border border-green-100 px-1.5 py-0.5 rounded-full">✅ Verified</span>
              <span className="text-[9px] font-semibold text-[#1D4ED8] bg-blue-50 border border-blue-100 px-1.5 py-0.5 rounded-full">🌍 Ekspor Ready</span>
            </div>
            <p className="text-[10px] text-[#6B7280] mt-1.5">Komoditas: {coop.commodities}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function SidebarExportGuide({ t, onNavigateGroAI }: { t: (k: string) => string; onNavigateGroAI: (prompt: string) => void }) {
  const steps = [
    { icon: "✅", text: t("guideStep1") },
    { icon: "🤖", text: t("guideStep2") },
    { icon: "📝", text: t("guideStep3") },
    { icon: "🤝", text: t("guideStep4") },
  ];

  return (
    <div className="bg-white rounded-2xl p-5" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
      <h3 className="font-bold text-[#111827] text-sm mb-3">{t("exportGuide")}</h3>
      <div className="space-y-3">
        {steps.map((step, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className="w-7 h-7 rounded-full bg-[#ECFDF5] flex items-center justify-center text-xs font-black text-[#1B4332] shrink-0 border border-green-100">
              {i + 1}
            </div>
            <div className="flex items-center gap-2 pt-1">
              <span className="text-sm">{step.icon}</span>
              <p className="text-xs text-[#111827] font-medium leading-snug">{step.text}</p>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() => onNavigateGroAI("Saya ingin memulai ekspor, apa langkah pertama?")}
        className="mt-4 text-[11px] font-bold text-[#0F766E] hover:underline cursor-pointer"
      >
        {t("guideQuestion")}
      </button>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// CREATE POST MODAL
// ═══════════════════════════════════════════════════════════════════════════════
function CreatePostModal({ t, onClose, onSuccess }: { t: (k: string) => string; onClose: () => void; onSuccess: () => void }) {
  const [step, setStep] = useState(1);
  const [postType, setPostType] = useState<PostType | "">("");
  const [formData, setFormData] = useState({
    title: "", commodity: "", volume: "", price: "", minOrder: "", description: "", exportReady: false,
  });

  const types = [
    { key: "penawaran" as PostType, label: t("modalOfferProduct"), color: "#F4A261" },
    { key: "permintaan" as PostType, label: t("modalRequest"), color: "#1D4ED8" },
    { key: "limbah" as PostType, label: t("modalCircular"), color: "#7C3AED" },
    { key: "edukasi" as PostType, label: t("modalEducation"), color: "#0F766E" },
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[200] flex items-end md:items-center justify-center"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white w-full md:max-w-[600px] md:rounded-[20px] rounded-t-[20px] max-h-[90vh] overflow-y-auto shadow-2xl"
        >
          {/* Progress bar */}
          <div className="flex items-center gap-0 p-4 border-b border-gray-100">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex-1 flex items-center">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black shrink-0 transition-all ${
                  step >= s ? "bg-[#1B4332] text-white" : "bg-gray-100 text-gray-400"
                }`}>{s}</div>
                {s < 3 && <div className={`flex-1 h-0.5 mx-1.5 rounded-full transition-all ${step > s ? "bg-[#1B4332]" : "bg-gray-100"}`} />}
              </div>
            ))}
            <button onClick={onClose} className="ml-3 p-1 rounded-full hover:bg-gray-100 text-gray-400 cursor-pointer">
              <X size={18} />
            </button>
          </div>

          <div className="p-6">
            {/* Step 1: Choose Type */}
            {step === 1 && (
              <div>
                <h3 className="font-black text-[#111827] text-lg mb-1">{t("modalChooseType")}</h3>
                <p className="text-sm text-[#6B7280] mb-5">Pilih jenis post yang ingin kamu buat</p>
                <div className="grid grid-cols-2 gap-3">
                  {types.map((tp) => (
                    <button
                      key={tp.key}
                      onClick={() => setPostType(tp.key)}
                      className={`p-5 rounded-xl border-2 text-left transition-all cursor-pointer hover:shadow-md ${
                        postType === tp.key ? "shadow-md" : "border-gray-100 hover:border-gray-300"
                      }`}
                      style={postType === tp.key ? { borderColor: tp.color, background: `${tp.color}08` } : {}}
                    >
                      <p className="text-2xl mb-2">{tp.label.split(" ")[0]}</p>
                      <p className="text-xs font-bold text-[#111827]">{tp.label.substring(tp.label.indexOf(" ") + 1)}</p>
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => { if (postType) setStep(2); }}
                  disabled={!postType}
                  className="w-full mt-5 py-3 rounded-full bg-[#1B4332] text-white font-bold text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#14532D] transition-all cursor-pointer active:scale-[0.97]"
                >
                  {t("modalNext")} <ChevronRight size={14} className="inline ml-1" />
                </button>
              </div>
            )}

            {/* Step 2: Form */}
            {step === 2 && (
              <div>
                <h3 className="font-black text-[#111827] text-lg mb-5">Detail Post</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-[#6B7280] mb-1.5 uppercase tracking-wider">{t("modalPostTitle")}</label>
                    <input
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full h-10 px-3 rounded-xl border border-gray-200 text-sm font-medium focus:outline-none focus:border-[#1B4332] focus:ring-2 focus:ring-[#1B4332]/10 transition-all"
                      placeholder="Judul yang menarik perhatian..."
                    />
                  </div>

                  {(postType === "penawaran" || postType === "permintaan" || postType === "limbah") && (
                    <>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-bold text-[#6B7280] mb-1.5 uppercase tracking-wider">{t("modalCommodity")}</label>
                          <select
                            value={formData.commodity}
                            onChange={(e) => setFormData({ ...formData, commodity: e.target.value })}
                            className="w-full h-10 px-3 rounded-xl border border-gray-200 text-sm font-medium focus:outline-none focus:border-[#1B4332] transition-all bg-white"
                          >
                            <option value="">Pilih...</option>
                            <option>Kopi Arabika</option>
                            <option>Kopi Robusta</option>
                            <option>Udang Vaname</option>
                            <option>Ikan Tuna</option>
                            <option>Rumput Laut</option>
                            <option>Beras Organik</option>
                            <option>Minyak Kelapa</option>
                            <option>Rempah-rempah</option>
                            <option>Sekam Padi</option>
                            <option>Lainnya</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-[#6B7280] mb-1.5 uppercase tracking-wider">{t("modalVolume")}</label>
                          <input
                            value={formData.volume}
                            onChange={(e) => setFormData({ ...formData, volume: e.target.value })}
                            className="w-full h-10 px-3 rounded-xl border border-gray-200 text-sm font-medium focus:outline-none focus:border-[#1B4332] transition-all"
                            placeholder="Contoh: 500 kg/bln"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-bold text-[#6B7280] mb-1.5 uppercase tracking-wider">{t("modalPrice")}</label>
                          <input
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            className="w-full h-10 px-3 rounded-xl border border-gray-200 text-sm font-medium focus:outline-none focus:border-[#1B4332] transition-all"
                            placeholder="Rp .../kg"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-[#6B7280] mb-1.5 uppercase tracking-wider">{t("modalMinOrder")}</label>
                          <input
                            value={formData.minOrder}
                            onChange={(e) => setFormData({ ...formData, minOrder: e.target.value })}
                            className="w-full h-10 px-3 rounded-xl border border-gray-200 text-sm font-medium focus:outline-none focus:border-[#1B4332] transition-all"
                            placeholder="Contoh: 100 kg"
                          />
                        </div>
                      </div>
                    </>
                  )}

                  <div>
                    <label className="block text-xs font-bold text-[#6B7280] mb-1.5 uppercase tracking-wider">{t("modalDesc")}</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={3}
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm font-medium focus:outline-none focus:border-[#1B4332] focus:ring-2 focus:ring-[#1B4332]/10 transition-all resize-none"
                      placeholder="Deskripsikan penawaran atau kebutuhan Anda..."
                    />
                  </div>

                  {postType === "penawaran" && (
                    <>
                      <div>
                        <label className="block text-xs font-bold text-[#6B7280] mb-1.5 uppercase tracking-wider">{t("modalPhotos")}</label>
                        <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 text-center hover:border-[#1B4332]/40 transition-colors cursor-pointer">
                          <Upload size={20} className="mx-auto text-gray-400 mb-1" />
                          <p className="text-xs text-gray-400">Klik atau drag foto di sini</p>
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[#6B7280] mb-1.5 uppercase tracking-wider">{t("modalCerts")}</label>
                        <div className="flex flex-wrap gap-2">
                          {["Halal", "Organik", "SNI", "GAP", "HACCP", "JAS", "EU Organic"].map((cert) => (
                            <button key={cert} className="text-[10px] font-bold text-gray-600 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-full hover:border-[#1B4332] hover:text-[#1B4332] hover:bg-green-50 transition-all cursor-pointer">
                              {cert}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center justify-between bg-gray-50 rounded-xl p-3">
                        <div>
                          <p className="text-xs font-bold text-[#111827]">{t("modalExportReady")}</p>
                          <p className="text-[10px] text-[#6B7280]">Aktifkan jika produk siap ekspor</p>
                        </div>
                        <button
                          onClick={() => setFormData({ ...formData, exportReady: !formData.exportReady })}
                          className={`w-10 h-5 rounded-full transition-all cursor-pointer ${formData.exportReady ? "bg-[#1B4332]" : "bg-gray-300"}`}
                        >
                          <div className={`w-4 h-4 bg-white rounded-full shadow transition-transform ${formData.exportReady ? "translate-x-5" : "translate-x-0.5"}`} />
                        </button>
                      </div>
                    </>
                  )}
                </div>

                <div className="flex gap-2 mt-6">
                  <button
                    onClick={() => setStep(1)}
                    className="px-5 py-3 rounded-full border border-gray-200 text-[#6B7280] font-bold text-sm hover:bg-gray-50 transition-all cursor-pointer"
                  >
                    {t("modalBack")}
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    disabled={!formData.title}
                    className="flex-1 py-3 rounded-full bg-[#1B4332] text-white font-bold text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#14532D] transition-all cursor-pointer active:scale-[0.97]"
                  >
                    {t("modalPreview")} <ChevronRight size={14} className="inline ml-1" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Preview */}
            {step === 3 && (
              <div>
                <h3 className="font-black text-[#111827] text-lg mb-5">{t("modalPreview")}</h3>
                {/* Preview Card */}
                <div className="bg-[#FAFAF8] border border-[#E5E7EB] rounded-2xl p-5 mb-5">
                  <div className="flex items-center gap-3 mb-3">
                    <Avatar initials="MH" size={40} color="#1B4332" />
                    <div>
                      <p className="text-sm font-bold text-[#111827]">KUD Tani Makmur</p>
                      <div className="flex items-center gap-2">
                        <VerifiedBadge label="Verified Protected Farm" />
                      </div>
                    </div>
                  </div>
                  <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full mb-3 text-[10px] font-black uppercase tracking-[0.05em] ${
                    postType === "penawaran" ? "bg-orange-50 border border-orange-200 text-[#F4A261]" :
                    postType === "permintaan" ? "bg-blue-50 border border-blue-200 text-[#1D4ED8]" :
                    postType === "limbah" ? "bg-purple-50 border border-purple-200 text-[#7C3AED]" :
                    "bg-green-50 border border-green-200 text-[#065F46]"
                  }`}>
                    {postType === "penawaran" ? t("labelOffer") :
                     postType === "permintaan" ? t("labelRequest") :
                     postType === "limbah" ? t("labelCircular") : t("labelEducation")}
                  </div>
                  <h4 className="font-bold text-[#111827] text-sm mb-2">{formData.title || "Judul post..."}</h4>
                  <p className="text-xs text-[#6B7280] mb-3">{formData.description || "Deskripsi post..."}</p>
                  {formData.commodity && (
                    <div className="bg-white rounded-xl border border-gray-100 p-3">
                      <div className="grid grid-cols-2 gap-2 text-[10px]">
                        <div><span className="font-black text-gray-400 uppercase">{t("commodity")}:</span> <span className="font-bold text-[#111827]">{formData.commodity}</span></div>
                        <div><span className="font-black text-gray-400 uppercase">{t("volume")}:</span> <span className="font-bold text-[#111827]">{formData.volume}</span></div>
                        <div><span className="font-black text-gray-400 uppercase">{t("price")}:</span> <span className="font-bold text-[#111827]">{formData.price}</span></div>
                        <div><span className="font-black text-gray-400 uppercase">{t("minOrder")}:</span> <span className="font-bold text-[#111827]">{formData.minOrder}</span></div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setStep(2)}
                    className="px-5 py-3 rounded-full border border-gray-200 text-[#6B7280] font-bold text-sm hover:bg-gray-50 transition-all cursor-pointer"
                  >
                    {t("modalBack")}
                  </button>
                  <button
                    onClick={() => { onSuccess(); onClose(); }}
                    className="flex-1 py-3 rounded-full bg-[#1B4332] text-white font-bold text-sm hover:bg-[#14532D] transition-all cursor-pointer active:scale-[0.97] shadow-lg shadow-green-900/20"
                  >
                    {t("modalPostNow")} <CheckCircle2 size={14} className="inline ml-1" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// EMPTY STATE
// ═══════════════════════════════════════════════════════════════════════════════
function EmptyState({ t, onOpenModal }: { t: (k: string) => string; onOpenModal: () => void }) {
  return (
    <div className="bg-white rounded-2xl p-10 text-center" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
      <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gray-100 flex items-center justify-center">
        <Package size={28} className="text-gray-300" />
      </div>
      <h4 className="font-bold text-[#111827] text-sm mb-1">{t("emptyTitle")}</h4>
      <p className="text-xs text-[#6B7280] mb-4">{t("emptySub")}</p>
      <button
        onClick={onOpenModal}
        className="px-6 py-2.5 rounded-full bg-[#1B4332] text-white font-bold text-xs hover:bg-[#14532D] transition-all cursor-pointer active:scale-[0.97]"
      >
        {t("emptyBtn")}
      </button>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// CTA SECTION
// ═══════════════════════════════════════════════════════════════════════════════
function CTASection({ t }: { t: (k: string) => string }) {
  return (
    <section className="py-16 md:py-20" style={{ background: "linear-gradient(135deg, #1B4332, #0F766E)" }}>
      <div className="max-w-[800px] mx-auto px-6 md:px-8 text-center">
        <h2 className="text-2xl md:text-3xl font-black text-white leading-tight tracking-[-0.02em] mb-4">
          {t("ctaHeading")}
        </h2>
        <p className="text-sm md:text-base text-white/70 leading-relaxed mb-8 max-w-lg mx-auto">
          {t("ctaSub")}
        </p>
        <button className="px-8 py-3.5 rounded-full font-bold text-sm text-white shadow-lg shadow-orange-900/30 hover:brightness-110 transition-all cursor-pointer active:scale-[0.97]"
          style={{ background: "#F4A261" }}>
          {t("ctaBtn")}
        </button>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// TOAST
// ═══════════════════════════════════════════════════════════════════════════════
function Toast({ message, visible }: { message: string; visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: 20 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-6 right-6 z-[300] bg-[#1B4332] text-white px-5 py-3 rounded-xl shadow-2xl font-bold text-sm flex items-center gap-2"
        >
          <CheckCircle2 size={16} />
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN PAGE COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════
export default function KomunitasPage() {
  // Language
  const [lang, setLang] = useState<Lang>("id");
  const t = useCallback((key: string): string => {
    return TRANSLATIONS[key]?.[lang] ?? key;
  }, [lang]);

  // Filters
  const [activeFilter, setActiveFilter] = useState<FilterType>("semua");
  const [activeCommodity, setActiveCommodity] = useState<CommodityFilter>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [exportOnly, setExportOnly] = useState(false);
  const [stockOnly, setStockOnly] = useState(false);

  // Feed
  const [visibleCount, setVisibleCount] = useState(6);
  const [loading, setLoading] = useState(true);

  // Modal & Toast
  const [modalOpen, setModalOpen] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);

  // Sidebar mobile accordion
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const feedRef = useRef<HTMLDivElement>(null);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Filter posts
  const filteredPosts = MOCK_POSTS.filter((post) => {
    // Type filter
    if (activeFilter === "penawaran" && post.type !== "penawaran") return false;
    if (activeFilter === "permintaan" && post.type !== "permintaan") return false;
    if (activeFilter === "edukasi" && post.type !== "edukasi") return false;

    // Commodity filter
    if (activeCommodity) {
      const lowerTags = post.tags.map(t => t.toLowerCase()).join(" ");
      const text = (post as any).commodity?.toLowerCase() || (post as any).title?.toLowerCase() || "";
      const combined = lowerTags + " " + text;
      if (activeCommodity === "kopi" && !combined.includes("kopi") && !combined.includes("coffee")) return false;
      if (activeCommodity === "ikan" && !combined.includes("ikan") && !combined.includes("tuna") && !combined.includes("fish")) return false;
      if (activeCommodity === "udang" && !combined.includes("udang") && !combined.includes("vaname") && !combined.includes("shrimp")) return false;
      if (activeCommodity === "padi" && !combined.includes("padi") && !combined.includes("beras") && !combined.includes("sekam") && !combined.includes("rice")) return false;
      if (activeCommodity === "sayuran" && !combined.includes("sayur") && !combined.includes("tomat") && !combined.includes("cabai") && !combined.includes("vegetable")) return false;
      if (activeCommodity === "perkebunan" && !combined.includes("kelapa") && !combined.includes("sawit") && !combined.includes("plantation")) return false;
      if (activeCommodity === "limbah" && post.type !== "limbah") return false;
    }

    // Verified filter
    if (verifiedOnly) {
      if (post.type === "penawaran" && !(post as PostPenawaran).verified) return false;
      if (post.type === "permintaan" && !(post as PostPermintaan).verified) return false;
      if (post.type === "limbah" && !(post as PostLimbah).verified) return false;
    }

    // Export ready filter
    if (exportOnly && post.type === "penawaran" && !(post as PostPenawaran).exportReady) return false;

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const searchable = JSON.stringify(post).toLowerCase();
      if (!searchable.includes(q)) return false;
    }

    return true;
  });

  const visiblePosts = filteredPosts.slice(0, visibleCount);

  const handlePostSuccess = () => {
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000);
  };

  const handleNavigateGroAI = (_prompt: string) => {
    // In real app, would navigate to LadangAI with prompt
    // For now, simulate by alert or console
    console.log("Navigate to Gro AI with prompt:", _prompt);
  };

  const handleScrollToFeed = () => {
    feedRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen" style={{ background: "#FAFAF8" }}>
      {/* Language Toggle */}
      <div className="fixed top-[58px] right-4 z-50">
        <button
          onClick={() => setLang(lang === "id" ? "en" : "id")}
          className="flex items-center gap-1.5 bg-white/90 backdrop-blur-md border border-gray-200 rounded-full px-3 py-1.5 text-[11px] font-bold text-[#111827] shadow-sm hover:shadow-md transition-all cursor-pointer"
        >
          <Globe size={12} />
          {lang === "id" ? "EN" : "ID"}
        </button>
      </div>

      {/* Hero */}
      <HeroSection t={t} onOpenModal={() => setModalOpen(true)} onScrollToFeed={handleScrollToFeed} />

      {/* Stats Bar */}
      <StatsBar t={t} />

      {/* Filter Bar */}
      <FilterBar
        t={t}
        activeFilter={activeFilter} setActiveFilter={setActiveFilter}
        activeCommodity={activeCommodity} setActiveCommodity={setActiveCommodity}
        searchQuery={searchQuery} setSearchQuery={setSearchQuery}
        verifiedOnly={verifiedOnly} setVerifiedOnly={setVerifiedOnly}
        exportOnly={exportOnly} setExportOnly={setExportOnly}
        stockOnly={stockOnly} setStockOnly={setStockOnly}
        onAskGroAI={() => handleNavigateGroAI(searchQuery || "Bantu saya menemukan pembeli")}
      />

      {/* Main Content */}
      <div className="max-w-[1280px] mx-auto px-6 md:px-8 py-8" ref={feedRef}>
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Column — Feed (65%) */}
          <div className="flex-1 lg:w-[65%] space-y-4">
            {/* Create Post Button */}
            <button
              onClick={() => setModalOpen(true)}
              className="w-full p-4 rounded-2xl border-2 border-dashed border-[#1B4332]/30 bg-[#ECFDF5]/50 text-[#1B4332] font-bold text-sm hover:bg-[#ECFDF5] hover:border-[#1B4332]/50 transition-all cursor-pointer active:scale-[0.99] text-center"
            >
              {t("createPost")}
            </button>

            {/* Feed */}
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => <SkeletonCard key={i} />)}
              </div>
            ) : visiblePosts.length === 0 ? (
              <EmptyState t={t} onOpenModal={() => setModalOpen(true)} />
            ) : (
              <div className="space-y-4">
                {visiblePosts.map((post) => {
                  if (post.type === "penawaran") return <PenawaranCard key={post.id} post={post} t={t} onViewProfile={() => {}} />;
                  if (post.type === "permintaan") return <PermintaanCard key={post.id} post={post} t={t} onAskGroAI={handleNavigateGroAI} />;
                  if (post.type === "edukasi") return <EdukasiCard key={post.id} post={post} t={t} />;
                  if (post.type === "limbah") return <LimbahCard key={post.id} post={post} t={t} />;
                  return null;
                })}

                {/* Load More */}
                {visibleCount < filteredPosts.length && (
                  <button
                    onClick={() => setVisibleCount((c) => c + 4)}
                    className="w-full py-3 rounded-xl border border-gray-200 text-[#111827] font-bold text-sm hover:bg-gray-50 transition-all cursor-pointer active:scale-[0.99]"
                  >
                    {t("loadMore")} ({filteredPosts.length - visibleCount} lagi)
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Right Column — Sidebar (35%) */}
          {/* Desktop sidebar */}
          <div className="hidden lg:block lg:w-[35%]">
            <div className="sticky top-[160px] space-y-4">
              <SidebarProfile t={t} onOpenModal={() => setModalOpen(true)} />
              <SidebarGlobalRequests t={t} />
              <SidebarGroAI t={t} onNavigateGroAI={handleNavigateGroAI} />
              <SidebarFeaturedCoops t={t} />
              <SidebarExportGuide t={t} onNavigateGroAI={handleNavigateGroAI} />
            </div>
          </div>

          {/* Mobile sidebar accordion */}
          <div className="lg:hidden">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="w-full flex items-center justify-between p-4 bg-white rounded-2xl font-bold text-sm text-[#111827] cursor-pointer"
              style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}
            >
              <span>📊 Info & Tools</span>
              <ChevronDown size={16} className={`transition-transform ${sidebarOpen ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {sidebarOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="space-y-4 pt-4">
                    <SidebarProfile t={t} onOpenModal={() => setModalOpen(true)} />
                    <SidebarGlobalRequests t={t} />
                    <SidebarGroAI t={t} onNavigateGroAI={handleNavigateGroAI} />
                    <SidebarFeaturedCoops t={t} />
                    <SidebarExportGuide t={t} onNavigateGroAI={handleNavigateGroAI} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <CTASection t={t} />

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && (
          <CreatePostModal t={t} onClose={() => setModalOpen(false)} onSuccess={handlePostSuccess} />
        )}
      </AnimatePresence>

      {/* Toast */}
      <Toast message={t("toastSuccess")} visible={toastVisible} />

      {/* CSS for verified badge glow */}
      <style>{`
        @keyframes pulse-subtle {
          0%, 100% { box-shadow: 0 0 0 0 rgba(110, 231, 183, 0); }
          50% { box-shadow: 0 0 8px 2px rgba(110, 231, 183, 0.3); }
        }
        .animate-pulse-subtle {
          animation: pulse-subtle 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
