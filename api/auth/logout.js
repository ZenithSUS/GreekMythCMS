const url = "http://localhost/GreekMythApi/api/auth.php";
const form = document.getElementById('logout');

form.addEventListener("submit", async (e) => {
    e.preventDefault();
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
        window.location.reload();
    }

});