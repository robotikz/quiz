/**
 *
 */

var feImages = ['jpeg', 'jpg', 'png', 'gif', 'bmp'];
var feImagesTip = {
    text: twig.msg_q_images_only,
    title: 'Bildervalidator',
    button: true,
};
//qtip define for image upload
var qtImg = {
    content: feImagesTip,
    hide: { event: false },
    position: { my: 'bottom middle', at: 'top middle' },
    style: { classes: 'qtip-rounded qtip-bootstrap qtip-green' },
    events: { hide: function(e, a) { $(".qtip").remove(); } }
}


$(document).ready(function() {
    initQ();
});


function initQ() {

    //init dialog for I
    dlgi();

    $('.btn-number').click(function(e) {
        e.preventDefault();
        fieldName = $(this).attr('data-field');
        type = $(this).attr('data-type');
        var input = $('#' + fieldName); //$("input[name='"+fieldName+"']");
        var currentVal = parseInt(input.val());
        var step = parseInt(input.attr('step'));
        if (isNaN(step)) { step = 1 }
        if (!isNaN(currentVal)) {
            if (type == 'minus') {
                if (currentVal > input.attr('min')) {
                    input.val(currentVal - step).change();
                }
                if (parseInt(input.val()) == input.attr('min')) {
                    $(this).attr('disabled', true);
                }
            } else if (type == 'plus') {

                if (currentVal < input.attr('max')) {
                    input.val(currentVal + step).change();
                }
                if (parseInt(input.val()) == input.attr('max')) {
                    $(this).attr('disabled', true);
                }
            }
        } else {
            input.val(0);
        }
    });
    $('.input-number').focusin(function() {
        $(this).data('oldValue', $(this).val());
    });
    $('.input-number').change(function() {
        minValue = parseInt($(this).attr('min'));
        maxValue = parseInt($(this).attr('max'));
        valueCurrent = parseInt($(this).val());
        name = $(this).attr('id');
        if (valueCurrent >= minValue) {
            $(".btn-number[data-type='minus'][data-field='" + name + "']").removeAttr('disabled')
        } else {
            //alert('Sorry, the minimum value was reached');
            $(this).val($(this).data('oldValue'));
        }
        if (valueCurrent <= maxValue) {
            $(".btn-number[data-type='plus'][data-field='" + name + "']").removeAttr('disabled')
        } else {
            //alert('Sorry, the maximum value was reached');
            $(this).val($(this).data('oldValue'));
        }
    });
    $(".input-number").keydown(function(e) {
        // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 190]) !== -1 ||
            // Allow: Ctrl+A
            (e.keyCode == 65 && e.ctrlKey === true) ||
            // Allow: home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)) {
            // let it happen, don't do anything
            return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });
}


