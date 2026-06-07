import { ChevronLeft, ChevronRight, Wallet, CheckCircle2, Clock, FileText, SendHorizontal, Building } from "lucide-react";

const MEMBERS = [
  { name: "Ahmad Zulkarnaen", stock: "80 kg", contribution: "24.4%", revenue: 6002400, status: "Sudah Dibagi" },
  { name: "Keluarga Bpk Teuku", stock: "65 kg", contribution: "19.8%", revenue: 4870800, status: "Sudah Dibagi" },
  { name: "Suparman", stock: "50 kg", contribution: "15.3%", revenue: 3763800, status: "Sudah Dibagi" },
  { name: "M. Ridwan", stock: "40 kg", contribution: "12.2%", revenue: 2999200, status: "Dalam Proses" },
  { name: "Suyanto", stock: "35 kg", contribution: "10.7%", revenue: 2632200, status: "Dalam Proses" },
  { name: "Budi Hartono", stock: "30 kg", contribution: "9.2%", revenue: 2263200, status: "Dalam Proses" },
  { name: "Lainnya (33)", stock: "27 kg", contribution: "8.4%", revenue: 2068400, status: "Sudah Dibagi" }
];

const TOP_CONTRIBUTORS = [
  { name: "Ahmad Zulkarnaen", amount: "Rp 6.0M", percent: "100%" },
  { name: "Keluarga Bpk Teuku", amount: "Rp 4.9M", percent: "81%" },
  { name: "Suparman", amount: "Rp 3.8M", percent: "63%" },
  { name: "M. Ridwan", amount: "Rp 3.0M", percent: "50%" },
  { name: "Suyanto", amount: "Rp 2.6M", percent: "43%" },
];

