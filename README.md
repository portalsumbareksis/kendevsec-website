# KENDEVSEC — starter website

Website satu halaman berbahasa Indonesia dengan tema navy/putih, layanan IT & social media, form order ke WhatsApp, serta kerangka Admin Panel Firebase Authentication + Cloud Firestore.

## Penting sebelum online
- Halaman publik dan form WhatsApp bisa dicoba langsung dengan membuka `index.html` di browser.
- Admin panel/database belum aktif sampai konfigurasi Firebase dipasang. Jangan menganggap tombol admin sebagai sistem produksi sebelum semua langkah keamanan selesai.
- `firestore.rules` harus dipublikasikan di Firebase Console. Rules memberi pengunjung izin membuat order dan membaca layanan, tetapi hanya admin yang dapat mengubah layanan/membaca order.
- Akun admin harus dibuat di Firebase Authentication (Email/Password), lalu salin UID akun itu dan buat dokumen `admins/{UID}` di Firestore. Jangan menaruh password admin di kode.
- `firebase-config.js.example` adalah contoh; salin nilai konfigurasi ke `index.html` tepat sebelum `<script type="module">` sebagai `window.KENDEVSEC_FIREBASE_CONFIG = {...};` (atau ubah menjadi file terpisah dan muat sebelum module script).
- Status maintenance saat ini tersimpan di Firestore dan ditampilkan di panel; belum memblokir pengunjung otomatis. Tambahkan layar maintenance di halaman publik sebelum menganggap fitur ini siap produksi.
- Harga dan layanan yang ditampilkan adalah contoh awal, bukan penawaran final.

## Langkah A — Firebase
1. Buka https://console.firebase.google.com/ lalu buat project `kendevsec` (jika nama tersedia).
2. Tambahkan aplikasi Web (ikon `</>`) dan salin konfigurasi Firebase ke file.
3. Authentication → Sign-in method → aktifkan Email/Password.
4. Authentication → Users → Add user untuk membuat akun admin.
5. Firestore Database → Create database.
6. Di Firestore, buat koleksi `admins`, lalu buat dokumen dengan ID persis UID akun admin. Isi satu field sederhana, misalnya `role` = `admin`.
7. Buka Rules, tempel isi `firestore.rules`, lalu Publish.
8. Tambahkan dokumen layanan melalui panel admin setelah login, atau biarkan contoh layanan tampil sampai data layanan pertama ditambahkan.

## Langkah B — GitHub Pages (untuk demo/front-end)
1. Buat repository GitHub bernama `kendevsec-website`.
2. Upload `index.html` ke root repository. Jangan upload password atau file rahasia.
3. Repository → Settings → Pages → Deploy from a branch → `main` dan folder `/ (root)` → Save.
4. Tunggu proses selesai; GitHub akan menampilkan URL Pages.
5. Pastikan domain/URL GitHub Pages ditambahkan di Firebase Authentication → Settings → Authorized domains bila login diperlukan.

GitHub Pages hanya hosting file statis. Firebase Authentication/Firestore tetap berjalan sebagai backend terpisah. Jika ingin satu layanan hosting yang lebih terpadu, Firebase Hosting juga pilihan bagus.

## Langkah C — Firebase Hosting (alternatif)
Untuk deploy via terminal komputer:
1. Install Node.js, lalu `npm install -g firebase-tools`
2. Di folder website, jalankan `firebase login`
3. Jalankan `firebase init hosting`, pilih project yang dibuat, public directory `.` (titik), configure as single-page app `No`.
4. Pastikan file `index.html` ada di folder tersebut dan periksa `firebase.json` agar file tersembunyi/konfigurasi tidak ikut dipublikasikan.
5. Jalankan `firebase deploy --only hosting`.

## Catatan keamanan
- Jangan pernah memasukkan password admin atau service account key ke HTML/repository.
- Web API config Firebase umumnya memang ada di frontend; proteksi data dilakukan lewat Authentication, Firestore Security Rules, dan Authorized Domains.
- Sebelum menerima order sungguhan, uji akses baca/tulis menggunakan akun pengunjung dan admin. Pertimbangkan App Check, pembatasan spam, validasi server-side, dan kebijakan privasi.
