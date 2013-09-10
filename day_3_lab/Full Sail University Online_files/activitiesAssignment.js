$(document).ready(function(){


	// UX Style Manipulation - prepares the UI feedback elements
	$('ul.errorMessage').hide(); 		//Hide error messages


	/**
	 * ---------------------------------------------------
	 * jQuery AJAX Manager main configuration
	 * ---------------------------------------------------
	 * The AJAX manager is used to chain together multiple XHR calls to the remote LMS
	 * API after the Java uploader has done its work.  After triggering the queue to
	 * begin, this will be monitored in a self-recursing function.
	 */
	ajaxManager = $.manageAjax.create('AssetSubmissionQueue', {
		queue: true,
		cacheResponse: true,
		preventDoubleRequests: true
	});

	$('.upload-submit').on('click', function(event){
		submitActivity(event);
	});

	$('#fileupload').bind('fileuploadstop', function (e, data) {
		var hasErrors = false;

		setTimeout(function(){
			$.each($('.files').children('.template-download'), function (index, file) {
		        if($(file).attr('asset_error') != ''){
		        	hasErrors = true;
		        }

		    });

			//if there are no errors, continue submitting the activity
			if(!hasErrors){
				handleUploaderResponse();
			}else{
				showErrorInValidationList('There was an error uploading some of your files. Please try again.');
				window.scrollTo(0, 0);
				$('#submitTheActivity').show();
			}
		}, 500);

	});


	/**
	 * submitActivity()
	 * This is the operation that is tied (by jQuery) to the big old "I've completed this
	 * activity" button that the user clicks on to start this whole process.
	 */
	function submitActivity(event) {
		event.preventDefault();
		//disable the submit button
		$('#submitTheActivity').hide();
		$('#dialog_activity').dialog({
			title			: 'Submit Activity',
			autoOpen		: false,
			closeOnEscape	: true,
			buttons			:
			{
				"No":
					function() {
						$(this).dialog("close");
						$('#submitTheActivity').show();
					},
				"Yes":
					function() {
						$(this).dialog("close");

						// Now that we have those values in there, we can run the Validator.
						if ($('form#submitActivity').valid()) {
							// Begin the upload.  handleUploaderResponse is the statically-defined handler that will get called
							if ($('#fileupload').is(':visible')) {
								$('#submitTheActivity').hide();
								startFileUpload();
							} else {
								saveMyWork();
							}
						}else{
							$('#submitTheActivity').show();
						}
					}
			},
			modal			: true,
			width			: 400,
			height			: 175,
			resizable		: false,
			stack			: false,
			close			: function(){
				$('#submitTheActivity').show();
			}
		});

		$('#dialog_activity').html('Are you sure that you have completed this activity?');
		$('#dialog_activity').dialog('open');
		return false;
	}


	/**
	 * ---------------------------------------------------
	 * jQuery Validator Configuration and Initialization
	 * ---------------------------------------------------
	 * The validator is used to handle the validity of all aspects of the detail form, including
	 * the validation of data coming back from the Java uploader applet.  Flow control will only
	 * execute the validator upon the form _after_ the Java uploader's return packet has been
	 * planted in the form where this configuration will instruct the validator to run rules on
	 * it, which include a custom validation method.
	 *
	 * NOTE: This requires the inclusion of the custom LMS uploader validator methods.
	 */
	$("form#submitActivity").validate({
		debug: false,
		rules: {
			policyAgreement: "required",
		},
		invalidHandler: function(){ scrollTo(0,0);},
		messages:{
			policyAgreement: "Sorry, you must agree with the terms of the Academic Dishonesty policy before submitting."
		},
		errorContainer:".errorMessage",
		errorLabelContainer:".errorMessage",
		wrapper:"li"
	});

});


function startFileUpload(){
	if($('.files').children('.template-upload').length > 0){
		if($('.upload-errors').hasClass('hidden')){
			$('.uploader-start').click();
		}else{
			showErrorInValidationList('Errors exist in the files you are attempting to upload.');
			$('#submitTheActivity').show();
			return false;
		}
	}else{
		showErrorInValidationList('This activity requires a submission.');
		$('#submitTheActivity').show();
		return false;
	}
}

/**
 * saveMyWork()
 * This is the basic functionality that completes the assignment.  Should be triggered _after_
 * any uploading has been finished by the uploader, if applicable.
 */
