# KENDEVSEC Website — GitHub Pages + Firebase

Website statis responsif untuk KENDEVSEC. Frontend bisa di-host di GitHub Pages; Firebase menyediakan Authentication dan Firestore. ZIP ini belum tersambung ke proyek Firebase sampai konfigurasi milikmu dimasukkan.

## Fitur yang sudah disiapkan
- Landing page responsif dengan animasi CSS, navigasi mobile, dan efek suara klik (browser mungkin memerlukan interaksi pertama dan suara dapat dimatikan oleh pengaturan perangkat).
- Layanan dinamis dari Firestore; fallback layanan contoh jika database masih kosong.
- Admin login Firebase Email/Password dengan verifikasi dokumen `admins/{UID}` yang harus `enabled: true`.
- Dashboard admin untuk tambah/edit/hapus layanan dan pengaturan maintenance/banner.
- Form order yang merangkai pesan lalu membuka WhatsApp: `0895636069948`. Tidak ada pembayaran online.
- Berita Google News Indonesia melalui RSS publik dan layanan RSS-to-JSON pihak ketiga. Feed bisa gagal karena jaringan, kuota, atau kebijakan layanan; situs menyediakan fallback tautan Google News.
- Firestore Security Rules dasar.

## A. Siapkan Firebase dari HP Android
1. Buka https://console.firebase.google.com/ dan buat project bernama misalnya `kendevsec-web`.
2. Klik ikon web `</>` untuk menambahkan Web App. Salin `apiKey`, `authDomain`, `projectId`, dan `appId`.
3. Di repository, buka `firebase-config.js` lalu ganti semua nilai `GANTI_...` dengan nilai project milikmu. API key Firebase untuk web memang tampil di frontend; keamanan harus ditegakkan lewat Security Rules dan pengaturan Firebase, bukan dengan menyembunyikan API key.
4. Firebase Console → Build → Authentication → Get started → Sign-in method → aktifkan **Email/Password**.
5. Authentication → Users → Add user. Buat email/password admin dan simpan password dengan aman.
6. Firebase Console → Build → Firestore Database → Create database. Pilih production mode bila diminta.
7. Buka tab Rules pada Firestore, ganti isi rules dengan file `firestore.rules` di ZIP, lalu tekan **Publish**. Jangan gunakan rules terbuka untuk semua pengguna.
8. Setelah membuat user admin, buka Authentication → Users dan salin **User UID**.
9. Buka Firestore → Data → Start collection. Collection ID: `admins`. Document ID harus persis UID admin tadi. Tambahkan field `enabled` dengan type **boolean** dan value **true**. Jangan beri izin publik untuk menulis koleksi admins.
10. Opsional: tambahkan dokumen `site/settings` dengan `maintenance` boolean `false`, `maintenanceMessage` string, dan `heroMessage` string. Aplikasi dapat membuat/memperbarui pengaturan itu setelah admin login dan rules dipasang.

## B. Upload ke GitHub Pages (HP Android)
1. Ekstrak ZIP menggunakan aplikasi pengelola file di Android.
2. Login ke https://github.com/ lalu buat repository baru, misalnya `kendevsec`.
3. Pada repository, pilih **Add file → Upload files**. Unggah isi folder project (bukan file ZIP saja). Pastikan `index.html`, `app.js`, `firebase-config.js`, `style.css`, dan `firestore.rules` berada di root repository.
4. Tekan **Commit changes**.
5. Buka **Settings → Pages**. Di bagian Build and deployment pilih **Deploy from a branch**, branch `main`, folder `/(root)`, lalu **Save**.
6. Tunggu workflow selesai. URL biasanya `https://USERNAME.github.io/kendevsec/`.
7. Firebase Console → Authentication → Settings → Authorized domains, tambahkan domain `USERNAME.github.io` (tanpa `https://` dan tanpa path repository) jika belum ada.
8. Buka URL website melalui HTTPS. Tes layanan dan login admin. Jika ada error, buka repository dan periksa Actions serta konsol browser bila tersedia.

> GitHub Pages hanya melayani file statis. Jangan taruh private key atau kredensial server di frontend. Firebase Authentication/Firestore tetap diatur melalui Firebase Console dan rules.

## C. Menjalankan dengan Firebase Hosting (opsional)
GitHub Pages dan Firebase Hosting adalah dua pilihan hosting; tidak wajib menggunakan keduanya sekaligus. File `firebase.json` disertakan untuk opsi Firebase Hosting. Deploy Firebase Hosting dari CLI memerlukan komputer/terminal dan login Firebase CLI, sehingga cara ini lebih sulit dilakukan hanya dari HP. Panduan resmi: https://firebase.google.com/docs/hosting/ .

## D. Pemeriksaan sebelum online
- [ ] Ganti konfigurasi di `firebase-config.js`.
- [ ] Aktifkan Email/Password di Authentication.
- [ ] Buat user admin dan dokumen `admins/{UID}` dengan `enabled: true`.
- [ ] Publish `firestore.rules`.
- [ ] Tambahkan domain GitHub Pages di Authorized domains bila diperlukan.
- [ ] Tes login admin, CRUD layanan, maintenance ON/OFF, order WhatsApp, dan berita.
- [ ] Uji website di mode incognito dan ponsel lain.

## Catatan dan batasan penting
- Saya memeriksa sintaks JavaScript dan JSON lokal saat membuat paket, tetapi tidak dapat memverifikasi koneksi ke proyek Firebase milikmu sebelum kamu memasukkan konfigurasi dan mengaktifkan layanan.
- Mode maintenance yang diatur dari dashboard memerlukan internet dan Firestore aktif. Konten cache di browser atau akses saat offline mungkin masih memperlihatkan halaman lama.
- Form order saat ini membuka WhatsApp; pesanan tidak disimpan di Firestore meski rules menyediakan struktur dasar jika fitur penyimpanan ditambahkan nanti.
- Berita otomatis memakai layanan RSS-to-JSON pihak ketiga yang tidak dijamin selalu tersedia. Jika feed gagal, gunakan tombol/tautan Google News.
- Suara klik tidak bisa dipaksakan pada semua elemen: browser dan pengaturan pengguna dapat membatasi audio. Klik link eksternal tetap mengikuti pengaturan browser.
- Ini starter project yang siap dikonfigurasi, bukan jaminan bebas dari semua kendala jaringan/layanan pihak ketiga. Uji pada project Firebase milikmu sebelum dipakai untuk pelanggan.