function initUserImgUp(typ, ar) {
    if (!$('#user_' + typ + '_f').length) return; //nothing to do, if not on the page of profile-edit
    //if ($('#user_'+typ+'').val()!='') $('#user_'+typ+'').val(''); //by same without avatar change, dont need to resize and crop the image
    //CROPPER & AJAX UPLOADER for selfi only
    if ($('#img-' + typ + '').is(':visible')) {
        $('#change-' + typ + '').click(function() {
            //GTM
            gtmEPush(_, 'Profile Picture Click', 'Profile');
            $('#user_' + typ + '_f').focus().trigger('click');
        });
        $('#img-' + typ).click(function() {
            $('#d-crop-' + typ).empty().append($('#' + typ).clone()).addClass('pre-' + typ).show();
            $('#modal-' + typ).modal('show');
        });
    }
    $('#img-' + typ + '-def').click(function() {
        if ($('#user_username').val() == '') {
            feImagesTip['text'] = twig.msg_q_insert_username;
            $('#but-up-' + typ + '').qtip(qtImg).qtip('show');
            return false;
        }
        //GTM
        gtmEPush(_, 'Profile Picture Click', 'Profile');
        $('#user_' + typ + '_f').focus().trigger('click');
    });
    //input file onchange
    $('#ctrl-up-' + typ + ' input:file').change(function() {
        // submit the form
        if ($.inArray($(this).val().split('.').pop().toLowerCase(), feImages) == -1) {
            feImagesTip['text'] = twig.msg_q_images_only;
            $('#change-' + typ + '').qtip(qtImg).qtip('show');
            return false;
        }
        //$('#user_username').prop('readonly',true);
        var formdata = new FormData();
        formdata.append($(this).attr('name'), $(this)[0].files[0]);
        formdata.append($('#user_username').attr('id'), $('#user_username').val());
        formdata.append($('#user_unid').attr('id'), $('#user_unid').val());
        upboxImg.url = $('#images-avatar').data('path');
        upboxImg.data = formdata;
        $.ajax(upboxImg); //send formData to server-side, only file


    });
    //click remove image if exists
    $('#rem-' + typ + '').click(function() {
        //$('#images-'+typ+'').empty();
        $('#user_' + typ + '_f').val("");
        $('#' + typ + ' .item-' + typ).empty();
        $('#but-up-' + typ + '').show();
        $('#change-' + typ + '').hide();
        $('#crop-' + typ + '').hide();
        $('#rem-' + typ + '').hide();
        $('#user_' + typ + '').val('');
        $('#img-' + typ + '-def').show();
        $('#' + typ + ' .item-' + typ).append($('#img-' + typ + '-def'))
        $('#img-' + typ + '-def').show();
        $('#modal-' + typ).modal('hide');
    });

    // file-upload-ajax settings
    var upboxImg = {
        type: 'post',
        dataType: 'json',
        async: true,
        processData: false, // tell jQuery not to process the data
        contentType: false, // tell jQuery not to set contentType
        xhr: function() {
            var xhr = new window.XMLHttpRequest();
            //Upload progress
            xhr.upload.addEventListener('progress', function(evt) {
                if (evt.lengthComputable) {
                    var percentComplete = evt.loaded / evt.total;
                    $('.progress-avatar > .progress-bar').css('width', percentComplete + '%').attr('aria-valuenow', percentComplete);
                }
            }, false);
            return xhr;
        },
        beforeSend: function() {
            feImagesTip['text'] = '';
            $('.progress-avatar > .progress-bar').removeClass('progress-bar-danger').css('width', 0 + '%').attr('aria-valuenow', 0).parent().fadeIn(300);
        }, // success identifies the function to invoke when the server response has been received
        success: function(data) {
            //server-side error @see -> error:
            //if(!data.jerr) console.log('Server side error');
            //some errors returning by server response
            if (data.jerr != 'ok') {
                feImagesTip['text'] += '<b>' + data.fncl + '</b> – ' + data.jerr + '<br>';
                //add tip for errors from server
                $('.profile-name-h' + '').qtip(qtImg).qtip('show');
                $('.progress-avatar > .progress-bar').addClass('progress-bar-danger').css('width', 100 + '%').attr('aria-valuenow', 100).parent().slideUp(4000);
                $('#modal-' + typ).modal('hide');
                return;
            } else {
                $('#d-crop-avatar').empty().removeClass('pre-' + typ).show();
                $('#' + typ + ' .item-' + typ).empty();
                $('#but-up-' + typ + '').show();
                $('#change-' + typ + '').hide();
                $('#crop-' + typ + '').hide();
                $('#rem-' + typ + '').hide();
                $('#user_' + typ + '').val('');
                $('#img-' + typ + '-def').show();
                $('#' + typ + ' .item-' + typ).append($('#img-' + typ + '-def'))
                $('#img-' + typ + '-def').show();

                if ($('#ctrl-up-' + typ + '').is(':visible'))
                    $('#ctrl-up-' + typ + '').qtip(qtImg).qtip('hide');
                else
                    $('#change-' + typ + '').qtip(qtImg).qtip('hide');
                $('#ctrl-up-' + typ + '').hide();
                $('#images-' + typ + '').empty();
                $('#ctrl-' + typ + '').empty();
                $(data.html).appendTo($('#images-' + typ + ''));
                $('#f-' + typ + '-content').appendTo($('#ctrl-' + typ + ''));
            }
            //modal position
            $('#modal-' + typ).on('show.bs.modal', function() {
                $(this).find('.modal-body').css({
                    width: 'auto', //probably not needed
                    height: 'auto', //probably not needed
                    'max-height': '100%'
                });
            });
            $('#modal-' + typ).on('shown.bs.modal', function() {
                $('#user_' + typ + '_x').attr('v', $('#user_' + typ + '_x').val());
                $('#user_' + typ + '_y').attr('v', $('#user_' + typ + '_y').val());
                $('#user_' + typ + '_h').attr('v', $('#user_' + typ + '_h').val());
                $('#user_' + typ + '_w').attr('v', $('#user_' + typ + '_w').val());
            });
            $('#change-' + typ + '').click(function() {
                $('#user_' + typ + '_f').focus().trigger('click');
            });
            $('#rem-' + typ + '').click(function() {
                $('#user_' + typ + '_x').val('');
                $('#user_' + typ + '_y').val('');
                $('#user_' + typ + '_h').val('');
                $('#user_' + typ + '_w').val('');

                $('#user_' + typ + '_f').val("");
                $('#d-crop-avatar').empty();
                $('#' + typ + ' .item-' + typ).empty();
                $('#but-up-' + typ + '').show();
                $('#change-' + typ + '').hide();
                $('#crop-' + typ + '').hide();
                $('#rem-' + typ + '').hide();
                $('#user_' + typ + '').val('');
                $('#img-' + typ + '-def').show();
                $('#' + typ + ' .item-' + typ).append($('#img-' + typ + '-def'))
                $('#img-' + typ + '-def').show();
                $('#modal-' + typ).modal('hide');
                $('#img-' + typ + '-def').click(function() {
                    $('#user_' + typ + '_f').focus().trigger('click');
                });
            });
            //save the name of image in the hidden input field, which is property in db
            $('#user_' + typ + '').val(data.fnor);
            //clone image and put in crop-box
            var $img = $('#img-' + typ).clone();
            $img.attr('id', 'img-crop-' + typ);
            $('#d-crop-' + typ).append($img);
            $('#img-' + typ).click(function() {
                $('#modal-' + typ).modal('show');
            });

            var cropBoxDataFull = null;
            $('#img-crop-' + typ + '').cropper({
                rotatable: true,
                zoomable: false,
                aspectRatio: ar['aspectRatio'],
                //preview: '.item-'+typ+'',
                autoCropArea: 0.9,
                strict: false,
                guides: false,
                highlight: false,
                dragCrop: true,
                cropBoxMovable: true,
                cropBoxResizable: true,
                minContainerWidth: ar['minContainerWidth'],
                minContainerHeight: ar['minContainerHeight'],
                minCropBoxWidth: ar['minCropBoxWidth'],
                responsive: false, //onresize window, hides the image in preview and in the cropper, bug?
                built: function() {
                    if (cropBoxDataFull == null) cropBoxDataFull = $('#img-crop-' + typ + '').cropper('getCropBoxData');
                    $('.cropper-crop-box').on('dblclick', function() {
                            $('#img-crop-' + typ + '').cropper('setCropBoxData', cropBoxDataFull)
                        })
                        //crop the img by default
                    var imageData = $('#img-crop-' + typ + '').cropper('getCroppedCanvas').toDataURL();
                    $('#avatar img').attr('src', imageData);
                },
                crop: function(d) {
                    $('#user_' + typ + '_x').val(Math.round(d.x));
                    $('#user_' + typ + '_y').val(Math.round(d.y));
                    $('#user_' + typ + '_h').val(Math.round(d.height));
                    $('#user_' + typ + '_w').val(Math.round(d.width));
                }
            });
            //90 Grad rotate
            $('#modal-2-left').click(function() {
                $('#img-crop-' + typ + '').cropper('rotate', -90);
            })
            $('#modal-2-right').click(function() {
                    $('#img-crop-' + typ + '').cropper('rotate', 90);
                })
                //modal clicks
            $('#modal-ok-' + typ + '').click(function() {
                cropBoxData = $('#img-crop-' + typ + '').data('cropper');
                var imageData = $('#img-crop-' + typ + '').cropper('getCroppedCanvas').toDataURL();
                $('#avatar img').attr('src', imageData);
                $('#modal-' + typ).modal('hide');
            })
            $('#modal-cancel-' + typ + '').click(function() {
                $('#user_' + typ + '_x').val($('#user_' + typ + '_x').attr('v'));
                $('#user_' + typ + '_y').val($('#user_' + typ + '_y').attr('v'));
                $('#user_' + typ + '_h').val($('#user_' + typ + '_h').attr('v'));
                $('#user_' + typ + '_w').val($('#user_' + typ + '_w').attr('v'));
                $('#modal-' + typ).modal('hide');
            });
            $('.progress-avatar > .progress-bar').css('width', 100 + '%').attr('aria-valuenow', 100).parent().slideUp(2000);
            $('#modal-' + typ).modal('show');
        },
        error: function(xhr, ao, e) {
            $('.progress-avatar > .progress-bar').css('width', 100 + '%').attr('aria-valuenow', 100).parent().fadeOut(2000);
            console.log(xhr.status + ', Fehler: ' + e + '');
            //some errors returning by server-side
            feImagesTip['text'] += '<b>' + xhr.status + '</b> – Fehler: ' + e + '<br>'; //+ $(xhr.responseText).find('.block-exception');
            //add tip for errors from server
            if ($('#ctrl-up-' + typ + '').is(':visible'))
                $('#ctrl-up-' + typ + '').qtip(qtImg).qtip('show');
            else
                $('#change-' + typ + '').qtip(qtImg).qtip('show');
        }
    };
}


