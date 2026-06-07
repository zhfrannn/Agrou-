import { Leaf, Mail, Phone, Instagram, Facebook, Shield, Store } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#1B4332] text-white pt-12 pb-6 border-t-4 border-[#2D6A4F]">
      <div className="max-w-[1440px] mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          
          {/* Column 1: Logo & Tagline */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 text-white mb-4">
              <div className="bg-[#F77F00] p-1 rounded-lg text-white transform -rotate-6 shadow-md">
                <Leaf size={18} className="fill-white" />
              </div>
              <span className="font-display font-black text-2xl tracking-tight">Agrou</span>
            </div>
            <p className="text-sm text-white/80 font-medium mb-4 leading-relaxed">
              Tumbuh dan makmur bersama dalam satu platform ramah untuk desa, memajukan koperasi dan kesejahteraan pangan.
            </p>
            <div className="flex items-center gap-3">
              <button className="bg-white/10 text-white p-2 rounded-xl hover:bg-[#F77F00] transition-colors border border-white/10">
                <Instagram size={18} />
              </button>
              <button className="bg-white/10 text-white p-2 rounded-xl hover:bg-[#0077B6] transition-colors border border-white/10">
                <Facebook size={18} />
              </button>
            </div>
          </div>
          
          {/* Column 2: Agrou Tani */}
          <div>
            <h4 className="font-display font-bold text-white text-base mb-4 flex items-center gap-2">
               <Shield size={16} className="text-[#74C69D]" />
               Agrou Tani
            </h4>
            <ul className="space-y-2.5 text-sm font-medium text-white/70">
              <li><a href="#" className="hover:text-white hover:underline underline-offset-4 transition-all">Diagnosis Lahan (AI)</a></li>
              <li><a href="#" className="hover:text-white hover:underline underline-offset-4 transition-all">Proteksi Cuaca & Hama</a></li>
              <li><a href="#" className="hover:text-white hover:underline underline-offset-4 transition-all">Tips Pertanian & Cuaca</a></li>
              <li><a href="#" className="hover:text-white hover:underline underline-offset-4 transition-all">Toko Obat Tani Terpadu</a></li>
            </ul>
          </div>
          
          {/* Column 3: Agrou Pasar */}
          <div>
            <h4 className="font-display font-bold text-white text-base mb-4 flex items-center gap-2">
               <Store size={16} className="text-[#FFD166]" />
               Agrou Pasar
            </h4>
            <ul className="space-y-2.5 text-sm font-medium text-white/70">
              <li><a href="#" className="hover:text-white hover:underline underline-offset-4 transition-all">Koperasi Verified</a></li>
              <li><a href="#" className="hover:text-white hover:underline underline-offset-4 transition-all">Pasar Komoditas</a></li>
              <li><a href="#" className="hover:text-white hover:underline underline-offset-4 transition-all">Produk Olahan Desa</a></li>
              <li><a href="#" className="hover:text-white hover:underline underline-offset-4 transition-all">Distribusi Pembeli</a></li>
            </ul>
          </div>
          
          {/* Column 4: Perusahaan & Kontak */}
          <div>
            <h4 className="font-display font-bold text-white text-base mb-4">Perusahaan</h4>
            <ul className="space-y-2.5 text-sm font-medium text-white/70 mb-4">
              <li><a href="#" className="hover:text-white hover:underline underline-offset-4 transition-all">Tentang Agrou</a></li>
              <li><a href="#" className="hover:text-white hover:underline underline-offset-4 transition-all">Cerita Petani</a></li>
              <li><a href="#" className="hover:text-white hover:underline underline-offset-4 transition-all">Blog & Berita</a></li>
              <li><a href="#" className="hover:text-white hover:underline underline-offset-4 transition-all">Karir</a></li>
            </ul>
            
            <div className="space-y-2.5 text-sm text-white/70 font-medium pt-4 border-t border-white/10">
              <div className="flex items-center gap-3">
                <div className="bg-white/10 p-1.5 rounded-lg text-white">
                  <Phone size={14} />
                </div>
                <span className="hover:text-white transition-colors cursor-pointer">1500-TANI</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-white/10 p-1.5 rounded-lg text-white">
                  <Mail size={14} />
                </div>
                <span className="hover:text-white transition-colors cursor-pointer">halo@agrou.id</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-medium text-white/50 text-sm">
            &copy; {new Date().getFullYear()} Agrou Nusantara. Seluruh hak cipta dilindungi.
          </div>
          <div className="flex items-center gap-6 text-sm font-medium text-white/50">
             <a href="#" className="hover:text-white transition-colors">Kebijakan Privasi</a>
             <a href="#" className="hover:text-white transition-colors">Syarat & Ketentuan</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
