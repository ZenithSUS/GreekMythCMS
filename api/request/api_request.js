// Get Request
const getRequest = async (url, value, token) => {
    try {
        const response = await fetch(`${url}?id=${value}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                 Authorization: `Bearer ${token}`
            }
        });

        const data = await response.json();
        return data; 

    } catch (error) {
        console.error('Error fetching data:', error);
        return null; 
    }
};

// Put or Update Request
const editRequest = async (url, userId, formData, token) => {
    try {
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
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Post or View Request
const postRequest = async (url, token) => {
    const response = await fetch(url, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const data = await response.json();
    console.log(data);

}

// Delete Request 
const deleteRequest = (url, userId, token) => {
    
}