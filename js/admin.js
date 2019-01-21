/**
 *
 */

$(document).ready(function() {
    initA();
})

function initA() {
    $.fn.validator.Constructor.INPUT_SELECTOR = ':input:not([type="hidden"], [type="submit"], [type="reset"], button, .select2-search__field)';
    //init radio / checkbox
    $.fn.bootstrapSwitch.defaults.onText = '.';
    $.fn.bootstrapSwitch.defaults.offText = '.';
    $.fn.bootstrapSwitch.defaults.onColor = 'success';
    $.fn.bootstrapSwitch.defaults.offColor = 'default';
    $.fn.bootstrapSwitch.defaults.size = 'mini';
    $(":radio, :checkbox").bootstrapSwitch();

    //range change
    $('.rangeslider').on('change', function() {
        $('#' + $(this).attr('id') + 'Info').html($(this).val());
    })

    //init select
    $('.selectpicker').selectpicker({
        style: 'btn btn-default',
        size: 10,
    });

    //init datetime picker
    $('.datetimepicker').datetimepicker({
        locale: 'de',
        format: 'DD.MM.YYYY HH:mm'
    });
    $('.datepicker').datetimepicker({
        locale: 'de',
        format: 'DD.MM.YYYY'
    });
    $('.timepicker').datetimepicker({
        locale: 'de',
        format: 'HH:mm'
    });
    //init select2
    $(".select2").select2({
        tags: true,
        tokenSeparators: [',']
    });

    $('.select2').on("select2:unselect", function(e) {
        $(e.params.data).show();
        if (!e.params.originalEvent) {
            return
        }
        $('.select2-search__field').on('focusout', function(e) {
            e.stopPropagation();
        })
        e.params.originalEvent.stopPropagation();
    });

    $('.select2').on("select2:open", function(e) {
        $('.select2-results li[aria-selected="true"]').hide();
    });

    //init share
    if ($('input[id="quiz_sharehs_0"]').is(':checked') ||
        $('input[id="quiz_shareanalysis_0"]').is(':checked') || $('input[id="quiz_sharereward_0"]').is(':checked')) {
        //$('input[name="quiz[share]"]').bootstrapSwitch('state', true, true);
        $('.form-group-share').slideDown();
    } else {
        //$('input[name="quiz[share]"]').bootstrapSwitch('state', true, false);
        $('input[name="quiz[sharehs]"]').bootstrapSwitch('state', true, false);
        $('input[name="quiz[shareanalysis]"]').bootstrapSwitch('state', true, false);
        $('input[name="quiz[sharereward]"]').bootstrapSwitch('state', true, false);
        $('.form-group-share').slideUp();
    }
    $('input[id="quiz_share_1"]').on('switchChange.bootstrapSwitch', function(event, state) {
        if (state) {
            $('input[name="quiz[sharehs]"]').bootstrapSwitch('state', true, false);
            $('input[name="quiz[shareanalysis]"]').bootstrapSwitch('state', true, false);
            $('input[name="quiz[sharereward]"]').bootstrapSwitch('state', true, false);
            $('.form-group-share').slideUp();
        }

    })
    $('input[id="quiz_share_0"]').on('switchChange.bootstrapSwitch', function(event, state) {
            if (state) {
                $('.form-group-share').slideDown();
            }
        })
        //init joker
    if ($('input[id="quiz_joker_0"]').is(':checked') ||
        $('input[id="quiz_joker5050_0"]').is(':checked') ||
        $('input[id="quiz_jokerpause_0"]').is(':checked') ||
        $('input[id="quiz_jokerskip_0"]').is(':checked')) {
        //$('input[name="quiz[joker]"]').bootstrapSwitch('state', true, true);
        $('.form-group-joker').slideDown();
    } else {
        //$('input[name="quiz[joker]"]').bootstrapSwitch('state', true, false);
        $('input[name="quiz[joker5050]"]').bootstrapSwitch('state', true, false);
        $('input[name="quiz[jokerpause]"]').bootstrapSwitch('state', true, false);
        $('input[name="quiz[jokerskip]"]').bootstrapSwitch('state', true, false);
        $('.form-group-joker').slideUp();
    }
    $('input[id="quiz_joker_1"]').on('switchChange.bootstrapSwitch', function(event, state) {
        if (state) {
            $('input[name="quiz[joker5050]"]').bootstrapSwitch('state', true, false);
            $('input[name="quiz[jokerpause]"]').bootstrapSwitch('state', true, false);
            $('input[name="quiz[jokerskip]"]').bootstrapSwitch('state', true, false);
            $('.form-group-joker').slideUp();
        }

    })
    $('input[id="quiz_joker_0"]').on('switchChange.bootstrapSwitch', function(event, state) {
        if (state) {
            $('.form-group-joker').slideDown();
        }
    })

    //18.04.2017, astoian - init image-load shoe/hide
    $('input[id="cb-avatar-1"]').on('switchChange.bootstrapSwitch', function(event, state) {
        if (state) {
            $('.img-avatar').slideDown();
        }
    });
    $('input[id="cb-avatar-0"]').on('switchChange.bootstrapSwitch', function(event, state) {
        if (state) {
            $('.img-avatar').slideUp();
        }
    });

    //17.12.2017, astoian - answwer-solution hide/show
    if ($('input[id="question_solution_0"]').is(':checked')) {
        $('.form-group-solution').slideDown();
    } else {
        $('.form-group-solution').hide();
    }
    $('input[id="question_solution_0"]').on('switchChange.bootstrapSwitch', function(event, state) {
        if (state) {
            $('.form-group-solution').slideDown();
        }
    });
    $('input[id="question_solution_1"]').on('switchChange.bootstrapSwitch', function(event, state) {
        if (state) {
            $('.form-group-solution').slideUp();
        }
    });

    //21.12.2017, astoian
    //init ads
    if ($('input[id="quiz_ads_0"]').is(':checked')) {
        $('.form-group-ads').slideDown();
    } else {
        $('.form-group-ads').slideUp();
    }
    $('input[id="quiz_ads_1"]').on('switchChange.bootstrapSwitch', function(event, state) {
        if (state) {
            $('.form-group-ads').slideUp();
        }

    })
    $('input[id="quiz_ads_0"]').on('switchChange.bootstrapSwitch', function(event, state) {
        if (state) {
            $('.form-group-ads').slideDown();
        }
    })


    function btndel(thiz) {
        //var thiz=$(this);
        bootbox.confirm({
            message: twig.msg_admin_delete_confirmation,
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
                    location.href = thiz.data('href');
                }
            }
        });
    }
    //init button clicks in the view
    $('.btn-del').on('click', function() {
        btndel($(this));
    })


    //init tooltips
    //$('[data-toggle="tooltip"]').tooltip();
    //CROPPER & AJAX UPLOADER for avatar in user only
    initUserImgUp("avatar", { aspectRatio: 1 / 1, minContainerWidth: 200, minContainerHeight: 200, minCropBoxWidth: 10 });

    //CROPPER & AJAX UPLOADER for avatar in question only
    init1000500ImgUp('question', 'avatar');
    init1000500ImgUp('question', 'avatar2');
    //CROPPER & AJAX UPLOADER for avatar in screen-gameover only
    init1000500ImgUp('screengameover', 'avatar');
    init1000500ImgUp('screengameover', 'avatar2');
    //AJAX UPLOADER for Logo in Quiz
    initQuizImgUp("logo1");
    initQuizImgUp("logo2");
    //AJAX UPLOADER for Background in Quiz
    initQuizImgUp("background");
    //AJAX UPLOADER for Facebook (fb1) in Quiz
    initQuizImgUp("fb1");

    //Quiz-Question
    initQQ();


    //dialog password
    dlgPwd()


    //ANSWERS VALIDATION
    //$('.answers-group > .list-group-item input').removeAttr('required');
    $('.answers-group > .list-group-item:visible textarea.form-control-title').prop('required', true);
    //answers count toggle
    $('.answers-count').on("click", function() {
        $(this).addClass('active');
        $(this).siblings().removeClass('active');
        $('.answers-group > .list-group-item:gt(-7)').hide()
        $('.answers-group > .list-group-item:gt(-7) textarea.form-control-title').removeAttr('required')
        $('.answers-group > .list-group-item:lt(' + $(this).text() + ')').show();
        $('.answers-group > .list-group-item:lt(' + $(this).text() + ') textarea.form-control-title').prop('required', true);
        $('#question_answercount').val($(this).text());
        $('form').validator('update');
    });

    //hidden answers on form should not to be as required
    $('#f-admin-question').validator({
        custom: {
            'correct': function($el) {
                var count = $el.val(); // 1-8
                var bcorrect = false;
                for (var i = 0; i < count; i++) {
                    //if($('input[name="question[answers]['+i+'][status]"]').bootstrapSwitch('state')) return false;
                    if ($('input[id="question_answers_' + i + '_status_0"]').is(':checked')) return false;
                }
                return true;
            },
            'incorrect': function($el) {
                var count = $el.val(); // 1-8
                for (var i = 0; i < count; i++) {
                    if ($('input[id="question_answers_' + i + '_status_1"]').is(':checked')) return false;
                }
                return true;
            }
        }
    });

    for (var i = 0; i < 8; i++) {
        $('input[name="question[answers][' + i + '][status]').on('switchChange.bootstrapSwitch', function(event, state) {
            $('form').validator('update');
            //$('form').validator('validate');
            $('#question_answercount').trigger('input')
        })
    }

    //13.04.2017, astoian - mark/unmark checkboxes in the tables
    $('.btn-sel-all').on("click", function() {
        $cb_sel = $('input[id^="cb-e"]:checked')
        $cb_all = $('input[id^="cb-e"]');
        if ($cb_sel.length != $cb_all.length) {
            $('input[id^="cb-e"]').bootstrapSwitch('state', true);
        } else {
            $('input[id^="cb-e"]').bootstrapSwitch('state', false);
        }
    })

    //13.04.2017, astoian - mark/unmark checkboxes in the tables
    $('.btn-sel-status-1, .btn-sel-status-0, .btn-sel-del, #modal-ok-category').on('click', function() {
        $this = $(this);
        //ids of the questions
        var ids = $('input[id^="cb-e"]:checked').map(function(i) {
            return $(this).data('id'); // this callback function will be called once for each matching element 
        }).get();
        var id = ids.join();
        if (id == '') {
            bootbox.alert({
                message: twig.msg_admin_bulk_edit_select_one,
                size: 'small'
            });
            return;
        }
        //ids of the categories
        var idcats = $('#sel-question-category').val();
        var idcat = "";
        if (idcats != null && idcats.length > 0) {
            idcat = idcats.join();
        }

        var act = $this.data('act');
        var isContinue = true;
        if (act == 'del') {
            bootbox.confirm({
                message: twig.msg_admin_delete_confirmation,
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
                    if (result) { // Dialog code does not block code execution, known issue
                        $.ajax({
                            type: 'GET',
                            url: $('#dd-edit').data('path') + '?act=' + act + '&id=' + id,
                            success: function(data) {
                                $('#t-ajax').html(data.html);
                                $('#t-ajax :checkbox').bootstrapSwitch();
                                $('.btn-del').on('click', function() { btndel($(this)); })
                                bootbox.alert({
                                    message: twig.msg_admin_question_delete_success,
                                    size: 'small'
                                });
                            },
                            error: function(r, s, err) {
                                console.log(err);
                            }
                        });
                    }
                }
            });
        } else {
            $.ajax({
                type: 'GET',
                url: $('#dd-edit').data('path') + '?act=' + act + '&id=' + id + '&idc=' + idcat,
                success: function(data) {
                    $('#t-ajax').html(data.html);
                    $('#t-ajax :checkbox').bootstrapSwitch();
                    $('.btn-del').on('click', function() { btndel($(this)); })
                    bootbox.alert({
                        message: twig.msg_admin_question_update_success,
                        size: 'small'
                    });
                },
                error: function(r, s, err) {
                    console.log(err);
                }
            });
            $('#modal-category').modal('hide');
        }

        //if (!isContinue) return;//if by deletion is NO selected, otherwise always is true

    })
    $('#modal-category').on('shown.bs.modal', function() {
        $('.select2-search__field').focus()
    })
    $('.btn-sel-cat').on('click', function() {
        var ids = $('input[id^="cb-e"]:checked').map(function(i) {
            return $(this).data('id'); // this callback function will be called once for each matching element 
        }).get();
        var id = ids.join();
        if (id == '') {
            bootbox.alert({
                message: twig.msg_admin_question_bulk_edit_select_one,
                size: 'small'
            });
            return;
        }
        $('#modal-category').modal('show');
    })

    //17.04.2017, astoian - colors-picker
    if ($().colorpicker) {
        $('div[id^="cp-color"]').colorpicker();
        //$('#cp-color1').colorpicker();
    }

    //22.04.2017, astoian - screen result select
    $('#sel-quiz-result, #sel-quiz-gameover, #sel-quiz-highscore, #sel-quiz-sharee').on('change', function() {
        var url = $(this).val(); // get selected value
        if (url) { // require a URL
            window.location = url; // redirect
        }
        return false;
    });

    //22.04.2017, astoian - reset to default values of the screen-result
    $('#btn-screen-result-reset').on('click', function() {
        $('#screenresult_title1').val(twig.screen_result_title1);
        $('#screenresult_title2').val(twig.screen_result_title2);
        $('#screenresult_title3').val(twig.screen_result_title3);
        $('#screenresult_title4').val(twig.screen_result_title4);
    })

    //09.05.2017, astoian - reset to default values of the screen-gameover
    $('#btn-screen-gameover-reset').on('click', function() {
        $('#screengameover_title1').val(twig.screen_gameover_title1);
        $('#screengameover_title2').val(twig.screen_gameover_title2);
        $('#screengameover_title3').val(twig.screen_gameover_title3);
        $('#screengameover_title4').val(twig.screen_gameover_title4);
    })

    //09.05.2017, astoian - reset to default values of the screen-highscore
    $('#btn-screen-highscore-reset').on('click', function() {
        $('#screenhighscore_title1').val(twig.screen_highscore_title1);
        $('#screenhighscore_titlem1').val(twig.screen_highscore_titlem1);
        $('#screenhighscore_titlem2').val(twig.screen_highscore_titlem2);
        $('#screenhighscore_titlem3').val(twig.screen_highscore_titlem3);
        $('#screenhighscore_titlea1').val(twig.screen_highscore_titlea1);
        $('#screenhighscore_titlea2').val(twig.screen_highscore_titlea2);
        $('#screenhighscore_titlea3').val(twig.screen_highscore_titlea3);
        $('#screenhighscore_title4').val(twig.screen_highscore_title4);
        $('#screenhighscore_title5').val(twig.screen_highscore_title5);
        $('#screenhighscore_title6').val(twig.screen_highscore_title6);
        $('#screenhighscore_title7').val(twig.screen_highscore_title7);
        $('#screenhighscore_title8').val(twig.screen_highscore_title8);
        $('#screenhighscore_title9').val(twig.screen_highscore_title9);
    })

    //09.05.2017, astoian - reset to default values of the screen-sharee
    $('#btn-screen-sharee-reset').on('click', function() {
        $('#screensharee_title1').val(twig.screen_sharee_title1);
        $('#screensharee_title2').val(twig.screen_sharee_title2);
        $('#screensharee_title3').val(twig.screen_sharee_title3);
        $('#screensharee_title4').val(twig.screen_sharee_title4);
        $('#screensharee_title5').val(twig.screen_sharee_title5);
    })

    //27.10.2017, astoian - analysis on/off
    if ($('input[id="quiz_analysis_1"]').is(':checked')) {
        $('#form-group-evaluations').slideUp();
        $('.form-group-analysisi').slideUp();
    }
    $('input[id="quiz_analysis_1"]').on('switchChange.bootstrapSwitch', function(event, state) {
        if (state) {
            $('#form-group-evaluations').slideUp();
            $('.form-group-analysisi').slideUp();
        }
    });
    $('input[id="quiz_analysis_0"]').on('switchChange.bootstrapSwitch', function(event, state) {
        if (state) {
            $('.form-group-analysisi').slideDown();
            if ($('input[id="quiz_analysisi_0"]').is(':checked')) {
                $('#form-group-evaluations').slideDown();
            }
        }
    });

    //08.05.2017, astoian - individual analysis on/off
    if ($('input[id="quiz_analysisi_1"]').is(':checked')) {
        $('#form-group-evaluations').slideUp();
    }
    $('input[id="quiz_analysisi_1"]').on('switchChange.bootstrapSwitch', function(event, state) {
        if (state) {
            $('#form-group-evaluations').slideUp();
        }
    });
    $('input[id="quiz_analysisi_0"]').on('switchChange.bootstrapSwitch', function(event, state) {
        if (state) {
            $('#form-group-evaluations').slideDown();
        }
    });

    //02.05.2017, astoian - click + Auswertung
    //$collectionHolder.data('index', $collectionHolder.find(':input').length);
    $('#btn-evaluation-add').on('click', function() {
        // Get the #form-group that holds the collection of evaluations
        $collectionHolder = $('#form-group-evaluations');
        // Get the data-prototype explained earlier
        var prototype = $collectionHolder.data('prototype');
        // get the new index
        var index = $collectionHolder.data('index');
        // Replace '__name__' in the prototype's HTML to
        // instead be a number based on how many items we have
        //var newForm = prototype.replace(/__name__/g, index + 1);
        var newScore = $('<div class="col-xs-2 form-group"><input type="number" id="quiz_evaluations_' + index + '_score" name="quiz[evaluations][' + index + '][score]" required="required" class="form-control" /><div class="help-block with-errors"></div></div>')
        var newTitle = $('<div class="col-xs-8 form-group"><input type="text" id="quiz_evaluations_' + index + '_title" name="quiz[evaluations][' + index + '][title]" required="required" class="form-control" /><div class="help-block with-errors"></div></div>')
        var newRemove = $('<div class="col-xs-2"><span class="btn btn-danger btn-xs btn-evaluation-remove" id="btn-evaluation-remove" data-index="' + index + '" style="">- Auswertung</span></div>')
            // increase the index with one for the next item
        $collectionHolder.data('index', index + 1);
        var newRow = $('<div class="row" id="row-evaluation-' + index + '"></div>').append(newScore).append(newTitle).append(newRemove);
        $('#row-evaluations').append(newRow);
        //	    $('#row-evaluations').append(newScore);
        //	    $('#row-evaluations').append(newTitle);
        //	    $('#row-evaluations').append(newRemove);
        $('form').validator('update');
        $('.btn-evaluation-remove').off('click').on('click', function() {
            var index = $(this).data('index');
            $('#row-evaluation-' + index).remove();
        })
        $('#row-evaluations input[id$="_score"]').on('blur', function() {
            var $p = $('#row-evaluations');
            var $rows = $p.children('.row').sort(function(a, b) {
                var vA = $('input[id$="_score"]', a).val();
                var vB = $('input[id$="_score"]', b).val();
                return (parseInt(vA, 10) < parseInt(vB, 10)) ? -1 : (parseInt(vA, 10) > parseInt(vB, 10)) ? 1 : 0;
            });
            $p.append($rows);
        })
    })
    $('.btn-evaluation-remove').on('click', function() {
        var index = $(this).data('index');
        $('#row-evaluation-' + index).remove();
    })


    //03.10.2018, astoian - remove admin scores
    $('.admin-score-remove').click(function() {
        var btn = $(this);
        $.ajax({
            url: btn.data("path"),
            success: function(data) {
                console.log(data)
                    // alert('Alle Admin-Punkte sind gelöscht')
                $('#admin-modal-body-ok').text(data.html);
                $('#admin-modal-ok').modal('show')
            },
            error: function(r, s, err) {
                console.log(err);
            }
        });
        return false;
    });

}

