/**
 * 
 */
//
// $('#element').donetyping(callback[, timeout=1000])
// Fires callback when a user has finished typing. This is determined by the time elapsed
// since the last keystroke and timeout parameter or the blur event--whichever comes first.
//   @callback: function to be called when even triggers
//   @timeout:  (default=1000) timeout, in ms, to to wait before triggering event if not
//              caused by blur.
// Requires jQuery 1.7+
//

(function($) {
    $.fn.extend({
        donetyping: function(callback, timeout) {
            timeout = timeout || 1e3; // 1 second default timeout
            var timeoutReference,
                doneTyping = function(el) {
                    if (!timeoutReference) return;
                    timeoutReference = null;
                    callback.call(el);
                };
            return this.each(function(i, el) {
                var $el = $(el);
                // Chrome Fix (Use keyup over keypress to detect backspace)
                // thank you @palerdot
                $el.is(':input') && $el.on('keyup keypress paste', function(e) {
                    // This catches the backspace button in chrome, but also prevents
                    // the event from triggering too preemptively. Without this line,
                    // using tab/shift+tab will make the focused element fire the callback.
                    if (e.type == 'keyup' && e.keyCode != 8) return;

                    // Check if timeout has been set. If it has, "reset" the clock and
                    // start over again.
                    if (timeoutReference) clearTimeout(timeoutReference);
                    timeoutReference = setTimeout(function() {
                        // if we made it here, our timeout has elapsed. Fire the
                        // callback
                        doneTyping(el);
                    }, timeout);
                }).on('blur', function() {
                    // If we can, fire the event since we're leaving the field
                    doneTyping(el);
                });
            });
        }
    });
})(jQuery);
//$('#example').donetyping(function(){
//	$('#example-output').text('Event last fired @ ' + (new Date().toUTCString()));
//});

$.fn.center = function() {
    var w = w || $(window);
    this.css({
        'position': 'absolute',
        'top': Math.abs(((w.height() - this.outerHeight()) / 2) + w.scrollTop()),
        'left': Math.abs(((w.width() - this.outerWidth()) / 2) + w.scrollLeft())
    });
    return this;
}

