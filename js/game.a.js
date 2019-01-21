/**
 *
 */

$(document).ready(function() {
    initMA();

})

function initMA() {

    //var ss = new Date().getTime() + (parseInt(seconds)*1000);
    $('#counter-seconds').countdown(st(seconds), { elapse: false })
        .on('update.countdown', function(event) {
            var $this = $(this);
            secs = parseInt(event.strftime('%-S'));
            var isecs = parseInt(secs);
            var $circle = $('#counter-circle');

            if (isNaN(isecs)) {
                isecs = seconds;
            } else {
                var r = $circle.attr('r');
                var c = Math.PI * (r * 2);
                if (isecs < 0) { isecs = 0; }
                if (isecs > seconds) { isecs = seconds; }
                var pct = c - ((isecs / seconds) * c);
                $circle.css({ strokeDashoffset: pct });
            }
            $this.html(event.strftime('%-S'));
        })
        .on('finish.countdown', function(e) {
            var $this = $(this);
            var $circle = $('#counter-circle');
            var r = $circle.attr('r');
            var c = Math.PI * (r * 2);
            $circle.css({ strokeDashoffset: c });
            $this.html('0');
            //show the right answer without points
            //
            //hide all jokers, disable answers, reassign next click
            $('.btn-game-a').off('click');
            $('.answer-wrapper').addClass('wrong-answer-wrapper');
            $('#counter-circle').css({ strokeDashoffset: 125.6 });
            $('#counter-seconds').hide();
            $('#counter-circle').css('stroke', '#cacaca');
            $('#start-counter-pause').show();
            $('.joker').hide();
            //next button -> is changing to -> goto to score
            $('.points').hide();
            $('#btn-game-next,#btn-game-next-2').off('click').show();
            offclick();
            //show comment button
            $('#btn-question-comment').css('display', 'flex');;
            return false;
        });

    //call aclick by first qn - answer-click
    //check if DND then use another click-events
    if ($('#game-qn-a').data('dnd') == 1) {
        $('#joker-5050').off('click').addClass('used-joker');
        aclickdnd($('.answer-wrapper'));
    } else {
        aclick($('.btn-game-a'));
    }

    //
    $('.question-nr-wrapper').remove();

    //call nclick - button next click
    // nclick();

}


