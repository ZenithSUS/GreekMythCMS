const groupDisplayData = (groups) => {

    const groupsTableData = (groups) => {
        const tableBody = document.querySelector('tbody');
        tableBody.innerHTML = groups.data.slice(0, 10).map(group => `
           <tr>
                <td>${group.name}</td>
                <td>${elipsisContent(group.description)}</td>
                <td>${group.creator === "Default" ? group.creator = "Admin" : group.username}</td>
                <td><img src="${group.image_url}" alt="No Image"></td>
                <td class='user-options'>
                    <a class='view' href='../admin/groups/view_group.html?id=${group.greek_id}'>View</a>
                    <a class='disable' data-id=${group.greek_id}>Disable</a>
                    <a class='delete' data-id=${group.greek_id}>Delete</a>
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