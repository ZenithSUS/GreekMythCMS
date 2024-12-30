document.addEventListener('DOMContentLoaded', async () =>{
    const urlParams = new URLSearchParams(window.location.search);
    const post_id = urlParams.get('id');
    if(!post_id){
        window.location.href = 'navigate/posts.html';
    }

    const post = await getRequest(posts_url, post_id, token);

    if(post && post.status < 300) {
        console.log(post)
        // Get the Id of each post elements
        const data = post.data[0];
        const postHeader = document.getElementById('post-header');
        const postBody = document.getElementById('post-body');
        const postFooter = document.getElementById('post-footer');
        const postButton = document.querySelector('.button');
        const statusButton = document.getElementById('statusButton');
        const formData = new FormData();
        const type = "delete";

        postButton.innerHTML = data.status === 0 ? "Enable" : "Disable";
        statusButton.id = data.status === 0 ? "enable" : "disable";

        // Display The data 
        postHeader.innerHTML = `
            <h3>Title: ${data.title} by <a href='admin/users/view_user.html?id=${data.author}'>${data.username}</a></h3>
            <h3>Posted at: ${DateFormat(data.created_at)}</h3>
        `;
        postBody.innerHTML = `
            <h3>Content: ${data.content ? data.content : "N/A"}</h3>
        `;
        postFooter.innerHTML = `
            <h4>Likes: ${data.likes} Dislikes: ${data.dislikes}</h4>
            <h4>Group Page: ${data.name !== null && data.name !== "" ? data.name : 'N/A'}</h4>
        `;

        const modalChange = document.getElementById('modal-change');
        const modalMessage = document.getElementById('confirm-message');
        const confirmBtn = document.getElementById('confirmchangebtn');
        const cancelBtn = document.getElementById('cancelchangebtn');

        // Get the back button and add an event
        document.getElementById('back').addEventListener('click', () => {
            window.location.href = 'navigate/posts.html';
        });

        if(statusButton.id === "enable"){
            // Get the enable button and add an event
            document.querySelector('#enable').addEventListener('click', () =>{
                modalChange.style.display = 'block';
                modalMessage.textContent = 'Are you sure do you want to enable this post?';

                confirmBtn.addEventListener('click', async () => {
                    formData.append('type', 'enable')
                    const response = await editRequest(posts_url, post_id, formData, token);
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
        } else {
            // Get the disable button and add an event
            document.querySelector('#disable').addEventListener('click',() => {
                modalChange.style.display = 'block';
                modalMessage.textContent = 'Are you sure do you want to disable this post?';

                confirmBtn.addEventListener('click', async () => {
                    formData.append('type', 'disable');
                    const response = await editRequest(posts_url, post_id, formData, token);
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
        }
        

        // Get the delete button and add an event
        document.getElementById('delete').addEventListener('click', () =>{
            modalChange.style.display = 'block';
            modalMessage.textContent = 'Are you sure do you want to delete this post?';

            confirmBtn.addEventListener('click', async() => {
                const response = await deleteRequest(posts_url, post_id, type, token);
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

    } else {
        console.error('Failed to fetch:', post.status);
    }

});

const DateFormat = (date) => {
    const newDate = new Date(date);
    const dateFormat = newDate.toLocaleString('default', { month: 'short'}) + ' ' + newDate.getDate() + ' ' + newDate.getFullYear(); 
    return dateFormat;
}