function initQQ() {
    $('.btn-qq').click(function() {
        var act = 'rem';
        var btn = $(this);
        btn.removeClass('btn-danger');
        if (btn.hasClass('btn-default')) act = 'rem';
        else act = 'add';
        toggle(btn);
        $.ajax({
            type: "POST",
            url: btn.data("path") + "?act=" + act + "&id1=" + btn.data("id1") + "&id2=" + btn.data("id2"),
            success: function(data) {
                //toggle(btn);
            },
            error: function(r, s, err) {
                toggle(btn);
                btn.addClass('btn-danger');
                console.log(err);
            }
        });
        return false;
    });

    function toggle(btn) {
        if (btn.hasClass('btn-default')) {
            btn.removeClass('btn-default');
            btn.addClass('btn-success');
            btn.text('Zuordnen'); //Lesen
        } else {
            btn.removeClass('btn-success');
            btn.addClass('btn-default');
            btn.text('Aus'); //Unlesen
        }
    }

    //quiz-questions
    $('#btn-qq-all').on("click", function() {
        $(this).addClass('active');
        $(this).siblings().removeClass('active');
        $('#panel-qq-new').fadeOut('slow').promise().done(function() {
            $('#panel-qq-all').fadeIn('slow');
            $('.btn-qq.btn-success').parents("tr").fadeIn();
            $('.btn-qq.btn-default').parents("tr").fadeIn();
        });
    });
    $('#btn-qq-new').on("click", function() {
        $(this).addClass('active');
        $(this).siblings().removeClass('active');
        $('#panel-qq-all').fadeOut('slow').promise().done(function() {
            $('#panel-qq-new').fadeIn('slow');
        });
    });


    //Quicksearch for all by typing
    if ($('.btn-search').length) {
        var list = $('.table');
        $(".form-search")
            .change(function() {
                var filter = $(this).val();
                if (filter) {
                    $(list).find(".filter:not(:contains(" + filter + "))").closest("tr").hide();
                    $(list).find(".filter:contains(" + filter + ")").closest("tr").show();
                } else {
                    $(list).find("tr").show();
                }
                return false;
            })
            .keyup(function() {
                $(this).change();
            });
    }

    //Quicksearch for question by select
    $('.search-quiz').on('changed.bs.select', function(e) {
        var list = $('.table');
        var filters = $('option:selected', this).data('cats').split(",");
        if (filters && filters[0] !== '') {
            $(list).find("tr").hide();
            $.each(filters, function(i, v) {
                $(list).find(".filter:contains(" + v + ")").closest("tr").show();
            });
        } else {
            $(list).find("tr").show();
        }
        var question_count = $(list).find("tr:visible");
        $('#question_count_all').text(question_count.length + ' ingesamt');
        $('#question_count_active').text($(question_count).find('span:equals("aktiv")').length + ' aktiv');
    });
}