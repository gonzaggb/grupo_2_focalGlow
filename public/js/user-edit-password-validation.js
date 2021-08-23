//REGULAR EXPRESSION TO CHECK IF THE EMAIL IS STRONG
const strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')
const mediumPassword = new RegExp('((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))')

const passwordLength = new RegExp('(?=.{8,})') //PASSWORD MUST BE 8 CHARACTERS LONG
const passwordUpper = new RegExp('(?=.*[A-Z])') //PASSWORD MUST CONTAIN 1 UPPERCASE
const passwordLower = new RegExp('(?=.*[a-z])') //PASSWORD MUST CONTAIN 1 LOWERCASE
const passwordNumber = new RegExp('(?=.*[0-9])') //PASSWORD MUST CONTAIN 1 NUMBER
const passwordSpecialCharacter = new RegExp('(?=.*[!@#$%^&*])') //PASSWORD MUST CONTAIN 1 SPECIAL CHARACTER


//CAPTURE DOM ELEMENTS
const oldPassword = document.querySelector('#oldPassword')
const password = document.querySelector('#password')
const rePassword = document.querySelector('#rePassword')
const form = document.querySelector('form.registry')


const errorOldPassword = document.querySelector('#errorOldPassword')
const errorPassword = document.querySelector('#errorPassword')
const errorPasswordLength = document.querySelector('#errorPasswordLength')
const errorPasswordUpperLower = document.querySelector('#errorPasswordUpperLower')
const errorPasswordNumberSpecial = document.querySelector('#errorPasswordNumberSpecial')

const errorRePassword = document.querySelector('#errorRePassword')


let errorsVariables = [errorOldPassword, errorPassword, errorRePassword]


//CHECK IF THERE ARE ANY BACKEND ERRORS
errorsVariables.forEach(element => {
  element.innerText !== '' ? element.classList.remove('hidden') : ''
})

//CHECK EACH ONE OF THE INPUTS


password.addEventListener('blur', function (event) {

  errorPassword.classList.add('hidden')

  if (password.value == "") {
    errorPassword.classList.remove('hidden')
    errorPassword.innerText = 'Ingresá una contraseña'
    return
  }
})

password.addEventListener('keyup', function (event) {

  if (this.value.length > 3) {
    if (strongPassword.test(password.value)) {
      errorPassword.classList.remove('hidden')
      errorPassword.style.color = 'green'
      errorPassword.innerText = 'Buen password!'
      errorPasswordLength.classList.add('hidden')
      errorPasswordUpperLower.classList.add('hidden')
      errorPasswordNumberSpecial.classList.add('hidden')
      return
    }

    let passwordLengthTest = passwordLength.test(password.value)
    let passwordUpperTest = passwordUpper.test(password.value)
    let passwordLowerTest = passwordLower.test(password.value)
    let passwordNumberTest = passwordNumber.test(password.value)
    let passwordSpecialCharacterTest = passwordSpecialCharacter.test(password.value)


    errorPassword.classList.remove('hidden')
    errorPassword.innerHTML = 'El password debe tener al menos:'
    errorPasswordLength.classList.remove('hidden')
    errorPasswordLength.innerHTML = '8 caracteres'
    errorPasswordUpperLower.classList.remove('hidden')
    errorPasswordUpperLower.innerHTML = '1 Mayúscula & 1 minúscula'
    errorPasswordNumberSpecial.classList.remove('hidden')
    errorPasswordNumberSpecial.innerHTML = '1 dígito & 1  caracater especial'

    passwordLengthTest ? errorPasswordLength.style.color = 'green' : errorPasswordLength.style.color = 'red'

    if (passwordUpperTest && passwordLowerTest) {
      errorPasswordUpperLower.style.color = 'green'
    } else if (passwordUpperTest || passwordLowerTest) {
      errorPasswordUpperLower.style.color = '#ffde59'
    } else {
      errorPasswordUpperLower.style.color = 'red'
    }

    if (passwordNumberTest && passwordSpecialCharacterTest) {
      errorPasswordNumberSpecial.style.color = 'green'
    } else if (passwordNumberTest || passwordSpecialCharacterTest) {
      errorPasswordNumberSpecial.style.color = '#ffde59'
    } else {
      errorPasswordNumberSpecial.style.color = 'red'
    }

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



form.addEventListener('submit', function (event) {
  let errors = []
  if (password.value == "") {
    errorPassword.classList.remove('hidden')
    errorPassword.innerText = 'Ingresá una contraseña'
    errors.push(errorPassword)
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
    errors.push(errorRePassword)
  }

  if (errors.length > 0) {
    console.log('NO SE MANDA EL FORM')
    event.preventDefault()
    return
  }

  console.log('SE MANDA EL FORM')
})