const apiUrl = 'http://localhost:3000/api/users/email/'
const email = document.querySelector('#email')
const errorEmail = document.querySelector('#errorEmail')
const password = document.querySelector('#password')
const errorPassword = document.querySelector('#errorPassword')

const form = document.querySelector('#form')
const buttonSubmit = document.querySelector('#buttonSubmit')


let errors = []

//CHEQUEO SI VINIERON ERRORES DEL BACKEND
console.log(errorEmail)
console.log(errorEmail.innerHTML)
if (errorEmail.innerHTML != "\n          \n        ") {
	console.log('entre al if')
	errorEmail.classList.remove('hidden')
	errorEmail.classList.add('show')
}

if (errorPassword.innerHTML !== "\n          \n        ") {
	errorEmail.classList.remove('hidden')
	errorEmail.classList.add('show')
}

//FUNCION AUXILIAR PARA VALIDAR EMAIL
function validateEmail(email) {
	var re = /\S+@\S+\.\S+/;
	return re.test(email);
}

email.addEventListener('blur', function (event) {
	errorEmail.classList.remove('show')
	errorEmail.innerHTML = ''

	//PRIMERO CHEQUEO QUE SEA UN EMAIL EL INPUT
	if (!validateEmail(email.value)) {
		errorEmail.classList.add('show')
		errorEmail.innerHTML = 'Ingrese un email válido'
		errors.push(errorEmail)
		return
	}

	//CHEQUEO QUE ESTE EN LA BASE DE DATOS
	const userToFindUrl = apiUrl + email.value

	fetch(userToFindUrl)
		.then(function (response) {
			return response.json()
		})
		.then(function (response) {

			if (response.meta.status == '204') {
				errorEmail.classList.add('show')
				errorEmail.innerHTML = 'El email ingresado no se ecuentra en nuestra base de datos. Favor de registrarse'
			}
		})
})

password.addEventListener('blur', function (event) {
	errorPassword.classList.remove('show')
	errorPassword.innerHTML = ''

	if (password.value == '') {
		errorPassword.classList.add('show')
		errorPassword.innerHTML = 'Ingrese su contraseña'
		errors.push(errorPassword)
		return
	}
})

form.addEventListener('submit', function (event) {
	if (email.value == '') {
		errorEmail.classList.add('show')
		errorEmail.innerHTML = 'Ingrese su email'
		event.preventDefault()
	}

	if (password.value == '') {
		errorPassword.classList.add('show')
		errorPassword.innerHTML = 'Ingrese su contraseña'
		event.preventDefault()
	}
	if (errors.length > 0) {
		event.preventDefault()
	}
})


