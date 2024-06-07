const menu = document.getElementById("menu");
const cartBtn = document.getElementById("cart-btn");
const cartModal = document.getElementById("cart-modal");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("checkout-btn");
const closeModalBtn = document.getElementById("close-modal-btn");
const cartCounter = document.getElementById("cart-count");

let cart = [];

cartBtn.addEventListener("click", function () {
    updateCartModal();
    cartModal.style.display = "flex";
});

cartModal.addEventListener("click", function (event) {
    if (event.target === cartModal) {
        cartModal.style.display = "none";
    }
});

closeModalBtn.addEventListener("click", function () {
    cartModal.style.display = "none";
});

function selectPizzaSize(size, price) {
    addToCart(size, price);
    alert(`Tamanho selecionado: ${size}`);
    console.log('Pizza adicionada ao carrinho:', { size, price });
}

function addFlavorToSize(flavor) {

    const selectedPizza = cart.find(item => item.size);
    if (selectedPizza) {
        selectedPizza.flavor = flavor;
        updateCartModal();
        cartModal.style.display = "none";
    } else {
        alert("Por favor, selecione primeiro o tamanho da pizza.");
    }
}

menu.addEventListener("click", function (event) {
    let parentButton = event.target.closest(".add-to-cart-btn");

    if (parentButton) {
        const size = parentButton.getAttribute("data-size");
        const price = parentButton.getAttribute("data-price");
        addToCart(size, price);
        console.log('Adicionado ao carrinho:', { size, price });
    }
});

function addToCart(size, price) {
    cart.push({
        size: size,
        price: parseFloat(price),
        quantity: 1,
    });

    updateCartModal();
}

function updateCartModal() {
    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        const cartItemElement = document.createElement("div");
        cartItemElement.classList.add("flex", "justify-between", "mb-4", "flex-col");

        cartItemElement.innerHTML = `
            <div class="flex items-center justify-between"> 
                <div>
                  <p class="font-bold">${item.size}</p>
                  <p class="font-medium mt-2">R$ ${item.price.toFixed(2)}</p>
                </div>
                <div>
                    <button class="remove-btn" data-name="${item.size}">
                        Remover
                    </button>
                </div>
            </div>
        `;

        total += item.price * item.quantity;

        cartItemsContainer.appendChild(cartItemElement);
    });

    cartTotal.textContent = total.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

    cartCounter.innerHTML = cart.length;
}