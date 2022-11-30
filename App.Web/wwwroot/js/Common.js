// Set movie thumbnail on left top corner
function SetMovieThumbnail() {
    $.ajax({
        async: false,
        url:"https://localhost:7231/GetMovieById",
        type: 'POST',
        dataType: 'text',
        success: function (response) {
            if (response != undefined && response != null) {
                var object = JSON.parse(response);

                //KVW - use file path not base64
                if (object != null && object != undefined && object.PosterContent != null && object.PosterContent != undefined && object.PosterContent != "" && object.PosterContent.length >= 100)
                    $(".MoviePosterThumb").attr("src", "data:image/jpeg;base64," + object.PosterContent);
                else
                    $(".MoviePosterThumb").attr("src", object.PosterContent);
            }
        }
    });
}

// Set user avatar on right top corner
function SetUserAvatar() {
    if (localStorage.getItem('UserId') != null && localStorage.getItem('UserId') != undefined && localStorage.getItem('UserId').length > 0 && parseInt(localStorage.getItem('UserId')) > 0) {
        $.ajax({
            //async: false,
            url: localStorage.getItem('environment') + 'Profile/GetUserAvatar32ById',//ToDO anish
            dataType: 'text',
            success: function (response) {

                if (response != undefined && response != null) {
                    var object = JSON.parse(response);

                    //KVW - use file path not base64
                    if (object != null && object != undefined && object != "" && object.length >= 100) {
                        $("#ImgAvtrLogo").attr("src", "data:image/jpeg;base64," + object);
                        $(".ImgAvtrLogo").attr("src", "data:image/jpeg;base64," + object);
                    }
                    else {
                        $("#ImgAvtrLogo").attr("src", object);
                        $(".ImgAvtrLogo").attr("src", object);
                    }
                }
            }
        });
    }
}

function BackClick() {
    localStorage.setItem("IsBackBtnClicked", "true");
    window.location.href = document.referrer;
    //window.history.back();
}

// navigate to login page
function RedirectToLogin(e) {
    e.preventDefault();
    location.href = localStorage.getItem('environment') + "Login";
}

function queryStringValuefromKey(key) {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0].toLowerCase());
        vars[hash[0].toLowerCase()] = hash[1];
    }
    return vars[key.toLowerCase()];
}

window.onload = function () {
    //Reset the session in every 10 minutes
    //setInterval("KeepSessionAlive()", (10 * 60 * 1000));
    //Disable autocomplete throughout the page
    $('input:text,form').attr('autocomplete', 'off');
    $('input:text,form').prop('autocomplete', 'off');
}

function KeepSessionAlive() {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", localStorage.getItem('environment') + "KeepSessionAlive", true);
    xmlHttp.send();
}

//Disable autocomplete throughout the page
$(document).ready(function () {
    $("input,form").attr("autocomplete", "off");
    $("input,form").attr("autocompletetype", "disabled");
    $('input').prop('autocomplete', false);
});

//Check user is authenticated to do action or not
function IsUserAuthenticated() {
    var deferred = $.Deferred();
    $.ajax({
        url: localStorage.getItem('environment') + 'Common/IsUserAuthenticated',
        type: 'POST',
        dataType: 'text',
        success: function (response) {
            if (response != null && response != undefined && response.toLowerCase() == "true")
                deferred.resolve(true);
            else
                deferred.resolve(false);
        }
    });
    return deferred.promise();
}