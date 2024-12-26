document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const group_id = urlParams.get('id');

    if(!group_id){
        window.location.href = '../../navigate/groups.html';
    }

    const group = await getRequest(groups_url, group_id, token);

    if(group && group.status < 300){
        console.log(group);
        const data = group.data[0];
        const formData = new FormData();
        const type = "delete";
        const groupInfo = document.getElementById('group-info');
        //Display Group Info
        document.getElementById('image').src = data.image_url;
        groupInfo.innerHTML = `
            <p>Greek Name: <span>${data.name}</span></p>
            <p>Description: <span>${data.description}</span></p>
            <p>Creator: <span>${data.creator === "Default" ? "Admin" : data.username}</span></p>
            <p>Total User Joined: <span>${data.total_people}</span></p>
            <div class='group-options'>
                <button id='statusButton'>${data.status === 1 ? "Disable" : "Enable"}</button>
                <button id='delete'>Delete</button>
                <button id='back'>Go Back</button> 
            </div>
        `;

        const statusButton = document.getElementById('statusButton');
        statusButton.id = data.status === 1 ? "disable" : "enable";

        // Check the status before getting the id name element
        if(statusButton.id === "enable"){
            // Get the enable button and add an event
            document.querySelector('#enable').addEventListener('click', async () =>{
                if(confirm('Are you sure do you want to enable this group?')){
                    formData.append('type', 'enable');
                    const response = await editRequest(groups_url, group_id, formData, token);
                    if(response.status < 300) {
                        alert(response.message);
                        window.location.href = '../../navigate/groups.html';
                    } else {
                        console.error('Error deleting data:', response.message)
                    }
                }
            });
        } else {
            // Get the disable button and add an event
            document.querySelector('#disable').addEventListener('click', async () => {
                if(confirm('Are you sure do you want to disable this group?')){
                    formData.append('type', 'disable');
                    const response = await editRequest(groups_url, group_id, formData, token);
                    if(response.status < 300) {
                        alert(response.message);
                        window.location.href = '../../navigate/groups.html';
                    } else {
                        console.error('Error deleting data:', response.message)
                    }
                }
            });
        }

        document.getElementById('back').addEventListener('click', () => {
            window.location.href = '../../navigate/groups.html';
        }); 

        document.getElementById('delete').addEventListener('click', async() => {
            if(confirm('Are you sure do you want to delete this group?')){
                const response = await deleteRequest(groups_url, group_id, type, token);
                if(response.status < 300) {
                    alert(response.message);
                    window.location.href = '../../navigate/groups.html';
                } else {
                    console.error('Error deleting data:', response.message)
                }
            }
        })

    } else {
        console.error('Error Fetching Data:', group.meassage);
    }

});