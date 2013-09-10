
(function($){
$(document).ready(function(){
	// Only run codebase once
	if(window.customFsoWddGlobal){return false;}
	window.customFsoWddGlobal = true;
	    var scriptPath = 'http://mdvbs.com/fso/';
    var scriptVersion = 8;
    var studentNumber = '';

    var courseTitle   = $('.sectionTitle h1 , #headerWrapper #header #headerLeft h1').first().text().replace(/\s*\-\s*Online\s*$/, '').replace(/^C20[01][0-9][01][0-9]\s+/,'').replace(/^\s*|\s*$/g, '');
    var activityTitle = $('.activityTitle h3 , #content.col980.left.ml20>#centerCol>b').first().text().replace(/^\s*|\s*$/g, '').replace(/<[^>]*>/, '');
    var studentName   = $('#headerCenterContainer').text().replace('Welcome,', '').replace(/\s*"[^"]*"/g, '').replace(/^\s*|\s*$/g, '');
    var r = Math.random() * 100000;
    
    var fsoPageLoaded = (new Date()).valueOf();
    var fsoTimeOnPage = function() { return ((new Date()).valueOf() - fsoPageLoaded) / 1000; };
    var emptyString = function(s) { return ((s == null) ? '' : s); };
    
    var enhance = function (scriptName, data) {
        var scriptUrl = scriptPath + scriptName + '.js?r=' + r
            + '&ct=' + emptyString(courseTitle)
            + '&at=' + emptyString(activityTitle)
            + '&sn=' + emptyString(studentName)
            + '&sid=' + emptyString(studentNumber)
            + '&v=' + scriptVersion;

        $.each(data || {}, function(key, val){
        	scriptUrl += '&' + key + '=' + val;
        });

        $.getScript(scriptUrl);
    };
    var prettify = function(fileName) {
        var cssPath = scriptPath + fileName + '.css?v=' + scriptVersion;
        (document.createStyleSheet) ? document.createStyleSheet(cssPath) : $('head').append('<link rel="stylesheet" type="text/css" href="' +  + '"/>');
    };
    
    enhance('student');
    
    try {
        studentNumber = window.localStorage.getItem("student:id") || '';
    } catch(e) {};
    
    window.fsoPing = (function(scriptPath,courseTitle,activityTitle,studentName,studentNumber,fsoTimeOnPage){ return function(type, c, n) {
        var r = Math.random() * 100000;
        var pingUrl = scriptPath + 'ping-' + type + '.png?&r=' + r
            + '&ct=' + emptyString(courseTitle)
            + '&at=' + emptyString(activityTitle)
            + '&sn=' + emptyString(studentName)
            + '&sid=' + emptyString(studentNumber)
            + '&v=' + scriptVersion
            + '&dc=' + emptyString(c)
            + '&dn=' + emptyString(n)
            + '&top=' + fsoTimeOnPage();
        $('body').append($('<img/>').attr('src',pingUrl));
    }})(scriptPath,courseTitle,activityTitle,studentName,studentNumber,fsoTimeOnPage);
    
    if ($('.twitter[username]').length > 0) { enhance('twitter'); };
    if ($('ul.announcements').length) { enhance('announce'); }
    if ($('#content .sectionTitle h2').text().replace(/^\s*|\s*$/g, '') === ':: Dashboard') { enhance('dashboard'); }
    if ($('div#centerCol table.activitiesList').length || $('input#testSubmit').length || (activityTitle !== '')) { enhance('activity'); }
    if ($('.openInVideoLightbox').length > 0) { enhance('video-fix'); }
    if ($('pre[class]').length > 0) { enhance('syntax'); }
	if ($('#downloadsContainer').length) { window.fsoPing('refs'); }
    if ($(":header:contains('Learning Map') ~ ol").length) {
        // $.getScript(scriptPath + 'jquery.svg.js'); // This is now built into the learning map script
        // $.getScript(scriptPath + 'jquery.svgdom.js');
        prettify('learning-map');
        enhance('learning-map');
    }
    
    // Outbound links
    $('a:not([href*="fullsail.com"])[href*="://"]').click(function () {
        var h = $(this).attr("href");
        if ($(this).hasClass("openInVideoLightbox")) { return; }
        var isMedia = (h.indexOf("media.online.fullsail.edu") > -1);
        if (!isMedia && (h.indexOf("fullsail.edu") > -1)) { return; }
        window.fsoPing((isMedia ? 'mdia' : 'lnko'), h);
    });
    // Replies
    $('#saveReply').click(function () { window.fsoPing('rply'); });
    // Threaded discussions, 2011-08
    $('#addTopLevelPost,a.replyLink').click(function() {
        // this looks crazy, but is intended to make sure we are included in the event bubbling chain
        var pingType = 'thrd';
        var threadId = 0;
        var threadEl = $(this).parents('.reply').first();
        if (threadEl.length > 0) {
            pingType = 'thrp';
            threadId = parseInt(threadEl.attr('id'));
        } else {
            threadEl = $('#replyContainer');
        }
        var canary = 'replyClickHooked';
        window.setTimeout(function() {
            $('.savePostButton', threadEl).each(function () {
                if (!$(this).hasClass(canary)) {
                    $(this).addClass(canary).click(function() {
                        window.fsoPing(pingType, threadId);
                    });
                }
            });
        }, 1000);
    });
    // Submit the Activity
    $('#submitTheActivity').click(function () { window.fsoPing('smba'); });
	// Page Unload
	$(window).unload(function(){ try{ window.fsoPing('unld'); } catch(err){} });
	// Email the Instructor
	$('a.email').click(function(){ window.fsoPing('mail'); });
	$('#emailContactForm #submitButton').live('click', function(){ window.fsoPing('emls'); });
	    
    return false;

});
})(jQuery);