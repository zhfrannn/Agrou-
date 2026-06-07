import { useState } from "react";
import { Search, Shield, Filter, Package, ChevronRight, Clock, CheckCircle2, Truck, XCircle, FileText, Download } from "lucide-react";
import { motion } from "motion/react";

const ORDER_STATUSES = ["Semua", "Menunggu Pembayaran", "Diproses", "Dikirim", "Selesai", "Dibatalkan"];

const ORDERS = [
  {
    id: "ORD-TS-20231025-001",
    date: "25 Okt 2023, 14:30 WIB",
    status: "Dikirim",
    total: 2500000,
    items: [
      { name: "Tani NPK 15-15-15 Plus", qty: 10, unit: "Sak 50kg", price: 250000, image: "https://images.unsplash.com/photo-1628172828620-379e4c1945be?auto=format&fit=crop&q=80&w=400" }
    ],
    resi: "JNT8765432109"
  },
  {
    id: "ORD-TS-20231018-042",
    date: "18 Okt 2023, 09:15 WIB",
    status: "Selesai",
    total: 1250000,
    items: [
      { name: "Fungisida Ekstra - Antraknosa", qty: 5, unit: "Botol 500ml", price: 85000, image: "https://images.unsplash.com/photo-1584488349925-fb38eb04efbc?auto=format&fit=crop&q=80&w=400" },
      { name: "Nutrisi Kalsium Plus Boron", qty: 15, unit: "Bungkus 1kg", price: 55000, image: "https://images.unsplash.com/photo-1599878238128-6e54f9aadaed?auto=format&fit=crop&q=80&w=400" }
    ],
    resi: "SICEPAT1234567"
  },
  {
    id: "ORD-TS-20231105-012",
    date: "05 Nov 2023, 11:20 WIB",
    status: "Menunggu Pembayaran",
    total: 450000,
    items: [
      { name: "Sprayer Elektrik 16L", qty: 1, unit: "Unit", price: 450000, image: "https://images.unsplash.com/photo-1586771107445-d3af9e15fa40?auto=format&fit=crop&q=80&w=400" }
    ],
    resi: null
  },
  {
    id: "ORD-TS-20230910-099",
    date: "10 Sep 2023, 16:45 WIB",
    status: "Dibatalkan",
    total: 350000,
    items: [
      { name: "Bibit Kopi Arabika Pilihan", qty: 100, unit: "Polybag", price: 3500, image: "https://images.unsplash.com/photo-1620054703534-aa1eef8ab4f8?auto=format&fit=crop&q=80&w=400" }
    ],
    resi: null
  }
];

const StatusBadge = ({ status }: { status: string }) => {
  switch (status) {
    case "Menunggu Pembayaran":
      return <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs font-bold border border-orange-200 flex items-center gap-1.5 w-fit"><Clock size={12}/> {status}</span>;
    case "Diproses":
      return <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-bold border border-blue-200 flex items-center gap-1.5 w-fit"><Package size={12}/> {status}</span>;
    case "Dikirim":
      return <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-xs font-bold border border-purple-200 flex items-center gap-1.5 w-fit"><Truck size={12}/> {status}</span>;
    case "Selesai":
      return <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold border border-green-200 flex items-center gap-1.5 w-fit"><CheckCircle2 size={12}/> {status}</span>;
    case "Dibatalkan":
      return <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-bold border border-red-200 flex items-center gap-1.5 w-fit"><XCircle size={12}/> {status}</span>;
    default:
      return <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-bold border border-gray-200">{status}</span>;
  }
};

