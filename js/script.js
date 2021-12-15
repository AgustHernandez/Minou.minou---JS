let inventario = obtenerInventario()
let carritoCompra = new Carrito()
carritoCompra.obtenerDeStorage()


$(() => {
    imprimirProductosIndex(0, 6)

    imprimirProductos(0, 6)
})
$(() => {
    $("#pageAnt").click(() => {
        limpiarProductos()
        imprimirProductos(0, 6)
    })
    $("#page1").click(() => {
        limpiarProductos()
        imprimirProductos(0, 6)
    })
    $("#pageSig").click(() => {
        limpiarProductos()
        imprimirProductos(7, 9)
    })
    $("#page2").click(() => {
        limpiarProductos()
        imprimirProductos(6, 8)
    })
})

    let url = new URL(window.location.href)
    let id = url.searchParams.get("id")
    const URLGET = "https://www.dolarsi.com/api/api.php?type=valoresprincipales"

$(() => {
    producto = inventario.filter(p => p.code == id)[0]
    imprimirProducto(producto)

    $("#btnPesos").click(() => {
        let nombreProducto = $("#tituloProducto")[0].textContent
        let precio = inventario.filter(producto => producto.nombre == nombreProducto)[0].precio
        let cantidad = parseInt($("#cantidad").val())
        let valor = cantidad * precio
        $("#precioProducto").text("$ "+valor)

    })

    $("#btnDolar").click(() => {
        $.get(URLGET, function (respuesta, estado) {
            if(estado === "success"){
                let cotizacion = parseFloat(respuesta[0].casa.venta)
                let nombreProducto = $("#tituloProducto")[0].textContent
                let precio = inventario.filter(producto => producto.nombre == nombreProducto)[0].precio
                let cantidad = parseInt($("#cantidad").val())
                $("#precioProducto").text("U$S "+((precio * cantidad) / cotizacion).toFixed(2))
            }
        })
    })

    $("#cantidad").change(() => {
        let nombreProducto = $("#tituloProducto")[0].textContent
        let precio = inventario.filter(producto => producto.nombre == nombreProducto)[0].precio
        let cantidad = parseInt($("#cantidad").val())
        let valor = cantidad * precio
        $("#precioProducto").text("$ "+valor)
    })

    breadcrumbProd(producto)

    $("#btnAgregarCarrito").click(() => {
        let url = new URL(window.location.href);
        let id = url.searchParams.get("id");
        producto = inventario.filter(p => p.code == id)[0]
        cantidad = parseInt($("#cantidad").val())
        carritoCompra.agregarProductos(producto, cantidad)
        console.log(carritoCompra)
        $("#productoAgregado").show()
    })

    $("#arrowDerecha").click(() => {
        $("#producto1").css("display", "none")
        $("#producto3").css("display", "flex")
     })

    $("#arrowIzquierda").click(() => {
        $("#producto4").css("display", "flex")
        $("#producto2").css("display", "none")
    })
})   

$(() => {
    $("productosCarrito").append(carritoCompra.verProductosCarrito())

    $("#btnCompra").click(() => {
        alert("Tu compra ha sido realizada !")
    })

    $("#vaciarCarrito").click(() => {
        localStorage.removeItem("carrito")
        productosCarrito.parentNode.removeChild(productosCarrito)
        carritoCompra.productos=[]
        badgeCarrito()
    })

    badgeCarrito()
})

/* INDEX */

function imprimirProductosIndex(desde, hasta) {
    inventario.slice(desde, hasta).forEach((producto, indice) => {
        if ($("#articleProductos") != null) {
            $("#articleProductos").append(`
                <article class="col-lg-3 col-md-4 col-sm-4 col-8 cardProducto" id="inventario${indice}">
                    <div class="card text-center bg-transparent">
                        <div>
                            <a href="./vistas/producto.html?id=${producto.code}"><img class="card-img-top cardImgBorder" src="./assets/${producto.nombreImg}.jpg" alt="${producto.nombre}"></a>
                        </div>
                        <div class="card-body cardBorder text-center text-dark pt-5 cardFondo lh-lg">
                            <h4 class="card-title fs-3">${producto.nombre}</h4>
                            <p class="card-text fs-4">$ ${producto.precio}</p>
                        </div>
                    </div>
                </article>
            `)
        }
    })
}

