var IsEdit = false;
var IsValidPassword = true;
var model;

$('document').ready(function () {
    $("#edit-profile-form-desktop")[0].reset();
    $("#edit-profile-form-mobile")[0].reset();

    //Disable autocomplete throughout the page
    $('input:text,input:password,form').attr('autocomplete', 'off');
    $('input:text,input:password,form').prop('autocomplete', 'off');

    GetUserById();

    $('input:password').val(" ").val('');
    $('.form-control Password').val("");

    var len = $('.About').val();
    $('.charNum').text(1000 - len.length);

    $('.About').on('keyup', function () {

        var len = $(this).val();
        $('.charNum').text(1000 - len.length);

    });
    $('#ImgAvtrLogo').on("click", function (e) {
        window.location.href = localStorage.getItem('environment') + "Profile?userId=" + localStorage.getItem('UserId');
    });
    $("#btnEditProfile-sm").on('click', function () {
        $(".side-sm").show();
        $(".main-sm").hide();
        $(".FormProfile").show();
        $("#images").hide();

        $('#image').attr('src', '');
        $(".imgAvtr").show();
        $("#btnUploadImage").show();
        document.getElementById("inputImage").disabled = false;
        $(".btnCancelUpload").hide();

        $('#images').attr('src', '');

        $("#btnUploadImages").show();
        document.getElementById("inputImages").disabled = false;

        $(".cropper-container").hide();
        GetUserById();
        $("#MDisplayName").val(model.DisplayName);
        $(":password").val(model.Password);
        $("#MConfirmpassword").val(model.Password);
        $("#MFirstName").val(model.FirstName);
        $("#MLastName").val(model.LastName);
        $("#MAbout").val(model.About);
    });

    // Setting thumb image source on avatar change
    function readURL(input) {
        if (input.files && input.files[0]) {
            if (input.files[0].size <= 2097152) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    if (/^image\/\w+$/.test(input.files[0].type))
                        $('.imgAvtr').attr('src', e.target.result);
                }
                reader.readAsDataURL(input.files[0]);
            }
            else {
                $('#avatar-size-modal').modal('show');
            }
        }

        $(".Password").rules("remove", "required");
        $(".ConfirmPassword").rules("remove", "required");

    }

    // Avatar upload change
    $(".fileAvtr").change(function () {
        IsEdit = true;
        readURL(this);
    });

    if (!($('#ImgAvtrLogo').val() == '0' && $('#ImgAvtrLogo').val() == '' && $('#ImgAvtrLogo').val() == 'undefined' && $('#ImgAvtrLogo').val() == null && $('#ImgAvtrLogo').val() == "")) {
        //$("#ImgAvtrLogo").attr("src", "data:image/jpeg;base64," + $("#AvatarBase64").val());
        //Anish modified start
        //$(".ProfileAvatar").attr("src", "data:image/jpeg;base64," + $('#AvatarBase64').val());
        //$(".imgAvtr").attr("src", "data:image/jpeg;base64," + $('#AvatarBase64').val());

        $("#ImgAvtrLogo").attr("src", "/Images/user32/AvatarBase32.png");

        if ($('#AvatarBase256ImagePath').val() == '' || $('#AvatarBase256ImagePath').val() == undefined) {
            $(".ProfileAvatar").attr("src", "/Images/user256/AvatarBase256.png");
            $(".imgAvtr").attr("src", "/Images/user32/AvatarBase32.png");
        }
        else {
            $(".ProfileAvatar").attr("src", $('#AvatarBase256ImagePath').val());
        }
    }

    $(".DisplayName, .FirstName, .LastName, .About, .Password, .ConfirmPassword").change(function () {
        IsEdit = true;
    });

    $('#ReqPassword').on('keyup', function (e) {

        if (e.keyCode == 13) {
            ValidatePassword();
        }
    });
});

