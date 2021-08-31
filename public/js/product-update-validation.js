//VARIABLES PARA DEFINIR EL LARGO DE LAS DIFERENTES VALIDACIONES
const LONG_TEXT = 20
const SHORT_TEXT = 5
const ACCEPTED_IMAGE_FORMATS = ['jpg', 'png', 'jpeg', 'gif']
const ACCEPTED_ARCHIVE_FORMATS = ['pdf']

const category = document.querySelectorAll('#category')
const categoryError = document.querySelector('#category-error')
const categorySelect = document.querySelectorAll('#category-select')
const categoryLabel = document.querySelector('#category-label')

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
console.log(materialLabel)


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
const checkSliderType = document.querySelectorAll('#slider-image-check')
const clearSliderCheck = document.querySelector('#clear-slider-check')


const dataSheetLabel = document.querySelector('#label-data-sheet')
const dataSheet = document.querySelector('#input-data-sheet')
const dataSheetError = document.querySelector('#error-data-sheet')

const installSheet = document.querySelector('#input-install-sheet')
const installSheetLabel = document.querySelector('#label-install-sheet')
const installSheetError = document.querySelector('#error-install-sheet')

const allErrors = [categoryError, productError, quantityError, sourceError,
    materialError, opticError, powerError, cctError, dimError, mainImageError,
    dimensionImageError, sliderError, dataSheetError, installSheetError]



const editButton = document.querySelector('#button-enviar')


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
    if (input.value == '') {
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
    console.log('--------------------------------')
    console.log(fileExtension(fileName).toLowerCase())
    return ACCEPTED_IMAGE_FORMATS.includes(fileExtension(fileName).toLowerCase())
}
//Valida que sea un archivo pdf
function isPdf(fileName) {
    return ACCEPTED_ARCHIVE_FORMATS.includes(fileExtension(fileName).toLowerCase())
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

/*Borra el check en caso de no querer modificar el slider y deshabilita el botón de cargar slider*/
clearSliderCheck.addEventListener('click', event => {
    checkSliderType.forEach(e => {
        e.checked = false
    })
    sliderImages.disabled = true

})
/*Activa el botón de carga de slider cuando se selecciona una opcion*/
checkSliderType.forEach(e => {
    e.addEventListener('click', event => {
        sliderImages.disabled = false
    })
})

clearErrors([mainImageError])
mainImage.addEventListener('click', event => {
    clearErrors([mainImageError])

})

//Valida que los inputs o select estén marcados, el callback que recibe es isChecked o isSelected
function validate(input, errorField, label, type, event, callback) {

    if (isEmpty(input)) {
        errorField.innerHTML = `${label.innerHTML} no puede estar vacio`
        return event.preventDefault()
        }

    switch (type) {
        case 'integer':
            if (!isInteger(input)) {
                errorField.innerHTML = `${label.innerHTML} debe ser un número entero positivo`
                return event.preventDefault()
            }
            break;
        case 'number':
            if (!isNumber(input)) {
                errorField.innerHTML = `${label.innerHTML} debe ser un número`
                return event.preventDefault()
            }
            break;
        case 'text':
            if (!isLongerThan(input, SHORT_TEXT)) {

                errorField.innerHTML = `${label.innerHTML} debe ser más largo de ${SHORT_TEXT} caracteres`
                return event.preventDefault()
            }
            break;
        case 'longText':
            if (!isLongerThan(input, LONG_TEXT)) {
                errorField.innerHTML = `${label.innerHTML} debe tener ${LONG_TEXT} o más caracteres`
                return event.preventDefault()
            }
            break;
        case 'image':
            if (!isImage(input.value)) {
                errorField.innerHTML = `${label.innerHTML} debe completarse con uno de los siguientes formatos jpg, png o jpeg`
                return event.preventDefault()
            }
            break;
        case 'slider':
            //uso for porque con forEach no funciona
            for (let i = 0; i < input.files.length; i++) {
                if (!isImage(input.files[i].name)) {
                    errorField.innerHTML = `Los formatos aceptados por ${label.innerHTML} son jpg, png o jpeg`
                    return event.preventDefault()

                }
            }
            break;
        case 'pdf':
            if (!isPdf(input.value)) {
                errorField.innerHTML = `${label.innerHTML} debe completarse con archivo PDF`
                return event.preventDefault()
            }
            break;
        case 'check':
            if (callback(input) === 0) {
                errorField.innerHTML = `Debes seleccionar al menos una opcion para ${label.innerHTML}`
                return event.preventDefault()
            }
            break;
        case 'select':
            if (callback(input) === 0) {
                errorField.innerHTML = `Debes seleccionar al menos una opcion para ${label.innerHTML}`
                return event.preventDefault()
            }
            break;

        default:
    }
    clearErrors([allErrors])
}

function blurValidation(input, errorField, label, type, callback) {    
    input.addEventListener('blur', event => {
        clearErrors([errorField])
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
editButton.addEventListener('click', event => {

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
    //Valida que si se carga algo para imagen principal la misma sea un formato válido
    if (!isEmpty(mainImage) && !isImage(mainImage.value)) {
        mainImageError.innerHTML = "Los formatos admitidos son .jpg, .png, .jpeg"
        event.preventDefault()
    }
    //Valida que si se carga algo para imagen de dimensiones la misma sea un formato válido
    if (!isEmpty(dimensionImage) && !isImage(dimensionImage.value)) {
        dimensionImageError.innerHTML = "Los formatos admitidos son .jpg, .png, .jpeg"
        event.preventDefault()
    }
    //Valida que si está checkeado el campo del slider se cargue una imagen, y en caso de que haya  algo cargado que sean imagenes
    if (isChecked(checkSliderType) > 0 && isEmpty(sliderImages)) {
        sliderError.innerHTML = "Debes seleccionar al menos una imagen"
        event.preventDefault()

    } else if (!isEmpty(sliderImages)) {
        for (let i = 0; i < sliderImages.files.length; i++) {
            if (!isImage(sliderImages.files[i].name)) {
                sliderError.innerHTML = "Los formatos admitidos son .jpg, .png, .jpeg"
                event.preventDefault()
            }
        }
    }
    if (!isEmpty(dataSheet) && !isPdf(dataSheet.value)) {
        dataSheetError.innerHTML = "El archivo debe ser un PDF"
        event.preventDefault()
    }
    if (!isEmpty(installSheet) && !isPdf(installSheet.value)) {
        installSheetError.innerHTML = "El archivo debe ser un PDF"
        event.preventDefault()
    }
    product.focus()





})