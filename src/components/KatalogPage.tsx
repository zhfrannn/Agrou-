import { useState, useMemo } from "react";
import {
  Star, ShoppingCart, ChevronLeft, ChevronRight, Filter, X, ChevronDown,
} from "lucide-react";

// ─── DATA ──────────────────────────────────────────────────────────────────

const ALL_PRODUCTS = [
  {
    id: 1,
    name: "Fungisida Tricyclazole 75WP 100ml",
    cat: "Pestisida",
    price: 75000,
    originalPrice: 92000,
    discount: 18,
    rating: 4.8,
    sold: "1.2rb",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80&w=400",
    komoditas: ["Padi"],
    tipe: ["Satuan"],
  },
  {
    id: 2,
    name: "Pupuk NPK Mutiara 16-16-16 1kg",
    cat: "Pupuk",
    price: 55000,
    originalPrice: 70000,
    discount: 21,
    rating: 4.6,
    sold: "3.4rb",
    image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&q=80&w=400",
    komoditas: ["Padi", "Jagung", "Cabai"],
    tipe: ["Satuan"],
  },
  {
    id: 3,
    name: "Paket Solusi Blast Padi Pro",
    cat: "Bundle",
    price: 185000,
    originalPrice: 230000,
    discount: 20,
    rating: 4.9,
    sold: "987",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=400",
    komoditas: ["Padi"],
    tipe: ["Bundle/Paket"],
  },
  {
    id: 4,
    name: "Benih Padi Ciherang Premium 5kg",
    cat: "Benih",
    price: 115000,
    originalPrice: 135000,
    discount: 15,
    rating: 4.8,
    sold: "2.1rb",
    image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&q=80&w=400",
    komoditas: ["Padi"],
    tipe: ["Satuan", "Bersertifikat"],
  },
  {
    id: 5,
    name: "Insektisida Fipronil 200SC 250ml",
    cat: "Pestisida",
    price: 68000,
    originalPrice: 82000,
    discount: 17,
    rating: 4.6,
    sold: "1.8rb",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80&w=400",
    komoditas: ["Padi", "Jagung"],
    tipe: ["Satuan"],
  },
  {
    id: 6,
    name: "Pupuk Kalium Klorida (KCl) 1kg",
    cat: "Pupuk",
    price: 89000,
    originalPrice: 110000,
    discount: 19,
    rating: 4.7,
    sold: "765",
    image: "https://images.unsplash.com/photo-1592982537447-6f29fb443831?auto=format&fit=crop&q=80&w=400",
    komoditas: ["Cabai", "Jagung"],
    tipe: ["Satuan"],
  },
  {
    id: 7,
    name: "Probiotik Udang Super Concentrated 1L",
    cat: "Probiotik",
    price: 95000,
    originalPrice: null,
    discount: 0,
    rating: 4.9,
    sold: "543",
    image: "https://images.unsplash.com/photo-1574226516831-e1dff420e562?auto=format&fit=crop&q=80&w=400",
    komoditas: ["Udang"],
    tipe: ["Satuan"],
  },
  {
    id: 8,
    name: "Beauveria Bassiana 100g — Organik",
    cat: "Hayati",
    price: 62000,
    originalPrice: 80000,
    discount: 22,
    rating: 4.5,
    sold: "312",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&q=80&w=400",
    komoditas: ["Padi", "Cabai"],
    tipe: ["Satuan", "Organik", "Bersertifikat"],
  },
  {
    id: 9,
    name: "Benih Cabai Rawit HOT Unggul 10g",
    cat: "Benih",
    price: 32000,
    originalPrice: 42000,
    discount: 24,
    rating: 4.5,
    sold: "2.8rb",
    image: "https://images.unsplash.com/photo-1592982537447-6f29fb443831?auto=format&fit=crop&q=80&w=400",
    komoditas: ["Cabai"],
    tipe: ["Satuan"],
  },
  {
    id: 10,
    name: "Paket Antraknosa Cabai Lengkap",
    cat: "Bundle",
    price: 175000,
    originalPrice: 210000,
    discount: 17,
    rating: 4.8,
    sold: "421",
    image: "https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&q=80&w=400",
    komoditas: ["Cabai"],
    tipe: ["Bundle/Paket"],
  },
  {
    id: 11,
    name: "Hormon Auksin Sintetik NAA 50ml",
    cat: "Hormon",
    price: 42000,
    originalPrice: null,
    discount: 0,
    rating: 4.4,
    sold: "198",
    image: "https://images.unsplash.com/photo-1585336261022-680e295ce3fe?auto=format&fit=crop&q=80&w=400",
    komoditas: ["Cabai", "Lainnya"],
    tipe: ["Satuan"],
  },
  {
    id: 12,
    name: "Pupuk Daun Gandasil-D 250g",
    cat: "Pupuk",
    price: 38000,
    originalPrice: 48000,
    discount: 21,
    rating: 4.3,
    sold: "1.4rb",
    image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&q=80&w=400",
    komoditas: ["Cabai", "Padi", "Jagung"],
    tipe: ["Satuan"],
  },
  {
    id: 13,
    name: "Perangkap Lalat Buah Yellow Trap 10pcs",
    cat: "Perangkap",
    price: 45000,
    originalPrice: 55000,
    discount: 18,
    rating: 4.2,
    sold: "876",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&q=80&w=400",
    komoditas: ["Cabai", "Lainnya"],
    tipe: ["Satuan", "Organik"],
  },
  {
    id: 14,
    name: "Probiotik Tambak Vaname Pro 1L",
    cat: "Probiotik",
    price: 120000,
    originalPrice: 150000,
    discount: 20,
    rating: 4.7,
    sold: "234",
    image: "https://images.unsplash.com/photo-1574226516831-e1dff420e562?auto=format&fit=crop&q=80&w=400",
    komoditas: ["Udang", "Ikan"],
    tipe: ["Satuan"],
  },
  {
    id: 15,
    name: "Paket Wereng Batang Coklat Super",
    cat: "Bundle",
    price: 195000,
    originalPrice: 240000,
    discount: 19,
    rating: 4.8,
    sold: "567",
    image: "https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?auto=format&fit=crop&q=80&w=400",
    komoditas: ["Padi"],
    tipe: ["Bundle/Paket"],
  },
  {
    id: 16,
    name: "Fungisida Mankozeb 80WP 500g",
    cat: "Pestisida",
    price: 58000,
    originalPrice: 72000,
    discount: 19,
    rating: 4.5,
    sold: "1.1rb",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80&w=400",
    komoditas: ["Padi", "Cabai"],
    tipe: ["Satuan"],
  },
  {
    id: 17,
    name: "Benih Jagung Hibrida Pioneer 36B 1kg",
    cat: "Benih",
    price: 88000,
    originalPrice: null,
    discount: 0,
    rating: 4.7,
    sold: "654",
    image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&q=80&w=400",
    komoditas: ["Jagung"],
    tipe: ["Satuan", "Bersertifikat"],
  },
  {
    id: 18,
    name: "Pupuk NPK Phonska Plus 5kg",
    cat: "Pupuk",
    price: 72000,
    originalPrice: 88000,
    discount: 18,
    rating: 4.6,
    sold: "2.3rb",
    image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&q=80&w=400",
    komoditas: ["Padi", "Jagung", "Cabai"],
    tipe: ["Satuan"],
  },
  {
    id: 19,
    name: "Trichoderma Harzianum Hayati 100g",
    cat: "Hayati",
    price: 48000,
    originalPrice: 60000,
    discount: 20,
    rating: 4.4,
    sold: "289",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&q=80&w=400",
    komoditas: ["Padi", "Cabai"],
    tipe: ["Satuan", "Organik"],
  },
  {
    id: 20,
    name: "Paket Nutrisi Rumput Laut Pro",
    cat: "Bundle",
    price: 145000,
    originalPrice: 178000,
    discount: 19,
    rating: 4.6,
    sold: "143",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=400",
    komoditas: ["Rumput Laut"],
    tipe: ["Bundle/Paket"],
  },
];