/* SECCIÓN PRODUCTOS */

function limpiarProductos() {
    $("#sectionProductos").text("")
}

function imprimirProductos(desde, hasta) {
    inventario.slice(desde, hasta).forEach((producto, indice) => {
        if ($("#sectionProductos") != null) {
            $("#sectionProductos").append(`
                <article class="col-lg-3 col-md-4 col-sm-4 col-8 cardProducto" id="inventario${indice}">
                    <div class="card text-center bg-transparent">
                        <div>
                            <a href="../vistas/producto.html?id=${producto.code}" id="elegirProducto"><img class="card-img-top cardImgBorder" src="../assets/${producto.nombreImg}.jpg" alt="${producto.nombre}"></a>
                        </div>
                        <div class="card-body cardBorder text-center text-dark pt-5 cardFondo lh-lg">
                            <h4 class="card-title fs-3">${producto.nombre}</h4>
                            <p class="card-text fs-4">$ ${producto.precio}</p>
                        </div>
                    </div>
                </article>
            `)
        }
    })
}


/* SECCIÓN PRODUCTO */

function breadcrumbProd(producto) {
    $("#navProducto").append(`
        <ol class="breadcrumb">
            <li class="breadcrumb-item"><a class="breadcrumb-link" href="productos.html">Productos</a></li>
            <li class="breadcrumb-item active breadcrumb-size" aria-current="page">${producto.nombre}</li>
        </ol>
    `)
}


function imprimirProducto(producto) {
    if ($("#pagProducto") != null) {
        $("#pagProducto").append(`
            <article class="col-lg-4 col-md-6 col-sm-4">
                <div class="position-relative hiddenProduct">
                    <div>
                        <img src="../assets/${producto.nombreImg}.jpg" class="d-block w-100 border-img position-relative imgProducto" alt="${producto.nombre}">
                    </div>
                </div>
                <div class="text-center OverProducto">
                    <div class="textProducto">
                        <h5 class="display-5">${producto.nombre}</h5>
                        <p class="fs-5">Vienen en gris, amarillo, blanco y negro. El diseño es personalizable.</p>
                    </div>
                </div>
            </article>
            <article class="col-lg-4 col-md-6 col-sm-3 mb-5">
                <div>
                    <h4 class="display-4 m-5 text-center" id="tituloProducto">${producto.nombre}</h4>
                    <p class="text-center m-5 fs-3 lh-base">Diseño personalizable</p>
                </div>
                <div class="text-center gy-5">
                    <form action="#" method="#" id="formProducto">
                        <div class="row mb-3 position">
                            <label class="fs-4" for="cantidad">Cantidad:</label>
                            <select class="form-select fs-4 text-center w-sm-100 position casillero" name="cantidad" id="cantidad">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                            </select>
                        </div>
                        <div class="row mb-3 position">
                            <label class="form-label fs-4" for="color">Color:</label>
                            <select class="form-select fs-4 text-center w-sm-100 position casillero" name="color" id="color">
                                <option value="blanco">Blanco</option>
                                <option value="gris">Gris</option>
                                <option value="negro">Negro</option>
                            </select>
                        </div>
                        <div class="d-inline-flex p-3   justify-content-center align-items-center w-100 gx mt-3">
                            <p class="fs-1 wdth text-center lh-base" id="precioProducto">$ ${producto.precio}</p>
                        </div>
                        <div class="d-inline-flex p-3 justify-content-center align-items-center w-100 gx mt-3">
                            <button type="button" class="btn btnProducto btn-lg" id= "btnAgregarCarrito">Agregar al carrito</button>
                            <a href="carritoCompra.html" class="btn btnProducto btn-lg m-3 linkProducto">
                                <button type="button" class="buttonComprar" id="btnComprar">Comprar</button>
                            </a>
                        </div>
                        <div id="productoAgregado">
                            <p class="fs-4 hidden"> Se ha agregado tu producto al carrito </p>
                        </div>
                    </form>
                </div>
                <div class="d-inline-flex p-3 justify-content-center align-items-center w-100 gx-5">
                    <div class="text-center wdth">
                        <div class="mb-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-shop" viewBox="0 0 16 16">
                                <path d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.371 2.371 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976l2.61-3.045zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0zM1.5 8.5A.5.5 0 0 1 2 9v6h1v-5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v5h6V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5zM4 15h3v-5H4v5zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3zm3 0h-2v3h2v-3z"/>
                            </svg>
                        </div>
                        <p class="fs-5">Calculá el costo <br> de tu envio</p>
                    </div>
                    <div class="text-center wdth">
                        <div class="mb-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-truck" viewBox="0 0 16 16">
                                <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5v-7zm1.294 7.456A1.999 1.999 0 0 1 4.732 11h5.536a2.01 2.01 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456zM12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12v4zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
                            </svg>
                        </div>
                        <p class="fs-5">Envíos y <br> devoluciones</p>
                    </div>
                </article>
            </article>
        `)
    }    
}


