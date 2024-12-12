const userDisplayData = (user) =>{

    const userTableData = (users) => {
        const tableBody = document.querySelector('tbody');
        tableBody.innerHTML = users.data.map(user => `
            <tr>
                <td>${user.username}</td>
                <td>${user.email}</td>
                <td>${user.totalFriends}</td>
                <td>${user.bio != "" ? user.bio : "Not bio"}</td>
                <td>${DateFormat(user.joined_at)}</td>
                <td class='user-options'>
                    <a class='edit' href='../admin/edit_user'>Edit</a>
                    <a class='view' href='../admin/view_user'>View</a>
                    <a class='delete' href='../admin/delete_user'>Delete</a>
                </td>
            </tr>    
            
        `).join(' ');
    }


    const DateFormat = (date) => {
        const newDate = new Date(date);
        dateFormat = newDate.toLocaleString('default', { month: 'short' }) + ' ' + newDate.getDate() + ' '  + newDate.getFullYear();
        return dateFormat;
    }

    userTableData(user)
}