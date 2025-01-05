const checkErrors = (data) => {
    const successMessage = document.querySelector('#successMessage');
    
    if(successMessage) {
        successMessage.textContent = '';
    }

    const errorMessage = document.querySelectorAll('.error-message');
    const validationMessage = document.querySelectorAll('.input-validation');

    errorMessage.forEach(message => message.remove());
    validationMessage.forEach(message => message.remove());
   
    for(const [field, message] of Object.entries(data)){
        const inputField = document.querySelector(`[name=${field}]`);
        
        if(inputField){
            const errorElement = document.createElement('span');
            errorElement.classList.add('error-message');
            errorElement.textContent = message;
            inputField.parentNode.appendChild(errorElement);
            

            inputField.addEventListener('input', () => {
                errorElement.remove();
            });
        } else {
            const inputField = document.querySelector(`.${field}`);
            const validationContainer = document.querySelector(`[id=${field}]`);
            const validElement = document.createElement('span');
            validElement.classList.add('input-validation');

            Object.values(message).forEach(e => {
                validElement.innerHTML += `<p>-${e}</p>`;
                validationContainer.appendChild(validElement);
            });
            
          
            inputField.addEventListener('input', () => { 
                validElement.innerHTML = ""; 
            });
        }
    }
}