/* CARRITO */

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
    }
}


/*let tabla = document.getElementById("tabla")
function cargarSubtotales() {
    for(let i = 1, row; row = tabla.rows[i]; i++) {
        let subtotalLinea = tabla.rows[i].cells[2].textContent.replace("$","").trim() * tabla.rows[1].cells[3].textContent.replace("$","").trim()
        
        let ivaLinea = Producto.valorIVA()
        tabla.rows[i].cells[4].textContent = "$ "+ ivaLinea
        tabla.rows[i].cells[5].textContent = "$ " + (subtotalLinea + ivaLinea)
    }
}


/*let continuar = prompt("Quiere agregar un producto? (Y/N)")
// Si no ingresa ni un Y (mayuscula o minuscula) ni una N (mayuscula o minuscula), pide que lo ingreses nuevamente 
while(continuar.toUpperCase() != "Y" && continuar.toUpperCase() != "N") {
    continuar = prompt("Quiere agregar un producto? (Y/N)")
}
while (continuar.toUpperCase() == "Y") 
{
    let compra = prompt("Que producto quiere comprar? (Taza / Cesto / Macetero / Buzo Mascotas / Cama Mascotas)")
    while(compra != productosStock[0].nombre && compra != productosStock[1].nombre && compra != productosStock[2].nombre && compra != productosStock[3].nombre && compra != productosStock[4].nombre) {
        alert("Por favor ingrese un producto válido")
        compra = prompt("Que producto quiere comprar? (Taza / Cesto / Macetero / Buzo Mascotas / Cama Mascotas)")
    }
    let posicionProducto = -1
    if (compra == productosStock[0].nombre) {
         posicionProducto = 0
    }

    if (compra == productosStock[1].nombre) {
         posicionProducto = 1
    }

    if (compra == productosStock[2].nombre) {
         posicionProducto = 2
    }

    if (compra == productosStock[3].nombre) {
         posicionProducto = 3
    }

    if (compra == productosStock[4].nombre) {
         posicionProducto = 4
    }

    if (productosStock[posicionProducto].stock > 0) {
        let cantidad = parseInt(prompt(`Cuantas unidades quiere comprar? (Max ${productosStock[posicionProducto].stock} unidades)`))

        while (cantidad > productosStock[posicionProducto].stock) {
            cantidad = parseInt(prompt(`No hay suficiente stock. Cuantas unidades quiere comprar? (Max ${productosStock[posicionProducto].stock} unidades)`))
            }
            carritoCompra.agregarProductos(productosStock[posicionProducto], cantidad)
    }
    
    else {
        alert("Producto sin stock")
    }
    continuar = prompt("Quiere agregar otro producto? (Y/N)")
    /* Si no ingresa ni un Y (mayuscula o minuscula) ni una N (mayuscula o minuscula), pide que lo ingreses nuevamente*/

    /*while(continuar.toUpperCase() != "Y" && continuar.toUpperCase() != "N") {
        continuar = prompt("Quiere agregar otro producto? (Y/N)")
    }
}*/

/*function cargarProducto(producto, cantidad) {
    let producto = prompt("Que producto quiere comprar?")

}*/

