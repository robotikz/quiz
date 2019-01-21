/**
 *
 */

$(document).ready(function() {
    initX();

    initDND();


})
var secs = 0;
var joker_pause_stop = false;
var scroll = null;

function initX() {

    //flying elements, such as time & wieter-button
    //
    // $(window).scroll(function() {
    //     flyonsroll();
    // })

    //scroll inner part on mobile devices only
    //if ($.fn.ismobile()) 
    flyonsroll();

    //scroll to bottom if not all answers are visible
    scroll = new Scroll();
    scroll.show();


    //init dialog for I
    dlgi();
    //init dialog for Comment
    dlgquestioncomment();

    //init dlg-feedback
    dlgquizfeedback();

    //confetti();
    //alert( Cookies.get("quiz") );
    //TODO remove answers if refreshed, then goto the next page
    //if (Cookies.get('quiz')==quiz_id && Cookies.get('question')==question_id){
    if (Cookies.get('quiz') == quiz_id) {
        offall();
        return false;
    } else {
        Cookies.set("quiz", quiz_id);
        Cookies.set("question", question_id);
    }

    //var ss = new Date().getTime() + (parseInt(seconds)*1000);
    //#counter-seconds


    //show dnd animation for the first time only
    if ($('#game-qn-a').data('dndnext') == 1) {
        if (Cookies.get('quizpiggy_ani_dnd') != '1') {
            $('#game-qn-a').show();
            $('.joker-wrapper').fadeOut();
            $('.question-nr-wrapper').fadeOut();
            $('#question-nr').text(0);
            dlgAniDnd();
            return;
        }
    }


    //JOKER - clicks
    jclick();
    //if joker-pause is already pressed, the set as disabled
    //FIXME add server check if already pressed
    if (Cookies.get('joker_pause') == quiz_id) {
        $('#joker-pause').off('click').addClass('used-joker');
    }
    //if joker-skip is already pressed, the set as disabled
    //FIXME add server check if already pressed
    if (Cookies.get('joker_skip') == quiz_id) {
        $('#joker-skip').off('click').addClass('used-joker');
    }
    //if joker-5050 is already pressed, the set as disabled
    //FIXME add server check if already pressed
    if (Cookies.get('joker_5050') == quiz_id) {
        $('#joker-5050').off('click').addClass('used-joker');
    }

    //check if only 2 anwers, then disable joker5050
    if ($('.answer-wrapper').length < 3) {
        $('#joker-5050').off('click').addClass('used-joker');
    }

    // //call aclick by first qn - answer-click
    // //check if DND then use another click-events
    // if ($('#game-qn-a').data('dnd') == 1) {
    //     $('#joker-5050').off('click').addClass('used-joker');
    //     aclickdnd($('.answer-wrapper'));
    // } else {
    //     aclick($('.btn-game-a'));
    // }

    //call nclick - button next click
    nclick();


}


function offall() {
    $('.btn-game-a').off('click');
    $('.answer-wrapper').addClass('wrong-answer-wrapper'); //show not selected answers as grey
    $('#counter-circle').css({ strokeDashoffset: 125.6 });
    $('#counter-seconds').hide();
    $('#counter-circle').css('stroke', '#cacaca');
    $('#start-counter-pause').show();
    $('.joker').hide();

    //next button -> is changing to -> goto to score
    $('.points').hide();
    $('#btn-game-next, #btn-game-next-2').off('click').show();
    offclick();
    //show comment button
    $('#btn-question-comment').css('display', 'flex');
    //$('#start-counter').hide();
    //$('#start-counter-f5').show(); show the right answer and disable the clicks
    //$('#spinner-next').fadeIn(); show next
}

function offclick() {
    $('#txt-game-next,#txt-game-next-2').text(twig.game_button_result)
    $('#btn-game-next,#btn-game-next-2').on('click', function() {
        if ($(this).attr('id') == 'btn-game-next-2') {
            //GTM
            gtmEPush(_, 'Next Button Bottom Click');
        } else {
            //GTM
            gtmEPush(_, 'Next Button Top Click');
        }
        window.location.href = route_rt;
        return false;
    })
    $('#link-quiz-logo').off('click').on('click', function() {
        window.location.href = route_home;
        return false;
    })
}

