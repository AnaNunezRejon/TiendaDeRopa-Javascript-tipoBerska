document.addEventListener("DOMContentLoaded", function () {
    class Carrito3 {
        constructor() {
            this.asideContenido = document.getElementById("aside__contenido");
            this.carritoContador = document.getElementById("carritoContador");
            this.productos = [];
            this.obtenerProductosDelLocalStorage();
        }

        obtenerProductosDelLocalStorage() {
            const productosLocalStorage = localStorage.getItem("carrito");
            this.productos = productosLocalStorage ? JSON.parse(productosLocalStorage) : [];
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

        mostrarTotal() {
            const totalPrecioElement = document.getElementById("total__precio");
            const total = parseFloat(this.calcularTotal()).toFixed(2);
            totalPrecioElement.innerHTML = `<strong>${total}€</strong>`;
        }

        calcularTotal() {
            return this.productos.reduce((total, producto) => total + parseFloat(producto.total), 0).toFixed(2);
        }

        actualizarContadorCarrito() {
            const totalProductos = this.productos.reduce((total, producto) => total + producto.cantidad, 0);
            const carritoContador = document.getElementById("carritoContador");

            if (carritoContador) {
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
                this.pintarAside();
                this.mostrarTotal();
            }
        }
        actualizarContadorCarrito() {
            const totalProductos = this.productos.reduce((total, producto) => total + producto.cantidad, 0);
            this.carritoContador.textContent = totalProductos;
        }
    }

    const carrito3 = new Carrito3();
    carrito3.pintarAside();
    carrito3.mostrarTotal();

    if (localStorage.getItem("carrito")) {
        carrito3.productos = JSON.parse(localStorage.getItem("carrito"));
        carrito3.actualizarContadorCarrito();
    }
});