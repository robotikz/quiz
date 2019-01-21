$(document).ready(function() {
    initL();
})

function initL() {
    $('#msg-box-news-close').on('click', function() {
        //GTM
        gtmEPush(_, 'Close News Click');
        $('#msg-box-news-text').fadeOut('slow');
        $('#msg-box-news-close').fadeOut('slow', function() {
            $('#msg-box-news').css({ 'visibility': 'hidden' });
        });
    })


    $('#f-security-logon').on('submit', function() {
        gtmEPush(_, 'Log-in via Password Click', 'Log-in');
        return true;
    });

    //registration action
    if ($.fn.pluginname) {
        $('#f-security-reg').validator().on('submit', function(e) {
            if (e.isDefaultPrevented()) {
                // handle the invalid form
            } else {
                // everything looks good!
                gtmEPush(_, 'Sign-up via Password Click', 'Sign-up');
                $('#f-security-reg').validator('destroy');
            }
        });
    }

    $('#f-security-reg-aj').on('submit', function() {
        gtmEPush(_, 'Sign-up as Guest via Password Click', 'Sign-up');
        return true;
    });

    //dialog password
    dlgPwd();

    //resend activate link
    resend5();

}

function grecaptcha_cb_reg(e) {
    if (grecaptcha.getResponse() == "") {
        // alert("You can't proceed!");
        $('#grecaptcha').val('');
        $('#f-security-reg').validator('validate');
        return false;
    } else {
        // alert("reCapthca ok!");
        $('#grecaptcha').val(1);
        $('#f-security-reg').validator('validate');
        return true;
    }
}