function aclick(btns) {
    //$('.btn-game-a')
    btns.on('click', function() {
        //28.02.2018, astoian - for back/forward disable
        if (Cookies.get('quiz') == '' || Cookies.get('quiz') == '0') {
            offall();
            return false;
        }
        var $this = $(this);
        $.ajax({
            type: "GET",
            url: $('#game-qn-a').data("path") + "?qz=" + $this.data('qz') + "&qn=" + $this.data('qn') + "&a=" + $this.data('a') + '&',
            beforeSend: function() {
                $('#counter-seconds').countdown('stop');
                //pressed style before result is returned
                //$('#btn-game-answer-text-'+$this.data('a')).css('background-color','#cccccc');
                //$('#btn-game-answer-fold-'+$this.data('a')).css('background-color','#cccccc');
                //if multi
                if ($('#game-qn-a').data('m') == 1) {
                    //$this.off('click'); //if multi, then off only current click
                    $('.btn-game-a').off('click');
                    $('#btn-game-answer-' + $this.data('a')).off('click');
                    $('#btn-game-answer-text-' + $this.data('a')).off('click').parent().addClass('blocked-answer-wrapper');
                } else {
                    $('.btn-game-a').off('click');
                    $('.answer-wrapper').addClass('blocked-answer-wrapper');
                }
            },
            success: function(data) {
                $('.answer-wrapper').removeClass('blocked-answer-wrapper');
                $('#game-qn-a').data('m', data.m);
                if (data.a == parseInt($this.data('a'))) { //right answer
                    //if not multi
                    if (data.m < 1) {
                        //confetti(); //24.07.2017, astoian
                        $('.btn-game-a').off('click'); //if no more multi click, then off clicks
                        $('#btn-game-answer-text-' + $this.data('a')).parent().addClass('right-choice-answer-wrapper');
                        //gtm push answer
                        gtmEPush('Evaluation', 'Right Answer', 'AnswerStatus', '1');
                        //window.dataLayer.push({ 'event': 'eventAnswerStatus', 'answerStatus': 'right' });
                        //put circle +1 to the answer
                        $('#game-flash-right').insertAfter($('#btn-game-answer-text-' + $this.data('a')));
                        $('#game-flash-right').fadeIn();
                        //show not selected answers as grey
                        $('.answer-wrapper').each(function(i, e) {
                            if (!$(this).hasClass('right-choice-answer-wrapper'))
                                $(this).addClass('wrong-answer-wrapper');
                        });
                        //hide jokers and show next, if no more multi-answers
                        $('.joker').hide();
                        $('.points').hide();
                        $('#btn-game-next,#btn-game-next-2').show();
                        //show comment button
                        $('#btn-question-comment').css('display', 'flex');
                        //set color to grey on timer
                        $('#counter-seconds').css('color', '#cacaca');
                        $('#counter-circle').css('stroke', '#cacaca');
                    } else {
                        //13.11.2017, astoian - deactivate 5050 if one correct is selected
                        //$('#joker-5050').off('click').addClass('used-joker');
                        //if not all multi-answers are selected, then continue count-down
                        //29.08.2018, astoian - if pause is pressed 
                        if (!joker_pause_stop) $('#counter-seconds').countdown(st(secs));
                        //aclick($('.btn-game-a'));
                    }
                    //reactivate all links, not the current
                    aclick($('.btn-game-a').not($this));
                    $('#btn-game-answer-text-' + $this.data('a')).parent().addClass('right-choice-answer-wrapper');
                    if (data.s) {
                        $('#game-score').text(data.s);
                    }
                    if (data.as != '')
                        $('#btn-game-answer-text-' + $this.data('a')).parent().after('<div class="answer-wrapper answer-solution" >' + data.as + '</div>').hide().fadeIn();
                } else {
                    //off clicks if any wrong answer
                    $('.btn-game-a').off('click');
                    //gtm push answer
                    gtmEPush('Evaluation', 'Wrong Answer', 'AnswerStatus', '0');
                    //window.dataLayer.push({ 'event': 'eventAnswerStatus', 'answerStatus': 'wrong' });
                    //put circle flasher to the answer
                    $('#game-flash-wrong').insertAfter($('#btn-game-answer-text-' + $this.data('a')));
                    $('#game-flash-wrong').fadeIn();
                    $('#btn-game-answer-text-' + $this.data('a')).parent().addClass('wrong-choice-answer-wrapper');
                    if (data.r) { //if wrong answer then show right answers
                        $.each(data.r, function(i, v) {
                            $('#btn-game-answer-text-' + v).parent().addClass('right-choice-answer-wrapper');
                        });
                    }
                    //show not selected answers as grey
                    $('.answer-wrapper').each(function(i, e) {
                        if (!$(this).hasClass('right-choice-answer-wrapper') && !$(this).hasClass('wrong-choice-answer-wrapper'))
                            $(this).addClass('wrong-answer-wrapper');
                    });
                    //hide jokers and show next
                    $('.joker').hide();
                    //next button -> is changing to -> goto to score
                    $('.points').hide();
                    $('#btn-game-next,#btn-game-next-2').off('click').show();
                    offclick();
                    //show comment button
                    $('#btn-question-comment').css('display', 'flex');
                    if (data.as != '')
                        $('#btn-game-answer-text-' + $this.data('a')).parent().after('<div class="answer-wrapper answer-solution" >' + data.as + '</div>').hide().fadeIn();
                }
                //$('#counter-seconds').countdown('start');
            },
            error: function(r, s, e) {
                console.log(e);
            }
        });
    })
}