$.expr[":"].contains = $.expr.createPseudo(function(arg) {
    return function(elem) {
        return $(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
    };
});

String.prototype.email = function() {
    var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return pattern.test(this);
};


$.expr[':'].equals = $.expr.createPseudo(function(arg) {
    return function(elem) {
        return $(elem).text().match("^" + arg + "$");
    };
});


$.fn.ismobile = function() {
    var check = false;
    (function(a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
};


function unid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}

function htmlDecode(value) {
    return $("<textarea/>").html(value).text();
}

function htmlEncode(value) {
    return $('<textarea/>').text(value).html();
}

function columi(hex, lum) {
    // validate hex string
    hex = String(hex).replace(/[^0-9a-f]/gi, '');
    if (hex.length < 6) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    lum = lum || 0;
    // convert to decimal and change luminosity
    var rgb = "#",
        c, i;
    for (i = 0; i < 3; i++) {
        c = parseInt(hex.substr(i * 2, 2), 16);
        c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
        rgb += ("00" + c).substr(c.length);
    }
    return rgb;
}


//************************************************************************************ */

function dlgi() {
    $('#btn-i, #link-quiz-logo, #link-company-logo, #btn-quiz-x-a, #btn-quiz-x-b').on('click', function() {
        $mdl = $('#mdl-i');
        //$(".master-wrapper").prepend($mdl);
        var w = w || $(window);
        $top = ((w.height() - $mdl.outerHeight()) / 2) + w.scrollTop();
        $mdl.css({
            'position': 'fixed',
            // 'padding-top':Math.abs($top),
            // 'margin-top': Math.abs(($('.master-wrapper').height() + 20) * 0.25),
            //'height': Math.abs($('.master-wrapper').height() + 20),
            'height': '100%',
            'width': '100%'
                // 'left': Math.abs(((w.width() - $mdl.outerWidth()) / 2) + w.scrollLeft() - 7)
        });
        if ($(window).width() <= 360) {
            // $mdl.css({ 'left': 0 });
        }
        $('#mdl-i .mdl-content').css({ width: '300px' });
        //$('body').css('overflow-x', 'hidden');
        //$('body').css('overflow-y', 'hidden');
        //first hide content
        $('#mdl-i .mdl-cnt').hide();
        if ($(this).attr('id') == 'btn-i') {
            //GTM
            gtmEPush(_, 'i Icon Click', 'Info');
            $('#mdl-links').show();
        } else if ($(this).attr('id') == 'link-quiz-logo') {
            $('#mdl-confirm-company').hide();
            $('#mdl-confirm-home').show();
            $('#mdl-confirm-title3').hide();
            $('#mdl-confirm-title1').show();
            $('#mdl-confirm').show();
        } else if ($(this).attr('id') == 'link-company-logo') {
            $('#mdl-confirm-home').hide();
            $('#mdl-confirm-company').show();
            $('#mdl-confirm-title1').hide();
            $('#mdl-confirm-title3').show();
            $('#mdl-confirm').show();
        } else if ($(this).attr('id') == 'btn-quiz-x-a') {
            //GTM
            gtmEPush(_, 'Close Icon Click');
            $('#mdl-confirm-x-a').show();
        } else if ($(this).attr('id') == 'btn-quiz-x-b') {
            //GTM
            gtmEPush(_, 'Close Icon Click');
            var p = window.location.pathname.split('/').reverse()[0];
            if (p == '0' || p == 'qfirstb') {
                $('#mdl-ok-x-b').attr('action', route_rt);
                $('#mdl-confirm-x-b-text').text(msg_game_quit_x_b0);
            } else {
                $('#mdl-confirm-x-b-text').text(msg_game_quit_x_bn);
                $('#mdl-ok-x-b').attr('action', route_home);
            }
            $('#mdl-confirm-x-b').show();
        }
        $('#mdl-i').slideDown(500);
        $('#mdl-i .mdl-content').animate({
            marginTop: 100,
        }, 1500);
    });
    // When the user clicks on <span> (x), close the modal
    $('#mdl-i .cls, #mdl-i #mdl-cancel, #mdl-i #mdl-cancel-x-a, #mdl-i #mdl-cancel-x-b').on('click', function() {
        //$('body').css('overflow-y', '');
        $('#mdl-i').hide();
    });
    // When the user clicks anywhere outside of the modal, close it
    $(window).click(function() {
        if ($('#mdl-i').is(':visible')) {
            //$('#mdl-i').hide();
        }
    });
    $('#mdl-i').click(function(event) {
        event.stopPropagation();
    });
}

function dlgPwd() {
    if (!$('#m-f-password').length) return;

    $('#m-f-password').validator().on("submit", function(e) {
        $('#modal-password-error').fadeOut();
        if (e.isDefaultPrevented()) {
            return false; // handle the invalid form...
        }
        e.preventDefault();
        //GTM
        gtmEPush(_, 'Reset Password Click');
        // GTM
        // console.log( $( this ).serialize() );
        var form = $(this)[0];
        var url = $(this).attr('action');
        var formData = $(this).serialize();
        // alert(formData); 		
        //console.log(formData);
        //var formData = new FormData(form);
        $.ajax({
            url: url,
            type: 'POST',
            data: formData,
            success: function(data) {
                if (data.e == 210) {
                    $('#grecaptcha').val('');
                    grecaptcha.reset();
                    $('#m-f-password')[0].reset();
                    //$('#m-f-password').validator('validate');
                    console.log(data.html);
                    return;
                }
                if (data.e > 200) {
                    $('#modal-password-error .with-errors').text(data.html);
                    $('#modal-password-error').fadeIn();
                    grecaptcha.reset();
                    $('#m-f-password')[0].reset();
                    //$('#m-f-password').validator('validate');
                    console.log(data.html);
                    return;
                }
                //alert(data);
                gtmEPush(_, 'Reset Password Click');
                // $('#modal-password').fadeOut();
                $('#modal-password-thx').text(data.html);
                $('#m-f-password').fadeOut().remove();;
                $('#modal-password-thx').fadeIn();
            },
            error: function(r, s, e) {
                console.log(e);
            }
        });
    });


    //modal clicks - password
    // $("#modal-ok-password").click(function() {
    //     //$('#modal-password').modal('hide');
    //     if ($('#u').val() == '') {
    //         alert(twig.msg_security_username_email_empty);
    //         return;
    //     }
    //     gtmEPush(_, 'Reset Password Click');
    //     //TODO: fix it - via ajax!!!!
    //     window.location.href = $("#m-f-password").attr('action') + "?u=" + $('#u').val();
    // })
    $("#u").keyup(function(e) {
        if (e.keyCode == 13) { // enter
            $("#modal-ok-password").click();
        }
    });
    $('#modal-password').on('show.bs.modal', function(event) {
        var b = $(event.relatedTarget); // Button that triggered the modal
        // GTM
        gtmEPush(_, 'Forgot Password Click');
        window.dataLayer.push({
            'pageTitle': 'Reset Password',
            'pageCategory': 'Profile',
            'pageURI': '/profile/reset-password.html',
            'visitorType': '',
            'difficultyScore': ''
        });
        $(this).find('#u').val(b.data('username'));
        $('#m-f-password').validator();
        //$('#m-f-password')[0].reset();
    })

    $('#modal-password').on('hide.bs.modal', function(event) {
        $('#m-f-password').validator('destroy');
    })
}

/**
 * 
 */
function dlgquizfeedback() {
    //dlg validatioin fields
    $("#dlg-quiz-feedback-q1-radio :radio").change(function(e) {
        if ($("#dlg-quiz-feedback-q1-radio :radio:checked").length > 0) {
            $("#dlg-quiz-feedback-q1-radio :radio").each(function() {
                $(this).get(0).setCustomValidity('');
            })
            $("#dlg-quiz-feedback-q1-radio :radio").removeAttr('required');;
        } else {
            $("#dlg-quiz-feedback-q1-radio :radio").each(function() {
                $(this).get(0).setCustomValidity('Es muss mind 1. ausgewählt werden');
            })
            $("#dlg-quiz-feedback-q1-radio :radio").prop('required', true);
        }
    });
    $("#dlg-quiz-feedback-q2-radio :radio").change(function(e) {
        if ($("#dlg-quiz-feedback-q2-radio :radio:checked").length > 0) {
            $("#dlg-quiz-feedback-q2-radio :radio").each(function() {
                $(this).get(0).setCustomValidity('');
            })
            $("#dlg-quiz-feedback-q2-radio :radio").removeAttr('required');;
        } else {
            $("#dlg-quiz-feedback-q2-radio :radio").each(function() {
                $(this).get(0).setCustomValidity('Es muss mind 1. ausgewählt werden');
            })
            $("#dlg-quiz-feedback-q2-radio :radio").prop('required', true);
        }
    });
    $('#btn-quiz-feedback').on('click', function() {
        var $this = $(this);
        //GTM
        gtmEPush(_, 'Report Feedback ' + ' Icon Click');
        // GTM
        window.dataLayer.push({
            'pageTitle': 'Report Feedback',
            'pageCategory': 'Report Feedback',
            'pageURI': '/report-quiz-feedback.html',
            'visitorType': $this.data('visitortype'),
            'difficultyScore': ''
        });
        // GTM end
        $mdl = $('#mdl-quiz-feedback');
        var w = w || $(window);
        $top = ((w.height() - $mdl.outerHeight()) / 2) + w.scrollTop();
        $mdl.css({
            'position': 'fixed',
            'height': '100%',
            'width': '100%'
        });
        $('#mdl-quiz-feedback .mdl-content').css({ width: '300px' });
        //first put current question
        // $('#mdl-quiz-feedback').show();
        $('#mdl-quiz-feedback').slideDown(500);
        $('#mdl-quiz-feedback .mdl-content').animate({
            marginTop: 100,
        }, 1500);
    });
    // When the user clicks on <span> (x), close the modal
    $('#mdl-quiz-feedback .cls, #dlg-quiz-feedback-x').on('click', function() {
        // Cookies.set("quiz_feedback", '1');
        $('#mdl-quiz-feedback').hide();
    });
    // When the user clicks anywhere outside of the modal, close it
    $(window).click(function() {
        if ($('#mdl-quiz-feedback').is(':visible')) {
            //$('#mdl-quiz-feedback').hide();
        }
    });
    $('#mdl-quiz-feedback').click(function(event) {
        event.stopPropagation();
    });

    $('#dlg-quiz-feedback-form').on("submit", function(e) {
        e.preventDefault();
        //GTM
        gtmEPush(_, 'Report Feedback ' + ' Form Submitted Click');
        // console.log( $( this ).serialize() );
        var form = $(this)[0];
        var url = $(this).attr('action');
        var formData = $(this).serialize();
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
                $('#dlg-quiz-feedback-h3').text(twig.dlg_quiz_feedback_title3);
                $('#dlg-quiz-feedback-title-1').fadeOut();
                $('#dlg-quiz-feedback-box').fadeOut();
                $('#dlg-quiz-feedback-form').fadeOut();
                $('#dlg-quiz-feedback-send').fadeOut();
                $('#dlg-quiz-feedback-x').fadeIn();
                Cookies.set("quiz_feedback", '1');
            },
            error: function(r, s, e) {
                console.log(e);
            }
        });
    });
}

