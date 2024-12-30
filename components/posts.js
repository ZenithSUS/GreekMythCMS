const postDisplayData = (posts, page = currentPage) => {

    const postTableData = (posts) => {
        const tableBody = document.querySelector('tbody');
        const formData = new FormData();
        const type = "delete";
        tableBody.innerHTML = posts.map(post => `
           <tr>
                <td>${post.username}</td>
                <td>${elipsisContent(post.title)}</td>
                <td class='post-content'>${elipsisContent(post.content ? post.content : "N/A")}</td>
                <td>${DateFormat(post.created_at)}</td>
                <td>${post.name != null ? post.name : "N/A"}</td>
                <td>${post.status === 1 ? "Permited" : "Disabled"}</td>
                <td class='user-options'>
                    <a class='view' href='admin/posts/view_post.html?id=${post.post_id}'>View</a>
                    <a class='${post.status === 1 ? "disable" : "enable"}' data-id=${post.post_id}>${post.status === 1 ? "Disable" : "Enable"}</a>
                    <a class='delete' data-id=${post.post_id}>Delete</a>
                </td>
            </tr>    
            
        `).join(' ');

        const modalChange = document.getElementById('modal-change');
        const modalMessage = document.getElementById('confirm-message');
        const confirmBtn = document.getElementById('confirmchangebtn');
        const cancelBtn = document.getElementById('cancelchangebtn');

        // Get the disable button and add an event
        const disableButton = document.querySelectorAll('.disable');
        disableButton.forEach(button => {
            button.addEventListener('click', () => {
                modalChange.style.display = 'block';
                modalMessage.textContent = 'Are you sure do you want to disable this post?';

                confirmBtn.addEventListener('click', async () => {
                    formData.append('type', 'disable');
                    const response = await editRequest(posts_url, button.dataset.id, formData, token);
                    if(response.status < 300) {
                        window.location.href = `navigate/posts.html?updated=${true}&message=${response.message}`;
                    } else {
                        console.error('Error deleting data:', response.message)
                    }
                });

                cancelBtn.addEventListener('click', () => {
                    modalChange.style.display = 'none';
                    modalMessage.textContent = '';
                });

            });
        });

         // Get the disable button and add an event
         const enableButton = document.querySelectorAll('.enable');
         enableButton.forEach(button => {
            button.addEventListener('click', () => {
                modalChange.style.display = 'block';
                modalMessage.textContent = 'Are you sure do you want to enable this post?';

                confirmBtn.addEventListener('click', async () => {
                    formData.append('type', 'enable');
                    const response = await editRequest(posts_url, button.dataset.id, formData, token);
                    if(response.status < 300) {
                        window.location.href = `navigate/posts.html?updated=${true}&message=${response.message}`;
                    } else {
                        console.error('Error deleting data:', response.message)
                    }
                });

                cancelBtn.addEventListener('click', () => {
                    modalChange.style.display = 'none';
                    modalMessage.textContent = '';
                });

            });
         });

        // Get the delete button and add an event
        const deleteButton = document.querySelectorAll('.delete')
        deleteButton.forEach(button => {
            button.addEventListener('click', () =>{
                modalChange.style.display = 'block';
                modalMessage.textContent = 'Are you sure do you want do delete this post?';

                confirmBtn.addEventListener('click', async() => {
                    const response = await deleteRequest(posts_url, button.dataset.id, type, token);
                    if(response.status < 300) {
                        window.location.href = `navigate/posts.html?updated=${true}&message=${response.message}`;
                    } else {
                        console.error('Error deleting data:', response.message)
                    }
                });
                
                cancelBtn.addEventListener('click', () => {
                    modalChange.style.display = 'none';
                    modalMessage.textContent = '';
                });
                
            });
        });
    }

    const handleNoData = () => {
        const tableBody = document.querySelector('tbody');
        tableBody.innerHTML = `
            <tr>
                <td colspan="7">No Posts Available</td>
            </tr>
        `;
    }

    const sortPosts = (posts) => {
        return posts.data.sort((a, b) => b.created_at - a.created_at)
    }

    const elipsisContent = (content) => {
        let elipsisText = " ";
        elipsisText = content.length <= 15 ? content : content.substr(0, 30) + '...';
        return elipsisText;
    }

    const DateFormat = (date) => {
        const newDate = new Date(date);
        const dateFormat = newDate.toLocaleString('default', { month: 'short' }) + ' ' + newDate.getDate() + ' ' + newDate.getFullYear();
        return dateFormat;
    }

    if(posts && posts.status < 300){
        if (posts.data.length === 0) {
            handleNoData();
            return;
        }

        const postData = sortPosts(posts);
        postTableData(postData);

        const paginationContainer = document.querySelector('.pagination-posts')
        paginationContainer.innerHTML = '';

        const prevButton = document.createElement('button');
        prevButton.textContent = 'Previous';
        prevButton.onclick = () => {
            if(currentPage > 1){
                currentPage--;
                fetchData(currentPage);
            }
        }

        if (page === 1) {
            prevButton.disabled = true;
        }
        paginationContainer.appendChild(prevButton);

        const nextButton = document.createElement('button');
        nextButton.textContent = 'Next';
        nextButton.onclick = () => {
            if(currentPage < totalPages){
                currentPage++;
                fetchData(currentPage);
            }
        }
        

        const totalPages = posts.totalPages;

        if(currentPage === totalPages){
            nextButton.disabled = true;
        }

        paginationContainer.appendChild(nextButton);

        document.getElementById('pagination-number').innerHTML = `
            <h3>Page ${currentPage} of ${totalPages}</h3>
        `;
    } else {
        handleNoData();
    }
}