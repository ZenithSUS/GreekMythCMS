var imageInput = document.getElementById('image');
var image = document.getElementById('profilePic');

imageInput.addEventListener("change", function () {
    if(this.files && this.files[0]){
        let url = URL.createObjectURL(this.files[0]);

        image.src = url;
        image.style.display = 'block';
    }
})