export default function DashboardShieldOrders() {
  const [activeTab, setActiveTab] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredOrders = ORDERS.filter(order => 
    (activeTab === "Semua" || order.status === activeTab) &&
    (order.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
     order.items.some(item => item.name.toLowerCase().includes(searchQuery.toLowerCase())))
  );

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-slate-50">
      
      {/* HEADER */}
      <header className="h-20 bg-white border-b border-gray-100 px-8 flex items-center justify-between shrink-0 shadow-sm z-10 w-full">
        <div>
          <h1 className="font-display font-bold text-2xl text-gray-900 flex items-center gap-3">
            <Package className="text-[#2D6A4F]" size={28} />
            Pesanan Tani
          </h1>
          <p className="text-sm font-medium text-gray-500">Lacak riwayat pembelian sarana produksi anggota koperasi.</p>
        </div>
      </header>

      {/* CONTENT */}
      <div className="flex-1 overflow-y-auto p-8 w-full max-w-[1440px] mx-auto">
        
        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 justify-between mb-8">
          <div className="flex items-center gap-3 overflow-x-auto pb-2 md:pb-0 scrollbar-hide flex-1">
            {ORDER_STATUSES.map(status => (
              <button 
                key={status}
                onClick={() => setActiveTab(status)}
                className={`px-5 py-2.5 rounded-full font-bold text-sm whitespace-nowrap transition-colors shrink-0 border-2 ${
                  activeTab === status 
                  ? "bg-[#2D6A4F] text-white border-[#2D6A4F] shadow-md shadow-[#2D6A4F]/20" 
                  : "bg-white text-gray-500 border-gray-200 hover:border-[#2D6A4F]/30 hover:text-[#2D6A4F]"
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          <div className="relative shrink-0 w-full md:w-72">
            <input 
              type="text" 
              placeholder="Cari No. Pesanan atau Produk..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-full border border-gray-200 text-sm font-medium focus:outline-none focus:border-[#2D6A4F] focus:ring-2 focus:ring-[#2D6A4F]/20 transition-all bg-white shadow-sm"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {filteredOrders.length > 0 ? (
             filteredOrders.map((order) => (
                <motion.div 
                  key={order.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white border border-gray-200 rounded-[1.5rem] shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                >
                   {/* Order Header */}
                   <div className="bg-gray-50/80 border-b border-gray-100 px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-center gap-4 flex-wrap">
                         <div className="flex items-center gap-2">
                           <FileText size={16} className="text-gray-400" />
                           <span className="font-bold text-gray-900 border-b border-dashed border-gray-300 pb-0.5">{order.id}</span>
                         </div>
                         <div className="text-gray-400 text-sm font-medium border-l border-gray-300 pl-4">
                           {order.date}
                         </div>
                      </div>
                      <div>
                         <StatusBadge status={order.status} />
                      </div>
                   </div>

                   {/* Order Body (Items) */}
                   <div className="p-6">
                      {order.items.map((item, idx) => (
                         <div key={idx} className={`flex items-start gap-4 ${idx !== order.items.length - 1 ? 'mb-4 pb-4 border-b border-gray-100' : ''}`}>
                            <div className="w-16 h-16 rounded-xl bg-gray-100 overflow-hidden border border-gray-200 shrink-0">
                               <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1">
                               <h4 className="font-bold text-gray-900 text-sm md:text-base leading-tight mb-1">{item.name}</h4>
                               <p className="text-gray-500 text-xs font-medium mb-2">{item.qty} x {item.unit} x Rp {item.price.toLocaleString('id-ID')}</p>
                            </div>
                            <div className="shrink-0 text-right">
                               <span className="font-bold text-gray-900 text-sm">Rp {(item.qty * item.price).toLocaleString('id-ID')}</span>
                            </div>
                         </div>
                      ))}
                   </div>

                   {/* Order Footer (Total & Actions) */}
                   <div className="bg-gray-50 border-t border-gray-200 px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                         <span className="text-gray-500 text-sm font-medium mr-3">Total Belanja:</span>
                         <span className="font-display font-black text-[#F77F00] text-xl">Rp {order.total.toLocaleString('id-ID')}</span>
                      </div>
                      <div className="flex items-center gap-3">
                         {order.status === "Menunggu Pembayaran" && (
                            <button className="bg-[#F77F00] hover:bg-[#E76F51] text-white px-5 py-2.5 rounded-xl font-bold shadow-md hover:shadow-lg transition-all text-sm">
                               Bayar Sekarang
                            </button>
                         )}
                         {order.status === "Dikirim" && (
                            <button className="bg-white border-2 border-green-500 text-green-600 hover:bg-green-50 px-5 py-2.5 rounded-xl font-bold transition-all text-sm flex items-center gap-2">
                               <Truck size={16} /> Lacak Pengiriman
                            </button>
                         )}
                         {(order.status === "Selesai" || order.status === "Dibatalkan") && (
                            <button className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 px-5 py-2.5 rounded-xl font-bold transition-all text-sm">
                               Beli Lagi
                            </button>
                         )}
                         {(order.status !== "Menunggu Pembayaran" && order.status !== "Dibatalkan") && (
                            <button className="text-[#2D6A4F] hover:bg-green-50 px-4 py-2.5 rounded-xl font-bold transition-all text-sm flex items-center gap-2">
                               <Download size={16} /> Invoice
                            </button>
                         )}
                      </div>
                   </div>

                </motion.div>
             ))
          ) : (
            <div className="py-20 text-center bg-white rounded-[2rem] border border-dashed border-gray-300">
               <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                 <Package size={32} />
               </div>
               <h3 className="font-display font-bold text-xl text-gray-900 mb-2">Tidak Ada Pesanan</h3>
               <p className="text-gray-500 font-medium">Belum ada pesanan dengan status "{activeTab}"</p>
             </div>
          )}
        </div>

      </div>
    </div>
  );
}
