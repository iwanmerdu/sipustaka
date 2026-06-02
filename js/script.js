// ===== DATA UTAMA SIPUSTAKA =====
// Data ini ditempatkan di PALING ATAS agar bisa diakses oleh semua halaman

var dataKoleksi = [
  // Array berisi semua buku di perpustakaan
  // Setiap elemen adalah objek dengan properti: id, judul, pengarang, kategori, status, tahun

  { id: 1, judul: 'Pemrograman Python Dasar', pengarang: 'Budi Raharjo', kategori: 'Teknologi', status: 'tersedia', tahun: 2023 },
  { id: 2, judul: 'Basis Data Relasional', pengarang: 'Ir. Susi Wulandari', kategori: 'Teknologi', status: 'dipinjam', tahun: 2022 },
  { id: 3, judul: 'Sejarah Nusantara Lengkap', pengarang: 'Prof. Agus Salim', kategori: 'Sejarah', status: 'tersedia', tahun: 2021 },
  { id: 4, judul: 'Matematika Diskrit', pengarang: 'Dr. Hendra Gunawan', kategori: 'Matematika', status: 'tersedia', tahun: 2023 },
  { id: 5, judul: 'Novel Laskar Pelangi', pengarang: 'Andrea Hirata', kategori: 'Fiksi', status: 'dipinjam', tahun: 2005 },
  { id: 6, judul: 'Jaringan Komputer Modern', pengarang: 'Wahyu Nur Cholifah', kategori: 'Teknologi', status: 'tersedia', tahun: 2022 },
  { id: 7, judul: 'Fisika Universitas Jilid 1', pengarang: 'Young & Freedman', kategori: 'Sains', status: 'dipinjam', tahun: 2020 },
  { id: 8, judul: 'Belajar Desain UI/UX', pengarang: 'Rizki Aditya', kategori: 'Teknologi', status: 'tersedia', tahun: 2023 },
  { id: 9, judul: 'Kimia Organik Dasar', pengarang: 'Prof. Hartono', kategori: 'Sains', status: 'tersedia', tahun: 2019 },
  { id: 10, judul: 'Bumi Manusia', pengarang: 'Pramoedya A. Toer', kategori: 'Fiksi', status: 'tersedia', tahun: 1980 }
];

var dataNotifikasi = [
  // Array berisi teks notifikasi untuk ditampilkan di Toast
  '⚠️ Buku "Basis Data Relasional" sudah dipinjam 7 hari, segera kembalikan.',
  '📦 5 buku baru telah ditambahkan ke koleksi minggu ini.',
  '🎉 Selamat! Perpustakaan mencapai 500 anggota aktif.'
];

var indeksNotifAktif = 0;
// Variabel untuk melacak notifikasi mana yang sedang ditampilkan
// Dimulai dari 0 (notifikasi pertama)


// ===== JAVASCRIPT HALAMAN DASHBOARD =====

var elemenDashboard = document.getElementById('statTotalBuku');
// Cek apakah elemen yang hanya ada di dashboard tersedia
// Jika tidak ada, berarti kita bukan di halaman dashboard

