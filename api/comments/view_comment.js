document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const comment_id = urlParams.get('id');

    const comment = await getRequest(comments_url, comment_id, token);

    if(comment && comment.status < 300){
        console.log(comment);;
        const data = comment.data[0];
        const commentHeader = document.getElementById('comment-header');
        const commentBody = document.getElementById('comment-body');
        const commentFooter = document.getElementById('comment-footer');
        const commentButton = document.querySelector('.button');
        const statusButton = document.getElementById('statusButton');
        const formData = new FormData();
        const type = "delete";

        commentButton.innerHTML = data.status === 0 ? "Enable" : "Disable";
        statusButton.id = data.status === 0 ? "enable" : "disable";

        commentHeader.innerHTML = `
            <h4>Post Title: ${data.title}</h4>
            <h4>Posted at: ${DateFormat(data.created_at)}</h4>
        `;
        
        commentBody.innerHTML = `
            <div class='comment-contents'>
                <h3>Content: ${data.content}</h3>
            </div>
        `;

        commentFooter.innerHTML = `
            <h4>Likes: ${data.likes} Dislikes: ${data.dislikes}</h4>
            <h4>Group Page: ${data.name !== null ? data.name : "N/A"}</h4>
        `;

        const modalChange = document.getElementById('modal-change');
        const modalMessage = document.getElementById('confirm-message');
        const confirmBtn = document.getElementById('confirmchangebtn');
        const cancelBtn = document.getElementById('cancelchangebtn');

        // Get the back button and add an event
        document.getElementById('back').addEventListener('click', () => {
            window.location.href = 'navigate/comments.html';
        });

        if(statusButton.id === "enable"){
            // Get the enable button and add an event
            document.querySelector('#enable').addEventListener('click', () => {
                modalChange.style.display = 'block';
                modalMessage.textContent = 'Are you sure do you want to enable this comment?';

                confirmBtn.addEventListener('click', async () => {
                    formData.append('type', 'enable')
                    const response = await editRequest(comments_url, comment_id, formData, token);
                    if(response.status < 300) {
                        window.location.href = `navigate/comments.html?updated=${true}&message=${response.message}`;
                    } else {
                        console.error('Error deleting data:', response.message)
                    }
                });

                cancelBtn.addEventListener('click', () => {
                    modalChange.style.display = 'none';
                    modalMessage.textContent = '';
                });
            });
        } else {
            // Get the disable button and add an event
            document.querySelector('#disable').addEventListener('click', () => {
                modalChange.style.display = 'block';
                modalMessage.textContent = 'Are you sure do you want to disable this comment?';

                confirmBtn.addEventListener('click', async () => {
                    formData.append('type', 'disable')
                    const response = await editRequest(comments_url, comment_id, formData, token);
                    if(response.status < 300) {
                        window.location.href = `navigate/comments.html?updated=${true}&message=${response.message}`;
                    } else {
                        console.error('Error deleting data:', response.message)
                    }
                });

                cancelBtn.addEventListener('click', () => {
                    modalChange.style.display = 'none';
                    modalMessage.textContent = '';
                });
            });
        }
          

        // Get the delete button and add an event
        document.getElementById('delete').addEventListener('click', () => {
            modalChange.style.display = 'block';
                modalMessage.textContent = 'Are you sure do you want to delete this comment?';

            confirmBtn.addEventListener('click', async () => {
                const response = await deleteRequest(comments_url, comment_id, type, token);
                if(response.status < 300) {
                    window.location.href = `navigate/comments.html?updated=${true}&message=${response.message}`;
                } else {
                    console.error('Error deleting data:', response.message)
                }
            });

            cancelBtn.addEventListener('click', () => {
                modalChange.style.display = 'none';
                modalMessage.textContent = '';
            });
        });

    } else {    
        console.error('Error Fetching data:', comment.message);
    }
});

const DateFormat = (date) => {
    const newDate = new Date(date);
    const dateFormat = newDate.toLocaleString('default', { month : 'short'}) + ' ' + newDate.getDate() + ' ' + newDate.getFullYear();
    return dateFormat;
}