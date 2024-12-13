const postDisplayData = (posts) => {

    const postTableData = (posts) => {
        const tableBody = document.querySelector('tbody');
        tableBody.innerHTML = posts.slice(0, 10).map(post => `
           <tr>
                <td>${post.username}</td>
                <td>${post.title}</td>
                <td class='post-content'>${elipsisContent(post.content)}</td>
                <td>${DateFormat(post.created_at)}</td>
                <td>${post.name != null ? post.name : "N/A"}</td>
                <td class='user-options'>
                    <a class='edit' href='../admin/edit_user'>Edit</a>
                    <a class='view' href='../admin/view_user'>View</a>
                    <a class='delete' href='../admin/delete_user'>Delete</a>
                </td>
            </tr>    
            
        `).join(' ');
    }

    const sortPosts = (posts) => {
        return posts.data.sort((a, b) => b.created_at - a.created_at)
    }

    const elipsisContent = (content) => {
        let elipsisText = " ";
        console.log(content.length)
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