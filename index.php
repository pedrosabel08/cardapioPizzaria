<?php
include ("conexao.php");
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link rel="stylesheet" href="./styles/output.css" />
    <link rel="stylesheet" href="./styles/style.css">
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
        integrity="sha512-Fo3rlrZj/k7ujTnHg4CGR2D7kSs0v4LLanw2qksYuRlEzO+tcaEPQogQ0KaoGN26/zrn20ImR1DfuLWnOo7aBA=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />

    <title>Pizzaria Dom João</title>
</head>

<body>

    <header class="w-full h-[420px] bg-orange-300">
        <div class="w-full h-full flex flex-col justify-center items-center">
            <img src="./assets/domJoao.jpg" alt="Logo" class="w-40 h-40 rounded-full shadow-lg hover:scale-110">
            <h1 class="text-3xl mt-4 mb-2 font-bold text-black">Pizzaria Dom João</h1>
            <a href="https://www.google.com/maps/search/?api=1&query=%27Rua%20Jo%C3%A3o%20Pessoa,%201726%20Sl%2004%20-%20Velha%20-%20Blumenau%20/%20SC%27"
                class="text-black font-medium" target="blink">Rua João Pessoa, 1726 Sl 04 - Velha - Blumenau/SC</a>
            <div class="bg-green-500 px-4 py-1 rounded-lg mt-5" id="date-span">
                <span class="text-white font-medium">Seg a Dom - 17:30 as 23:30</span>
            </div>
        </div>
    </header>
    <div>
        <div id="menu">
            <h2 class="text-2xl md:text-3xl font-bold text-center mt-9 mb-6">
                Tamanho Pizza
            </h2>
            <div class="pizzas-container">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mx-auto my-auto px-2 mb-16">
                    <?php
                    $pizzaItems = array(
                        array("PIZZA BABY", "./assets/pizzaBaby.jpg", "20cm, 4 fatias, 1 sabor", "29.90"),
                        array("PIZZA MÉDIA", "./assets/pizzaMedia.jpg", "30cm, 8 fatias, 2 sabores", "58.90"),
                        array("PIZZA GRANDE", "./assets/pizzaGrande.jpg", "35cm, 12 fatias, 3 sabores", "76.90"),
                        array("PIZZA GIGANTE", "./assets/pizzaGigante.jpg", "45cm, 16 fatias, 4 sabores", "87.90")
                    );

                    foreach ($pizzaItems as $item) {
                        ?>
                        <div class="pizzas-container__item bg-white rounded-lg shadow-md flex p-6 hover:shadow-lg cursor-pointer"
                            data-size="<?php echo $item[0]; ?>" data-price="<?php echo $item[3]; ?>"
                            onclick="selectPizzaSize('<?php echo $item[0]; ?>', '<?php echo $item[3]; ?>')">
                            <img src="<?php echo $item[1]; ?>" alt="<?php echo $item[0]; ?>"
                                class="w-24 h-24 object-cover rounded-full mr-6">
                            <div class="description">
                                <h2 class="font-bold text-xl"><?php echo $item[0]; ?></h2>
                                <p><?php echo $item[2]; ?></p>
                                <p class="font-medium text-red-600">R$ <?php echo $item[3]; ?></p>
                            </div>
                        </div>
                        <?php
                    }
                    ?>
                </div>
            </div>


        </div>
        <footer class="w-full bg-red-500 py-3 fixed bottom-0 z-40 flex items-center justify-center">
            <button class="flex items-center gap-2 text-white font-bold" id="cart-btn">
                (<span id="cart-count">0</span>)
                Veja meu carrinho
                <i class="fa fa-cart-plus text-lg text-white"></i>
            </button>
        </footer>

        <div class="hidden flex-col items-center justify-center w-full h-full bg-black/50 fixed top-0 left-0 z-[99] "
            id="cart-modal">
            <div class="bg-white p-5 rounded-md w-[900px] md:w-[600px] h-full overflow-y-auto" id="flavors-items">
                <h2 class="text-2xl md:text-3xl font-bold text-center mt-9 mb-6">Cardápio</h2>
                <main class="grid grid-cols-1: md:grid-cols-3 gap-7 md:gap-10 mx-auto max-w-7xl px-2 mb-16">
                    <?php
                    $sql = "SELECT p.idpizzas, p.nomePizza, GROUP_CONCAT(pr.nomeProduto SEPARATOR ', ') AS ingredientes
                    FROM pizzas p
                    JOIN pizzas_produtos pp ON p.idpizzas = pp.pizza_id
                    JOIN produtos pr ON pp.produto_id = pr.idprodutos
                    GROUP BY p.idpizzas";
                    $result = mysqli_query($conn, $sql);

                    if (mysqli_num_rows($result) > 0) {
                        while ($row = mysqli_fetch_assoc($result)) {
                            ?>
                            <div class="pizza-item rounded-lg shadow-md p-6">
                                <h3 class="text-xl font-bold"><?php echo $row['nomePizza']; ?></h3>
                                <p class="text-gray-700">Ingredientes: <?php echo $row['ingredientes']; ?></p>
                                <button class="bg-gray-900 px-5 rounded add-to-cart-btn"
                                    data-name="<?php echo $row['nomePizza']; ?>">
                                    <i class="fa fa-cart-plus text-lg text-white"></i>
                                </button>
                            </div>
                            <?php
                        }
                    } else {
                        echo "Nenhuma pizza encontrada.";
                    }
                    ?>
                </main>
            </div>
            <div class="bg-white p-5 rounded-md w-full md:w-[600px] mt-4">
                <h2 class="text-center font-bold text-2xl mb-2">Meu carrinho</h2>
                <div id="cart-items" class="flex justify-between mb-2 flex-col"></div>
                <p class="font-bold">Total: R$ <span id="cart-total">0.00</span></p>
                <div class="flex items-center justify-between mt-5 w-full">
                    <button id="close-modal-btn" class="bg-red-500 text-white px-4 py-1 rounded">Fechar</button>
                    <button id="checkout-btn" class="bg-green-500 text-white px-4 py-1 rounded">Finalizar
                        Pedido</button>
                </div>
            </div>
        </div>
        <script src="script.js"></script>
</body>

</html>