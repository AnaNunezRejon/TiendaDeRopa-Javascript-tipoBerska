document.addEventListener("DOMContentLoaded", function () {

    class Carrito {
        constructor() {
            this.productos = JSON.parse(localStorage.getItem("carrito")) || [];
            this.carritoProductos = document.getElementById("carrito__productos1");
            this.asideContenido = document.getElementById("aside__contenido");
            this.carritoContador = document.getElementById("carritoContador");

        }
        pintarEnCarrito() {
            this.carritoProductos.innerHTML = "";
            this.asideContenido.innerHTML = "";

            this.productos.forEach(producto => {
                const nuevoProducto = this.crearElementoProducto(producto);
                this.carritoProductos.append(nuevoProducto);
            });

            this.mostrarTotal();
            this.actualizarNumeroProductosCarrito();
            this.pintarAside();
        }

        crearElementoProducto(producto) {
            const nuevoProducto = document.createElement("article");
            nuevoProducto.className = "productos__producto";

            const totalFormateado = this.formatearTotal(producto.total);

            nuevoProducto.innerHTML = `
                <div class="producto__tituloyreferencia">
                    <div class="producto__titulo"><strong>${producto.titulo}</strong></div>
                    <div class="producto__referencia">${producto.id}</div>
                </div>
                <div class="producto__botones">
                    <button class="boton__restar" data-id="${producto.id}">-</button>
                    <input type="number" class="cantidad" value="${producto.cantidad}" data-id="${producto.id}" />
                    <button class="boton__sumar" data-id="${producto.id}">+</button>
                </div>
                <div class="producto__precio-unidad">${producto.precio}€</div>
                <div class="producto__precio-total" data-id="${producto.id}">
                    <strong>${totalFormateado}</strong>
                </div>
                <div class="contenedor__boton">
                    <button class="boton__eliminar" data-id="${producto.id}">Eliminar</button>
                </div>
            `;

            const botonEliminar = nuevoProducto.querySelector(".boton__eliminar");

            botonEliminar.addEventListener("click", () => {
                this.eliminarProducto(producto.id);
            });

            return nuevoProducto;
        }
        pintarAside() {

            this.asideContenido.innerHTML = "";

            this.productos.forEach(producto => {
                if (producto.cantidad > 0) {
                    const productoEnAside = document.createElement("div");
                    productoEnAside.className = "aside__producto";
                    productoEnAside.innerHTML = `
                        <div class="aside__producto-contenedor">
                            <div class="aside__producto-nombre">${producto.titulo}</div>
                            <div class="aside__producto-total">${this.formatearTotal(producto.total)}</div>
                        </div>
                    `;
                    this.asideContenido.append(productoEnAside);
                }
            });
        }
        formatearTotal(total) {
            return (typeof total === "number" && !isNaN(total)) ? total.toFixed(2) + "€" : total + "€";
        }
        eliminarProducto(idProducto) {
            this.productos = this.productos.filter(producto => producto.id !== idProducto);
            localStorage.setItem("carrito", JSON.stringify(this.productos));
            this.pintarEnCarrito();
        }
        mostrarTotal() {
            const totalPrecioElement = document.getElementById("total__precio");
            const total = parseFloat(this.calcularTotal()).toFixed(2);

            totalPrecioElement.innerHTML = `<strong>${total}€</strong>`;
        }
        calcularTotal() {
            return this.productos.reduce((total, producto) => total + parseFloat(producto.total), 0).toFixed(2);
        }
        actualizarNumeroProductosCarrito() {
            const carritoContador = document.getElementById("carritoContador");

            if (carritoContador) {
                const totalProductos = this.productos.reduce((total, producto) => total + producto.cantidad, 0);
                carritoContador.textContent = totalProductos;
            } else {
                console.log("Error: No se pudo encontrar carritoContador.");
            }
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
    }

    const carrito = new Carrito();

    carrito.pintarEnCarrito();

    carrito.carritoProductos.addEventListener("click", function (event) {
        const target = event.target;

        if (target.classList.contains("boton__restar") || target.classList.contains("boton__sumar")) {
            const idProducto = target.getAttribute("data-id");
            carrito.actualizarCantidad(idProducto, target.classList.contains("boton__sumar"));
        }
    });

    const botonTramitarPedido = document.getElementById("botonTramitarPedido");

    function actualizarEstadoBoton() {
        if (carrito.productos.length === 0) {
            botonTramitarPedido.textContent = "Carrito vacío";
            botonTramitarPedido.style.pointerEvents = "none";
            document.getElementById("mensajeCarritoVacio").style.display = "block";
        } else {
            botonTramitarPedido.textContent = "Tramitar pedido";
            botonTramitarPedido.style.pointerEvents = "auto";
            botonTramitarPedido.href = "./formulario.html";
            document.getElementById("mensajeCarritoVacio").style.display = "none";
        }
    }

    actualizarEstadoBoton();

    carrito.carritoProductos.addEventListener("click", function (event) {
        const target = event.target;

        if (target.classList.contains("boton__eliminar")) {
            const idProducto = target.getAttribute("data-id");
            carrito.eliminarProducto(idProducto);
            actualizarEstadoBoton();
        }
    });

});



