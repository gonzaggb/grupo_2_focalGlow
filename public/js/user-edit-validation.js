//API TO CHECK IF THE USER ALREADY EXIST IN THE DB
const apiUrl = 'http://localhost:3000/api/users/email/'

//VARIABLES DE AYUDA
const LONG_TEXT = 20
const SHORT_TEXT = 3
let errorsBitField = 0 //(1<<5)-1  00011111  Para quitar todos los errores lo igualo a cero y para agregarlos lo igualo a (1<<'cantidad de errores')-1

//CAPTURING DOM ELEMENTS
const form = document.querySelector('#form-edit')
const profileImage = document.querySelector('#file-upload')
const profileImageError = document.querySelector('#image-error')
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

//FUNCION PARA SETEAR UN BIT ESPECIFICO DE UN ENTERO
function setErrors (bitField, bit) {
    bitField = bitField|(1 << bit)  //Hago un OR para agregar errores 
    //bitField |= (1 << bit)
    return bitField
}
//FUNCION PARA DESSETEAR UN BIT ESPECIFICO
function unSetErrors (bitField, bit) {
    bitField &= ~(1 << bit) //Niego los bits y hago un and con bitField para quitar errores
    return bitField
}

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



//EVENT LISTENERS
firstName.addEventListener('click', e => {
        errorsBitField = unSetErrors(errorsBitField, 0)  //PODRE PASAR UN PUNTERO A LA VARIABLE??????
        firstName.classList.remove('error')
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
})

lastName.addEventListener('blur', e => {
    if (isEmpty(lastName)) {
        lastName.classList.add('error')
        lastName.placeholder = 'Debes completar tu apellido'
        errorsBitField = setErrors(errorsBitField, 1)
    }
})

email.addEventListener('click', e => {   //ESTO NO ME GUSTA< TENGO QUE MEJORARLO
    email.classList.remove('error')
    emailError.innerText = ''
    errorsBitField = unSetErrors(errorsBitField, 2)
})

email.addEventListener('blur', e => {
    
    let emailToFindUrl = apiUrl + email.value

	fetch(emailToFindUrl)
		.then(function (response) {
			return response.json()
		})
		.then(function (response) {
			if (response.meta.status == '200') {  //COMO HAGO PARA TENER EL EMAIL DEL USUARIO 
                email.classList.add('error')
				emailError.innerHTML = 'El email ingresado ya tiene una cuenta relacionada'
                errorsBitField = setErrors(errorsBitField, 2)
			}
		})

    if (isEmpty(email)) {
        email.classList.add('error')
        email.placeholder = 'Debes completar tu email'
        errorsBitField = setErrors(errorsBitField, 2)
    } 
    if (!validateEmail(email.value) && !isEmpty(email)) {
        email.classList.add('error')
        emailError.innerText = 'Debes completar con un e-mail valido'   
        errorsBitField = setErrors(errorsBitField, 2)               
    }
    
})

phone.addEventListener('click', e => {
    phone.classList.remove('error')
    phoneError.innerText = ''
    errorsBitField = unSetErrors(errorsBitField, 3)
})

phone.addEventListener('blur', e => {
    phoneError.innerHTML = ''
    if (isEmpty(phone)) {
        phone.classList.add('error')
        phone.placeholder = 'Debes completar tu telefono'
        errorsBitField = setErrors(errorsBitField, 3) 
    }
    if (!isNumber(phone) && !isEmpty(phone)) {
        phone.classList.add('error')
        phoneError.innerHTML = 'Debes completar tu telefono sin guiones ni espacios'
        errorsBitField = setErrors(errorsBitField, 3) 
    }
})

address.addEventListener('click', e => {
    address.classList.remove('error')
    errorsBitField = unSetErrors(errorsBitField, 4)
})

address.addEventListener('blur', e => {
    if (isEmpty(address)) {
        address.classList.add('error')
        address.placeholder = 'Debes completar tu direccion'
        errorsBitField = setErrors(errorsBitField, 4) 
    }
})
//CHECKING IMAGE FILE EXTENTION

profileImage.addEventListener('click', e => {
    errorsBitField = unSetErrors(errorsBitField, 5)  //PODRE PASAR UN PUNTERO A LA VARIABLE??????
    profileImage.classList.remove('error input')
})

profileImage.addEventListener('blur', e => {
if (isEmpty(profileImage)) {
    profileImageError.classList.add('error input')
    profileImage.placeholder = 'Debes completar tu nombre'
    errorsBitField = setErrors(errorsBitField, 5)
}
})

submitButton.addEventListener('click', e => {
    if (errorsBitField !== 0) {
        e.preventDefault()
    }
})