function nclick() {
    $('#btn-game-next,#btn-game-next-2').on('click', function() {
        //28.02.2018, astoian - for back/forward disable
        if (Cookies.get('quiz') == '' || Cookies.get('quiz') == '0') {
            offall();
            return false;
        }
        if ($(this).attr('id') == 'btn-game-next-2') {
            //GTM
            gtmEPush(_, 'Next Button Bottom Click');
        } else {
            //GTM
            gtmEPush(_, 'Next Button Top Click');
        }
        joker_pause_stop = false;
        var $this = $(this);
        $.ajax({
            type: "GET",
            url: $this.data("path") + "?qz=" + $('#game-qn-a').data('qz') + "&qn=" + $('#game-qn-a').data('qn') + "&qnnext=" + $('#game-qn-a').data('qnnext'),
            beforeSend: function() {
                $('#loading').show();
                //scroll button hide if neccessary
                scroll.hide();
                //flasher show/hide move back
                $('#btn-game-next,#btn-game-next-2').hide(); //fadeOut('200');
                //hide comment button
                $('#btn-question-comment').hide();
                $('.points').show();
                $('#game-flash-wrong').hide();
                $('#game-flash-holder').append($('#game-flash-wrong'));
                $('#game-flash-right').hide();
                $('#game-flash-holder').append($('#game-flash-right'));

                //$('#counter-seconds').countdown('stop');
                $('#counter-circle').css({ strokeDashoffset: 0 });
                $('#counter-seconds').html(seconds);
                $('#start-counter-pause').hide();
                $('#counter-seconds').show();
                $('.answer-wrapper').fadeOut('slow');
                $('#question-wrapper').fadeOut('slow');
                $('#question-image').fadeOut('slow');

                //hide username of the question
                $('#user-info').hide();
                $('#user-info .from').text('');
                //
                $('#game-qn-a').fadeOut('slow');
            },
            success: function(data) {
                $('#loading').hide();
                if (data.hs && data.hs == 1) {
                    window.location.href = route_rt;
                    return false;
                }
                if (data.html) {
                    //var $p = $('#game-qn-a').parent();
                    //$('#game-qn-a').remove();
                    //$(data.html).appendTo($p);
                    var css_pd = $('#game-qn-a').css('padding-top');
                    var css_h = $('#game-qn-a').css('height');
                    $('#game-qn-a').empty().replaceWith(data.html);
                    $('#game-qn-a').css('padding-top', css_pd);
                    $('#game-qn-a').css('height', css_h);
                    $('#game-qn-a').fadeIn('slow', function() {
                        //scroll inner part on mobile devices only
                        // if ($.fn.ismobile())
                        flyonsroll();
                        //scroll button if neccessary
                        scroll.show();
                    })
                }

                //show dnd animation for the first time only
                if ($('#game-qn-a').data('dndnext') == 1) {
                    if (Cookies.get('quizpiggy_ani_dnd') != '1') {
                        $('.joker-wrapper').fadeOut();
                        $('.question-nr-wrapper').fadeOut();
                        dlgAniDnd();
                        return;
                    }
                } else {
                    if ($('.joker-wrapper').is(":hidden")) $('.joker-wrapper').fadeIn();
                    $('.question-nr-wrapper').fadeIn();
                }


                //20.12.2017, astoian - if ads
                if (data.e && data.e == 100) {
                    //
                    $('#btn-game-next,#btn-game-next-2').off('click');
                    //goto ads
                    $('#btn-ads').on('click', function() {
                        //GTM
                        gtmEPush(_, 'Advertisement Click', 'AdSense');
                        return false;
                    })
                    var scds = data.as || 10; //10;
                    $('#ads-counter-seconds').html(scds);
                    $('#ads-counter-seconds').countdown(st(scds), { elapse: false })
                        .on('update.countdown', function(event) {
                            var $this = $(this);
                            var isecs = parseInt(event.strftime('%-S'));
                            var $circle = $('#ads-counter-circle');

                            if (isNaN(isecs)) {
                                isecs = scds;
                            } else {
                                var r = $circle.attr('r');
                                var c = Math.PI * (r * 2);
                                if (isecs < 0) { isecs = 0; }
                                if (isecs > scds) { isecs = scds; }
                                var pct = c - ((isecs / scds) * c);
                                $circle.css({ strokeDashoffset: pct });
                            }
                            $this.html(event.strftime('%-S'));
                        })
                        .on('finish.countdown', function(e) {
                            var $this = $(this);
                            var $circle = $('#ads-counter-circle');
                            var r = $circle.attr('r');
                            var c = Math.PI * (r * 2);
                            $circle.css({ strokeDashoffset: c });
                            $this.html('0');
                            //show the right answer without points
                            //
                            //hide all jokers, disable answers, reassign next click
                            $('#ads-counter-circle').css({ strokeDashoffset: 125.6 });
                            $('#ads-counter-circle').css('stroke', '#cacaca');
                            //next button -> is changing to -> goto to score
                            $('.points').hide();
                            $('#btn-game-next,#btn-game-next-2').off('click').show();
                            nclick();
                            return false;
                        });
                    //$('#ads-counter-seconds').show();
                    // $('#ads-counter-seconds').css('color', '#ffffff');
                    // $('#ads-counter-circle').css('stroke', '#ffffff');
                    //$('#ads-counter-seconds').countdown(st('10'));
                    return;
                }



                //check if only 2 anwers, then disable joker5050
                if ($('.answer-wrapper').length < 3) {
                    $('#joker-5050').off('click').addClass('used-joker');
                } else {
                    $('#joker-5050').off('click').removeClass('used-joker');;
                    jclick3();
                }
                //nr of question +1
                var qn_nr = parseInt($('#question-nr').text());
                $('#question-nr').text(++qn_nr);
                //check if DND then use another click-events
                if ($('#game-qn-a').data('dnd') == 1) {
                    //
                    aclickdnd($('.answer-wrapper'));
                    $('#joker-5050').off('click').addClass('used-joker');
                    $('.joker').fadeIn('200', function() {
                        $('#question-wrapper').fadeIn('200', function() {
                            $('#question-image').fadeIn('200', function() {
                                $('#counter-seconds').css('color', '#ffffff');
                                $('#counter-circle').css('stroke', '#ffffff');
                                //add on image load
                                if ($("#question-image img").length) {
                                    $("#question-image img").on('load', function() {
                                        $('#counter-seconds').countdown(st(seconds));
                                    }).each(function() {
                                        if (this.complete) $(this).load();
                                    });
                                } else {
                                    $('#counter-seconds').countdown(st(seconds));
                                }
                            })
                        });
                    });
                } else {
                    aclick($('.btn-game-a'));
                    $('.joker').fadeIn('200', function() {
                        $('#question-wrapper').fadeIn('200', function() {
                            $('#question-image').fadeIn('200', function() {
                                $('.answer-wrapper').fadeIn('200', function() {
                                    //$('.joker').show();
                                    $('#counter-seconds').css('color', '#ffffff');
                                    $('#counter-circle').css('stroke', '#ffffff');
                                    //add on image load
                                    if ($("#question-image img").length) {
                                        $("#question-image img").on('load', function() {
                                            $('#counter-seconds').countdown(st(seconds));
                                        }).each(function() {
                                            if (this.complete) $(this).load();
                                        });
                                    } else {
                                        $('#counter-seconds').countdown(st(seconds));
                                    }
                                })
                            })
                        });
                    });
                }

                //show username of the question
                if ($('#question-textbox').data('username') != '') {
                    $('#user-info .from').text('Frage von ' + $('#question-textbox').data('username'));
                    $('#user-info').show();
                } else {
                    $('#user-info').hide();
                }
                //set cookies to deny page-refresh
                Cookies.set("quiz", quiz_id);
                Cookies.set("question", question_id);
                //init dlg-comment
                dlgquestioncommenti();
            },
            error: function(r, s, e) {
                console.log(e);
            }
        });
    })
}

