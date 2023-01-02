$(function () {

    'use strict';

    var console = window.console || { log: function () { } };
    var $image = $('#image');
    var $download = $('#download');
    var ImageFileType = "";
    var $images = $('#images');//for the mobile form
    var $downloads = $('#downloads');

    var $dataX = $('#dataX');
    var $dataY = $('#dataY');
    var $dataHeight = $('#dataHeight');
    var $dataWidth = $('#dataWidth');
    var $dataRotate = $('#dataRotate');
    var $dataScaleX = $('#dataScaleX');
    var $dataScaleY = $('#dataScaleY');
    var options = {
        aspectRatio: 1 / 1,
        minCropBoxWidth: 60,
        zoomable: false,
        viewMode: 1,//set so that crop area is within image 
        preview: '.img-preview',

        crop: function (e) {
            $dataX.val(Math.round(e.x));
            $dataY.val(Math.round(e.y));
            $dataHeight.val(Math.round(e.height));
            $dataWidth.val(Math.round(e.width));
            $dataRotate.val(e.rotate);
            $dataScaleX.val(e.scaleX);
            $dataScaleY.val(e.scaleY);
        }
    };

    $image.hide();
    // Tooltip
    $('[data-toggle="tooltip"]').tooltip();


    // Cropper
    $image.on({
        'build.cropper': function (e) {
            //console.log(e.type);
        },
        'built.cropper': function (e) {
            //console.log(e.type);
        },
        'cropstart.cropper': function (e) {

            // console.log(e.type, e.action);
        },
        'cropmove.cropper': function (e) {
            //console.log(e.type, e.action);
        },
        'cropend.cropper': function (e) {
            //console.log(e.type, e.action);
        },
        'crop.cropper': function (e) {
            //console.log(e.type, e.x, e.y, e.width, e.height, e.rotate, e.scaleX, e.scaleY);
        },
        'zoom.cropper': function (e) {
            //console.log(e.type, e.ratio);
        }
    }).cropper(options);
    $images.on({
        'build.cropper': function (e) {
            //console.log(e.type);
        },
        'built.cropper': function (e) {
            //console.log(e.type);
        },
        'cropstart.cropper': function (e) {
            console.log(e.type, e.action);
        },
        'cropmove.cropper': function (e) {
            // console.log(e.type, e.action);
        },
        'cropend.cropper': function (e) {
            //console.log(e.type, e.action);
        },
        'crop.cropper': function (e) {
            //console.log(e.type, e.x, e.y, e.width, e.height, e.rotate, e.scaleX, e.scaleY);
        },
        'zoom.cropper': function (e) {

        }
    }).cropper(options);



    // Buttons
    if (!$.isFunction(document.createElement('canvas').getContext)) {
        $('button[data-method="getCroppedCanvas"]').prop('disabled', true);
    }

    if (typeof document.createElement('cropper').style.transition == 'undefined') {
        $('button[data-method="rotate"]').prop('disabled', true);
        $('button[data-method="scale"]').prop('disabled', true);
    }


    // Download
    if ($download[0] != null) {
        if (typeof $download[0].download == 'undefined') {
           $download.addClass('disabled');
        }
    }
    if ($downloads[0] != null) {
        if (typeof $downloads[0].download == 'undefined') {
            $downloads.addClass('disabled');
        }
    }


    // Options
    $('.docs-toggles').on('change', 'input', function () {
        var $this = $(this);
        var name = $this.attr('name');
        var type = $this.prop('type');
        var cropBoxData;
        var canvasData;

        if (!$image.data('cropper')) {
            return;
        }

        if (type == 'checkbox') {
            options[name] = $this.prop('checked');
            cropBoxData = $image.cropper('getCropBoxData');
            canvasData = $image.cropper('getCanvasData');

            options.built = function () {
                $image.cropper('setCropBoxData', cropBoxData);
                $image.cropper('setCanvasData', canvasData);
            };
        } else if (type == 'radio') {
            options[name] = $this.val();
        }

        $image.cropper('destroy').cropper(options);
    });


    // Methods
    $('.docs-buttons').on('click', '[data-method]', function () {

        var $this = $(this);
        var data = $this.data();
        var $target;
        var result;

        if ($this.prop('disabled') || $this.hasClass('disabled')) {
            return;
        }

        if ($image.data('cropper') && data.method) {
            data = $.extend({}, data); // Clone a new one

            if (typeof data.target != 'undefined') {
                $target = $(data.target);

                if (typeof data.option == 'undefined') {
                    try {
                        data.option = JSON.parse($target.val());
                    } catch (e) {
                        console.log(e.message);
                    }
                }
            }

            result = $image.cropper(data.method, data.option, data.secondOption);

            switch (data.method) {
                case 'scaleX':
                case 'scaleY':
                    $(this).data('option', -data.option);
                    break;

                case 'getCroppedCanvas':
                    if (result) {

                        // Bootstrap's Modal
                        //$('#getCroppedCanvasModal').modal().find('.modal-body').html(result);

                        //if (!$download.hasClass('disabled')) {
                        //    $download.attr('href', result.toDataURL());
                        //    $('.imgAvtr').attr('src', result.toDataURL());
                        //}
                        if ($("#image").attr('src') != '' && $("#image").attr('src') != undefined) {
                            var docBytes = "";
                            //var docBytes = result.toDataURL();


                            docBytes = result.toDataURL($("#ImageFileType").val());

                            docBytes = docBytes.replace(/data:image\/png;base64,/, '')
                            docBytes = docBytes.replace(/data:image\/jpeg;base64,/, '');
                            docBytes = docBytes.replace(/data:bmp\/jpeg;base64,/, '');
                            $download.attr('href', result.toDataURL());
                            if (this.id == "32ImageBtn")
                                $("#ImageString32").val(docBytes);
                            else
                                $("#ImageString256").val(docBytes);
                        }
                    }

                    break;
            }

            if ($.isPlainObject(result) && $target) {
                try {
                    $target.val(JSON.stringify(result));
                } catch (e) {
                    console.log(e.message);
                }
            }

        }
    });


    $('.docs-buttonss').on('click', '[data-method]', function () {

        var $this = $(this);
        var data = $this.data();
        var $target;
        var result;

        if ($this.prop('disabled') || $this.hasClass('disabled')) {
            return;
        }

        if ($images.data('cropper') && data.method) {
            data = $.extend({}, data); // Clone a new one

            if (typeof data.target != 'undefined') {
                $target = $(data.target);

                if (typeof data.option == 'undefined') {
                    try {
                        data.option = JSON.parse($target.val());
                    } catch (e) {
                        console.log(e.message);
                    }
                }
            }

            result = $images.cropper(data.method, data.option, data.secondOption);

            switch (data.method) {
                case 'scaleX':
                case 'scaleY':
                    $(this).data('option', -data.option);
                    break;

                case 'getCroppedCanvas':
                    if (result) {


                        // Bootstrap's Modal
                        //$('#getCroppedCanvasModal').modal().find('.modal-body').html(result);

                        //if (!$download.hasClass('disabled')) {
                        //    $download.attr('href', result.toDataURL());
                        //    $('.imgAvtr').attr('src', result.toDataURL());
                        //}
                        if ($("#images").attr('src') != '' && $("#images").attr('src') != undefined) {

                            var docBytes = result.toDataURL();
                            docBytes = docBytes.replace(/data:image\/png;base64,/, '');
                            docBytes = docBytes.replace(/data:image\/jpeg;base64,/, '');
                            docBytes = docBytes.replace(/data:image\/bmp;base64,/, '');
                            $downloads.attr('href', result.toDataURL());
                            if (this.id == "32ImageBtns") {
                                $("#ImageString32").val(docBytes);
                                $(".ImageString32").val(docBytes);
                            }
                            else {
                                $("#ImageString256").val(docBytes);
                                $(".ImageString256").val(docBytes);
                            }
                        }
                    }

                    break;
            }

            if ($.isPlainObject(result) && $target) {
                try {
                    $target.val(JSON.stringify(result));
                } catch (e) {
                    console.log(e.message);
                }
            }

        }
    });

    // Import image
    var $inputImage = $('#inputImage');


    var URL = window.URL || window.webkitURL;
    var blobURL;

    if (URL) {

        $inputImage.change(function () {

            var files = this.files;
            var file;
            $(".imgAvtr").hide();
            $("#imgAvtr").hide();
            $(".btnCancelUpload").show();
            $("#btnUploadImage").hide();
           // document.getElementById("inputImage").disabled = true;
            $(".cropper-container").show();
            $image.show();
            if (!$image.data('cropper')) {
                return;
            }

            if (files && files.length) {
                var screenshot = $("#screenshot-modal");
                if (screenshot != null && screenshot != undefined) {
                    screenshot.modal('show');
                }

                file = files[0];
                ImageFileType = file.type;

                $("#ImageFileType").val(ImageFileType)


                if (/^image\/\w+$/.test(file.type)) {
                    blobURL = URL.createObjectURL(file);
                    $image.one('built.cropper', function () {

                        // Revoke when load complete
                        URL.revokeObjectURL(blobURL);
                    }).cropper('reset').cropper('replace', blobURL);
                   // $inputImage.val('');
                } else {
                    //  window.alert('Please choose an image file.');
                    $(".imgAvtr").show();
                    $("#imgAvtr").show();
                    $image.hide();
                    $(".btnCancelUpload").hide();
                    $("#btnUploadImage").show();
                   // document.getElementById("inputImage").disabled = false;
                    $(".cropper-container").hide();
                }
            }
        });
    } else {
     //   $inputImage.prop('disabled', true).parent().addClass('disabled');
    }

    var $inputImages = $('#inputImages');

    if (URL) {
        $inputImages.change(function () {

            var files = this.files;
            var file;
            $(".imgAvtr").hide();
            $("#btnUploadImages").hide();
           // document.getElementById("inputImages").disabled = true;
            $(".btnCancelUpload").show();
            $(".cropper-container").show();
            $images.show();
            if (!$images.data('cropper')) {
                return;
            }

            if (files && files.length) {
                file = files[0];
                ImageFileType = file.type;
                $("#ImageFileTypes").val(ImageFileType);

                if (/^image\/\w+$/.test(file.type)) {
                    blobURL = URL.createObjectURL(file);
                    $images.one('built.cropper', function () {

                        // Revoke when load complete
                        URL.revokeObjectURL(blobURL);
                    }).cropper('reset').cropper('replace', blobURL);
                 //   $inputImages.val('');
                } else {
                    //window.alert('Please choose an image file.');
                    $(".imgAvtr").show();
                    $("#btnUploadImages").show();
                    //document.getElementById("inputImages").disabled = false;
                    $(".cropper-container").hide();
                    $images.hide();
                }
            }
        });
    } else {
        //$inputImages.prop('disabled', true).parent().addClass('disabled');
    }

});
