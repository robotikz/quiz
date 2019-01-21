/**
 * 
 */

$(document).ready(function() {
	initS();
})

function initS(){
	
	$('#username, #password').on('keypress', function() {
		if($('.has-error-server').length){
			$('.form-group').removeClass('has-error-server');
			$('.form-group .help-block').empty();			
		}
	})
	
	//init tooltips
	//$('[data-toggle="tooltip"]').tooltip();
	$('#btn-activate').on("click", function() { 
		$('#f-security-activate').fadeToggle('slow');
	});
	
	//resend activation dialog
	$('#modal-resend').on('show.bs.modal', function (event) {
	  var button = $(event.relatedTarget) // Button that triggered the modal
	  var username = button.data('username') // Extract info from data-* attributes
	  var modal = $(this);
	  $('#modal-resend-label').text(twig.msg_security_resend_activation_code.replace(/%s/g, username)) 
	  modal.find('.modal-body input').val(username)
	})
	
	$('#modal-btn-resend').click(function(){
		var btn=$(this);
		btn.removeClass('btn-danger');
		btn.removeClass('btn-success');
        $.ajax({
             type: "POST",
             url: btn.data("path")+"?u="+$('#modal-username').val(), 
             success: function(data) {
            	 btn.addClass('btn-success');
            	 $('#modal-resend').modal('hide');
             },
             error: function (r, s, err) {
            	 btn.addClass('btn-danger');
            	 console.log(r.responseText); 
            	 $("#modal-resend-alert span.text").text(htmlDecode(r.responseText));
            	 $("#modal-resend-alert").fadeIn();
             }
        });
        return false;
    });
	
	
	//dialog password
    dlgPwd()
}