$(window).load(function () {
    $("#edit-profile-form-desktop")[0].reset();
    $("#edit-profile-form-mobile")[0].reset();
    //User can't edit the profile of others, when user goes to see profile of others, so hide 'Edit Profile' and 'Logout' 
    //and always set avatar of logged in user only at the upper-right-corner.
    if (localStorage.getItem('UserId') != localStorage.getItem('ProfileUserId')) {
        $('#btnEditProfile').hide();
        $('#btnLogout').hide();
        $('.btn-Qsm').show();
        $('#btnEditProfile-sm').hide();
        $('#btnLogout-sm').hide();
        $('.btn-Qsm').show();
        SetUserAvatar();
    }
    else {
        $('.btn-Qsm').hide();
        SetUserAvatar();
        SetProfileAvatar();
    }

    // getting the list of followers followees and quibbed movies
    GetMoviesByUser();
    GetFollowers();
    GetFollowees();

    $('.community-quib').on('click', function () {
        CommunityQuibStyle();
    });

    $('#community-followers').on('click', function () {
        CommunityFollowersStyle();
    });

    $('#community-following').on('click', function () {
        CommunityFolloweesStyle();
    });

    // Edit profile button click
    $('#btnEditProfile').on('click', function () {
        GetUserById();
        ShowEditProfile();
    });

    // UI formatting
    $(function () {
        var Col = 0;
        var TotalHight = 0;
        var margin_bottom = 10;
        var margin_right = 10;
        var leftPos = 0;

        $(".profile-container1").children().each(function () {
            TotalHight = TotalHight + margin_bottom + $(this).height();
            var topPos = TotalHight - (margin_bottom + $(this).height());
            if (TotalHight > $(".profile-container1").height()) {
                Col = Col + 1;
                leftPos = ($(this).width() + margin_right) * Col;
                TotalHight = $(this).height() + margin_bottom;
                topPos = 0;
            }
            $(this).css('top', topPos + 'px')
            $(this).css('left', leftPos + 'px')

        })
    });

    // UI Formatting
    var scrollval = $('.quib-list').width();

    $.fn.scrollBy = function (x) {
        return this.animate({
            scrollLeft: '+=' + x,

        }, 800);
    };

    $('.right').click(function () {
        $('.quib-list').stop().scrollBy(scrollval);
    });

    $('.left').click(function () {
        $('.quib-list').stop().scrollBy(-scrollval, 0);
    });

    setTimeout(function () {

        $('.Followers').hide();
        $('.Following').hide();
        $('.quibber').show();
        $(".community-quib").addClass("active-list");
        $("#community-followers").removeClass("active-list");
        $("#community-following").removeClass("active-list");

        $('.popup_load').css('display', 'none');
    }, 1000);


});

// Applying styles to all elements in the list of followes
function CommunityFolloweesStyle() {
    $('.Following').show();
    $('.Followers,.quibber,.FormProfile').hide();
    $(this).addClass('active-list').siblings().removeClass();

    var Col = 0;
    var TotalHight = 0;
    var margin_bottom = 10;
    var margin_right = 10;
    var leftPos = 0;

    $(".profile-container3").children().each(function () {
        TotalHight = TotalHight + margin_bottom + $(this).height();
        var topPos = TotalHight - (margin_bottom + $(this).height());

        if (TotalHight > $(".profile-container3").height()) {
            Col = Col + 1;
            leftPos = ($(this).width() + margin_right) * Col;
            TotalHight = $(this).height() + margin_bottom;
            topPos = 0;
        }

        $(this).css('top', topPos + 'px')
        $(this).css('left', leftPos + 'px')
    })
}

