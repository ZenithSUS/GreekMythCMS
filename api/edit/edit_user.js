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
        console.error("Failed to fetch data". data.message);
    }

    const form = document.querySelector('.form-container form');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault(); 
            // Create a FormData object to collect form data
            const formData = new FormData(form); 

            // Access individual form fields
            const username = formData.get('usernameEdit'); 
            const email = formData.get('emailEdit');

            if (form.Change) {
            }

            if (form.Cancel) {
                window.location.href = "../../index.html";
            }
        });
    }
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