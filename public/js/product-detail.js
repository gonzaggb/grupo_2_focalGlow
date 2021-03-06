
const API_URL = `http://localhost:3000/api/products/`
//obtengo la ruta de la pagina
const productDetailPath = window.location.pathname.split('/')
//me quedo con el id de producto
const productId = productDetailPath[productDetailPath.length - 1]


//captura features
const powerSelect = document.querySelector('#power-select')
const opticSelect = document.querySelector('#optic-select')
const cctSelect = document.querySelector('#cct-select')
const dimSelect = document.querySelector('#dim-select')

const selects = [powerSelect, opticSelect, cctSelect, dimSelect]

const power = document.querySelectorAll('#power')
const optic = document.querySelectorAll('#optic')
const cct = document.querySelectorAll('#cct')
const dim = document.querySelectorAll('#dim')


const features = [power, optic, cct, dim]

//captura precio web
const pagePrice = document.querySelector('#product-price')


//captura la feature del option
function getFeatures(options) {
    let selectedId = 0
    options.forEach(element => {
        element.selected === true ? selectedId = Number(element.value) : ''
    })
    return selectedId
}

//funcion para hacer fetch, al momento de usarla es necesario hacer un .then ya que es una promesa su respuesta
async function getProducts(apiUrl) {
    const response = await fetch(apiUrl)
    const product = await response.json()
    return product

}
//FIXME quize hacerla con un map pero no me funcionó
function getFeaturePrice(features, featureId) {
    let price = 0
    features.forEach(element => {
        if (element.id === featureId) {
            price = element.price
        }
    })
    return price
}

function toThousand(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

function calculateFullPrice(originalPrice, [...featurePrice]) {
    //se debe pasar un array con el precio de las features
    originalPrice += featurePrice.reduce((acum, element) => acum + element)
    return originalPrice
}


//Obtengo de la DB las features y sus respectivos precios
getProducts(`${API_URL}${productId}`).then(product => {
    //simplifico la respuesta de la api para quedarme con las features
    const productFeatures = product.data.features
    //saco el precio base original del producto
    const productPrice = Number(product.data.price)

    //obtengo las features seleccionada
    const selectedFeatures = []
    features.forEach(feature => {
        selectedFeatures.push(getFeatures(feature))
    })

    //obtengo el precio de la features seleccionadas
    const pricesSelectedFeatures = []
    selectedFeatures.forEach(selectedFeature => {
        pricesSelectedFeatures.push(Number(getFeaturePrice(productFeatures, selectedFeature)))
    })

    //calculo el precio completo del producto (original + features seleccionadas)
    const fullPrice = toThousand(calculateFullPrice(productPrice, pricesSelectedFeatures))
    //escribo el precio en la pagina
    pagePrice.innerText = `$ ${fullPrice}`


    //para cada select se hace un eventListener para ver si hay cambios y se re calcula el precio

    selects.forEach(select => {
        select.addEventListener('change', event => {
            const selectedFeatures = []
            features.forEach(feature => {
                selectedFeatures.push(getFeatures(feature))
            })

            const pricesSelectedFeatures = []
            selectedFeatures.forEach(selectedFeature => {
                pricesSelectedFeatures.push(Number(getFeaturePrice(productFeatures, selectedFeature)))
            })

            const fullPrice = toThousand(calculateFullPrice(productPrice, pricesSelectedFeatures))
            pagePrice.innerText = `$ ${fullPrice}`
        })
    })

})