export default function MarqueeStrip() {
  const items = [
    "✅ Verified Protected Farm",
    "🛡️ Diagnosis Lahan AI",
    "🌾 2.400+ Koperasi Aktif",
    "📦 Bundle Proteksi Hemat",
    "🚚 Pengiriman ke Seluruh Indonesia",
    "💰 Revenue Split Otomatis",
    "🔬 47 Komoditas Tersedia",
    "⭐ Rating 4.8/5"
  ];

  const doubleItems = [...items, ...items];

  return (
    <div className="max-w-[1440px] mx-auto px-8 mt-0 mb-1 z-20">
      <div 
        className="w-full bg-transparent h-[64px] py-1 relative overflow-hidden flex items-center"
        style={{
          maskImage: "linear-gradient(to right, transparent, white 80px, white calc(100% - 80px), transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, white 80px, white calc(100% - 80px), transparent)"
        }}
      >
        <style>{`
          @keyframes marquee-scroll {
            0% {
              transform: translateX(0%);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          .animate-marquee-scroll {
            display: flex;
            width: max-content;
            animation: marquee-scroll 30s linear infinite;
          }
        `}</style>

        {/* Scrolling Content */}
        <div className="animate-marquee-scroll flex items-center gap-3">
          {doubleItems.map((item, idx) => (
            <div 
              key={idx} 
              className="bg-white border border-gray-200 rounded-full px-6 py-2.5 text-[14px] font-bold text-[#1B4332] shadow-[0_1px_4px_rgba(0,0,0,0.06)] flex items-center shrink-0"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
