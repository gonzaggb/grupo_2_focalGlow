//API TO CHECK IF THE USER ALREADY EXIST IN THE DB
const apiUrl = 'http://localhost:3000/api/users/email/'

//VARIABLES DE AYUDA
const LONG_TEXT = 20
const SHORT_TEXT = 3
let errorsBitField = 0 //(1<<5)-1  00011111  Para quitar todos los errores lo igualo a cero y para agregarlos lo igualo a (1<<'cantidad de errores')-1

//CAPTURING DOM ELEMENTS
const form = document.querySelector('#form-edit')
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
const submitButton = document.querySelector('#form-submit')

//HELPER FUNCTIONS
function isEmpty(input) {
    if (input.value == '') {
        return true
    }
    return false
}

function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

function isNumber(input) {
    const decimal = /(\d*\.)?\d+/
    return (decimal.test(input.value))
}

//FUNCION PARA SETEAR UN BIT ESPECIFICO DE UN ENTERO
function setErrors (bitField, bit) {
    bitField = bitField|(1 << bit)  //Hago un OR para agregar errores 
    //bitField |= (1 << bit)
    return bitField
}
//FUNCION PARA DESSETEAR UN BIT ESPECIFICO
function unSetErrors (bitField, bit) {
    bitField &= ~(1 << bit)
    //bitField = bitField & ~(1 << bit) //Niego los bits y hago un and con bitField para quitar errores
    return bitField
}

//EVENT LISTENERS
firstName.addEventListener('click', e => {
        errorsBitField = unSetErrors(errorsBitField, 0)  //PODRE PASAR UN PUNTERO A LA VARIABLE??????
        firstName.classList.remove('error')
        console.log(firstName.classList)
})

firstName.addEventListener('blur', e => {
    if (isEmpty(firstName)) {
        firstName.classList.add('error')
        firstName.placeholder = 'Debes completar tu nombre'
        errorsBitField = setErrors(errorsBitField, 0)
    }
})

lastName.addEventListener('click', e => {
    errorsBitField = unSetErrors(errorsBitField, 1)
    lastName.classList.remove('error')
    console.log(lastName.classList)
})

lastName.addEventListener('blur', e => {
    if (isEmpty(lastName)) {
        lastName.placeholder = 'Debes completar tu apellido'
        errorsBitField = setErrors(errorsBitField, 1)
    }
})

email.addEventListener('click', e => {   //ESTO NO ME GUSTA< TENGO QUE MEJORARLO
    emailError.innerText = ''
    errorsBitField = unSetErrors(errorsBitField, 2)
})

email.addEventListener('blur', e => {
    
    console.log(email.value)
    if (isEmpty(email)) {
        email.placeholder = 'Debes completar tu email'
        errorsBitField = setErrors(errorsBitField, 2)
    } 
    if (!validateEmail(email.value) && !isEmpty(email)) {
        console.log(email)
        emailError.innerText = 'Debes completar con un e-mail valido'   
        errorsBitField = setErrors(errorsBitField, 2)               
    }
    //TODO CHECKEAR CON API QUE NO EXISTA EN LA BD
    // const userToFindUrl = apiUrl + email.value

	// fetch(userToFindUrl)
	// 	.then(function (response) {
	// 		return response.json()
	// 	})
	// 	.then(function (response) {

	// 		if (response.meta.status == '204') {
	// 			errorEmail.classList.add('show')
	// 			errorEmail.innerHTML = 'El email ingresado ya se ecuentra en nuestra base de datos.'
	// 		}
	// 	})
})

phone.addEventListener('click', e => {
    phoneError.innerText = ''
    errorsBitField = unSetErrors(errorsBitField, 3)
})

phone.addEventListener('blur', e => {
    phoneError.innerHTML = ''
    if (isEmpty(phone)) {
        phone.placeholder = 'Debes completar tu telefono'
        errorsBitField = setErrors(errorsBitField, 3) 
    }
    if (!isNumber(phone) && !isEmpty(phone)) {
        phoneError.innerHTML = 'Debes completar tu telefono sin guiones ni espacios'
        errorsBitField = setErrors(errorsBitField, 3) 
    }
})

address.addEventListener('click', e => {
    errorsBitField = unSetErrors(errorsBitField, 4)
})

address.addEventListener('blur', e => {
    if (isEmpty(address)) {
        address.placeholder = 'Debes completar tu direccion'
        errorsBitField = setErrors(errorsBitField, 4) 
    }
})

submitButton.addEventListener('click', e => {
    console.log(errorsBitField)
    if (errorsBitField !== 0) {
        e.preventDefault()
    }
})


{/*FUNCIONES AUXILIARES



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
blurValidation(firstName, firstNameError, 0, 'text', 0)*/}
