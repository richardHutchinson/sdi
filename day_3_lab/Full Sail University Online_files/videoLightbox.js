function openLightbox(fileType){
	if(fileType == undefined){
		fileType = '';	
	};
	if($mask.length && $container.length){
		$container.removeClass('f4vLightbox movLightbox emailLightbox');
		switch(fileType){
			case '':
				break;
			case 'f4v':
				$container.addClass('f4vLightbox');
				if(!$('#f4vVideoWrapper').length){
					$('.lightboxContent').append('<div id="f4vVideoWrapper"></div>');
				};
				break;
			case 'flv':
				$container.addClass('f4vLightbox');
				if(!$('#f4vVideoWrapper').length){
					$('.lightboxContent').append('<div id="f4vVideoWrapper"></div>');
				};
				break;
			case 'm4v':
				$container.addClass('movLightbox');
				break;
			case 'mov':
				$container.addClass('movLightbox');
				break;
			case 'email':
				$container.addClass('emailLightbox');
				break;
			default:
				break;
		};
		$mask.fadeTo('normal',0.66);
		$container.fadeTo('normal',1);
	}else{
		createLightbox(fileType);
	};
}; 

function closeLightbox(animate) {
	$('.lightboxContent').hide();
	if(!$('#f4vVideoWrapper').length){
		$('.lightboxContent').html('');
	}else{
		$('#f4vVideoWrapper').html('');
	};
	if(animate == undefined){
		animate = true;
	};
	if(animate){
		$('.lightboxMask,.lightboxContainer').fadeOut('normal',function(){
			$('.loadingContent').show();
		});
	}else{
		$mask.hide();
		$container.hide();
		$('.loadingContent').show();
	};
	
};

function createLightbox(fileType){
	var html = '<div class="lightboxMask"></div>';
	html += '<div class="lightboxContainer">';
	html += '<div class="titleBar1">';
	html += '<div class="closeLightbox right hideText">Close</div>';
	html += '</div>';
	html += '<div class="lightboxContentWrapper">';
	html += '<div class="loadingContent"></div>';
	html += '<div class="lightboxContent">';
	switch(fileType){
		case 'flv':
			html += '<div id="f4vVideoWrapper"></div>';
			break;
		case 'f4v':
			html += '<div id="f4vVideoWrapper"></div>';
			break;
		case 'email':
			html += '<div id="f4vVideoWrapper"></div>';
			break;
		case 'mov':
			html += '<div id="movVideoWrapper"></div>';
			break;
		default:
			break;
	};
	html += '</div>';
	html += '</div>';
	html += '</div>';
	$('body').append(html);
	init();
	if(fileType == 'flv' || fileType == 'f4v'){
		$container.addClass('f4vLightbox');
	}else if(fileType == 'mov'){
		$container.addClass('movLightbox');
	}else if(fileType == 'email'){
		$container.addClass('emailLightbox');
	};
	openLightbox();
};

/* resize the background mask for the lightbox */
function resizeLightboxMask() {
	$mask.css({
		"width": $(window).width(),
		"height": $(window).height()
	});	
};

/* centers lightbox container to middle of the screen */
function centerLightbox(){
    	$container.css('top', ( $(window).height() - $container.height() ) / 2+ 'px');  
    	$container.css('left', ( $(window).width() - $container.width() ) / 2+ 'px');
};

function init(){

	// Controls how all flash video content will open.
	$('.flv a,.f4v a,.flv,.f4v').live('click',function(){
		var videoLocation = $(this).attr('href');
		openLightbox('flv');	
		$('.lightboxContainer').addClass('f4vLightbox');
		// autoPly is not a typo here, it was mistyped in the videoPlayer.swf
		var flashvars = {
			autoPly: "no",
			defaultVideo: videoLocation
		};
		var params = {
			quality: "best",
			allowfullscreen: "true",
			wmode: "transparent"
		};
		var attributes = {
			id: "f4vVideoWrapper"
		};
		
		function onLoad(e){
			alert(e);
		};
		
		swfobject.embedSWF("/assets/shared/flash/videoPlayer.swf", "f4vVideoWrapper", "580", "326", "9.0.115", false, flashvars, params, attributes,onLoad);
		$('.loadingContent').fadeOut(200);
		$('.lightboxContent').delay(300).fadeIn(200);
		
		return false;
	});

	$('.lightboxContent').hide();
	$container = $('.lightboxContainer');
	$mask = $('.lightboxMask');
	centerLightbox();
	resizeLightboxMask();
	
	$('.closeLightbox,.lightboxMask').bind('click',closeLightbox);
};

$(function(){
	
	init();
	$container.hide();
	$mask.hide();
	
	$(window).resize(function() {
		resizeLightboxMask();
		centerLightbox();
	});
});