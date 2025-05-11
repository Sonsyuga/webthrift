// Fungsi untuk menambahkan item ke keranjang
function tambahKeKeranjang(namaProduk, hargaProduk) {
    const cart = document.getElementById('cart');

    // Buat elemen baru untuk item keranjang
    const item = document.createElement('div');
    item.classList.add('cart-item');
    item.innerHTML = `
        <p><strong>Nama:</strong> ${namaProduk}</p>
        <p><strong>Harga:</strong> ${hargaProduk}</p>
        <button class="btn-hapus" onclick="hapusItem(this)">Hapus</button>
    `;

    // Tambahkan item ke keranjang
    cart.appendChild(item);
}

// Fungsi untuk menghapus item dari keranjang
function hapusItem(button) {
    const item = button.parentElement;
    item.remove();
}

// Fungsi untuk menangani checkout
function handleCheckout(event) {
    event.preventDefault(); // Mencegah reload halaman

    // Ambil data dari input
    const nama = document.getElementById('nama').value;
    const alamat = document.getElementById('alamat').value;
    const telepon = document.getElementById('telepon').value;

    // Validasi input
    if (!nama || !alamat || !telepon) {
        alert("Harap isi semua data pembeli!");
        return;
    }

    // Ambil data produk dari URL
    const urlParams = new URLSearchParams(window.location.search);
    const product = urlParams.get('product');
    const price = urlParams.get('price');

    // Tampilkan data di receipt
    const receipt = `
        <h3>Struk Pembelian</h3>
        <p><strong>Nama:</strong> ${nama}</p>
        <p><strong>Alamat:</strong> ${alamat}</p>
        <p><strong>Telepon:</strong> ${telepon}</p>
        <h4>Produk yang dibeli:</h4>
        <p><strong>Nama Produk:</strong> ${product}</p>
        <p><strong>Harga:</strong> Rp ${parseInt(price).toLocaleString('id-ID')}</p>
    `;
    document.getElementById('receipt').innerHTML = receipt;

    // Kosongkan form setelah checkout
    document.getElementById('checkout-form').reset();
}

// Fungsi untuk mengunduh struk sebagai PDF
function downloadPDF() {
    const { jsPDF } = window.jspdf; // Ambil jsPDF dari library
    const doc = new jsPDF();

    // Ambil elemen struk
    const receipt = document.getElementById('receipt');

    if (!receipt.innerHTML.trim()) {
        alert("Struk kosong! Silakan lakukan checkout terlebih dahulu.");
        return;
    }

    // Tambahkan konten struk ke PDF
    doc.html(receipt, {
        callback: function (doc) {
            // Simpan file PDF
            doc.save("struk-pembelian.pdf");
        },
        x: 10,
        y: 10
    });
}

// Fungsi untuk memuat keranjang dari localStorage
function muatKeranjang() {
    const keranjang = JSON.parse(localStorage.getItem('keranjang')) || [];
    const cart = document.getElementById('cart');

    keranjang.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('cart-item');
        div.innerHTML = `
            <p><strong>Nama:</strong> ${item.nama}</p>
            <p><strong>Harga:</strong> ${item.harga}</p>
        `;
        cart.appendChild(div);
    });
}

// Panggil fungsi ini saat halaman checkout dimuat
if (document.getElementById('cart')) {
    muatKeranjang();
}

// Mencegah scroll ke atas untuk semua elemen <a href="#">
document.querySelectorAll('a[href="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(event) {
        event.preventDefault();
    });
});