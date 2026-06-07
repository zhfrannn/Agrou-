# Tanya AI - Visual Layout Guide

## Desktop View (≥1024px)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                             HEADER (TaniCure)                               │
│  [Logo] [Beranda] [Tani] [Pasar] [Koperasi] [Tanya AI*] [Tentang]  [🔔][👤]│
└─────────────────────────────────────────────────────────────────────────────┘
┌──────────────┬───────────────────────────────────────────┬──────────────────┐
│   SIDEBAR    │           CHAT AREA                       │   PRODUK PANEL   │
│   (260px)    │           (flex-1)                        │     (280px)      │
├──────────────┼───────────────────────────────────────────┼──────────────────┤
│              │                                           │                  │
│ ┌──────────┐ │  ┌─────────────────────────────────────┐ │ ┌──────────────┐ │
│ │🤖TaniCure│ │  │ Asisten Diagnosis  [Online] [X]     │ │ │⭐ Rekomendasi│ │
│ │  AI      │ │  ├─────────────────────────────────────┤ │ │   Produk     │ │
│ │ [Online] │ │  │ [Tanya AI*] [Artikel & Video]       │ │ └──────────────┘ │
│ └──────────┘ │  └─────────────────────────────────────┘ │                  │
│              │                                           │ ┌──────────────┐ │
│ ┌──────────┐ │  ┌─BOT────────────────────────┐          │ │ [IMG] Fungis │ │
│ │+ Chat    │ │  │🤖 Halo! Ada yang bisa       │          │ │ Tricyclazole │ │
│ │  Baru    │ │  │   saya bantu?               │          │ │ Rp 85.000    │ │
│ └──────────┘ │  │ 10:30                       │          │ │ [+Keranjang] │ │
│              │  └─────────────────────────────┘          │ └──────────────┘ │
│ Hari Ini    │                                           │                  │
│ ───────────  │          ┌─USER──────────────┐           │ ┌──────────────┐ │
│ 💬 Diagnosis │          │ Padi saya menguning│🧑         │ │ [IMG] Nutrisi│ │
│   Padi Blast │          │ 10:31              │           │ │ Anti-Stres   │ │
│   2 jam lalu │          └────────────────────┘           │ │ Rp 65.000    │ │
│              │                                           │ │ [+Keranjang] │ │
│ 💬 Masalah   │  ┌─BOT────────────────────────┐          │ └──────────────┘ │
│   Daun Jagung│  │🤖 Berdasarkan info Anda...  │          │                  │
│   5 jam lalu │  │   [Mulai Diagnosis Lengkap] │          │ ┌──────────────┐ │
│              │  │ 10:32                       │          │ │ [IMG] ZPT    │ │
│ Kemarin     │  └─────────────────────────────┘          │ │ Pemulihan    │ │
│ ───────────  │                                           │ │ Rp 80.000    │ │
│ 💬 Hama      │  ┌─TYPING─────────────────────┐          │ │ [+Keranjang] │ │
│   Wereng     │  │🤖 ● ● ●                    │          │ └──────────────┘ │
│   1 hari lalu│  └─────────────────────────────┘          │                  │
│              │                                           │ ┌──────────────┐ │
│              │  ┌─SUGGESTIONS─────────────────┐         │ │ Lihat Semua  │ │
│              │  │[Blast padi?][Pupuk jagung?] │         │ │ Rekomendasi→ │ │
│              │  └─────────────────────────────┘         │ └──────────────┘ │
│              │                                           │                  │
│              │  ┌─INPUT──────────────────────┐          │                  │
│              │  │📎 [Tanyakan masalah...]  [➤]│         │                  │
│              │  └─────────────────────────────┘         │                  │
└──────────────┴───────────────────────────────────────────┴──────────────────┘
```

## Mobile View (<1024px)

```
┌─────────────────────────────────────┐
│    HEADER                           │
│  [≡] TaniCure            [🛒]       │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│  [≡] 🤖 Asisten Diagnosis      [X]  │
├─────────────────────────────────────┤
│  [Tanya AI*] [Artikel & Video]      │
├─────────────────────────────────────┤
│                                     │
│  ┌─BOT──────────────────────┐      │
│  │🤖 Halo! Ada yang bisa     │      │
│  │   saya bantu?             │      │
│  │ 10:30                     │      │
│  └───────────────────────────┘      │
│                                     │
│            ┌─USER──────────┐       │
│            │ Padi menguning │🧑     │
│            │ 10:31          │       │
│            └────────────────┘       │
│                                     │
│  ┌─BOT──────────────────────┐      │
│  │🤖 Berdasarkan info...     │      │
│  │   [Diagnosis Lengkap]     │      │
│  │ 10:32                     │      │
│  └───────────────────────────┘      │
│                                     │
│                                     │
│  ┌─SUGGESTIONS──────────────┐      │
│  │[Blast padi?][Pupuk?]     │      │
│  └──────────────────────────┘      │
│                                     │
│  ┌─INPUT────────────────────┐      │
│  │📎 [Tanyakan...]        [➤]│      │
│  └──────────────────────────┘      │
└─────────────────────────────────────┘
```

## Sidebar (Mobile - Overlay)

```
┌─────────────────┐
│ [X] Menu        │
├─────────────────┤
│                 │
│ ┌─────────────┐ │
│ │🤖TaniCure AI│ │
│ │  [Online]   │ │
│ └─────────────┘ │
│                 │
│ ┌─────────────┐ │
│ │  + Chat     │ │
│ │    Baru     │ │
│ └─────────────┘ │
│                 │
│ Hari Ini       │
│ ─────────────  │
│ 💬 Diagnosis   │
│   Padi Blast   │
│   2 jam lalu   │
│                 │
│ 💬 Masalah     │
│   Daun Jagung  │
│   5 jam lalu   │
│                 │
│ Kemarin        │
│ ─────────────  │
│ 💬 Hama Wereng │
│   1 hari lalu  │
│                 │
└─────────────────┘
[DARK OVERLAY]
```

## Chat Bubble Details

### Bot Bubble (Left)
```
┌─────────────────────────────┐
│ 🤖 [Avatar 32x32 hijau]     │
│    ┌─────────────────────┐  │
│    │ Pesan dari bot      │  │
│    │ Background: #F1F5F9 │  │
│    │ Text: gray-800      │  │
│    │ Rounded: 2xl + tl-sm│  │
│    └─────────────────────┘  │
│    10:30 (text-xs gray-400) │
└─────────────────────────────┘
```

### User Bubble (Right)
```
┌─────────────────────────────┐
│               ┌───────────┐  │
│               │ Pesan user│🧑│
│               │ Bg:#2D6A4F│  │
│               │ Text:white│  │
│               │ Rounded:  │  │
│               │ 2xl+tr-sm │  │
│               └───────────┘  │
│      10:31 (text-xs gray-400)│
└─────────────────────────────┘
```

## Color Palette

```
Primary Green:    ████ #2D6A4F
Light Green:      ████ #74C69D  
Accent Green:     ████ #E8F5E9
Orange CTA:       ████ #F77F00
Orange Hover:     ████ #E76F51
Sidebar BG:       ████ #F8F9FA
Bubble BG:        ████ #F1F5F9
Gray Text:        ████ #6B7280
Light Gray:       ████ #9CA3AF
```

## Interactive States

### Sidebar Item
```
Default:   [          Diagnosis Padi Blast          ]
Hover:     [██████████ Diagnosis Padi Blast ████████] (bg-white/50)
Active:    [▓▓▓▓▓▓▓▓▓▓ Diagnosis Padi Blast ▓▓▓▓▓▓▓▓] (bg-green-50)
```

### Suggestion Chip
```
Default:   [ Blast pada padi? ] (border-green, text-green)
Hover:     [█ Blast pada padi █] (bg-green, text-white)
```

### Send Button
```
Disabled:  (●) gray-200, cursor-not-allowed
Enabled:   (●) #2D6A4F, hover:scale-105
Active:    (●) #1B4332
```

## Animation Timing

- Typing Indicator: 0.6s repeat infinite
- Message Appear: 300ms ease-out
- Sidebar Slide: 300ms ease-in-out
- Button Hover: 200ms
- Tab Switch: 200ms

## Spacing System

```
Sidebar Padding:    p-4
Chat Area Padding:  px-6 py-6
Product Card:       p-3
Message Gap:        space-y-4
Bubble Max Width:   max-w-[75%]
Input Height:       h-12 (48px)
Avatar Size:        w-8 h-8 (32px)
```

## Z-Index Layers

```
Level 5: Modal Diagnosis      z-[100]
Level 4: Mobile Sidebar       z-30
Level 3: Header               z-50
Level 2: Sticky Elements      z-20
Level 1: Chat Content         z-10
Level 0: Background           z-0
```

## Typography Scale

```
Hero:         text-2xl (24px) font-bold
Title:        text-lg (18px) font-bold
Subtitle:     text-sm (14px) font-medium
Chat:         text-sm (14px)
Timestamp:    text-xs (12px)
Button:       text-sm (14px) font-bold
Label:        text-xs (12px) font-bold uppercase
```

---

This visual guide helps developers understand the exact layout structure and styling of the redesigned Tanya AI page.
