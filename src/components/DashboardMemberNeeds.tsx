import { useState } from "react";
import { Search, Users, AlertCircle, CheckCircle2, ChevronRight, ShoppingCart, PackageOpen, Tag, CalendarClock, User, Package } from "lucide-react";
import { motion } from "motion/react";

const SUMMARY = [
  { label: "Total Permintaan (Bulanan)", value: "142", trend: "+12%", color: "text-[#2D6A4F]" },
  { label: "Menunggu Diproses", value: "35", trend: "Segera", color: "text-[#F77F00]" },
  { label: "Total Estimasi Dana", value: "Rp 18.5 Juta", trend: "Berdasarkan rekap", color: "text-blue-600" }
];

const AGGREGATED_NEEDS = [
  {
    id: 1,
    product: "Tani NPK 15-15-15 Plus",
    category: "Pupuk & Nutrisi",
    totalQty: 50,
    unit: "Sak 50kg",
    requesters: 24,
    estimatedPrice: 250000,
    status: "Mendesak",
    urgencyText: "Dibutuhkan dalam 7 hari (Musim Tanam)"
  },
  {
    id: 2,
    product: "Fungisida Ekstra - Antraknosa",
    category: "Anti Jamur",
    totalQty: 15,
    unit: "Botol 500ml",
    requesters: 12,
    estimatedPrice: 85000,
    status: "Normal",
    urgencyText: "Stok anggota menipis"
  },
  {
    id: 3,
    product: "Bibit Kopi Arabika",
    category: "Bibit",
    totalQty: 1000,
    unit: "Polybag",
    requesters: 5,
    estimatedPrice: 3500,
    status: "Menunggu",
    urgencyText: "Untuk tanam bulan depan"
  }
];

const MEMBER_REQUESTS = [
  {
    id: "REQ-001",
    member: "Bapak Supardi",
    date: "14 Nov 2023",
    items: "5x NPK 15-15-15, 2x Fungisida",
    status: "Menunggu"
  },
  {
    id: "REQ-002",
    member: "Ibu Sumiati",
    date: "13 Nov 2023",
    items: "10x NPK 15-15-15",
    status: "Menunggu"
  },
  {
    id: "REQ-003",
    member: "Kelompok Tani Harapan",
    date: "10 Nov 2023",
    items: "30x NPK 15-15-15, 500x Bibit Kopi",
    status: "Diproses"
  },
  {
    id: "REQ-004",
    member: "Bapak Joko",
    date: "05 Nov 2023",
    items: "1x Sprayer Elektrik 16L",
    status: "Selesai"
  }
];

