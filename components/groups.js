const groupDisplayData = (groups, page = currentPage) => {

    const groupsTableData = (groups) => {
        const tableBody = document.querySelector('tbody');
        const formData = new FormData();
        const type = "delete";

        tableBody.innerHTML = groups.map(group => `
           <tr>
                <td>${group.name}</td>
                <td>${elipsisContent(group.description)}</td>
                <td>${group.creator === "Default" ? group.creator = "Admin" : group.username}</td>
                <td><img src="${group.image_url}" alt="No Image"></td>
                <td>${group.status === 1 ? "Permited" : "Disabled"}</td>
                <td class='user-options'>
                    <a class='view' href='admin/groups/view_group.html?id=${group.greek_id}'>View</a>
                    <a class='${group.status === 1 ? "disable" : "enable"}' data-id=${group.greek_id}>${group.status === 1 ? "Disable" : "Enable"}</a>
                    <a class='delete' data-id=${group.greek_id}>Delete</a>
                </td>
            </tr>    
            
        `).join(' ');

        const disableButton = document.querySelectorAll('.disable');
        disableButton.forEach(button => {
            button.addEventListener('click', async () => {
                if(confirm('Are you sure do you want to disable this group?')){
                    formData.append('type', 'disable');
                    const response = await editRequest(groups_url, button.dataset.id, formData, token);
                    if(response.status < 300) {
                        window.location.href = `navigate/groups.html?updated=${true}&message=${response.message}`;
                    } else {
                        console.error('Error deleting data:', response.message)
                    }
                }
            });
        })

        const enableButton = document.querySelectorAll('.enable');
        enableButton.forEach(button => {
            button.addEventListener('click', async () => {
                if(confirm('Are you sure do you want to enable this group?')){
                    formData.append('type', 'enable');
                    const response = await editRequest(groups_url, button.dataset.id, formData, token);
                    if(response.status < 300) {
                        window.location.href = `navigate/groups.html?updated=${true}&message=${response.message}`;
                    } else {
                        console.error('Error deleting data:', response.message)
                    }
                }
            });
        })

        const deleteButton = document.querySelectorAll('.delete');
        deleteButton.forEach(button => {
            button.addEventListener('click', async () => {
                if(confirm('Are you sure do you want to delete this group?')) {
                    const response = await deleteRequest(groups_url, button.dataset.id, type, token);
                    if(response.status < 300){
                        window.location.href = `navigate/groups.html?updated=${true}&message=${response.message}`;
                    } else {
                        console.error('Error deleting data:', response.message)
                    }
                }
            });
        }); 
    }

    const elipsisContent = (content) => {
        let elipsisText = " ";
        elipsisText = content.length <= 15 ? content : content.substr(0, 30) + '...';
        return elipsisText;
    }

    const sortGroups = (groups) => {
        return groups.data.sort((a,b) => a.name.localeCompare(b.name));
    }

    if(groups && groups.status < 300){
        const groupdata = sortGroups(groups)
        groupsTableData(groupdata)

        // Add pagination controls 
        const paginationContainer = document.querySelector('.pagination-groups'); 
        paginationContainer.innerHTML = ''; // Clear previous pagination

        // Create "Previous" button
        const prevButton = document.createElement('button');
        prevButton.textContent = 'Previous';
        prevButton.onclick = () => { 
            if (currentPage > 1) {
                currentPage--;
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
            if (currentPage < totalPages) {
                currentPage++;
                fetchData(currentPage); 
            }
        };

        const totalPages = groups.totalPages; // Get total pages from API response

        if (currentPage === totalPages) { 
            nextButton.disabled = true;
        }
        paginationContainer.appendChild(nextButton);

        document.getElementById('pagination-number').innerHTML = `
            <h3>Page ${currentPage} of ${totalPages}</h3>
        `;
    }
   
}