/**
 * 
 */
function grecaptcha_cb_password(e) {
    if (grecaptcha.getResponse() == "") {
        // alert("You can't proceed!");
        $('#grecaptcha').val('');
        $('#m-f-password').validator('validate');
        return false;
    } else {
        // alert("reCapthca ok!");
        $('#grecaptcha').val(1);
        $('#m-f-password').validator('validate');
        return true;
    }
}

function resend5() {
    if (!$('#btn-msg-box-user-status-resend').length) return;
    $('#btn-msg-box-user-status-resend').on('click', function(e) {
        //ajax send
        var btn = $(this);
        $.ajax({
            type: "POST",
            url: btn.data("path") + "?u=" + btn.data('username'),
            success: function(data) {
                btn.fadeOut('slow', function() {
                    $(this).remove();
                    $('#msg-box-user-status-send').fadeOut('slow', function() {
                        $(this).remove();
                        $('#msg-box-user-status-resend').fadeIn();
                    });
                });
            },
            error: function(r, s, e) {
                console.log(e);
                console.log(r.responseText);
            }
        });
        return false;
    });
}

/**
 * 
 */
function dlgAniDnd() {

    $mdl = $('#mdl-ani-dnd');
    var w = w || $(window);
    $top = ((w.height() - $mdl.outerHeight()) / 2) + w.scrollTop();
    $mdl.css({
        'position': 'fixed',
        'height': '100%',
        'width': '100%'
    });
    $('#mdl-ani-dnd .mdl-content').css({ width: '280px' });
    // $('#mdl-lgn').show();
    $('#mdl-ani-dnd').slideDown(500, function() {
        initAniDND();
    });
    $('#mdl-ani-dnd .mdl-content').animate({
        marginTop: 100,
    }, 1500);

    // When the user clicks on <span> (x), close the modal
    $('#mdl-ani-dnd .cls').on('click', function() {
        $('#mdl-ani-dnd').hide();
    });
    $('#btn-game-next,#btn-game-next-2').off('click').show();
    nclick();
    Cookies.set("quiz_ani_dnd", '1');

    return;


    // if (Cookies.get('quizpiggy_ani_dnd') == '1') {
    //     return;
    // }
    // $('#cnt-dlg-ani-dnd').empty();
    // $.getScript(src_ani_dnd)
    //     .done(function(script, textStatus) {
    //         console.log(textStatus);
    //         $.ajax({
    //             url: $('#cnt-dlg-ani-dnd').data("path"),
    //             success: function(data) {
    //                 $('#cnt-dlg-ani-dnd').html(data.html);
    //                 $mdl = $('#mdl-ani-dnd');
    //                 var w = w || $(window);
    //                 $top = ((w.height() - $mdl.outerHeight()) / 2) + w.scrollTop();
    //                 $mdl.css({
    //                     'position': 'fixed',
    //                     'height': '100%',
    //                     'width': '100%'
    //                 });
    //                 $('#mdl-ani-dnd .mdl-content').css({ width: '300px' });
    //                 // $('#mdl-lgn').show();
    //                 $('#mdl-ani-dnd').slideDown(500, function() {
    //                     initAniDND();
    //                 });
    //                 $('#mdl-ani-dnd .mdl-content').animate({
    //                     marginTop: 100,
    //                 }, 1500);

    //                 // When the user clicks on <span> (x), close the modal
    //                 $('#mdl-ani-dnd .cls').on('click', function() {
    //                     $('#mdl-ani-dnd').hide();
    //                 });
    //                 Cookies.set("quizpiggy_ani_dnd", '1');
    //                 // alert('Alle Admin-Punkte sind gelöscht')
    //             },
    //             error: function(r, s, err) {
    //                 console.log(err);
    //             }
    //         });
    //     })
    //     .fail(function(jqxhr, settings, exception) {
    //         console.log("Triggered ajaxError handler.");
    //     });


    return false;
}