// Applying styles to all elements in the list of followers
function CommunityFollowersStyle() {
    $('.Followers').show();
    $('.Following,.quibber,.FormProfile').hide();
    $(this).addClass('active-list').siblings().removeClass();

    var Col = 0;
    var TotalHight = 0;
    var margin_bottom = 10;
    var margin_right = 10;
    var leftPos = 0;

    $(".profile-container2").children().each(function () {
        TotalHight = TotalHight + margin_bottom + $(this).height();
        var topPos = TotalHight - (margin_bottom + $(this).height());

        if (TotalHight > $(".profile-container2").height()) {
            Col = Col + 1;
            leftPos = ($(this).width() + margin_right) * Col;
            TotalHight = $(this).height() + margin_bottom;
            topPos = 0;
        }

        $(this).css('top', topPos + 'px')
        $(this).css('left', leftPos + 'px')
    });
}

// Applying styles to all elements in the list of quibbed moved
function CommunityQuibStyle() {
    $('.quibber').show();
    $('.Following,.Followers,.FormProfile').hide();
    $(this).addClass('active-list').siblings().removeClass();

    var Col = 0;
    var TotalHight = 0;
    var margin_bottom = 10;
    var margin_right = 10;
    var leftPos = 0;

    $(".profile-container1").children().each(function () {
        TotalHight = TotalHight + margin_bottom + $(this).height();
        var topPos = TotalHight - (margin_bottom + $(this).height());

        if (TotalHight > $(".profile-container1").height()) {
            Col = Col + 1;
            leftPos = ($(this).width() + margin_right) * Col;
            TotalHight = $(this).height() + margin_bottom;
            topPos = 0;
        }

        $(this).css('top', topPos + 'px')
        $(this).css('left', leftPos + 'px')
    })
}

// Load quibbed movies on page load
function LoadQuibbedMovies(movies) {
    $('.MovieList').empty();
    var object = JSON.parse(movies);
    for (var obj in object) {
        if (movies.hasOwnProperty(obj)) {
            $(".MovieList").append("<div class='item'>" +
                                            "<div class='quib-profile-header'>" +
                                                "<img src='" + object[obj].PosterContentThumb + "'/>" +
                                                "<div class='quib-profile-details'>" +
                                                    "<div>" + object[obj].Title + "</div>" +
                                                    "<div>" + object[obj].ReleaseYear + "</div>" +
                                                    "<div>" + object[obj].Director + "</div>" +
                                                "</div>" +
                                            "</div>" +
                                        "</div>");
        }
    }

    $('.cntQuibs').text(object.length)

    // Applying style to dynamically loaded quibbed movies   
    CommunityQuibStyle();
}

// Load followers of current user
function LoadFollowers(users) {
    $('.FollowerList').empty();
    if (users != undefined && users != '') {

        var object = JSON.parse(users);

        for (var obj in object) {
            if (users.hasOwnProperty(obj)) {
                //Anish Modified
                var followerAvatarBase32ImagePath = "/Images/user32/AvatarBase32.png"
                if (object[obj].AvatarBase32ImagePath != null)
                    followerAvatarBase32ImagePath = object[obj].AvatarBase32ImagePath;

                $(".FollowerList").append("<div class='follower-item'>" +
                                        "<div class='follower-image' >" +
                                            //"<img src='data:image/jpeg;base64," + object[obj].AvatarBase64 + "' id='FwrAvtr' height='34' width='34'/>" +
                                            "<img src='" + followerAvatarBase32ImagePath + "' id='FwrAvtr' height='34' width='34'/>" +

                                        "</div>" +
                                         "<span class='follower-name'>" + object[obj].DisplayName + "</span>" +
                                        "<div class='follower-button'>" +
                                            "<button type='submit' class='btn btn-default'>Following</button>" +
                                            "<span class='glyphicon glyphicon-ok' aria-hidden='true'></span>" +
                                        "</div>" +
                                    "</div>'");
            }
        }
        $('.cntFollowers').text(object.length);
    }



    // Applying style to dynamically loaded followers
    CommunityFollowersStyle();
}

