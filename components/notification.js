document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    
    if(window.location.href.includes('updated=')){
        const updated = urlParams.get('updated');
        const message = urlParams.get('message');
        if(updated) {
            showMesage(decodeURIComponent(message))
        }
        history.replaceState({}, document.title, window.location.pathname);
    }
});

const showMesage = (message) => {
    const notification = document.getElementById('notification-modal');
    const notificationContent = document.getElementById('modal-content');
    notificationContent.innerHTML = `
        <h1>Notification!</h1>
        <p>${message}</p>    
    `;
    
    notification.style.display = 'block';
    
    setTimeout(() => {
        notification.style.display = 'none';
    }, 5000)
}