/*function imprimirProductos(desde, hasta) {
    inventario.slice(desde, hasta).forEach((producto, indice) => {
        articleProductos.innerHTML += `
        <article class="col-lg-3 col-md-4 col-sm-4 col-8 cardProducto" id="inventario${indice}">
            <div class="card text-center bg-transparent">
                <div>
                    <a href="../vistas/${producto.nombreHTML}.html"><img class="card-img-top cardImgBorder" src="../assets/${producto.nombreImg}.jpg" alt="${producto.nombre}"></a>
                </div>
                <div class="card-body cardBorder text-center text-dark pt-5 cardFondo lh-lg">
                    <h4 class="card-title fs-3">${producto.nombre}</h4>
                    <p class="card-text fs-4">$ ${producto.precio}</p>
                </div>
            </div>
        </article>
        `
    })
}

imprimirProductos(0, 6)*/


/*function cargarProdCarrito() {
    inventario.forEach((producto, indice) => {
        articleProductos.innerHTML += `
        <article class="col-lg-3 col-md-4 col-sm-4 col-8 cardProducto" id="inventario${indice}">
            <div class="card text-center bg-transparent">
                <div>
                    <a href="../vistas/${producto.nombreHTML}.html"><img class="card-img-top cardImgBorder" src="../assets/${producto.nombreImg}.jpg" alt="${producto.nombre}"></a>
                </div>
                <div class="card-body cardBorder text-center text-dark pt-5 cardFondo lh-lg">
                    <h4 class="card-title fs-3">${producto.nombre}</h4>
                    <p class="card-text fs-4">$ ${producto.precio}</p>
                </div>
            </div>
        </article>
        `
    })
}

/*let tabla = document.getElementById("tabla")
function cargarSubtotales() {
    for(let i = 1, row; row = tabla.rows[i]; i++) {
        let subtotalLinea = tabla.rows[i].cells[2].textContent.replace("$","").trim() * tabla.rows[1].cells[3].textContent.replace("$","").trim()
        
        let ivaLinea = Producto.valorIVA()
        tabla.rows[i].cells[4].textContent = "$ "+ ivaLinea
        tabla.rows[i].cells[5].textContent = "$ " + (subtotalLinea + ivaLinea)
    }
}


/*let continuar = prompt("Quiere agregar un producto? (Y/N)")
// Si no ingresa ni un Y (mayuscula o minuscula) ni una N (mayuscula o minuscula), pide que lo ingreses nuevamente 
while(continuar.toUpperCase() != "Y" && continuar.toUpperCase() != "N") {
    continuar = prompt("Quiere agregar un producto? (Y/N)")
}
while (continuar.toUpperCase() == "Y") 
{
    let compra = prompt("Que producto quiere comprar? (Taza / Cesto / Macetero / Buzo Mascotas / Cama Mascotas)")
    while(compra != productosStock[0].nombre && compra != productosStock[1].nombre && compra != productosStock[2].nombre && compra != productosStock[3].nombre && compra != productosStock[4].nombre) {
        alert("Por favor ingrese un producto válido")
        compra = prompt("Que producto quiere comprar? (Taza / Cesto / Macetero / Buzo Mascotas / Cama Mascotas)")
    }
    let posicionProducto = -1
    if (compra == productosStock[0].nombre) {
         posicionProducto = 0
    }

    if (compra == productosStock[1].nombre) {
         posicionProducto = 1
    }

    if (compra == productosStock[2].nombre) {
         posicionProducto = 2
    }

    if (compra == productosStock[3].nombre) {
         posicionProducto = 3
    }

    if (compra == productosStock[4].nombre) {
         posicionProducto = 4
    }

    if (productosStock[posicionProducto].stock > 0) {
        let cantidad = parseInt(prompt(`Cuantas unidades quiere comprar? (Max ${productosStock[posicionProducto].stock} unidades)`))

        while (cantidad > productosStock[posicionProducto].stock) {
            cantidad = parseInt(prompt(`No hay suficiente stock. Cuantas unidades quiere comprar? (Max ${productosStock[posicionProducto].stock} unidades)`))
            }
            carritoCompra.agregarProductos(productosStock[posicionProducto], cantidad)
    }
    
    else {
        alert("Producto sin stock")
    }
    continuar = prompt("Quiere agregar otro producto? (Y/N)")
    /* Si no ingresa ni un Y (mayuscula o minuscula) ni una N (mayuscula o minuscula), pide que lo ingreses nuevamente*/

    /*while(continuar.toUpperCase() != "Y" && continuar.toUpperCase() != "N") {
        continuar = prompt("Quiere agregar otro producto? (Y/N)")
    }
}*/

