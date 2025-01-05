const deleteAccount = () => {
    let modal = document.getElementById('modal');
    let passwordForm = document.getElementById('passwordForm');
    modal.style.display = 'block';

    document.getElementById('deleteAcc').addEventListener('click', () => {
        modal.style.display = 'none';
        deleteProcess(passwordForm)
    });
    
    document.getElementById('cancel').addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.onclick = function(event){ 
        if(event.target == modal){
            modal.style.display = 'none';
        }
    }
}

const deleteProcess = (passwordForm) => {
    const confirmButton = document.getElementById('DeleteConfirm');
    const form = document.querySelector('.delete-account-container form');
    passwordForm.style.display = 'block';

    confirmButton.addEventListener('click', async (e) => {
        e.preventDefault();
        const password = form.password.value;
        const confirmpassword = form.confirmpassword.value;
        const type = 'deleteAdmin';

        const formData = new FormData();
        formData.append('password', password);
        formData.append('confirmpassword', confirmpassword);
        formData.append('type', type);

        try {
            const response_checkField = await editRequest(users_url, user_id, formData, token);
            
            console.log(response_checkField);
            if(response_checkField.status < 300) {
                confirmButton.disabled = true;
                const type = "admin";
                const response_delete = await deleteRequest(users_url, user_id, type, token);

                console.log(response_delete);
                if (response_delete.status < 300) {
                    confirmButton.disabled = true;
                    localStorage.clear();
                    window.location.href = `auth/login.html?updated=${true}&message=${response_delete.message}`;
                }
            } else {
                checkErrors(response_checkField.error);
            }

        } catch (error) {
            console.error('Failed to Process:', error);
        }  
    });

    window.onclick = function(event){ 
        if(event.target == passwordForm){
            document.getElementById('password').value = "";
            document.getElementById('confirmpassword').value = "";
            const errorMessage = document.querySelectorAll('.error-message');
            errorMessage.forEach(message => message.remove());
            confirmButton.disabled = false;
            passwordForm.style.display = 'none';
        }
    }

    document.getElementById('DeleteCancel').onclick = () => {
        document.getElementById('password').value = "";
        document.getElementById('confirmpassword').value = "";

        const errorMessage = document.querySelectorAll('.error-message');
        errorMessage.forEach(message => message.remove());
        confirmButton.disabled = false;
        passwordForm.style.display = 'none';
    }
}


