const commentDisplayData = (comments) => {

    const commentsTableData = (comments) => {
        const tableBody = document.querySelector('tbody');
        tableBody.innerHTML = comments.slice(0, 10).map(comment => `
         <tr>
                <td>${comment.username}</td>
                <td>${elipsisContent(comment.content)}</td>
                <td>${DateFormat(comment.created_at)}</td>
                <td>${comment.likes}</td>
                <td>${comment.dislikes}</td>
                <td class='user-options'>
                    <a class='edit' href='../admin/comments/disable_comment.html'>Disable</a>
                    <a class='view' href='../admin/comments/view_comment'>View</a>
                    <a class='delete'>Delete</a>
                </td>
            </tr>    
            
        `).join(' ');
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
        dateFormat = newDate.toLocaleString('default', { month: 'short' }) + ' ' + newDate.getDate() + ' ' + newDate.getFullYear();
        return dateFormat;
    }

    commentsTableData(sortedComments(comments))
}