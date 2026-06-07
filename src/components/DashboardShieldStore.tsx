import { useState } from "react";
import { Search, Shield, Filter, ShoppingCart, Plus, Minus, CheckCircle2, ChevronRight, Package, Tag } from "lucide-react";
import { motion } from "motion/react";

const CATEGORIES = ["Semua", "Pupuk & Nutrisi", "Anti Jamur (Fungisida)", "Hama (Insektisida)", "Alat Tani", "Bibit Unggul"];

const PRODUCTS = [
  {
    id: 1,
    name: "Tani NPK 15-15-15 Plus",
    category: "Pupuk & Nutrisi",
    price: 250000,
    unit: "Sak 50kg",
    image: "https://images.unsplash.com/photo-1628172828620-379e4c1945be?auto=format&fit=crop&q=80&w=400",
    stock: 45,
    wholesale: "Grosir > 10 sak",
    tags: ["Terlaris"]
  },
  {
    id: 2,
    name: "Fungisida Ekstra - Antraknosa",
    category: "Anti Jamur (Fungisida)",
    price: 85000,
    unit: "Botol 500ml",
    image: "https://images.unsplash.com/photo-1584488349925-fb38eb04efbc?auto=format&fit=crop&q=80&w=400",
    stock: 120,
    wholesale: "Grosir > 2 kodi",
    tags: ["Rekomendasi Cuaca Hujan"]
  },
  {
    id: 3,
    name: "Insektisida Organik Pembasmi Kutu",
    category: "Hama (Insektisida)",
    price: 65000,
    unit: "Botol 250ml",
    image: "https://images.unsplash.com/photo-1616053424161-0027f673199c?auto=format&fit=crop&q=80&w=400",
    stock: 80,
    wholesale: null,
    tags: ["Organik"]
  },
  {
    id: 4,
    name: "Nutrisi Kalsium Plus Boron",
    category: "Pupuk & Nutrisi",
    price: 55000,
    unit: "Bungkus 1kg",
    image: "https://images.unsplash.com/photo-1599878238128-6e54f9aadaed?auto=format&fit=crop&q=80&w=400",
    stock: 200,
    wholesale: "Grosir > 50 pcs",
    tags: []
  },
  {
    id: 5,
    name: "Sprayer Elektrik 16L",
    category: "Alat Tani",
    price: 450000,
    unit: "Unit",
    image: "https://images.unsplash.com/photo-1586771107445-d3af9e15fa40?auto=format&fit=crop&q=80&w=400",
    stock: 15,
    wholesale: "Diskon Koperasi 5%",
    tags: []
  },
  {
    id: 6,
    name: "Bibit Kopi Arabika Pilihan",
    category: "Bibit Unggul",
    price: 3500,
    unit: "Polybag",
    image: "https://images.unsplash.com/photo-1620054703534-aa1eef8ab4f8?auto=format&fit=crop&q=80&w=400",
    stock: 500,
    wholesale: "Pre-order > 1000",
    tags: ["SIAP TANAM"]
  },
];

