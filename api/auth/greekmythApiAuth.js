const loginForm = document.querySelector('#loginForm');
const regForm = document.querySelector('#registerForm');
const sendCode = document.querySelector('#sendCode');
const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');
const sendCodeBtn = document.getElementById('sendCodeBtn');
const verifyCodeBtn = document.getElementById('verifyCodeBtn');
const url = "http://localhost/GreekMythApi/api/auth.php";

let formData = new FormData();
let emailVerified = false;

const santizeInput = (input) => {
    return input.replace(/&/g, '&amp;')
                .replace(/>/g, "&gt;")
                .replace(/</g, '&lt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#39;');
};

if(loginBtn) {
    loginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        formData.append('User', santizeInput(loginForm.User.value));
        formData.append('Password', santizeInput(loginForm.Password.value));
        formData.append('Process', santizeInput(loginBtn.value));
        loginBtn.disabled = true;
        submitData(formData, loginBtn);
    });
}


if(registerBtn){
    registerBtn.addEventListener('click', (e) => {
        e.preventDefault();
        let fileInput = document.getElementById('image');
        const file = fileInput.files[0];
    
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


if(verifyCodeBtn){
    verifyCodeBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        const code = document.getElementById('code').value;
        formData.append('verification_code', code);
        formData.append('Process', verifyCodeBtn.value)
        
        const response = await fetch(url, {
            method: "POST",
            body: formData,
        });

        const data = await response.json();
        console.log(data);

        if (data.status < 300) {
            emailVerified = true;
            document.getElementById('successMessage').textContent = data.message;
        } else {
            emailVerified = false;
            checkErrors(data.error);
        }
    });
}


if(sendCodeBtn){
    sendCodeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        formData.append('email', santizeInput(regForm.email.value));
        formData.append('Process', santizeInput(sendCodeBtn.value))
        submitData(formData, sendCodeBtn);
        startTimer(sendCodeBtn, 60);
    });
}

const startTimer = (button, duration) => {
    let timeRemaining = duration;
    button.disabled = true;
    const timerInterval = setInterval(() => {
        if(timeRemaining <= 0) {
            clearInterval(timerInterval);
            button.disabled = false;
            button.textContent = 'Send Code';
        } else {
            button.textContent = `Send Again in ${timeRemaining}s`;
            timeRemaining--;
        }
    }, 1000);
};

const submitData = async (formData, button) => {
    const response = await fetch(url, {
        method: "POST",
        body: formData,
    });

    const data = await response.json();
    console.log(data);

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

        if(button === sendCodeBtn){
            document.getElementById('successMessage').textContent = data.message;
        }

    } else {
        button.disabled = false;
        checkErrors(data.error);
    }

}
