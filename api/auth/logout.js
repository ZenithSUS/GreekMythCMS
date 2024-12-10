const url = "http://localhost/GreekMythApi/api/auth.php";
const form = document.getElementById('logout');

form.addEventListener("submit", async (e) => {
    e.preventDefault();


    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({Process: form.Process.value})
    });

    const data = await response.json();

    if(data.message == "Success"){
        localStorage.clear();
        window.location.reload();
    }

});