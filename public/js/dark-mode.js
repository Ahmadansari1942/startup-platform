/**
 * Dark Mode Toggle Functionality
 * Saves preference to localStorage
 */

(function() {
    const toggleBtn = document.getElementById('dark-mode-toggle');
    const toggleBtnMobile = document.getElementById('dark-mode-toggle-mobile');
    const html = document.documentElement;

    function toggleDarkMode() {
        if (html.classList.contains('dark')) {
            html.classList.remove('dark');
            localStorage.theme = 'light';
            showToast('Light mode enabled', 'info');
        } else {
            html.classList.add('dark');
            localStorage.theme = 'dark';
            showToast('Dark mode enabled', 'info');
        }
    }

    if (toggleBtn) {
        toggleBtn.addEventListener('click', toggleDarkMode);
    }

    if (toggleBtnMobile) {
        toggleBtnMobile.addEventListener('click', toggleDarkMode);
    }

    // Listen for system preference changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!('theme' in localStorage)) {
            if (e.matches) {
                html.classList.add('dark');
            } else {
                html.classList.remove('dark');
            }
        }
    });
})();
