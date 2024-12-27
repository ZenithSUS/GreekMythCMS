document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');
    const body = document.body;

    const darkModeSwitch = document.querySelector('#dark-mode-switch');
    const root = document.documentElement;
    const style = getComputedStyle(root);
    const primaryColor = style.getPropertyValue('--primary-color'); 
    const secondaryColor = style.getPropertyValue('--secondary-color');
    const lightColor = style.getPropertyValue('--light-color');
    const darkColor = style.getPropertyValue('--dark-color');
    const lightModeImagebg = 'src/images/abandon.jpg';
    const darkModeImageBg = 'src/images/waves.jpg';
    
    if (darkModeSwitch) {
        darkModeSwitch.addEventListener('change', (event) => {
            if (event.target.checked) {
                header.style.color = lightColor;
                root.style.setProperty('--dark-color', lightColor);
                root.style.setProperty('--light-color', darkColor);
                root.style.setProperty('--primary-color', secondaryColor);
                root.style.setProperty('--secondary-color', darkColor);
                body.style.backgroundImage = `url(${darkModeImageBg})`;
            } else {
                root.style.setProperty('--dark-color', darkColor);
                root.style.setProperty('--light-color', lightColor);
                root.style.setProperty('--primary-color', primaryColor);
                root.style.setProperty('--secondary-color', secondaryColor);
                body.style.backgroundImage = `url(${lightModeImagebg})`;
            }
        });
    }

});
