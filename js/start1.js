$(document).ready(function() {
    initS1();
})

function initS1() {
    //init dialog for I
    // dlgi();
    //dialog question new
    dlgquestionnew();
    //resend activate link
    resend5();

    //init dlg-feedback
    dlgquizfeedback();
}


function dlgquestionnew() {
    //dlg validatioin fields
    $("#dlg-question-new-radio :radio").change(function(e) {
        //console.log($("#dlg-question-new-radio :radio:checked").length);
        if ($("#dlg-question-new-radio :radio:checked").length > 0) {
            $("#dlg-question-new-radio :radio").each(function() {
                $(this).get(0).setCustomValidity('');
            })
            $("#dlg-question-new-radio :radio").removeAttr('required');;
        } else {
            $("#dlg-question-new-radio :radio").each(function() {
                $(this).get(0).setCustomValidity('Es muss mind 1. ausgewählt werden');
            })
            $("#dlg-question-new-radio :radio").prop('required', true);
        }
    });
    $("input[name=answerc]").on("change", function() {
        $("input[name=answerc]").on("oninput", function() { setCustomValidity('') });
    });
    $('#btn-question-new').on('click', function() {
        //GTM
        gtmEPush(_, 'Submit Question Click');
        // GTM
        var $this = $(this);
        window.dataLayer.push({
            'pageTitle': 'User Question',
            'pageCategory': 'User Question',
            'pageURI': '/user-question.html',
            'visitorType': $this.data('visitortype'),
            'difficultyScore': ''
        });
        // GTM end
        $mdl = $('#mdl-question-new');
        var w = w || $(window);
        $top = ((w.height() - $mdl.outerHeight()) / 2) + w.scrollTop();
        $mdl.css({
            'position': 'fixed',
            'height': '100%', //Math.abs($('.master-wrapper').height() + 20),
            'width': '100%',
            'left': '0' //Math.abs(((w.width() - $mdl.outerWidth()) / 2) + w.scrollLeft())
        });
        $('#mdl-question-new .mdl-content').css({ 'width': '330px' });
        if ($(window).width() <= 360) {
            $mdl.css({ 'left': 0 });
        }

        // var w = w || $(window);
        // $top = ((w.height() - $mdl.outerHeight()) / 2) + w.scrollTop();
        // $mdl.css({
        //     'position': 'absolute',
        //     // 'padding-top':Math.abs($top),
        //     'padding-top': Math.abs(($('.master-wrapper').height() + 20) * 0.25),
        //     'height': Math.abs($('.master-wrapper').height() + 20),
        //     'left': Math.abs(((w.width() - $mdl.outerWidth()) / 2) + w.scrollLeft())
        // });
        //first put current question
        $('#mdl-question-new #question-text').text('"' + $('#question-wrapper .question-textbox').text().trim() + '"');
        $('#mdl-question-new #dlg-question-new-question-new').text('' + $('#question-wrapper .question-textbox').text().trim() + '');
        // $('#mdl-question-new').show();
        $('#mdl-question-new').slideDown(500, function() {});

    });
    // When the user clicks on <span> (x), close the modal
    $('#mdl-question-new .cls, #dlg-question-new-x').on('click', function() {
        $('#mdl-question-new').hide();
        for (i = 1; i <= 4; i++) {
            $('#dlg-question-new-a' + i).val('');
        }
        $('#dlg-question-new').val('');
        $('#dlg-question-new-h3').text(twig.dlg_question_new_h3);
        $('#an').prop('checked', true);
        $('#dlg-question-new-title-1').text(twig.dlg_question_new_title1)
        $('#dlg-question-new-question-new').show();
        $('#dlg-question-new-form').show();
        $('#dlg-question-new-send').show();
        $('#dlg-question-new-x').hide();
    });
    // When the user clicks anywhere outside of the modal, close it
    $(window).click(function() {
        if ($('#mdl-question-new').is(':visible')) {
            //$('#mdl-question-new').hide();
        }
    });
    $('#mdl-question-new').click(function(event) {
        event.stopPropagation();
    });

    $('#dlg-question-new-form').on("submit", function(e) {
        e.preventDefault();
        //GTM
        gtmEPush(_, 'Submit Question Form Submitted Click');
        // GTM
        // console.log( $( this ).serialize() );
        var form = $(this)[0];
        var url = $(this).attr('action');
        var formData = $(this).serialize();
        // alert(formData); 		
        console.log(formData);
        //var formData = new FormData(form);
        $.ajax({
            url: url,
            type: 'POST',
            data: formData,
            success: function(data) {
                if (data.e > 200) {
                    console.log(data.html);
                    return;
                }
                //alert(data);
                $('#dlg-question-new-h3').text(twig.msg_dlg_question_new_thx1);
                $('#dlg-question-new-title-1').text(twig.msg_dlg_question_new_thx2);
                $('#dlg-question-new-question-new').fadeOut();
                $('#dlg-question-new-form').fadeOut();
                $('#dlg-question-new-send').fadeOut();
                $('#dlg-question-new-x').fadeIn();
            },
            error: function(r, s, e) {
                console.log(e);
            }
        });
    });

}