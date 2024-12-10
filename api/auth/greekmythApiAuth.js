const form = document.querySelector('form');
const url = "http://localhost/GreekMythApi/api/auth.php";

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    let formData = {};

    if(form.Process.value == "Login"){
        formData = {
            User: santizeInput(form.User.value),
            Password: santizeInput(form.Password.value),
            Process: santizeInput(form.Process.value)
        }
    }

    if(form.Process.value == "Register"){
        formData = {
            username: santizeInput(form.username.value),
            email: santizeInput(form.email.value),
            password: santizeInput(form.password.value),
            confirm_password: santizeInput(form.confirm_password.value),
            Process: santizeInput(form.Process.value)
        }
    } 
   
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    });

    console.log(formData)

    const data = await response.json();
    console.log(data);



    if(data.status < 300){
  
        if(form.Process.value == "Login"){
            localStorage.setItem('token', data.data.token);
            localStorage.setItem('user_id', data.data.user_id);
            window.location.reload();
        } 

        if(form.Process.value == "Register"){
            window.location.href = 'login.html';
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
}