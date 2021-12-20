function obtenerInventario() {
    let inventario = []
    fetch('../data/productos.json')
    .then(response => response.json())
    .then(dataProductos => {
        dataProductos.forEach((producto, indice)=> {
             inventario.push(producto)
         });
    })
    return inventario
}