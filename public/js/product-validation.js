//VARIABLES PARA DEFINIR EL LARGO DE LAS DIFERENTES VALIDACIONES
const LONG_TEXT = 20
const SHORT_TEXT = 3

const category = document.querySelectorAll('#category')
const categoryError = document.querySelector('#category-error')

const product = document.querySelector('#input-product-name')
const productError = document.querySelector('#error-product-name')
const productLabel = document.querySelector('#label-product-name')

const quantity = document.querySelector('#input-quantity')
const quantityError = document.querySelector('#error-quantity')
const quantityLabel = document.querySelector('#label-quantity')

const description = document.querySelector('#description-input')
const descriptionError = document.querySelector('#description-error')
const descriptionLabel = document.querySelector('#description-label')
const price = document.querySelector('#price-input')
const priceLabel = document.querySelector('#price-label')
const priceError = document.querySelector('#price-error')
const source = document.querySelectorAll('#source')
const sourceError = document.querySelector('#source-error')
const material = document.querySelectorAll('#material')
const materialError = document.querySelector('#material-error')
const optic = document.querySelectorAll('#optic')
const opticError = document.querySelector('#optic-error')
const power = document.querySelectorAll('#power')
const powerError = document.querySelector('#power-error')
const cct = document.querySelectorAll('#cct')
const cctError = document.querySelector('#cct-error')
const dim = document.querySelectorAll('#dim')
const dimError = document.querySelector('#dim-error')
const mainImage = document.querySelector('#main-image-input')
const mainImageLabel = document.querySelector('#main-image-label')
const mainImageError = document.querySelector('#main-image-error')
const dimensionImage = document.querySelector('#dimension-image-input')
const dimensionImageLabel = document.querySelector('#dimension-image-label')
const dimensionImageError = document.querySelector('#dimension-image-error')

//FIXME ver como capturar todas las imagenes del slider
const sliderImages = document.querySelector('#slider-image-input')
const sliderError = document.querySelector('#slider-image-error')
const sliderLabel = document.querySelector('#slider-image-label')


const dataSheetLabel = document.querySelector('#label-data-sheet')
const dataSheet = document.querySelector('#input-data-sheet')
const dataSheetError = document.querySelector('#error-data-sheet')
const installSheet = document.querySelector('#input-install-sheet')
const installSheetLabel = document.querySelector('#label-install-sheet')
const installSheetError = document.querySelector('#error-install-sheet')

const allErrors = [categoryError, productError, quantityError, sourceError,
    materialError, opticError, powerError, cctError, dimError, mainImageError,
    dimensionImageError, sliderError, dataSheetError, installSheetError]



const createButton = document.querySelector('#button-enviar')

//VALIDA SI UN CAMPO ES NUMÉRICO mayor que 0
function isInteger(input) {
    const numeric = /^\d+$/
    return (numeric.test(input.value))
}
function isNumber(input) {
    const decimal = /(\d*\.)?\d+/
    return (decimal.test(input.value))
}

//VALIDA SI UN CAMPO ESTÁ VACIO
function isEmpty(input) {
    if (input.value !== '') {
        return true
    }
    return false

}
//VALIDA QUE EL TEXTO SEA MAS LARGO QUE EL VALOR DEFINIDO
function isLongerThan(input, length) {
    if (input.value.length >= length) {
        return true
    }
    return false
}


//RECORRE UN LISTADO DE CHECKBOX Y VALIDA SI ALGUNO ESTA CHECKEADO
function isChecked(checkboxList) {
    let isTrue = 0
    checkboxList.forEach(element => {
        element.checked === true ? isTrue++ : isTrue
    })
    return isTrue
}
function isSelected(options) {
    let isTrue = 0
    options.forEach(element => {
        element.selected === true ? isTrue++ : isTrue
    })
    return isTrue
}
function validateCheckFields(list, errorField, callback, event) {
    if (callback(list) === 0) {
        errorField.innerHTML = 'Debes seleccionar al menos una opcion'
        return event.preventDefault()
    }
    clearErrors(errorField)
}

