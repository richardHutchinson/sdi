//function to delete the pass-through cookie when a user closes their browser. This is to resolve an issue with users bookmarking pages.
window.onbeforeunload = function () {
    deleteCookie('OMNI_ACCESSEVENTUUID');
}

//set a cookie
function setCookie(name, value, expires, path, domain, secure)
{
 	var cookie = escape(name) + '=' + escape(value);
	cookie += (expires ? '; EXPIRES=' + expires.toGMTString() : '');
	cookie += (path ? '; PATH=' + path : '');
	cookie += (domain ? '; DOMAIN=' + domain : '');
	cookie += (secure ? '; SECURE' : '');
	
	document.cookie = cookie;
}

//get a cookie by name
function getCookie(name)
{
 	var value =	  null;
	if(document.cookie)	   //only if exists
	{
       	var arr = document.cookie.split((escape(name) + '=')); 
       	if(2 <= arr.length)
       	{
           	var arr2 = arr[1].split(';');
       		value  = unescape(arr2[0]);
       	}
	}
	return value;
}

//delete a cookie
function deleteCookie(name)
{
 	var tmp = getCookie(name);
	if(tmp){ 
		setCookie(name,tmp,(new Date(1)));
	}
}

// Create a method to check for the existence of a cookie
function cookieExists(cookieName){
	// Create an array of our cookies
	var cookies = document.cookie.split(';');
	
	// Set a return variable. Default to false.
	var cookieExists = false;
	
	// Loop over the cookies and see if it exists
	for(var i=0;i<cookies.length;i++){
		// Get the index of the equals sign. This seperates the name from the value.
		var index = cookies[i].lastIndexOf('=');
		// Seperate the name from the value.
		var name = $.trim(cookies[i].left(index));
		// Check to see if the passed in cookie name matches the current cookie.
		if(cookieName.toLowerCase() == name.toLowerCase()){
			cookieExists = true;
		};
	};
	return cookieExists;
};

function Left(n){
	if (n <= 0) {
		return "";
	}else if (n > String(this).length) {
		return this;
	}else {
		return String(this).substring(0, n);
	};
};
function Right(n){
	if (n <= 0){ 
		return "";
	}else if(n > String(this).length){ 
		return this;
	}else{
		var iLen = String(this).length;
		return String(this).substring(iLen, iLen - n);
	};
};
// Add left and right as methods of all strings. example: var str = 'Test'; str.left(1) will output 'T'.
String.prototype.left = Left;
String.prototype.right = Right;

//This will validate an ajax response to determine whether it's a success or failure
//If it's a failure, it will return false and then display an error message.

function validateCallResponse(response){
	
	//Making sure this is an "object" which SHOULD signify that it's a JSON object
	//WDDX 'shall not pass'
	 if(typeof(response) == 'object'){
	 	//Check to see if response.success is true.
	 	if(!response.success){
			if(response.exception.type == 'SV.RequiredDataUnavailable'){
				window.location = "/index.cfm?fuseaction=" + stXFA['logout'];
			}
			//Verify that ul.errorMessage exists.
			if ($('div#notificationBox').length > 0) {
				//response.success is not true,  then show error.
				displayMessage(response.message, 'error_box');
				closeAsyncSavingMessage(); // hide the working screen if it's open.
				window.scrollTo(0,0);
			}else{}
			return false;
		}else{
			//if it's true, return true.
			return true;
		}
	 }else{
	 	//the response was not valid.  We have no JSON to display a message from.  Return generic error
		//message and return false.
	 	displayMessage('An error occurred while trying to process your request.  Please try again later.', 'error_box');
		window.scrollTo(0,0);
		return false;
	 }
}

$(document).ajaxError(function(){
	// Hide the preloader if visible
	$('#loader').hide();
	// Kill any lightbox window the may try to open. Passing false kills the window with no animations.
	closeLightbox(false);
	displayMessage('An error occurred while trying to process your request.  Please try again later.', 'error_box');
	scrollTo(0,0);
});

// Open Email Lightbox
$('.openEmailLightbox').live('click',function(){
	openLightbox('email');
	
	// Load contents of lightbox with output of a request.
	$.post($(this).attr('href'),function(result,textStatus){
		if(textStatus == 'success'){
			$('.lightboxContent').html(result).hide();
			$('.loadingContent').fadeOut(200,function(){
				$('.lightboxContent').fadeIn(200);
			});
		}else{
			closeLightbox();
		};
	});
	
	return false;
});

// Open a mov lightbox when the user clicks on an instructional video asset
$('.subCol700 .activity a,.openInVideoLightbox').live('click',function(e){
	if($(e.currentTarget).attr('href').right(3) == 'mov' || $(e.currentTarget).attr('href').right(3) == 'm4v'){
		var video = $(this).attr('href');
		openLightbox('mov');
		$('.lightboxContainer').addClass('movLightbox');
		centerLightbox();
		$('.lightboxContent').html('<embed controller="true" height="421" width="720" scale="tofit" name="plugin" src="'+video+'" type="video/quicktime">').show();
		$('.loadingContent').hide();
		
		return false;
	};
});

