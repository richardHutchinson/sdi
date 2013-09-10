$(document).ready(function() {
	var windowWidth, windowHeight;
	var ajaxMessage;
	var messageDisplayed = false;
	
	// if a var to auto show async messages isn't defined, then make sure the default action is to show messages
	if (typeof(autoShowAsyncMessage) == 'undefined') {
		var autoShowAsyncMessage = true;
	}
	
	function setWindowVars() {
		if (self.innerHeight) {	// all except Explorer
			if(document.documentElement.clientWidth){
				windowWidth = document.documentElement.clientWidth; 
			} else {
				windowWidth = self.innerWidth;
			}
			windowHeight = self.innerHeight;
		} else if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode
			windowWidth = document.documentElement.clientWidth;
			windowHeight = document.documentElement.clientHeight;
		} else if (document.body) { // other Explorers
			windowWidth = document.body.clientWidth;
			windowHeight = document.body.clientHeight;
		}
	};
	
	function setMaskSize() {
		$('#ajaxWorking').css({
			'width': windowWidth,
			'height': windowHeight,
			'display': 'block',
			'position': 'fixed',
			'top': '0px',
			'left': '0px',
			'background-color': 'black',
			'opacity': '0.75',
			'z-index': '50'
		});
	};
	
	function positionMessage() {
		var messageHeight = $('#ajaxWorkingMessage').height();
		if (windowHeight < messageHeight) {
			var messageTop = '0px';
		} else {
			var messageTop = ((windowHeight - messageHeight) / 2)+'px';
		}
		var messageLeft = ((windowWidth - 400) / 2)+'px'
		$('#ajaxWorkingMessage').css({
			'color': 'white',
			'text-align': 'center',
			'top': messageTop,
			'left': messageLeft,
			'position': 'fixed',
			'width': '400px',
			'background-image': 'url(/assets/shared/images/pageElements/ajax-loader3.gif)',
			'background-repeat': 'no-repeat',
			'background-position': 'top',
			'padding': '20px 0 0 0',
			'z-index': '51'
		});
	};
	
	function addAjaxMessage(asyncSavingMessage) {
		
		if (asyncSavingMessage == null) {
			ajaxMessage = "Working - please do not close your browser."
		} else {
			ajaxMessage = asyncSavingMessage
		}
		$('<div id="ajaxWorking"></div>').appendTo('body');
		$('<div id="ajaxWorkingMessage"></div>').appendTo('body').html(ajaxMessage);
	};
	
	
	
	openAsyncSavingMessage = function() {
		setWindowVars();
		if(!messageDisplayed) {
			addAjaxMessage();
			messageDisplayed = true
		}
		setMaskSize();
		positionMessage();
		$('.applet').hide();
		// Hide buttons in Announcements tab in faculty portal to prevent the buttons from appearing afterwards.
		$('.buttonsWrapper').hide();	
	};
	
	closeAsyncSavingMessage = function() {
		$('#ajaxWorking, #ajaxWorkingMessage').fadeOut('fast', function() {
			$(this).remove();
			messageDisplayed = false;
			$('.applet').show();
		})
	}
	
	function hideAsyncSavingMessage() {
		$('#ajaxWorking, #ajaxWorkingMessage').hide(function() {
			$(this).remove();
			messageDisplayed = false;
		})
	}

	$(window).resize(function() {
		setWindowVars();
		setMaskSize();
		positionMessage();
	});


	// This gives the application control over when to open the working screen. 
	// Commenting out for now while manually adding the working screens.
	/*if (autoShowAsyncMessage) {
		$(document).ajaxStart(function() {
			openAsyncSavingMessage()  
		});
		$(document).ajaxStop(function() {
			closeAsyncSavingMessage()
		});
	}*/
});