function saveMyWork() {

	// Let's open a working screen. Opening after data is obtained from the uploader
	// as it needs to be visible and the openAsyncSavingMessage function hides it.
	openAsyncSavingMessage();
	var nActivityId = $('[name=activityId]').val();
	var nDeliveryId = $('[name=deliveryId]').val();
	var nClassSectionId = $('[name=classSectionId]').val();
	var sAccessEventUUID = $('[name=accessEventUUID]').val();

	// Make the XHR call to save the Activity
	$.ajax({
		type: 'post',
		url: '/com/fullsail/lms/service/remote/Learning.cfc',
		dataType: 'json',
		data: ({
			method: 'submitActivity',
			_activityId: nActivityId,
			_deliveryId: nDeliveryId,
			_classSectionId: nClassSectionId,
			_accessEventUUID: sAccessEventUUID,
			returnFormat: 'json'
		}),
		error: function(){
			showErrorInValidationList('An error occurred while trying to process your request');
			$('#submitTheActivity').show();
			window.scrollTo(0, 0);
			return false;
		},
		success: saveMyWork_success
	});
}


function saveMyWork_success(r) {
	// End of request so let's close the working screen
	closeAsyncSavingMessage();
	// Inspect our response object's success boolean
	if (!r.success) {
		// Something went wrong. The service will have placed a helpful message in the response
		showErrorInValidationList(r.message);
		window.scrollTo(0, 0);
		$('#submitTheActivity').show();
		return;
	}
	else {
		$('.fileupload-buttonbar').remove();
		$('.well-small').remove();
		// set Status to complete
		$(".status").text('Completed ');
		//replace the submission div with a successful completion notification
		$('.activityBox').replaceWith("<p class='clear left'>This activity has been completed.</p>");
	}
}

/**
 * handleUploaderResponse()
 * The Java uploader response handler.  I believe this is coded into the applet to be invoked once
 * the uploading of files is complete, success or fail.
 * @param {Object} r The JSON packet returned from the Java uploader's startUpload method invocation
 */
function handleUploaderResponse(){
	addAssets();
} // end handleUploaderResponse()


function addAssets() {
	// Localize some important vars
	var nHostId = $('#AssetSubmission').attr('fs:hostId');
	var sAccessEventUUID = $('div#AssetSubmission').attr('fs:accessEventUUID');
	var sAssetGetDir = $('#AssetSubmission').attr('fs:assetGetDir');
	var nClassSectionId = $('[name=classSectionId]').val();
	var nActivityId = $('[name=activityId]').val();
	var nDeliveryId = $('[name=deliveryId]').val();

	// Loop over all files uploaded and crank them into the uploader
	for (var i = 0; i < $('.files').children('.template-download').length; i++) {
		var file = $('.files').children('.template-download')[i];

		var filename = $(file).attr('asset_filename');
		//filename
		var fname = filename.substring( 0, (filename.lastIndexOf('_')) );
		//uuid
		var startOfUUID = filename.substring( (filename.lastIndexOf('_')));
		var uuid = startOfUUID.substring(0, startOfUUID.indexOf('.'));
		//extension
		var extension = startOfUUID.substring(startOfUUID.indexOf('.') + 1);

		if ((i+1) == $('.files').children('.template-download').length) {
			ajaxManager.add({
				url: "/com/fullsail/lms/service/remote/Asset.cfc",
				type: 'post',
				dataType: 'json',
				error: function(){
					showErrorInValidationList("An error occurred in the file upload process.<br>Please try again.");
				},
				success: checkAssetSavingQueue,
				data: {
					method: "addAssetToTask",
					_classSectionId: nClassSectionId,
					_activityId: nActivityId,
					_deliveryId: nDeliveryId,
					_assetId: 0,
					_forSubmission: true,
					_path: sAssetGetDir,
					_extension: extension,
					_title: fname,
					_uuid: uuid,
					_hostId: nHostId,
					_transmissionStatus: 'succeeded',
					_accessEventUUID: sAccessEventUUID,
					returnFormat: 'json'
				}
			});
		} else {
			ajaxManager.add({
				url: "/com/fullsail/lms/service/remote/Asset.cfc",
				type: 'post',
				dataType: 'json',
				error: function(){
					showErrorInValidationList("An error occurred in the file upload process.<br>Please try again.");
				},
				data: {
					method: "addAssetToTask",
					_classSectionId: nClassSectionId,
					_activityId: nActivityId,
					_deliveryId: nDeliveryId,
					_assetId: 0,
					_forSubmission: true,
					_path: sAssetGetDir,
					_extension: extension,
					_title: fname,
					_uuid: uuid,
					_hostId: nHostId,
					_transmissionStatus: 'succeeded',
					_accessEventUUID: sAccessEventUUID,
					returnFormat: 'json'
				}
			});
		}

	} // for loop
}


function checkAssetSavingQueue() {
	// Examine our AJAX Manager instance to see if it's still in progress
	if (ajaxManager.inProgress) {
		// Yeah, still in progress.  Check back in very short amount of time
		setTimeout('checkAssetSavingQueue()', 300);
	} else {
		// Looks like it's done. call saveMyWork()
		saveMyWork();
	}
}



function showErrorInValidationList(s) {
	$('ul.errorMessage').append('<li><label class="error">' + s + '</label></li>');
	$('ul.errorMessage').show();
}