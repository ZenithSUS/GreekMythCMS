document.addEventListener('DOMContentLoaded', async () => {
    const admin = await fetchAdminData();
    if(admin) {
        console.log(admin)
         // Display the input value fetched
        const data = admin.data[0];
      
        document.getElementById('usernameEdit').value = data.username;
        document.getElementById('emailEdit').value = data.email;
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
        let formData = {}
        const username = santizeInput(form.usernameEdit.value) ? santizeInput(form.usernameEdit.value) : null;
        const email = santizeInput(form.emailEdit.value) ? santizeInput(form.emailEdit.value) : null;
        const type = "admin";
        formData = {
            'usernameEdit': username,
            'emailEdit': email,
            'type': type
        }; 

        const response  = await editRequest(users_url, user_id, formData, token);
        if(response.status < 300){
            alert(response.message);
            window.location.href = '../../index.html';
        } else {
            checkErrors(response.error);
        }
    });

    // If the user clicks cancel
    document.getElementById('Cancel').addEventListener('click', () => {
        window.location.href = '../../index.html';
    });
});