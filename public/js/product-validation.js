//VARIABLES PARA DEFINIR EL LARGO DE LAS DIFERENTES VALIDACIONES
const LONG_TEXT = 20
const SHORT_TEXT = 3

const category = document.querySelectorAll('#category')
const categoryError = document.querySelector('#category-error')
const categorySelect = document.querySelectorAll('#category-select')
const categoryLabel = document.querySelectorAll('#category-label')

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
const sourceLabel = document.querySelector('#source-label')

const material = document.querySelectorAll('#material')
const materialError = document.querySelector('#material-error')
const materialLabel = document.querySelector("#material-label")

const optic = document.querySelectorAll('#optic')
const opticError = document.querySelector('#optic-error')
const opticLabel = document.querySelector('#optic-label')


const power = document.querySelectorAll('#power')
const powerError = document.querySelector('#power-error')
const powerLabel = document.querySelector('#power-label')


const cct = document.querySelectorAll('#cct')
const cctError = document.querySelector('#cct-error')
const cctLabel = document.querySelector('#cct-label')

const dim = document.querySelectorAll('#dim')
const dimError = document.querySelector('#dim-error')
const dimLabel = document.querySelector('#dim-label')


const mainImage = document.querySelector('#main-image-input')
const mainImageLabel = document.querySelector('#main-image-label')
const mainImageError = document.querySelector('#main-image-error')
const dimensionImage = document.querySelector('#dimension-image-input')
const dimensionImageLabel = document.querySelector('#dimension-image-label')
const dimensionImageError = document.querySelector('#dimension-image-error')

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



/*FUNCIONES AUXILIARES*/
//Valida si un campo es entero
function isInteger(input) {
    const numeric = /^\d+$/
    return (numeric.test(input.value))
}
//Valida si un campo es numerico
function isNumber(input) {
    const decimal = /(\d*\.)?\d+/
    return (decimal.test(input.value))
}

//Valida si un campo está vacío
function isEmpty(input) {
    if (input.value !== '') {
        return true
    }
    return false

}
//Valida que un campo tenga el valor indicado
function isLongerThan(input, length) {
    if (input.value.length >= length) {
        return true
    }
    return false
}


//Recorre listado de checkbox y devuelve un número mayor a 0 en caso afirmativo
function isChecked(checkboxList) {
    let isTrue = 0
    checkboxList.forEach(element => {
        element.checked === true ? isTrue++ : isTrue
    })
    return isTrue
}
//Recorre un listado de options y devuelve un número mayor a 0 en caso afirmativo
function isSelected(options) {
    let isTrue = 0
    options.forEach(element => {
        element.selected === true ? isTrue++ : isTrue
    })
    return isTrue
}
//Devuelve la extension del archivo cargado
function fileExtension(fileName) {
    return (/[.]/.exec(fileName)) ? /[^.]+$/.exec(fileName)[0] : undefined;
}
//Valida que sea una imagen aceptada
function isImage(fileName) {
    const ACCEPTED_FORMATS = ['jpg', 'png', 'jpeg']
    return ACCEPTED_FORMATS.includes(fileExtension(fileName))
}
//Valida que sea un archivo pdf
function isPdf(fileName) {
    const ACCEPTED_FORMATS = ['pdf']
    return ACCEPTED_FORMATS.includes(fileExtension(fileName))
}

//Borra los errors cuando se selecciona un campo
function clearErrorAtCheck(checkList, error) {
    checkList.forEach(e => {
        e.addEventListener('click', event => {
            clearErrors([error])
        })
    })
}


//Borra los errores de los campos pasados
function clearErrors([...fieldError]) {
    fieldError.forEach(e => {
        e.innerHTML = ''
    })
}



