const postDisplayData = (posts, page = currentPage) => {

    const postTableData = (posts) => {
        const tableBody = document.querySelector('tbody');
        tableBody.innerHTML = posts.map(post => `
           <tr>
                <td>${post.username}</td>
                <td>${elipsisContent(post.title)}</td>
                <td class='post-content'>${elipsisContent(post.content)}</td>
                <td>${DateFormat(post.created_at)}</td>
                <td>${post.name != null ? post.name : "N/A"}</td>
                <td>${post.status === 1 ? "Permited" : "Disabled"}</td>
                <td class='user-options'>
                    <a class='view' href='../admin/posts/view_post.html?id=${post.post_id}'>View</a>
                    <a class='${post.status === 1 ? "disable" : "enable"}' data-id=${post.post_id}>${post.status === 1 ? "Disable" : "Enable"}</a>
                    <a class='delete' data-id=${post.post_id}>Delete</a>
                </td>
            </tr>    
            
        `).join(' ');

        // Get the disable button and add an event
        const disableButton = document.querySelectorAll('.disable');
        disableButton.forEach(button => {
            button.addEventListener('click', async() => {
                if(confirm('Are you sure do you want to disable this post?')){
                    const response = await editRequest(posts_url, button.dataset.id, {type: "disable"}, token);
                    if(response.status < 300) {
                        alert(response.message);
                        window.location.reload();
                    } else {
                        console.error('Error deleting data:', response.message)
                    }
                }
            });
        });

         // Get the disable button and add an event
         const enableButton = document.querySelectorAll('.enable');
         enableButton.forEach(button => {
             button.addEventListener('click', async() => {
                 if(confirm('Are you sure do you want do enable this post?')){
                     const response = await editRequest(posts_url, button.dataset.id, {type: "enable"}, token);
                     if(response.status < 300) {
                         alert(response.message);
                         window.location.reload();
                     } else {
                         console.error('Error deleting data:', response.message)
                     }
                 }
             });
         });

        // Get the delete button and add an event
        const deleteButton = document.querySelectorAll('.delete')
        deleteButton.forEach(button => {
            button.addEventListener('click', async () =>{
                if(confirm('Are you sure do you want do delete this post?')){
                    const response = await deleteRequest(posts_url, button.dataset.id, token);
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
    }
    
}