class Producto {
    constructor (code,nombre, precio, stock, nombreImg, nombreHTML) {
        this.code = code;
        this.nombre = nombre;
        this.precio = parseInt(precio);
        this.stock = stock;
        this.IVA = 0.21;
        this.nombreImg = nombreImg
        this.nombreHTML = nombreHTML
    }

    valorIVA(){
        return this.precio * this.IVA;
    }

    mostrarConIva()
    {
        return this.precio + this.valorIVA();
    }

    //Actualiza el stock en base a lo vendido
    actualizarStock(cantVendida) {
        this.stock += cantVendida
    }
}

class Carrito {
    constructor () {
        this.productos = []
         
    }

    vaciarCarrito() {
        this.productos = []
    }

    agregarProductos(producto, unidades) {
        let unidadesDisponibles = Math.min(unidades, producto.stock)
        producto.actualizarStock(-unidadesDisponibles)
        for (let i = 1; i <= unidadesDisponibles; i++) {
            this.productos.push(producto)
        }
        localStorage.setItem("carrito",JSON.stringify(this.productos))
    }

    verProductosCarrito() {
        let productosCarrito = ""
        for (let prod of this.productos) {
            productosCarrito += `
                <article class="col-lg-2 col-md-4 col-sm-4 col-8 cardsProductos">
                    <div class="card text-center bg-transparent cardCarrito">
                        <div class="card">
                            <a href="../vistas/producto.html?id=${prod.code}" id="elegirProducto"><img class="card-img-top cardImgBorder" src="../assets/${prod.nombreImg}.jpg" alt="${prod.nombre}"></a>
                        </div>
                        <div class="card-body cardBorder text-center text-dark pt-5 cardFondo lh-lg">
                            <h4 class="card-title fs-3">${prod.nombre}</h4>
                            <p class="card-text fs-4">$ ${prod.precio}</p>
                        </div>
                    </div>
                </article>
            `
        }
        return productosCarrito
    }

    obtenerDeStorage() {
        let index = 0;
        let obj = JSON.parse(localStorage.getItem("carrito"))
        if(obj != null) {
            while(index < obj.length) {
                this.productos.push(new Producto(obj[index].code,obj[index].nombre,obj[index].precio,obj[index].stock,obj[index].nombreImg,obj[index].nombreHTML));
                
                index++
            }
        }
    }

    obtenerTotal() {
        let total = 0
        for (let i = 0; i < this.productos.length; i++) {
            total += this.productos[i].mostrarConIva()
        }
        return total
    }
}


// Funciones costo envío

function costoEnvio (costoProducto, provincia, tiempoEntrega) {
    return costoSubtotal(costoProducto) + costoDistancia(provincia) + costoTiempoEntrega(tiempoEntrega, provincia)
}

function costoDistancia (provincia) {
    if (provincia === "CABA") {
        return 0
    }
    else {
        return 200
    }
}

function costoTiempoEntrega(tiempoEntrega, provincia) {
    if (provincia === "CABA") {
        return 0
    }
    if (tiempoEntrega === 24) {
        return 500
    }
    else {
        return 200
    }
}

function costoSubtotal(costoProducto) {
    if (costoProducto < 1000) {
        return 300
    }
    if (costoProducto >= 1000 && costoProducto < 5000) {
        return 200
    }
    if (costoProducto >= 5000) {
        return 0
    }
}