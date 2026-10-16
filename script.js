const $ = s => document.querySelector(s);

// isi semua teks dari DATA
document.querySelectorAll("[data-k]").forEach(e => {
  e.textContent = DATA[e.dataset.k] || "";
});
$("#mapsAkad").href = DATA.akadMaps;
$("#mapsResepsi").href = DATA.resepsiMaps;

// nama tamu: tambahkan ?to=Nama+Tamu di akhir link
$("#namaTamu").textContent = new URLSearchParams(location.search).get("to") || "Tamu Undangan";

/* ===== Amplop Momen (data dari config.js -> DATA.cerita) ===== */
(function () {
  const wadah = $("#cerita");
  if (!wadah) return;
  wadah.innerHTML = "";

  const TEKS_TUTUP = "Ketuk amplop untuk membuka";
  const TEKS_BUKA  = "Ketuk panah pada foto untuk membaca cerita";
  const TEKS_BACA  = "Ketuk amplop untuk menutup";

  // coba beberapa kemungkinan folder / nama / ekstensi sebelum menyerah
  function muatFoto(img, path, gagal) {
    const nama = path.split("/").pop().replace(/\.[^.]+$/, "");
    const namaLain = [nama, nama.replace(/-/g, " "), nama.replace(/-/g, "_")];
    const ekstensi = [".jpg", ".jpeg", ".png", ".webp", ".JPG", ".JPEG", ".PNG"];
    const coba = [path];
    ["gambar", "foto"].forEach(f =>
      namaLain.forEach(n =>
        ekstensi.forEach(x => coba.push(`${f}/${n}${x}`))));
    let i = 0;
    img.onerror = () => { i++; i < coba.length ? (img.src = coba[i]) : gagal(); };
    img.src = coba[0];
  }

  DATA.cerita.forEach(m => {
    const item = document.createElement("div");
    item.className = "amplop-item";
    /* class mf-foto sengaja dipakai supaya foto ini tidak disembunyikan
       oleh kode "foto yang belum diunggah" di bagian bawah file ini */
    item.innerHTML = `
      <div class="amplop-label">
        <span class="tgl">${m.tanggal}</span>
        <span class="judul skrip">${m.judul}</span>
      </div>
      <div class="amplop" role="button" tabindex="0" aria-expanded="false" aria-label="Buka amplop ${m.judul}">
        <span class="belakang"></span>
        <span class="foto-amplop">
          <img class="mf-foto" alt="${m.judul}">
          <button type="button" class="panah" aria-label="Baca cerita ${m.judul}" aria-expanded="false">
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" stroke-width="2.6"
                    stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </span>
        <span class="depan"></span>
        <span class="tutup"></span>
        <span class="segel">&#9829;</span>
      </div>
      <span class="ketuk">${TEKS_TUTUP}</span>
      <div class="amplop-cerita"><p>${m.teks}</p></div>`;

    const amplop   = item.querySelector(".amplop");
    const panah    = item.querySelector(".panah");
    const petunjuk = item.querySelector(".ketuk");
    const img      = item.querySelector("img");

    muatFoto(img, m.foto, () => {
      const e = document.createElement("span");
      e.className = "foto-error";
      e.innerHTML = `Foto tidak ditemukan:<br>${m.foto}`;
      img.replaceWith(e);
    });

    function alihBuka() {
      const buka = item.classList.toggle("buka");
      if (!buka) { item.classList.remove("baca"); panah.setAttribute("aria-expanded", "false"); }
      amplop.setAttribute("aria-expanded", buka);
      petunjuk.textContent = buka ? TEKS_BUKA : TEKS_TUTUP;
    }
    amplop.addEventListener("click", alihBuka);
    amplop.addEventListener("keydown", e => {
      if (e.target === amplop && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); alihBuka(); }
    });

    panah.addEventListener("click", e => {
      e.stopPropagation();                       // jangan ikut menutup amplop
      const baca = item.classList.toggle("baca");
      panah.setAttribute("aria-expanded", baca);
      petunjuk.textContent = baca ? TEKS_BACA : TEKS_BUKA;
    });

    wadah.appendChild(item);
  });
})();

// galeri dari config.js
const galeri = $("#galeri");
if (galeri) {
  galeri.innerHTML = DATA.galeri.map(g =>
    `<img class="melayang" src="${g.foto}" alt="${g.nama}">`).join("");
}

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

// foto yang belum diunggah disembunyikan (kecuali foto amplop yang punya pengecekan sendiri)
document.querySelectorAll("img:not(.mf-foto)").forEach(img => {
  const sembunyi = () => (img.style.visibility = "hidden");
  img.onerror = sembunyi;
  if (img.complete && !img.naturalWidth) sembunyi();
});

// efek muncul pelan saat di-scroll
const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && e.target.classList.add("tampil")), { threshold: .15 });
document.querySelectorAll(".muncul").forEach(el => io.observe(el));