const CATEGORIES = [
  "Semua Produk",
  "Pestisida",
  "Pupuk",
  "Bundle",
  "Benih",
  "Hormon",
  "Probiotik",
  "Hayati",
  "Perangkap",
];

const CAT_COLORS: Record<string, string> = {
  Pestisida: "bg-green-100 text-green-800",
  Pupuk: "bg-blue-100 text-blue-800",
  Bundle: "bg-orange-100 text-orange-800",
  Benih: "bg-amber-100 text-amber-700",
  Hormon: "bg-purple-100 text-purple-700",
  Probiotik: "bg-cyan-100 text-cyan-700",
  Hayati: "bg-emerald-100 text-emerald-700",
  Perangkap: "bg-rose-100 text-rose-700",
};

const SORT_OPTIONS = ["Populer", "Terbaru", "Terlaris", "Harga ↑", "Harga ↓"];

function formatRp(n: number) {
  return "Rp " + n.toLocaleString("id-ID");
}

// ─── PRODUCT CARD ─────────────────────────────────────────────────────────

function ProductCard({ prod }: { prod: typeof ALL_PRODUCTS[number]; key?: any }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col group cursor-pointer">
      {/* Image */}
      <div className="relative aspect-square bg-gray-50 overflow-hidden">
        <img
          src={prod.image}
          alt={prod.name}
          className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-500"
        />
        {/* Discount badge top-right */}
        {prod.discount > 0 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-[10px] font-black px-1.5 py-0.5 rounded shadow-sm">
            -{prod.discount}%
          </div>
        )}
        {/* Category badge top-left */}
        <div className={`absolute top-2 left-2 text-[9px] font-bold px-2 py-0.5 rounded-full ${CAT_COLORS[prod.cat] ?? "bg-gray-100 text-gray-600"}`}>
          {prod.cat}
        </div>
      </div>

      {/* Info */}
      <div className="p-3 flex flex-col flex-1">
        <p className="font-medium text-gray-800 text-[12px] leading-snug line-clamp-2 flex-1 mb-2">
          {prod.name}
        </p>

        {/* Prices */}
        <div className="mb-1">
          {prod.originalPrice && (
            <p className="text-gray-400 text-[10px] line-through leading-none mb-0.5">
              {formatRp(prod.originalPrice)}
            </p>
          )}
          <p className="font-black text-[#1B4D3E] text-sm leading-none">
            {formatRp(prod.price)}
          </p>
        </div>

        {/* Rating & Sold */}
        <div className="flex items-center gap-1 mb-3">
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                size={10}
                className={s <= Math.round(prod.rating) ? "fill-[#F59E0B] text-[#F59E0B]" : "fill-gray-200 text-gray-200"}
              />
            ))}
          </div>
          <span className="text-gray-400 text-[10px]">{prod.rating}</span>
          <span className="text-gray-300 text-[10px]">·</span>
          <span className="text-gray-400 text-[10px]">{prod.sold} terjual</span>
        </div>

        {/* Add to cart */}
        <button className="w-full border border-[#1B4D3E] text-[#1B4D3E] hover:bg-[#1B4D3E] hover:text-white text-[11px] font-bold py-1.5 rounded-xl transition-all flex items-center justify-center gap-1.5">
          <ShoppingCart size={12} />
          Keranjang
        </button>
      </div>
    </div>
  );
}