if (elemenDashboard !== null) {
  // Kode di dalam blok ini hanya berjalan di halaman index.html

  // --- BAGIAN 1: Hitung dan Tampilkan Statistik ---

  var jumlahTotal = dataKoleksi.length;
  // .length pada array mengembalikan jumlah elemen dalam array
  // dataKoleksi.length = 10 (ada 10 buku)

  var jumlahDipinjam = 0;
  // Mulai dari 0, akan kita hitung dengan loop

  for (var i = 0; i < dataKoleksi.length; i++) {
    // Loop memeriksa setiap buku satu per satu

    if (dataKoleksi[i].status === 'dipinjam') {
      // Akses properti 'status' dari objek buku ke-i
      jumlahDipinjam = jumlahDipinjam + 1;
      // Tambah 1 setiap kali menemukan buku yang statusnya 'dipinjam'
    }
  }

  var jumlahTersedia = jumlahTotal - jumlahDipinjam;
  // Buku tersedia = total buku dikurangi buku yang sedang dipinjam

  // Masukkan angka ke elemen HTML yang sudah disiapkan
  document.getElementById('statTotalBuku').innerHTML = jumlahTotal;
  document.getElementById('statDipinjam').innerHTML = jumlahDipinjam;
  document.getElementById('statTersedia').innerHTML = jumlahTersedia;
  document.getElementById('statAnggota').innerHTML = 47;
  // Jumlah anggota aktif (data statis untuk simulasi)


  // --- BAGIAN 2: Buat Progress Bar per Kategori ---

  // Langkah 1: Kumpulkan semua kategori yang unik dan hitung jumlah bukunya
  var hitungKategori = {};
  // Objek kosong — akan kita isi dengan pasangan { namaKategori: jumlahBuku }

  for (var j = 0; j < dataKoleksi.length; j++) {
    var kategoriIni = dataKoleksi[j].kategori;
    // Ambil nama kategori buku ke-j

    if (hitungKategori[kategoriIni] === undefined) {
      // undefined berarti properti ini belum ada di objek hitungKategori
      hitungKategori[kategoriIni] = 0;
      // Buat properti baru untuk kategori ini dan mulai dari 0
    }

    hitungKategori[kategoriIni] = hitungKategori[kategoriIni] + 1;
    // Tambah 1 pada penghitung kategori ini
    // Setelah loop: { Teknologi: 4, Sejarah: 1, Matematika: 1, Fiksi: 2, Sains: 2 }
  }

  // Langkah 2: Buat warna berbeda untuk setiap kategori
  var warnaKategori = {
    'Teknologi': 'bg-primary',
    'Sejarah':   'bg-warning',
    'Matematika':'bg-info',
    'Fiksi':     'bg-success',
    'Sains':     'bg-danger'
  };
  // Objek yang memetakan nama kategori ke class warna Bootstrap

  // Langkah 3: Buat HTML progress bar untuk setiap kategori
  var htmlProgress = '';

  var daftarKategori = Object.keys(hitungKategori);
  // Object.keys(): mengambil semua nama properti (kunci) dari sebuah objek
  // Hasilnya adalah array: ['Teknologi', 'Sejarah', 'Matematika', 'Fiksi', 'Sains']

  for (var k = 0; k < daftarKategori.length; k++) {
    var namaKat = daftarKategori[k];
    // Ambil nama kategori pada posisi k

    var jumlahKat = hitungKategori[namaKat];
    // Ambil jumlah buku untuk kategori ini dari objek hitungKategori

    var persenKat = Math.round((jumlahKat / jumlahTotal) * 100);
    // Hitung persentase: (jumlah kategori ÷ total buku) × 100
    // Math.round(): membulatkan ke angka bulat terdekat
    // Contoh: (4/10)*100 = 40, (2/10)*100 = 20

    var warnaBar = warnaKategori[namaKat];
    // Ambil class warna untuk kategori ini dari objek warnaKategori
    // Jika tidak ditemukan, akan undefined (tidak ada masalah)

    if (warnaBar === undefined) {
      warnaBar = 'bg-secondary';
      // Warna abu-abu sebagai fallback jika kategori tidak terdaftar
    }

    // Buat baris label + progress bar
    htmlProgress += '<div class="mb-3">';

    htmlProgress += '<div class="d-flex justify-content-between mb-1">';
    htmlProgress += '<small><strong>' + namaKat + '</strong></small>';
    htmlProgress += '<small>' + jumlahKat + ' buku (' + persenKat + '%)</small>';
    htmlProgress += '</div>';
    // Baris atas: nama kategori di kiri, angka di kanan

    htmlProgress += '<div class="progress">';
    // Tag pembuka progress bar container

    htmlProgress += '<div class="progress-bar ' + warnaBar + '"';
    // progress-bar: class Bootstrap untuk batang isian
    // Tambahkan class warna sesuai kategori

    htmlProgress += ' style="width: ' + persenKat + '%"';
    // style="width: X%": lebar batang diatur langsung via CSS inline
    // Semakin besar persentase, semakin panjang batang

    htmlProgress += ' role="progressbar"';
    // role="progressbar": aksesibilitas untuk screen reader

    htmlProgress += '>' + persenKat + '%</div>';
    // Teks persentase di dalam batang

    htmlProgress += '</div>';
    // Tutup progress container

    htmlProgress += '</div>';
    // Tutup div mb-3
  }

  document.getElementById('areaPogress').innerHTML = htmlProgress;
  // Masukkan semua progress bar ke area yang sudah disiapkan


  // --- BAGIAN 3: Tampilkan 3 Buku Terbaru di Tabel ---

  var bukuTerbaru = dataKoleksi.slice(dataKoleksi.length - 3);
  // slice(awal, akhir): mengambil potongan array
  // slice(7): ambil dari indeks 7 sampai akhir = 3 buku terakhir
  // Ini mensimulasikan "buku terbaru" berdasarkan posisi di array

  var barisTabel = '';

  for (var m = 0; m < bukuTerbaru.length; m++) {
    var buku = bukuTerbaru[m];

    var badgeStatus = '';
    if (buku.status === 'tersedia') {
      badgeStatus = '<span class="badge bg-success">Tersedia</span>';
    } else {
      badgeStatus = '<span class="badge bg-warning text-dark">Dipinjam</span>';
      // text-dark: teks hitam agar terbaca di background kuning
    }

    barisTabel += '<tr>';
    barisTabel += '<td>' + buku.judul + '</td>';
    barisTabel += '<td>' + buku.pengarang + '</td>';
    barisTabel += '<td><span class="badge bg-light text-dark border">' + buku.kategori + '</span></td>';
    // bg-light text-dark border: badge putih dengan border agar terlihat di background putih
    barisTabel += '<td>' + badgeStatus + '</td>';
    barisTabel += '</tr>';
  }

  document.getElementById('tabelBukuBaru').innerHTML = barisTabel;


  // --- BAGIAN 4: Tombol dan Toast Notifikasi ---

  document.getElementById('tombolNotif').addEventListener('click', function() {
    // Saat tombol "Lihat Notifikasi" diklik

    // Ambil teks notifikasi yang akan ditampilkan
    var pesanNotif = dataNotifikasi[indeksNotifAktif];
    // Tampilkan notifikasi sesuai indeks saat ini

    document.getElementById('isiToast').innerHTML = pesanNotif;
    // Masukkan teks notifikasi ke dalam body Toast

    // Buat dan tampilkan Toast menggunakan JavaScript Bootstrap
    var elemenToast = document.getElementById('toastNotif');
    var toast = new bootstrap.Toast(elemenToast, {
      delay: 5000
      // delay: Toast akan otomatis hilang setelah 5000ms = 5 detik
    });
    toast.show();
    // Tampilkan Toast

    // Pindah ke notifikasi berikutnya untuk klik berikutnya
    indeksNotifAktif = indeksNotifAktif + 1;
    // Naikkan indeks agar klik berikutnya menampilkan notifikasi berbeda

    if (indeksNotifAktif >= dataNotifikasi.length) {
      // Jika sudah melewati notifikasi terakhir
      indeksNotifAktif = 0;
      // Kembali ke notifikasi pertama (putar ulang)
    }

    // Perbarui badge notifikasi di navbar
    var sisaNotif = dataNotifikasi.length - indeksNotifAktif;
    document.getElementById('badgeNotif').innerHTML = sisaNotif;
    // Kurangi jumlah badge setiap kali notifikasi dibaca
  });

}
// Akhir blok if dashboard