function clearErrors([...fieldError]) {
    fieldError.forEach(e => {
        e.innerHTML = ''
    })
}
function validateInput(input, errorField, label, type, event) {
    if (!isEmpty(input)) {
        errorField.innerHTML = `${label.innerHTML} no puede estar vacio`
        event.preventDefault()
        return

    }
    switch (type) {
        case 'integer':
            if (!isInteger(input)) {
                errorField.innerHTML = `${label.innerHTML} debe ser un número entero mayor`
                event.preventDefault()
            }
            break;
        case 'number':
            if (!isNumber(input)) {
                errorField.innerHTML = `${label.innerHTML} debe ser un número`
                event.preventDefault()
            }
            break;
        case 'text':
            if (!isLongerThan(input, SHORT_TEXT)) {
                errorField.innerHTML = `${label.innerHTML} debe tener ${SHORT_TEXT} o más caracteres`
                event.preventDefault()
            }
            break;
        case 'longText':
            if (!isLongerThan(input, LONG_TEXT)) {
                errorField.innerHTML = `${label.innerHTML} debe tener ${LONG_TEXT} o más caracteres`
                event.preventDefault()
            }
        case 'image':
            if (!isImage(input)) {
                errorField.innerHTML = `${label.innerHTML} debe completarse con uno de los siguientes formatos jpg, png o jpeg`
                event.preventDefault()
            }
            break;
        case 'pdf':
            if (!isPdf(input)) {
                errorField.innerHTML = `${label.innerHTML} debe completarse con archivo PDF`
                event.preventDefault()
            }
            break;


        default:
    }
}

function fileExtension(fileName) {
    return (/[.]/.exec(fileName)) ? /[^.]+$/.exec(fileName)[0] : undefined;
}

function isImage(fileName) {
    const ACCEPTED_FORMATS = ['jpg', 'png', 'jpeg']
    return ACCEPTED_FORMATS.includes(fileExtension(fileName.value))
}
function isPdf(fileName) {
    const ACCEPTED_FORMATS = ['pdf']
    return ACCEPTED_FORMATS.includes(fileExtension(fileName.value))
}

product.addEventListener('blur', event => {
    clearErrors([productError])
    validateInput(product, productError, productLabel, 'text', event)
})

// [0].innerHTML label | [2].value INPUT | [3].innerHTML ERROR MSG
quantity.addEventListener('blur', event => {
    clearErrors([quantityError])
    validateInput(quantity, quantityError, quantityLabel, 'integer', event)
})

description.addEventListener('blur', event => {
    clearErrors([descriptionError])
    validateInput(description, descriptionError, descriptionLabel, 'longText', event)
})

price.addEventListener('blur', event => {
    clearErrors([priceError])
    validateInput(price, priceError, priceLabel, 'number', event)
})


material.forEach( e => {
    e.addEventListener('focus', event =>{
        clearErrors([materialError])
    })
})




createButton.addEventListener('click', event => {
    clearErrors(allErrors)
    validateCheckFields(category, categoryError, isSelected, event)
    validateCheckFields(power, powerError, isSelected, event)
    validateCheckFields(source, sourceError, isChecked, event)
    validateCheckFields(material, materialError, isChecked, event)
    validateCheckFields(optic, opticError, isChecked, event)
    validateCheckFields(cct, cctError, isChecked, event)
    validateCheckFields(dim, dimError, isChecked, event)
    validateInput(product, productError, productLabel, 'text', event)
    validateInput(quantity, quantityError, quantityLabel, 'integer', event)
    validateInput(price, priceError, priceLabel, 'number', event)
    validateInput(description, descriptionError, descriptionLabel, 'longText', event)
    validateInput(mainImage, mainImageError, mainImageLabel, 'image', event)
    validateInput(dimensionImage, dimensionImageError, dimensionImageLabel, 'image', event)
    validateInput(dataSheet, dataSheetError, dataSheetLabel, 'pdf', event)
    validateInput(installSheet, installSheetError, installSheetLabel, 'pdf', event)










})