// ─── FILTER PANEL ─────────────────────────────────────────────────────────

interface FilterState {
  komoditas: string[];
  tipe: string[];
  minPrice: string;
  maxPrice: string;
  rating: string[];
  pengiriman: string[];
}

function FilterPanel({
  activeCategory,
  onCategoryChange,
  filters,
  onFiltersChange,
}: {
  activeCategory: string;
  onCategoryChange: (c: string) => void;
  filters: FilterState;
  onFiltersChange: (f: FilterState) => void;
}) {
  const toggle = (key: keyof FilterState, value: string) => {
    const arr = filters[key] as string[];
    const next = arr.includes(value) ? arr.filter((x) => x !== value) : [...arr, value];
    onFiltersChange({ ...filters, [key]: next });
  };

  return (
    <aside className="w-full bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-[#1B4D3E] px-4 py-3">
        <p className="text-white font-black text-sm tracking-wide">≡ Semua Kategori</p>
      </div>

      {/* Categories */}
      <div className="p-3">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 mb-0.5 ${
              activeCategory === cat
                ? "bg-orange-50 text-[#F97316] font-bold border-l-[3px] border-[#F97316]"
                : "text-gray-600 hover:bg-gray-50 hover:text-[#1B4D3E]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <hr className="border-gray-100" />

      {/* Filter sections */}
      <div className="p-4 space-y-5">
        <p className="font-black text-gray-800 text-sm tracking-wider uppercase">Filter</p>

        {/* Komoditas */}
        <div>
          <p className="font-bold text-gray-700 text-xs mb-2 uppercase tracking-wide">Komoditas</p>
          <div className="space-y-1.5">
            {["Padi", "Jagung", "Cabai", "Udang", "Rumput Laut", "Ikan", "Lainnya"].map((item) => (
              <label key={item} className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.komoditas.includes(item)}
                  onChange={() => toggle("komoditas", item)}
                  className="w-3.5 h-3.5 accent-[#1B4D3E] cursor-pointer"
                />
                <span className="text-xs text-gray-600 group-hover:text-gray-900 transition-colors">{item}</span>
              </label>
            ))}
          </div>
        </div>

        <hr className="border-gray-100" />

        {/* Rentang Harga */}
        <div>
          <p className="font-bold text-gray-700 text-xs mb-2 uppercase tracking-wide">Rentang Harga</p>
          <div className="flex items-center gap-1.5 mb-2">
            <input
              type="number"
              placeholder="Min"
              value={filters.minPrice}
              onChange={(e) => onFiltersChange({ ...filters, minPrice: e.target.value })}
              className="w-full border border-gray-200 rounded-lg text-[11px] px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#1B4D3E] text-gray-700"
            />
            <span className="text-gray-400 text-xs shrink-0">–</span>
            <input
              type="number"
              placeholder="Max"
              value={filters.maxPrice}
              onChange={(e) => onFiltersChange({ ...filters, maxPrice: e.target.value })}
              className="w-full border border-gray-200 rounded-lg text-[11px] px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#1B4D3E] text-gray-700"
            />
          </div>
          <button
            onClick={() => {}}
            className="w-full bg-[#1B4D3E] hover:bg-[#163D30] text-white text-[11px] font-bold py-1.5 rounded-lg transition-colors"
          >
            Terapkan
          </button>
        </div>

        <hr className="border-gray-100" />

        {/* Tipe Produk */}
        <div>
          <p className="font-bold text-gray-700 text-xs mb-2 uppercase tracking-wide">Tipe Produk</p>
          <div className="space-y-1.5">
            {["Satuan", "Bundle/Paket", "Organik", "Bersertifikat"].map((item) => (
              <label key={item} className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.tipe.includes(item)}
                  onChange={() => toggle("tipe", item)}
                  className="w-3.5 h-3.5 accent-[#1B4D3E] cursor-pointer"
                />
                <span className="text-xs text-gray-600 group-hover:text-gray-900 transition-colors">{item}</span>
              </label>
            ))}
          </div>
        </div>

        <hr className="border-gray-100" />

        {/* Rating */}
        <div>
          <p className="font-bold text-gray-700 text-xs mb-2 uppercase tracking-wide">Rating</p>
          <div className="space-y-1.5">
            {["4", "3"].map((r) => (
              <label key={r} className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.rating.includes(r)}
                  onChange={() => toggle("rating", r)}
                  className="w-3.5 h-3.5 accent-[#1B4D3E] cursor-pointer"
                />
                <span className="flex items-center gap-0.5">
                  {[1,2,3,4,5].map((s) => (
                    <Star key={s} size={10} className={s <= Number(r) ? "fill-[#F59E0B] text-[#F59E0B]" : "fill-gray-200 text-gray-200"} />
                  ))}
                  <span className="text-xs text-gray-600 ml-1">ke atas</span>
                </span>
              </label>
            ))}
          </div>
        </div>

        <hr className="border-gray-100" />

        {/* Pengiriman */}
        <div>
          <p className="font-bold text-gray-700 text-xs mb-2 uppercase tracking-wide">Pengiriman</p>
          <div className="space-y-1.5">
            {["Gratis Ongkir", "Same Day", "Instant"].map((item) => (
              <label key={item} className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.pengiriman.includes(item)}
                  onChange={() => toggle("pengiriman", item)}
                  className="w-3.5 h-3.5 accent-[#1B4D3E] cursor-pointer"
                />
                <span className="text-xs text-gray-600 group-hover:text-gray-900 transition-colors">{item}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}

// ─── MAIN EXPORT ────────────────────────────────────────────────────────────

interface KatalogPageProps {
  initialCategory?: string;
}

export default function KatalogPage({ initialCategory = "Semua Produk" }: KatalogPageProps) {
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [activeSort, setActiveSort] = useState("Populer");
  const [currentPage, setCurrentPage] = useState(1);
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    komoditas: [],
    tipe: [],
    minPrice: "",
    maxPrice: "",
    rating: [],
    pengiriman: [],
  });

  const ITEMS_PER_PAGE = 15;

  // ── Filter + Sort logic ──
  const filtered = useMemo(() => {
    let items = [...ALL_PRODUCTS];

    // Category
    if (activeCategory !== "Semua Produk") {
      items = items.filter((p) => p.cat === activeCategory);
    }

    // Komoditas
    if (filters.komoditas.length > 0) {
      items = items.filter((p) =>
        filters.komoditas.some((k) => p.komoditas.includes(k))
      );
    }

    // Tipe
    if (filters.tipe.length > 0) {
      items = items.filter((p) =>
        filters.tipe.some((t) => p.tipe.includes(t))
      );
    }

    // Price range
    if (filters.minPrice) {
      items = items.filter((p) => p.price >= Number(filters.minPrice));
    }
    if (filters.maxPrice) {
      items = items.filter((p) => p.price <= Number(filters.maxPrice));
    }

    // Rating
    if (filters.rating.length > 0) {
      const minRating = Math.min(...filters.rating.map(Number));
      items = items.filter((p) => p.rating >= minRating);
    }

    // Sort
    if (activeSort === "Terlaris") {
      items = items.sort((a, b) => {
        const toNum = (s: string) => parseFloat(s.replace("rb", "")) * (s.includes("rb") ? 1000 : 1);
        return toNum(b.sold) - toNum(a.sold);
      });
    } else if (activeSort === "Harga ↑") {
      items = items.sort((a, b) => a.price - b.price);
    } else if (activeSort === "Harga ↓") {
      items = items.sort((a, b) => b.price - a.price);
    } else if (activeSort === "Terbaru") {
      items = items.sort((a, b) => b.id - a.id);
    } else {
      // Populer — by rating × sold
      items = items.sort((a, b) => b.rating - a.rating);
    }

    return items;
  }, [activeCategory, filters, activeSort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setCurrentPage(1);
  };

  const handleSortChange = (sort: string) => {
    setActiveSort(sort);
    setCurrentPage(1);
  };

  const handleFiltersChange = (f: FilterState) => {
    setFilters(f);
    setCurrentPage(1);
  };

  return (
    <div className="w-full bg-gray-50 min-h-screen font-sans">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-6">

        {/* Mobile filter toggle */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setShowMobileFilter(!showMobileFilter)}
            className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-bold text-gray-700 shadow-sm"
          >
            <Filter size={15} />
            {showMobileFilter ? "Sembunyikan Filter" : "Tampilkan Filter"}
          </button>
        </div>

        <div className="flex gap-5 items-start">

          {/* ── LEFT: Filter Panel ── */}
          <div className={`${showMobileFilter ? "block" : "hidden"} lg:block w-full lg:w-[220px] xl:w-[250px] shrink-0 sticky top-[70px]`}>
            <FilterPanel
              activeCategory={activeCategory}
              onCategoryChange={handleCategoryChange}
              filters={filters}
              onFiltersChange={handleFiltersChange}
            />
          </div>

          {/* ── RIGHT: Sort bar + Grid ── */}
          <div className="flex-1 min-w-0">

            {/* Sort bar */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-4 py-3 mb-4 flex flex-wrap items-center justify-between gap-3">
              <p className="text-gray-500 text-sm">
                <span className="font-bold text-gray-800">{filtered.length}</span> produk ditemukan
              </p>

              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-gray-500 text-xs font-medium">Urutkan:</span>
                {SORT_OPTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => handleSortChange(s)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                      activeSort === s
                        ? "bg-[#F97316] text-white shadow-sm"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>

              {/* Pagination nav */}
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-500 text-xs font-medium">
                  {currentPage}/{totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-40 flex items-center justify-center transition-colors"
                >
                  <ChevronLeft size={14} />
                </button>
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-40 flex items-center justify-center transition-colors"
                >
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>

            {/* Product grid — 5 columns */}
            {paginated.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3">
                {paginated.map((prod) => (
                  <ProductCard key={prod.id} prod={prod} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-24 bg-white rounded-2xl border border-gray-100">
                <div className="text-5xl mb-4">🌿</div>
                <p className="text-gray-500 font-medium">Tidak ada produk yang sesuai filter.</p>
                <button
                  onClick={() => {
                    handleCategoryChange("Semua Produk");
                    handleFiltersChange({ komoditas: [], tipe: [], minPrice: "", maxPrice: "", rating: [], pengiriman: [] });
                  }}
                  className="mt-4 text-[#1B4D3E] font-bold text-sm hover:underline"
                >
                  Reset semua filter
                </button>
              </div>
            )}

            {/* Bottom pagination */}
            {paginated.length > 0 && (
              <div className="flex justify-center items-center gap-2 mt-6">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="w-9 h-9 rounded-full bg-white border border-gray-200 hover:bg-gray-50 disabled:opacity-40 flex items-center justify-center shadow-sm transition-colors"
                >
                  <ChevronLeft size={16} />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
                  <button
                    key={pg}
                    onClick={() => setCurrentPage(pg)}
                    className={`w-9 h-9 rounded-full text-sm font-bold transition-all ${
                      pg === currentPage
                        ? "bg-[#1B4D3E] text-white shadow-md"
                        : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {pg}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="w-9 h-9 rounded-full bg-white border border-gray-200 hover:bg-gray-50 disabled:opacity-40 flex items-center justify-center shadow-sm transition-colors"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
