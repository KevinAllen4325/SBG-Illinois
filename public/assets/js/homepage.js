$(function() {
    $('.carousel').slick({
        autoplay: true,
        autoplaySpeed: 5000,
        swipe: false,
        fade: true
    });

    $(window).on('load', () => {
        setTimeout( () => {
            $('.preload').fadeOut('fast');
            $('#headerVideo')[0].play();
        }, 1500);
    });

    let feed = new Instafeed({
        get: 'user',
        userId: '6102412680',
        accessToken: '6102412680.1677ed0.35b120fec2eb4f1b80bc8468211a863b',
        clientId: 'aa35d6ae941d4c86a487bd5f93f8a663',
        sortBy: 'most-recent',
        resolution: 'standard_resolution',
        limit: 5,
        template: '<div class="instagramFeed" style="background-image: url({{image}})">' +
                    '<div class="instagram-overlay" onclick=""><span class="fa fa-search"></span></div>' +
                  '</div>' +
                  '<div class="instaPopUp">' +
                    '<div class="instaBox">' +
                        '<img src="{{image}}">' +
                        '<img src="/assets/images/general/instaLogo.jpg"><a href="https://www.instagram.com/sbgillinois/">@sbgillinois</a><span class="instaClose fa fa-times"></span>' +
                        '<p>{{caption}}</p>' +
                        '<span class="instaLike"><i class="fa fa-heart-o"></i>{{likes}}</span><a href="{{link}}" target="_blank"><span class="instagramLink"><i class="fa fa-instagram"></i>Instagram</span></a>' +
                    '</div>' +
                  '</div>'
    });
    feed.run();
});