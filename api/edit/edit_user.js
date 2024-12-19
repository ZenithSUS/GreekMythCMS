document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('id'); 
  
    const user = await getRequest(users_url, userId, token);
  
    if (user) {
        console.log(user)
        // Display the input value fetched
        document.getElementById('usernameEdit').value = user.data[0].username;
        document.getElementById('emailEdit').value = user.data[0].email;
        document.getElementById('userImage').src = user.data[0].profile_pic;
        // Display user info
        document.getElementById('usernameDisplay').innerHTML = user.data[0].username;
        document.getElementById('emailDisplay').innerHTML = user.data[0].email;
    } else {
        console.error("Failed to fetch data", user.message);
    }

    const form = document.querySelector('.form-container form');
    const changeButton = document.getElementById('Change');

        form.addEventListener('submit', (e) => {
            e.preventDefault(); 
        });
    
    // If the user clicks change
    changeButton.addEventListener('click', () => { 
        let formData = {}
        const username = santizeInput(form.usernameEdit.value) ? santizeInput(form.usernameEdit.value) : null;
        const email = santizeInput(form.emailEdit.value) ? santizeInput(form.emailEdit.value) : null;
        formData = {'usernameEdit': username,
                    'emailEdit': email
                }; 
        
        console.log(username);

        editRequest(users_url, userId, formData, token);
    });

    // If the user clicks cancel
    document.getElementById('Cancel').addEventListener('click', () => {
        window.location.href = '../../index.html';
    });

  });

const getRequest = async (url, value, token) => {
    try {
        const response = await fetch(`${url}?id=${value}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                 Authorization: `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data; 

    } catch (error) {
        console.error('Error fetching data:', error);
        return null; 
    }
};

const editRequest = async (url, userId, formData, token) => {

    const response = await fetch(`${url}?id=${userId}`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData)
    });

    const data = await response.json();
    console.log(data);
    if(data.status < 300){
        alert(data.message);
        window.location.href = '../../navigate/users.html';
    } else {
        checkErrors(data.error)
    }
}

