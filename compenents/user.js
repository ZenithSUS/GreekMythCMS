const userDisplayData = (user) =>{

    const userTableData = (users) => {
        const tableBody = document.querySelector('tbody');
        tableBody.innerHTML = users.data.map(user => `
            <tr>
                <td>${user.username}</td>
                <td>${user.email}</td>
                <td><img src="${user.profile_pic}" alt="No Image"></td>
                <td>${user.totalFriends}</td>
                <td>${user.bio != "" && user.bio != null ? user.bio : "No bio"}</td>
                <td>${DateFormat(user.joined_at)}</td>
                <td class='user-options'>
                    <a class='edit' href='../admin/users/edit_user.html?id=${user.user_id}'>Edit</a>
                    <a class='view' href='../admin/users/view_user.html?id=${user.user_id}'>View</a>
                    <a class='delete' data-id=${user.user_id}>Delete</a>
                </td>
            </tr>    
            
        `).join(' ');

        // Get the delete Button and add an event
        const deleteButton = document.querySelectorAll('.delete');
        deleteButton.forEach(button => {
            button.addEventListener('click', async () => {
                if(confirm('Are you sure do you want do delete this user?')){
                    const response = await deleteRequest(users_url, button.dataset.id, token);
                    if(response.status < 300) {
                        alert(response.message);
                        window.location.reload();
                    } else {
                        console.error('Error deleting data:', response.message)
                    }
                }
            });
        })
    }


    const DateFormat = (date) => {
        const newDate = new Date(date);
        dateFormat = newDate.toLocaleString('default', { month: 'short' }) + ' ' + newDate.getDate() + ' '  + newDate.getFullYear();
        return dateFormat;
    }

    userTableData(user)
}