// ===== JAVASCRIPT HALAMAN KOLEKSI BUKU =====

var elemenKoleksi = document.getElementById('tabelKoleksi');
// Cek apakah kita di halaman koleksi.html

if (elemenKoleksi !== null) {

  // Fungsi utama untuk menampilkan buku berdasarkan filter yang aktif
  function tampilkanKoleksi() {
    // Fungsi ini dipanggil setiap kali filter atau pencarian berubah

    // Langkah 1: Baca nilai semua filter yang sedang aktif
    var kataCari = document.getElementById('inputCari').value.toLowerCase();
    // .toLowerCase(): ubah ke huruf kecil semua
    // Tujuan: pencarian tidak case-sensitive
    // Jika pengguna ketik "PYTHON", tetap bisa menemukan "Python"

    var kategoriDipilih = document.getElementById('filterKategori').value;
    // Ambil nilai yang dipilih di dropdown kategori

    var statusDipilih = document.getElementById('filterStatus').value;
    // Ambil nilai yang dipilih di dropdown status

    // Langkah 2: Saring data berdasarkan semua filter sekaligus
    var hasilFilter = [];
    // Array kosong untuk menampung buku yang lolos semua filter

    for (var i = 0; i < dataKoleksi.length; i++) {
      var buku = dataKoleksi[i];

      // Cek filter pencarian teks
      var judulLower = buku.judul.toLowerCase();
      var pengarangLower = buku.pengarang.toLowerCase();
      // Ubah data buku ke lowercase juga agar perbandingan adil

      var cocokteks = judulLower.indexOf(kataCari) !== -1 || pengarangLower.indexOf(kataCari) !== -1;
      // indexOf(): mencari posisi substring dalam string
      // Jika ditemukan, hasilnya >= 0; jika tidak ditemukan, hasilnya -1
      // Kita cek: apakah kata cari ada di judul ATAU di nama pengarang?
      // Contoh: kataCari='python', judulLower='pemrograman python dasar'
      //         indexOf('python') = 12 (ditemukan di posisi 12) → !== -1 → true

      // Cek filter kategori
      var cocokKategori = (kategoriDipilih === 'semua') || (buku.kategori === kategoriDipilih);
      // Buku lolos filter kategori jika: dipilih 'semua' ATAU kategori buku sama dengan pilihan

      // Cek filter status
      var cocokStatus = (statusDipilih === 'semua') || (buku.status === statusDipilih);
      // Sama dengan filter kategori, tapi untuk status

      // Buku masuk hasil hanya jika SEMUA filter terpenuhi
      if (cocokteks && cocokKategori && cocokStatus) {
        hasilFilter.push(buku);
        // push(): menambahkan elemen ke akhir array
        // Tambahkan buku ini ke daftar hasil
      }
    }
    // Setelah loop: hasilFilter berisi buku-buku yang lolos semua filter

    // Langkah 3: Tampilkan hasil atau pesan kosong
    var pesanKosong = document.getElementById('pesanKosong');

    if (hasilFilter.length === 0) {
      // Jika tidak ada buku yang ditemukan
      elemenKoleksi.innerHTML = '';
      // Kosongkan tabel
      pesanKosong.classList.remove('d-none');
      // Tampilkan pesan "tidak ada hasil"
    } else {
      pesanKosong.classList.add('d-none');
      // Sembunyikan pesan kosong karena ada hasil

      // Langkah 4: Buat baris tabel dari hasil filter
      var baris = '';
      for (var j = 0; j < hasilFilter.length; j++) {
        var b = hasilFilter[j];

        var badgeKat = '<span class="badge bg-light text-dark border">' + b.kategori + '</span>';
        // Badge abu-abu untuk kategori

        var badgeSts = '';
        if (b.status === 'tersedia') {
          badgeSts = '<span class="badge bg-success">Tersedia</span>';
        } else {
          badgeSts = '<span class="badge bg-warning text-dark">Dipinjam</span>';
        }

        baris += '<tr>';
        baris += '<td>' + (j + 1) + '</td>';
        baris += '<td class="fw-semibold">' + b.judul + '</td>';
        // fw-semibold: font weight semi-bold (sedikit tebal)
        baris += '<td>' + b.pengarang + '</td>';
        baris += '<td>' + badgeKat + '</td>';
        baris += '<td>' + b.tahun + '</td>';
        baris += '<td>' + badgeSts + '</td>';
        baris += '</tr>';
      }
      elemenKoleksi.innerHTML = baris;
    }

    // Langkah 5: Perbarui counter "X buku ditemukan"
    document.getElementById('jumlahTampil').innerHTML = hasilFilter.length;
  }

  // Pasang event listener ke semua kontrol filter
  // Setiap kali salah satu berubah, panggil fungsi tampilkanKoleksi()

  document.getElementById('inputCari').addEventListener('input', tampilkanKoleksi);
  // Event 'input': terpicu setiap kali ada perubahan isi input (per karakter)
  // Berbeda dengan 'change' yang hanya terpicu saat input kehilangan fokus

  document.getElementById('filterKategori').addEventListener('change', tampilkanKoleksi);
  // Event 'change': terpicu saat nilai dropdown berubah

  document.getElementById('filterStatus').addEventListener('change', tampilkanKoleksi);

  // Tampilkan semua data saat halaman pertama kali dimuat
  tampilkanKoleksi();
}