function jclick1() {
    if (Cookies.get('joker_pause') == quiz_id) {
        $('#joker-pause').off('click').addClass('used-joker');
        return;
    }
    //JOKER - PAUSE  click
    $('#joker-pause').on('click', function() {
        //GTM
        gtmEPush(_, 'Pause Joker Click', 'Joker');
        if (Cookies.get('joker_pause') == quiz_id) {
            $('#joker-pause').off('click').addClass('used-joker');
        } else {
            $('#counter-seconds').countdown('stop');
            $('#counter-seconds').hide();
            $('#counter-circle').css('stroke', '#cacaca');
            $('#start-counter-pause').show();
            $(this).off('click').addClass('used-joker');
            Cookies.set("joker_pause", quiz_id);
            joker_pause_stop = true; //29.08.2018, astoian - stop countdown by multi-answers
        }
    });
}

function jclick2() {
    if (Cookies.get('joker_skip') == quiz_id) {
        $('#joker-skip').off('click').addClass('used-joker');
        return;
    }
    //JOKER - SKIP  click
    $('#joker-skip').on('click', function() {
        //GTM
        gtmEPush(_, 'Skip Joker Click', 'Joker');
        if (Cookies.get('joker_skip') == quiz_id) {} else {
            $(this).off('click').addClass('used-joker');
            Cookies.set("joker_skip", quiz_id);
            //time stop
            $('#counter-seconds').countdown('stop');
            $('#counter-seconds').hide();
            $('#counter-circle').css('stroke', '#cacaca');
            $('#start-counter-pause').show();

            $.ajax({
                type: "GET",
                url: $('#btn-game-next').data("path") + "?qz=" + $('#game-qn-a').data('qz') + "&qn=" + $('#game-qn-a').data('qn') + '&',
                beforeSend: function() {
                    $('#counter-circle').css({ strokeDashoffset: 0 });
                    $('#counter-seconds').html(seconds);
                    $('#start-counter-pause').hide();
                    $('#counter-seconds').show();
                    $('.answer-wrapper').fadeOut('slow');
                    $('.question-wrapper').fadeOut('slow');
                    $('.question-image').fadeOut('slow');
                    $('.points').fadeIn();
                    $('#btn-game-next,#btn-game-next-2').fadeOut('200');
                    //show comment button
                    $('#btn-question-comment').fadeOut(200);
                },
                success: function(data) {
                    if (data.html) {
                        $('#game-qn-a').replaceWith(data.html);
                        $('#game-qn-a').fadeIn('slow', function() {
                                //scroll inner part on mobile devices only
                                // if ($.fn.ismobile())
                                flyonsroll();
                            })
                            //check if DND then use another click-events
                        if ($('#game-qn-a').data('dnd') == 1) {
                            $('#joker-5050').off('click').addClass('used-joker');
                            aclickdnd($('.answer-wrapper'));
                        } else {
                            aclick($('.btn-game-a'));
                        }
                        $('.joker').show();
                        $('.question-wrapper').fadeIn('200', function() {
                            $('.question-image').fadeIn('200', function() {
                                $('.answer-wrapper').fadeIn('200', function() {
                                    $('#counter-seconds').css('color', '#ffffff');
                                    $('#counter-circle').css('stroke', '#ffffff');
                                    $('#counter-seconds').countdown(st(seconds));
                                })
                            })
                        });
                    }

                },
                error: function(r, s, e) {
                    console.log(e);
                }
            });

        }
    });
}

