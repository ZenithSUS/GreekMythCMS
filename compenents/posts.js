const postDisplayData = (posts) => {

    const postTableData = (posts) => {
        const tableBody = document.querySelector('tbody');
        tableBody.innerHTML = posts.slice(0, 10).map(post => `
           <tr>
                <td>${post.username}</td>
                <td>${elipsisContent(post.title)}</td>
                <td class='post-content'>${elipsisContent(post.content)}</td>
                <td>${DateFormat(post.created_at)}</td>
                <td>${post.name != null ? post.name : "N/A"}</td>
                <td class='user-options'>
                    <a class='edit' href='../admin/posts/edit_post'>Edit</a>
                    <a class='view' href='../admin/posts/view_post'>View</a>
                    <a class='delete' href='../admin/posts/delete_post'>Delete</a>
                </td>
            </tr>    
            
        `).join(' ');
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
        dateFormat = newDate.toLocaleString('default', { month: 'short' }) + ' ' + newDate.getDate() + ' ' + newDate.getFullYear();
        return dateFormat;
    }

    const postData = sortPosts(posts);
    postTableData(postData);
}