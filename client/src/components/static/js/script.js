document.addEventListener('DOMContentLoaded', function() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const menuIcon = document.getElementById('menu-icon');

    navbarToggler.addEventListener('click', function() {
        menuIcon.classList.toggle('fa-bars');
        menuIcon.classList.toggle('fa-xmark');
    });
});
