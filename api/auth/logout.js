const url = "http://localhost/GreekMythApi/api/auth.php";
const form = document.getElementById('logout');
const modalWarning = document.getElementById('modal-warning')
const modalMessage = document.getElementById('warning-message');

form.addEventListener("click", async (e) => {
    e.preventDefault();
    modalWarning.style.display = 'block';
    modalMessage.innerHTML = 'Logout to the system?';

});

document.getElementById('confirmbtn').addEventListener('click', async () =>{
    let formData = new FormData();

    formData.append('Process', form.Process.value)

    const response = await fetch(url, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`
        },
        body: formData,
    });

    const data = await response.json();

    if(data.message == "Success"){
        localStorage.clear();
        window.location.href = `auth/login.html?updated=${true}&message=${"You have been Logged out!"}`
    }
});

document.getElementById('cancelbtn').addEventListener('click', async () => {
    modalWarning.style.display = 'none';
    modalMessage.innerHTML = '';
});

window.onclick = function(event){
    if(event.target == modalWarning){
        modalWarning.style.display = 'none';
    }
}