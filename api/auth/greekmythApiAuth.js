// URL for the API endpoint
const url = "http://localhost/GreekMythApi/api/auth.php";

// Elements of every authorization pages
const loginForm = document.querySelector('#loginForm');
const regForm = document.querySelector('#registerForm');
const recoverForm = document.querySelector('#recoverForm');
const sendCode = document.querySelector('#sendCode');
const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');
const sendCodeBtn = document.getElementById('sendCodeBtn');
const verifyCodeBtn = document.getElementById('verifyCodeBtn');
const verifyEmailBtn = document.querySelector('#verifyEmailBtn');
const changeEmailBtn = document.querySelector('#changeEmailBtn');
const recoverBtn = document.getElementById('recoverBtn');
const successMessage = document.getElementById('successMessage');

// Create FormData to pass values to the API on backend
let formData = new FormData();
let emailVerified = false;

// Sanitize input to prevent XSS
const santizeInput = (input) => {
    return input.replace(/&/g, '&amp;')
                .replace(/>/g, "&gt;")
                .replace(/</g, '&lt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#39;');
};

// If the login button is present in the document
if(loginBtn) {
    loginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Append form data for login
        formData.append('User', santizeInput(loginForm.User.value));
        formData.append('Password', santizeInput(loginForm.Password.value));
        formData.append('Process', santizeInput(loginBtn.value));
        loginBtn.disabled = true;
        submitData(formData, loginBtn);
    });
}

// If the register button is present in the document
if(registerBtn){
    registerBtn.addEventListener('click', (e) => {
        e.preventDefault();
        let fileInput = document.getElementById('image');
        const file = fileInput.files[0];
    
        // Append form data for registration
        formData.append('username', santizeInput(regForm.username.value));
        formData.append('email', santizeInput(regForm.email.value));
        formData.append('password', santizeInput(regForm.password.value));
        formData.append('confirm_password', santizeInput(regForm.confirm_password.value));
        formData.append('image', file ? file : null);
        formData.append('Process', santizeInput(registerBtn.value));
        formData.append('emailVerified', emailVerified);
        submitData(formData, registerBtn);
    });
}

// If the verify code button is present in the document
if(verifyCodeBtn){
    verifyCodeBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        const code = document.getElementById('code').value;
        formData.append('verification_code', code);
        
        // Append form data based on the form type (register/recover)
        if(regForm){
            formData.append('email', santizeInput(regForm.email.value));
            formData.append('type', 'register');
        }
        if(recoverForm){
            formData.append('email', santizeInput(recoverForm.email.value));
            formData.append('type', 'recover');
        }
        formData.append('Process', verifyCodeBtn.value);
        
        // Send the data to the API
        const response = await fetch(url, {
            method: "POST",
            body: formData,
        });

        const data = await response.json();
        console.log(data);

        // Handle the response
        if (data.status < 300) {
            emailVerified = true;
            successMessage.textContent = data.message;
        } else {
            emailVerified = false;
            checkErrors(data.error);
        }
    });
}

// If the send code button is present in the document
if(sendCodeBtn){
    sendCodeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Append form data based on the form type (register/recover)
        if(regForm){
            formData.append('email', santizeInput(regForm.email.value));
            formData.append('type', 'register');
        }
        if(recoverForm){
            formData.append('email', santizeInput(recoverForm.email.value));
            formData.append('type', 'recover');
        }
    
        formData.append('Process', santizeInput(sendCodeBtn.value))
        submitData(formData, sendCodeBtn);
        startTimer(sendCodeBtn, 60);
    });
}

// If the recover button is present in the document
if(recoverBtn){
    recoverBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Append form data for password recovery
        formData.append('email', santizeInput(recoverForm.email.value));
        formData.append('password', santizeInput(recoverForm.password.value));
        formData.append('confirm_password', santizeInput(recoverForm.confirm_password.value));
        formData.append('emailVerified', emailVerified);
        formData.append('Process', santizeInput(recoverBtn.value));
        submitData(formData, recoverBtn);
    });
}

// Add event listener for dynamically created 'verifyEmailBtn'
document.addEventListener('click', (e) => {
    if (e.target && e.target.id === 'verifyEmailBtn') {
        e.preventDefault();

        // Ensure only 'verifyEmailBtn' is processed
        if (e.target.id === 'verifyEmailBtn') {
            formData.append('email', santizeInput(recoverForm.email.value));
            formData.append('Process', santizeInput(e.target.value));
            submitData(formData, e.target);
        }
    }

    if (e.target && e.target.id === 'changeEmailBtn') {
        e.preventDefault();

        // Ensure only 'changeEmailBtn' is processed
        if (e.target.id === 'changeEmailBtn') {
            e.target.textContent = 'Check Email';
            e.target.id = 'verifyEmailBtn';
            recoverForm.email.disabled = false;
            recoverForm.code.disabled = true;
            recoverForm.password.disabled = true;
            recoverForm.confirm_password.disabled = true;
            recoverForm.recoverBtn.disabled = true;
            sendCodeBtn.disabled = true;
            verifyCodeBtn.disabled = true;
            successMessage.textContent = '';
        }
    }
});

// Function to start a timer for the send code button
const startTimer = (button, duration) => {
    let timeRemaining = duration;
    const timerInterval = setInterval(() => {
        if(timeRemaining <= 0) {
            clearInterval(timerInterval);
            button.disabled = false;
            button.textContent = 'Send Code';
        } else {
            button.disabled = true;
            button.textContent = `Send Again in ${timeRemaining}s`;
            timeRemaining--;
        }
    }, 1000);
};

// Function to submit data to the API
const submitData = async (formData, button) => {
    const response = await fetch(url, {
        method: "POST",
        body: formData,
    });

    const data = await response.json();
    console.log(data);

    // Handle the response
    if (data.status < 300) {
        
        if (button === loginBtn) {
            localStorage.setItem('token', data.data.token);
            localStorage.setItem('user_id', data.data.user_id);
            localStorage.setItem('theme', data.data.theme);
            localStorage.setItem('font-style', data.data.font_style);
            window.location.href = `index.html?updated=${true}&message=${data.message}`;
        }

        if (button === registerBtn) {
            window.location.href = `auth/login.html?updated=${true}&message=${data.message}`;
        }

        if(button === recoverBtn){
            window.location.href = `auth/login.html?updated=${true}&message=${data.message}`;
        }
        
        if(button === verifyEmailBtn){
            document.getElementById('successMessage').textContent = data.message;
            verifyEmailBtn.textContent = 'Change Email';
            verifyEmailBtn.id = 'changeEmailBtn';
            
            const errorMessage = document.querySelectorAll('.error-message');
            errorMessage.forEach(message => message.remove());
            sendCodeBtn.disabled = false;
            verifyCodeBtn.disabled = false;
            recoverForm.email.disabled = true;
            recoverForm.code.disabled = false;
            recoverForm.password.disabled = false;
            recoverForm.confirm_password.disabled = false;
            recoverForm.recoverBtn.disabled = false;
        }

        if(button === sendCodeBtn){
            successMessage.textContent = data.message;
        }

        if(button === recoverBtn){
            window.location.href `auth/login.html?updated=${true}&message=${data.message}`;
        }

    } else {
        button.disabled = false;
        checkErrors(data.error);
    }

}
