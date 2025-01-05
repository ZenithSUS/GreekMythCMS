document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('id'); 

    if(!userId) {
        window.location.href = 'navigate/users.html';
    }
  
    const user = await getRequest(users_url, userId, token);
  
    if (user && user.status < 300) {
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
    const changeButton = document.querySelector('#Change');

        form.addEventListener('submit', (e) => {
            e.preventDefault(); 
        });
    
    // If the user clicks change
    changeButton.addEventListener('click', async () => { 
        const username = santizeInput(form.usernameEdit.value) ? santizeInput(form.usernameEdit.value) : null;
        const email = santizeInput(form.emailEdit.value) ? santizeInput(form.emailEdit.value) : null;
        const type = "user";

        const formData = new FormData();
        formData.append('usernameEdit', username)
        formData.append('emailEdit', email);
        formData.append('type', type); 
    
        const response  = await editRequest(users_url, userId, formData, token);
        if(response.status < 300){
            changeButton.disabled = true;
            window.location.href = `navigate/users.html?updated=${true}&message=${response.message}`;
        } else {
            checkErrors(response.error);
        }
    });

    // If the user clicks cancel
    document.getElementById('Cancel').addEventListener('click', () => {
        window.location.href = 'navigate/users.html';
    });

  });
