/**
 * 
 */

$(document).ready(function() {
    initU();
})

function initU() {

    //init dlg-feedback
    dlgquizfeedback();

    $('#user_username, #user_email, #user_sex').on('keypress', function() {
        if ($('.has-error-server').length) {
            $(this).closest('.form-group').removeClass('has-error-server');
            $(this).closest('.form-group').find('.help-block').empty();
        }
    })

    $('.msg-box-close').on('click', function() {
        $('.msg-box-success').fadeOut('slow');
    })
    setTimeout(function() {
        if ($('.msg-box-success').is(':visible')) $('.msg-box-success').fadeOut('slow');
    }, 3000);

    //CROPPER & AJAX UPLOADER for avatar in user only
    initUserImgUp("avatar", { aspectRatio: 1 / 1, minContainerWidth: 200, minContainerHeight: 200, minCropBoxWidth: 10 });

    $('.subnav-h2').on('click', function() {
        if ($(this).parent().hasClass('active')) {
            $(this).parent().removeClass('active');
            $(this).next().hide();
        } else {
            $(this).parent().addClass('active');
            $(this).next().show();
        }
    });

    //user profile change submit action
    $('#f-user').validator().on('submit', function(e) {
        if (e.isDefaultPrevented()) {
            // handle the invalid form
        } else {
            // everything looks good!
            gtmEPush(_, 'Profile Save Click', 'Profile');
        }
    });
    //password change submit action
    $('#f-my-password').validator().on('submit', function(e) {
        if (e.isDefaultPrevented()) {
            // handle the invalid form
        } else {
            // everything looks good!
            gtmEPush(_, 'New Password Save Click', 'Profile');
        }
    });
    //e-mail change submit action
    $('#f-my-email').validator().on('submit', function(e) {
        if (e.isDefaultPrevented()) {
            // handle the invalid form
        } else {
            // everything looks good!
            gtmEPush(_, 'E-Mail Settings Save Click', 'Profile');
        }
    });


    $('#btn-my-remove').on('click', function() {
        var btn = $(this);
        $.ajax({
            type: "GET",
            url: btn.data("path"),
            success: function(data) {
                if (data.e > 200) {
                    btn.addClass('btn-grey');
                    alert(data.html);
                    btn.off('click');
                    return;
                }
                bootbox.dialog({
                    message: $('#dlg-body-remove').clone().show(),
                    title: twig.msg_user_delete_account,
                    buttons: {
                        main: {
                            label: twig.msg_user_still_delete_account_send,
                            className: "btn btn-mail-signup",
                            callback: function() {
                                //console.log("Hi "+ $('#remove-reason').val());
                                $('#f-my-remove').submit();
                            }
                        },
                        cancel: {
                            label: 'Abbrechen',
                            className: 'btn-grey'
                        }
                    }
                }).find('.btn-grey').css({ 'margin-left': '0' });;
            },
            error: function(r, s, err) {
                btn.addClass('btn-grey');
                console.log(r.responseText);
                btn.off('click');
            }
        });

    })

    //	$('#avatar').popover({
    //        html: true,
    //        trigger: 'click',
    //        content: function(){
    //        	return $('#tip-img-actions').html();
    //        }
    //    });
    //	$('#avatar').on('show.bs.popover', function () {
    //		  // do something…
    //		$('#but-up-avatar').insertAfter('#images-avatar .popover-content');
    //	})
    //	$('#avatar').on('mouseover', function() {
    //		$(this).tooltip('show');
    //	});
    //	$('#avatar').on('mouseleave', function() {
    //		$(this).tooltip('hide');
    //	})


}
//
//message: "<h1>Schade, dass du gehst.</h1>"+
//"<p><strong>Wir haben dein Konto gelöscht.</strong> Wir werden uns freuen, dich wiederzusehen. Du kannst dich jederzeit wieder registrieren!</p>"+
//"<p>Wenn wir dich um einen kleinen Gefallen bitten dürften&hellip; Kannst du uns kurz mitteilen, warum du dein Konto gelöscht hast? Das hilft uns dabei, uns zu verbessern.</p>"+
//"<form><div class='form-group'><label for='remove-reason'>Warum hast du dein Konto gelöscht?</label><textarea class='form-control' id='remove-reason' rows='3'></textarea></div></form>"