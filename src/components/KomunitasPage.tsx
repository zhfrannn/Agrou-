import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ShieldCheck, Star, TrendingUp, Users, Package, Wheat, Fish,
  Coffee, Carrot, Plus, User, X, MessageSquare, ArrowRight,
  Leaf, BarChart2, Sparkles, Heart, Share2, Bookmark,
  Search, Bell, ChevronDown, MapPin, Clock, CheckCircle2,
  Send, ThumbsUp, MoreHorizontal, Hash, Zap, AlertCircle
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────
type FeedFilter = "semua" | "diskusi" | "suplai";
type PostType = "diskusi" | "suplai";

interface Post {
  id: number;
  type: PostType;
  author: {
    name: string;
    role: "Petani" | "Koperasi" | "Pembeli" | "Distributor";
    location: string;
    verified: boolean;
    badge?: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
  likes: number;
  comments: Comment[];
  tags?: string[];
  // for suplai type
  commodity?: string;
  quantity?: string;
  priceRange?: string;
  urgency?: "normal" | "urgent";
}

interface Comment {
  id: number;
  author: string;
  role: string;
  avatar: string;
  content: string;
  timestamp: string;
  verified?: boolean;
}

// ─── Static Mock Data ─────────────────────────────────────────────────────────
const MOCK_POSTS: Post[] = [
  {
    id: 1,
    type: "suplai",
    author: {
      name: "Restoran Dapur Nusantara",
      role: "Pembeli",
      location: "Jakarta Selatan",
      verified: true,
      badge: "Pembeli Terverifikasi",
      avatar: "DN",
    },
    content:
      "Kami membutuhkan pasokan rutin tomat segar berkualitas untuk restoran kami. Prioritas supplier lokal dari Jawa Barat atau Jawa Tengah dengan kemasan higienis.",
    timestamp: "12 menit lalu",
    likes: 8,
    commodity: "Tomat Segar",
    quantity: "500 kg / minggu",
    priceRange: "Rp 8.000 – Rp 12.000 / kg",
    urgency: "urgent",
    tags: ["tomat", "sayuran", "jawa-barat"],
    comments: [
      {
        id: 1,
        author: "KUD Tani Makmur",
        role: "Koperasi",
        avatar: "KM",
        content: "Kami bisa memenuhi kebutuhan ini! Kapasitas 800kg/minggu dari lahan organik Cianjur.",
        timestamp: "5 menit lalu",
        verified: true,
      },
    ],
  },
  {
    id: 2,
    type: "diskusi",
    author: {
      name: "Pak Sugiarto Rahardjo",
      role: "Petani",
      location: "Subang, Jawa Barat",
      verified: true,
      badge: "Verified Protected Farm",
      avatar: "SR",
    },
    content:
      "Ada yang punya pengalaman tangani akar busuk (Fusarium) di musim hujan ini? Sudah 2 petak padi saya kena. Sudah coba fungisida Mancozeb tapi belum terlalu efektif. Minta saran dari rekan-rekan petani yang pernah hadapi masalah ini.",
    timestamp: "1 jam lalu",
    likes: 24,
    tags: ["fusarium", "padi", "penyakit-lahan"],
    comments: [
      {
        id: 1,
        author: "Penyuluh Pertanian Kab. Subang",
        role: "Konsultan",
        avatar: "PP",
        content:
          "Coba kombinasikan dengan Propikonazol sistemik, dan pastikan saluran air di sekitar petak lancar. Genangan air mempercepat penyebaran Fusarium.",
        timestamp: "45 menit lalu",
        verified: true,
      },
      {
        id: 2,
        author: "Bu Ratna Dewi",
        role: "Petani",
        avatar: "RD",
        content:
          "Saya dulu kena hal yang sama. Semprot pagi hari sebelum jam 9 dan jangan lupa tambah dosis Trichoderma ke media tanam.",
        timestamp: "30 menit lalu",
      },
    ],
  },
  {
    id: 3,
    type: "suplai",
    author: {
      name: "PT Kopi Senusantara",
      role: "Distributor",
      location: "Surabaya, Jawa Timur",
      verified: true,
      badge: "Distributor Premium",
      avatar: "KS",
    },
    content:
      "Mencari mitra koperasi yang bisa mensuplai kopi Arabika grade A secara konsisten untuk pasokan cafe chain kami di 15 kota. Kami prioritaskan koperasi dengan sertifikasi organik.",
    timestamp: "3 jam lalu",
    likes: 41,
    commodity: "Kopi Arabika Grade A",
    quantity: "2 Ton / bulan",
    priceRange: "Rp 85.000 – Rp 120.000 / kg",
    urgency: "normal",
    tags: ["kopi", "arabika", "organik"],
    comments: [],
  },
  {
    id: 4,
    type: "diskusi",
    author: {
      name: "KUD Nelayan Pantai Selatan",
      role: "Koperasi",
      location: "Cilacap, Jawa Tengah",
      verified: true,
      badge: "Koperasi Terdaftar",
      avatar: "KN",
    },
    content:
      "Ingin berbagi insight: harga udang vaname di TPI Cilacap naik 18% minggu ini akibat cuaca buruk di laut selatan. Rekan distributor mungkin bisa antisipasi buffer stok dari wilayah Jawa Timur yang kondisinya lebih stabil.",
    timestamp: "5 jam lalu",
    likes: 63,
    tags: ["udang", "harga-pasar", "informasi"],
    comments: [
      {
        id: 1,
        author: "PT Segar Nusantara",
        role: "Distributor",
        avatar: "SN",
        content: "Terima kasih infonya! Sudah kami teruskan ke tim procurement.",
        timestamp: "4 jam lalu",
        verified: true,
      },
    ],
  },
];

const TRENDING_COMMODITIES = [
  { rank: 1, name: "Tomat Segar", count: 142, trend: "+28%", color: "#EF4444" },
  { rank: 2, name: "Kopi Arabika", count: 98, trend: "+17%", color: "#92400E" },
  { rank: 3, name: "Udang Vaname", count: 87, trend: "+22%", color: "#0EA5E9" },
  { rank: 4, name: "Beras Premium", count: 71, trend: "+9%", color: "#F59E0B" },
  { rank: 5, name: "Cabai Merah", count: 65, trend: "+41%", color: "#DC2626" },
];

const AI_RADAR_MATCHES = [
  {
    id: 1,
    buyer: "Restoran Dapur Nusantara",
    commodity: "Tomat Segar",
    quantity: "500 kg/minggu",
    matchScore: 96,
    location: "Jakarta",
  },
  {
    id: 2,
    buyer: "Hotel Bintang Lima Bali",
    commodity: "Sayuran Organik Mix",
    quantity: "200 kg/minggu",
    matchScore: 88,
    location: "Bali",
  },
  {
    id: 3,
    buyer: "Supermarket NatureGreen",
    commodity: "Tomat & Cabai",
    quantity: "1 Ton/bulan",
    matchScore: 82,
    location: "Bandung",
  },
];

// ─── Role Badge Colors ─────────────────────────────────────────────────────────
const ROLE_STYLES: Record<string, { bg: string; text: string; border: string }> = {
  Petani: { bg: "#ECFDF5", text: "#065F46", border: "#A7F3D0" },
  Koperasi: { bg: "#EFF6FF", text: "#1D4ED8", border: "#BFDBFE" },
  Pembeli: { bg: "#FFF7ED", text: "#C2410C", border: "#FED7AA" },
  Distributor: { bg: "#F5F3FF", text: "#6D28D9", border: "#DDD6FE" },
  Konsultan: { bg: "#ECFDF5", text: "#065F46", border: "#A7F3D0" },
};

// ─── Helper: Avatar ────────────────────────────────────────────────────────────
function Avatar({ initials, size = "md", color = "#2D6A4F" }: { initials: string; size?: "sm" | "md" | "lg"; color?: string }) {
  const sizeClass = { sm: "w-8 h-8 text-xs", md: "w-10 h-10 text-sm", lg: "w-12 h-12 text-base" }[size];
  return (
    <div
      className={`${sizeClass} rounded-full flex items-center justify-center font-black text-white shrink-0 shadow-sm`}
      style={{ background: `linear-gradient(135deg, ${color}, ${color}cc)` }}
    >
      {initials}
    </div>
  );
}

// ─── Post Card Components ──────────────────────────────────────────────────────

function SupaiPostCard({ post, onOffer }: { post: Post; onOffer: (post: Post) => void }) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount((c) => (liked ? c - 1 : c + 1));
  };

  const roleStyle = ROLE_STYLES[post.author.role] || ROLE_STYLES.Petani;
  const avatarColor = post.author.role === "Pembeli" ? "#C2410C" : post.author.role === "Distributor" ? "#6D28D9" : "#2D6A4F";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
    >
      {/* Urgency Tag */}
      {post.urgency === "urgent" && (
        <div className="bg-gradient-to-r from-red-500 to-orange-500 px-4 py-1.5 flex items-center gap-2">
          <Zap size={11} className="text-white" />
          <span className="text-[10px] font-black text-white uppercase tracking-wider">Permintaan Mendesak</span>
        </div>
      )}

      <div className="p-5">
        {/* Post Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-start gap-3">
            <Avatar initials={post.author.avatar} size="md" color={avatarColor} />
            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="font-bold text-gray-900 text-sm leading-tight">{post.author.name}</span>
                {post.author.verified && <ShieldCheck size={13} className="text-[#2D6A4F] shrink-0" />}
                {post.author.badge === "Verified Protected Farm" && (
                  <span className="text-[9px] font-black px-1.5 py-0.5 rounded-full bg-[#2D6A4F] text-white">VPF ✓</span>
                )}
              </div>
              <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                <span
                  className="text-[10px] font-bold px-2 py-0.5 rounded-full border"
                  style={{ backgroundColor: roleStyle.bg, color: roleStyle.text, borderColor: roleStyle.border }}
                >
                  {post.author.role}
                </span>
                <div className="flex items-center gap-1 text-gray-400">
                  <MapPin size={9} />
                  <span className="text-[10px]">{post.author.location}</span>
                </div>
                <div className="flex items-center gap-1 text-gray-300">
                  <Clock size={9} />
                  <span className="text-[10px]">{post.timestamp}</span>
                </div>
              </div>
            </div>
          </div>
          <button className="text-gray-300 hover:text-gray-500 transition-colors p-1 rounded-lg cursor-pointer">
            <MoreHorizontal size={16} />
          </button>
        </div>

        {/* Suplai Badge */}
        <div className="inline-flex items-center gap-1.5 bg-orange-50 border border-orange-100 text-[#F77F00] px-3 py-1 rounded-full mb-3">
          <Package size={11} />
          <span className="text-[10px] font-black uppercase tracking-wider">Cari Suplai</span>
        </div>

        {/* Post Content */}
        <p className="text-sm text-gray-700 leading-relaxed mb-4">{post.content}</p>

        {/* Commodity Details Box */}
        <div className="bg-gray-50/80 border border-gray-100 rounded-xl p-3.5 mb-4">
          <div className="grid grid-cols-3 gap-3">
            <div>
              <p className="text-[9px] font-black text-gray-400 uppercase tracking-wider mb-0.5">Komoditas</p>
              <p className="text-xs font-bold text-gray-800">{post.commodity}</p>
            </div>
            <div>
              <p className="text-[9px] font-black text-gray-400 uppercase tracking-wider mb-0.5">Volume</p>
              <p className="text-xs font-bold text-gray-800">{post.quantity}</p>
            </div>
            <div>
              <p className="text-[9px] font-black text-gray-400 uppercase tracking-wider mb-0.5">Harga Target</p>
              <p className="text-xs font-bold text-[#F77F00]">{post.priceRange}</p>
            </div>
          </div>
        </div>

        {/* Tags */}
        {post.tags && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {post.tags.map((t) => (
              <span key={t} className="text-[10px] font-bold text-[#2D6A4F] bg-green-50 px-2 py-0.5 rounded-full cursor-pointer hover:bg-green-100 transition-colors">
                #{t}
              </span>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-2 pt-3 border-t border-gray-50">
          <button
            onClick={() => onOffer(post)}
            className="flex-1 bg-[#F77F00] hover:bg-[#E06D00] text-white font-bold py-2 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-sm"
          >
            <Zap size={13} />
            Tawarkan Suplai
          </button>
          <button
            onClick={handleLike}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl font-bold text-xs transition-all cursor-pointer ${
              liked ? "bg-red-50 text-red-500" : "bg-gray-50 text-gray-500 hover:bg-gray-100"
            }`}
          >
            <Heart size={13} className={liked ? "fill-red-500" : ""} />
            <span>{likeCount}</span>
          </button>
          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gray-50 text-gray-500 hover:bg-gray-100 font-bold text-xs transition-all cursor-pointer"
          >
            <MessageSquare size={13} />
            <span>{post.comments.length}</span>
          </button>
          <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gray-50 text-gray-500 hover:bg-gray-100 font-bold text-xs transition-all cursor-pointer">
            <Share2 size={13} />
          </button>
        </div>
      </div>

      {/* Comments Section */}
      <AnimatePresence>
        {showComments && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="border-t border-gray-50 bg-gray-50/50"
          >
            <div className="p-4 space-y-3">
              {post.comments.map((c) => (
                <div key={c.id} className="flex gap-2.5">
                  <Avatar initials={c.avatar} size="sm" color={c.verified ? "#2D6A4F" : "#6B7280"} />
                  <div className="flex-1 bg-white border border-gray-100 rounded-xl px-3 py-2 shadow-xs">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="text-[11px] font-bold text-gray-800">{c.author}</span>
                      {c.verified && <ShieldCheck size={10} className="text-[#2D6A4F]" />}
                      <span className="text-[9px] text-gray-400">{c.role}</span>
                    </div>
                    <p className="text-xs text-gray-600 leading-snug">{c.content}</p>
                  </div>
                </div>
              ))}
              {/* New comment input */}
              <div className="flex gap-2.5">
                <Avatar initials="MH" size="sm" color="#2D6A4F" />
                <div className="flex-1 flex gap-2 items-center bg-white border border-gray-200 rounded-xl px-3 py-1.5 focus-within:border-[#2D6A4F] transition-colors">
                  <input
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Tulis komentar..."
                    className="flex-1 text-xs bg-transparent focus:outline-none text-gray-700 placeholder:text-gray-300"
                  />
                  <button className="text-[#2D6A4F] hover:text-[#1B4332] cursor-pointer">
                    <Send size={13} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function DiskusiPostCard({ post }: { post: Post }) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [showComments, setShowComments] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [newComment, setNewComment] = useState("");

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount((c) => (liked ? c - 1 : c + 1));
  };

  const roleStyle = ROLE_STYLES[post.author.role] || ROLE_STYLES.Petani;
  const avatarColor =
    post.author.role === "Pembeli" ? "#C2410C" :
    post.author.role === "Distributor" ? "#6D28D9" :
    post.author.role === "Koperasi" ? "#1D4ED8" : "#2D6A4F";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="p-5">
        {/* Post Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-start gap-3">
            <Avatar initials={post.author.avatar} size="md" color={avatarColor} />
            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="font-bold text-gray-900 text-sm leading-tight">{post.author.name}</span>
                {post.author.verified && <ShieldCheck size={13} className="text-[#2D6A4F] shrink-0" />}
                {post.author.badge === "Verified Protected Farm" && (
                  <span className="text-[9px] font-black px-1.5 py-0.5 rounded-full bg-[#2D6A4F] text-white">VPF ✓</span>
                )}
              </div>
              <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                <span
                  className="text-[10px] font-bold px-2 py-0.5 rounded-full border"
                  style={{ backgroundColor: roleStyle.bg, color: roleStyle.text, borderColor: roleStyle.border }}
                >
                  {post.author.role}
                </span>
                <div className="flex items-center gap-1 text-gray-400">
                  <MapPin size={9} />
                  <span className="text-[10px]">{post.author.location}</span>
                </div>
                <div className="flex items-center gap-1 text-gray-300">
                  <Clock size={9} />
                  <span className="text-[10px]">{post.timestamp}</span>
                </div>
              </div>
            </div>
          </div>
          <button className="text-gray-300 hover:text-gray-500 transition-colors p-1 rounded-lg cursor-pointer">
            <MoreHorizontal size={16} />
          </button>
        </div>

        {/* Diskusi Badge */}
        <div className="inline-flex items-center gap-1.5 bg-green-50 border border-green-100 text-[#2D6A4F] px-3 py-1 rounded-full mb-3">
          <MessageSquare size={11} />
          <span className="text-[10px] font-black uppercase tracking-wider">Diskusi</span>
        </div>

        {/* Post Content */}
        <p className="text-sm text-gray-700 leading-relaxed mb-4">{post.content}</p>

        {/* Tags */}
        {post.tags && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {post.tags.map((t) => (
              <span key={t} className="text-[10px] font-bold text-[#2D6A4F] bg-green-50 px-2 py-0.5 rounded-full cursor-pointer hover:bg-green-100 transition-colors">
                #{t}
              </span>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-2 pt-3 border-t border-gray-50">
          <button
            onClick={() => setShowComments(!showComments)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-bold text-xs transition-all cursor-pointer ${
              showComments ? "bg-green-50 text-[#2D6A4F]" : "bg-gray-50 text-gray-500 hover:bg-gray-100"
            }`}
          >
            <MessageSquare size={13} />
            <span>{post.comments.length} Komentar</span>
          </button>
          <button
            onClick={handleLike}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-bold text-xs transition-all cursor-pointer ${
              liked ? "bg-red-50 text-red-500" : "bg-gray-50 text-gray-500 hover:bg-gray-100"
            }`}
          >
            <ThumbsUp size={13} className={liked ? "fill-red-100" : ""} />
            <span>{likeCount}</span>
          </button>
          <button
            onClick={() => setBookmarked(!bookmarked)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-bold text-xs transition-all cursor-pointer ${
              bookmarked ? "bg-amber-50 text-amber-600" : "bg-gray-50 text-gray-500 hover:bg-gray-100"
            }`}
          >
            <Bookmark size={13} className={bookmarked ? "fill-amber-400" : ""} />
          </button>
          <button className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gray-50 text-gray-500 hover:bg-gray-100 font-bold text-xs transition-all cursor-pointer ml-auto">
            <Share2 size={13} />
            <span className="hidden sm:inline">Bagikan</span>
          </button>
        </div>
      </div>

      {/* Comments Section */}
      <AnimatePresence>
        {showComments && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="border-t border-gray-50 bg-gray-50/50"
          >
            <div className="p-4 space-y-3">
              {post.comments.length === 0 && (
                <p className="text-xs text-gray-400 text-center py-2">Belum ada komentar. Jadilah yang pertama!</p>
              )}
              {post.comments.map((c) => (
                <div key={c.id} className="flex gap-2.5">
                  <Avatar initials={c.avatar} size="sm" color={c.verified ? "#2D6A4F" : "#6B7280"} />
                  <div className="flex-1 bg-white border border-gray-100 rounded-xl px-3 py-2 shadow-xs">
                    <div className="flex items-center gap-1.5 mb-0.5 flex-wrap">
                      <span className="text-[11px] font-bold text-gray-800">{c.author}</span>
                      {c.verified && <ShieldCheck size={10} className="text-[#2D6A4F]" />}
                      <span className="text-[9px] text-gray-400">{c.role}</span>
                      <span className="text-[9px] text-gray-300">• {c.timestamp}</span>
                    </div>
                    <p className="text-xs text-gray-600 leading-snug">{c.content}</p>
                  </div>
                </div>
              ))}
              {/* New comment input */}
              <div className="flex gap-2.5">
                <Avatar initials="MH" size="sm" color="#2D6A4F" />
                <div className="flex-1 flex gap-2 items-center bg-white border border-gray-200 rounded-xl px-3 py-1.5 focus-within:border-[#2D6A4F] transition-colors">
                  <input
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Tulis komentar atau saran..."
                    className="flex-1 text-xs bg-transparent focus:outline-none text-gray-700 placeholder:text-gray-300"
                  />
                  <button className="text-[#2D6A4F] hover:text-[#1B4332] cursor-pointer">
                    <Send size={13} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Offer Modal ──────────────────────────────────────────────────────────────
function OfferModal({ post, onClose }: { post: Post; onClose: () => void }) {
  const [step, setStep] = useState<1 | 2>(1);
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [notes, setNotes] = useState("");
  const [sent, setSent] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(onClose, 2200);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[200] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl w-full max-w-[500px] shadow-2xl overflow-hidden"
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#F77F00] to-[#E06D00] p-5 relative overflow-hidden">
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/10 rounded-full" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center">
                  <Zap size={14} className="text-white" />
                </div>
                <span className="text-[10px] font-black text-white/80 uppercase tracking-wider">Formulir Penawaran Suplai</span>
              </div>
              <button onClick={onClose} className="text-white/70 hover:text-white cursor-pointer">
                <X size={18} />
              </button>
            </div>
            <h3 className="font-display font-black text-white text-lg leading-tight">
              Tawarkan ke: {post.author.name}
            </h3>
            <p className="text-white/70 text-xs mt-0.5">
              {post.commodity} • {post.quantity}
            </p>
          </div>
        </div>

        {sent ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 text-center"
          >
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={32} className="text-[#2D6A4F]" />
            </div>
            <h4 className="font-display font-black text-gray-900 text-lg mb-2">Penawaran Terkirim!</h4>
            <p className="text-sm text-gray-500">
              Penawaran Anda sudah dikirim ke <strong>{post.author.name}</strong>. Tunggu konfirmasi dari mereka.
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleSend} className="p-6 space-y-4">
            {/* AI Auto-Fill notice */}
            <div className="bg-green-50 border border-green-100 rounded-xl p-3 flex items-start gap-2.5">
              <Sparkles size={14} className="text-[#2D6A4F] shrink-0 mt-0.5" />
              <div>
                <p className="text-[11px] font-bold text-[#2D6A4F]">LadangAI mengisi otomatis dari data dashboard Anda</p>
                <p className="text-[10px] text-gray-500 mt-0.5">
                  Stok aktif: Tomat Segar 850 kg • Harga jual: Rp 9.500/kg
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wider">
                  Volume Sanggup Suplai
                </label>
                <input
                  required
                  type="text"
                  placeholder="Contoh: 500 kg / minggu"
                  defaultValue="500 kg / minggu"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#F77F00] text-sm font-medium transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wider">
                  Harga yang Ditawarkan
                </label>
                <input
                  required
                  type="text"
                  placeholder="Contoh: Rp 9.500 / kg"
                  defaultValue="Rp 9.500 / kg"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#F77F00] text-sm font-medium transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wider">
                Catatan Tambahan (Opsional)
              </label>
              <textarea
                rows={3}
                placeholder="Kualitas, sertifikasi, kemasan, jadwal pengiriman..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#F77F00] text-sm font-medium transition-all resize-none"
              />
            </div>

            {/* Badge showcase */}
            <div className="bg-gray-50 rounded-xl p-3 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#2D6A4F] flex items-center justify-center shrink-0">
                <ShieldCheck size={16} className="text-white" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-gray-800">Verified Protected Farm Badge akan ditampilkan</p>
                <p className="text-[9px] text-gray-400 mt-0.5">Meningkatkan kepercayaan pembeli hingga 3x lipat</p>
              </div>
            </div>

            <button
              type="submit"
              className="w-full h-11 bg-[#F77F00] hover:bg-[#E06D00] text-white rounded-xl font-bold text-sm transition-all shadow-md shadow-orange-500/10 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send size={15} />
              Kirim Penawaran Suplai
            </button>
          </form>
        )}
      </motion.div>
    </motion.div>
  );
}

