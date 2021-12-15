function obtenerInventario() {
    let inventario = []
    inventario.push(new Producto("0000001","Taza de Ceramica", 900, 5, "taza", "producto1"))
    inventario.push(new Producto("0000002","Macetero Vertical", 1500, 4, "macetero", "producto2"))
    inventario.push(new Producto("0000003","Cesto para Guardado", 1200, 2, "cestoJuguetes", "producto3"))
    inventario.push(new Producto("0000004","Buzo para mascotas", 1000, 8, "buzoMascota", "producto4"))
    inventario.push(new Producto("0000005","Cama para mascotas", 1900, 3, "camaMascotas", "producto5"))
    inventario.push(new Producto("0000006","Camino para cama", 900, 5, "caminoCama", "producto6"))
    inventario.push(new Producto("0000007","Carameleros", 900, 10, "carameleros", "producto7"))
    inventario.push(new Producto("0000008","Maceta de Ceramica", 1200, 6, "maceta", "producto8"))
    inventario.push(new Producto("0000009","Maceta Autoriego", 700, 9, "macetaAutoriego", "producto9"))

    return inventario
}