function jclick3() {
    if (Cookies.get('joker_5050') == quiz_id) {
        $('#joker-5050').off('click').addClass('used-joker');
        return;
    }
    //JOKER - 50/50  click
    $('#joker-5050').on('click', function() {
        //GTM
        gtmEPush(_, '50-50 Joker Click', 'Joker');
        var thiz = $(this);
        if (Cookies.get('joker_5050') == quiz_id) {
            $('#joker-5050').off('click').addClass('used-joker');
        } else {
            $.ajax({
                type: "GET",
                url: thiz.data("path") + "?qz=" + $('#game-qn-a').data('qz') + "&qn=" + $('#game-qn-a').data('qn') + '&',
                beforeSend: function() {
                    $('#counter-seconds').countdown('stop');
                },
                success: function(data) {
                    //$(data.html)
                    $('.answer-textbox').each(function() {
                        var $id = this.id;
                        if (jQuery.inArray(parseInt($(this).data('a')), data.a) == -1) {
                            $('#btn-game-answer-text-' + $(this).data('a')).off('click');
                            $('#btn-game-answer-' + $(this).data('a')).off('click');
                            $('#btn-game-answer-text-' + $(this).data('a')).parent().addClass('wrong-answer-wrapper');
                        }
                    });
                    $('#joker-5050').off('click').addClass('used-joker');
                    //$('#counter-seconds').countdown('start');
                    $('#counter-seconds').countdown(st(secs));
                },
                error: function(r, s, e) {
                    console.log(e);
                }
            });
            Cookies.set("joker_5050", quiz_id);
        }
    });
}

function jclick() {
    jclick1();
    jclick2();
    jclick3();
}

/**
 * @param s
 * @returns now + seconds
 */
function st(s) {
    return (new Date().getTime() + (parseInt(s) * 1000))
}

