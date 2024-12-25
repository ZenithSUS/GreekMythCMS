const commentDisplayData = (comments, page = currentPage) => {

    const commentsTableData = (comments) => {
        const tableBody = document.querySelector('tbody');
        tableBody.innerHTML = comments.map(comment => `
         <tr>
                <td>${comment.username}</td>
                <td>${elipsisContent(comment.content)}</td>
                <td>${DateFormat(comment.created_at)}</td>
                <td>${comment.likes}</td>
                <td>${comment.dislikes}</td>
                <td>${comment.name !== null ? comment.name : "N/A"}</td>
                <td class='user-options'>
                    <a class='view' href='../admin/comments/view_comment.html?id=${comment.comment_id}'>View</a>
                    <a class='${comment.status === 1 ? "disable" : "enable"}' data-id=${comment.comment_id}>${comment.status === 1 ? "Disable" : "Enable"}</a>
                    <a class='delete' data-id=${comment.comment_id}>Delete</a>
                </td>
            </tr>    
            
        `).join(' ');

        // Get the disable button and add an event
        const disableButton = document.querySelectorAll('.disable');
        disableButton.forEach(button => {
            button.addEventListener('click', async() => {
                if(confirm('Are you sure do you want to disable this comment?')){
                    const response = await editRequest(comments_url, button.dataset.id, {type: "disable"}, token);
                    if(response && response.status < 300) {
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
                 if(confirm('Are you sure do you want do enable this comment?')){
                     const response = await editRequest(comments_url, button.dataset.id, {type: "enable"}, token);
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
                if(confirm('Are you sure do you want do delete this comment?')){
                    const response = await deleteRequest(comments_url, button.dataset.id, token);
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

    const sortedComments = (comments) => {
        return comments.data.sort((a, b) => b.created_at - a.created_at)
    }

    const elipsisContent = (content) => {
        let elipsisText = ''
        elipsisText = content.length <= 15 ? content : content.substr(0, 30) + '...';
        return elipsisText;
    }

    const DateFormat = (date) => {
        const newDate = new Date(date);
        const dateFormat = newDate.toLocaleString('default', { month: 'short' }) + ' ' + newDate.getDate() + ' ' + newDate.getFullYear();
        return dateFormat;
    }

    if(comments && comments.status < 300){
        commentsTableData(sortedComments(comments))

        // Add pagination controls 
        const paginationContainer = document.querySelector('.pagination-comments'); 
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

        const totalPages = comments.totalPages; // Get total pages from API response

        if (currentPage === totalPages) { 
            nextButton.disabled = true;
        }
        paginationContainer.appendChild(nextButton);

        document.getElementById('pagination-number').innerHTML = `
            <h3>${currentPage} of ${totalPages}</h3>
        `;
    }
    
}