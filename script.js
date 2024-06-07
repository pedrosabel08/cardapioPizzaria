const menu = document.getElementById("menu");
const cartBtn = document.getElementById("cart-btn");
const cartModal = document.getElementById("cart-modal");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("checkout-btn");
const closeModalBtn = document.getElementById("close-modal-btn");
const cartCounter = document.getElementById("cart-count");
const flavors = document.getElementById("flavors-items")

let cart = [];
let selectedSize = null;

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


menu.addEventListener("click", function (event) {
    let parentButton = event.target.closest(".pizzas-container__item");

    if (parentButton) {
        const size = parentButton.getAttribute("data-size");
        const price = parentButton.getAttribute("data-price");

    }
});

function selectPizzaSize(size, price) {
    selectedSize = { size, price, sabores: [] };
    console.log(selectedSize);
    addToCart(selectedSize);
    alert(`Tamanho selecionado: ${size}`);
}

function addToCart(selectedSize) {
    // Verifica se o item já está no carrinho para evitar duplicação
    const existingItem = cart.find(item => item.size === selectedSize.size && item.price === parseFloat(selectedSize.price));
    if (existingItem) {
        // Incrementa a quantidade se o item já existir no carrinho
        existingItem.quantity += 1;
    } else {
        // Adiciona um novo item ao carrinho
        cart.push({
            size: selectedSize.size,
            price: parseFloat(selectedSize.price),
            sabores: selectedSize.sabores.slice(),
            quantity: 1,
        });
    }
    updateCartModal();
}

flavors.addEventListener("click", function (event) {
    let parentButton = event.target.closest(".add-to-cart-btn")

    if (parentButton) {
        const name = parentButton.getAttribute("data-name");
        addToSize(name);
    }
})

function addToSize(name) {
    if (!selectedSize) {
        alert("Selecione um tamanho de pizza primeiro!");
        return;
    }

    selectedSize.sabores.push(name); // Adiciona o sabor ao objeto selectedSize
    updateCartModal(); // Atualiza o modal do carrinho
    console.log(selectedSize)
}

function updateCartModal() {
    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        const cartItemElement = document.createElement("div");
        cartItemElement.classList.add("flex", "justify-between", "mb-4", "flex-col");

        // Adiciona o tamanho e os sabores
        cartItemElement.innerHTML = `
        <div class="flex items-center justify-between"> 
            <div>
                <label class="flex items-center">
                    <input type="checkbox" class="mr-2" ${isSelected(item) ? 'checked' : ''}>
                    <span class="font-bold">${item.size}</span>
                    <span class="font-bold">${item.sabores.join(', ')}</span> <!-- Exibe os sabores -->
                </label>
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


cartItemsContainer.addEventListener("click", function (event) {
    if (event.target.classList.contains("remove-btn")) {
        const size = event.target.getAttribute("data-size")

        removeItemCart(size);
    }
})

function removeItemCart(size) {
    const index = cart.findIndex(item => item.size === size);

    if (index !== -1) {
        const item = cart[index];

        if (item.quantity > 1) {
            item.quantity -= 1;
            updateCartModal();
            return;
        }

        cart.splice(index, 1);
        updateCartModal();
    }
}

function isSelected(item) {
    if (!selectedSize) return false;
    // Verifica se o tamanho do item corresponde ao tamanho selecionado
    const sizeMatches = selectedSize.size === item.size;
    // Verifica se o checkbox está marcado (se encontrado)
    const checkboxChecked = cartItemsContainer.querySelector(`[data-name="${item.size}"] input[type="checkbox"]:checked`);
    return sizeMatches && (checkboxChecked !== null);
}