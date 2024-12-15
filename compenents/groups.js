const groupDisplayData = (groups) => {

    const groupsTableData = (groups) => {
        const tableBody = document.querySelector('tbody');
        tableBody.innerHTML = groups.data.slice(0, 10).map(group => `
           <tr>
                <td>${group.name}</td>
                <td>${elipsisContent(group.description)}</td>
                <td>${group.creator === "Default" ? group.creator : group.username}</td>
                <td><img src="${group.image_url}" alt="No Image"></td>
                <td class='user-options'>
                    <a class='edit' href='../admin/posts/edit_post'>Edit</a>
                    <a class='view' href='../admin/posts/view_post'>View</a>
                    <a class='delete' href='../admin/posts/delete_post'>Delete</a>
                </td>
            </tr>    
            
        `).join(' ');
    }

    const elipsisContent = (content) => {
        let elipsisText = " ";
        elipsisText = content.length <= 15 ? content : content.substr(0, 30) + '...';
        return elipsisText;
    }

    groupsTableData(groups)
}