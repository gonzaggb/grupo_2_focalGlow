
const API_URL = `http://localhost:3000/api/products/detail/`
//obtengo la ruta de la pagina
const productDetailPath = window.location.pathname.split('/')
//me quedo con el id de producto
const productId = productDetailPath[productDetailPath.length - 1]


//captura features
const powerSelect = document.querySelector('#power-select')
const power = document.querySelectorAll('#power')




const optic = document.querySelectorAll('#optic')
const cct = document.querySelectorAll('#cct')
const dim = document.querySelectorAll('#dim')


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




//Obtengo de la DB las features y sus respectivos precios
getProducts(`${API_URL}${productId}`).then(product => {
    powerSelect.addEventListener('change', event => {

        console.log(product)
        product.data.features.forEach(feature => {
            feature.id == getFeatures(power) ? price.innerHTML = Number(price.innerText.replace('$', '').replace('.', '')) + Number(feature.price) : ''
        })

    })
})



/* let originalPrice = price.innerText.replace('$', '')
 */