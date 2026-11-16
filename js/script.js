let daftarProduk = [
    {
        nama: "Kunyit Asam",
        harga: 8000
    },
    {
        nama: "Beras Kencur",
        harga: 8000
    },
    {
        nama: "Temulawak",
        harga: 8000
    }
];
let hargaSekarang;
let nomorPesanan;
let teksTambahan;
let namaProdukSekarang;
let indexProdukSekarang;
let daftarPesanan = [];
function bukaPesanan(nama, harga) {
    let modal = document.getElementById("pesanan");
    let namaProduk = document.getElementById("namaProduk");
    let hargaProduk = document.getElementById("hargaProduk");
    modal.style.display = "flex";
    document.getElementById("menuLainnya").style.display = "none";
    document.getElementById("tombolMenuLain").innerHTML = "+ Pilih Menu Lain";
    hargaSekarang = harga;
    namaProdukSekarang = nama;
    indexProdukSekarang = daftarProduk.findIndex(function(produk) {
    return produk.nama === nama && produk.harga === harga;
});
    nomorPesanan = Math.floor(Math.random() * 9000) + 1000;
    namaProduk.innerHTML = nama;
    hargaProduk.innerHTML = "Harga: Rp" + harga.toLocaleString("id-ID");
    document.getElementById("jumlah").value = "";
    document.getElementById("hasilPesanan").innerHTML = "";
    document.getElementById("madu").checked = false;
    document.getElementById("perasanjeruknipis").checked = false;
    document.getElementById("daunmint").checked = false;
}
function tampilkanMenuLain(nama) {
    let menuLainnya = document.getElementById("menuLainnya");
    let tombol = document.getElementById("tombolMenuLain");
    // Kalau menu sedang terbuka, tutup
    if (menuLainnya.style.display === "block") {
        menuLainnya.style.display = "none";
        tombol.innerHTML = "+ Pilih Menu Lain";
        return;
    }
    // Ambil semua produk kecuali produk yang sedang dipilih
    let produkLain = daftarProduk.filter(function(produk, index) {
        return index !== indexProdukSekarang;
    });
    // Judul menu
    menuLainnya.innerHTML = `
        <h3>Menu Lainnya</h3>
    `;
    // Tampilkan produk lainnya
    produkLain.forEach(function(produk) {
        let indexProduk = daftarProduk.indexOf(produk);
        menuLainnya.innerHTML += `
            <div class="menu-tambahan">
                <h4>${produk.nama}</h4>
                <p>
                    Rp${produk.harga.toLocaleString("id-ID")}
                </p>
                <label>Jumlah:</label>
                <input
                    type="number"
                    min="0"
                    value=""
                    class="jumlah-menu-lain"
                    data-index="${indexProduk}"
                >
                <p class="judul-tambahan">
                    Pilih Tambahan
                </p>
                <div class="pilihan-tambahan">
                    <label>
                        <input
                            type="checkbox"
                            class="tambahan-menu-lain"
                            data-produk="${indexProduk}"
                            data-harga="2000"
                            data-nama="Madu"
                        >
                        Madu
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            class="tambahan-menu-lain"
                            data-produk="${indexProduk}"
                            data-harga="1000"
                            data-nama="Perasan Jeruk Nipis"
                        >
                        Perasan Jeruk Nipis
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            class="tambahan-menu-lain"
                            data-produk="${indexProduk}"
                            data-harga="1500"
                            data-nama="Daun Mint"
                        >
                        Daun Mint
                    </label>
                </div>
            </div>
        `;
    });
    // Tampilkan menu
    menuLainnya.style.display = "block";
    // Ubah tulisan tombol
    tombol.innerHTML = "− Tutup Menu Lain";
}
function konfirmasiPesanan() {  
    let sekarang = new Date();
    let tanggal = sekarang.getDate();
    let bulan = sekarang.getMonth() + 1;
    let tahun = sekarang.getFullYear();
    let jam = sekarang.getHours();
    let menit = String(sekarang.getMinutes()).padStart(2, "0");
    let jumlah = Number(document.getElementById("jumlah").value);
    if (jumlah < 1) {
        document.getElementById("hasilPesanan").innerHTML =
            "Jumlah harus minimal 1.";
        return;
    }
    daftarPesanan = [];
    // =========================
    // PRODUK UTAMA
    // =========================
    let tambahanUtama = 0;
    let tambahanNamaUtama = [];
    if (document.getElementById("madu").checked) {
        tambahanUtama += 2000;
        tambahanNamaUtama.push("Madu");
    }
    if (document.getElementById("perasanjeruknipis").checked) {
        tambahanUtama += 1000;
        tambahanNamaUtama.push("Perasan Jeruk Nipis");
    }
    if (document.getElementById("daunmint").checked) {
        tambahanUtama += 1500;
        tambahanNamaUtama.push("Daun Mint");
    }
    daftarPesanan.push({
        nama: namaProdukSekarang,
        harga: hargaSekarang,
        jumlah: jumlah,
        tambahan: tambahanNamaUtama,
        total: (hargaSekarang * jumlah) + (tambahanUtama * jumlah)
    });
    // =========================
    // MENU LAIN
    // =========================
    let inputMenuLain = document.querySelectorAll(".jumlah-menu-lain");
    inputMenuLain.forEach(function(input) {
        let jumlahLain = Number(input.value);
        let index = Number(input.dataset.index);
        if (jumlahLain > 0) {
            let produk = daftarProduk[index];
            let tambahanLain = 0;
            let daftarTambahanLain = [];
            let pilihanTambahan = document.querySelectorAll(
                `.tambahan-menu-lain[data-produk="${index}"]`
            );
            pilihanTambahan.forEach(function(tambahan) {
                if (tambahan.checked) {
                    tambahanLain += Number(tambahan.dataset.harga);
                    daftarTambahanLain.push(
                        tambahan.dataset.nama
                    );
                }
            });
            daftarPesanan.push({
                nama: produk.nama,
                harga: produk.harga,
                jumlah: jumlahLain,
                tambahan: daftarTambahanLain,
                total: (produk.harga * jumlahLain) + (tambahanLain * jumlahLain)
            });
        }
    });
    // =========================
    // HITUNG TOTAL
    // =========================
    let totalSemua = 0;
    daftarPesanan.forEach(function(pesanan) {
        totalSemua += pesanan.total;
    });
    // =========================
    // BUAT STRUK
    // =========================
    let isiStruk = document.getElementById("isiStruk");
    isiStruk.innerHTML = `
        <div class="struk-header">
            <h3>JAVA JAMU</h3>
            <p>Jamu Tradisional</p>
        </div>
        <div class="struk-info">
            <p>No. Pesanan : #${nomorPesanan}</p>
            <p>
                ${String(tanggal).padStart(2, "0")}/${String(bulan).padStart(2, "0")}/${tahun}
                &nbsp;
                ${jam}:${menit}
            </p>
        </div>
        <div class="garis-struk"></div>
        <div class="daftar-struk">
            ${daftarPesanan.map(function(pesanan) {
                let tambahanHTML = "";
                if (pesanan.tambahan.length > 0) {
                    tambahanHTML = pesanan.tambahan.map(function(tambahan) {
                        let hargaTambahan = 0;
                        if (tambahan === "Madu") {
                            hargaTambahan = 2000;
                        }
                        if (tambahan === "Perasan Jeruk Nipis") {
                            hargaTambahan = 1000;
                        }
                        if (tambahan === "Daun Mint") {
                            hargaTambahan = 1500;
                        }
                        return `
                            <div class="tambahan-struk">
                                <span>+ ${tambahan}</span>
                                <span>
                                    Rp${(hargaTambahan * pesanan.jumlah).toLocaleString("id-ID")}
                                </span>
                            </div>
                        `;
                    }).join("");
                }
                return `
                    <div class="produk-struk">
                        <div class="nama-produk-struk">
                            ${pesanan.nama}
                        </div>
                        <div class="harga-produk-struk">
                            <span>
                                ${pesanan.jumlah} x ${pesanan.harga.toLocaleString("id-ID")}
                            </span>
                            <span>
                                Rp${(pesanan.harga * pesanan.jumlah).toLocaleString("id-ID")}
                            </span>
                        </div>
                        ${tambahanHTML}
                    </div>
                `;
            }).join("")}
        </div>
        <div class="garis-struk"></div>
        <div class="total-struk">
            <span>TOTAL</span>
            <span>
                Rp${totalSemua.toLocaleString("id-ID")}
            </span>
        </div>
        <div class="garis-struk"></div>
        <div class="struk-footer">
            <p>Terima kasih 🌿</p>
        </div>
    `;
    tutupPesanan();
    bukaStruk();
    fetch("http://localhost:3000/pesanan", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        nomorPesanan: nomorPesanan,
        daftarPesanan: daftarPesanan,
        total: totalSemua
    })
})
.then(function(response) {
    return response.json();
})
.then(function(data) {
    console.log(data.pesan);
})
.catch(function(error) {
    console.error("Gagal mengirim pesanan:", error);
});
}
function tutupPesanan() {
    let modal = document.getElementById("pesanan");
    modal.style.display = "none";
    document.body.classList.remove("modal-terbuka");
}
function bukaStruk() {
    let struk = document.getElementById("struk");
    struk.style.display = "flex";
}
function tutupStruk() {
    let struk = document.getElementById("struk");
    struk.style.display = "none";
}
function kirimWhatsApp() {
    let sekarang = new Date();
    let tanggal = sekarang.getDate();
    let bulan = sekarang.getMonth() + 1;
    let tahun = sekarang.getFullYear();
    let jam = sekarang.getHours();
    let menit = String(sekarang.getMinutes()).padStart(2, "0");
    let totalSemua = 0;
    let daftarProdukWA = "";
    daftarPesanan.forEach(function(pesanan, index) {
        totalSemua += pesanan.total;
        daftarProdukWA += `
*${index + 1}. ${pesanan.nama}*
Jumlah      │ ${pesanan.jumlah}
Harga       │ Rp${pesanan.harga.toLocaleString("id-ID")}
Tambahan    │ ${
    pesanan.tambahan.length > 0
    ? pesanan.tambahan.join(", ")
    : "Tidak ada"
}
`;
        if (index < daftarPesanan.length - 1) {
            daftarProdukWA += "------------------\n";
        }
    });
    let pesan = `*STRUK PEMESANAN*
*JAVA JAMU*
━━━━━━━━━━━━━━━━━━
*No. Pesanan* │ #${nomorPesanan}
*Tanggal*     │ ${tanggal}/${bulan}/${tahun} • ${jam}:${menit}
━━━━━━━━━━━━━━━━━━
${daftarProdukWA}
━━━━━━━━━━━━━━━━━━
*TOTAL*       │ *Rp${totalSemua.toLocaleString("id-ID")}*
━━━━━━━━━━━━━━━━━━
Mohon diproses. Terima kasih!`;

    let nomorPenjual = "6283139501874";
    let url = "https://wa.me/" + nomorPenjual + "?text=" + encodeURIComponent(pesan);
    window.open(url, "_blank");
}
function bukaSosmed() {
    document.getElementById("modalSosmed").classList.add("aktif");
}
function tutupSosmed() {
    let modal = document.getElementById("modalSosmed");
    modal.classList.add("menutup");
    setTimeout(function() {
        modal.classList.remove("aktif");
        modal.classList.remove("menutup");
    }, 300);
}