export default function DashboardMemberNeeds({ onGoToStore }: { onGoToStore?: () => void }) {
  const [activeTab, setActiveTab] = useState("Rekap per Produk");
  const [searchQuery, setSearchQuery] = useState("");

  const StatusBadge = ({ status }: { status: string }) => {
    switch (status) {
      case "Mendesak":
        return <span className="bg-red-50 text-red-600 px-2.5 py-1 rounded-md text-[10px] font-bold border border-red-100 flex items-center gap-1 uppercase tracking-wider"><AlertCircle size={10} /> {status}</span>;
      case "Menunggu":
        return <span className="bg-orange-50 text-orange-600 px-2.5 py-1 rounded-md text-[10px] font-bold border border-orange-100 flex items-center gap-1 uppercase tracking-wider"><CalendarClock size={10} /> {status}</span>;
      case "Diproses":
        return <span className="bg-blue-50 text-blue-600 px-2.5 py-1 rounded-md text-[10px] font-bold border border-blue-100 flex items-center gap-1 uppercase tracking-wider"><Package size={10} /> {status}</span>;
      case "Selesai":
        return <span className="bg-green-50 text-green-600 px-2.5 py-1 rounded-md text-[10px] font-bold border border-green-100 flex items-center gap-1 uppercase tracking-wider"><CheckCircle2 size={10} /> {status}</span>;
      default:
        return <span className="bg-gray-100 text-gray-600 px-2.5 py-1 rounded-md text-[10px] font-bold border border-gray-200 uppercase tracking-wider">{status}</span>;
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-slate-50">
      
      {/* HEADER */}
      <header className="h-20 bg-white border-b border-gray-100 px-8 flex items-center justify-between shrink-0 shadow-sm z-10 w-full">
        <div>
          <h1 className="font-display font-bold text-2xl text-gray-900 flex items-center gap-3">
            <Users className="text-[#2D6A4F]" size={28} />
            Kebutuhan Anggota
          </h1>
          <p className="text-sm font-medium text-gray-500">Konsolidasikan permintaan sarana produksi dari anggota Anda.</p>
        </div>
      </header>

      {/* CONTENT */}
      <div className="flex-1 overflow-y-auto p-8 w-full max-w-[1440px] mx-auto">
        
        {/* Summary Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {SUMMARY.map((s, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between">
              <span className="text-sm font-bold text-gray-500 mb-2">{s.label}</span>
              <div className="flex items-end justify-between">
                <span className={`font-display font-black text-3xl ${s.color}`}>{s.value}</span>
                <span className="text-xs font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded-md">{s.trend}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs & Search */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-6">
          <div className="flex bg-gray-100 p-1 rounded-xl w-full md:w-auto">
            {["Rekap per Produk", "Daftar Permintaan"].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 md:flex-none px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${
                  activeTab === tab 
                  ? "bg-white text-gray-900 shadow-sm" 
                  : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <input 
              type="text" 
              placeholder="Cari..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm font-medium focus:outline-none focus:border-[#2D6A4F] focus:ring-1 focus:ring-[#2D6A4F] transition-all bg-white"
            />
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "Rekap per Produk" ? (
          <div className="space-y-4">
            {/* Banner Suggestion */}
            <div className="bg-[#2D6A4F]/5 border border-[#2D6A4F]/20 rounded-2xl p-5 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-[#2D6A4F] text-lg mb-1 flex items-center gap-2">
                  <PackageOpen size={20} /> Konsolidasi Kebutuhan Cerdas
                </h4>
                <p className="text-[#2D6A4F]/70 text-sm font-medium">Beli secara grosir di Toko Tani untuk memenuhi permintaan anggota dengan harga lebih murah.</p>
              </div>
              {onGoToStore && (
                <button onClick={onGoToStore} className="bg-[#2D6A4F] hover:bg-[#1B4332] text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 text-sm transition-colors shrink-0 shadow-md">
                  <ShoppingCart size={16} /> Beli Kebutuhan di Tani
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 pt-4">
              {AGGREGATED_NEEDS.filter(n => n.product.toLowerCase().includes(searchQuery.toLowerCase())).map((item) => (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white border border-gray-200 rounded-[1.5rem] p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="bg-gray-50 text-gray-600 text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider border border-gray-200">
                      {item.category}
                    </div>
                    <StatusBadge status={item.status} />
                  </div>
                  
                  <h3 className="font-bold text-gray-900 text-lg mb-1">{item.product}</h3>
                  <p className="text-red-500 text-xs font-medium mb-4 flex items-center gap-1"><AlertCircle size={12} /> {item.urgencyText}</p>
                  
                  <div className="bg-gray-50 rounded-xl p-4 mb-4 flex-1">
                    <div className="flex items-end justify-between font-bold mb-2">
                      <span className="text-gray-500 text-sm">Total Permintaan</span>
                      <span className="text-[#F77F00] text-xl">{item.totalQty} <span className="text-sm text-gray-500">{item.unit}</span></span>
                    </div>
                    <div className="flex justify-between items-center text-xs font-bold text-gray-500 bg-white p-2 rounded-lg border border-gray-100">
                      <span className="flex items-center gap-1.5"><Users size={14}/> {item.requesters} Pemohon</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                     <div>
                       <span className="block text-[10px] text-gray-400 font-bold uppercase mb-0.5">Estimasi Modal</span>
                       <span className="font-bold text-gray-900">Rp {(item.totalQty * item.estimatedPrice).toLocaleString('id-ID')}</span>
                     </div>
                     <button className="text-[#2D6A4F] hover:bg-[#2D6A4F]/10 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1">
                       Detail <ChevronRight size={14} />
                     </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-[1.5rem] shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider border-b border-gray-200">
                    <th className="p-4 font-bold">ID Request</th>
                    <th className="p-4 font-bold">Pemohon / Anggota</th>
                    <th className="p-4 font-bold">Tanggal</th>
                    <th className="p-4 font-bold">Detail Barang</th>
                    <th className="p-4 font-bold text-center">Status</th>
                    <th className="p-4 font-bold text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {MEMBER_REQUESTS.filter(r => r.member.toLowerCase().includes(searchQuery.toLowerCase()) || r.id.toLowerCase().includes(searchQuery.toLowerCase())).map((req, i) => (
                    <tr key={req.id} className="border-b last:border-0 border-gray-100 hover:bg-gray-50/50 transition-colors">
                      <td className="p-4 font-bold text-gray-900"><span className="border-b border-dashed border-gray-300">{req.id}</span></td>
                      <td className="p-4 font-medium text-gray-700 flex items-center gap-2"><User size={16} className="text-gray-400"/> {req.member}</td>
                      <td className="p-4 text-gray-500">{req.date}</td>
                      <td className="p-4 font-medium text-gray-800 max-w-xs truncate">{req.items}</td>
                      <td className="p-4 flex justify-center"><StatusBadge status={req.status} /></td>
                      <td className="p-4 text-right">
                        <button className="text-[#2D6A4F] font-bold text-xs hover:underline">Lihat Detail</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
