/**
 * 
 */

$(document).ready(function() {
    initS();
})

function initS() {

    // $('#btn-score-fb').on('click', function() {
    //     FB.ui({
    //         display: 'popup',
    //         // method: 'share',
    //         // href: fb_href,
    //         method: 'share_open_graph',
    //         action_type: 'og.shares ',    
    //         action_properties: JSON.stringify({
    //             object: {
    //                 'og:url': fb_href,
    //                 'og:title': 'Ergebnis bei ' + $('#head1').data('quiz-title'),
    //                 'og:description': $('#fb-description').text(),
    //                 'og:image': fb_image,
    //                 'og:image:height': '100',
    //                 'og:image:width': '240',
    // 		    }
    //         })
    //     }, function(response){
    //         console.log(response);
    //     });
    // })

    //check if login-div exist, then use login and reg 
    if ($("#cnt-dlg-lgn").length) {
        dlgPwd();
        $('#f-dlg-lgn').on('submit', function() {
            gtmEPush(_, 'Log-in as Guest via Password Click', 'Log-in');
            return true;
        });
    }

    // $('#f-security-reg').on('submit', function() {
    //     gtmEPush(_, 'Sign-up as Guest via Password Click', 'Sign-up');
    //     return true;
    // });


    var $score = $('#t-ajax');
    $('#btn-score-month').on('click', function() {
        //GTM
        gtmEPush(_, 'Monthly Results Click');
        var $this = $(this);
        btnscore($this, $('#btn-score-all'), 'month');
    });

    $('#btn-score-all').on('click', function() {
        //GTM
        gtmEPush(_, 'All-Time Results Click');
        var $this = $(this);
        btnscore($this, $('#btn-score-month'), 'all');
    });

    function btnscore($this, $that, act) {
        $this.removeAttr('style');
        $that.css('color', '#337ab7').css('cursor', 'pointer');

        $.ajax({
            type: 'GET',
            url: $score.data('path') + '?act=' + act + '&id=' + $score.data('id') + '&cc=0',
            success: function(data) {
                $score.html(data.html);
                $('#t-score-title').html(data.title);
                // $('#t-score-place').text($('#tb-scores').data('pos'));
                // if(parseInt($('#tb-scores').data('pos'))==0){
                // 	$('#t-score-month').hide();
                // 	$('#t-score-no').show();
                // }else{
                // 	$('#t-score-month').show();
                // 	$('#t-score-no').hide();
                // }

                $score.data('act', act);
                if ($("#tb-scores > tbody > tr").length < parseInt($("#tb-scores").data('count'))) {
                    $('#btn-score-more').show();
                } else {
                    $('#btn-score-more').hide();
                }
            },
            error: function(r, s, err) {
                console.log(err);
            }
        });
    };

    if ($("#tb-scores > tbody > tr").length < parseInt($("#tb-scores").data('count'))) {
        $('#btn-score-more').show();
    };


    $('#btn-score-my').on('click', function() {
        //GTM
        gtmEPush(_, 'My Ranking Click');
        var $this = $(this);
        $.ajax({
            type: 'GET',
            url: $score.data('path') + '?act=my' + $score.data('act') + '&id=' + $score.data('id') + '&cc=0',
            success: function(data) {
                $score.html(data.html);
                var $my_pos = $score.find("tr[data-user='my']");
                var $my_pos_nr = parseInt($('#t-score-pos').text());
                if ($my_pos_nr > 2) {
                    $my_pos.find('.score-position').text($my_pos_nr);
                    $my_pos.prev().find('.score-position').text($my_pos_nr - 1);
                    $my_pos.next().find('.score-position').text($my_pos_nr + 1);
                }
            },
            error: function(r, s, err) {
                console.log(err);
            }
        });
    });
    //03.11.2017, astoian - onscroll-down load more
    $(window).scroll(function() {
        if ($(window).scrollTop() == $(document).height() - $(window).height()) {
            if ($('#btn-score-more').is(":hidden")) return;
            $.ajax({
                type: 'GET',
                url: $score.data('path') + '?act=' + $score.data('act') + '&id=' + $score.data('id') + '&cc=' + $("#tb-scores > tbody > tr").length,
                success: function(data) {
                    $score.html(data.html);
                    $('#t-score-place').text($('#tb-scores').data('pos'));
                    if ($("#tb-scores > tbody > tr").length < parseInt($("#tb-scores").data('count'))) {
                        $('#btn-score-more').show();
                    } else {
                        $('#btn-score-more').hide();
                    }
                },
                error: function(r, s, err) {
                    console.log(err);
                }
            });
        }
    });

    //
    $('#btn-score-more').on('click', function() {
        var $this = $(this);
        $.ajax({
            type: 'GET',
            url: $score.data('path') + '?act=' + $score.data('act') + '&id=' + $score.data('id') + '&cc=' + $("#tb-scores > tbody > tr").length,
            success: function(data) {
                $score.html(data.html);
                $('#t-score-place').text($('#tb-scores').data('pos'));
                if ($("#tb-scores > tbody > tr").length < parseInt($("#tb-scores").data('count'))) {
                    $('#btn-score-more').show();
                } else {
                    $('#btn-score-more').hide();
                }
            },
            error: function(r, s, err) {
                console.log(err);
            }
        });
    })

}