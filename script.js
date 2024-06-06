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


menu.addEventListener("click", function(event){

    let parentButton = event.target.closest(".add-to-cart-btn")

    if(parentButton){
        const name = parentButton.getAttribute("data-name")
        const price = parseFloat(parentButton.getAttribute("data-price"))
        const size = parentButton.getAttribute("data-size")

        addToCart(name, price, size)
        console.log(name)
        console.log(price)
        console.log(size)
    }

})

function addToCart(name, price, size){
    cart.push({
        name,
        price,
        size,
        quantity: 1,
    })

    updateCartModal();
}

function updateCartModal(){

    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        const cartItemElement = document.createElement("div");
        cartItemElement.classList.add("flex", "justify-between", "mb-4", "flex-col")

        cartItemElement.innerHTML = `
            <div class="flex items-center justify-between"> 
                <div>
                  <p class="font-bold">${item.size}</p>
                  <p class="font-medium">${item.name}</p>
                  <p>${item.quantity}</p>
                  <p class="font-medium m2-2">R$ ${item.price.toFixed(2)}</p>
                </div>

                <div>
                    <button class="remove-btn" data-name="${item.size}">
                        Remover
                    </button>
                </div>
            </div>
        `

        total += item.price * item.quantity;

        cartItemsContainer.appendChild(cartItemElement)
    })

    cartTotal.textContent = total.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

    cartCounter.innerHTML = cart.length;
}