// Load followees of current user
function LoadFollowees(users) {
    $('.FolloweeList').empty();
    var object = JSON.parse(users);
    for (var obj in object) {
        if (users.hasOwnProperty(obj)) {
            var followeeAvatarBase32ImagePath = "/Images/user32/AvatarBase32.png"
            if (object[obj].AvatarBase32ImagePath != null)
                followeeAvatarBase32ImagePath = object[obj].AvatarBase32ImagePath;

            $(".FolloweeList").append("<div class='follower-item'>" +
                                    "<div class='follower-image' >" +
                                    //anish modified start
                                        //"<img src='data:image/jpeg;base64," + object[obj].AvatarBase64Thumb + "' id='FwrAvtr'/>" +
                                        "<img src='" + followeeAvatarBase32ImagePath + "' id='FwrAvtr' />" +
                                          //anish modified end
                                    "</div >" +
                                    "<span class='follower-name'>" + object[obj].DisplayName + "</span>" +
                                    "<div class='follower-button'>" +
                                        "<button type='submit' class='btn btn-default' onclick='UnfollowUser(" + object[obj].Id + ")'>Unfollow</button>" +
                                        "<span class='glyphicon glyphicon-ok' aria-hidden='true'></span>" +
                                    "</div>" +
                                "</div>'");
        }
    }
    $('.cntFollowees').text(object.length);

    // Applying style to dynamically loaded followees
    CommunityFolloweesStyle();
}

// Click on 'Quibbed'
function GetMoviesByUser() {
    $(".community-quib").addClass("active-list");
    $("#community-following").removeClass("active-list");
    $("#community-followers").removeClass("active-list");
    $.ajax({
        async: false,
        url: localStorage.getItem('environment') + 'Profile/GetMoviesByUserId',
        dataType: 'text',
        data: { userId: $("#Id").val() },
        success: function (response) {
            if (response != undefined && response != null) {
                LoadQuibbedMovies(response);
            }
            else {
                alert("Error : Response is either NULL or Undefined");
            }
        }
    });
}

// Load all the followers of current user
function GetFollowers() {
    $(".community-quib").removeClass("active-list");
    $("#community-following").removeClass("active-list");
    $('#community-editprofile').addClass("active-list");

    $("#community-followers").addClass("active-list");

    $.ajax({
        //async: false,
        url: localStorage.getItem('environment') + 'Profile/GetFollowersByUserId',
        dataType: 'text',
        data: { userId: $("#Id").val() },
        success: function (response) {
            if (response != undefined && response != null) {
                LoadFollowers(response);
            }
            else {
                alert("Error : Response is either NULL or Undefined");
            }
        }
    });
}

// Load all the followees of current user
function GetFollowees() {
    $('#community-editprofile').addClass("active-list");
    $(".community-quib").removeClass("active-list");
    $("#community-followers").removeClass("active-list");

    $("#community-following").addClass("active-list");

    $.ajax({
        //async: false,
        url: localStorage.getItem('environment') + 'Profile/GetFolloweesByUserId',
        dataType: 'text',
        data: { userId: $("#Id").val() },
        success: function (response) {
            if (response != undefined && response != null) {
                LoadFollowees(response);
            }
            else {
                alert("Error : Response is either NULL or Undefined");
            }
        }
    });
}

// Show edit profile section on button click
function ShowEditProfile() {
    $(".community-quib").removeClass("active-list");
    $("#community-following").removeClass("active-list");
    $("#community-followers").removeClass("active-list");

    $('.Followers,.Following,.quibber').hide();
    $('.FormProfile').css('display', 'block');

    $('#image').attr('src', '');
    $(".imgAvtr").show();
    $("#btnUploadImage").show();
    document.getElementById("inputImage").disabled = false;
    $(".btnCancelUpload").hide();

    $('#images').attr('src', '');

    $("#btnUploadImages").show();
    document.getElementById("inputImages").disabled = false;
    $(".cropper-container").hide();

    $("#Email").val(model.Email);
    $(":password").val(model.Password);
    $("#MConfirmpassword").val(model.Password);
    $("#IsAdmin").val(model.IsAdmin);
    $("#IsEnabled").val(model.IsEnabled);
    //$('#btnEditProfile').prop('disabled', true);
}

