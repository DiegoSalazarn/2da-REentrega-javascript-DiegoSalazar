/*PUEDES CONSULTAR STOCK EN TODAS LAS PAGES*/

// Definición del stock de productos
const stockProductos = [
  { id: "0", descripcion: "Remera negra con diseño urbano", precio: 12000 },
  { id: "1", descripcion: "Remera blanca con diseño de flamas", precio: 12000 },
  { id: "2", descripcion: "Remera negra con diseño de rayos", precio: 13000 },
  { id: "3", descripcion: "Remera Negra Clasica", precio: 10000 },
  { id: "4", descripcion: "Remera negra con diseño mariposa rosita", precio: 13000 },
  { id: "5", descripcion: "Remera blanca thythm estampado school", precio: 17000 },
  { id: "6", descripcion: "Pantalon tipo jagger negro", precio: 30000 },
  { id: "7", descripcion: "Jagger Verde oscuro con elastico", precio: 28000 },
  { id: "8", descripcion: "Jean negro, varios bolsillos", precio: 24999 },
  { id: "9", descripcion: "Jean negro clasico", precio: 26000 },
  { id: "10", descripcion: "Jagger color beige", precio: 28000 },
  { id: "11", descripcion: "Jean clasico / Camuflado militar", precio: 24999 },
  { id: "12", descripcion: "Buzo nike Bi-Color / Negro con beige", precio: 50000 },
  { id: "13", descripcion: "Buzo nike Clasico Bi-Color", precio: 45000 },
  { id: "14", descripcion: "Buzo nike Bi-Color / negro con blanco", precio: 50000 },
];

// Limite por producto.
const productLimits = {
  "0": 3, // Límite para Remera negra
  "1": 5, // Límite para Remera blanca
  "2": 2, // Límite para Remera negra con rayos
  "3": 4, // Límite para Remera Negra Clasica
  "4": 3, // Límite para Remera negra con mariposa
  "5": 5, // Límite para Remera blanca thythm
  "6": 4, // Límite para Pantalón tipo jagger
  "7": 3, // Límite para Jagger Verde
  "8": 5, // Límite para Jean negro
  "9": 4, // Límite para Jean negro clásico
  "10": 2, // Límite para Jagger color beige
  "11": 5, // Límite para Jean clásico camuflado
  "12": 3, // Límite para Buzo nike bi-color
  "13": 4, // Límite para Buzo nike clásico
  "14": 3  // Límite para Buzo nike bi-color negro
};


let cart = [];

// Función para añadir un producto al carrito
function addToCart(productId) {
    const productIndex = cart.findIndex(item => item.product.id === productId);
    const product = stockProductos.find(p => p.id === productId);
    const limit = productLimits[productId];

    if (productIndex !== -1) {
        // Verifica si se puede incrementar la cantidad
        if (cart[productIndex].quantity < limit) {
            cart[productIndex].quantity += 1;
        } else {
            alert(`No se pueden añadir más de ${limit} unidades de este producto.`);
        }
    } else {
        // Si no está, lo agrega con cantidad 1
        cart.push({ product, quantity: 1 });
    }
    updateCart();
}

// Función para actualizar el carrito
function updateCart() {
    const cartItems = document.getElementById("cart-items");
    let total = 0;

    // Crear el HTML del carrito
    let cartHTML = "";
    cart.forEach(item => {
        const subtotal = item.product.precio * item.quantity;
        cartHTML += `
            <div>
                <span>${item.product.descripcion} - ${item.product.precio}$ x ${item.quantity} = ${subtotal}$</span>
                <button onclick="changeQuantity('${item.product.id}', 1)">+</button>
                <button onclick="changeQuantity('${item.product.id}', -1)">-</button>
            </div>`;
        total += subtotal;
    });

    // Asignar el HTML al contenedor del carrito
    cartItems.innerHTML = cartHTML;
    document.getElementById("total-price").innerText = `Total: ${total}$`;
}

// Función para cambiar la cantidad de un producto
function changeQuantity(productId, amount) {
    const productIndex = cart.findIndex(item => item.product.id === productId);
    const limit = productLimits[productId];

    if (productIndex !== -1) {
        const newQuantity = cart[productIndex].quantity + amount;

        if (newQuantity > limit) {
            alert(`No se pueden tener más de ${limit} unidades de este producto.`);
        } else if (newQuantity <= 0) {
            cart.splice(productIndex, 1);
        } else {
            cart[productIndex].quantity = newQuantity;
        }
        updateCart();
    }
}

// Función para mostrar los productos
function displayProducts() {
    const buttons = document.querySelectorAll(".add-to-cart");
    
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const productId = button.getAttribute("data-id");
            addToCart(productId);
        });
    });
}

// Agregar `data-id` a cada botón en el HTML
document.querySelectorAll('.add-to-cart').forEach((button, index) => {
    button.setAttribute("data-id", index.toString());
});

// Llamar a la función para mostrar los productos
displayProducts();

