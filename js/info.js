$(document).ready(function() {
    initInfo();
})

function initInfo() {
    //$.fn.validator.Constructor.INPUT_SELECTOR = ':input:not([type="hidden"], [type="submit"], [type="reset"], button)';

    $('#info-contact').validator().on("submit", function(e) {
        $('#modal-password-error').fadeOut();
        if (e.isDefaultPrevented()) {
            return false; // handle the invalid form...
        }
        e.preventDefault();
        //GTM
        gtmEPush(_, 'Contact Form Submitted Click');
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
                    $('#info-contact').validator('validate');
                    console.log(data.html);
                    return;
                }
                if (data.e > 200) {
                    $('#info-contact-error .with-errors').text(data.html);
                    $('#info-contact-error').fadeIn();
                    grecaptcha.reset();
                    $('#info-contact')[0].reset();
                    //$('#info-contact').validator('validate');
                    console.log(data.html);
                    return;
                }
                //alert(data);
                $('#info-contact-before').fadeOut();
                $('#info-contact-thx').fadeIn();
            },
            error: function(r, s, e) {
                console.log(e);
            }
        });
    });

    //scroll top on arrow
    $("#btn-arrow-up").on('click', function() {
        // $("html, body").animate({ scrollTop: 0 }, "slow");
        $(".body-wrapper").animate({ scrollTop: 0 }, 900, function() {
            // remove hash (#) from URL when done scrolling 
            if (window.location.hash !== "") window.location.hash = '';
        });
        return false;
    });
}

function grecaptcha_cb_info(e) {
    if (grecaptcha.getResponse() == "") {
        // alert("You can't proceed!");
        $('#grecaptcha').val('');
        $('#info-contact').validator('validate');
        return false;
    } else {
        // alert("reCapthca ok!");
        $('#grecaptcha').val(1);
        $('#info-contact').validator('validate');
        return true;
    }
}