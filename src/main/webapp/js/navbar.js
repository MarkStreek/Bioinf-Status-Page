$(document).ready(function(){
    $('.dropdown-toggle').click(function() {
        if ($(window).width() < 992) {
            $(this).next('.dropdown-menu').slideToggle();
        }
    });
});