// Disable right-click menu for flash assets
$('.f4v,.flv').live('contextmenu',function(e){
	e.preventDefault();
});


// sMessage = string value to show the user
// sClassName = CSS class. Options are: general_box, error_box, warning_box, or success_box 
function displayMessage(sMessage, sClassName) {
	$("#notificationBox").html(sMessage);		
	$("#notificationBox").removeClass();
	$("#notificationBox").addClass(sClassName);
	$("#notificationBox").css("display", "block"); 
};

function Left(n,str){
	if (n <= 0) {
		return "";
	}else if (n > String(this).length) {
		return this;
	}else {
		return String(this).substring(0, n);
	};
};
function Right(n){
	if (n <= 0){ 
		return "";
	}else if(n > String(this).length){ 
		return this;
	}else{
		var iLen = String(this).length;
		return String(this).substring(iLen, iLen - n);
	};
};
// Add left and right as methods of all strings. example: var str = 'Test'; str.left(1) will output 'T'.
String.prototype.left = Left;
String.prototype.right = Right;

// Add a date formatting function

/*
 * Date Format 1.2.3
 * (c) 2007-2009 Steven Levithan <stevenlevithan.com>
 * MIT license
 *
 * Includes enhancements by Scott Trenda <scott.trenda.net>
 * and Kris Kowal <cixar.com/~kris.kowal/>
 *
 * Accepts a date, a mask, or a date and a mask.
 * Returns a formatted version of the given date.
 * The date defaults to the current date/time.
 * The mask defaults to dateFormat.masks.default.
 */

var dateFormat = function () {
	var	token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
		timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
		timezoneClip = /[^-+\dA-Z]/g,
		pad = function (val, len) {
			val = String(val);
			len = len || 2;
			while (val.length < len) val = "0" + val;
			return val;
		};

	// Regexes and supporting functions are cached through closure
	return function (date, mask, utc) {
		var dF = dateFormat;

		// You can't provide utc if you skip other args (use the "UTC:" mask prefix)
		if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
			mask = date;
			date = undefined;
		}

		// Passing date through Date applies Date.parse, if necessary
		date = date ? new Date(date) : new Date;
		if (isNaN(date)) throw SyntaxError("invalid date");

		mask = String(dF.masks[mask] || mask || dF.masks["default"]);

		// Allow setting the utc argument via the mask
		if (mask.slice(0, 4) == "UTC:") {
			mask = mask.slice(4);
			utc = true;
		}

		var	_ = utc ? "getUTC" : "get",
			d = date[_ + "Date"](),
			D = date[_ + "Day"](),
			m = date[_ + "Month"](),
			y = date[_ + "FullYear"](),
			H = date[_ + "Hours"](),
			M = date[_ + "Minutes"](),
			s = date[_ + "Seconds"](),
			L = date[_ + "Milliseconds"](),
			o = utc ? 0 : date.getTimezoneOffset(),
			flags = {
				d:    d,
				dd:   pad(d),
				ddd:  dF.i18n.dayNames[D],
				dddd: dF.i18n.dayNames[D + 7],
				m:    m + 1,
				mm:   pad(m + 1),
				mmm:  dF.i18n.monthNames[m],
				mmmm: dF.i18n.monthNames[m + 12],
				yy:   String(y).slice(2),
				yyyy: y,
				h:    H % 12 || 12,
				hh:   pad(H % 12 || 12),
				H:    H,
				HH:   pad(H),
				M:    M,
				MM:   pad(M),
				s:    s,
				ss:   pad(s),
				l:    pad(L, 3),
				L:    pad(L > 99 ? Math.round(L / 10) : L),
				t:    H < 12 ? "a"  : "p",
				tt:   H < 12 ? "am" : "pm",
				T:    H < 12 ? "A"  : "P",
				TT:   H < 12 ? "AM" : "PM",
				Z:    utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
				o:    (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
				S:    ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
			};

		return mask.replace(token, function ($0) {
			return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
		});
	};
}();

// Some common format strings
dateFormat.masks = {
	"default":      "ddd mmm dd yyyy HH:MM:ss",
	shortDate:      "m/d/yy",
	mediumDate:     "mmm d, yyyy",
	longDate:       "mmmm d, yyyy",
	fullDate:       "dddd, mmmm d, yyyy",
	shortTime:      "h:MM TT",
	mediumTime:     "h:MM:ss TT",
	longTime:       "h:MM:ss TT Z",
	isoDate:        "yyyy-mm-dd",
	isoTime:        "HH:MM:ss",
	isoDateTime:    "yyyy-mm-dd'T'HH:MM:ss",
	isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
};

// Internationalization strings
dateFormat.i18n = {
	dayNames: [
		"Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
		"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
	],
	monthNames: [
		"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
		"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
	]
};

// For convenience...
Date.prototype.format = function (mask, utc) {
	return dateFormat(this, mask, utc);
};