// ===== JAVASCRIPT HALAMAN PEMINJAMAN =====

var elemenFormPinjam = document.getElementById('formPinjam');
// Cek apakah kita di halaman pinjam.html

if (elemenFormPinjam !== null) {

  // --- BAGIAN 1: Isi dropdown pilihan buku ---

  var selectBuku = document.getElementById('pilihBuku');
  // Ambil elemen dropdown

  for (var i = 0; i < dataKoleksi.length; i++) {
    var buku = dataKoleksi[i];

    if (buku.status === 'tersedia') {
      // Hanya tampilkan buku yang statusnya 'tersedia' di dropdown
      // Buku yang sedang dipinjam tidak perlu muncul sebagai pilihan

      var opsi = document.createElement('option');
      // createElement(): membuat elemen HTML baru secara JavaScript
      // Hasilnya: elemen <option> yang belum ada di halaman

      opsi.value = buku.id;
      // Simpan ID buku sebagai value option
      // Ketika option ini dipilih, kita bisa ambil ID-nya

      opsi.textContent = buku.judul + ' — ' + buku.pengarang;
      // textContent: mengatur teks yang tampil di option
      // Tampilkan: "Judul Buku — Nama Pengarang"

      selectBuku.appendChild(opsi);
      // appendChild(): menambahkan elemen sebagai anak dari elemen lain
      // Masukkan <option> yang baru dibuat ke dalam <select>
    }
  }


  // --- BAGIAN 2: Isi tanggal pinjam dengan tanggal hari ini ---

  var hari_ini = new Date();
  // new Date(): membuat objek tanggal dengan waktu sekarang

  var tahun = hari_ini.getFullYear();
  // getFullYear(): ambil tahun (contoh: 2024)

  var bulan = hari_ini.getMonth() + 1;
  // getMonth(): ambil bulan, tapi dimulai dari 0 (Januari=0, Desember=11)
  // Kita tambah 1 agar Januari=1, Desember=12

  var tanggal = hari_ini.getDate();
  // getDate(): ambil tanggal dalam bulan (1-31)

  // Pastikan format dua digit untuk bulan dan tanggal (contoh: 01, 09)
  if (bulan < 10) {
    bulan = '0' + bulan;
    // Tambahkan nol di depan jika bulan satu digit
  }
  if (tanggal < 10) {
    tanggal = '0' + tanggal;
  }

  var formatTanggal = tahun + '-' + bulan + '-' + tanggal;
  // Gabungkan: "2024-01-15" (format yang diterima input type="date")

  document.getElementById('tanggalPinjam').value = formatTanggal;
  // Isi input tanggal dengan tanggal hari ini


  // --- BAGIAN 3: Fungsi menampilkan daftar peminjaman dari localStorage ---

  function tampilkanDaftarPinjaman() {
    var area = document.getElementById('daftarPinjaman');
    // Ambil area konten daftar peminjaman

    // Ambil data peminjaman dari localStorage
    var dataTersimpan = localStorage.getItem('dataPinjaman');
    // getItem(): ambil data berdasarkan kunci 'dataPinjaman'
    // Hasilnya berupa string JSON, atau null jika belum ada data

    var daftarPinjaman = [];
    // Siapkan array kosong

    if (dataTersimpan !== null) {
      // Jika ada data tersimpan di localStorage
      daftarPinjaman = JSON.parse(dataTersimpan);
      // JSON.parse(): ubah string JSON kembali menjadi array JavaScript
    }

    // Perbarui badge jumlah peminjaman
    document.getElementById('badgeJumlahPinjam').innerHTML = daftarPinjaman.length;

    // Tampilkan pesan jika belum ada peminjaman
    if (daftarPinjaman.length === 0) {
      area.innerHTML = '<p class="text-muted text-center py-4">Belum ada peminjaman aktif.</p>';
      return;
      // return: hentikan fungsi, tidak perlu lanjut membuat tabel
    }

    // Buat tabel daftar peminjaman
    var html = '<div class="table-responsive"><table class="table table-sm table-hover mb-0">';
    html += '<thead class="table-light"><tr>';
    html += '<th>Buku</th><th>Peminjam</th><th>Kembali</th><th></th>';
    html += '</tr></thead><tbody>';

    for (var j = 0; j < daftarPinjaman.length; j++) {
      var p = daftarPinjaman[j];
      // Ambil satu data peminjaman

      html += '<tr>';
      html += '<td><small class="fw-semibold">' + p.judulBuku + '</small></td>';
      html += '<td><small>' + p.namaPeminjam + '</small></td>';
      html += '<td><small>' + p.tanggalKembali + '</small></td>';

      // Tombol Kembalikan
      html += '<td>';
      html += '<button class="btn btn-outline-danger btn-sm" onclick="hapusPinjaman(' + j + ')">';
      // Saat diklik, panggil hapusPinjaman() dengan indeks baris ini
      html += 'Kembalikan</button>';
      html += '</td>';

      html += '</tr>';
    }

    html += '</tbody></table></div>';
    area.innerHTML = html;
  }


  // --- BAGIAN 4: Fungsi menghapus data peminjaman ---

  function hapusPinjaman(indeks) {
    // Ambil data peminjaman dari localStorage
    var dataTersimpan = localStorage.getItem('dataPinjaman');
    var daftarPinjaman = JSON.parse(dataTersimpan);
    // Parse kembali dari JSON string ke array

    var namaBuku = daftarPinjaman[indeks].judulBuku;
    // Simpan nama buku sebelum dihapus, untuk ditampilkan di pesan konfirmasi

    daftarPinjaman.splice(indeks, 1);
    // splice(posisi, jumlahDihapus): menghapus elemen dari array
    // splice(indeks, 1): hapus 1 elemen di posisi 'indeks'

    localStorage.setItem('dataPinjaman', JSON.stringify(daftarPinjaman));
    // Simpan kembali array yang sudah dikurangi ke localStorage
    // JSON.stringify(): ubah array kembali ke string JSON untuk disimpan

    tampilkanDaftarPinjaman();
    // Perbarui tampilan daftar

    tampilkanToastPinjam('📚 "' + namaBuku + '" berhasil dikembalikan.');
    // Tampilkan notifikasi Toast
  }

  // Ekspos fungsi hapusPinjaman agar bisa dipanggil dari onclick di HTML
  window.hapusPinjaman = hapusPinjaman;
  // window: objek global browser
  // Fungsi yang didefinisikan di dalam blok if() tidak otomatis global
  // Dengan window.hapusPinjaman = hapusPinjaman, fungsi ini bisa diakses dari mana saja


  // --- BAGIAN 5: Fungsi menampilkan Toast ---

  function tampilkanToastPinjam(pesan) {
    document.getElementById('isiToastPinjam').innerHTML = pesan;
    var toast = new bootstrap.Toast(document.getElementById('toastPinjam'), { delay: 4000 });
    toast.show();
  }


  // --- BAGIAN 6: Tangani submit form peminjaman ---

  elemenFormPinjam.addEventListener('submit', function(event) {
    event.preventDefault();

    // Bersihkan error sebelumnya
    document.getElementById('pilihBuku').classList.remove('is-invalid');
    document.getElementById('namaPeminjam').classList.remove('is-invalid');

    // Ambil nilai input
    var idBukuDipilih = document.getElementById('pilihBuku').value;
    var nama = document.getElementById('namaPeminjam').value.trim();
    var tglPinjam = document.getElementById('tanggalPinjam').value;
    var durasi = parseInt(document.getElementById('durasiPinjam').value);
    // parseInt(): ubah string "14" menjadi angka 14
    // Diperlukan agar bisa dihitung (string + angka = penggabungan teks)

    // Validasi
    var adaError = false;
    if (idBukuDipilih === '') {
      document.getElementById('pilihBuku').classList.add('is-invalid');
      adaError = true;
    }
    if (nama === '') {
      document.getElementById('namaPeminjam').classList.add('is-invalid');
      adaError = true;
    }
    if (adaError) return;

    // Cari data buku yang dipilih berdasarkan ID
    var bukuDipilih = null;
    // null: nilai kosong, akan diisi jika buku ditemukan

    for (var m = 0; m < dataKoleksi.length; m++) {
      if (dataKoleksi[m].id === parseInt(idBukuDipilih)) {
        // Bandingkan ID buku (keduanya diubah ke integer agar tipe datanya sama)
        bukuDipilih = dataKoleksi[m];
        // Simpan objek buku yang cocok
        break;
        // break: hentikan loop setelah buku ditemukan (tidak perlu cek sisanya)
      }
    }

    // Hitung tanggal kembali
    var tglKembali = new Date(tglPinjam);
    // Buat objek Date dari string tanggal pinjam

    tglKembali.setDate(tglKembali.getDate() + durasi);
    // setDate(): mengubah tanggal dalam objek Date
    // getDate() + durasi = tambahkan durasi hari ke tanggal pinjam
    // JavaScript otomatis menangani perpindahan bulan/tahun

    var tglKembaliStr = tglKembali.toLocaleDateString('id-ID', {
      day: '2-digit', month: 'long', year: 'numeric'
    });
    // toLocaleDateString(): format tanggal sesuai locale
    // 'id-ID': format Indonesia
    // Hasilnya: "29 Januari 2024"

    // Buat objek data peminjaman baru
    var peminjamanBaru = {
      judulBuku: bukuDipilih.judul,
      namaPeminjam: nama,
      tanggalPinjam: tglPinjam,
      tanggalKembali: tglKembaliStr,
      durasi: durasi
    };

    // Ambil data peminjaman yang sudah ada dari localStorage
    var dataTersimpan = localStorage.getItem('dataPinjaman');
    var daftarPinjaman = [];

    if (dataTersimpan !== null) {
      daftarPinjaman = JSON.parse(dataTersimpan);
    }

    daftarPinjaman.push(peminjamanBaru);
    // Tambahkan data peminjaman baru ke array

    localStorage.setItem('dataPinjaman', JSON.stringify(daftarPinjaman));
    // Simpan seluruh array (termasuk yang baru) ke localStorage

    // Perbarui tampilan daftar
    tampilkanDaftarPinjaman();

    // Tampilkan Toast konfirmasi
    tampilkanToastPinjam('✅ Peminjaman "' + bukuDipilih.judul + '" berhasil dicatat!');

    // Reset form
    elemenFormPinjam.reset();
    // .reset(): mengosongkan semua input dalam form ke nilai awal

    document.getElementById('tanggalPinjam').value = formatTanggal;
    // Isi kembali tanggal hari ini (karena reset menghapusnya)
  });

  // Tampilkan daftar peminjaman saat halaman pertama dimuat
  tampilkanDaftarPinjaman();
}


