# Redesign Halaman Tanya AI TaniCure

## Overview
Halaman Tanya AI TaniCure telah didesain ulang menjadi tampilan chat modern mirip ChatGPT atau WhatsApp Web dengan layout tiga kolom yang responsif.

## Fitur Utama

### 1. **Layout Tiga Kolom**
- **Kolom Kiri (260px)**: Sidebar riwayat chat
- **Kolom Tengah (flex-1)**: Area chat utama
- **Kolom Kanan (280px)**: Panel rekomendasi produk

### 2. **Sidebar Kiri - Riwayat Chat**
- Header dengan icon bot hijau dan status online
- Tombol "+ Chat Baru" hijau solid dengan rounded-xl
- List riwayat percakapan dengan grouping:
  - **Hari Ini**
  - **Kemarin**
  - **7 Hari Lalu**
- Setiap item riwayat menampilkan:
  - Icon chat kecil
  - Judul percakapan (1 baris, truncated)
  - Timestamp relatif (text-xs abu)
- Hover state: background abu sangat muda
- Background sidebar: #F8F9FA
- Border kanan tipis

### 3. **Area Chat Tengah**
- **Header Bar**:
  - Icon bot + nama session "Asisten Diagnosis Lahan"
  - Subtitle "TaniCure Tani"
  - Indicator status online (hijau)
  - Tombol X di kanan untuk close
  
- **Tab Switcher**:
  - "Tanya AI" (active: bg hijau tua, teks putih)
  - "Artikel & Video" (inactive: bg abu, teks abu)
  
- **Area Pesan**:
  - Background putih dengan padding
  - **Pesan Bot**:
    - Bubble kiri dengan bg abu sangat muda (#F1F5F9)
    - Rounded-2xl dengan rounded-tl-sm
    - Avatar icon bot hijau kecil di kiri atas
    - Teks hitam
  - **Pesan User**:
    - Bubble kanan dengan bg hijau tua
    - Teks putih
    - Rounded-2xl dengan rounded-tr-sm
  - Timestamp text-xs abu di bawah setiap bubble
  - **Typing Indicator**: Animasi tiga titik bergerak saat bot menjawab
  
- **Suggestion Chips**:
  - 3-4 quick reply pills horizontal scrollable
  - Background putih, border hijau, teks hijau
  - Hilang setelah user pilih atau mulai ketik
  
- **Input Bar**:
  - Background putih dengan border atas tipis
  - Input field rounded-full dengan bg abu sangat muda
  - Placeholder: "Tanyakan masalah lahanmu..."
  - Tombol kirim bulat hijau solid dengan icon arrow
  - Tombol attachment icon di kiri input

### 4. **Panel Kanan - Rekomendasi Produk**
- Header "Rekomendasi Produk" dengan icon bintang
- Muncul setelah bot memberikan diagnosis
- **Card Produk**:
  - Foto produk 60x60px di kiri
  - Nama produk (text-sm bold)
  - Kategori pill (text-xs)
  - Harga hijau bold
  - Tombol "+ Keranjang" kecil oranye
- Separator antar produk
- Tombol "Lihat Semua Rekomendasi →" full width outline hijau

### 5. **Responsif Mobile**
- Sidebar dan panel kanan tersembunyi
- Hanya area chat tampil full screen
- Tombol hamburger untuk buka sidebar
- Overlay dark untuk menutup sidebar

## Integrasi dengan Sistem

### Modal Diagnosis (Tetap Dipertahankan)
- Popup modal diagnosis komoditas tetap utuh
- Dapat diakses dengan tombol "Mulai Diagnosis Lengkap" 
- Muncul setelah percakapan awal dengan bot
- Flow: Pilih Komoditas → Pilih Gejala → Lihat Hasil tetap sama

## File Yang Dimodifikasi

### 1. **TanyaAIPage.tsx** (Baru)
File komponen utama halaman Tanya AI dengan implementasi lengkap:
- Layout tiga kolom responsif
- State management untuk messages, typing indicator, tabs
- Mock data untuk chat history dan product recommendations
- Integrasi dengan DiagnosisChatbot modal

### 2. **App.tsx**
- Import TanyaAIPage component
- Tambah route 'tanya-ai' ke view state
- Conditional rendering untuk TanyaAIPage

### 3. **Header.tsx**
- Tambah navigasi "Tanya AI" di center nav (desktop)
- Tambah navigasi "Tanya AI" di mobile menu
- Update type definition untuk view prop

## Design System

### Warna
- **Hijau Tua (Primary)**: #2D6A4F
- **Hijau Muda**: #74C69D
- **Hijau Sangat Muda (Accent)**: #E8F5E9
- **Oranye (CTA)**: #F77F00, #E76F51
- **Abu Background**: #F8F9FA
- **Abu Bubble**: #F1F5F9
- **Abu Teks**: text-gray-400, text-gray-500

### Typography
- **Header**: font-display (Quicksand) bold
- **Body**: font-sans (Nunito)
- **Chat Messages**: text-sm
- **Timestamps**: text-xs

### Spacing & Sizing
- Sidebar width: 260px
- Panel kanan width: 280px
- Chat bubbles: max-w-[75%]
- Avatar bot: 8x8 (32px)
- Product image: 16x16 (60px)

## Cara Mengakses

1. Jalankan development server:
   ```bash
   npm run dev
   ```

2. Buka browser di `http://localhost:3000`

3. Klik navigasi "Tanya AI" di header

4. Atau akses langsung melalui state management dengan mengklik tombol yang memanggil `onViewChange('tanya-ai')`

## Features Yang Dapat Dikembangkan

1. **Real-time Chat**: Integrasi dengan backend API untuk chat real-time
2. **Chat History Persistence**: Simpan riwayat chat ke database
3. **Voice Input**: Tambah fitur voice-to-text
4. **File Upload**: Upload foto lahan untuk diagnosis visual
5. **AI Response**: Integrasi dengan AI model untuk response otomatis
6. **Product Deep Link**: Link langsung ke halaman detail produk
7. **Chat Export**: Export percakapan ke PDF
8. **Search Chat History**: Pencarian dalam riwayat chat
9. **Notification**: Real-time notification untuk response baru

## Testing Checklist

- [x] Layout tiga kolom tampil dengan benar
- [x] Sidebar riwayat chat functional
- [x] Chat bubbles user dan bot styled correctly
- [x] Typing indicator animasi berjalan
- [x] Suggestion chips clickable
- [x] Input field functional
- [x] Product recommendations tampil
- [x] Modal diagnosis terintegrasi
- [x] Responsive mobile (sidebar hidden)
- [x] Tab switcher functional
- [x] Navigasi dari header works
- [x] Mobile menu includes Tanya AI

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Dependencies

Menggunakan dependencies yang sudah ada:
- React
- Motion (Framer Motion) untuk animasi
- Lucide React untuk icons
- Tailwind CSS untuk styling

---

**Status**: ✅ Completed
**Last Updated**: June 4, 2026
**Developer**: Kiro AI Assistant
