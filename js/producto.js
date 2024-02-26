document.addEventListener("DOMContentLoaded", function () {

    // Toggle
    // Constantes Toggle Titles
    const toggleDescription = document.querySelector(
        '.title-description'
    );
    const toggleAdditionalInformation = document.querySelector(
        '.title-additional-information'
    );
    const toggleReviews = document.querySelector('.title-reviews');

    // Constantes Contenido Texto
    const contentDescription = document.querySelector(
        '.text-description'
    );
    const contentAdditionalInformation = document.querySelector(
        '.text-additional-information'
    );
    const contentReviews = document.querySelector('.text-reviews');

    // Funciones Toggle
    toggleDescription.addEventListener('click', () => {
        contentDescription.classList.toggle('hidden');
    });

    toggleAdditionalInformation.addEventListener('click', () => {
        contentAdditionalInformation.classList.toggle('hidden');
    });

    toggleReviews.addEventListener('click', () => {
        contentReviews.classList.toggle('hidden');
    });



    class Carrito4 {
        constructor() {
            this.productos = JSON.parse(localStorage.getItem("carrito")) || [];
            this.carritoProductos = document.getElementById("carrito__productos1");
            this.carritoContador = document.getElementById("carritoContador");

        }
        actualizarCantidad(idProducto, sumar) {
            const producto = this.productos.find(p => p.id === idProducto);

            if (producto) {
                producto.cantidad = (sumar) ? producto.cantidad + 1 : Math.max(0, producto.cantidad - 1);
                producto.total = producto.cantidad * producto.precio;
                localStorage.setItem("carrito", JSON.stringify(this.productos));
                this.pintarEnCarrito();
            }
        }
        agregarAlCarrito(producto, cantidad) {
            console.log('Agregando al carrito. Cantidad:', cantidad);
            const productoExistente = this.productos.find(p => p.id === producto.id);

            if (productoExistente) {
                productoExistente.cantidad += cantidad;
                productoExistente.total = (productoExistente.cantidad * parseFloat(productoExistente.precio)).toFixed(2);
            } else {
                this.productos.push({
                    id: producto.id,
                    titulo: producto.titulo,
                    precio: producto.precio,
                    cantidad: cantidad,
                    total: (cantidad * parseFloat(producto.precio)).toFixed(2)
                });
            }

            this.actualizarContadorCarrito();
            this.guardarCarritoEnLocalStorage();
        }
        actualizarContadorCarrito() {

            const totalProductos = this.productos.reduce((total, producto) => total + producto.cantidad, 0);
            this.carritoContador.textContent = totalProductos;
            console.log('Total de productos en el carrito:', totalProductos);
        }

        guardarCarritoEnLocalStorage() {
            localStorage.setItem("carrito", JSON.stringify(this.productos));
        }
    }

    const inputQuantity = document.querySelector('.input-quantity');
    const btnIncrement = document.querySelector('#increment');
    const btnDecrement = document.querySelector('#decrement');
    let valueByDefault = parseInt(inputQuantity.value);

    btnIncrement.addEventListener('click', () => {
        valueByDefault += 1;
        inputQuantity.value = valueByDefault;
        console.log('Incrementando. Nuevo valor:', valueByDefault);
    });

    btnDecrement.addEventListener('click', () => {
        if (valueByDefault === 1) {
            return;
        }
        valueByDefault -= 1;
        inputQuantity.value = valueByDefault;
        console.log('Decrementando. Nuevo valor:', valueByDefault);
    });

    let sudaderaElegida;

    const carrito4 = new Carrito4();

    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    const containerPrecio = document.querySelector('.container-price');

    fetch("https://jsonblob.com/api/jsonBlob/1200023953573011456")
        .then(response => response.json())
        .then(sudaderasDatos => {
            sudaderaElegida = sudaderasDatos.find(producto => producto.id === productId);

            if (sudaderaElegida) {
                document.querySelector('.imagen__producto').src = sudaderaElegida.imagen;
                containerPrecio.innerHTML = `<span>${sudaderaElegida.precio}€</span>`;

                const btnAñadirCarrito = document.querySelector('.producto__botonComprar');
                btnAñadirCarrito.addEventListener('click', () => {
                    console.log('Botón Añadir al carrito clickeado');
                    const cantidad = parseInt(inputQuantity.value) || 1;

                });
            } else {
                console.error('No se encontró la sudadera con el ID especificado.');
            }
        })

    carrito4.actualizarContadorCarrito();

    const productForm = document.getElementById('productForm');

    if (productForm) {
        productForm.addEventListener('submit', function (event) {
            event.preventDefault();
            console.log('Formulario enviado');
            const cantidad = parseInt(inputQuantity.value);
            carrito4.agregarAlCarrito(sudaderaElegida, cantidad);

        });
    } else {
        console.error("No se encontró el formulario con id 'productForm'.");
    }
});