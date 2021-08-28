//API TO CHECK OLD PASSWORD
    //                                                                    TO-DO
//CAPTURING DOM ELEMENTS
const oldPassword = document.querySelector('#oldPassword');
const oldPasswordError = document.querySelector('#oldPasswordError');
const password = document.querySelector('#password');
const passwordError = document.querySelector('#passwordError');
const rePassword = document.querySelector('#rePassword');
const rePasswordError = document.querySelector('#rePasswordError');
const submitButton = document.querySelector('#login-button');
//ERRORS ARRAY
let errors = [];
//CHECKING PREVIOUS BACK-END ERRORS

//HELPER FUNCTIONS
function validateEmail(email) {
	var re = /\S+@\S+\.\S+/;
	return re.test(email);
};

function isEmpty(input) {
    if (input.value == '') {
        return true;
    }
    return false;
};
//REGEX TO CHECK IF PASSWORD IS STRONG  deberia hacerlo en un 'change'?
const strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')
const mediumPassword = new RegExp('((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))')

const passwordLength = new RegExp('(?=.{8,})') //PASSWORD MUST BE 8 CHARACTERS LONG
const passwordUpper = new RegExp('(?=.*[A-Z])') //PASSWORD MUST CONTAIN 1 UPPERCASE
const passwordLower = new RegExp('(?=.*[a-z])') //PASSWORD MUST CONTAIN 1 LOWERCASE
const passwordNumber = new RegExp('(?=.*[0-9])') //PASSWORD MUST CONTAIN 1 NUMBER
const passwordSpecialCharacter = new RegExp('(?=.*[!@#$%^&*])') //PASSWORD MUST CONTAIN 1 SPECIAL CHARACTER

//VALIDATIONS
    //OLD PASSWORD
oldPassword.addEventListener('click', e => {
    oldPassword.classList.remove('error')
    oldPasswordError.innerHTML = ''
    console.log(oldPasswordError)
})
oldPassword.addEventListener('blur', e => {
    if(isEmpty(oldPassword)) {
        oldPassword.classList.add('error')
        oldPasswordError.innerHTML = 'Debes completar tu contraseña actual'
    }
})

    //NEW PASSWORD
password.addEventListener('click', e => {
    password.classList.remove('error')
    passwordError.innerHTML = ''
})

password.addEventListener('blur', e => {
    if(isEmpty(password)) {
        password.classList.add('error')
        passwordError.innerHTML = 'Debes completar tu nueva contraseña'
    }
})

password.addEventListener('change', e => {
    if(isEmpty(password)) {
        password.classList.add('error')
        passwordError.innerHTML = 'Debes completar tu nueva contraseña'
    }
    if(mediumPassword.test(password.value)) {
        password.style.color = 'yellow'
    }
    if(strongPassword.test(password.value)) {
        password.style.color = 'green'
    }
})

    //RE-PASSWORD
rePassword.addEventListener('click', e => {
    rePassword.classList.remove('error')
    rePasswordError.innerHTML = ''
})

rePassword.addEventListener('blur', e => {
    if(isEmpty(rePassword)) {
        rePassword.classList.add('error')
        rePasswordError.innerHTML = 'Debes volver a escribir tu nueva contraseña'
    }
    if(rePassword.value != password.value) {
        rePassword.classList.add('error')
        rePasswordError.innerHTML = 'Las contraseñas no coinciden'
    }
})

    //SUBMIT
submitButton.addEventListener('click', e => {
    let errors = []

    if(isEmpty(oldPassword)) {
        oldPassword.classList.add('error')
        oldPasswordError.innerHTML = 'Debes completar tu contraseña actual'
        errors.push(oldPasswordError.value)
    }
    
    if(isEmpty(password)) {
        password.classList.add('error')
        passwordError.innerHTML = 'Debes completar tu nueva contraseña'
        errors.push(passwordError.value)
    }

    if(isEmpty(rePassword)) {
        rePassword.classList.add('error')
        rePasswordError.innerHTML = 'Debes volver a escribir tu nueva contraseña'
        errors.push(passwordError.value)
    } else if (rePassword.value != password.value) {
        rePassword.classList.add('error')
        rePasswordError.innerHTML = 'Las contraseñas no coinciden'
        errors.push(passwordError.value)
    }
    
    if (errors.length > 0) {
        e.preventDefault()
      }
})