export default function DashboardShieldStore() {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = PRODUCTS.filter(p => 
    (activeCategory === "Semua" || p.category === activeCategory) &&
    (p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-slate-50">
      
      {/* HEADER */}
      <header className="h-20 bg-white border-b border-gray-100 px-8 flex items-center justify-between shrink-0 shadow-sm z-10 w-full">
        <div>
          <h1 className="font-display font-bold text-2xl text-gray-900 flex items-center gap-3">
            <Shield className="text-[#2D6A4F]" size={28} />
            Toko Kebutuhan Tani
          </h1>
          <p className="text-sm font-medium text-gray-500">Beli sarana produksi pertanian resmi dan terverifikasi untuk anggota Anda.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="relative bg-orange-50 text-[#F77F00] hover:bg-orange-100 p-3 rounded-full transition-colors flex items-center justify-center">
            <ShoppingCart size={22} />
            <span className="absolute -top-1 -right-1 bg-[#2D6A4F] text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-white shadow-sm">0</span>
          </button>
        </div>
      </header>

      {/* CONTENT */}
      <div className="flex-1 overflow-y-auto p-8 w-full max-w-[1440px] mx-auto">
        
        {/* Banner */}
        <div className="bg-gradient-to-r from-[#2D6A4F] to-[#1B4332] rounded-[2rem] p-8 md:p-10 mb-8 text-white relative overflow-hidden shadow-lg shadow-[#2D6A4F]/20">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full transform translate-x-1/3 -translate-y-1/3 blur-2xl"></div>
          <div className="absolute bottom-0 left-10 w-40 h-40 bg-[#74C69D]/20 rounded-full blur-xl"></div>
          
          <div className="relative z-10 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 bg-white/20 px-3 py-1 rounded-lg text-xs font-bold mb-4 backdrop-blur-sm border border-white/10">
              <CheckCircle2 size={14} /> Khusus Koperasi Terdaftar
            </span>
            <h2 className="font-display font-black text-3xl md:text-4xl mb-3 leading-tight">Harga Grosir untuk Kesejahteraan Anggota</h2>
            <p className="text-white/80 font-medium text-lg leading-relaxed mb-8">
              Pesan kebutuhan obat dan nutrisi tanaman secara kolektif untuk menjamin keaslian dan menghemat ongkos kirim.
            </p>
            <button className="bg-[#F77F00] hover:bg-[#E76F51] text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 text-sm flex items-center gap-2 w-fit">
              Pelajari Sistem Pembelian Kolektif <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 justify-between mb-8 sticky top-0 z-20 bg-slate-50 py-4 border-b border-gray-200/50 backdrop-blur-sm bg-opacity-90">
          <div className="flex items-center gap-3 overflow-x-auto pb-2 md:pb-0 scrollbar-hide flex-1">
            {CATEGORIES.map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full font-bold text-sm whitespace-nowrap transition-colors shrink-0 border-2 ${
                  activeCategory === cat 
                  ? "bg-[#2D6A4F] text-white border-[#2D6A4F] shadow-md shadow-[#2D6A4F]/20" 
                  : "bg-white text-gray-500 border-gray-200 hover:border-[#2D6A4F]/30 hover:text-[#2D6A4F]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative shrink-0 w-full md:w-64">
            <input 
              type="text" 
              placeholder="Cari produk..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-full border border-gray-200 text-sm font-medium focus:outline-none focus:border-[#2D6A4F] focus:ring-2 focus:ring-[#2D6A4F]/20 transition-all bg-white"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-gray-200 rounded-[1.5rem] overflow-hidden hover:shadow-xl hover:border-green-200 transition-all duration-300 flex flex-col group"
            >
              <div className="h-48 bg-gray-100 relative overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                
                {product.tags.length > 0 && (
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                    {product.tags.map(tag => (
                      <span key={tag} className="bg-orange-500 text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-sm uppercase tracking-wider">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                
                <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-bold px-2.5 py-1 rounded-lg border border-gray-200 shadow-sm flex items-center gap-1.5">
                  <Package size={12} className="text-[#2D6A4F]" /> Sisa: {product.stock}
                </div>
              </div>
              
              <div className="p-5 flex flex-col flex-1">
                <div className="text-xs font-bold text-gray-400 mb-1">{product.category}</div>
                <h3 className="font-bold text-gray-900 text-[15px] leading-tight mb-2 line-clamp-2">{product.name}</h3>
                
                <div className="flex items-end gap-1 mb-1 mt-auto">
                  <span className="font-display font-black text-xl text-[#F77F00]">
                    Rp {product.price.toLocaleString('id-ID')}
                  </span>
                  <span className="text-gray-400 text-xs font-medium mb-1">/ {product.unit}</span>
                </div>
                
                {product.wholesale && (
                  <div className="text-[10px] font-bold text-[#2D6A4F] bg-[#74C69D]/10 px-2 py-1.5 rounded-md inline-flex items-center gap-1 w-fit mt-2 mb-1 border border-[#74C69D]/20">
                    <Tag size={10} /> {product.wholesale}
                  </div>
                )}
                
                <div className="w-full h-px bg-gray-100 my-4"></div>
                
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-xl px-2 h-10 w-24">
                    <button className="text-gray-500 hover:text-[#E76F51] transition-colors p-1"><Minus size={14}/></button>
                    <span className="font-bold text-sm text-gray-800">1</span>
                    <button className="text-gray-500 hover:text-[#2D6A4F] transition-colors p-1"><Plus size={14}/></button>
                  </div>
                  <button className="flex-1 bg-[#2D6A4F] hover:bg-[#1B4332] text-white h-10 rounded-xl font-bold text-sm transition-colors shadow-md shadow-[#2D6A4F]/20 flex items-center justify-center gap-2">
                    <ShoppingCart size={16} /> Keranjang
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="py-20 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
              <Package size={32} />
            </div>
            <h3 className="font-display font-bold text-xl text-gray-900 mb-2">Produk Tidak Ditemukan</h3>
            <p className="text-gray-500 font-medium">Coba gunakan kata kunci pencarian yang lain atau ubah kategori.</p>
          </div>
        )}

      </div>
    </div>
  );
}