var _;
/**
 * GTM - push events
 */
function gtmEPush(a, c, l, v) {
    dataLayer.push({
        'event': 'GTMEvent',
        'eventAction': a === undefined ? 'Click' : a,
        'eventCategory': c === undefined ? '' : c,
        'eventLabel': l === undefined ? '' : l,
        'eventValue': v === undefined ? '' : v
    });

}

$(document).ready(function() {
    //goto home
    $('#btn-home').on('click', function() {
        //GTM
        gtmEPush(_, 'Back to Start Screen Click');
        window.location.href = route_home;
        return false;
    })

    //goto home via logo
    $('#btn-home-logo').on('click', function() {
        //GTM
        gtmEPush(_, 'Logo Click', 'Logo');
        window.location.href = route_home;
        return false;
    })

    //goto logout
    $('#btn-logout').on('click', function() {
        //GTM
        gtmEPush(_, 'Log-out Click');
        window.location.href = route_logout;
        return false;
    })

    //goto profile
    $('#btn-profile').on('click', function() {
        //GTM
        gtmEPush(_, 'Profile Icon Click', 'Profile');
        window.location.href = route_user;
        return false;
    })

    //goto highscore
    $('#btn-highscore').on('click', function() {
        //GTM
        gtmEPush(_, 'Highscore Icon Click');
        window.location.href = route_highscore;
        return false;
    })


    $('#msg-box-user-status-close').on('click', function() {
        //GTM
        gtmEPush(_, 'Close User Status Click');
        $('#msg-box-user-status-text').fadeOut('slow');
        $('#msg-box-user-status').fadeOut('slow', function() {
            $('#header').fadeIn('slow');
        });
    })

    $('#msg-box-close-cookie').on('click', function() {
        //GTM
        gtmEPush(_, 'Close Cookie Click');
        $('#msg-box-text-cookie').fadeOut('slow');
        $('#msg-box-cookie').fadeOut('slow', function() {
            // $('#msg-box-cookie').css({ 'visibility': 'hidden' });
            $('#msg-box-news').fadeIn('slow');
            if ($('#msg-box-user-status').length) {
                $('#msg-box-user-status').fadeIn('slow');
            } else {
                $('#header').fadeIn('slow');
            }
            Cookies.set("quizpiggy_cookie", '1');
        });
    })

    $('#btn-ani-dnd').click(function() {
        dlgAniDnd();
    });
})