function aclickdnd(btns) {
    // $(".answer-drop").on("dragover", function(e) {
    //     e.preventDefault();
    // });
    // btns.on("dragstart", function(e) {
    //     e.originalEvent.dataTransfer.setData("Text", e.target.id);
    // });

    btns.draggable({ containment: ".answer-box-dnd" });
    $(".answer-drop").droppable({
        hoverClass: "",
        tolerance: 'custom',
        over: function(event, ui) {
            $(ui.draggable).addClass('blocked-answer-wrapper');
        },
        out: function(event, ui) {
            $(ui.draggable).removeClass('blocked-answer-wrapper');
        },
        drop: function(e, ui) {

            //28.02.2018, astoian - for back/forward disable
            if (Cookies.get('quiz') == '' || Cookies.get('quiz') == '0') {
                offall();
                return false;
            }

            var $drope = $(this);
            var $drage = $(ui.draggable);



            //$(".answer-drop").on("drop", function(e) {
            // e.preventDefault();
            // var data = e.originalEvent.dataTransfer.getData("Text");
            // var dnde = document.getElementById(data);
            //$(dnde).removeClass('wrong-answer-wrapper').addClass('wrong-choice-answer-wrapper');
            // var drope = e.target;

            // var $drage = $(dnde);
            $.ajax({
                type: "GET",
                url: $('#game-qn-a').data("path") + "?qz=" + $drage.data('qz') + "&qn=" + $drage.data('qn') + "&a=" + $drage.data('a') + "&sd=" + $drope.data('side'),
                beforeSend: function() {
                    $('#counter-seconds').countdown('stop');
                    //$drope.append($drage);
                    $drage.addClass('blocked-answer-wrapper');
                },
                success: function(data) {
                    $('.answer-wrapper').removeClass('blocked-answer-wrapper');
                    var $hidden = $('.answer-wrapper').filter(":hidden").first();
                    //$('#game-qn-a').data('m', data.m);
                    if (data.a == parseInt($drage.data('a')) && data.r == 1 && $drope.data('side') == data.sd) { //right answer && right side
                        $drage.addClass('right-choice-answer-wrapper');
                        // $drage.off("dragstart");
                        // $drage.removeAttr("draggable");
                        if ($hidden.length) { $drage.before($hidden); }
                        $drage.fadeOut(1000, function() {
                            $drage.remove();
                            if ($hidden.length) { $hidden.fadeIn('slow'); }
                        });
                        if (data.l == 1) {
                            //gtm push answer
                            gtmEPush('Evaluation', 'Right Answer', 'AnswerStatus', '1');
                            //window.dataLayer.push({ 'event': 'eventAnswerStatus', 'answerStatus': 'right' });
                            $('#answer-box-dnd').append($('#game-flash-right'));
                            $('#game-flash-right').fadeIn('slow');
                            //hide jokers and show next, if no more multi-answers
                            $('.joker').hide();
                            $('.points').hide();
                            $('#btn-game-next,#btn-game-next-2').fadeIn();
                            //show comment button
                            $('#btn-question-comment').css('display', 'flex');
                            //set color to grey on timer
                            $('#counter-seconds').css('color', '#cacaca');
                            $('#counter-circle').css('stroke', '#cacaca');
                            $('#counter-seconds').countdown('stop');
                            if (data.s) {
                                $('#game-score').text(data.s);
                            }
                        } else {
                            //29.08.2018, astoian - if pause is pressed 
                            if (!joker_pause_stop) $('#counter-seconds').countdown(st(secs));
                        }
                    } else if (data.a == parseInt($drage.data('a')) && data.r == 2 && $drope.data('side') == data.sd) { //wrong answer && left side
                        $drage.removeClass('blocked-answer-wrapper').addClass('right-choice-answer-wrapper');
                        // $drage.on("dragstart", function(e) {});
                        // $drage.removeAttr("draggable");
                        if ($hidden.length) { $drage.before($hidden); }
                        $drage.fadeOut(1000, function() {
                            $drage.remove();
                            if ($hidden.length) { $hidden.fadeIn('slow'); }
                        });
                        if (data.l == 1) {
                            //gtm push answer
                            gtmEPush('Evaluation', 'Right Answer', 'AnswerStatus', '1');
                            //window.dataLayer.push({ 'event': 'eventAnswerStatus', 'answerStatus': 'right' });
                            $('#answer-box-dnd').append($('#game-flash-right'));
                            $('#game-flash-right').fadeIn('slow');
                            //hide jokers and show next, if no more multi-answers
                            $('.joker').hide();
                            $('.points').hide();
                            $('#btn-game-next,#btn-game-next-2').fadeIn();
                            //show comment button
                            $('#btn-question-comment').css('display', 'flex');
                            //set color to grey on timer
                            $('#counter-seconds').css('color', '#cacaca');
                            $('#counter-circle').css('stroke', '#cacaca');
                            $('#counter-seconds').countdown('stop');
                            if (data.s) {
                                $('#game-score').text(data.s);
                            }
                        } else {
                            //29.08.2018, astoian - if pause is pressed 
                            if (!joker_pause_stop) $('#counter-seconds').countdown(st(secs));
                        }
                    } else { //if wrong side
                        // $drage.off("dragstart");
                        if ($drope.data('side') == "2") {
                            $drage.addClass('wrong-choice-answer-wrapper');
                        } else if ($drope.data('side') == "1") {
                            $drage.addClass('wrong-choice-answer-wrapper');
                        }
                        //gtm push answer
                        gtmEPush('Evaluation', 'Wrong Answer', 'AnswerStatus', '0');
                        //window.dataLayer.push({ 'event': 'eventAnswerStatus', 'answerStatus': 'wrong' });
                        $('#answer-box-dnd').append($('#game-flash-wrong'));
                        $('#game-flash-wrong').fadeIn('slow');
                        // btns.removeAttr('draggable');
                        // $('.answer-wrapper').removeClass("ui-draggable");
                        $('.answer-wrapper').draggable("disable");
                        $('.answer-wrapper').draggable("destroy");
                        //show comment button
                        $('#btn-question-comment').css('display', 'flex');
                        $('#counter-seconds').countdown('stop');
                        //hide jokers and show next
                        $('.joker').hide();
                        //next button -> is changing to -> goto to score
                        $('.points').hide();
                        $('#btn-game-next,#btn-game-next-2').off('click').show();
                        offclick();
                    }
                    //$('#counter-seconds').countdown('start');
                },
                error: function(r, s, e) {
                    console.log(e);
                }
            });
        }
    })
}

//move elements on scroll
function flyonsroll() {
    var h = $('#game-qn-a').height();
    var h_qn_a = $(window).height() - 60;
    if ($(window).width() > 360) {
        h_qn_a -= 14;
    }
    // console.log($('#game-qn-a').height());
    $('.content-wrapper').css('padding-top', '138px');
    $('#game-qn-a').css('height', h_qn_a + 'px');

    // $('.header').css('position', 'fixed');
    // $('.joker-wrapper').css('position', 'fixed');
    // $('.question-nr-wrapper').css('position', 'fixed');
    // $('.ads').css('padding-top', '10px');
    // $('div.footer').css('position', 'fixed');
    return false;
}