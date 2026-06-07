import { useState } from "react";
import { Search, ShoppingBag, Clock, CheckCircle2, ChevronRight, MapPin, User, Package, Printer } from "lucide-react";
import { motion } from "motion/react";

const ORDERS = [
  {
    id: "RMV-8821",
    date: "19 Mei 2026, 08.41 WIB",
    countdown: "23:41:12",
    buyerConfig: { initial: "AN", bg: "bg-orange-100", text: "text-orange-600" },
    buyerName: "PT Roastery Nusantara",
    buyerContact: "Bpk. Andi",
    buyerAddress: "Kebayoran Baru, Jakarta Selatan",
    items: [
      { name: "Kopi Arabika Gayo Natural (1kg)", qty: 20, total: 3600000 },
      { name: "Honey Process (1kg)", qty: 5, total: 1050000 }
    ],
    total: 4650000,
    status: "Pending"
  },
  {
    id: "RMV-8822",
    date: "19 Mei 2026, 09.15 WIB",
    countdown: "24:15:30",
    buyerConfig: { initial: "WK", bg: "bg-blue-100", text: "text-blue-600" },
    buyerName: "Warung Kopi Senja",
    buyerContact: "Ibu Siska",
    buyerAddress: "Bandung, Jawa Barat",
    items: [
      { name: "Cascara Gayo Tea (250g)", qty: 5, total: 225000 },
    ],
    total: 225000,
    status: "Pending"
  },
  {
    id: "RMV-8823",
    date: "19 Mei 2026, 10.30 WIB",
    countdown: "25:30:00",
    buyerConfig: { initial: "IR", bg: "bg-green-100", text: "text-green-600" },
    buyerName: "Ibu Rahma",
    buyerContact: "Ibu Rahma",
    buyerAddress: "Medan, Sumatera Utara",
    items: [
      { name: "Kopi Arabika Gayo Natural (1kg)", qty: 1, total: 180000 },
      { name: "Ongkos Kirim", qty: 1, total: 30000 }
    ],
    total: 210000,
    status: "Pending"
  }
];

const TABS = [
  { name: "Semua", count: 12 },
  { name: "Pending", count: 3 },
  { name: "Diproses", count: 5 },
  { name: "Selesai", count: 4 }
];

export default function DashboardBrandOrders() {
  const [activeTab, setActiveTab] = useState("Pending");

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-slate-50">
      
      {/* HEADER */}
      <header className="h-20 bg-white border-b border-gray-100 px-8 flex items-center shrink-0 shadow-sm z-10 w-full">
        <div>
          <h1 className="font-display font-bold text-2xl text-gray-900 flex items-center gap-3">
            <ShoppingBag className="text-[#FFB703]" size={28} />
            Kelola Pesanan Pasar (Pembeli Publik)
          </h1>
          <p className="text-sm font-medium text-gray-500">Kelola dan proses pesanan dari pelanggan di seluruh Indonesia.</p>
        </div>
      </header>

      {/* CONTENT */}
      <div className="flex-1 overflow-y-auto w-full">
        
        {/* ROW 1 — Tab row */}
        <div className="bg-white border-b border-gray-200 px-8 pt-4 sticky top-0 z-20">
          <div className="flex items-center gap-8 overflow-x-auto scrollbar-hide">
            {TABS.map((tab) => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`py-4 px-2 font-bold text-sm whitespace-nowrap border-b-2 transition-colors flex items-center gap-2 ${
                  activeTab === tab.name 
                  ? "border-[#F77F00] text-[#F77F00]" 
                  : "border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300"
                }`}
              >
                {tab.name} 
                <span className={`px-2 py-0.5 rounded-full text-xs ${
                  activeTab === tab.name ? "bg-orange-100 text-orange-700" : "bg-gray-100 text-gray-600"
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="p-8 max-w-[1440px] mx-auto space-y-6">
          {/* ROWS 2-4 — Order cards */}
          {ORDERS.map((order, index) => (
            <motion.div 
              key={order.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden ${index === 0 ? 'border-l-4 border-l-[#F77F00]' : 'border-l-[1px] border-l-gray-200'} hover:shadow-md transition-shadow`}
            >
              {/* TOP BAR */}
              <div className="bg-gray-50/50 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  {index === 0 && (
                    <span className="bg-orange-100 text-[#F77F00] px-2 py-1 rounded text-[10px] font-black uppercase tracking-wider flex items-center gap-1 border border-orange-200 shadow-sm">
                       🆕 BARU
                    </span>
                  )}
                  <span className="text-sm font-medium text-gray-500">
                    Order <strong className="text-gray-900">#{order.id}</strong> <span className="mx-1">·</span> {order.date}
                  </span>
                </div>
                <div className="text-sm font-bold text-red-600 bg-red-50 border border-red-100 px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-sm">
                  <Clock size={16} /> Konfirmasi dalam {order.countdown}
                </div>
              </div>

              {/* CARD BODY (3 columns) */}
              <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-8">
                
                {/* LEFT — Buyer info */}
                <div className="md:col-span-4 flex flex-row md:flex-col lg:flex-row items-start gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${order.buyerConfig.bg} ${order.buyerConfig.text}`}>
                    {order.buyerConfig.initial}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm md:text-base leading-tight mb-1">{order.buyerName}</h3>
                    <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium mb-1">
                      <User size={12} /> {order.buyerContact}
                    </div>
                    <div className="flex items-start gap-1.5 text-xs text-gray-500">
                      <MapPin size={12} className="shrink-0 mt-0.5" /> 
                      <span className="leading-tight">{order.buyerAddress}</span>
                    </div>
                  </div>
                </div>

                {/* CENTER — Order items */}
                <div className="md:col-span-5 md:border-l md:border-gray-100 md:pl-8">
                  <div className="space-y-3 mb-4">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-start text-sm">
                        <div className="text-gray-700 font-medium pe-4">
                          <span className="font-bold text-gray-900">{item.qty}x</span> {item.name}
                        </div>
                        <div className="font-bold text-gray-900 shrink-0">
                          Rp {item.total.toLocaleString('id-ID')}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-dashed border-gray-200 pt-3 flex justify-between items-center">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Total</span>
                    <span className="font-display font-black text-lg text-[#F77F00]">
                      Rp {order.total.toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>

                {/* RIGHT — Actions */}
                <div className="md:col-span-3 md:border-l md:border-gray-100 md:pl-8 flex flex-col justify-center gap-3">
                  <button className="w-full bg-[#1B4332] hover:bg-[#2D6A4F] text-white rounded-lg h-10 font-bold text-sm transition-colors flex items-center justify-center gap-2 shadow-sm">
                    <CheckCircle2 size={16} /> Konfirmasi
                  </button>
                  <button className="w-full bg-white border border-red-200 text-red-600 hover:bg-red-50 rounded-lg h-9 font-bold text-sm transition-colors">
                    Tolak Pesanan
                  </button>
                  <button className="w-full text-center text-xs font-bold text-gray-400 hover:text-gray-900 hover:underline transition-colors mt-1">
                    Lihat Detail Lengkap
                  </button>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
