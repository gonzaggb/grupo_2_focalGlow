//API TO CHECK IF THE USER ALREADY EXIST IN THE DB
const apiUrl = 'http://localhost:3000/api/users/email/'

//REGULAR EXPRESSION TO CHECK IF THE EMAIL IS STRONG
const strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')
const mediumPassword = new RegExp('((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))')



//CAPTURE DOM ELEMENTS

const firstName = document.querySelector('#firstName')
const lastName = document.querySelector('#lastName')
const email = document.querySelector('#email')
const password = document.querySelector('#password')
const rePassword = document.querySelector('#rePassword')
const profileImg = document.querySelector('#profileImg')
const form = document.querySelector('form.registry')


const errorFirstName = document.querySelector('#errorFirstName')
const errorLastName = document.querySelector('#errorLastName')
const errorEmail = document.querySelector('#errorEmail')
const errorPassword = document.querySelector('#errorPassword')
const errorRePassword = document.querySelector('#errorRePassword')
const errorProfileImg = document.querySelector('#errorProfileImg')

let errorsVariables = [errorFirstName, errorLastName, errorEmail, errorPassword, errorRePassword, errorProfileImg]


//HELPER FUNCTION TO VALIDATE EMAIL
function validateEmail(email) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}

//HELPER FUNCTOIN TO VALIDATE FILE IS IMAGE
function isFileImage(fileName) {
  const validExtension = ['.jpg', '.JPG', 'JPEG', '.png', '.jpeg', '.gif', 'tiff', 'bmp', 'svg']
  if (validExtension.includes(path.extname(fileName))) {
    return true
  } else {
    return false
  }
}

//CHECK IF THERE ARE ANY BACKEND ERRORS
errorsVariables.forEach(element => {
  element.innerText !== '' ? element.classList.remove('hidden') : ''
})

//CHECK EACH ONE OF THE INPUTS
firstName.addEventListener('blur', function (event) {
  errorFirstName.classList.add('hidden')

  if (firstName.value == "") {
    errorFirstName.classList.remove('hidden')
    errorFirstName.innerText = 'Ingresá tu nombre'
    return
  }
  if (firstName.value.length < 2) {
    errorFirstName.classList.remove('hidden')
    errorFirstName.innerText = 'Tu nombre debe tener al menos 2 caracateres'
    return
  }
})

lastName.addEventListener('blur', function (event) {
  errorLastName.classList.add('hidden')

  if (lastName.value == "") {
    errorLastName.classList.remove('hidden')
    errorLastName.innerText = 'Ingresá tu apellido'
    return
  }
  if (lastName.value.length < 2) {
    errorLastName.classList.remove('hidden')
    errorLastName.innerText = 'Tu apellido debe tener al menos 2 caracateres'
    return
  }
})

email.addEventListener('blur', function (event) {
  errorEmail.classList.add('hidden')

  //CHECK IF THE EMAIL VALUE IS ACCEPTED
  if (!validateEmail(email.value)) {
    errorEmail.classList.remove('hidden')
    errorEmail.innerText = 'Ingresá un email válido'
    return
  }

  //CHECK IF THE USER IS ALREADY IN THE DB

  const userToFindUrl = apiUrl + email.value

  fetch(userToFindUrl)
    .then(function (response) {
      return response.json()
    })
    .then(function (response) {

      if (response.meta.status == '200') {
        errorEmail.classList.remove('hidden')
        errorEmail.innerText = 'El email ingresado ya está registrado.'
      }
    })
})