function dlgquestioncommenti() {
    for (i = 1; i <= 5; i++) {
        $('#cb' + i).prop('checked', false);;
    }
    $('#dlg-question-comment').val('')
    $('#dlg-question-comment-h3').text(twig.dlg_question_comment_h3);
    $('#dlg-question-comment-title-1').text(twig.dlg_question_comment_title1)
    $('#dlg-question-comment-title-2').show();
    $('#dlg-question-comment-box').show();
    $('#dlg-question-comment-form').show();
    $('#dlg-question-comment-send').show();
    $('#dlg-question-comment-x').hide();

}

function dlgquestioncomment() {
    //dlg validatioin fields
    $("#dlg-question-comment-form :checkbox").change(function(e) {
        // console.log($("#dlg-question-comment-form :checkbox:checked").length);
        if ($("#dlg-question-comment-form :checkbox:checked").length > 0) {
            $("#dlg-question-comment-form :checkbox").each(function() {
                $(this).get(0).setCustomValidity('');
            })
            $("#dlg-question-comment-form :checkbox").removeAttr('required');;
        } else {
            $("#dlg-question-comment-form :checkbox").each(function() {
                $(this).get(0).setCustomValidity('Es muss mind 1. ausgewählt werden');
            })
            $("#dlg-question-comment-form :checkbox").prop('required', true);
        }
    });
    $('#btn-question-comment').on('click', function() {
        var $this = $(this);
        //GTM
        gtmEPush(_, 'Report Question ' + $('#game-qn-a').data('qn') + ' Icon Click');
        // GTM
        window.dataLayer.push({
            'pageTitle': 'Report Question',
            'pageCategory': 'Report Question',
            'pageURI': '/report-question.html',
            'visitorType': $this.data('visitortype'),
            'difficultyScore': ''
        });
        // GTM end
        $mdl = $('#mdl-question-comment');
        var w = w || $(window);
        $top = ((w.height() - $mdl.outerHeight()) / 2) + w.scrollTop();
        $mdl.css({
            'position': 'fixed',
            // 'padding-top':Math.abs($top),
            // 'padding-top': Math.abs(($('.master-wrapper').height() + 20) * 0.25),
            // 'height': Math.abs($('.master-wrapper').height() + 20),
            // 'left': Math.abs(((w.width() - $mdl.outerWidth()) / 2) + w.scrollLeft() - 8)
            'height': '100%',
            'width': '100%'
        });
        $('#mdl-question-comment .mdl-content').css({ width: '300px' });
        //first put current question
        $('#mdl-question-comment #question-text').html('' + $('#question-wrapper .question-textbox').html().trim() + '');
        $('#mdl-question-comment #dlg-question-comment-question').text('' + $('#question-wrapper .question-textbox').text().trim() + '');
        // $('#mdl-question-comment').show();
        $('#mdl-question-comment').slideDown(500);
        $('#mdl-question-comment .mdl-content').animate({
            marginTop: 100,
        }, 1500);
    });
    // When the user clicks on <span> (x), close the modal
    $('#mdl-question-comment .cls, #dlg-question-comment-x').on('click', function() {
        $('#mdl-question-comment').hide();
    });
    // When the user clicks anywhere outside of the modal, close it
    $(window).click(function() {
        if ($('#mdl-question-comment').is(':visible')) {
            //$('#mdl-question-comment').hide();
        }
    });
    $('#mdl-question-comment').click(function(event) {
        event.stopPropagation();
    });

    $('#dlg-question-comment-form').on("submit", function(e) {
        e.preventDefault();
        //GTM
        gtmEPush(_, 'Report Question ' + $('#game-qn-a').data('qn') + ' Form Submitted Click');
        // console.log( $( this ).serialize() );
        var form = $(this)[0];
        var url = $(this).attr('action');
        // var formData = $(this).serializeArray();
        //formData.push({name: "question", value: $('#question-wrapper .question-textbox').text().trim()});
        // var formData = $.extend($(this), {'question': $('#question-wrapper .question-textbox').text().trim()}).serialize();
        var formData = $(this).serialize();
        // formData += '&question=' + $('#question-wrapper .question-textbox').text().trim();
        // alert(formData); 		
        //console.log(formData);
        //var formData = new FormData(form);
        $.ajax({
            url: url,
            type: 'POST',
            data: formData,
            success: function(data) {
                if (data.e > 200) {
                    console.log(e.html);
                    return;
                }
                //alert(data);
                $('#dlg-question-comment-h3').text(twig.dlg_question_comment_title3);
                $('#dlg-question-comment-title-1').text(twig.dlg_question_comment_title4)
                $('#dlg-question-comment-title-2').fadeOut();
                $('#dlg-question-comment-box').fadeOut();
                $('#dlg-question-comment-form').fadeOut();
                $('#dlg-question-comment-send').fadeOut();
                $('#dlg-question-comment-x').fadeIn();
            },
            error: function(r, s, e) {
                console.log(e);
            }
        });
    });
}

