function imprimirProducto(producto) {
    if (pagProducto != null) {
        pagProducto.innerHTML +=`
            <article class="col-lg-4 col-md-6 col-sm-4" id="producto${producto.code}">
                <div class="position-relative hiddenProduct">
                    <div>
                        <img src="../assets/${producto.img}" class="d-block w-100 border-img position-relative imgProducto" alt="${producto.nombre}">
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
                            <button type="button" class="btn btnProducto btn-lg" id= "boton${producto.code}">Agregar al carrito.</button>
                        </div>
                    </form>
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
    `
    document.getElementById("cantidad").addEventListener('change', () => {
        let nombreProducto = producto.nombre
        let precio = producto.precio
        let cantidad = parseInt(document.getElementById("cantidad").value)
        let valor = cantidad * precio
        document.getElementById("precioProducto").innerText ="$ " + valor
    })

    document.getElementById("btnPesos").addEventListener('click', () => {
        let nombreProducto = producto.nombre
        let precio = producto.precio
        let cantidad = parseInt(document.getElementById("cantidad").value)
        let valor = cantidad * precio
        document.getElementById("precioProducto").innerText ="$ " + valor
    
    })    
    
    document.getElementById("btnDolar").addEventListener('click', () => {
        fetch(URLGET)
        .then((resp) => resp.json())
        .then(function(data) {
            let cotizacion = parseFloat(data[0].casa.venta)
            let nombreProducto = producto.nombre
            let precio = producto.precio
            let cantidad = parseInt(document.getElementById("cantidad").value)
            document.getElementById("precioProducto").innerText ="U$S "+((precio * cantidad) / cotizacion).toFixed(2)
        })
        
        $.get(URLGET, function (respuesta, estado) {
            if(estado === "success"){
                let cotizacion = parseFloat(respuesta[0].casa.venta)
                let nombreProducto = producto.nombre
                let precio = producto.precio
                let cantidad = parseInt(document.getElementById("cantidad").value)
                document.getElementById("precioProducto").innerText ="U$S "+((precio * cantidad) / cotizacion).toFixed(2)
            }
        })
    })
}}

botonCarrito.addEventListener('click', () => {
    let productosDelStorage = JSON.parse(localStorage.getItem('carrito'))

    productosModal(productosDelStorage)
    
})

function compraTotal(productosStorage) {
    acumulador = 0;
    productosStorage.forEach((productoCarrito) => {
        acumulador += productoCarrito.precio * productoCarrito.cant
    })

    if(acumulador == 0) {
        precioTotal.innerHTML = ""
        modalBody.innerHTML = `<p class="fs-4">No hay productos agregados en el carrito </p>`
    } else {
        precioTotal.innerHTML = `<p class="fs-4">Importe total $${new Intl.NumberFormat("de-DE").format(acumulador)}</p>`
    }
   
}

function eventosModal(productosStorage) {

    productosStorage.forEach((productoCarrito, indice) => {
        document.getElementById(`botonEliminar${indice}`).addEventListener('click', () => {
            document.getElementById(`productoCarrito${indice}`).remove()
            productos.splice(indice, 1)
            localStorage.setItem('carrito', JSON.stringify(productos))
            productosModal(JSON.parse(localStorage.getItem('carrito')))
        })
    })

    productosStorage.forEach((productoCarrito, indice) => {
        document.getElementById(`sum${indice}`).addEventListener('click', () => {
            if(productoCarrito.cant < productoCarrito.stock) {
                productoCarrito.cant++
                localStorage.setItem('carrito', JSON.stringify(productosStorage))
                productosModal(JSON.parse(localStorage.getItem('carrito')))
                
            }
        })
    })

    productosStorage.forEach((productoCarrito, indice) => {
        document.getElementById(`rest${indice}`).addEventListener('click', () => {
            if(productoCarrito.cant > 1) {
                productoCarrito.cant--
                localStorage.setItem('carrito', JSON.stringify(productosStorage))
                productosModal(JSON.parse(localStorage.getItem('carrito')))
            }
        })
    })
    
}

function productosModal(productosStorage) {
    modalBody.innerHTML = ""  
    productosStorage.forEach((productoCarrito,indice) => {
        modalBody.innerHTML += `
        <div class="card mb-3" id ="productoCarrito${indice}">
        <div class="row g-0">
            <div class="col-md-4">
                <img src="../assets/${productoCarrito.img}" class="img-fluid rounded-start" alt="${productoCarrito.nombre}">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title fs-4">${productoCarrito.nombre}</h5>
                    <p class="card-text fs-4">$ ${productoCarrito.precio}</p>
                    <p class="card-text fs-4">Cantidad: ${productoCarrito.cant}</p>
                </div>
                <div class="row">
                    <div>
                        <button class= "btn btn-outline-secondary" id="sum${indice}"><i class="fas fa-plus"></i></button>
                        <button class= "btn btn-outline-secondary" id="rest${indice}"><i class="fas fa-minus"></i></button> 
                    </div>
                    <button class= "btn btn-danger trashCarrito" id="botonEliminar${indice}"><i class="fas fa-trash-alt"></i></button>
                </div>
            </div>
        </div>
    </div>
        `
})
}

eventosModal(productosStorage)
compraTotal(productosStorage)