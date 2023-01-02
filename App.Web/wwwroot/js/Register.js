$("document").ready(function () {
    $(".btnCancelUpload").hide();
    function showLoadingGIF() {
        var deferred = $.Deferred();
        if ($('#chkTermsCondition').is(':checked')) {

            $('.popup_load').css("display", "block");


            $('#RegistrationForm').submit();
            localStorage.setItem('#chkTermsCondition','true');
        }
        else {
            $('#ChkErrorMessage').css('display', 'block');
            localStorage.setItem('#chkTermsCondition', 'false');
        }

        setTimeout(function () {
            deferred.resolve();
        }, 2000);
        return deferred.promise();
    }

    $('input:text,input:password').val(" ").val('');
    // Setting thumb image source on avatar change
    function readURL(input) {
        if (input.files && input.files[0]) {
            if (input.files[0].name.split('.').pop().toLowerCase() == 'jpeg' || input.files[0].name.split('.').pop().toLowerCase() == 'jpg' || input.files[0].name.split('.').pop().toLowerCase() == 'gif' || input.files[0].name.split('.').pop().toLowerCase() == 'png') {
                if (input.files[0].size <= 2097152) {
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        $('#imgAvtr').attr('src', e.target.result);
                    }
                    reader.readAsDataURL(input.files[0]);
                }
                else {
                    $('#large-image-modal').modal('show');
                }
            }
            else {
                $('#select-image-modal').modal('show');
            }
        }
    }

    // Avatar upload change
    $("#fileAvtr").change(function () {
        readURL(this);
    });

    // Redirecting to Home page on Logo click
    $('#ImgLogo').on("click", function (e) {
        e.preventDefault();
        window.location.href = localStorage.getItem('environment') + "Home";
    });

    // Register SUBMIT
    $('.btn-register').on('click', function () {
        if ($('#chkTermsCondition').is(':checked')) {

            localStorage.setItem('#chkTermsCondition', 'true');
        }
        else {
            $('#ChkErrorMessage').css('display', 'block');
            localStorage.setItem('#chkTermsCondition', 'false');
        }
    });

// terms and conditions
$('#chkTermsCondition').on('change', function () {
    if (!$('#chkTermsCondition').is(':checked')) {
        /*        $('#ChkErrorMessage').removeClass('hide');*/
        $('#ChkErrorMessage').css('display', 'block');
        localStorage.setItem('#chkTermsCondition', 'true');
    }
    else {
        /* $('#ChkErrorMessage').addClass('hide');*/
        $('#ChkErrorMessage').css('display', 'none');
        localStorage.setItem('#chkTermsCondition', 'false');
    }
});
setTimeout(function () {
    $('.popup_load').css("display", "none");
}, 500);
   
});

// validate new email address
function ValidateEmail() {
    var emailId = $("#emailId").val();
    $.ajax({
       
        url: localStorage.getItem('environment') + '/api/QuibStream/validate?email=' + emailId,
        type: 'get',
        dataType: 'text',
    
        success: function (response) {
            if (response == 'false') {
                $("#EmailError").text("This email address is already registered.");
                $("#Email").focus();
            }
            else {
                $("#EmailError").text("");
            }
        }
    });
}


// Validate username Register / Edit profile
function ValidateDisplayname() {
    
    $.ajax({
        url: localStorage.getItem('environment') + 'Register/ValidateDisplayname',
        type: 'POST',
        dataType: 'text',
        data: { displayName: $(".DisplayName").val() },
        success: function (response) {
            if (response == 'False') {
                $("#DisplaynameError").text("Sorry, this display name is already taken.");
                $(".DisplayName").focus();
            }
            else {
                $("#DisplaynameError").text("");
            }
        }
    });
}

function cancelUploadImage() {
    $("#imgAvtr").show();
    $(".btnCancelUpload").hide();
    //$("#image").cropper("destroy");
    $("#image").hide();
    // $("#image").remove();
    $(".cropper-container").hide();
    $("#ImageString32").val(null);
    $(".ImageString32").val(null);
    $("#ImageString256").val(null);
    $(".ImageString256").val(null);
    $("#image").attr('src', '');
    $("#btnUploadImage").show();
    document.getElementById("inputImage").disabled = false;
}
//Added because the button is not getting clicked in mobile device when clicked outside of choose image 
function UploadImage(objmodel) {
    $("#inputImage").trigger("click");
}