// ===== JAVASCRIPT HALAMAN FAQ =====

var elemenAccordion = document.getElementById('accordionFaq');
// Cek apakah kita di halaman faq.html

if (elemenAccordion !== null) {

  // Data FAQ disimpan dalam array objek
  var dataFaq = [
    {
      pertanyaan: 'Berapa lama saya bisa meminjam buku?',
      jawaban: 'Durasi peminjaman standar adalah 14 hari. Anda dapat memilih 7, 14, atau 21 hari saat melakukan peminjaman melalui halaman Peminjaman.'
    },
    {
      pertanyaan: 'Bagaimana cara memperpanjang masa pinjam buku?',
      jawaban: 'Perpanjangan dapat dilakukan satu kali sebelum tanggal jatuh tempo. Kunjungi meja layanan atau hubungi petugas minimal 2 hari sebelum tanggal pengembalian.'
    },
    {
      pertanyaan: 'Apa sanksi jika buku terlambat dikembalikan?',
      jawaban: 'Keterlambatan dikenakan denda Rp500 per hari per buku. Buku yang rusak atau hilang wajib diganti dengan buku baru dengan judul yang sama.'
    },
    {
      pertanyaan: 'Berapa banyak buku yang bisa dipinjam sekaligus?',
      jawaban: 'Setiap anggota aktif dapat meminjam maksimal 3 buku secara bersamaan. Anggota dengan status "Anggota Istimewa" dapat meminjam hingga 5 buku.'
    },
    {
      pertanyaan: 'Bagaimana cara mendaftar sebagai anggota perpustakaan?',
      jawaban: 'Pendaftaran dilakukan di meja layanan dengan membawa kartu identitas mahasiswa/pegawai yang masih berlaku. Kartu anggota akan diterbitkan dalam 1×24 jam.'
    }
  ];

  // Bangun accordion secara dinamis menggunakan JavaScript
  var htmlAccordion = '';

  for (var i = 0; i < dataFaq.length; i++) {
    var faq = dataFaq[i];

    var idItem = 'faqItem' + i;
    // Buat ID unik untuk setiap item: faqItem0, faqItem1, faqItem2, dst.
    // ID ini dibutuhkan oleh Bootstrap untuk menghubungkan tombol dengan panel

    var idKonten = 'faqKonten' + i;
    // ID unik untuk panel konten: faqKonten0, faqKonten1, dst.

    htmlAccordion += '<div class="accordion-item">';
    // accordion-item: satu pasang pertanyaan-jawaban

    // Header (tombol pertanyaan)
    htmlAccordion += '<h2 class="accordion-header" id="' + idItem + '">';
    // accordion-header: pembungkus tombol accordion

    htmlAccordion += '<button class="accordion-button collapsed" type="button"';
    // accordion-button: tombol yang diklik untuk membuka/menutup panel
    // collapsed: mulai dalam keadaan tertutup (semua panel tertutup saat halaman dimuat)

    htmlAccordion += ' data-bs-toggle="collapse"';
    // Perintah Bootstrap: toggling panel collapse

    htmlAccordion += ' data-bs-target="#' + idKonten + '"';
    // Target: panel mana yang dikendalikan oleh tombol ini

    htmlAccordion += ' aria-expanded="false"';
    // aria-expanded: aksesibilitas — memberitahu screen reader bahwa panel sedang tertutup

    htmlAccordion += ' aria-controls="' + idKonten + '">';
    // aria-controls: ID elemen yang dikendalikan

    htmlAccordion += faq.pertanyaan;
    // Teks pertanyaan

    htmlAccordion += '</button></h2>';
    // Tutup tombol dan header

    // Panel konten (jawaban)
    htmlAccordion += '<div id="' + idKonten + '"';
    // Panel dengan ID yang ditarget oleh tombol

    htmlAccordion += ' class="accordion-collapse collapse"';
    // accordion-collapse collapse: panel dalam keadaan tertutup

    htmlAccordion += ' aria-labelledby="' + idItem + '"';
    // Aksesibilitas: label panel mengacu ke header-nya

    htmlAccordion += ' data-bs-parent="#accordionFaq">';
    // data-bs-parent: jika satu panel dibuka, panel lain dalam accordion yang sama akan tertutup
    // Ini yang membuat hanya satu panel bisa terbuka sekaligus

    htmlAccordion += '<div class="accordion-body">';
    // accordion-body: area teks jawaban
    htmlAccordion += faq.jawaban;
    htmlAccordion += '</div>';

    htmlAccordion += '</div>';
    // Tutup panel

    htmlAccordion += '</div>';
    // Tutup accordion-item
  }

  elemenAccordion.innerHTML = htmlAccordion;
  // Masukkan semua accordion item yang sudah dibuat ke dalam container
}