document.addEventListener("DOMContentLoaded", function () {

    class Sudadera {
        constructor(id, titulo, precio, imagen) {
            this.id = id;
            this.titulo = titulo;
            this.precio = precio;
            this.imagen = imagen;
        }
    }

    class Carrito1 {
        constructor() {
            this.productos = JSON.parse(localStorage.getItem("carrito")) || [];
            this.carritoContador = document.getElementById("carritoContador");
        }
        obtenerYMostrarSudaderas() {
            fetch("https://jsonblob.com/api/jsonBlob/1200023953573011456")
                .then(response => {
                    return response.json();
                })
                .then(sudaderasDatos => {
                    const sudaderasFiltradas = sudaderasDatos.filter(producto => producto.categoria.id === "sudaderas");

                    const sudaderasSeccion = document.getElementById("sudaderasSeccion");
                    sudaderasSeccion.innerHTML = "";

                    sudaderasFiltradas.forEach(sudaderaDatos => {
                        const sudadera = new Sudadera(sudaderaDatos.id, sudaderaDatos.titulo, sudaderaDatos.precio, sudaderaDatos.imagen);
                        const contenedor = document.createElement("div");
                        contenedor.className = "contenedor__productoytitulo";
                        contenedor.setAttribute("data-product-id", sudadera.id);

                        const htmlSudadera = `
                            <div class="producto">
                                <a href="./producto.html?id=${sudadera.id}" class="producto__imagen"><img src="${sudadera.imagen}" class="carrusel__img" alt="${sudadera.titulo}"></a>
                            </div>
                            <div class="contenedor__detalles">
                                <div class="producto__tituloyprecio">
                                    <div class="producto__titulo">${sudadera.titulo}</div>
                                    <div class="producto__precio">${sudadera.precio}€</div>
                                </div>
                                <button class="producto__botonComprar" data-product-id="${sudadera.id}">Añadir</button>
                            </div>
                        `;

                        contenedor.innerHTML = htmlSudadera;
                        sudaderasSeccion.append(contenedor);

                        const botonComprar = contenedor.querySelector(".producto__botonComprar");

                        if (botonComprar) {
                            botonComprar.addEventListener("click", () => this.agregarAlCarrito(sudadera));
                        }
                    });
                })

        }
        agregarAlCarrito(producto) {
            const productoExistente = this.productos.find(p => p.id === producto.id);

            if (productoExistente) {
                productoExistente.cantidad++;
                productoExistente.total = (productoExistente.cantidad * parseFloat(productoExistente.precio)).toFixed(2);
            } else {
                this.productos.push({
                    id: producto.id,
                    titulo: producto.titulo,
                    precio: producto.precio,
                    cantidad: 1,
                    total: parseFloat(producto.precio).toFixed(2)
                });
            }

            this.actualizarContadorCarrito();
            this.guardarCarritoEnLocalStorage();
        }
        actualizarContadorCarrito() {
            const totalProductos = this.productos.reduce((total, producto) => total + producto.cantidad, 0);
            this.carritoContador.textContent = totalProductos;
        }
        guardarCarritoEnLocalStorage() {
            localStorage.setItem("carrito", JSON.stringify(this.productos));
        }
    }

    const carrito1 = new Carrito1();

    carrito1.obtenerYMostrarSudaderas();

    if (localStorage.getItem("carrito")) {
        carrito1.productos = JSON.parse(localStorage.getItem("carrito"));
        carrito1.actualizarContadorCarrito();
    }

});


