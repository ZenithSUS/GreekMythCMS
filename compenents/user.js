const userDisplayData = (user) =>{

    const userTableData = (users) => {
        const tableBody = document.querySelector('tbody');
        tableBody.innerHTML = users.data.map(user => `
            <tr>
                <td>${user.username}</td>
                <td>${user.email}</td>
                <td><img src="${user.profile_pic}" alt="No Image"></td>
                <td>${user.totalFriends}</td>
                <td>${user.bio != "" ? user.bio : "Not bio"}</td>
                <td>${DateFormat(user.joined_at)}</td>
                <td class='user-options'>
                    <a class='edit' href='../admin/users/edit_user.html' data-id=${user.user_id}>Edit</a>
                    <a class='view' href='../admin/users/view_user.html' data-id=${user.user_id}>View</a>
                    <a class='delete' href='../admin/users/delete_user.html' data-id=${user.user_id}>Delete</a>
                </td>
            </tr>    
            
        `).join(' ');

        // Add event listeners after the table is populated
        const editLinks = document.querySelectorAll('.edit');
        editLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const userId = link.dataset.id;
                window.location.href = `../admin/users/edit_user.html?id=${userId}`;
            });
        });
    }


    const DateFormat = (date) => {
        const newDate = new Date(date);
        dateFormat = newDate.toLocaleString('default', { month: 'short' }) + ' ' + newDate.getDate() + ' '  + newDate.getFullYear();
        return dateFormat;
    }

    userTableData(user)
}