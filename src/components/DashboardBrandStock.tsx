import { useState } from "react";
import { Plus, Download, Edit2, Ban, PackagePlus, Box } from "lucide-react";
import { motion } from "motion/react";

const PRODUCTS = [
  {
    id: 1,
    name: "Kopi Arabika Gayo Natural",
    image: "https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&q=80&w=400",
    stock: 320,
    unit: "kg",
    price: 180000,
    status: "Aman"
  },
  {
    id: 2,
    name: "Kopi Honey Process",
    image: "https://images.unsplash.com/photo-1524350876685-274059332603?auto=format&fit=crop&q=80&w=400",
    stock: 15,
    unit: "kg",
    price: 210000,
    status: "Hampir Habis"
  },
  {
    id: 3,
    name: "Kopi Green Bean Arabika",
    image: "https://images.unsplash.com/photo-1587049352847-4d4b126354ee?auto=format&fit=crop&q=80&w=400",
    stock: 0,
    unit: "kg",
    price: 95000,
    status: "Habis"
  },
  {
    id: 4,
    name: "Kopi Bubuk Signature",
    image: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&q=80&w=400",
    stock: 240,
    unit: "pcs",
    price: 75000,
    status: "Aman"
  }
];

const SCHEDULE = [
  { day: "Sen", date: "16 Okt", items: [{ name: "Bpk. Suryono", prod: "30kg Cherry" }] },
  { day: "Sel", date: "17 Okt", items: [{ name: "Ibu Karti", prod: "15kg Kopi Honey" }] },
  { day: "Rab", date: "18 Okt", items: [] },
  { day: "Kam", date: "19 Okt", items: [{ name: "Bpk. Mulyadi", prod: "50kg Green Bean" }, { name: "Ibu Neneng", prod: "20kg Natural" }], isToday: true },
  { day: "Jum", date: "20 Okt", items: [{ name: "Bpk. Jajang", prod: "45kg Cherry" }] },
  { day: "Sab", date: "21 Okt", items: [] },
  { day: "Min", date: "22 Okt", items: [] },
];

