/* =====================================================
   FILE INI TEMPAT EDIT DATA UNDANGAN (config.js)
   Ganti tulisan di dalam tanda kutip "..." saja.
   Jangan hapus tanda kutip, koma, atau kurung.
   ===================================================== */
const DATA = {
  panggilPria: "Rizky",
  panggilWanita: "Salsa",

  namaPria: "Rizky Pratama, S.Kom",
  anakPria: "Putra pertama dari",
  ortuPria: "Bpk. Nama Ayah & Ibu Nama Ibu",

  namaWanita: "Salsa Aulia, S.Pd",
  anakWanita: "Putri kedua dari",
  ortuWanita: "Bpk. Nama Ayah & Ibu Nama Ibu",
  
  ayatTeks: "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan dari jenismu sendiri, agar kamu merasa tenteram kepadanya, dan dijadikan-Nya di antaramu rasa kasih dan sayang.",
  ayatSumber: "QS. Ar-Rum: 21",

  /* Hitung mundur: tahun-bulan-tanggal T jam:menit:detik +07:00 */
  waktuHitungMundur: "2026-12-20T09:00:00+07:00",

  akadTanggal: "Minggu, 20 Desember 2026",
  akadJam: "09.00 AM - selesai",
  akadTempat: "Nama Gedung / Gereja / Masjid",
  akadAlamat: "Alamat lengkap, Blitar",
  akadMaps: "https://maps.google.com",

  resepsiTanggal: "Minggu, 20 Desember 2026",
  resepsiJam: "11.00 AM - 02.00 PM",
  resepsiTempat: "Nama Gedung Resepsi",
  resepsiAlamat: "Alamat lengkap, Blitar",
  resepsiMaps: "https://maps.google.com",

   /* Nama bagian foto */
  judulBasmalah: "Bismillahirrahmanirrahim",
  judulMomen: "Our Moments",
  judulGaleri: "Galeri",

  /* Foto untuk cerita: file harus tersedia di folder gambar */
  cerita: [
    {
      judul: "First Meet",
      tanggal: "27 Oktober 2023",
      teks: "Kami pertama kali bertemu dan saling mengenal.",
      foto: "gambar/first-meet.jpg"
    },
    {
      judul: "Relationship",
      tanggal: "28 November 2024",
      teks: "Kami memutuskan untuk berjalan bersama.",
      foto: "gambar/relationship.jpg"
    },
    {
      judul: "Engagement",
      tanggal: "10 Agustus 2026",
      teks: "Kami mengikat janji untuk melangkah ke jenjang pernikahan.",
      foto: "gambar/engagement.jpg"
    }
  ],

  /* Nama dan file foto galeri */
  galeri: [
    { nama: "Momen 1", foto: "gambar/momen1.jpg" },
    { nama: "Momen 2", foto: "gambar/momen2.jpg" },
    { nama: "Momen 3", foto: "gambar/momen3.jpg" },
    { nama: "Momen 4", foto: "gambar/momen4.jpg" },
    { nama: "Momen 5", foto: "gambar/momen5.jpg" },
    { nama: "Momen 6", foto: "gambar/momen6.jpg" }
  ],

  bank: "Bank BCA",
  noRek: "1234567890",
  atasNama: "Nama Pemilik Rekening",

  /* Nomor WhatsApp penerima konfirmasi, awali 62 tanpa 0 dan tanpa + */
  noWA: "6281234567890"
};