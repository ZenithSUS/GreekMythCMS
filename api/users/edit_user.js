document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('id'); 
  
    const user = await getRequest(users_url, userId, token);
  
    if (user) {
        console.log(user)
        // Display the input value fetched
        const data  = user.data[0];
        document.getElementById('usernameEdit').value = data.username;
        document.getElementById('emailEdit').value = data.email;
        document.getElementById('userImage').src = data.profile_pic;
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
        formData = {'usernameEdit': username,
                    'emailEdit': email }; 

        const response  = await editRequest(users_url, userId, formData, token);
        if(response.status < 300){
            alert(response.message);
            window.location.href = '../../navigate/users.html';
        } else {
            checkErrors(response.error);
        }
    });

    // If the user clicks cancel
    document.getElementById('Cancel').addEventListener('click', () => {
        window.location.href = '../../navigate/users.html';
    });

  });
