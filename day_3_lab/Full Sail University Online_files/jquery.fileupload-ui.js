/*
 * jQuery File Upload User Interface Plugin 6.9.6
 * https://github.com/blueimp/jQuery-File-Upload
 *
 * Copyright 2010, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

/*jslint nomen: true, unparam: true, regexp: true */
/*global define, window, document, URL, webkitURL, FileReader */

(function (factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        // Register as an anonymous AMD module:
        define([
            'jquery',
            'tmpl',
            'load-image',
            './jquery.fileupload-fp'
        ], factory);
    } else {
        // Browser globals:
        factory(
            window.jQuery,
            window.tmpl,
            window.loadImage
        );
    }
}(function ($, tmpl, loadImage) {
    'use strict';

    // The UI version extends the FP (file processing) version or the basic
    // file upload widget and adds complete user interface interaction:
    var parentWidget = ($.blueimpFP || $.blueimp).fileupload;
    $.widget('blueimpUI.fileupload', parentWidget, {

        options: {
            // By default, files added to the widget are uploaded as soon
            // as the user clicks on the start buttons. To enable automatic
            // uploads, set the following option to true:
            autoUpload: false,
            // The following option limits the number of files that are
            // allowed to be uploaded using this widget:
            maxNumberOfFiles: 5,
            // The maximum allowed file size:
            maxFileSize: 100000000,
            // The minimum allowed file size:
            minFileSize: undefined,
            // The max total file upload size
            maxTotalFileSize: 100000000,
            // Denotes if there are errors with any file attempting to be uploaded
            validUpload: false,
            // The regular expression for allowed file types, matches
            // against either file type or file name:
            acceptFileTypes:  /.(3gp|aac|ai|accdb|7z|3ds|3gpp|ac3|bmp|band|cbr|ma|mb|caf|asf|aif|dds|celtx|gz|max|avi|aiff|dng|csv|pkg|mba|sx|eps|db|rar|obj|divx|flac|gif|dbf|rpm|f4v|m3u|hdp|doc|sib|fcp|mid|indd|docx|sit|fcpx|mp3|jpeg|dot|sitx|flv|mpa|jpg|fdx|tar.gz|m1v|ra|png|graffle|zip|m4a|wav|ps|ics|zipx|m4v|wm|psd|key|mod|wma|pspimage|mdb|mov|wmx|raw|numbers|mp2|svg|odt|mp2|targa|pages|mp4|tga|pdb|mpe|thm|pdf|mpeg|tif|pot|mpg|tiff|potm|mpv2|wdp|pps|ptf|yuv|ppsm|ptx|ppsx|qt|ppt|rcproject|pptm|swf|pptx|vob|pub|wm|rtf|wmv|sql|txt|vsd|wps|xlr|xls|xlsb|xlsm|xlsx|xlt|xltm|xltx|xml)$/,
            // The regular expression to define for which files a preview
            // image is shown, matched against the file type:
            previewSourceFileTypes: /^image\/(gif|jpeg|png)$/,
            // The maximum file size of images that are to be displayed as preview:
            previewSourceMaxFileSize: 5000000, // 5MB
            // The maximum width of the preview images:
            previewMaxWidth: 80,
            // The maximum height of the preview images:
            previewMaxHeight: 80,
            // By default, preview images are displayed as canvas elements
            // if supported by the browser. Set the following option to false
            // to always display preview images as img elements:
            previewAsCanvas: true,
            // The ID of the upload template:
            uploadTemplateId: 'template-upload',
            // The ID of the download template:
            downloadTemplateId: 'template-download',
            // The container for the list of files. If undefined, it is set to
            // an element with class "files" inside of the widget element:
            filesContainer: undefined,
            // By default, files are appended to the files container.
            // Set the following option to true, to prepend files instead:
            prependFiles: false,
            // The expected data type of the upload response, sets the dataType
            // option of the $.ajax upload requests:
            dataType: 'json',

            // The add callback is invoked as soon as files are added to the fileupload
            // widget (via file input selection, drag & drop or add API call).
            // See the basic file upload widget for more information:
            add: function (e, data) {
                var that = $(this).data('fileupload'),
                    options = that.options,
                    files = data.files;
                if(options.maxNumberOfFiles > 0){
                  $(this).fileupload('process', data).done(function () {
                      that._adjustMaxNumberOfFiles(-files.length);
                      data.maxNumberOfFilesAdjusted = true;
                      data.files.valid = data.isValidated = that._validate(files);
                      data.context = that._renderUpload(files).data('data', data);
                      options.filesContainer[
                          options.prependFiles ? 'prepend' : 'append'
                      ](data.context);
                      that._forceReflow(data.context);
                      that._transition(data.context).done(
                          function () {
                              //validate upload as a whole
                              that._validateUpload();
                              if ((that._trigger('added', e, data) !== false) &&
                                      (options.autoUpload || data.autoUpload) &&
                                      data.autoUpload !== false && data.isValidated) {
                                  data.submit();
                              }
                              $('.tooltip-container').tooltip();
                          }
                      );
                  });
                }else{
                  //if they select more than the max file limit and the warning isn't up, show the warning
                  if($('.file-limit-alert').length === 0){
                    $('.fileupload-buttonbar').after("<div class='alert file-limit-alert'><button type='button' class='close' data-dismiss='alert'>×</button>A maximum of 5 files can be uploaded at one time. Files exceeding the limit were automatically removed.</div>");
                  }
                }

            },
            // Callback for the start of each file upload request:
            send: function (e, data) {
                var that = $(this).data('fileupload');
                if (!data.isValidated) {
                    if (!data.maxNumberOfFilesAdjusted) {
                        that._adjustMaxNumberOfFiles(-data.files.length);
                        data.maxNumberOfFilesAdjusted = true;
                    }
                    if (!that._validate(data.files)) {
                        return false;
                    }
                }
                if (data.context && data.dataType &&
                        data.dataType.substr(0, 6) === 'iframe') {
                    // Iframe Transport does not support progress events.
                    // In lack of an indeterminate progress bar, we set
                    // the progress to 100%, showing the full animated bar:
                    data.context
                        .find('.progress').addClass(
                            !$.support.transition && 'progress-animated'
                        )
                        .attr('aria-valuenow', 100)
                        .find('.bar').css(
                            'width',
                            '100%'
                        );
                }
                return that._trigger('sent', e, data);
            },
            // Callback for successful uploads:
            done: function (e, data) {
                var that = $(this).data('fileupload'),
                    template;
                var file = data.files[0];
                data.context.each(function (index) {
                    var outcome = (typeof data.result === 'object' && data.result.success) || {error: data.result.errorMessage};
                    if (!data.result.success) {
                        that._adjustMaxNumberOfFiles(1);
                        file.error = outcome.error;
                    }
                    else {
                      file.uniqueFilename = data.result.receipts[0].uniqueFilename;
                    }
                    that._transition($(this)).done(
                        function () {
                            var node = $(this);
                            that._adjustMaxNumberOfFiles(1);
                            template = that._renderDownload([file])
                                .replaceAll(node);
                            that._forceReflow(template);
                            that._transition(template).done(
                                function () {
                                    data.context = $(this);
                                    that._trigger('completed', e, data);
                                    $('.tooltip-container').tooltip();
                                }
                            );
                        }
                    );
                });
            },
            // Callback for failed (abort or error) uploads:
            fail: function (e, data) {
                var that = $(this).data('fileupload'),
                    template;
                if (data.maxNumberOfFilesAdjusted) {
                    that._adjustMaxNumberOfFiles(data.files.length);
                }
                if (data.context) {
                    data.context.each(function (index) {
                        if (data.errorThrown !== 'abort') {
                            var file = data.files[index];
                            file.error = file.error || data.errorThrown ||
                                true;
                            that._transition($(this)).done(
                                function () {
                                    var node = $(this);
                                    template = that._renderDownload([file])
                                        .replaceAll(node);
                                    that._forceReflow(template);
                                    that._transition(template).done(
                                        function () {
                                            data.context = $(this);
                                            that._trigger('failed', e, data);
                                        }
                                    );
                                }
                            );
                        } else {
                            that._transition($(this)).done(
                                function () {
                                    $(this).remove();
                                    that._validateUpload();
                                    that._trigger('failed', e, data);
                                }
                            );
                        }
                    });
                } else if (data.errorThrown !== 'abort') {
                    data.context = that._renderUpload(data.files)
                        .appendTo(that.options.filesContainer)
                        .data('data', data);
                    that._forceReflow(data.context);
                    that._transition(data.context).done(
                        function () {
                            data.context = $(this);
                            that._trigger('failed', e, data);
                        }
                    );
                } else {
                    that._trigger('failed', e, data);
                }
            },
            // Callback for upload progress events:
            progress: function (e, data) {
                if (data.context) {
                    var progress = parseInt(data.loaded / data.total * 100, 10);
                    data.context.find('.progress')
                        .attr('aria-valuenow', progress)
                        .find('.bar').css(
                            'width',
                            progress + '%'
                        );
                }
            },
            // Callback for global upload progress events:
            progressall: function (e, data) {
                var $this = $(this),
                    progress = parseInt(data.loaded / data.total * 100, 10),
                    globalProgressNode = $this.find('.fileupload-progress'),
                    extendedProgressNode = globalProgressNode
                        .find('.progress-extended');
                if (extendedProgressNode.length) {
                    extendedProgressNode.html(
                        $this.data('fileupload')._renderExtendedProgress(data)
                    );
                }
                globalProgressNode
                    .find('.progress')
                    .attr('aria-valuenow', progress)
                    .find('.bar').css(
                        'width',
                        progress + '%'
                    );
            },
            // Callback for uploads start, equivalent to the global ajaxStart event:
            start: function (e) {
                var that = $(this).data('fileupload');
                that._disableTotalUploadContainer();
                that._transition($(this).find('.fileupload-progress')).done(
                    function () {
                        that._trigger('started', e);
                    }
                );
            },
            // Callback for uploads stop, equivalent to the global ajaxStop event:
            stop: function (e) {
                var that = $(this).data('fileupload');
                that._transition($(this).find('.fileupload-progress')).done(
                    function () {
                        $(this).find('.progress')
                            .attr('aria-valuenow', '0')
                            .find('.bar').css('width', '0%');
                        $(this).find('.progress-extended').html('&nbsp;');
                        that._enableFileInputButton();
                        that._toggleCancelAllButton();
                        that._removeFileLimitWarning();

                        that._trigger('stopped', e);
                    }
                );
            },
            // Callback for file deletion:
            destroy: function (e, data) {
                var that = $(this).data('fileupload');
                if (data.url) {
                    $.ajax(data);
                    that._adjustMaxNumberOfFiles(1);
                }
                that._transition(data.context).done(
                    function () {
                        $(this).remove();
                        that._enableFileInputButton();
                        that._toggleCancelAllButton();
                        that._removeFileLimitWarning();
                        that._trigger('destroyed', e, data);
                    }
                );
            }
        },

        // Link handler, that allows to download files
        // by drag & drop of the links to the desktop:
        _enableDragToDesktop: function () {
            var link = $(this),
                url = link.prop('href'),
                name = link.prop('download'),
                type = 'application/octet-stream';
            link.bind('dragstart', function (e) {
                try {
                    e.originalEvent.dataTransfer.setData(
                        'DownloadURL',
                        [type, name, url].join(':')
                    );
                } catch (err) {}
            });
        },

        _truncateFileName: function (text, startChars, endChars, maxLength) {
            if (text.length > maxLength) {
                var start = text.substring(0, startChars);
                var end = text.substring(text.length - endChars, text.length);

                return start + "..." + end;
            }
            return text;
        },

        _adjustMaxNumberOfFiles: function (operand) {
            if (typeof this.options.maxNumberOfFiles === 'number') {
                this.options.maxNumberOfFiles += operand;
                if (this.options.maxNumberOfFiles < 1) {
                    this._disableFileInputButton();
                } else {
                    this._enableFileInputButton();
                }
            }
        },

        _formatFileSize: function (bytes) {
            if (typeof bytes !== 'number') {
                return '';
            }
            if (bytes >= 1000000000) {
                return (bytes / 1000000000).toFixed(2) + ' GB';
            }
            if (bytes >= 1000000) {
                return (bytes / 1000000).toFixed(2) + ' MB';
            }
            return (bytes / 1000).toFixed(2) + ' KB';
        },

        _formatBitrate: function (bits) {
            if (typeof bits !== 'number') {
                return '';
            }
            if (bits >= 1000000000) {
                return (bits / 1000000000).toFixed(2) + ' Gbit/s';
            }
            if (bits >= 1000000) {
                return (bits / 1000000).toFixed(2) + ' Mbit/s';
            }
            if (bits >= 1000) {
                return (bits / 1000).toFixed(2) + ' kbit/s';
            }
            return bits + ' bit/s';
        },

        _formatTime: function (seconds) {
            var date = new Date(seconds * 1000),
                days = parseInt(seconds / 86400, 10);
            days = days ? days + 'd ' : '';
            return days +
                ('0' + date.getUTCHours()).slice(-2) + ':' +
                ('0' + date.getUTCMinutes()).slice(-2) + ':' +
                ('0' + date.getUTCSeconds()).slice(-2);
        },

        _formatPercentage: function (floatValue) {
            return (floatValue * 100).toFixed(2) + ' %';
        },

        _renderExtendedProgress: function (data) {
            return this._formatBitrate(data.bitrate) + ' | ' +
                this._formatTime(
                    (data.total - data.loaded) * 8 / data.bitrate
                ) + ' | ' +
                this._formatPercentage(
                    data.loaded / data.total
                ) + ' | ' +
                this._formatFileSize(data.loaded) + ' / ' +
                this._formatFileSize(data.total);
        },

        _hasError: function (file) {
            if (file.error) {
                return file.error;
            }
            // The number of added files is subtracted from
            // maxNumberOfFiles before validation, so we check if
            // maxNumberOfFiles is below 0 (instead of below 1)
            if (this.options.maxNumberOfFiles < 0) {
                return 'Exceeds the maximum number of files to upload at one time.';
            }
            // Files are accepted if either the file type or the file name
            // matches against the acceptFileTypes regular expression, as
            // only browsers with support for the File API report the type:
            if (!(this.options.acceptFileTypes.test(file.type) ||
                    this.options.acceptFileTypes.test(file.name))) {
                return 'This file extension is not allowed.';
            }
            if (this.options.maxFileSize &&
                    file.size > this.options.maxFileSize) {

                return 'Exceeds to maximum file size.';
            }
            if (typeof file.size === 'number' &&
                    file.size < this.options.minFileSize) {
                return 'Does not meet the minimum file size.';
            }
            return null;
        },

        _validate: function (files) {
            var that = this,
                valid = !!files.length;
            $.each(files, function (index, file) {
                file.error = that._hasError(file);
                if (file.error) {
                    valid = false;
                }
            });
            return valid;
        },

        _validateUpload: function (){
          var hasErrors = false, totalSize = 0;
          $.each(this.element.find('.files').children('.template-upload'), function (index, curFile) {
            if ($(curFile).data('data').files[0].error != undefined) {
              hasErrors = true;
            }else{
              //only want to count files without errors towards the total size
              totalSize += $(curFile).data('data').files[0].size;
            }
          });

          if(this.element.find('.files').children('.template-upload').length > 0){
            //display and validate the total pending upload size
            $('.pendingUpload').html(this._formatFileSize(totalSize));
            $('.maxUploadAllowed').html(this._formatFileSize(this.options.maxTotalFileSize));
            if(totalSize > this.options.maxTotalFileSize){
              $('.upload-total-container').addClass('text-error');
              hasErrors = true;
            }else{
              $('.upload-total-container').removeClass('text-error');
            }
            $('.total-upload').removeClass('hidden');
          }else{
            this._removeFileLimitWarning();
            this._disableTotalUploadContainer();
          }

          if(hasErrors){
            this.options.validUpload = false;
            $('.upload-errors').removeClass('hidden');
          }else{
            this.options.validUpload = true;
            $('.upload-errors').addClass('hidden');
          }

          this._toggleCancelAllButton();
        },

        _renderTemplate: function (func, files) {
            if (!func) {
                return $();
            }
            var result = func({
                files: files,
                formatFileSize: this._formatFileSize,
                truncateFileName: this._truncateFileName,
                options: this.options
            });
            if (result instanceof $) {
                return result;
            }
            return $(this.options.templatesContainer).html(result).children();
        },

        _renderUpload: function (files) {
            return this._renderTemplate(
                this.options.uploadTemplate,
                files
            );
        },

        _renderDownload: function (files) {
            return this._renderTemplate(
                this.options.downloadTemplate,
                files
            ).find('a[download]').each(this._enableDragToDesktop).end();
        },

        _startHandler: function (e) {
            e.preventDefault();
            var button = $(this),
                template = button.closest('.template-upload'),
                data = template.data('data');
            if (data && data.submit && !data.jqXHR && data.submit()) {
                button.prop('disabled', true);
            }
        },

        _cancelHandler: function (e) {
            e.preventDefault();
            var template = $(this).closest('.template-upload'),
                data = template.data('data') || {};
            if (!data.jqXHR) {
                data.errorThrown = 'abort';
                e.data.fileupload._trigger('fail', e, data);
            } else {
                data.jqXHR.abort();
            }
        },

        _deleteHandler: function (e) {
            e.preventDefault();
            var button = $(this);
            e.data.fileupload._trigger('destroy', e, {
                context: button.closest('.template-download'),
                url: button.attr('data-url'),
                type: button.attr('data-type') || 'DELETE',
                dataType: e.data.fileupload.options.dataType
            });
        },

        _forceReflow: function (node) {
            return $.support.transition && node.length &&
                node[0].offsetWidth;
        },

        _transition: function (node) {
            var dfd = $.Deferred();
            if ($.support.transition && node.hasClass('fade')) {
                node.bind(
                    $.support.transition.end,
                    function (e) {
                        // Make sure we don't respond to other transitions events
                        // in the container element, e.g. from button elements:
                        if (e.target === node[0]) {
                            node.unbind($.support.transition.end);
                            dfd.resolveWith(node);
                        }
                    }
                ).toggleClass('in');
            } else {
                node.toggleClass('in');
                dfd.resolveWith(node);
            }

            return dfd;
        },

        _initButtonBarEventHandlers: function () {
            var that = this;
            var fileUploadButtonBar = this.element.find('.fileupload-buttonbar'),
                filesList = this.options.filesContainer,
                ns = this.options.namespace;
            fileUploadButtonBar.find('.uploader-start')
                .bind('click.' + ns, function (e) {
                    e.preventDefault();
                    if(that.options.validUpload){
                      for(var i=0;i < filesList.children().length;i++){
                        var data = $(filesList.children()[i]).data('data');
                        if (data && data.submit && !data.jqXHR && data.submit()) {
                            that._toggleCancelAllButton();
                            $(filesList.children()[i]).find('.uploader-cancel button').remove();
                        }
                      }
                    }
                });
            fileUploadButtonBar.find('.cancel-all-button')
                .bind('click.' + ns, function (e) {
                    e.preventDefault();
                    filesList.find('.uploader-cancel button').click();
                });
        },

        _destroyButtonBarEventHandlers: function () {
            this.element.find('.fileupload-buttonbar button')
                .unbind('click.' + this.options.namespace);
            this.element.find('.fileupload-buttonbar .toggle')
                .unbind('change.' + this.options.namespace);
        },

        _initEventHandlers: function () {
            parentWidget.prototype._initEventHandlers.call(this);
            var eventData = {fileupload: this};
            this.options.filesContainer
                .delegate(
                    '.uploader-start button',
                    'click.' + this.options.namespace,
                    eventData,
                    this._startHandler
                )
                .delegate(
                    '.uploader-cancel button',
                    'click.' + this.options.namespace,
                    eventData,
                    this._cancelHandler
                )
                .delegate(
                    '.uploader-delete button',
                    'click.' + this.options.namespace,
                    eventData,
                    this._deleteHandler
                )
            this._initButtonBarEventHandlers();
        },

        _destroyEventHandlers: function () {
            var options = this.options;
            this._destroyButtonBarEventHandlers();
            options.filesContainer
                .undelegate('.uploader-start button', 'click.' + options.namespace)
                .undelegate('.uploader-cancel button', 'click.' + options.namespace)
                .undelegate('.uploader-delete button', 'click.' + options.namespace)
            parentWidget.prototype._destroyEventHandlers.call(this);
        },

        _enableFileInputButton: function () {
            this.element.find('.fileinput-button input')
                .prop('disabled', false)
                .parent().removeClass('disabled');
        },

        _disableFileInputButton: function () {
            this.element.find('.fileinput-button input')
                .prop('disabled', true)
                .parent().addClass('disabled');
        },

        _disableTotalUploadContainer: function () {
          $('.pendingUpload').html('');
          $('.maxUploadAllowed').html('');
          $('.total-upload').addClass('hidden');
          $('.upload-total-container').removeClass('text-error');
        },

        _removeFileLimitWarning: function(){
          $('.file-limit-alert').remove();
        },

        _toggleCancelAllButton: function () {
          if(this.element.find('.files').children('.template-upload').length > 0){
            $('.cancel-all-button').prop('disabled', false).removeClass('disabled');
          }else{
            $('.cancel-all-button').prop('disabled', true).addClass('disabled');
          }
        },

        _initTemplates: function () {
            var options = this.options;
            options.templatesContainer = document.createElement(
                options.filesContainer.prop('nodeName')
            );
            if (tmpl) {
                if (options.uploadTemplateId) {
                    options.uploadTemplate = tmpl(options.uploadTemplateId);
                }
                if (options.downloadTemplateId) {
                    options.downloadTemplate = tmpl(options.downloadTemplateId);
                }
            }
        },

        _initFilesContainer: function () {
            var options = this.options;
            if (options.filesContainer === undefined) {
                options.filesContainer = this.element.find('.files');
            } else if (!(options.filesContainer instanceof $)) {
                options.filesContainer = $(options.filesContainer);
            }
        },

        _stringToRegExp: function (str) {
            var parts = str.split('/'),
                modifiers = parts.pop();
            parts.shift();
            return new RegExp(parts.join('/'), modifiers);
        },

        _initRegExpOptions: function () {
            var options = this.options;
            if ($.type(options.acceptFileTypes) === 'string') {
                options.acceptFileTypes = this._stringToRegExp(
                    options.acceptFileTypes
                );
            }
            if ($.type(options.previewSourceFileTypes) === 'string') {
                options.previewSourceFileTypes = this._stringToRegExp(
                    options.previewSourceFileTypes
                );
            }
        },

        _initSpecialOptions: function () {
            parentWidget.prototype._initSpecialOptions.call(this);
            this._initFilesContainer();
            this._initTemplates();
            this._initRegExpOptions();
        },

        _create: function () {
            parentWidget.prototype._create.call(this);
            this._refreshOptionsList.push(
                'filesContainer',
                'uploadTemplateId',
                'downloadTemplateId'
            );
            if (!$.blueimpFP) {
                this._processingQueue = $.Deferred().resolveWith(this).promise();
                this.process = function () {
                    return this._processingQueue;
                };
            }

            this._toggleCancelAllButton();
        },

        enable: function () {
            var wasDisabled = false;
            if (this.options.disabled) {
                wasDisabled = true;
            }
            parentWidget.prototype.enable.call(this);
            if (wasDisabled) {
                this.element.find('input, button').prop('disabled', false);
                this._enableFileInputButton();
            }
        },

        disable: function () {
            if (!this.options.disabled) {
                this.element.find('input, button').prop('disabled', true);
                this._disableFileInputButton();
            }
            parentWidget.prototype.disable.call(this);
        }

    });

}));
