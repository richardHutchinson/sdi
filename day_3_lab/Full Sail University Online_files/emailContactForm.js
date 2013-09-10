$(document).ready(function(){
	$(document).on("click", "#submitButton", function(){
		// Set the dialog options after the dialog div exists
		$('#dialog').dialog({
			title			: 'Email Form',
			autoOpen		: false,
			closeOnEscape	: true,
			buttons			:
			{
				"Ok":
					function() {
						$(this).dialog("close");
					}
			},
			modal			: true,
			width			: 400,
			height			: 175,
			resizable		: false,
			stack			: false
		});

		// don't send email if subject and message aren't entered (this should be a jquery validate at some point)
		if ($('#subject').val() != '' && $("#message").val() != '') {
			$('#submitButton').attr("disabled", "disabled");


			if($("#copyme").attr('checked') == undefined){
				var copyMe = false;
			}else{
				var copyMe = true;
			}


			if (($('#recipientType').val() == 'instructor')) {
				$.ajax({
					type: "POST",
				    url: "/com/fullsail/lms/service/remote/Notification.cfc",
				    dataType: 'json',
				    data: ({
						method: "messageClassSectionInstructor",
						_classSectionId: $("#classSectionId").val(),
						_subject: $.trim($("#courseCode").val()) + ' ' + $.trim($("#termCode").val()) + ', ' + $.trim($("#sectionCode").val()) + ' - ' + $.trim($("#subject").val()),
						_message: $("#message").val(),
						_copyme: copyMe,
						_accessEventUUID: $("#accessEventUUID").val(),
						returnFormat: 'json'
				    }),
				    error: function(response){
						$('#submitButton').attr("disabled", "enabled");
					},
					success: function(response){
						var msg = 'Email sent.';
						$('#dialog').dialog().html(msg);
						$('#dialog').dialog('open');
						$('#submitButton').attr("disabled", "enabled");
						closeLightbox();
					}
				});
			} else {
				$.ajax({
					type: "POST",
				    url: "/com/fullsail/lms/service/remote/Notification.cfc",
				    dataType: 'json',
				    data: ({
						method: "messagePerson",
						_personId: $("#personId").val(),
						_subject: $("#subject").val(),
						_message: $("#message").val(),
						_copyme: copyMe,
						_accessEventUUID: $("#accessEventUUID").val(),
						returnFormat: 'json'
				    }),
				    error: function(response){
						$('#submitButton').attr("disabled", "enabled");
					},
					success: function(response){
						var msg = 'Email sent.';
						$('#dialog').dialog().html(msg);
						$('#dialog').dialog('open');
						$('#submitButton').attr("disabled", "enabled");
						closeLightbox();
					}
				});
			}
		} else if ($('#subject').val() == '') {
			var msg = 'Please enter a Subject.';
			$('#dialog').dialog().html(msg);
			$('#dialog').dialog('open');
		} else if ($('#message').val() == '') {
			var msg = 'Please enter a Message.';
			$('#dialog').dialog().html(msg);
			$('#dialog').dialog('open');
		} else {
			lightboxClose();
		}
	});
});