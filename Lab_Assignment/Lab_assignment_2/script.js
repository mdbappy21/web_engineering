let cartCount = 0;
let totalPrice = 0;
const cartMap = new Map();

const cartIcons = document.querySelectorAll('.productCard .fa-cart-shopping');
const cartCountElement = document.getElementById("cartCount");
const drawer = document.getElementById("drawer");
const drawerContent = document.getElementById("drawerContent");
const closeDrawerBtn = document.getElementById("closeDrawerBtn");
const navbarCartIcon = document.getElementById("cartIcon");

// 🛒 Add to cart on product icon click
cartIcons.forEach(icon => {
    icon.addEventListener('click', () => {
        const productCard = icon.closest('.productCard');
        const productName = productCard.querySelector('.productName').innerText;
        const price = parseFloat(productCard.querySelector('.newPrice').textContent.replace('$', ''));
        const imageUrl = productCard.querySelector('img').src;

        const confirmAdd = confirm(`Do you want to add "${productName}" to your cart?`);
        if (!confirmAdd) return;

        if (cartMap.has(productName)) {
            const item = cartMap.get(productName);
            item.quantity += 1;
            item.totalPrice = item.quantity * item.unitPrice;
        } else {
            cartMap.set(productName, {
                quantity: 1,
                unitPrice: price,
                totalPrice: price,
                image: imageUrl
            });
        }

        cartCount++;
        totalPrice += price;
        cartCountElement.innerText = cartCount;

        updateCartDrawer();
    });
});

// 🛒 Open drawer when cart icon is clicked
navbarCartIcon.addEventListener('click', () => {
    drawer.classList.add('open');
    updateCartDrawer();
});

// ❌ Close drawer when "Close" button is clicked
closeDrawerBtn.addEventListener('click', () => {
    drawer.classList.remove('open');
});

// 🔄 Update drawer contents
function updateCartDrawer() {
    drawerContent.innerHTML = '';

    cartMap.forEach((item, name) => {
        const itemDiv = document.createElement('div');
        itemDiv.style.display = 'flex';
        itemDiv.style.alignItems = 'center';
        itemDiv.style.gap = '10px';
        itemDiv.style.marginBottom = '15px';

        itemDiv.innerHTML = `
            <img src="${item.image}" alt="${name}" style="width:50px;height:50px;object-fit:cover;border-radius:5px;">
            <div>
                <strong>${name}</strong><br>
                Qty: ${item.quantity} | Price: $${item.totalPrice.toFixed(2)}
            </div>
        `;
        drawerContent.appendChild(itemDiv);
    });

    const totalDiv = document.createElement('div');
    totalDiv.style.marginTop = '10px';
    totalDiv.innerHTML = `<hr><h3>Total: $${totalPrice.toFixed(2)}</h3>`;
    drawerContent.appendChild(totalDiv);
}

// 💚 Add discount labels to product cards
function addDiscountLabels() {
    const productCards = document.querySelectorAll(".productCard");

    productCards.forEach(card => {
        const oldPriceElement = card.querySelector(".oldPrice");
        const newPriceElement = card.querySelector(".newPrice");

        if (oldPriceElement && newPriceElement) {
            const oldPrice = parseFloat(oldPriceElement.textContent.replace('$', ''));
            const newPrice = parseFloat(newPriceElement.textContent.replace('$', ''));

            if (!isNaN(oldPrice) && !isNaN(newPrice) && oldPrice > newPrice) {
                const discount = Math.round(((oldPrice - newPrice) / oldPrice) * 100);

                const badge = document.createElement("div");
                badge.classList.add("discount-badge");
                badge.innerText = `${discount}% OFF`;

                card.appendChild(badge); // add badge to card (absolute positioned)
            }
        }
    });
}


window.onload = addDiscountLabels;