// Hide edit profile
function HideEditProfilesm() {


    $('.edit-profile-form-desktop input').val("");
    $('.edit-profile-form-desktop textarea').val("");
    $(".error-message").hide();


    $(".community-quib").addClass("active-list");

    $('.main-sm').show();
    $('.side-sm').css('display', 'None');

    //$('#btnEditProfile').prop("disabled", false);
    $("#images").css('display', 'None');
    $("#images").attr('src', '');
    loadUserData(model);
}

function HideEditProfile() {



    $('.FormProfile input').val("");
    $('.FormProfile textarea').val("");
    $(".error-message").hide();

    CommunityQuibStyle();
    $(".community-quib").addClass("active-list");

    $('.quibber').show();
    $('.FormProfile').css('display', 'None');

    $("#image").css('display', 'None');
    $("#image").attr('src', '');
    loadUserData(model);
    //$('#btnEditProfile').prop("disabled", false);
}

function UnfollowUser(FolloweeId) {
    $.ajax({
        //async: false,
        url: localStorage.getItem('environment') + 'Profile/DeleteCommunity',
        type: 'POST',
        dataType: 'text',
        data: { UserId: $("#Id").val(), FolloweeId: FolloweeId },
        success: function (response) {
            if (response != undefined && response != null) {
                if (JSON.parse(response) == true) {
                    $('#unfollow-succesfull').modal('show');
                    GetFollowees();
                }
            }
            else {
                alert("Error : Response is either NULL or Undefined");
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
                $(".DisplaynameError").text("Sorry, this display name is already taken.");
                $(".DisplayName").focus();
                $("#btnEditProfile").trigger('click');
            }
            else {
                $(".DisplaynameError").text("");
            }
            return response;
        }
    });
}

// Validate username Register / Edit profile
function ValidateDisplaynameM() {

    $.ajax({
        url: localStorage.getItem('environment') + 'Register/ValidateDisplayname',
        type: 'POST',
        dataType: 'text',
        data: { displayName: $("#MDisplayName").val() },
        success: function (response) {
            if (response == 'False') {
                $(".DisplaynameErrorM").text("Sorry, this display name is already taken.");
                $(".DisplayNameM").focus();
                $("#btnEditProfile-sm").trigger('click');
            }
            else {
                $(".DisplaynameErrorM").text("");
            }
            return response;
        }
    });
}

function GetUserById() {
    $.ajax({
        url: localStorage.getItem('environment') + 'Profile/GetUserById',
        type: 'GET',
        dataType: 'json',
        success: function (response) {
            if (response != null && response != undefined) {
                model = response;
            }
        }
    });
}

function ValidatePassword() {
    $.ajax({
        url: localStorage.getItem('environment') + 'Profile/GetUserByIdAndPassword',
        type: 'POST',
        dataType: 'text',
        data: { password: $("#ReqPassword").val() },
        success: function (response) {

            if (JSON.parse(response)) {
                $('#passwordErr').addClass('hide');
                $('#required-password-modal').modal('hide');
                if ($('#IsDesktop').val() == "true") {


                    //$('.edit-profile-form-desktop').submit();
                    submitDesktopForm();
                }
                else {
                    submitMobileForm();
                    // $('.edit-profile-form-mobile').submit();
                }
            }
            else {
                $('#passwordErr').removeClass('hide');
            }
        }
    });
}

