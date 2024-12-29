const userDisplayData = (user, page = currentPage) =>{

    const userTableData = (users) => {
        const tableBody = document.querySelector('tbody');
        const type = "user";

        tableBody.innerHTML = users.data.map(user => `
            <tr>
                <td>${user.username}</td>
                <td>${user.email}</td>
                <td><img src="${user.profile_pic}" alt="No Image"></td>
                <td>${user.totalFriends}</td>
                <td>${user.bio != "" && user.bio != null ? user.bio : "No bio"}</td>
                <td>${DateFormat(user.joined_at)}</td>
                <td class='user-options'>
                    <a class='edit' href='admin/users/edit_user.html?id=${user.user_id}'>Edit</a>
                    <a class='view' href='admin/users/view_user.html?id=${user.user_id}'>View</a>
                    <a class='delete' data-id=${user.user_id}>Delete</a>
                </td>
            </tr>    
            
        `).join(' ');

        // Get the delete Button and add an event
        const deleteButton = document.querySelectorAll('.delete');
        deleteButton.forEach(button => {
            button.addEventListener('click', async () => {
                if(confirm('Are you sure do you want do delete this user?')){
                    const response = await deleteRequest(users_url, button.dataset.id, type, token);
                    if(response.status < 300) {
                        window.location.href = `navigate/users.html?updated=${true}&message=${response.message}`;
                    } else {
                        console.error('Error deleting data:', response.message)
                    }
                }
            });
        })
    }


    const DateFormat = (date) => {
        const newDate = new Date(date);
        const dateFormat = newDate.toLocaleString('default', { month: 'short' }) + ' ' + newDate.getDate() + ' '  + newDate.getFullYear();
        return dateFormat;
    }

    if(user && user.status < 300){
        userTableData(user);

        // Add pagination controls 
        const paginationContainer = document.querySelector('.pagination-users'); 
        paginationContainer.innerHTML = ''; // Clear previous pagination

        // Create "Previous" button
        const prevButton = document.createElement('button');
        prevButton.textContent = 'Previous';
        prevButton.onclick = () => { 
            if(currentPage > 1){
                currentPage++;
                fetchData(currentPage); 
            }
        };

        if (page === 1) {
            prevButton.disabled = true;
        }
        paginationContainer.appendChild(prevButton);

    
        const nextButton = document.createElement('button');
        nextButton.textContent = 'Next';
        nextButton.onclick = () => { 
            fetchData(page + 1); 
        };
        const totalPages = user.totalPages; // Get total pages from API response


        if (currentPage === totalPages) { 
            nextButton.disabled = true;
        }
        paginationContainer.appendChild(nextButton);

        document.getElementById('pagination-number').innerHTML = `
            <h3>Page ${currentPage} of ${totalPages}</h3>
        `;
    }
    
}