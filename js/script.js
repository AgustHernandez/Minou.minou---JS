//let inventario = obtenerInventario()
let carritoCompra = new Carrito()
carritoCompra.obtenerDeStorage()


//localStorage.setItem('carrito', JSON.stringify([]))
let articleProductos = document.getElementById('articleProductos')
let sectionProductos = document.getElementById('sectionProductos')
/*let pageAnt = document.getElementsById('pageAnt')
let page1 = document.getElementsById('page1')
let page2 = document.getElementsById('page2')
let pageAnt = document.getElementsById('pageSig')*/
let url = new URL(window.location.href)
let id = url.searchParams.get("id")
const URLGET = "https://www.dolarsi.com/api/api.php?type=valoresprincipales"
let pagProducto = document.getElementById('pagProducto')
let botonCarrito = document.getElementById('botonCarrito')
let modalBody = document.getElementById('modal-body')
let botonFinalizarCompra = document.getElementById('botonFinalizarCompra')
let precioTotal = document.getElementById('precioTotal')
let acumulador;
//const URLGET = "https://www.dolarsi.com/api/api.php?type=valoresprincipales"


fetch('../data/productos.json')
.then(response => response.json())
.then(dataProductos => {
   dataProductos.slice(0, 6).forEach((producto, indice)=> {
        if (articleProductos != null) {
            articleProductos.innerHTML +=`
                <article class="col-lg-3 col-md-4 col-sm-4 col-8 cardProducto" id="producto${indice}">
                    <div class="card text-center bg-transparent">
                        <div>
                            <a href="./vistas/producto.html?id=${producto.code}"><img class="card-img-top cardImgBorder" src="./assets/${producto.img}" alt="${producto.nombre}"></a>
                        </div>
                        <div class="card-body cardBorder text-center text-dark pt-5 cardFondo lh-lg">
                            <h4 class="card-title fs-3">${producto.nombre}</h4>
                            <p class="card-text fs-4">$ ${producto.precio}</p>
                        </div>
                    </div>
                </article>
            `}
    });

    dataProductos.forEach((producto, indice)=> {
        if (sectionProductos != null) {
            sectionProductos.innerHTML +=`
                <article class="col-lg-3 col-md-4 col-sm-4 col-8 cardProducto" id="producto${indice}">
                    <div class="card text-center bg-transparent">
                        <div>
                            <a href="../vistas/producto.html?id=${producto.code}"><img class="card-img-top cardImgBorder" src="../assets/${producto.img}" alt="${producto.nombre}"></a>
                        </div>
                        <div class="card-body cardBorder text-center text-dark pt-5 cardFondo lh-lg">
                            <h4 class="card-title fs-3">${producto.nombre}</h4>
                            <p class="card-text fs-4">$ ${producto.precio}</p>
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
            if(productos.find(product => product.nombre == producto.nombre)) {
                let index = productos.findIndex(product => product.nombre == producto.nombre)
                productos[index].cant++
                localStorage.setItem('carrito', JSON.stringify(productos))
            } else {
                let nuevoProducto = new Producto(producto.code, producto.nombre, producto.precio, producto.stock, producto.img, producto.nombreHTML)
                productos.push(nuevoProducto)
                localStorage.setItem('carrito', JSON.stringify(productos))
            }
        })
    }
})




/* CARRITO 

function badgeCarrito () {
    let cantProdCarrito = carritoCompra.productos.length
    $('#cantCarrito').text("")
    if (cantProdCarrito == 0) {
        $('#cantCarrito').append(`
        <a class="nav-link active" aria-current="page" href="carritoCompra.html">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-bag" viewBox="0 0 16 16">
                <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/>
            </svg>
        </a>
        `)
    }
    if (cantProdCarrito != 0) {
        $('#cantCarrito').append(`
            <span class="position-absolute top-0 start-50 badge bg-light text-dark">${cantProdCarrito}</span>
            <a class="nav-link active" aria-current="page" href="carritoCompra.html">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-bag" viewBox="0 0 16 16">
                    <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/>
                </svg>
            </a>
        `)
    }*/
