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
    let keyCotizacion = localStorage.getItem("COTIZACION_USD")
    if (keyCotizacion == null) {
        return 1;
    }
    return parseFloat(JSON.parse(keyCotizacion).valor)
}

function guardarCotizacionDolar(){
    let keyCotizacion = localStorage.getItem("COTIZACION_USD")
    let cotizacion = new cotizacionDolar(Date.now(), 1)
    if (keyCotizacion == null) {
        consultarAPIDolar();
        return;
    } else {
        let cotizActual = JSON.parse(keyCotizacion)
        let fechaBusqueda = (cotizActual.ultimaActualizacion)
        let fechaActual = cotizacion.ultimaActualizacion
        if (((fechaActual - fechaBusqueda) / (1000*60*60*24)) < 1) {
            localStorage.setItem("COTIZACION_USD", JSON.stringify(cotizActual))
            return;
        } else {
            consultarAPIDolar();
            return;
        }
    }
}

function consultarAPIDolar(){
     fetch(URLGET)
    .then(promesa => promesa.json())
    .then(datos => {
        let cotizDolar = new cotizacionDolar(Date.now(),parseFloat(datos[0].casa.venta).toFixed(2))
        localStorage.setItem("COTIZACION_USD",JSON.stringify(cotizDolar))
    })
    .catch(error => console.log(error))
}