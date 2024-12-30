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


        const modalChange = document.getElementById('modal-change');
        const modalMessage = document.getElementById('confirm-message');
        const confirmBtn = document.getElementById('confirmchangebtn');
        const cancelBtn = document.getElementById('cancelchangebtn');

        // Get the delete Button and add an event
        const deleteButton = document.querySelectorAll('.delete');
        deleteButton.forEach(button => {
            button.addEventListener('click', () => {
                modalChange.style.display = 'block';
                modalMessage.textContent = 'Are you sure do you want do delete this user?';

                confirmBtn.addEventListener('click', async () => {
                    const response = await deleteRequest(users_url, button.dataset.id, type, token);
                    if(response.status < 300) {
                        window.location.href = `navigate/users.html?updated=${true}&message=${response.message}`;
                    } else {
                        console.error('Error deleting data:', response.message)
                    }
                });

                cancelBtn.addEventListener('click', () => {
                    modalChange.style.display = 'none';
                    modalMessage.textContent = '';
                });

            });
        })
    }

    const handleNoData = () => {
        const tableBody = document.querySelector('tbody');
        tableBody.innerHTML = `
            <tr>
                <td rowspan="6">No Users Available</td>
            </tr>
        `;
    }

    const DateFormat = (date) => {
        const newDate = new Date(date);
        const dateFormat = newDate.toLocaleString('default', { month: 'short' }) + ' ' + newDate.getDate() + ' '  + newDate.getFullYear();
        return dateFormat;
    }

    if(user && user.status < 300){
        if(user.data.length === 0){
            handleNoData();
            return;
        }

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