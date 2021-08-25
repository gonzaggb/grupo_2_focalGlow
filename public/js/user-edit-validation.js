
const LONG_TEXT = 20
const SHORT_TEXT = 3

const fileUpload = document.querySelector('#file-upload')
const fileUploadError = document.querySelector('#file-upload-error')
const firstName = document.querySelector('#first_name')
const firstNameError = document.querySelector('#first-name-error')
const lastName = document.querySelector('#last_name')
const lastNameError = document.querySelector('#last-name-error')
const email = document.querySelector('#email')
const emailError = document.querySelector('#email-error')
const phone = document.querySelector('#phone')
const phoneError = document.querySelector('#phone-error')
const address = document.querySelector('#address')
const addressError = document.querySelector('#address-error')




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
                console.log("Error in text")
                console.log(errorField)
                errorField.innerHTML = `${label.innerHTML} debe tener ${SHORT_TEXT} o más caracteres`
                console.log(errorField)
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

//Chequeo que el nombre sea Texto
blurValidation(firstName, firstNameError, 0, 'text', 0)