export default function DashboardBrandRevenue() {
  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-slate-50">
      
      {/* HEADER */}
      <header className="h-20 bg-white border-b border-gray-100 px-8 flex items-center shrink-0 shadow-sm z-10 w-full">
        <div>
          <h1 className="font-display font-bold text-2xl text-gray-900 flex items-center gap-3">
            <Wallet className="text-[#2D6A4F]" size={28} />
            Revenue & Pembagian
          </h1>
          <p className="text-sm font-medium text-gray-500">Bagi hasil penjualan produk Pasar secara adil kepada anggota.</p>
        </div>
      </header>

      {/* CONTENT */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 w-full max-w-[1440px] mx-auto space-y-8">
        
        {/* ROW 1 — Month selector */}
        <div className="flex items-center justify-center gap-4">
          <button className="text-gray-400 hover:text-gray-900 font-bold text-sm flex items-center transition-colors">
            <ChevronLeft size={16} className="mr-1" /> April 2026
          </button>
          
          <button className="bg-[#2D6A4F] text-white px-5 py-2 rounded-full font-bold text-sm shadow-md">
            Mei 2026
          </button>
          
          <button className="text-gray-400 hover:text-gray-900 font-bold text-sm flex items-center transition-colors">
            Juni 2026 <ChevronRight size={16} className="ml-1" />
          </button>
        </div>

        {/* ROW 2 — Summary cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <div className="font-display font-black text-3xl md:text-4xl text-[#2D6A4F] mb-1">
              Rp 24.600.000
            </div>
            <div className="text-sm font-bold text-gray-500">Total Revenue Mei 2026</div>
          </div>
          
          {/* Card 2 */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <div className="font-display font-black text-3xl md:text-4xl text-green-600 mb-1 flex items-center gap-2">
              <span className="text-xl md:text-2xl">✅</span> Rp 21.800.000
            </div>
            <div className="text-sm font-bold text-gray-500">Sudah Dibagi · 39 anggota</div>
          </div>
          
          {/* Card 3 */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <div className="font-display font-black text-3xl md:text-4xl text-orange-500 mb-1 flex items-center gap-2">
              <span className="text-xl md:text-2xl">⏳</span> Rp 2.800.000
            </div>
            <div className="text-sm font-bold text-gray-500">Dalam Proses · 8 anggota</div>
          </div>
        </div>

        {/* ROW 3 — Two column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-12">
          
          {/* LEFT (65%) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white border border-gray-200 rounded-[1.5rem] shadow-sm overflow-hidden flex flex-col h-full">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider border-b border-gray-200">
                      <th className="p-4 font-bold border-r border-gray-100">NAMA ANGGOTA</th>
                      <th className="p-4 font-bold">STOK DISETOR</th>
                      <th className="p-4 font-bold">KONTRIBUSI %</th>
                      <th className="p-4 font-bold text-right">REVENUE</th>
                      <th className="p-4 font-bold text-center">STATUS</th>
                      <th className="p-4 font-bold text-center">AKSI</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {MEMBERS.map((member, i) => (
                      <tr key={i} className="border-b last:border-0 border-gray-100 hover:bg-gray-50/50 transition-colors">
                        <td className="p-4 border-r border-gray-100 font-bold text-gray-900">{member.name}</td>
                        <td className="p-4 font-bold text-gray-700">{member.stock}</td>
                        <td className="p-4 font-medium text-gray-500">{member.contribution}</td>
                        <td className="p-4 font-bold text-gray-900 text-right text-[15px]">
                          Rp {member.revenue.toLocaleString('id-ID')}
                        </td>
                        <td className="p-4 text-center">
                          {member.status === "Sudah Dibagi" ? (
                            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap border border-green-200 inline-flex items-center gap-1.5">
                              ✅ Selesai
                            </span>
                          ) : (
                            <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap border border-orange-200 inline-flex items-center gap-1.5">
                              ⏳ Proses
                            </span>
                          )}
                        </td>
                        <td className="p-4 text-center">
                          {member.status === "Sudah Dibagi" ? (
                            <span className="text-gray-300 font-bold">—</span>
                          ) : (
                            <button className="bg-[#2D6A4F] text-white hover:bg-[#1B4332] px-3 py-1.5 rounded-lg text-xs font-bold transition-colors shadow-sm whitespace-nowrap inline-flex items-center justify-center gap-1.5">
                              <SendHorizontal size={12} /> Transfer
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Action row below table */}
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-between sm:justify-end">
              <button className="bg-white border-2 border-gray-200 text-gray-700 hover:bg-gray-50 px-6 py-3 rounded-xl font-bold transition-colors text-sm shadow-sm flex items-center justify-center gap-2 w-full sm:w-auto">
                <FileText size={18} /> Export Rekap PDF
              </button>
              <button className="bg-[#F77F00] hover:bg-[#E76F51] text-white px-6 py-3 rounded-xl font-bold transition-colors shadow-md hover:shadow-lg text-sm flex items-center justify-center gap-2 border border-[#E76F51] w-full sm:w-auto">
                <SendHorizontal size={18} /> Transfer Semua Pending (8)
              </button>
            </div>
          </div>

          {/* RIGHT (35%) */}
          <div className="lg:col-span-4 h-full">
            <div className="bg-white p-6 rounded-[1.5rem] shadow-sm border border-gray-200 flex flex-col h-full">
              <h3 className="font-display font-bold text-lg text-gray-900 mb-6">Top 5 Kontributor</h3>
              
              <div className="space-y-6 flex-1">
                {TOP_CONTRIBUTORS.map((tc, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between text-sm font-bold text-gray-900 mb-2">
                       <span>{tc.name}</span>
                       <span className="text-[#2D6A4F]">{tc.amount}</span>
                    </div>
                    <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden w-full">
                       <div 
                         className="h-full bg-[#74C69D] rounded-full"
                         style={{ width: tc.percent }}
                       ></div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100">
                <p className="text-xs font-medium text-gray-400 flex items-center gap-2 justify-center">
                  <Building size={14} /> Transfer via: BRI / BSI / DANA
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