export default function DashboardBrandStock() {
  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-slate-50">
      
      {/* HEADER */}
      <header className="h-20 bg-white border-b border-gray-100 px-8 flex items-center shrink-0 shadow-sm z-10 w-full">
        <div>
          <h1 className="font-display font-bold text-2xl text-gray-900 flex items-center gap-3">
            <Box className="text-[#2D6A4F]" size={28} />
            Manajemen Stok & Produk Pasar
          </h1>
          <p className="text-sm font-medium text-gray-500">Kelola inventaris dan jadwal setor dari anggota koperasi.</p>
        </div>
      </header>

      {/* CONTENT */}
      <div className="flex-1 overflow-y-auto p-8 w-full max-w-[1440px] mx-auto">
        
        {/* ROW 1 — Action buttons */}
        <div className="flex items-center justify-between mb-8">
          <button className="bg-[#2D6A4F] hover:bg-[#1B4332] text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-md hover:shadow-lg text-sm flex items-center gap-2">
            <Plus size={18} /> Tambah Produk Baru
          </button>
          
          <button className="bg-white border-2 border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900 px-5 py-2 rounded-xl font-bold transition-colors text-sm flex items-center gap-2">
            <Download size={18} /> Export Data
          </button>
        </div>

        {/* ROW 2 — Stats mini cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {/* Card 1 */}
          <div className="bg-white rounded-[8px] shadow-sm p-4 border border-gray-100 flex flex-col justify-center items-center">
            <span className="font-display text-3xl font-black text-gray-900 mb-1">4</span>
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Total Produk</span>
          </div>
          {/* Card 2 */}
          <div className="bg-white rounded-[8px] shadow-sm p-4 border border-gray-100 flex flex-col justify-center items-center">
            <span className="font-display text-3xl font-black text-green-600 mb-1 flex items-center gap-2">2 <span className="text-xl">✅</span></span>
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Stok Aman</span>
          </div>
          {/* Card 3 */}
          <div className="bg-white rounded-[8px] shadow-sm p-4 border border-gray-100 flex flex-col justify-center items-center">
            <span className="font-display text-3xl font-black text-orange-500 mb-1 flex items-center gap-2">1 <span className="text-xl">⚠️</span></span>
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Hampir Habis</span>
          </div>
          {/* Card 4 */}
          <div className="bg-white rounded-[8px] shadow-sm p-4 border border-gray-100 flex flex-col justify-center items-center">
            <span className="font-display text-3xl font-black text-red-600 mb-1 flex items-center gap-2">1 <span className="text-xl">❌</span></span>
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Stok Habis</span>
          </div>
        </div>

        {/* ROW 3 — Product table */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden mb-12">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider border-b border-gray-200">
                  <th className="p-4 font-bold border-r border-gray-100">PRODUK</th>
                  <th className="p-4 font-bold">STOK TERSEDIA</th>
                  <th className="p-4 font-bold">HARGA JUAL</th>
                  <th className="p-4 font-bold text-center">STATUS</th>
                  <th className="p-4 font-bold text-right">AKSI</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {PRODUCTS.map((prod) => (
                  <tr key={prod.id} className="border-b last:border-0 border-gray-100 hover:bg-gray-50/50 transition-colors">
                    <td className="p-4 border-r border-gray-100 flex items-center gap-3">
                      <img src={prod.image} alt={prod.name} className="w-10 h-10 rounded-lg object-cover bg-gray-100 shrink-0" />
                      <span className="font-bold text-gray-900">{prod.name}</span>
                    </td>
                    <td className="p-4 font-bold text-gray-700">
                      {prod.stock} <span className="text-gray-400 font-medium text-xs">{prod.unit}</span>
                    </td>
                    <td className="p-4 font-bold text-gray-900">
                      Rp {prod.price.toLocaleString('id-ID')} <span className="text-gray-400 font-medium text-xs">/{prod.unit}</span>
                    </td>
                    <td className="p-4 text-center">
                      {prod.status === "Aman" && (
                        <span className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-bold border border-green-200">
                          🟢 Aman
                        </span>
                      )}
                      {prod.status === "Hampir Habis" && (
                        <span className="inline-flex items-center gap-1.5 bg-orange-50 text-orange-600 px-3 py-1 rounded-full text-xs font-bold border border-orange-200">
                          🟡 Hampir Habis
                        </span>
                      )}
                      {prod.status === "Habis" && (
                        <span className="inline-flex items-center gap-1.5 bg-red-50 text-red-600 px-3 py-1 rounded-full text-xs font-bold border border-red-200">
                          🔴 Habis
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="bg-gray-100 text-gray-600 hover:bg-gray-200 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5">
                          <Edit2 size={12} /> Edit
                        </button>
                        
                        {(prod.status === "Hampir Habis" || prod.status === "Habis") ? (
                          <button className={`${prod.status === "Hampir Habis" ? 'bg-orange-100 text-orange-700 hover:bg-orange-200' : 'bg-red-100 text-red-700 hover:bg-red-200'} px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5`}>
                            <PackagePlus size={12} /> + Tambah Stok
                          </button>
                        ) : (
                          <button className="bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-600 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5">
                            <Ban size={12} /> Nonaktifkan
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ROW 4 — Jadwal Setor section */}
        <div>
          <h3 className="font-display font-bold text-xl text-gray-900 mb-6">Jadwal Setor Anggota Minggu Ini</h3>
          
          <div className="grid grid-cols-7 gap-2 lg:gap-4 overflow-x-auto pb-4">
            {SCHEDULE.map((day, i) => (
              <div 
                key={i} 
                className={`min-w-[120px] lg:min-w-0 rounded-2xl p-4 border flex flex-col h-full min-h-[200px] ${
                  day.isToday 
                  ? 'bg-green-50 border-green-200 shadow-sm ring-1 ring-green-200' 
                  : 'bg-white border-gray-200 shadow-sm'
                }`}
              >
                <div className={`text-center pb-3 mb-3 border-b ${day.isToday ? 'border-green-200/60' : 'border-gray-100'}`}>
                  <div className={`text-sm font-bold ${day.isToday ? 'text-green-800' : 'text-gray-900'}`}>{day.day}</div>
                  <div className={`text-xs font-medium ${day.isToday ? 'text-green-600' : 'text-gray-500'}`}>{day.date}</div>
                </div>
                
                <div className="flex-1 flex flex-col gap-2">
                  {day.items.length > 0 ? (
                    day.items.map((item, idx) => (
                      <div key={idx} className={`rounded-lg p-2.5 text-left border ${day.isToday ? 'bg-white border-green-100 shadow-sm' : 'bg-gray-50 border-gray-100'}`}>
                        <div className="font-bold text-xs text-gray-900 mb-0.5 leading-tight">{item.name}</div>
                        <div className="text-[10px] text-gray-500 font-medium leading-tight flex flex-wrap gap-1">
                          <span className="text-[#F77F00] font-bold shrink-0">{item.prod.split(' ')[0]}</span>
                          <span>{item.prod.substring(item.prod.indexOf(' ')+1)}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex-1 flex items-center justify-center">
                      <span className="text-xs text-gray-400 font-medium italic">Kosong</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
