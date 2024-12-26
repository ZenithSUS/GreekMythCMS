document.addEventListener('DOMContentLoaded', async () =>{
    const urlParams = new URLSearchParams(window.location.search);
    const post_id = urlParams.get('id');
    if(!post_id){
        window.location.href = '../../navigate/posts.html';
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
            <h3>Title: ${data.title} by <a href='../../admin/users/view_user.html?id=${data.author}'>${data.username}</a></h3>
            <h3>Posted at: ${DateFormat(data.created_at)}</h3>
        `;
        postBody.innerHTML = `
            <h3>Content: ${data.content}</h3>
        `;
        postFooter.innerHTML = `
            <h4>Likes: ${data.likes} Dislikes: ${data.dislikes}</h4>
            <h4>Group Page: ${data.name !== null && data.name !== "" ? data.name : 'N/A'}</h4>
        `;

        // Get the back button and add an event
        document.getElementById('back').addEventListener('click', () => {
            window.location.href = '../../navigate/posts.html';
        });

        if(statusButton.id === "enable"){
            // Get the enable button and add an event
            document.querySelector('#enable').addEventListener('click', async () =>{
                if(confirm('Are you sure do you want to enable this post?')){
                    formData.append('type', 'enable')
                    const response = await editRequest(posts_url, post_id, formData, token);
                    if(response.status < 300) {
                        alert(response.message);
                        window.location.href = '../../navigate/posts.html';
                    } else {
                        console.error('Error deleting data:', response.message)
                    }
                }
            });
        } else {
            // Get the disable button and add an event
            document.querySelector('#disable').addEventListener('click', async () =>{
                if(confirm('Are you sure do you want to disable this post?')){
                    formData.append('type', 'disable');
                    const response = await editRequest(posts_url, post_id, formData, token);
                    if(response.status < 300) {
                        alert(response.message);
                        window.location.href = '../../navigate/posts.html';
                    } else {
                        console.error('Error deleting data:', response.message)
                    }
                }
            });
        }
        

        

        // Get the delete button and add an event
        document.getElementById('delete').addEventListener('click', async () =>{
            if(confirm('Are you sure do you want do delete this post?')){
                const response = await deleteRequest(posts_url, post_id, type, token);
                if(response.status < 300) {
                    alert(response.message);
                    window.location.href = '../../navigate/posts.html';
                } else {
                    console.error('Error deleting data:', response.message)
                }
            }
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