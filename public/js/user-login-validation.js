const apiUrl = 'http://localhost:3000/api/users/email/'
const email = document.querySelector('#email')
const errorEmail = document.querySelector('#errorEmail')
const password = document.querySelector('#password')
const errorPassword = document.querySelector('#errorPassword')

console.log(password)
console.log(errorPassword)

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
		console.log('entré!!!')
		errorPassword.classList.add('show')
		errorPassword.innerHTML = 'Ingrese su contraseña'
		return
	}
})


