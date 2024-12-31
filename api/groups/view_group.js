document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const group_id = urlParams.get('id');

    if(!group_id){
        window.location.href = 'navigate/groups.html';
    }

    const group = await getRequest(groups_url, group_id, token);

    if(group && group.status < 300){
        console.log(group);
        const data = group.data[0];
        const formData = new FormData();
        const type = "delete";
        const groupInfo = document.getElementById('group-info');
        // Display Group Info
        document.getElementById('image').src = data.image_url;
        groupInfo.innerHTML = `
            <p>Greek Name: <span>${data.name}</span></p>
            <p>Description: <span>${data.description}</span></p>
            <p>Creator: <span>${data.creator === "Default" ? "Admin" : data.username}</span></p>
            <p>Total User Joined: <span>${data.total_people}</span></p>
            <div class='group-options'>
                <button id='statusButton'>${data.status === 1 ? "Disable" : "Enable"}</button>
                <button id='delete' class='delete'>Delete</button>
                <button id='back'>Go Back</button> 
            </div>
        `;

        const statusButton = document.getElementById('statusButton');
        statusButton.id = data.status === 1 ? "disable" : "enable";

        const modalChange = document.getElementById('modal-change');
        const modalMessage = document.getElementById('confirm-message');
        const confirmBtn = document.getElementById('confirmchangebtn');
        const cancelBtn = document.getElementById('cancelchangebtn');

        // Check the status before getting the id name element
        if(statusButton.id === "enable"){
            // Get the enable button and add an event
            document.querySelector('#enable').addEventListener('click', () => {
                modalChange.style.display = 'block';
                modalMessage.textContent = 'Are you sure do you want do enable this group?';

                confirmBtn.addEventListener('click', async () => {
                    formData.append('type', 'enable');
                    const response = await editRequest(groups_url, group_id, formData, token);
                    if(response.status < 300) {
                        window.location.href = `navigate/groups.html?updated=${true}&message=${response.message}`;
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
                modalMessage.textContent = 'Are you sure do you want do disable this group?';

                confirmBtn.addEventListener('click', async () => {
                    formData.append('type', 'disable');
                    const response = await editRequest(groups_url, group_id, formData, token);
                    if(response.status < 300) {
                        window.location.href = `navigate/groups.html?updated=${true}&message=${response.message}`;
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

        document.getElementById('back').addEventListener('click', () => {
            window.location.href = 'navigate/groups.html';
        }); 

        document.getElementById('delete').addEventListener('click', () => {
            modalChange.style.display = 'block';
            modalMessage.textContent = 'Are you sure do you want do delete this group?';

            confirmBtn.addEventListener('click', async () => {
                const response = await deleteRequest(groups_url, group_id, type, token);
                if(response.status < 300) {
                    window.location.href = `navigate/groups.html?updated=${true}&message=${response.message}`;
                } else {
                    console.error('Error deleting data:', response.message)
                }
            });

            cancelBtn.addEventListener('click', () => {
                modalChange.style.display = 'none';
                modalMessage.textContent = '';
            });
            
        })

    } else {
        console.error('Error Fetching Data:', group.meassage);
    }

});