//Valida que los inputs o select estén marcados, el callback que recibe es isChecked o isSelected
function validate(input, errorField, label, type, event, callback) {
    if (!isEmpty(input)) {
        errorField.innerHTML = `${label.innerHTML} no puede estar vacio`
        event.preventDefault()
        return

    }
    switch (type) {
        case 'integer':
            if (!isInteger(input)) {
                errorField.innerHTML = `${label.innerHTML} debe ser un número entero positivo`
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
            break;
        case 'image':
            if (!isImage(input.value)) {
                errorField.innerHTML = `${label.innerHTML} debe completarse con uno de los siguientes formatos jpg, png o jpeg`
                event.preventDefault()
            }
            break;
        case 'slider':
            //uso for porque con forEach no funciona
            for (let i = 0; i < input.files.length; i++) {
                if (!isImage(input.files[i].name)) {
                    errorField.innerHTML = `Los formatos aceptados por ${label.innerHTML} son jpg, png o jpeg`
                    event.preventDefault()
                    return
                }
            }
            break;
        case 'pdf':
            if (!isPdf(input.value)) {
                errorField.innerHTML = `${label.innerHTML} debe completarse con archivo PDF`
                event.preventDefault()
            }
            break;
        case 'check':
            if (callback(input) === 0) {
                errorField.innerHTML = 'Debes seleccionar al menos una opcion'
                return event.preventDefault()
            }
            break;
        case 'select':
            if (callback(input) === 0) {
                errorField.innerHTML = 'Debes seleccionar al menos una opcion'
                return event.preventDefault()
            }
            break;

        default:
    }
    clearErrors([errorField])
}

function blurValidation(input, errorField, label, type, callback) {
    clearErrors([errorField])
    input.addEventListener('blur', event => {
        validate(input, errorField, label, type, event, callback)
    })
}

/*Validacion con blur de los campos validables*/
blurValidation(mainImage, mainImageError, mainImageLabel, 'image')
blurValidation(price, priceError, priceLabel, 'number')
blurValidation(description, descriptionError, descriptionLabel, 'longText')
blurValidation(quantity, quantityError, quantityLabel, 'integer')
blurValidation(product, productError, productLabel, 'text')
blurValidation(dimensionImage, dimensionImageError, dimensionImageLabel, 'image')
blurValidation(sliderImages, sliderError, sliderLabel, 'slider')
blurValidation(dataSheet, dataSheetError, dataSheetLabel, 'pdf')
blurValidation(installSheet, installSheetError, installSheetLabel, 'pdf')


/*Borrado de los errores de los campos checkeables*/
clearErrorAtCheck(categorySelect, categoryError)
clearErrorAtCheck(material, materialError)
clearErrorAtCheck(power, powerError)
clearErrorAtCheck(source, sourceError)
clearErrorAtCheck(optic, opticError)
clearErrorAtCheck(cct, cctError)
clearErrorAtCheck(dim, dimError)

/*Validación de errores contra el botón crear*/
createButton.addEventListener('click', event => {
    clearErrors(allErrors)
    validate(category, categoryError, categoryLabel, 'select', event, isSelected)
    validate(power, powerError, powerLabel, 'select', event, isSelected,)
    validate(source, sourceError, sourceLabel, 'check', event, isChecked)
    validate(material, materialError, materialLabel, 'check', event, isChecked)
    validate(optic, opticError, opticLabel, 'check', event, isChecked)
    validate(cct, cctError, cctLabel, 'check', event, isChecked)
    validate(dim, dimError, dimLabel, 'check', event, isChecked)
    validate(product, productError, productLabel, 'text', event, isChecked)
    validate(quantity, quantityError, quantityLabel, 'integer', event)
    validate(price, priceError, priceLabel, 'number', event)
    validate(description, descriptionError, descriptionLabel, 'longText', event)
    validate(mainImage, mainImageError, mainImageLabel, 'image', event)
    validate(dimensionImage, dimensionImageError, dimensionImageLabel, 'image', event)
    validate(sliderImages, sliderError, sliderLabel, 'slider', event)
    validate(dataSheet, dataSheetError, dataSheetLabel, 'pdf', event)
    validate(installSheet, installSheetError, installSheetLabel, 'pdf', event)
})