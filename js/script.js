//const { addListener } = require("nodemon")

let carritoCompra = new Carrito()
carritoCompra.obtenerDeStorage()
selectMoneda()
guardarCotizacionDolar()

let articleProductos = document.getElementById('articleProductos')
let sectionProductos = document.getElementById('sectionProductos')
let url = new URL(window.location.href)
let id = url.searchParams.get("id")
let pagProducto = document.getElementById('pagProducto')
let botonCarrito = document.getElementById('botonCarrito')
let modalBody = document.getElementById('modal-body')
let botonFinalizarCompra = document.getElementById('botonFinalizarCompra')
let precioTotal = document.getElementById('precioTotal')
let acumulador;


fetch('../data/productos.json')
.then(response => response.json())
.then(dataProductos => {
   dataProductos.slice(0, 6).forEach((producto, indice)=> {
        if (articleProductos != null) {
            let prod = new Producto(producto.code, producto.nombre, producto.precio, producto.stock, producto.img, producto. nombreHTML)
            articleProductos.innerHTML +=`
                <article class="col-lg-3 col-md-4 col-sm-4 col-8 cardProducto" id="producto${indice}">
                    <div class="card text-center bg-transparent">
                        <div>
                            <a href="./vistas/producto.html?id=${prod.code}"><img class="card-img-top cardImgBorder" src="./assets/${prod.img}" alt="${prod.nombre}"></a>
                        </div>
                        <div class="card-body cardBorder text-center text-dark pt-5 cardFondo lh-lg">
                            <h4 class="card-title fs-3">${prod.nombre}</h4>
                            <p class="card-text fs-4">${prod.simbolo} ${prod.valor}</p>
                        </div>
                    </div>
                </article>
            `}
    });

    dataProductos.forEach((producto, indice)=> {
        if (sectionProductos != null) {
            let prod = new Producto(producto.code, producto.nombre, producto.precio, producto.stock, producto.img, producto. nombreHTML)
            sectionProductos.innerHTML +=`
                <article class="col-lg-3 col-md-4 col-sm-4 col-8 cardProducto" id="producto${indice}">
                    <div class="card text-center bg-transparent">
                        <div>
                            <a href="../vistas/producto.html?id=${prod.code}"><img class="card-img-top cardImgBorder" src="../assets/${prod.img}" alt="${prod.nombre}"></a>
                        </div>
                        <div class="card-body cardBorder text-center text-dark pt-5 cardFondo lh-lg">
                            <h4 class="card-title fs-3">${prod.nombre}</h4>
                            <p class="card-text fs-4">${prod.simbolo} ${prod.valor}</p>
                        </div>
                    </div>
                </article>
            `}
    });

    if(window.location.href.includes("producto.html"))
    {
        let url = new URL(window.location.href)
        let id = url.searchParams.get("id")
        producto = dataProductos.filter(p => p.code == id)[0]
        imprimirProducto(producto)
        document.getElementById(`boton${producto.code}`).addEventListener('click', () => {
            let lSCarrito = JSON.parse(localStorage.getItem('carrito'))
            if(lSCarrito == undefined)
            {
                lSCarrito = []
            }
            productos = lSCarrito;
            let cantSeleccionada = parseInt(document.getElementById("cantidad").value)
            if(productos.find(product => product.nombre == producto.nombre)) {
                let index = productos.findIndex(product => product.nombre == producto.nombre)
                productos[index].cant = Math.min(productos[index].stock,productos[index].cant + cantSeleccionada)
                localStorage.setItem('carrito', JSON.stringify(productos))
            } else {
                let nuevoProducto = new Producto(producto.code, producto.nombre, producto.precio, producto.stock, producto.img, producto.nombreHTML)
                nuevoProducto.cant = cantSeleccionada
                productos.push(nuevoProducto)
                localStorage.setItem('carrito', JSON.stringify(productos))
            }
            badgeCarrito ()
        })
    }
})

if(window.location.href.includes("carritoCompra.html"))
{
    actualizarPagina()
    eventosFinalizarCompra()
}

function selectMoneda() {
    if ((localStorage.getItem("monedaUsuario")) == "U$S") {
        document.getElementById("btnDolar").setAttribute("checked","")
        document.getElementById("btnPesos").removeAttribute("checked")
    }else{
        document.getElementById("btnPesos").setAttribute("checked","")
        document.getElementById("btnDolar").removeAttribute("checked")
    }
}