function submitDesktopForm() {
    $("#Email").val(model.Email);
    $("#IsAdmin").val(model.IsAdmin);
    $("#IsEnabled").val(model.IsEnabled);

    $.ajax({
        // use the action as defined in <form action="/Home/AddComment?ThreadId=123"
        url: localStorage.getItem('environment') + 'Profile/EditUser',//TODO Remove hardcoded URL
        method: "POST",
        data: $('.edit-profile-form-desktop').serialize(),
        dataType: 'html',
        success: function (response) {
            model = JSON.parse(response);
            HideEditProfile();
            SetUserAvatar();
            SetProfileAvatar();
        },
        error: function (error) {

            alert(error);
        }
    });
    return false;
}
function submitMobileForm() {
    $("#Email").val(model.Email);
    $("#IsAdmin").val(model.IsAdmin);
    $("#IsEnabled").val(model.IsEnabled);

    $.ajax({
        // use the action as defined in <form action="/Home/AddComment?ThreadId=123"
        url: localStorage.getItem('environment') + 'Profile/EditUser',//TODO Remove hardcoded URL
        method: "POST",
        data: $('.edit-profile-form-mobile').serialize(),
        dataType: 'html',
        success: function (response) {
            model = JSON.parse(response);
            HideEditProfilesm();
            SetUserAvatar();
            SetProfileAvatar();
        },
        error: function (error) {

            alert(error);
        }
    });
    return false;
}

// Done button click (checking if any field is updated or not)
function EditDone(IsDesktop) {

    if (IsEdit) {

        if (IsDesktop) {
            if ($("#image").attr('src') != '') {
                $("#32ImageBtn").trigger("click");
                $("#256ImageBtn").trigger("click");
            }
            if (ValidateDisplayname())
                ValidateConfirmPassword();
            if ($('.edit-profile-form-desktop').valid() && IsValidPassword) {
                $('#IsDesktop').val(true);
                $('#required-password-modal').modal('show');
                $('.docs-buttons').trigger("click");
            }
        }
        else {

            if ($("#images").attr('src') != '') {
                $("#32ImageBtns").trigger("click");
                $("#256ImageBtns").trigger("click");
            }
            if (ValidateDisplaynameM())
                ValidateConfirmPasswordM();
            if ($('.edit-profile-form-mobile').valid() && IsValidPassword) {
                $('#IsDesktop').val(false);
                $('#required-password-modal').modal('show');
                $('.docs-buttonss').trigger("click");
            }
        }

    }
    else {
        if (IsDesktop)
            HideEditProfile();
        else
            HideEditProfilesm();
    }
}

// validating if password and confirm password match
function ValidateConfirmPassword() {

    if ($(".Password").val() != "" || $(".ConfirmPassword").val() != "") {
        IsEdit = true;
        if ($(".Password").val() != $(".ConfirmPassword").val()) {
            IsValidPassword = false;
            $(".PasswordError").removeClass("hide");
        }
        else {
            $(".PasswordError").addClass("hide");
            IsValidPassword = true;
        }
    }
}

function ValidateConfirmPasswordM() {
    if ($(".edit-profile-form-mobile .Password").val() != "" || $(".edit-profile-form-mobile .ConfirmPassword").val() != "") {
        IsEdit = true;
        if ($(".edit-profile-form-mobile .Password").val() != $(".edit-profile-form-mobile .ConfirmPassword").val()) {
            IsValidPassword = false;
            $(".edit-profile-form-mobile .PasswordError").removeClass("hide");
        }
        else {
            $(".edit-profile-form-mobile .PasswordError").addClass("hide");
            IsValidPassword = true;
        }
    }
}

// Set profile avatar on top left of profile page and to set the same image for Upload image in edit profile.

