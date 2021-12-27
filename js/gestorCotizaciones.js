const URLGET = "https://www.dolarsi.com/api/api.php?type=valoresprincipales"
consultarAPIDolar();

class cotizacion {
    constructor (ultimaActualizacion, valor) {
        this.ultimaActualizacion = ultimaActualizacion
        this.valor = valor
    }
}

class cotizacionDolar extends cotizacion {
    constructor (ultimaActualizacion, cotizacion) {
        super(ultimaActualizacion, cotizacion)
        this.codigo = "U$S"
    }
}

function obtenerCotizacion() {
    if ((localStorage.getItem("monedaUsuario")) == "U$S") {
        return  obtenerCotizacionDolar()
    } else {
        return 1
    }
}

function obtenerCotizacionDolar() {
    let keyCotizacion = localStorage.getItem("cotiz")
    let aux = 1
    let cotizacion = new cotizacionDolar(Date.now(), 1)
    if (keyCotizacion == null) {
            consultarAPIDolar();
    setTimeout(() => {  
        cotizacion = JSON.parse(localStorage.getItem("cotiz")); }, 5000);
            
    } else {
        let cotizActual = JSON.parse(keyCotizacion)
        let fechaBusqueda = (cotizActual.ultimaActualizacion)
        let fechaActual = cotizacion.ultimaActualizacion
        if (((fechaActual - fechaBusqueda) / (1000*60*60*24)) < 1) {
            cotizacion.ultimaActualizacion = cotizActual.ultimaActualizacion
            cotizacion.valor = cotizActual.valor    
        } else {
            setTimeout(consultarAPIDolar(),3000);
            cotizacion = Json.parse(localStorage.getItem("cotiz"));
        }
    }
    localStorage.setItem("cotiz", JSON.stringify(cotizacion))
    return parseFloat(cotizacion.valor)
}

async function consultarAPIDolar(){
     fetch(URLGET)
    .then(promesa => promesa.json())
    .then(datos => {
        let cotizDolar = new cotizacionDolar(Date.now(),parseFloat(datos[0].casa.venta).toFixed(2))
        localStorage.setItem("cotiz",JSON.stringify(cotizDolar))
    })
    .catch(error => console.log(error))
}