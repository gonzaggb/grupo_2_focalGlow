//CAPTURO LOS ELEMENTOS DEL DOM

const firstName = document.querySelector('#firstName')
const lastName = document.querySelector('#lastName')
const email = document.querySelector('#email')
const password = document.querySelector('#password')
const rePassword = document.querySelector('#rePassword')

const errorFirstName = document.querySelector('#errorFirstName')
const errorLastName = document.querySelector('#errorLastName')
const errorEmail = document.querySelector('#errorEmail')
const errorPassword = document.querySelector('#errorPassword')
const errorRePassword = document.querySelector('#errorRePassword')
const errorProfileImg = document.querySelector('#errorProfileImg')
let errorsVariables = [errorFirstName, errorLastName, errorEmail, errorPassword, errorRePassword, errorProfileImg]

let errors = []

//FUNCION AUXILIAR PARA VALIDAR EMAIL
function validateEmail(email) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}


//CHEQUEO SI VINIERON ERRORES DEL BACK Y SI VINIERON LOS MUESTRO
errorsVariables.forEach(element => {
  element.innerText !== '' ? element.classList.remove('hidden') : ''
})


firstName.addEventListener('blur', function (event) {
  errorFirstName.classList.add('hidden')

  if (firstName.value == "") {
    errorFirstName.classList.remove('hidden')
    errorFirstName.innerText = 'Ingresá tu nombre'
    errors.push(firstName)
    return
  }
  if (firstName.value.length < 2) {
    errorFirstName.classList.remove('hidden')
    errorFirstName.innerText = 'Tu nombre debe tener al menos 2 caracateres'
    errors.push(firstName)
    return
  }
})

lastName.addEventListener('blur', function (event) {
  errorLastName.classList.add('hidden')

  if (lastName.value == "") {
    errorLastName.classList.remove('hidden')
    errorLastName.innerText = 'Ingresá tu apellido'
    errors.push(lastName)
    return
  }
  if (lastName.value.length < 2) {
    errorLastName.classList.remove('hidden')
    errorLastName.innerText = 'Tu apellido debe tener al menos 2 caracateres'
    errors.push(lastName)
    return
  }
})



email.addEventListener('blur', function (event) {
  errorEmail.classList.remove('error')
  email.placeholder = ""

  //PRIMERO CHEQUEO QUE SEA UN EMAIL EL INPUT
  if (!validateEmail(email.value)) {
    errorEmail.classList.add('error')
    errorEmail.placeholder = 'Ingrese un email válido'
    errors.push(errorEmail)
    return
  }

  //CHEQUEO QUE NO ESTE EN LA BASE DE DATOS
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