function SetProfileAvatar() {

    $.ajax({
        //async: false,
        //ToDo anish
        //url: localStorage.getItem('environment') + '/Profile/GetUserAvatarById',
        url: localStorage.getItem('environment') + 'Profile/GetUserAvatar256ById',

        dataType: 'text',
        success: function (response) {
            if (response != undefined && response != null) {
                var object = JSON.parse(response);
                //$(".ProfileAvatar").attr("src", "data:image/jpeg;base64," + object);
                //$(".imgAvtr").attr("src", "data:image/jpeg;base64," + object);

                $(".ProfileAvatar").attr("src", object);
                $(".imgAvtr").attr("src", object);
                $("#inputImage").val('');
                $("#image").attr('src', '');
                $("#ImageString32").val(null);
                $(".ImageString32").val(null);

            }
        }
    });
}
function cancelUploadImage() {
    $(".imgAvtr").show();
    $(".btnCancelUpload").hide();
    //$("#image").cropper("destroy");
    $("#image").hide();
    // $("#image").remove();
    $(".cropper-container").hide();
    $("#image").attr('src', '')
    $("#ImageString32").val(null);
    $(".ImageString32").val(null);
    $("#ImageString256").val(null);
    $(".ImageString256").val(null);
    $("#btnUploadImage").show();
    document.getElementById("inputImage").disabled = false;
}
function cancelUploadImageSM() {
    $(".imgAvtr").show();
    $(".btnCancelUpload").hide();
    //$("#image").cropper("destroy");
    $("#images").hide();
    $("#images").attr('src', '')
    // $("#image").remove();
    $(".cropper-container").hide();
    $("#ImageString32").val(null);
    $(".ImageString32").val(null);
    $("#ImageString256").val(null);
    $(".ImageString256").val(null);
    $("#btnUploadImages").show();
    document.getElementById("inputImages").disabled = false;
}
function loadUserData(objmodel) {
    $(".UserDisplayName").html(objmodel.DisplayName);
    var fName = "";
    var lName = "";
    var personalStatement = "";
    if (objmodel.FirstName != null)
        fName = objmodel.FirstName;
    if (objmodel.LastName != null)
        lName = objmodel.LastName;
    $(".UserFullName").html(fName + " " + lName);
    if (objmodel.About != null)
        personalStatement = objmodel.About;
    $(".profile-description").html(personalStatement);

    $("#DisplayName").val(objmodel.DisplayName)
    $("#Email").val(objmodel.Email);
    $("#FirstName").val(objmodel.FirstName)
    $("#LastName").val(objmodel.LastName)
    $("#About").val(objmodel.About)
    $(":password").val(objmodel.Password);

    $(".imgAvtr").attr('src', objmodel.AvatarBase32ImagePath);
    $(".ImgAvtrLogoTopComm").attr('src', objmodel.AvatarBase32ImagePath);
    $(".ProfileAvatar").attr('src', objmodel.AvatarBase256ImagePath);
}
function UploadImage(objmodel) {
    $("#inputImage").trigger("click");
}
function UploadImageSM(objmodel) {
    $("#inputImages").trigger("click");
}

function onClickFollowUnFollowQS(userId, bFollow) {

    $.ajax({

        url: localStorage.getItem('environment') + 'Common/IsUserAuthenticated',
        type: 'POST',
        dataType: 'text',
        success: function (response) {

            if (response == "true") {
                $.ajax({

                    url: localStorage.getItem('environment') + 'QuibStack/FollowUnfollowUser',
                    type: 'POST',
                    data: { followeeId: userId, followUnfollow: bFollow },
                    dataType: 'text',
                    success: function (response) {

                        if (response == "true") {
                            if (bFollow == true) {

                                //$('#follow-Model-Success').modal('show');
                                $(".btn-Qsm").html('Unfollow');
                                $(".btn-Qsm").attr('onClick', "onClickFollowUnFollowQS(" + userId + ",false)");
                            }
                            else {
                                //$('#unfollow-succesfull').modal('show');
                                $(".btn-Qsm").html('Follow');
                                $(".btn-Qsm").attr('onClick', "onClickFollowUnFollowQS(" + userId + ",true)");
                            }
                            GetFollowers();
                        }
                        else
                            $('#guest-login-modal').modal('show');
                    }
                });
            }
            else
                $('#guest-login-modal').modal('show');
        }
    });
}