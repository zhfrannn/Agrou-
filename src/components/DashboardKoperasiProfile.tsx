import { useState } from "react";
import { UserCircle, CheckCircle2, XCircle, Award, ChevronRight, X, Plus } from "lucide-react";

export default function DashboardKoperasiProfile() {
  const [formData, setFormData] = useState({
    nama: "Koperasi Tani Maju Gayo",
    nik: "KOP-2024-00847",
    alamat: "Jl. Kebun Kopi No.12, Bener Meriah",
    provinsi: "Aceh",
    tahun: "2012",
    ketua: "Ahmad Zulkarnaen",
    hp: "+62 812-xxxx-xxxx",
    email: "gayomaju@agrou.id"
  });

  const [komoditas, setKomoditas] = useState(["☕ Kopi Arabika", "🌿 Rempah", "🫙 Olahan"]);

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-slate-50">
      
      {/* HEADER */}
      <header className="h-20 bg-white border-b border-gray-100 px-8 flex items-center shrink-0 shadow-sm z-10 w-full">
        <div>
          <h1 className="font-display font-bold text-2xl text-gray-900 flex items-center gap-3">
            <UserCircle className="text-[#38b000]" size={28} />
            Profil Koperasi
          </h1>
          <p className="text-sm font-medium text-gray-500">Kelola informasi dan pengaturan akun koperasi Anda.</p>
        </div>
      </header>

      {/* CONTENT */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 w-full max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN (60%) */}
          <div className="lg:col-span-7 xl:col-span-8">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 xl:p-8">
              <h2 className="font-bold text-gray-900 text-[16px] mb-6">Informasi Koperasi</h2>
              
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">Nama Koperasi</label>
                  <input 
                    type="text" 
                    value={formData.nama} 
                    onChange={e => setFormData({...formData, nama: e.target.value})}
                    className="w-full h-10 px-3 rounded-lg border border-[#E0E0E0] text-sm focus:outline-none focus:border-[#2D6A4F] focus:ring-1 focus:ring-[#2D6A4F] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">NIK Koperasi</label>
                  <input 
                    type="text" 
                    value={formData.nik} 
                    onChange={e => setFormData({...formData, nik: e.target.value})}
                    className="w-full h-10 px-3 rounded-lg border border-[#E0E0E0] text-sm bg-gray-50 text-gray-500 focus:outline-none focus:border-[#2D6A4F] focus:ring-1 focus:ring-[#2D6A4F] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">Alamat</label>
                  <input 
                    type="text" 
                    value={formData.alamat} 
                    onChange={e => setFormData({...formData, alamat: e.target.value})}
                    className="w-full h-10 px-3 rounded-lg border border-[#E0E0E0] text-sm focus:outline-none focus:border-[#2D6A4F] focus:ring-1 focus:ring-[#2D6A4F] transition-all"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">Provinsi</label>
                    <div className="relative">
                      <select 
                        value={formData.provinsi}
                        onChange={e => setFormData({...formData, provinsi: e.target.value})}
                        className="w-full h-10 px-3 rounded-lg border border-[#E0E0E0] text-sm appearance-none focus:outline-none focus:border-[#2D6A4F] focus:ring-1 focus:ring-[#2D6A4F] transition-all bg-white font-medium"
                      >
                        <option>Aceh</option>
                        <option>Sumatera Utara</option>
                        <option>Sumatera Barat</option>
                      </select>
                      <ChevronRight size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 rotate-90 pointer-events-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">Tahun Berdiri</label>
                    <input 
                      type="text" 
                      value={formData.tahun} 
                      onChange={e => setFormData({...formData, tahun: e.target.value})}
                      className="w-full h-10 px-3 rounded-lg border border-[#E0E0E0] text-sm focus:outline-none focus:border-[#2D6A4F] focus:ring-1 focus:ring-[#2D6A4F] transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">Nama Ketua</label>
                  <input 
                    type="text" 
                    value={formData.ketua} 
                    onChange={e => setFormData({...formData, ketua: e.target.value})}
                    className="w-full h-10 px-3 rounded-lg border border-[#E0E0E0] text-sm focus:outline-none focus:border-[#2D6A4F] focus:ring-1 focus:ring-[#2D6A4F] transition-all"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">No. HP</label>
                    <input 
                      type="text" 
                      value={formData.hp} 
                      onChange={e => setFormData({...formData, hp: e.target.value})}
                      className="w-full h-10 px-3 rounded-lg border border-[#E0E0E0] text-sm focus:outline-none focus:border-[#2D6A4F] focus:ring-1 focus:ring-[#2D6A4F] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">Email</label>
                    <input 
                      type="email" 
                      value={formData.email} 
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      className="w-full h-10 px-3 rounded-lg border border-[#E0E0E0] text-sm focus:outline-none focus:border-[#2D6A4F] focus:ring-1 focus:ring-[#2D6A4F] transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Komoditas section */}
              <div className="mb-8">
                <label className="block text-sm font-bold text-gray-700 mb-3">Komoditas Terdaftar</label>
                <div className="flex flex-wrap items-center gap-2">
                  {komoditas.map((item, i) => (
                    <div key={i} className="flex items-center gap-1.5 bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg text-sm font-medium border border-gray-200">
                      {item}
                      <button className="text-gray-400 hover:text-red-500 transition-colors bg-white rounded-full p-0.5"><X size={12} /></button>
                    </div>
                  ))}
                  <button className="text-[#2D6A4F] hover:text-[#1B4332] text-sm font-bold px-3 py-1.5 flex items-center gap-1 transition-colors">
                    <Plus size={16} /> Tambah Komoditas
                  </button>
                </div>
              </div>

              <button className="w-full h-11 bg-[#2D6A4F] hover:bg-[#1B4332] text-white rounded-lg font-bold text-sm transition-colors shadow-md flex items-center justify-center gap-2">
                💾 Simpan Perubahan
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN (40%) */}
          <div className="lg:col-span-5 xl:col-span-4 space-y-6">
            
            {/* CARD 1 — Profile completeness */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="font-bold text-gray-900">Kelengkapan Profil</span>
                <span className="font-display font-black text-3xl text-green-600">85%</span>
              </div>
              <div className="h-2.5 bg-gray-100 rounded-full w-full mb-6 overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: '85%' }}></div>
              </div>
              
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2.5 text-gray-700">
                  <CheckCircle2 size={18} className="text-green-500 shrink-0" />
                  <span className="font-medium">Informasi dasar</span>
                </li>
                <li className="flex items-center gap-2.5 text-gray-700">
                  <CheckCircle2 size={18} className="text-green-500 shrink-0" />
                  <span className="font-medium">Komoditas terdaftar</span>
                </li>
                <li className="flex items-center gap-2.5 text-gray-700">
                  <CheckCircle2 size={18} className="text-green-500 shrink-0" />
                  <span className="font-medium">Kontak aktif</span>
                </li>
                <li className="flex items-center gap-2.5 text-gray-500 line-through decoration-gray-300">
                  <XCircle size={18} className="text-red-400 shrink-0" />
                  <span>Foto profil koperasi</span>
                </li>
                <li className="flex items-center gap-2.5 text-gray-500 line-through decoration-gray-300">
                  <XCircle size={18} className="text-red-400 shrink-0" />
                  <span>Dokumen legalitas</span>
                </li>
              </ul>
            </div>

            {/* CARD 2 — Verification status */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 border-l-4 border-l-[#FFB703] p-6 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-6 opacity-10">
                 <Award size={80} className="text-[#FFB703]" />
               </div>
               <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                     <h3 className="font-bold text-[#FFB703] text-sm flex items-center gap-1.5 uppercase tracking-wide">
                        🏅 Verified Protected Farm
                     </h3>
                     <span className="bg-green-100 text-green-700 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-green-200">AKTIF</span>
                  </div>
                  
                  <div className="space-y-1 mb-5 text-sm">
                     <p className="text-gray-600 font-medium">Aktif sejak: <span className="font-bold text-gray-900">Oktober 2025</span></p>
                     <p className="text-gray-600 font-medium">Durasi: <span className="font-bold text-gray-900">8 bulan berturut-turut</span></p>
                  </div>
                  
                  <div className="mb-2 flex items-center justify-between text-sm">
                     <span className="font-bold text-gray-700">Menuju Gold Status</span>
                     <span className="font-bold text-gray-900">8/10 bln</span>
                  </div>
                  <div className="flex gap-1 mb-3">
                     {[1,2,3,4,5,6,7,8,9,10].map(i => (
                        <div key={i} className={`h-2 flex-1 rounded-sm ${i <= 8 ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                     ))}
                  </div>
                  <p className="text-[#F77F00] text-xs font-bold mb-4">2 bulan lagi menuju Gold Verified ⭐</p>
                  
                  <a href="#" className="text-[#F77F00] hover:text-[#E76F51] text-sm font-bold inline-flex items-center gap-1 transition-colors">
                     Pelajari Gold Status <ChevronRight size={14} />
                  </a>
               </div>
            </div>

            {/* CARD 3 — Quick stats */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex flex-col gap-3">
               <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-600 font-medium text-sm">
                     <span className="text-lg">📦</span> Total transaksi:
                  </div>
                  <span className="font-bold text-gray-900 text-sm">Rp 847 Juta</span>
               </div>
               <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-600 font-medium text-sm">
                     <span className="text-lg">👥</span> Anggota aktif:
                  </div>
                  <span className="font-bold text-gray-900 text-sm">47 Anggota</span>
               </div>
               <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-600 font-medium text-sm">
                     <span className="text-lg">⭐</span> Rating:
                  </div>
                  <span className="font-bold text-gray-900 text-sm">4.9/5.0</span>
               </div>
               <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-600 font-medium text-sm">
                     <span className="text-lg">📅</span> Bergabung:
                  </div>
                  <span className="font-bold text-gray-900 text-sm">Maret 2024</span>
               </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
