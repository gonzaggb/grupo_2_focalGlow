let products = document.querySelectorAll('.producto')
console.log(products)
if(products.length==1){
    products[0].style.width ='100%'
} 
if (products.length === 2) {
    products.forEach(e => {
        e.style.width = '50%'
    })
}
 if (products.length === 3){
    products.forEach(e=>{
        e.style.width = '30%'
    })
}