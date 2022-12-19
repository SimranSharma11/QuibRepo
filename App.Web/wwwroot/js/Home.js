
// Some scripts are on .cshtml page as well
function RedirectToRegister(e) {
    e.preventDefault();
    location.href = localStorage.getItem('environment') + "/Identity/Account/Register";
}

// navigate to login page
function RedirectToLogin(e) {
    e.preventDefault();
    location.href = localStorage.getItem('environment') + "/Identity/Account/Login";
}
function RedirectToLogout(e) {
    e.preventDefault();
    location.href = localStorage.getItem('environment') + "/Identity/Account/Logout";
}
// Visit website as a Guest
function RedirectToChooseMovie(e) {
    e.preventDefault();
    location.href = localStorage.getItem('environment') + "/ChooseMovie";
}


// hide loading pop up
//$('document').ready(function (){
//    $('.popup_load').css("display", "none");
//});