function init1000500ImgUp(typ1, typ2) {
    if (!$('#' + typ1 + '_' + typ2 + '_f').length) return; //nothing to do, if not on the page of profile-edit
    //AJAX UPLOADER for Question/Screen Images
    //Handle drag and drop events with jQuery
    var obj = $('#images-' + typ2);
    obj.on('dragenter', function(e) {
        e.stopPropagation();
        e.preventDefault();
    });
    obj.on('dragover', function(e) {
        e.stopPropagation();
        e.preventDefault();
    });
    obj.on('drop', function(e) {
        e.preventDefault();
        var file = e.originalEvent.dataTransfer.files[0];
        //We need to send dropped files to Server
        // submit the form
        if ($.inArray(file.name.split('.').pop().toLowerCase(), feImages) == -1) {
            feImagesTip['text'] = twig.msg_q_images_only;
            $('#ctrl-up-' + typ2 + '').qtip(qtImg).qtip('show');
            return false;
        }
        var formdata = new FormData();
        //the name should be the same as in input-file, see bellow $(this).attr('name')
        formdata.append('' + typ1 + '[' + typ2 + '_f]', file);
        formdata.append($('#' + typ1 + '_id').attr('id'), $('#' + typ1 + '_id').val());
        upboxImg.url = $('#images-' + typ2 + '').data('path');
        upboxImg.data = formdata;
        $.ajax(upboxImg); //send formData to server-side, only file
    });
    //If the files are dropped outside the div, file is opened in the browser window. To avoid that we can prevent ‘drop’ event on document.
    $(document).on('dragenter', function(e) {
        e.stopPropagation();
        e.preventDefault();
    });
    $(document).on('dragover', function(e) {
        e.stopPropagation();
        e.preventDefault();
    });
    $(document).on('drop', function(e) {
        e.stopPropagation();
        e.preventDefault();
    });

    $('#but-up-' + typ2 + '').click(function() {
        if ($('#' + typ1 + '_title').val() == '') {
            feImagesTip['text'] = twig.msg_q_insert_title;
            $('#ctrl-up-' + typ2 + '').qtip(qtImg).qtip('show');
            return false;
        }
        $('#' + typ1 + '_' + typ2 + '_f').focus().trigger('click');
    });
    //input file onchange
    $('#ctrl-up-' + typ2 + ' input:file').change(function() {
        // submit the form
        if ($.inArray($(this).val().split('.').pop().toLowerCase(), feImages) == -1) {
            feImagesTip['text'] = twig.msg_q_images_only;
            $('#ctrl-up-' + typ2 + '').qtip(qtImg).qtip('show');
            return false;
        }
        //$('#'+typ1+'_username').prop('readonly',true);
        var formdata = new FormData();
        formdata.append($(this).attr('name'), $(this)[0].files[0]);
        formdata.append($('#' + typ1 + '_id').attr('id'), $('#' + typ1 + '_id').val());
        upboxImg.url = $('#images-' + typ2 + '').data('path');
        upboxImg.data = formdata;
        $.ajax(upboxImg); //send formData to server-side, only file
    });
    //click remove image if exists
    $('#but-rem-' + typ2 + '').click(function() {
        var thiz = $(this);
        bootbox.confirm({
            message: twig.msg_q_img_remove_confirmation,
            buttons: {
                confirm: {
                    label: 'Ja',
                    className: 'btn-success'
                },
                cancel: {
                    label: 'Nein',
                    className: 'btn-danger'
                }
            },
            size: 'small',
            callback: function(result) {
                if (result) {
                    $('#img-' + typ2 + '').prop('src', $('#images-' + typ2 + '').data('src2'));
                    $('#' + typ1 + '_' + typ2 + '').val('');
                    $('#' + typ1 + '_' + typ2 + '_has').val('');
                    thiz.hide();
                }
            }
        });

    });

    // file-upload-ajax settings
    var upboxImg = {
        type: 'post',
        dataType: 'json',
        async: true,
        processData: false, // tell jQuery not to process the data
        contentType: false, // tell jQuery not to set contentType
        xhr: function() {
            var xhr = new window.XMLHttpRequest();
            //Upload progress
            xhr.upload.addEventListener('progress', function(evt) {
                if (evt.lengthComputable) {
                    var percentComplete = evt.loaded / evt.total;
                    $('.progress-' + typ2 + ' > .progress-bar').css('width', percentComplete + '%').attr('aria-valuenow', percentComplete);
                    //Do something with upload progress
                    console.log(percentComplete);
                }
            }, false);
            return xhr;
        },
        beforeSend: function() {
            feImagesTip['text'] = '';
            $('.progress-' + typ2 + ' > .progress-bar').removeClass('progress-bar-danger').css('width', 0 + '%').attr('aria-valuenow', 0).parent().fadeIn(300);
        }, // success identifies the function to invoke when the server response has been received
        success: function(data) {
            //server-side error @see -> error:
            //if(!data.jerr) console.log('Server side error');
            //some errors returning by server response
            if (data.jerr != 'ok') {
                feImagesTip['text'] += '<b>' + data.fncl + '</b> – ' + data.jerr + '<br>';
                //add tip for errors from server
                $('#ctrl-up-' + typ2 + '').qtip(qtImg).qtip('show');
                $('#' + typ1 + '_' + typ2 + '_has').val('');
                $('.progress-' + typ2 + ' > .progress-bar').addClass('progress-bar-danger').css('width', 100 + '%').attr('aria-valuenow', 100).parent().slideUp(4000);
                return;
            } else {
                $('#ctrl-up-' + typ2 + '').qtip('hide');
                $('#images-' + typ2 + '').empty();
                $(data.html).appendTo($('#images-' + typ2 + ''));
                $('#' + typ1 + '_' + typ2 + '_has').val('1');
                $('#' + typ1 + '_' + typ2 + '').val(data.fnor);
                $('#but-rem-' + typ2 + '').show();
            }
            $('.progress-' + typ2 + ' > .progress-bar').css('width', 100 + '%').attr('aria-valuenow', 100).parent().slideUp(2000);
        },
        error: function(xhr, ao, e) {
            $('.progress-' + typ2 + ' > .progress-bar').css('width', 100 + '%').attr('aria-valuenow', 100).parent().fadeOut(2000);
            console.log(xhr.status + ', Fehler: ' + e + '');
            //some errors returning by server-side
            feImagesTip['text'] += '<b>' + xhr.status + '</b> – Fehler: ' + e + '<br>'; //+ $(xhr.responseText).find('.block-exception');
            //add tip for errors from server
            $('#ctrl-up-' + typ2 + '').qtip(qtImg).qtip('show');
            $('#' + typ1 + '_' + typ2 + '_has').val('');
        }
    };
}

