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
            <div class="card mb-3" style="max-width: 540px;">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="../assets/${prod.img}" class="img-fluid rounded-start" alt="${prod.nombre}">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">${prod.nombre}</h5>
                                <p class="card-text">$ ${prod.precio}</p>
                                <p class="card-text">Cantidad: ${prod.cant}</p>
                            </div>
                        </div>
                    </div>
                    <div class="trashCarrito">
                        <i class="far fa-trash-alt fa-3x"></i>
                    </div>
                </div>
        `
        }
        return productosCarrito
    }

    obtenerDeStorage() {
        let index = 0;
        let obj = JSON.parse(localStorage.getItem("carrito"))
        if(obj != null) {
            while(index < obj.length) {
                this.productos.push(new Producto(obj[index].code,obj[index].nombre,obj[index].precio,obj[index].stock,obj[index].img,obj[index].nombreHTML));
                
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