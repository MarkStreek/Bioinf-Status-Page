document.addEventListener('DOMContentLoaded', function() {
    var dropdownToggles = document.querySelectorAll('.dropdown-toggle');

    function toggleDropdownMenu(event) {
        if (window.innerWidth < 992) {
            var dropdownMenu = this.nextElementSibling;
            if (dropdownMenu.classList.contains('show')) {
                dropdownMenu.classList.remove('show');
            } else {
                dropdownMenu.classList.add('show');
            }
        }
    }

    dropdownToggles.forEach(function(toggle) {
        toggle.addEventListener('click', toggleDropdownMenu);
    });

    window.addEventListener('resize', function() {
        var dropdownMenus = document.querySelectorAll('.dropdown-menu');
        if (window.innerWidth >= 992) {
            dropdownMenus.forEach(function(menu) {
                if (menu.classList.contains('show')) {
                    menu.classList.remove('show');
                }
            });
        }
    });
});
