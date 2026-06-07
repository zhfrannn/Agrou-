import { useRef } from "react";
import { motion } from "motion/react";
import { ArrowRight, ChevronLeft, ChevronRight, ShoppingCart, Star, MapPin, Flame } from "lucide-react";

const BEST_SELLERS = [
  {
    id: "bs1",
    name: "Kopi Arabika Gayo",
    koperasi: "Koperasi Gayo Mandiri",
    location: "Bener Meriah, Aceh",
    price: "Rp 180.000",
    unit: "/kg",
    image: "https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&q=80&w=600",
    badge: "Pertanian",
    badgeColor: "bg-[#2D6A4F]",
    rating: 4.9,
    sold: "2.4rb",
  },
  {
    id: "bs2",
    name: "Ikan Tuna Segar",
    koperasi: "KUD Sari Laut",
    location: "Aceh Besar",
    price: "Rp 85.000",
    unit: "/kg",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=600",
    badge: "Perikanan",
    badgeColor: "bg-[#0077B6]",
    rating: 4.8,
    sold: "1.8rb",
  },
  {
    id: "bs3",
    name: "Beras Pandan Wangi",
    koperasi: "KUD Sejahtera",
    location: "Cianjur, Jawa Barat",
    price: "Rp 18.000",
    unit: "/kg",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=600",
    badge: "Pertanian",
    badgeColor: "bg-[#2D6A4F]",
    rating: 5.0,
    sold: "3.1rb",
  },
  {
    id: "bs4",
    name: "Udang Vaname Segar",
    koperasi: "KUD Nelayan Mandiri",
    location: "Lampung",
    price: "Rp 65.000",
    unit: "/kg",
    image: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&q=80&w=600",
    badge: "Perikanan",
    badgeColor: "bg-[#0077B6]",
    rating: 4.7,
    sold: "1.2rb",
  },
  {
    id: "bs5",
    name: "Cabai Merah Keriting",
    koperasi: "KUD Tani Makmur",
    location: "Cianjur, Jawa Barat",
    price: "Rp 45.000",
    unit: "/kg",
    image: "https://images.unsplash.com/photo-1583119022894-919a68a3d0e3?auto=format&fit=crop&q=80&w=600",
    badge: "Pertanian",
    badgeColor: "bg-[#2D6A4F]",
    rating: 4.6,
    sold: "980",
  },
  {
    id: "bs6",
    name: "Madu Hutan Kalimantan",
    koperasi: "Koperasi Rimba Lestari",
    location: "Kalimantan Barat",
    price: "Rp 120.000",
    unit: "/btl",
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=600",
    badge: "Perkebunan",
    badgeColor: "bg-[#D4A017]",
    rating: 4.9,
    sold: "1.5rb",
  },
];

export default function BestSellers() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 320;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section className="w-full bg-transparent pt-12 pb-12 relative z-10">
      <div className="max-w-[1440px] mx-auto px-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-red-50 p-2 rounded-xl border border-red-100">
                <Flame size={20} className="text-red-500" />
              </div>
              <span className="text-red-500 font-bold text-sm tracking-wider uppercase">
                Produk Terlaris Minggu Ini
              </span>
            </div>
            <h2 className="font-display font-black text-3xl lg:text-4xl text-gray-900">
              Paling Banyak Dipesan
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => scroll("left")}
              className="bg-gray-100 hover:bg-gray-200 p-2.5 rounded-xl transition-colors active:scale-95"
            >
              <ChevronLeft size={20} className="text-gray-600" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="bg-gray-100 hover:bg-gray-200 p-2.5 rounded-xl transition-colors active:scale-95"
            >
              <ChevronRight size={20} className="text-gray-600" />
            </button>
            <a
              href="#"
              className="flex items-center gap-1.5 text-[#1B4D35] font-semibold text-sm hover:underline transition-colors group/all ml-2 shrink-0"
            >
              Lihat Semua
              <ArrowRight
                size={14}
                className="group-hover/all:translate-x-0.5 transition-transform"
              />
            </a>
          </div>
        </div>

        {/* Scrollable Cards */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {BEST_SELLERS.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, delay: idx * 0.07 }}
              className="min-w-[280px] max-w-[280px] snap-start bg-white rounded-2xl overflow-hidden flex flex-col
                         border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.06)]
                         hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)] hover:scale-[1.02]
                         transition-all duration-300 group"
            >
              {/* Image */}
              <div className="h-[180px] relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                {/* Best Seller Badge */}
                <div className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-orange-500 text-white text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                  <Flame size={10} />
                  Terlaris
                </div>
                {/* Category Badge */}
                <div className={`absolute top-3 right-3 ${product.badgeColor} text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm`}>
                  {product.badge}
                </div>
                {/* Rating overlay */}
                <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                  <Star size={11} className="text-amber-400 fill-amber-400" />
                  <span className="text-[11px] font-bold text-gray-700">{product.rating}</span>
                </div>
              </div>

              {/* Body */}
              <div className="p-4 flex-1 flex flex-col">
                <div className="flex items-center gap-1.5 text-gray-400 mb-1.5">
                  <MapPin size={11} />
                  <span className="text-[11px] font-medium truncate">{product.koperasi} • {product.location}</span>
                </div>

                <h4 className="font-bold text-[15px] text-gray-900 mb-1 leading-snug line-clamp-1">
                  {product.name}
                </h4>

                <span className="text-[11px] text-gray-400 font-medium mb-3">
                  {product.sold} terjual
                </span>

                <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-50">
                  <div>
                    <span className="text-[#E8720C] font-bold text-base">{product.price}</span>
                    <span className="text-gray-400 text-[11px] font-medium">{product.unit}</span>
                  </div>
                  <button className="flex items-center gap-1.5 bg-[#E8720C] hover:bg-[#d06608] text-white text-[12px] font-bold px-3 py-2 rounded-xl transition-colors active:scale-95 shadow-sm">
                    <ShoppingCart size={13} />
                    Pesan
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
