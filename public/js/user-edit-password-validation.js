//API TO CHECK OLD PASSWORD
    //                                                                    TO-DO
//CAPTURING DOM ELEMENTS
const oldPassword = document.querySelector('#oldPassword');
const oldPasswordError = document.querySelector('#oldPasswordError');
const password = document.querySelector('#password');
const passwordError = document.querySelector('#passwordError');
const rePassword = document.querySelector('#rePassword');
const rePasswordError = document.querySelector('#rePasswordError');
const button = document.querySelector('#login-button');
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

//VALIDATIONS
    //OLD PASSWORD
oldPassword.addEventListener('click', e => {
    oldPassword.classList.remove('error')
})
oldPassword.addEventListener('blur', e => {
    if(isEmpty(oldPassword)) {
        oldPassword.classList.add('error')
        oldPasswordError.innerHTML = 'Debes completar tu contraseña actual'
        errors.push(oldPasswordError.value)
    }
})
    //NEW PASSWORD
password.addEventListener('click', e => {
    password.classList.remove('error')
})
password.addEventListener('blur', e => {
    if(isEmpty(password)) {
        password.classList.add('error')
        passwordError.innerHTML = 'Debes completar tu nueva contraseña'
        errors.push(passwordError.value)
    }
})
    //RE-PASSWORD
rePassword.addEventListener('click', e => {
    rePassword.classList.remove('error')
})

rePassword.addEventListener('blur', e => {
    if(isEmpty(rePassword)) {
        rePassword.classList.add('error')
        rePasswordError.innerHTML = 'Debes volver a escribir tu nueva contraseña'
        errors.push(passwordError.value)
    }
    if(rePassword.value != password.value) {
        rePassword.classList.add('error')
        rePasswordError.innerHTML = 'Las contraseñas no coinciden'
        errors.push(passwordError.value)
    }
})
    //SUBMIT
submitButton.addEventListener('click', e => {
    if (errorsBitField !== 0) {
        e.preventDefault()
    }
})
