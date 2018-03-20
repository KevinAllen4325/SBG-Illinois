$('nav .nav-items a, nav .nav-items p').css('color', 'black');
$('#admin').css('color', '#64BB67');
$('.nav-items').addClass('nav-white');
$('.logo').attr('src', '/assets/images/general/logo_black-1.png')
$(window).scroll( () => {
    if ($(window).scrollTop() > 150) {
        $('.logo').hide();
        $('.stickyLogo').fadeIn(200);
        $('.adminPanel, .loginForm, .program-dropdown').hide();
        $('.adminPanel, .loginForm, .program-dropdown').addClass('loginFormTop');
    }
    else {
        $('nav').removeClass('navSmall', 200);
        $('.arrow-up').removeClass('arrow-open', 200);
        $('.stickyLogo').hide();
        $('.logo').fadeIn(200);
        $('.adminPanel, .loginForm, .program-dropdown').removeClass('loginFormTop');
    }
});