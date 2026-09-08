```javascript
let cart = [];


// TAMBAH PRODUK

function addToCart(name, price) {

    const existing = cart.find(item => item.name === name);

    if (existing) {
        existing.qty++;
    } else {
        cart.push({
            name: name,
            price: price,
            qty: 1
        });
    }

    updateCart();

    alert(name + " ditambahkan ke pesanan!");
}


// TAMPILKAN KERANJANG

function updateCart() {

    const cartList = document.getElementById("cart-list");
    const totalElement = document.getElementById("total");

    cartList.innerHTML = "";

    if (cart.length === 0) {

        cartList.innerHTML =
            "<p>Belum ada pesanan.</p>";

        totalElement.textContent = "Rp 0";

        return;
    }

    let total = 0;

    cart.forEach((item, index) => {

        const subtotal = item.price * item.qty;

        total += subtotal;

        const div = document.createElement("div");

        div.className = "cart-item";

        div.innerHTML = `
            <div>
                <strong>${item.name}</strong>
                <br>
                ${item.qty} x ${formatRupiah(item.price)}
            </div>

            <div>
                ${formatRupiah(subtotal)}

                <button
                    class="remove"
                    onclick="removeItem(${index})">
                    X
                </button>
            </div>
        `;

        cartList.appendChild(div);

    });

    totalElement.textContent = formatRupiah(total);
}


// HAPUS PRODUK

function removeItem(index) {

    cart.splice(index, 1);

    updateCart();
}


// FORMAT RUPIAH

function formatRupiah(number) {

    return new Intl.NumberFormat(
        "id-ID",
        {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0
        }
    ).format(number);

}


// CHECKOUT

function checkout() {

    if (cart.length === 0) {

        alert("Keranjang masih kosong!");

        return;
    }

    let message =
        "Halo Kopi Senja, saya ingin memesan:%0A%0A";

    let total = 0;

    cart.forEach(item => {

        const subtotal = item.price * item.qty;

        total += subtotal;

        message +=
            `${item.name} x${item.qty} - ${formatRupiah(subtotal)}%0A`;

    });

    message +=
        `%0ATotal: ${formatRupiah(total)}`;

    /*
       Ganti nomor berikut dengan nomor WhatsApp kafe.
       Format: 628xxxxxxxxxx
    */

    const phone = "6281234567890";

    const url =
        `https://wa.me/${phone}?text=${message}`;

    window.open(url, "_blank");

}
```
