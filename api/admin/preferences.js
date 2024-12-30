document.addEventListener('DOMContentLoaded', () => {
    // Theme Elements
    const header = document.querySelector('header');
    const body = document.body;
    const darkModeSwitch = document.querySelector('#dark-mode-switch');
    const root = document.documentElement;
    const style = getComputedStyle(root);
    const primaryColor = style.getPropertyValue('--primary-color'); 
    const secondaryColor = style.getPropertyValue('--secondary-color');
    const lightColor = style.getPropertyValue('--light-color');
    const darkColor = style.getPropertyValue('--dark-color');
    const buttonLightColor = style.getPropertyValue('--button-color');
    const buttonHoverLightColor = style.getPropertyValue('--button-hover-color');
    const buttonDarkColor = style.getPropertyValue('--dark-mode-button-color');
    const buttonHoverDarkColor = style.getPropertyValue('--dark-mode-button-hover-color');
    const navHoverLightColor = style.getPropertyValue('--nav-hover-color');
    const navHoverDarkColor = style.getPropertyValue('--nav-hover-dark-color');
    const lightModeImagebg = 'src/images/abandon.jpg';
    const darkModeImageBg = 'src/images/waves.jpg';
    const fontStyleInputs = document.querySelectorAll('input[name="font-style"]');
    const selectedFontStyle = localStorage.getItem('font-style');

    const applyTheme = (isDarkMode) => {
        darkModeSwitch.value = isDarkMode ? "dark" : "light";
        header.style.color = isDarkMode ? lightColor : '';
        root.style.setProperty('--dark-color', isDarkMode ? lightColor : darkColor);
        root.style.setProperty('--light-color', isDarkMode ? darkColor : lightColor);
        root.style.setProperty('--primary-color', isDarkMode ? secondaryColor : primaryColor);
        root.style.setProperty('--secondary-color', isDarkMode ? darkColor : secondaryColor);
        root.style.setProperty('--button-color', isDarkMode ? buttonDarkColor : buttonLightColor);
        root.style.setProperty('--button-hover-color', isDarkMode ? buttonHoverDarkColor : buttonHoverLightColor);
        root.style.setProperty('--nav-hover-color', isDarkMode ? navHoverDarkColor : navHoverLightColor);
        body.style.backgroundImage = `url(${isDarkMode ? darkModeImageBg : lightModeImagebg})`;
        localStorage.setItem('theme', isDarkMode ? "1" : "0");
    };

    if (theme == 1) {
        darkModeSwitch.checked = true;
        applyTheme(true);
    } else {
        darkModeSwitch.checked = false;
        applyTheme(false);
    }

    if (darkModeSwitch) {
        darkModeSwitch.addEventListener('change', (event) => {
            applyTheme(event.target.checked);
        });
    }

    const applyFont = (font) => {
        switch (font) {
            case 'fonts1':
                root.style.setProperty('--font-style', 'var(--font-style1)');
                break;
            case 'fonts2':
                root.style.setProperty('--font-style', 'var(--font-style2)');
                break;
            case 'fonts3':
                root.style.setProperty('--font-style', 'var(--font-style3)');
                break;
            default:
                root.style.setProperty('--font-style', 'var(--font-style1)');
        }
        localStorage.setItem('font-style', font);
    };

    if (selectedFontStyle) {
        document.querySelector(`#font-style${selectedFontStyle.slice(-1)}`).checked = true;
        applyFont(selectedFontStyle);
    }

    fontStyleInputs.forEach((input) => {
        input.addEventListener('change', (event) => {
            applyFont(event.target.value);
            localStorage.setItem('font_style', event.target.value);
        });
    });

    document.getElementById('save').addEventListener('click', async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            const selectedFont = document.querySelector('input[name="font-style"]:checked').value;
            formData.append('type', darkModeSwitch.value);
            formData.append('font_style', selectedFont);
            const request = await editRequest(users_url, user_id, formData, token);
            if (request.status < 300) {
                window.location.href = `index.html?updated=${true}&message=${request.message}`;
            }
        } catch (error) {
            console.error('Failed to change settings:', error);
        }
    });

    
});