function initQuizImgUp(typ) {
    if (!$('#quiz_' + typ + '_f').length) return; //nothing to do, if not on the page of profile-edit
    //AJAX UPLOADER for Quiz Images
    //Handle drag and drop events with jQuery
    var obj = $('#images-' + typ);
    obj.on('dragenter', function(e) {
        e.stopPropagation();
        e.preventDefault();
    });
    obj.on('dragover', function(e) {
        e.stopPropagation();
        e.preventDefault();
    });
    obj.on('drop', function(e) {
        e.preventDefault();
        var file = e.originalEvent.dataTransfer.files[0];
        //We need to send dropped files to Server
        // submit the form
        if ($.inArray(file.name.split('.').pop().toLowerCase(), feImages) == -1) {
            feImagesTip['text'] = twig.msg_q_images_only;
            $('#ctrl-up-' + typ + '').qtip(qtImg).qtip('show');
            return false;
        }
        var formdata = new FormData();
        //the name should be the same as in input-file, see bellow $(this).attr('name')
        formdata.append('quiz[' + typ + '_f]', file);
        formdata.append($('#quiz_id').attr('id'), $('#quiz_id').val());
        upboxImg.url = $('#images-' + typ + '').data('path');
        upboxImg.data = formdata;
        $.ajax(upboxImg); //send formData to server-side, only file
    });
    //If the files are dropped outside the div, file is opened in the browser window. To avoid that we can prevent ‘drop’ event on document.
    $(document).on('dragenter', function(e) {
        e.stopPropagation();
        e.preventDefault();
    });
    $(document).on('dragover', function(e) {
        e.stopPropagation();
        e.preventDefault();
    });
    $(document).on('drop', function(e) {
        e.stopPropagation();
        e.preventDefault();
    });

    $('#but-up-' + typ + '').click(function() {
        if ($('#quiz_title').val() == '') {
            feImagesTip['text'] = twig.msg_q_insert_title;
            $('#ctrl-up-' + typ + '').qtip(qtImg).qtip('show');
            return false;
        }
        $('#quiz_' + typ + '_f').focus().trigger('click');
    });
    //input file onchange
    $('#ctrl-up-' + typ + ' input:file').change(function() {
        // submit the form
        if ($.inArray($(this).val().split('.').pop().toLowerCase(), feImages) == -1) {
            feImagesTip['text'] = twig.msg_q_images_only;
            $('#ctrl-up-' + typ + '').qtip(qtImg).qtip('show');
            return false;
        }
        //$('#quiz_username').prop('readonly',true);
        var formdata = new FormData();
        formdata.append($(this).attr('name'), $(this)[0].files[0]);
        formdata.append($('#quiz_id').attr('id'), $('#quiz_id').val());
        upboxImg.url = $('#images-' + typ + '').data('path');
        upboxImg.data = formdata;
        $.ajax(upboxImg); //send formData to server-side, only file
    });
    //click remove image if exists
    $('#but-rem-' + typ + '').click(function() {
        var thiz = $(this);
        bootbox.confirm({
            message: 'Bist du sicher?',
            buttons: {
                confirm: {
                    label: 'Ja',
                    className: 'btn-success'
                },
                cancel: {
                    label: 'Nein',
                    className: 'btn-danger'
                }
            },
            size: 'small',
            callback: function(result) {
                if (result) {
                    $('#img-' + typ + '').prop('src', $('#images-' + typ + '').data('src2'));
                    $('#quiz_' + typ + '').val('');
                    $('#quiz_' + typ + '_has').val('');
                    thiz.hide();
                }
            }
        });

    });

    // file-upload-ajax settings
    var upboxImg = {
        type: 'post',
        dataType: 'json',
        async: true,
        processData: false, // tell jQuery not to process the data
        contentType: false, // tell jQuery not to set contentType
        xhr: function() {
            var xhr = new window.XMLHttpRequest();
            //Upload progress
            xhr.upload.addEventListener('progress', function(evt) {
                if (evt.lengthComputable) {
                    var percentComplete = evt.loaded / evt.total;
                    $('.progress-' + typ + ' > .progress-bar').css('width', percentComplete + '%').attr('aria-valuenow', percentComplete);
                    //Do something with upload progress
                    console.log(percentComplete);
                }
            }, false);
            return xhr;
        },
        beforeSend: function() {
            feImagesTip['text'] = '';
            $('.progress-' + typ + ' > .progress-bar').removeClass('progress-bar-danger').css('width', 0 + '%').attr('aria-valuenow', 0).parent().fadeIn(300);
        }, // success identifies the function to invoke when the server response has been received
        success: function(data) {
            //server-side error @see -> error:
            //if(!data.jerr) console.log('Server side error');
            //some errors returning by server response
            if (data.jerr != 'ok') {
                feImagesTip['text'] += '<b>' + data.fncl + '</b> – ' + data.jerr + '<br>';
                //add tip for errors from server
                $('#ctrl-up-' + typ + '').qtip(qtImg).qtip('show');
                $('#quiz_' + typ + '_has').val('');
                $('.progress-' + typ + ' > .progress-bar').addClass('progress-bar-danger').css('width', 100 + '%').attr('aria-valuenow', 100).parent().slideUp(4000);
                return;
            } else {
                $('#ctrl-up-' + typ + '').qtip('hide');
                $('#images-' + typ + '').empty();
                $(data.html).appendTo($('#images-' + typ + ''));
                $('#quiz_' + typ + '_has').val('1');
                $('#quiz_' + typ + '').val(data.fnor);
                $('#but-rem-' + typ + '').show();
            }
            $('.progress-' + typ + ' > .progress-bar').css('width', 100 + '%').attr('aria-valuenow', 100).parent().slideUp(2000);
        },
        error: function(xhr, ao, e) {
            $('.progress-' + typ + ' > .progress-bar').css('width', 100 + '%').attr('aria-valuenow', 100).parent().fadeOut(2000);
            console.log(xhr.status + ', Fehler: ' + e + '');
            //some errors returning by server-side
            feImagesTip['text'] += '<b>' + xhr.status + '</b> – Fehler: ' + e + '<br>'; //+ $(xhr.responseText).find('.block-exception');
            //add tip for errors from server
            $('#ctrl-up-' + typ + '').qtip(qtImg).qtip('show');
            $('#quiz_' + typ + '_has').val('');
        }
    };
}