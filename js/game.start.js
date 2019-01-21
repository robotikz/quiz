/**
 *
 */

$(document).ready(function() {
    initMStart();
})

function initMStart() {

    aclick($('.btn-game-a'));

}


function aclick(btns) {
    btns.on('click', function() {
        var $this = $(this);
        var $qn = $('#game-qn-a-' + $this.data('qn'));
        $.ajax({
            type: "GET",
            url: $qn.data("path") + "?qz=" + $this.data('qz') + "&qn=" + $this.data('qn') + "&a=" + $this.data('a') + '&',
            beforeSend: function() {
                //if multi
                if ($qn.data('m') == 1) {
                    $qn.find('.btn-game-a').off('click');
                    $qn.find('#btn-game-answer-' + $this.data('a')).off('click');
                    $qn.find('#btn-game-answer-text-' + $this.data('a')).off('click').parent().addClass('blocked-answer-wrapper');
                } else {
                    $qn.find('.btn-game-a').off('click');
                    $qn.find('.answer-wrapper').addClass('blocked-answer-wrapper');
                }
            },
            success: function(data) {
                $qn.find('.answer-wrapper').removeClass('blocked-answer-wrapper');
                $qn.data('m', data.m);
                if (data.a == parseInt($this.data('a'))) { //right answer
                    //if not multi
                    if (data.m < 1) {
                        $qn.find('.btn-game-a').off('click'); //if no more multi click, then off clicks
                        $qn.find('#btn-game-answer-text-' + $this.data('a')).parent().addClass('right-choice-answer-wrapper');
                        //gtm push answer
                        // gtmEPush('Evaluation', 'Right Answer', 'Joker', 'AnswerStatus', '1');
                        //show not selected answers as grey
                        $qn.find('.answer-wrapper').each(function(i, e) {
                            if (!$(this).hasClass('right-choice-answer-wrapper'))
                                $(this).addClass('wrong-answer-wrapper');
                        });
                    } else {
                        //
                    }
                    //reactivate all links, not the current
                    $qn.find('.btn-game-a').not($this).each(function() {
                        aclick($(this))
                    });
                    $qn.find('#btn-game-answer-text-' + $this.data('a')).parent().addClass('right-choice-answer-wrapper');
                    if (data.as != '') {
                        $qn.find('#btn-game-answer-text-' + $this.data('a')).parent().after('<div class="answer-wrapper answer-solution" >' + data.as + '</div>').hide().fadeIn();
                    }
                } else {
                    //off clicks if any wrong answer
                    $qn.find('.btn-game-a').off('click');
                    //gtm push answer
                    // gtmEPush('Evaluation', 'Wrong Answer', 'Joker', 'AnswerStatus', '0');
                    $qn.find('#btn-game-answer-text-' + $this.data('a')).parent().addClass('wrong-choice-answer-wrapper');
                    if (data.r) { //if wrong answer then show right answers
                        $.each(data.r, function(i, v) {
                            $qn.find('#btn-game-answer-text-' + v).parent().addClass('right-choice-answer-wrapper');
                        });
                    }
                    //show not selected answers as grey
                    $qn.find('.answer-wrapper').each(function(i, e) {
                        if (!$(this).hasClass('right-choice-answer-wrapper') && !$(this).hasClass('wrong-choice-answer-wrapper'))
                            $(this).addClass('wrong-answer-wrapper');
                    });
                    if (data.as != '')
                        $qn.find('#btn-game-answer-text-' + $this.data('a')).parent().after('<div class="answer-wrapper answer-solution" >' + data.as + '</div>').hide().fadeIn();
                }
            },
            error: function(r, s, e) {
                console.log(e);
            }
        });
    })
}