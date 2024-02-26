document.addEventListener("DOMContentLoaded", function () {

    class Carrito5 {
        constructor() {
            this.productos = JSON.parse(localStorage.getItem("carrito")) || [];
            this.carritoContador = document.getElementById("carritoContador");
        }

        actualizarContadorCarrito() {
            const totalProductos = this.productos.reduce((total, producto) => total + producto.cantidad, 0);
            this.carritoContador.textContent = totalProductos;
        }

        guardarCarritoEnLocalStorage() {
            localStorage.setItem("carrito", JSON.stringify(this.productos));
        }
    }

    const carrito5 = new Carrito5();

    if (localStorage.getItem("carrito")) {
        carrito5.productos = JSON.parse(localStorage.getItem("carrito"));
        carrito5.actualizarContadorCarrito();
    }

    //Banner
    
    const bannerSlider = document.querySelector(".banner__slider")

    let index = 1
    let images = bannerSlider.querySelectorAll("img")

    setInterval(function () {
        let porcentaje = index * -100
        bannerSlider.style.transform = "translateX(" + porcentaje + "%)"
        index++
        if (index > (images.length - 1)) {
            index = 0
        }

    }, 5000)
});