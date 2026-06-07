import { motion } from "motion/react";
import { ScanLine, Store, ShieldCheck } from "lucide-react";

const PROPS = [
  {
    icon: ScanLine,
    title: "Diagnosis Masalah Lahan",
    desc: "Chatbot AI rekomendasikan produk tepat sesuai gejala lahanmu",
    color: "text-[#2D6A4F]",
    bg: "bg-[#2D6A4F]/8",
  },
  {
    icon: Store,
    title: "Koperasi Desa Jadi Brand",
    desc: "Produk desa tampil premium dengan storefront dan branding kolektif",
    color: "text-[#E8720C]",
    bg: "bg-[#E8720C]/8",
  },
  {
    icon: ShieldCheck,
    title: "Verified Protected Farm",
    desc: "Rekam jejak proteksi lahan jadi bukti kualitas yang tidak bisa dipalsukan",
    color: "text-[#0077B6]",
    bg: "bg-[#0077B6]/8",
  },
];

export default function ValuePropStrip() {
  return (
    <section className="w-full bg-transparent relative z-10">
      <div className="max-w-[1440px] mx-auto px-8 pb-8 pt-2">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PROPS.map((prop, idx) => {
            const Icon = prop.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.08 }}
                className="flex items-center gap-4 px-6 py-5 bg-white/40 backdrop-blur-md rounded-2xl border border-white/30 shadow-[0_8px_32px_rgba(0,0,0,0.02)] hover:bg-white/60 hover:border-white/50 hover:shadow-[0_8px_32px_rgba(0,0,0,0.05)] transition-all duration-300"
              >
                {/* Icon */}
                <div
                  className={`${prop.bg} w-11 h-11 rounded-xl flex items-center justify-center shrink-0`}
                >
                  <Icon size={20} className={prop.color} strokeWidth={2.2} />
                </div>
 
                {/* Text */}
                <div className="min-w-0">
                  <h4 className="font-bold text-[14px] text-gray-900 leading-tight mb-0.5">
                    {prop.title}
                  </h4>
                  <p className="text-[12px] text-gray-600 leading-snug line-clamp-1 font-medium">
                    {prop.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
