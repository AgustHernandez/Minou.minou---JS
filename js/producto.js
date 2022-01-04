const MAX_SUGERENCIAS = 2
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

    get valor()
    {
        return (this.precio / obtenerCotizacion()).toFixed(2)
    }

    get simbolo()
    {
        return obtenerSimbolo()   
    }

    get HTMLCantidad(){
     let result = ""
     let index = 1;
     while(index <= this.stock)
     {
         result += "<option value="+index+">"+index+"</option>"
         index++;
     }
     return result
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
}

let productos = []

