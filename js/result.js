$(document).ready(function() {
    initR();
})

function initR() {
    $('#fb-share, #btn-score-fb').on('click', function() {
        //GTM
        gtmEPush(_, 'Share Results on Facebook Click');
        FB.ui({
            display: 'popup',
            // method: 'share',
            // href: fb_href,
            method: 'share_open_graph',
            action_type: 'og.shares ',
            action_properties: JSON.stringify({
                object: {
                    'og:url': fb_href,
                    'og:title': fb_title, //'Ergebnis bei ' + $('#head1').data('quiz-title'),
                    'og:description': $('#fb-description').html(),
                    'og:image': fb_image,
                    'og:image:height': '630',
                    'og:image:width': '1200',
                }
            })
        }, function(response) {
            console.log(response);
        });
    });
    //init dlg-lgn
    dlglgn();

    //init dlg-feedback
    dlgquizfeedback();
    if (Cookies.get('quiz_feedback') == null || Cookies.get('quiz_feedback') == '') {
        $('#btn-quiz-feedback').trigger('click');
    }
    // When the user clicks on <span> (x), close the modal
    $('#mdl-quiz-feedback .cls, #dlg-quiz-feedback-x').on('click', function() {
        Cookies.set("quiz_feedback", '1');
    });


    //analysis for mode-b
    var val = parseInt($('#analysis-percent').attr('data-pct'));
    var $circle = $('#percent');
    if (isNaN(val)) val = 0;
    var r = $circle.attr('r');
    var c = Math.PI * (r * 2);
    if (val < 0) { val = 0; }
    if (val > 100) { val = 100; }
    var pct = ((100 - val) / 100) * c;
    $circle.css({ strokeDashoffset: pct });

    //resend activate link
    resend5();
}

function dlglgn() {
    $('#btn-lgn').on('click', function() {
        $('#cnt-dlg-lgn').empty();
        $.ajax({
            type: 'GET',
            url: $('#cnt-dlg-lgn').data('path'),
            success: function(data) {
                $('#cnt-dlg-lgn').html(data.html);
                $mdl = $('#mdl-lgn');
                var w = w || $(window);
                $top = ((w.height() - $mdl.outerHeight()) / 2) + w.scrollTop();
                $mdl.css({
                    'position': 'fixed',
                    // 'padding-top':Math.abs($top),
                    // 'padding-top': Math.abs(($('.master-wrapper').height() + 20) * 0.25),
                    // 'height': Math.abs($('.master-wrapper').height() + 20),
                    // 'left': Math.abs(((w.width() - $mdl.outerWidth()) / 2) + w.scrollLeft())
                    'height': '100%',
                    'width': '100%'
                });
                $('#mdl-lgn .mdl-content').css({ width: '300px' });
                // $('#mdl-lgn').show();
                $('#mdl-lgn').slideDown(500);
                $('#mdl-lgn .mdl-content').animate({
                    marginTop: 100,
                }, 1500);
                // GTM
                gtmEPush(_, 'Log-in as Guest via Password Click', 'Log-in');
                window.dataLayer.push({
                    'pageTitle': 'Log-in for Highscore',
                    'pageCategory': 'Log-in',
                    'pageURI': '/championship/login-for-highscore.html',
                    'visitorType': '',
                    'difficultyScore': ''
                });
                // GTM end

                // When the user clicks on <span> (x), close the modal
                $('#mdl-lgn .cls').on('click', function() {
                    $('#mdl-lgn').hide();
                });
            },
            error: function(r, s, err) {
                console.log(err);
            }
        });
    });
    $('#btn-reg').on('click', function() {
        $('#cnt-dlg-reg').empty();
        $.ajax({
            type: 'GET',
            url: $('#cnt-dlg-reg').data('path'),
            success: function(data) {
                $('#cnt-dlg-reg').html(data.html);
                $mdl = $('#mdl-reg');
                var w = w || $(window);
                $top = ((w.height() - $mdl.outerHeight()) / 2) + w.scrollTop();
                $mdl.css({
                    'position': 'fixed',
                    // 'padding-top':Math.abs($top),
                    // 'padding-top': Math.abs(($('.master-wrapper').height() + 20) * 0.25),
                    // 'height': Math.abs($('.master-wrapper').height() + 20),
                    // 'left': Math.abs(((w.width() - $mdl.outerWidth()) / 2) + w.scrollLeft())
                    'height': '100%',
                    'width': '100%'
                });
                $('#mdl-reg .mdl-content').css({ width: '300px' });
                // $('#mdl-reg').show();
                $('#mdl-reg').slideDown(500);
                $('#mdl-reg .mdl-content').animate({
                    marginTop: 100,
                }, 1500);
                // GTM
                gtmEPush(_, 'Sign-up as Guest via Password Click', 'Sign-up');
                window.dataLayer.push({
                    'pageTitle': 'Sign-up for Highscore',
                    'pageCategory': 'Sign-up',
                    'pageURI': '/championship/signup-for-highscore.html',
                    'visitorType': '',
                    'difficultyScore': ''
                });
                // GTM end

                // When the user clicks on <span> (x), close the modal
                $('#mdl-reg .cls').on('click', function() {
                    $('#mdl-reg').hide();
                });
            },
            error: function(r, s, err) {
                console.log(err);
            }
        });
    });

}