password.addEventListener('blur', function (event) {

  errorPassword.classList.add('hidden')

  if (password.value == "") {
    errorPassword.classList.remove('hidden')
    errorPassword.innerText = 'Ingresá una contraseña'
    return
  }

  if (strongPassword.test(password.value)) {
    errorPassword.classList.remove('hidden')
    errorPassword.style.color = 'green'
    errorPassword.innerText = 'Buen password!'

  } else if (mediumPassword.test(password.value)) {
    errorPassword.classList.remove('hidden')
    errorPassword.style.color = '#ffde59'
    errorPassword.innerHTML = 'El password debe tener al menos: <br />8 caracteres<br /> 1 Mayúscula & 1 minúscula<br /> 1 dígito & 1  caracater especial'
  } else {
    errorPassword.classList.remove('hidden')
    errorPassword.style.color = 'red'
    errorPassword.innerHTML = 'El password debe tener al menos: <br />8 caracteres<br /> 1 Mayúscula & 1 minúscula<br /> 1 dígito & 1  caracater especial'
  }
})

rePassword.addEventListener('blur', function (event) {
  errorRePassword.classList.add('hidden')

  if (rePassword.value == "") {
    errorRePassword.classList.remove('hidden')
    errorRePassword.innerText = 'Favor de confirmar la contraseña'
    return
  }

  if (rePassword.value != password.value) {
    errorRePassword.classList.remove('hidden')
    errorRePassword.innerText = 'Las contraseñas no coinciden'
    return
  }

})

profileImg.addEventListener('change', function (event) {
  errorProfileImg.classList.add('hidden')

  // Allowing file type
  var allowedExtensions =
    /(\.jpg|\.jpeg|\.png|\.gif)$/i;

  if (!allowedExtensions.exec(profileImg.value)) {
    profileImg.value = '';
    errorProfileImg.classList.remove('hidden')
    errorProfileImg.innerText = "Favor de subir un archivo de imagen (jpg, jpeg, png o gif)"
    return
  }

  // Image preview
  if (profileImg.files && profileImg.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      document.getElementById(
        'imagePreview').innerHTML =
        '<img width="90%" src="' + e.target.result
        + '"/>';
    };

    reader.readAsDataURL(profileImg.files[0]);
  }
})

form.addEventListener('submit', function (event) {
  let errors = []

  if (firstName.value == "") {
    errorFirstName.classList.remove('hidden')
    errorFirstName.innerText = 'Ingresá tu nombre'
    errors.push(firstName)
  } else if (firstName.value.length < 2) {
    errorFirstName.classList.remove('hidden')
    errorFirstName.innerText = 'Tu nombre debe tener al menos 2 caracateres'
    errors.push(firstName)
  }

  if (lastName.value == "") {
    errorLastName.classList.remove('hidden')
    errorLastName.innerText = 'Ingresá tu apellido'
    errors.push(lastName)
  } else if (lastName.value.length < 2) {
    errorLastName.classList.remove('hidden')
    errorLastName.innerText = 'Tu apellido debe tener al menos 2 caracateres'
    errors.push(lastName)
  }

  if (!validateEmail(email.value)) {
    errorEmail.classList.remove('hidden')
    errorEmail.innerText = 'Ingresá un email válido'
    errors.push(errorEmail)
  }

  if (password.value == "") {
    errorPassword.classList.remove('hidden')
    errorPassword.innerText = 'Ingresá una contraseña'
    errors.push(errorEmail)
  } else if (!strongPassword.test(password.value)) {
    errorPassword.classList.remove('hidden')
    errorPassword.style.color = 'red'
    errorPassword.innerHTML = 'El password debe tener al menos: <br />8 caracteres<br /> 1 Mayúscula & 1 minúscula<br /> 1 dígito & 1  caracater especial'
  }

  if (rePassword.value == "") {
    errorRePassword.classList.remove('hidden')
    errorRePassword.innerText = 'Favor de confirmar la contraseña'
    errors.push(rePassword)
  } else if (rePassword.value != password.value) {
    errorRePassword.classList.remove('hidden')
    errorRePassword.innerText = 'Las contraseñas no coinciden'
    errors.push(rePassword)
  }

  if (errors.length > 0) {
    console.log('NO SE MANDA EL FORM')
    event.preventDefault()
    return
  }

  console.log('SE MANDA EL FORM')
})