class Producto {
    constructor (code,nombre, precio, stock, nombreImg, nombreHTML) {
        this.code = code;
        this.nombre = nombre;
        this.precio = parseInt(precio);
        this.stock = stock;
        this.IVA = 0.21;
        this.img = nombreImg;
        this.nombreHTML = nombreHTML;
        this.cant = 1
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

let productos = []