// ─── Post Creator Box ──────────────────────────────────────────────────────────
function PostCreatorBox({ onPost }: { onPost: (type: PostType, content: string) => void }) {
  const [expanded, setExpanded] = useState(false);
  const [activeType, setActiveType] = useState<PostType>("diskusi");
  const [content, setContent] = useState("");
  const [commodity, setCommodity] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    onPost(activeType, content);
    setContent("");
    setCommodity("");
    setQuantity("");
    setExpanded(false);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
      {!expanded ? (
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => setExpanded(true)}
        >
          <Avatar initials="MH" size="md" color="#2D6A4F" />
          <div className="flex-1 bg-gray-50 border border-gray-100 rounded-full px-4 py-2.5 hover:border-[#2D6A4F] hover:bg-green-50/30 transition-all">
            <span className="text-sm text-gray-400 font-medium">Bagikan update, diskusi, atau cari suplai...</span>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="flex items-start gap-3 mb-3">
            <Avatar initials="MH" size="md" color="#2D6A4F" />
            <div className="flex-1">
              {/* Type Selector */}
              <div className="flex gap-2 mb-3">
                <button
                  type="button"
                  onClick={() => setActiveType("diskusi")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    activeType === "diskusi" ? "bg-[#2D6A4F] text-white" : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                  }`}
                >
                  <MessageSquare size={11} /> Diskusi
                </button>
                <button
                  type="button"
                  onClick={() => setActiveType("suplai")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    activeType === "suplai" ? "bg-[#F77F00] text-white" : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                  }`}
                >
                  <Package size={11} /> Cari Suplai
                </button>
              </div>

              <textarea
                autoFocus
                rows={3}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={
                  activeType === "diskusi"
                    ? "Apa yang ingin Anda diskusikan tentang lahan atau komoditas?"
                    : "Deskripsikan kebutuhan suplai Anda..."
                }
                className="w-full text-sm text-gray-800 bg-transparent resize-none focus:outline-none placeholder:text-gray-300 leading-relaxed"
              />

              {activeType === "suplai" && (
                <div className="grid grid-cols-2 gap-2 mt-2 bg-gray-50 rounded-xl p-3 border border-gray-100">
                  <input
                    type="text"
                    placeholder="Jenis komoditas"
                    value={commodity}
                    onChange={(e) => setCommodity(e.target.value)}
                    className="text-xs px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#F77F00] transition-all"
                  />
                  <input
                    type="text"
                    placeholder="Volume / frekuensi"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="text-xs px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#F77F00] transition-all"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-gray-50">
            <button
              type="button"
              onClick={() => setExpanded(false)}
              className="text-xs text-gray-400 hover:text-gray-600 font-bold cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={!content.trim()}
              className="flex items-center gap-1.5 px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed bg-[#2D6A4F] text-white hover:bg-[#1B4332]"
            >
              <Send size={12} />
              {activeType === "diskusi" ? "Posting Diskusi" : "Pasang Permintaan"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function KomunitasPage() {
  const [activeFilter, setActiveFilter] = useState<FeedFilter>("semua");
  const [offerPost, setOfferPost] = useState<Post | null>(null);
  const [posts, setPosts] = useState<Post[]>(MOCK_POSTS);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = posts.filter((p) => {
    const matchesFilter =
      activeFilter === "semua" ||
      (activeFilter === "diskusi" && p.type === "diskusi") ||
      (activeFilter === "suplai" && p.type === "suplai");
    const matchesSearch =
      !searchQuery ||
      p.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.author.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleNewPost = (type: PostType, content: string) => {
    const newPost: Post = {
      id: Date.now(),
      type,
      author: {
        name: "Muhammad Hafizh",
        role: "Petani",
        location: "Subang, Jawa Barat",
        verified: true,
        badge: "Verified Protected Farm",
        avatar: "MH",
      },
      content,
      timestamp: "Baru saja",
      likes: 0,
      tags: [],
      comments: [],
    };
    setPosts([newPost, ...posts]);
  };

  return (
    <div className="min-h-screen bg-[#F3F4F6]">
      {/* Search Bar Banner */}
      <div className="bg-white border-b border-gray-100 sticky top-[52px] z-40 shadow-sm">
        <div className="max-w-[1440px] mx-auto px-6 py-2.5 flex items-center gap-4">
          <div className="flex-1 flex items-center gap-2.5 bg-gray-50 border border-gray-200 rounded-full px-4 py-2 focus-within:border-[#2D6A4F] focus-within:bg-white transition-all">
            <Search size={14} className="text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari diskusi, komoditas, atau anggota komunitas..."
              className="flex-1 text-sm bg-transparent focus:outline-none text-gray-700 placeholder:text-gray-400"
            />
          </div>
          <button className="relative p-2.5 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-all cursor-pointer">
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
          </button>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 lg:px-6 py-6">
        <div className="flex gap-5 items-start">

          {/* ── LEFT SIDEBAR ─────────────────────────────────────────────── */}
          <aside className="hidden lg:flex flex-col gap-4 w-[280px] shrink-0 sticky top-[108px]">
            {/* Profile Card */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              {/* Cover */}
              <div className="h-16 bg-gradient-to-br from-[#1B4332] to-[#2D6A4F] relative">
                <div className="absolute inset-0 opacity-20" style={{
                  backgroundImage: "radial-gradient(circle at 70% 50%, #40916C 0%, transparent 60%)"
                }} />
              </div>
              {/* Avatar overlap */}
              <div className="px-4 pb-4">
                <div className="-mt-7 mb-3 flex items-end justify-between">
                  <div className="w-14 h-14 rounded-2xl border-4 border-white bg-gradient-to-br from-[#2D6A4F] to-[#40916C] flex items-center justify-center shadow-md">
                    <span className="font-black text-white text-base">MH</span>
                  </div>
                  <button className="text-[10px] font-bold text-[#2D6A4F] border border-[#2D6A4F] px-2.5 py-1 rounded-full hover:bg-green-50 transition-colors cursor-pointer">
                    Edit Profil
                  </button>
                </div>

                <h3 className="font-display font-black text-gray-900 text-sm leading-tight">Muhammad Hafizh</h3>
                <p className="text-[11px] text-gray-500 mb-1">Petani Padi & Sayuran Organik</p>
                <div className="flex items-center gap-1 text-gray-400 mb-3">
                  <MapPin size={10} />
                  <span className="text-[10px]">Subang, Jawa Barat</span>
                </div>

                {/* VPF Badge */}
                <div className="bg-gradient-to-r from-[#1B4332] to-[#2D6A4F] rounded-xl p-2.5 mb-3 flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
                    <ShieldCheck size={13} className="text-white" />
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-white/70 uppercase tracking-wider">Badge Aktif</p>
                    <p className="text-[11px] font-bold text-white">Verified Protected Farm</p>
                  </div>
                  <Star size={11} className="text-amber-300 fill-amber-300 ml-auto shrink-0" />
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {[
                    { label: "Panen Terjual", value: "12.4T", sub: "tahun ini" },
                    { label: "Stok Aktif", value: "850kg", sub: "tomat" },
                    { label: "Rating", value: "4.9", sub: "⭐" },
                  ].map((s) => (
                    <div key={s.label} className="bg-gray-50 rounded-xl p-2 text-center border border-gray-100">
                      <p className="text-xs font-black text-gray-900">{s.value}</p>
                      <p className="text-[8px] text-gray-400 font-medium leading-tight">{s.label}</p>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-1.5 text-[10px] text-gray-400">
                  <Users size={10} />
                  <span><strong className="text-gray-700">128</strong> Koneksi Komunitas</span>
                </div>
              </div>
            </div>

            {/* Feed Filters */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
              <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-wider mb-3">Filter Feed</h4>
              <div className="space-y-1">
                {[
                  { key: "semua", label: "Semua Postingan", icon: Hash, count: posts.length },
                  { key: "diskusi", label: "Diskusi Lahan", icon: MessageSquare, count: posts.filter((p) => p.type === "diskusi").length },
                  { key: "suplai", label: "Permintaan Suplai", icon: Package, count: posts.filter((p) => p.type === "suplai").length },
                ] .map((f) => (
                  <button
                    key={f.key}
                    onClick={() => setActiveFilter(f.key as FeedFilter)}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left text-xs font-bold transition-all cursor-pointer ${
                      activeFilter === f.key
                        ? "bg-[#2D6A4F] text-white"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <f.icon size={13} />
                    <span className="flex-1">{f.label}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-black ${
                      activeFilter === f.key ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"
                    }`}>{f.count}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Trending Topics */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
              <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-wider mb-3">Topik Populer</h4>
              <div className="space-y-2">
                {["#fusarium", "#padi-organik", "#kopi-arabika", "#harga-tomat", "#udang-vaname"].map((tag, i) => (
                  <button key={tag} className="w-full flex items-center gap-2 text-left cursor-pointer group">
                    <span className="text-[10px] font-black text-gray-300 w-3">#{i + 1}</span>
                    <span className="text-xs font-bold text-[#2D6A4F] group-hover:underline">{tag}</span>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* ── CENTER COLUMN (MAIN FEED) ─────────────────────────────────── */}
          <main className="flex-1 min-w-0 space-y-4">
            {/* Post Creator */}
            <PostCreatorBox onPost={handleNewPost} />

            {/* Filter Pills (mobile visible) */}
            <div className="flex gap-2 lg:hidden overflow-x-auto pb-1">
              {[
                { key: "semua", label: "Semua" },
                { key: "diskusi", label: "Diskusi" },
                { key: "suplai", label: "Cari Suplai" },
              ].map((f) => (
                <button
                  key={f.key}
                  onClick={() => setActiveFilter(f.key as FeedFilter)}
                  className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    activeFilter === f.key ? "bg-[#2D6A4F] text-white" : "bg-white text-gray-600 border border-gray-200"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Feed */}
            <AnimatePresence mode="popLayout">
              {filteredPosts.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="bg-white rounded-2xl border border-gray-100 p-8 text-center"
                >
                  <AlertCircle size={32} className="text-gray-200 mx-auto mb-3" />
                  <h3 className="font-display font-black text-gray-400 text-sm">Tidak ada postingan</h3>
                  <p className="text-xs text-gray-300 mt-1">Coba ubah filter atau kata kunci pencarian.</p>
                </motion.div>
              ) : (
                filteredPosts.map((post) =>
                  post.type === "suplai" ? (
                    <SupaiPostCard key={post.id} post={post} onOffer={setOfferPost} />
                  ) : (
                    <DiskusiPostCard key={post.id} post={post} />
                  )
                )
              )}
            </AnimatePresence>

            {/* Load More */}
            <button className="w-full py-3 text-xs font-bold text-gray-400 hover:text-gray-600 bg-white rounded-2xl border border-gray-100 hover:border-gray-200 transition-all cursor-pointer flex items-center justify-center gap-2">
              <ChevronDown size={14} />
              Muat lebih banyak postingan
            </button>
          </main>

          {/* ── RIGHT PANEL ──────────────────────────────────────────────── */}
          <aside className="hidden xl:flex flex-col gap-4 w-[320px] shrink-0 sticky top-[108px]">
            {/* AI Radar Widget */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="bg-gradient-to-br from-slate-900 to-[#1B4332] p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-xl bg-white/15 flex items-center justify-center">
                    <Sparkles size={16} className="text-white" />
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-white/60 uppercase tracking-wider">Powered by LadangAI</p>
                    <h3 className="font-display font-black text-white text-sm leading-tight">AI Radar Peluang</h3>
                  </div>
                </div>
                <div className="bg-white/10 rounded-xl px-3 py-2.5">
                  <p className="text-[11px] text-white/80 leading-snug">
                    Berdasarkan stok aktif <strong className="text-white">Tomat Segar 850kg</strong> Anda, ada{" "}
                    <strong className="text-amber-300">3 permintaan baru</strong> yang cocok di komunitas. 🎯
                  </p>
                </div>
              </div>
              <div className="p-3 space-y-2">
                {AI_RADAR_MATCHES.map((match) => (
                  <div
                    key={match.id}
                    className="flex items-center gap-3 p-2.5 rounded-xl bg-gray-50/80 border border-gray-100 hover:border-[#2D6A4F] hover:bg-green-50/30 transition-all cursor-pointer group"
                  >
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#2D6A4F] to-[#40916C] flex items-center justify-center shrink-0">
                      <Package size={14} className="text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className="text-[11px] font-bold text-gray-800 truncate">{match.buyer}</span>
                      </div>
                      <p className="text-[10px] text-gray-500">
                        {match.commodity} • {match.quantity}
                      </p>
                      <div className="flex items-center gap-1 mt-0.5">
                        <MapPin size={8} className="text-gray-400" />
                        <span className="text-[9px] text-gray-400">{match.location}</span>
                      </div>
                    </div>
                    <div className="shrink-0 text-right">
                      <div
                        className="text-[10px] font-black px-1.5 py-0.5 rounded-full"
                        style={{
                          backgroundColor: match.matchScore >= 90 ? "#ECFDF5" : "#FFF7ED",
                          color: match.matchScore >= 90 ? "#065F46" : "#C2410C",
                        }}
                      >
                        {match.matchScore}%
                      </div>
                      <p className="text-[8px] text-gray-400 mt-0.5">Cocok</p>
                    </div>
                  </div>
                ))}
                <button className="w-full mt-1 flex items-center justify-center gap-1.5 py-2.5 bg-gradient-to-r from-[#1B4332] to-[#2D6A4F] text-white rounded-xl font-bold text-xs cursor-pointer hover:opacity-90 transition-opacity">
                  <Zap size={12} />
                  Buat Penawaran via AI
                  <ArrowRight size={11} />
                </button>
              </div>
            </div>

            {/* Trending Komoditas Leaderboard */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp size={15} className="text-[#F77F00]" />
                <h3 className="font-display font-black text-gray-900 text-sm">Trending Komoditas</h3>
                <span className="ml-auto text-[10px] font-bold text-gray-400">7 hari ini</span>
              </div>
              <div className="space-y-2.5">
                {TRENDING_COMMODITIES.map((item) => (
                  <div key={item.rank} className="flex items-center gap-3 group cursor-pointer">
                    <span
                      className={`text-xs font-black w-5 text-center shrink-0 ${
                        item.rank <= 3 ? "text-[#F77F00]" : "text-gray-300"
                      }`}
                    >
                      {item.rank}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-2 h-2 rounded-full shrink-0"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-xs font-bold text-gray-700 group-hover:text-[#2D6A4F] transition-colors">
                          {item.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <div className="h-1 rounded-full" style={{
                          width: `${(item.count / TRENDING_COMMODITIES[0].count) * 100}%`,
                          backgroundColor: item.color,
                          opacity: 0.3,
                          maxWidth: "80px"
                        }} />
                        <span className="text-[9px] text-gray-400">{item.count} diskusi</span>
                      </div>
                    </div>
                    <span
                      className="text-[10px] font-black px-1.5 py-0.5 rounded-full shrink-0"
                      style={{ backgroundColor: `${item.color}15`, color: item.color }}
                    >
                      {item.trend}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Anggota Aktif */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
              <div className="flex items-center gap-2 mb-4">
                <Users size={15} className="text-[#2D6A4F]" />
                <h3 className="font-display font-black text-gray-900 text-sm">Anggota Aktif Minggu Ini</h3>
              </div>
              <div className="space-y-3">
                {[
                  { name: "KUD Tani Makmur", role: "Koperasi", initials: "KM", color: "#1D4ED8", location: "Cianjur" },
                  { name: "Bu Sari Pertiwi", role: "Petani", initials: "SP", color: "#2D6A4F", location: "Malang" },
                  { name: "Agro Fresh Supply", role: "Distributor", initials: "AF", color: "#6D28D9", location: "Surabaya" },
                ].map((m) => (
                  <div key={m.name} className="flex items-center gap-3 group cursor-pointer">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-white text-[11px] font-black shrink-0"
                      style={{ backgroundColor: m.color }}
                    >
                      {m.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-gray-800 truncate group-hover:text-[#2D6A4F] transition-colors">{m.name}</p>
                      <p className="text-[10px] text-gray-400">{m.role} • {m.location}</p>
                    </div>
                    <button className="text-[10px] font-bold text-[#2D6A4F] border border-[#2D6A4F] px-2 py-0.5 rounded-full hover:bg-green-50 transition-colors cursor-pointer shrink-0">
                      + Hubungi
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Links */}
            <p className="text-[10px] text-gray-300 text-center leading-relaxed px-2">
              Agrou Komunitas • <a href="#" className="hover:underline">Kebijakan Privasi</a> • <a href="#" className="hover:underline">Syarat Penggunaan</a>
            </p>
          </aside>

        </div>
      </div>

      {/* Offer Modal */}
      <AnimatePresence>
        {offerPost && (
          <OfferModal post={offerPost} onClose={() => setOfferPost(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
