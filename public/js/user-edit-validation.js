//API TO CHECK IF THE USER ALREADY EXIST IN THE DB
const apiUrl = 'http://localhost:3000/api/users/email/'


//CAPTURE DOM ELEMENTS

const firstName = document.querySelector('#firstName')
const lastName = document.querySelector('#lastName')
const email = document.querySelector('#email')
const originalEmail = email.value
const phone = document.querySelector('#phone')
const address = document.querySelector('#address')
const profileImg = document.querySelector('#profileImg')
let imagePreview = document.querySelector('#imagePreview') // DECLARED AS LET BECAUSE IT'S GOING TO CHANGE
const form = document.querySelector('form.registry')


const errorFirstName = document.querySelector('#errorFirstName')
const errorLastName = document.querySelector('#errorLastName')
const errorEmail = document.querySelector('#errorEmail')
const errorPhone = document.querySelector('#errorPhone')
const errorAddress = document.querySelector('#errorAddress')
const errorProfileImg = document.querySelector('#errorProfileImg')

let errorsVariables = [errorFirstName, errorLastName, errorEmail, errorPhone, errorAddress, errorProfileImg]


//HELPER FUNCTION TO VALIDATE EMAIL
function validateEmail(email) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
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

  //CHECK IF THERE IS NO CHANGE IN EMAIL
  if (email.value == originalEmail) {
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
        errorEmail.innerText = 'El email ingresado ya está registrado'
      }
    })
})
//REGULAR EXPRESSION TO CHECK IF IT IS PHONE
const myPhoneRegex = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/;

phone.addEventListener('blur', function (event) {
  errorPhone.classList.add('hidden')
  console.log(phone.value)
  console.log(myPhoneRegex.test(phone.value))
  if (phone.value == "") {
    return
  } else if (myPhoneRegex.test(phone.value)) {
    return
  } else {
    errorPhone.classList.remove('hidden')
    errorPhone.innerText = 'Ingresar un teléfono válido'
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
    reader.onload = function (event) {
      imagePreview.innerHTML = '<img src="' + event.target.result + '"/>';
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

  if (errors.length > 0) {
    console.log('NO SE MANDA EL FORM')
    event.preventDefault()
    return
  }

  console.log('SE MANDA EL FORM')
})