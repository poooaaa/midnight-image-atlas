# Midnight Image Atlas

Buat aplikasi web baru sebagai TAHAP 1: VISUAL UI SAJA. Jangan implementasikan sistem/backend/API, database, autentikasi, penyimpanan, atau fungsi generate gambar yang sesungguhnya. Semua kontrol cukup visual/statis untuk saat ini. Jangan menambahkan fitur di luar deskripsi ini.

Tujuan aplikasi: antarmuka generator gambar dengan dua area utama yang jelas: (1) area untuk Gallery/galeri gambar dan (2) area untuk Generate Image/generate gambar. Buat tampilan profesional, minimalis, rapi, modern, nyaman dilihat, mobile-first dan responsif di HP maupun desktop. Nama aplikasi boleh sederhana: "Image Studio".

WAJIB patuhi resep desain dan warna berikut:
- Background utama body/#root: #111113 (format tema setara oklch(0.129 0.042 264.695)).
- Container input/card: #1c1c20; border #27272d dengan kesan opacity 60%.
- Bubble/elemen kartu gelap: #222225; state hover visual #28282c.
- Preview gambar/lampiran: #1a1a1d; border #2f2f35; untuk preview input boleh #25252b.
- Suggestion chips: #1c1c20; border #2a2a32.
- Tombol dan pemilih: background #29292e; border #33333a; hover #2e2e34 / #313138.
- Dropdown/menu visual bila dibutuhkan: #202025; border #35353e; kolom pencarian #18181c dengan border #32323b; selected item #2c2c34.
- Source badges jika memang ada: background #2c2b30, teks #c2c1c7, angka tambahan #8e8d93. Jangan menambahkan sumber jika tidak diperlukan.
- Teks utama #ececee; heading dan teks penting #ffffff; placeholder #64646c.
- Ikon/aksi #73737c dan hover #d4d4d8.
- Code block jika memang diperlukan #1a1a1e border #2a2a30; inline code #232328 teks #f0b8a6. Tooltip jika memang diperlukan #2a2a2f.
Tidak perlu memaksakan elemen source badge, kode, tooltip, atau chat karena aplikasi ini generator gambar, bukan aplikasi chat.

Arah visual:
1. Gunakan background utama #111113 secara konsisten; jangan tiba-tiba memakai ungu, biru terang, gradien warna-warni, atau tema putih.
2. Sidebar/nav yang ringkas untuk berpindah antara "Generate" dan "Gallery". Pada layar HP gunakan layout yang nyaman, jangan sampai sidebar makan banyak ruang.
3. Halaman Generate: heading jelas, deskripsi pendek, panel preview gambar yang cukup besar dengan placeholder visual yang elegan (ikon gambar/landscape dan teks singkat seperti "Preview gambar akan muncul di sini"), field prompt dengan placeholder abu-abu, tombol pilihan rasio/aspect ratio dan style sebagai kontrol visual statis, serta tombol utama "Generate Image". Tombol tidak perlu menjalankan proses apa pun.
4. Halaman Gallery: heading "Gallery", deskripsi pendek, kolom search visual, chip filter sederhana misalnya "All", "Recent", "Favorites", dan grid kartu gambar placeholder yang tertata rapi dengan rasio gambar konsisten. Gunakan placeholder/ilustrasi abstrak yang halus dan serasi, bukan gambar eksternal yang wajib dimuat. Beri label visual sederhana pada beberapa kartu agar galeri terlihat hidup, tetapi jangan berpura-pura gambar itu hasil generate nyata.
5. Beri navigasi/tabs yang menunjukkan Generate dan Gallery, dengan state visual aktif yang jelas. Jika implementasi tab visual sederhana diperlukan untuk melihat kedua tampilan, boleh dibuat hanya interaksi navigasi frontend tanpa backend. Tidak ada fungsi generate gambar sungguhan.
6. Pakai radius membulat secukupnya, border tipis, bayangan sangat halus, whitespace yang cukup, alignment presisi, ikon sederhana (lucide jika tersedia). Hindari tampilan ramai, dekorasi berlebihan, emoji berlebihan, tombol terlalu besar, atau kartu yang terlalu rapat.
7. Hasil harus tampak seperti produk siap pakai dengan desain konsisten, bukan wireframe kasar. Pastikan terlihat baik di lebar layar HP.

BATASAN PENTING: Ini hanya Tahap 1 visual. Jangan mengubah palet yang diberikan. Jangan menambahkan API key, koneksi AI, database, backend, atau sistem generate. Jangan mengklaim fungsi generate/galeri sudah bekerja. Fokus pada kualitas UI dan jangan menambahkan fitur lain yang tidak diminta.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://midnight-image-atlas.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/8cb1f39e-201a-4f90-887e-e95b391134aa).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
