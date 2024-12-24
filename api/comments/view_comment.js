document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const comment_id = urlParams.get('id');

    const comment = await getRequest(comments_url, comment_id, token);

    if(comment && comment.status < 300){
        console.log(comment);
        const data = comment.data[0];
        const commentHeader = document.getElementById('comment-header');
        const commentBody = document.getElementById('comment-body');
        const commentFooter = document.getElementById('comment-footer');
        const commentButton = document.querySelector('.button');
        const statusButton = document.getElementById('statusButton');

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

        // Get the back button and add an event
        document.getElementById('back').addEventListener('click', () => {
            window.location.href = '../../navigate/comments.html';
        });

        if(statusButton.id === "enable"){
            // Get the enable button and add an event
            document.querySelector('#enable').addEventListener('click', async () =>{
                if(confirm('Are you sure do you want to enable this comment?')){
                    const response = await editRequest(comments_url, comment_id, { type : "enable" }, token);
                    if(response.status < 300) {
                        alert(response.message);
                        window.location.href = '../../navigate/comments.html';
                    } else {
                        console.error('Error deleting data:', response.message)
                    }
                }
            });
        } else {
            // Get the disable button and add an event
            document.querySelector('#disable').addEventListener('click', async () =>{
                if(confirm('Are you sure do you want to disable this comment?')){
                    const response = await editRequest(comments_url, comment_id, { type : "disable" }, token);
                    if(response.status < 300) {
                        alert(response.message);
                        window.location.href = '../../navigate/comments.html';
                    } else {
                        console.error('Error deleting data:', response.message)
                    }
                }
            });
        }
        

        

        // Get the delete button and add an event
        document.getElementById('delete').addEventListener('click', async () =>{
            if(confirm('Are you sure do you want do delete this post?')){
                const response = await deleteRequest(posts_url, post_id, token);
                if(response.status < 300) {
                    alert(response.message);
                    window.location.href = '../../navigate/posts.html';
                } else {
                    console.error('Error deleting data:', response.message)
                }
            }
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