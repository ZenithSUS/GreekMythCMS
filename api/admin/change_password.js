document.addEventListener('DOMContentLoaded', async () => {
    const admin = await fetchAdminData();
    if(admin) {
        console.log(admin)
         // Display the input value fetched
        const data = admin.data[0];
    
        document.getElementById('userImage').src = data.image_src;
        // Display user info
        document.getElementById('usernameDisplay').innerHTML = data.username;
        document.getElementById('emailDisplay').innerHTML = data.email;
    } else {
        console.error("Failed to fetch data", user.message);
    }

    const form = document.querySelector('.form-container form');
    const changeButton = document.getElementById('Change');

        form.addEventListener('submit', (e) => {
            e.preventDefault(); 
        });
    
    // If the user clicks change
    changeButton.addEventListener('click', async () => { 
        const newpassword = santizeInput(form.newpassword.value) ? santizeInput(form.newpassword.value) : "";
        const newconfirmpassword = santizeInput(form.newconfirmpassword.value) ? santizeInput(form.newconfirmpassword.value) : "";
        const type = "adminPass";

        const formData = new FormData();
        formData.append('newpassword', newpassword);
        formData.append('newconfirmpassword', newconfirmpassword)
        formData.append('type', type);    
        
        const response  = await editRequest(users_url, user_id, formData, token);
        console.log(response)
        if(response.status < 300){
            changeButton.disabled = true;
            window.location.href = `index.html?updated=${true}&message=${response.message}`;
        } else {
            checkErrors(response.error);
        }
    });

    // If the user clicks cancel
    document.getElementById('Cancel').addEventListener('click', () => {
        window.location.href = 'index.html';
    });
});