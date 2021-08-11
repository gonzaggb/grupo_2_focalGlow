
//CATEGORIA DEBE TENER SELECCIONADA UNA OPCION
//NOMBRE DE PRODUCTO NO PUEDE ESTAR VACIO Y EL NOMBRE DEBE SER MÁS LARGO DE 5 (VALIDAR EXPRESS VALIDATOR)
//DEBE SER UN NÚMERO > 0
//FUENTE NO PUEDE ESTAR VACIO
//MATERIAL NO PUEDE ESTAR VACIO
//OPTICA NO PUEDE ESTAR VACIO
//POTENCIA NO PUEDE ESTAR VACIO
//CCT NO PUEDE ESTAR VACIO
//DIM NO PUEDE ESTAR VACIO
//RECIO UNITARIO DEBE SER UN NÚMERO > 0
//DESCRIPCION DEBE TENER UN LARGO SUPERARIO A (?) VALIDAR EXPRESS

const category = document.querySelectorAll('#category')
const product = document.querySelector('#producto')
const quantity = document.querySelector('#quantity')
const materiales = document.querySelectorAll('#material')
const createButton = document.querySelector('#button-enviar')

//VALIDA QUE EL FORMULARIO 
function validateInput(input) {
    input.addEventListener('blur', event => {
        if (input.value === '') {
            console.log('debe completar con un dato')
        }
    })
}
//RECORRE UN LISTADO DE CHECKBOX Y VALIDA SI ALGUNO ESTA CHECKEADO
function isChecked(checkboxList) {
    let isTrue = 0
    checkboxList.forEach(element =>{
        element.checked === true ? isTrue++ : isTrue
        })
        return isTrue
}



createButton.addEventListener('click', event => {
    if(isChecked(materiales) > 0){
        console.log('avanza')
        event.preventDefault()
    }else{
        console.log('no avanza')
        event.preventDefault()
    }   



})