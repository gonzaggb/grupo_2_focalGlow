const firstName = document.querySelector('#firstName')
const lastName = document.querySelector('#lastName')
const email = document.querySelector('#email')
const password = document.querySelector('#password')
const rePassword = document.querySelector('#rePassword')
let errors = []

//FUNCION AUXILIAR PARA VALIDAR EMAIL
function validateEmail(email) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}

firstName.addEventListener('blur', function (event) {
  firstName.classList.remove('error')
  firstName.placeholder = ""

  if (firstName.value == "") {
    firstName.classList.add('error')
    firstName.placeholder = 'Ingrese su nombre'
    errors.push(firstName)
    return
  }
  if (firstName.value.length < 2) {
    firstName.classList.add('error')
    firstName.value = ""
    firstName.innerHTML = ""
    firstName.placeholder = 'El nombre debe tener al menos 2 caracateres'
    errors.push(firstName)
    return
  }
})

lastName.addEventListener('blur', function (event) {
  lastName.classList.remove('error')
  lastName.placeholder = ""

  if (lastName.value == "") {
    lastName.classList.add('error')
    lastName.placeholder = 'Ingrese su apellido'
    errors.push(lastName)
    return
  }
  if (lastName.value.length < 2) {
    lastName.classList.add('error')
    lastName.value = ""
    lastName.innerHTML = ""
    lastName.placeholder = 'El apellido debe tener al menos 2 caracateres'
    errors.push(lastName)
    return
  }
})

email.addEventListener('blur', function (event) {
  email.classList.remove('error')
  email.placeholder = ""

  if (email.value == "") {
    email.classList.add('error')
    email.placeholder = 'Ingrese su email'
    errors.push(email)
    return
  }
  if (email.value.length < 2) {
    email.classList.add('error')
    email.value = ""
    email.innerHTML = ""
    email.placeholder = 'El apellido debe tener al menos 2 caracateres'
    errors.push(email)
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
