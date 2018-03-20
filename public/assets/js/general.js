$( function () {
    $('.map-overlay').hide();
    $('.address').mouseenter(function () {
        $('.map-overlay').fadeIn(400)
    }).mouseleave(function () {
        $('.map-overlay').fadeOut(400)
    })

    $('.arrow-up').on('click', () => {
        $("html, body").animate({ scrollTop: 0 }, 500);
        return false;
    })
})