const menu = document.getElementById("menu");
const cartBtn = document.getElementById("cart-btn");
const cartModal = document.getElementById("cart-modal");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("checkout-btn");
const closeModalBtn = document.getElementById("close-modal-btn");
const cartCounter = document.getElementById("cart-count");

const selectedPizza = {};
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

function selectPizzaSize(name, price) {
    selectedPizza.size = name;
    selectedPizza.price = parseFloat(price);
    selectedPizza.flavors = [];
    alert(`Tamanho selecionado: ${name}`);
    console.log('Pizza selecionada:', selectedPizza);
}

function selectFlavor(flavor) {
    if (!selectedPizza.size) {
        alert("Por favor, selecione primeiro o tamanho da pizza.");
        return;
    }
    selectedPizza.flavors.push(flavor);
    alert(`Sabor adicionado: ${flavor}`);
    console.log('Pizza selecionada após adicionar sabor:', selectedPizza);
}

function addToCart() {
    if (!selectedPizza.size || !selectedPizza.flavors.length || !selectedPizza.price) {
        alert("Erro ao adicionar pizza ao carrinho. Verifique se todos os detalhes foram selecionados.");
        return;
    }
    
    const cartItem = {
        name: selectedPizza.size,
        price: selectedPizza.price,
        flavors: [...selectedPizza.flavors],
        quantity: 1
    };
    cart.push(cartItem);
    updateCartModal();
    alert(`Pizza adicionada ao carrinho: ${selectedPizza.size}`);
    console.log('Carrinho atualizado:', cart);
}

function selectPizzaSize(name, price) {
    selectedPizza.size = name;
    selectedPizza.price = parseFloat(price);
    selectedPizza.flavors = [];
    alert(`Tamanho selecionado: ${name}`);
    console.log('Pizza selecionada:', selectedPizza);
}

function selectFlavor(flavor) {
    if (!selectedPizza.size) {
        alert("Por favor, selecione primeiro o tamanho da pizza.");
        return;
    }
    selectedPizza.flavors.push(flavor);
    alert(`Sabor adicionado: ${flavor}`);
    console.log('Pizza selecionada após adicionar sabor:', selectedPizza);
}

function updateCartModal() {
    console.log('Atualizando carrinho...');
    cartItemsContainer.innerHTML = "";
    let total = 0;
    cart.forEach(item => {
        const cartItemElement = document.createElement("div");
        cartItemElement.classList.add("flex", "justify-between", "mb-4", "flex-col");
        cartItemElement.innerHTML = `
            <div class="flex items-center justify-between">
                <div>
                    <p class="font-bold">${item.name}</p>
                    <p>Sabores: ${item.flavors.join(", ")}</p>
                    <p>Quantidade: ${item.quantity}</p>
                    <p class="font-medium m2-2">R$ ${item.price.toFixed(2)}</p>
                </div>
                <div>
                    <button class="remove-btn" onclick="removeFromCart('${item.name}')">Remover</button>
                </div>
            </div>
        `;
        total += item.price * item.quantity;
        cartItemsContainer.appendChild(cartItemElement);
    });
    cartTotal.innerText = total.toFixed(2);
    cartCounter.innerText = cart.length;
    console.log('Carrinho atualizado:', cart);
}

function removeFromCart(name) {
    const index = cart.findIndex(item => item.name === name);
    if (index > -1) {
        cart.splice(index, 1);
    }
    updateCartModal();
    console.log('Item removido do carrinho:', name);
}

document.getElementById("cart-btn").addEventListener("click", () => {
    document.getElementById("cart-modal").classList.toggle("hidden");
});

document.getElementById("close-modal-btn").addEventListener("click", () => {
    document.getElementById("cart-modal").classList.add("hidden");
});

document.getElementById("checkout-btn").addEventListener("click", () => {
    alert("Pedido finalizado!");
});