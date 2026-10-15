/* =====================================================
   script.js: JANGAN DIUBAH (data ada di config.js)
   ===================================================== */
const $ = s => document.querySelector(s);

// isi semua teks dari DATA
document.querySelectorAll("[data-k]").forEach(e => e.textContent = DATA[e.dataset.k] || "");
$("#mapsAkad").href = DATA.akadMaps;
$("#mapsResepsi").href = DATA.resepsiMaps;

// nama tamu: tambahkan ?to=Nama+Tamu di akhir link undangan
$("#namaTamu").textContent = new URLSearchParams(location.search).get("to") || "Tamu Undangan";

// cerita
$("#cerita").innerHTML = DATA.cerita.map(c =>
  `<div class="kartu muncul"><h3 class="skrip">${c.judul}</h3><small>${c.tanggal}</small><p>${c.teks}</p></div>`
).join("");

// hitung mundur
const target = new Date(DATA.waktuHitungMundur).getTime();
function hitung() {
  let d = Math.max(0, target - Date.now());
  [["hari", 864e5], ["jam", 36e5], ["menit", 6e4], ["detik", 1e3]].forEach(([id, v]) => {
    $("#" + id).textContent = Math.floor(d / v);
    d %= v;
  });
}
hitung();
setInterval(hitung, 1000);

// tombol buka undangan
$("#btnBuka").onclick = () => {
  document.body.classList.remove("terkunci");
  $("#ayat").scrollIntoView();
};

// kirim konfirmasi lewat WhatsApp
$("#kirimRsvp").onclick = () => {
  const nama = $("#rsvpNama").value.trim();
  if (!nama) return alert("Isi nama dulu ya");
  const pesan = `Halo, saya ${nama}. Saya ${$("#rsvpHadir").value} di pernikahan ${DATA.panggilPria} & ${DATA.panggilWanita}. ${$("#rsvpUcapan").value}`;
  window.open(`https://wa.me/${DATA.noWA}?text=${encodeURIComponent(pesan)}`, "_blank");
};

// salin nomor rekening
$("#salin").onclick = e => {
  navigator.clipboard.writeText(DATA.noRek);
  e.target.textContent = "Tersalin!";
};

// foto yang belum diunggah disembunyikan (tidak tampil ikon rusak)
document.querySelectorAll("img").forEach(i => {
  const sembunyi = () => (i.style.visibility = "hidden");
  i.onerror = sembunyi;
  if (i.complete && !i.naturalWidth) sembunyi();
});

// efek muncul pelan saat di-scroll
const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && e.target.classList.add("tampil")), { threshold: .15 });
document.querySelectorAll(".muncul").forEach(el => io.observe(el));