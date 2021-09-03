const API_URL = `http://localhost:3000/api/products/detail/`

//obtengo la ruta de la pagina
const productDetailPath = window.location.pathname.split('/')
//me quedo con el id de producto
const productId = productDetailPath[productDetailPath.length-1]

console.log(productId)
//fetch(`${API_URL}`)