/*function cargarProducto(producto, cantidad) {
    let producto = prompt("Que producto quiere comprar?")

}*/
















/*
let continuar = prompt("Quiere agregar un producto? (Y/N)")
// Si no ingresa ni un Y (mayuscula o minuscula) ni una N (mayuscula o minuscula), pide que lo ingreses nuevamente 
while(continuar.toUpperCase() != "Y" && continuar.toUpperCase() != "N") {
    continuar = prompt("Quiere agregar un producto? (Y/N)")
}

while (continuar.toUpperCase() == "Y") 
{
    let compra = prompt("Que producto quiere comprar? (Taza / Cesto / Macetero / Buzo Mascotas / Cama Mascotas)")
    while(compra != productosStock[0].nombre && compra != productosStock[1].nombre && compra != productosStock[2].nombre && compra != productosStock[3].nombre && compra != productosStock[4].nombre) {
        alert("Por favor ingrese un producto válido")
        compra = prompt("Que producto quiere comprar? (Taza / Cesto / Macetero / Buzo Mascotas / Cama Mascotas)")
    }
    let posicionProducto = -1
    if (compra == productosStock[0].nombre) {
         posicionProducto = 0
    }

    if (compra == productosStock[1].nombre) {
         posicionProducto = 1
    }

    if (compra == productosStock[2].nombre) {
         posicionProducto = 2
    }

    if (compra == productosStock[3].nombre) {
         posicionProducto = 3
    }

    if (compra == productosStock[4].nombre) {
         posicionProducto = 4
    }

    if (productosStock[posicionProducto].stock > 0) {
        let cantidad = parseInt(prompt(`Cuantas unidades quiere comprar? (Max ${productosStock[posicionProducto].stock} unidades)`))

        while (cantidad > productosStock[posicionProducto].stock) {
            cantidad = parseInt(prompt(`No hay suficiente stock. Cuantas unidades quiere comprar? (Max ${productosStock[posicionProducto].stock} unidades)`))
            }
            carritoCompra.agregarProductos(productosStock[posicionProducto], cantidad)
    }
    
    else {
        alert("Producto sin stock")
    }
    continuar = prompt("Quiere agregar otro producto? (Y/N)")
    /* Si no ingresa ni un Y (mayuscula o minuscula) ni una N (mayuscula o minuscula), pide que lo ingreses nuevamente*/
    /*
    while(continuar.toUpperCase() != "Y" && continuar.toUpperCase() != "N") {
        continuar = prompt("Quiere agregar otro producto? (Y/N)")
    }
}

alert(`El total de su compra, sin envio, es ${carritoCompra.obtenerTotal()}. Para continuar con el cobro, le vamos a preguntar donde enviarlo y en que tiempo. Por favor, presione "Aceptar".`)

let provincia = prompt("Provincia a enviar [CABA / Gran Buenos Aires]:")
while(provincia != "CABA" && provincia != "Gran Buenos Aires") {
    alert("Por favor ingrese una provincia válida")
    provincia = prompt("Provincia a enviar:")
}

let tiempoEntrega = parseInt(prompt("Tiempo de entrega [24 / 72 hs]:"))
while(tiempoEntrega != 24 && tiempoEntrega != 72) {
    alert("Por favor ingrese un tiempo de entrega válido")
    tiempoEntrega = parseInt(prompt("Tiempo de entrega [24 / 72 hs]:"))
}

let costoDeEnvio = costoEnvio(carritoCompra.obtenerTotal(), provincia, tiempoEntrega)

alert(`Su compra será enviada a ${provincia}, en ${tiempoEntrega} hs. Esto representa un costo de envío de $${costoDeEnvio}. En total deberá abonar $${carritoCompra.obtenerTotal() + costoDeEnvio}`)*/