//move elements on scroll
/*function flyonsroll() {
    var h = $('#game-qn-a').height();
    // console.log($('#game-qn-a').height());
*/


/* not need at the moment
if ($("#question-image img").length) {
    $("#question-image img").on('load', function() {
        // console.log($(this).height());
        h += $(this).height();
        if (h > 10) {
            $('.header').css('position', 'fixed');
            $('.joker-wrapper').css('position', 'fixed');
            $('.content-wrapper').css('padding-top', '138px');
            $('.ads').css('padding-top', '10px');
            $('div.footer').css('position', 'fixed');
        } else {
            $('.header').css('position', '');
            $('.joker-wrapper').css('position', '');
            $('.content-wrapper').css('padding-top', '');
            $('.ads').css('padding-top', '');
            $('div.footer').css('position', '');
        }
        $('html, body').animate({ scrollTop: $('#game-qn-a').position().top }, 'slow');
    });
} else {
    if (h > 10) {
        $('.header').css('position', 'fixed');
        $('.joker-wrapper').css('position', 'fixed');
        $('.content-wrapper').css('padding-top', '138px');
        $('.ads').css('padding-top', '10px');
        $('div.footer').css('position', 'fixed');
    } else {
        $('.header').css('position', '');
        $('.joker-wrapper').css('position', '');
        $('.content-wrapper').css('padding-top', '');
        $('.ads').css('padding-top', '');
        $('div.footer').css('position', '');
    }
    $('html, body').animate({ scrollTop: $('#game-qn-a').position().top }, 'slow');
}
 */
//scroll to top
// $('#game-qn-a').animate({
//     scrollTop: 0
// }, 200);

//$("#game-qn-a").animate({ scrollTop: $("#game-qn-a")[0].scrollHeight }, 1000);

// var maxHeightElements = $('#game-qn-a').height() + $(window).scrollTop() + 62 + 76 + 86;
// var maxHeightWindow = $(window).height() + $(window).scrollTop();
// if (maxHeightWindow < maxHeightElements) {
//     $('.weiter-bottom').animate({ top: (maxHeightWindow - 46 - 34) }, 100, "swing");
// } else {
//     $('.weiter-bottom').animate({ top: (maxHeightElements - 46 - 20) }, 100, "swing");
// }
// $('.timer').animate({ top: $(this).scrollTop() + 5 }, 100, "swing");
//}

function initDND() {
    /*
     * TODO: jauery ui intersect
     * overwrites the tolerance, not for jquery-ui-1.12.1 !!!
     */
    $.ui.intersect = function(draggable, droppable, toleranceMode) {

        if (!droppable.offset) {
            return false;
        }

        var draggableLeft, draggableTop,
            x1 = (draggable.positionAbs || draggable.position.absolute).left,
            y1 = (draggable.positionAbs || draggable.position.absolute).top,
            x2 = x1 + draggable.helperProportions.width,
            y2 = y1 + draggable.helperProportions.height,
            l = droppable.offset.left,
            t = droppable.offset.top,
            r = l + droppable.proportions().width,
            b = t + droppable.proportions().height;

        switch (toleranceMode) {
            case "custom":
                // console.log(l);
                // console.log(x1 + (draggable.helperProportions.width));
                // console.log(x2 - (draggable.helperProportions.width));
                // console.log(r);
                // console.log(t);
                // console.log(y1);
                // console.log(b);
                return (l < x1 + (draggable.helperProportions.width - 30) && // Right Half
                    x2 - (draggable.helperProportions.width - 30) < r && // Left Half
                    t < y1 && // Bottom Half
                    b > y1); // Top Half
            case "fit":
                return (l <= x1 && x2 <= r && t <= y1 && y2 <= b);
            case "intersect":
                return (l < x1 + (draggable.helperProportions.width / 2) && // Right Half
                    x2 - (draggable.helperProportions.width / 2) < r && // Left Half
                    t < y1 + (draggable.helperProportions.height / 2) && // Bottom Half
                    y2 - (draggable.helperProportions.height / 2) < b); // Top Half
            case "pointer":
                draggableLeft = ((draggable.positionAbs || draggable.position.absolute).left + (draggable.clickOffset || draggable.offset.click).left);
                draggableTop = ((draggable.positionAbs || draggable.position.absolute).top + (draggable.clickOffset || draggable.offset.click).top);
                return isOverAxis(draggableTop, t, droppable.proportions().height) && isOverAxis(draggableLeft, l, droppable.proportions().width);
            case "touch":
                return (
                    (y1 >= t && y1 <= b) || // Top edge touching
                    (y2 >= t && y2 <= b) || // Bottom edge touching
                    (y1 < t && y2 > b) // Surrounded vertically
                ) && (
                    (x1 >= l && x1 <= r) || // Left edge touching
                    (x2 >= l && x2 <= r) || // Right edge touching
                    (x1 < l && x2 > r) // Surrounded horizontally
                );
            default:
                return false;
        }

    };
}

