window.addEventListener('load', function () {

    const registerForm = document.querySelector('#register');
    const inputCategory = registerForm.querySelector('#categoryId');
    const inputName = registerForm.querySelector('#productName');
    const inputQuantity = registerForm.querySelector('#productQuantity');
    const inputSource = registerForm.querySelector('#productSource');
    const inputMaterial = registerForm.querySelector('#productMaterial');
    const inputOptics = registerForm.querySelector('#productOptics');
    const inputPower = registerForm.querySelector('#productPower');
    const inputPrice = registerForm.querySelector('#precio');
    const inputText = registerForm.querySelector('#textArea');

    
    registerForm.addEventListener('submit', (e)=>{  
        
        
        console.log(productName)
        e.preventDefault();
        
    })
    
   

})
