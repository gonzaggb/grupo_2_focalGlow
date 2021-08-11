const ApiUrl = 'http://localhost:3000/api/users/'
const email = document.querySelector('#email')
console.log(email)
email.addEventListener('blur', function (event) {
    fetch(ApiUrl)
.then (function (response) {
    return response.json()
})
.then(function (data) {
   console.log(data)
   const isUser = data.data.some(user=>{
       user.email == email.value
       
   })
   console.log(isUser)
   console.log(typeof(data.data))
})
})