// function scroll() {
//     $('#qn-scroll').on('click', function() {
//         $("#game-qn-a").animate({ scrollTop: $("#game-qn-a")[0].scrollHeight }, 300, function() {
//             $('#qn-scroll').fadeOut();
//         });
//     });
//     var h = $('.answer-wrapper').outerHeight(true) * $('.answer-wrapper').length;
//     h += $('.question-wrapper').outerHeight(true) * $('.question-wrapper').length;
//     h += $('.question-image').outerHeight(true) * $('.question-image').length;
//     h += $('.answer-box-dnd').outerHeight(true) * $('.answer-box-dnd').length;
//     if ($('#game-qn-a').height() < h) {
//         $('#qn-scroll').fadeIn(2000);
//     }
// }

function Scroll() {
    //init event
    $('#qn-scroll').on('click', function() {
        $("#game-qn-a").animate({ scrollTop: $("#game-qn-a")[0].scrollHeight }, 300, function() {
            $('#qn-scroll').fadeOut();
        });
    });

    this.show = function() {
        var wh = $(window).height();
        wh -= $('.footer').outerHeight(true);
        wh -= $('.joker-wrapper').outerHeight(true);
        wh -= $('.header').outerHeight(true);
        if ($('.stion-nr-wrapper').length)
            wh -= $('.question-nr-wrapper').outerHeight(true);

        var h = -2; //special case for some devices
        h += $('.question-wrapper').outerHeight(true) * $('.question-wrapper').length;
        // 
        if (!$('.answer-box-dnd').length) {
            h += $('.answer-wrapper').outerHeight(true) * $('.answer-wrapper').length
        }
        // $('#logg').show();
        h += $('.answer-box-dnd').outerHeight(true) * $('.answer-box-dnd').length;
        if ($('.question-image > img').length) {
            if (!$('.question-image > img').prop('complete')) { //if images are not loaded
                $('.question-image > img').load(function() {
                    h += $('.question-image').outerHeight(true) * $('.question-image').length;
                    $('#logg').text('h1=' + h + " wh=" + wh);
                    // console.log('h1=' + h + " wh=" + wh);
                    // console.log('qna1=' + $('#game-qn-a').height());
                    //if ($('#game-qn-a').height() < h) {
                    if (wh < h) {
                        $('#qn-scroll').fadeIn(2000);
                    }
                });
            } else {
                h += $('.question-image').outerHeight(true) * $('.question-image').length;
                $('#logg').text('h2=' + h + " wh=" + wh);
                // console.log('h2=' + h + " wh=" + wh);
                // console.log('h2=' + h);
                // console.log('qna2=' + $('#game-qn-a').height());
                if (wh < h) {
                    $('#qn-scroll').fadeIn(2000);
                }
            }
        } else {
            h += $('.question-image').outerHeight(true) * $('.question-image').length;
            $('#logg').text('h3=' + h + " wh=" + wh);
            // console.log('h3=' + h + " wh=" + wh);
            // console.log('h3=' + h);
            // console.log('qna3=' + $('#game-qn-a').height());
            if (wh < h) {
                $('#qn-scroll').fadeIn(2000);
            }
        }


    };
    this.hide = function() {
        $('#qn-scroll').fadeOut();
    }
}