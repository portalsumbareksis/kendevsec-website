// Isi dengan konfigurasi aplikasi web Firebase milikmu dari Firebase Console.
// Jangan masukkan private key/service account ke file frontend.
export const firebaseConfig = {
  apiKey: "GANTI_DENGAN_API_KEY_FIREBASE",
  authDomain: "GANTI_PROJECT_ID.firebaseapp.com",
  projectId: "GANTI_PROJECT_ID",
  appId: "GANTI_DENGAN_APP_ID"
};
export const firebaseReady = !Object.values(firebaseConfig).some(value => String(value).startsWith("GANTI_"));
