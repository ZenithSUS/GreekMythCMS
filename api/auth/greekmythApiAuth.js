const form = document.querySelector('form');
const url = "http://localhost/GreekMythApi/api/auth.php";

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    let formData = new FormData();
    
    if (form.Process.value == "Login") {
        formData.append('User', santizeInput(form.User.value));
        formData.append('Password', santizeInput(form.Password.value));
        formData.append('Process', santizeInput(form.Process.value));
    }

    if (form.Process.value == "Register") {
        let fileInput = document.getElementById('image');
        const file = fileInput.files[0];

        formData.append('username', santizeInput(form.username.value));
        formData.append('email', santizeInput(form.email.value));
        formData.append('password', santizeInput(form.password.value));
        formData.append('confirm_password', santizeInput(form.confirm_password.value));
        formData.append('image', file ? file : null);
        formData.append('Process', santizeInput(form.Process.value));
    }

        const response = await fetch(url, {
            method: "POST",
            body: formData, // Send the FormData with the request
        });

        const data = await response.json();
        console.log(data);

        if (data.status < 300) {
            if (form.Process.value == "Login") {
                localStorage.setItem('token', data.data.token);
                localStorage.setItem('user_id', data.data.user_id);
                localStorage.setItem('theme', data.data.theme);
                window.location.reload();
            }

            if (form.Process.value == "Register") {
                window.location.href = 'auth/login.html';
            }

        } else {
            checkErrors(data.error);
        }


});

const santizeInput = (input) => {
    return input.replace(/&/g, '&amp;')
                .replace(/>/g, "&gt;")
                .replace(/</g, '&lt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#39;');
};
