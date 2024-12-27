// api/users/view_user.js
document.addEventListener('DOMContentLoaded', async () => {
    // Get the user ID from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const user_id = urlParams.get('id');

    if(!user_id) {
        window.location.href = 'navigate/users.html';
    }

    // Fetch user data from the API
    const user = await getRequest(users_url, user_id, token);

    // Check if the request was successful
    if(user && user.status < 300) {
        console.log(user)
        // Display the input value fetched
        const data  = user.data[0];
        document.getElementById('userImage').src = data.profile_pic;
        document.getElementById('usernameDisplay').innerHTML = data.username;
        document.getElementById('emailDisplay').innerHTML = data.email;
        document.getElementById('bioDisplay').innerHTML = data.bio !== "" && data.bio != null ? data.bio : "No bio";
        document.getElementById('joinedDisplay').innerHTML = DateFormat(data.joined_at);
        document.getElementById('totalPosts').innerHTML = data.totalPosts;
        document.getElementById('totalComments').innerHTML = data.totalComments;
        document.getElementById('totalGroups').innerHTML = data.totalGroups;
        document.getElementById('totalFriends').innerHTML = data.totalFriends;
        // Create the pie chart
        createPieChart(data)
    } else {
        console.error('Fetch failed status:', user.message);
    }

    // Get the edit Button and add an event
    document.getElementById('edit-user').addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = `admin/users/edit_user.html?id=${user_id}`;
    });

    // Get the delete Button and add an event
    document.getElementById('delete-user').addEventListener('click', async () => {
        if(confirm('Are you sure do you want to delete this user?')){
            const response = await deleteRequest(users_url, user_id, token);
            if(response.status < 300) {
                console.log(response)
                alert(response.message);
                window.location.href = 'navigate/users.html';
            } else {
                console.error('Error deleting data:', response.message)
            }
        }
    })

    // Get the Go Back button and add an event 
    document.getElementById('back').addEventListener('click', (e) =>{
        e.preventDefault();
        window.location.href = 'navigate/users.html';
    })
});

// Function to format the date
const DateFormat = (date) => {
    const newDate = new Date(date);
    dateFormat = newDate.toLocaleString('default', { month: 'short' }) + ' ' + newDate.getDate() + ' ' + newDate.getFullYear();
    return dateFormat;
}

// Function to create the pie chart
function createPieChart(data) {
    const total = data.totalPosts + data.totalComments + data.totalFriends + data.totalGroups;
    // Calculate the percentage of each category and filter out categories with 0 value
    const percentages = [
        { value: data.totalPosts, color: 'var(--posts-color)' },
        { value: data.totalComments, color: 'var(--comments-color)' },
        { value: data.totalFriends, color: 'var(--friends-color)' },
        { value: data.totalGroups, color: 'var(--groups-color)' }
    ].filter(item => item.value > 0);

    // Calculate the angle for each category
    let currentAngle = 0;
    const pieChart = document.querySelector('.pie-chart');
    // Create the gradient parts of each category
    const gradientParts = percentages.map(item => {
        const angle = (item.value / total) * 360;
        // Create the gradient part with the color and angle
        const gradientPart = `${item.color} ${currentAngle}deg ${currentAngle + angle}deg`;
        currentAngle += angle;
        return gradientPart;
    }).join(', ');


    // Create the conic gradient with the calculated percentages and colors
    pieChart.style.background = `conic-gradient(${gradientParts})`;
}
