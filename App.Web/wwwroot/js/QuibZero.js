// Hide +/-/toggle buttons on Quib Zero
function ToggleTimerNavButtons(IsQuibZero) {
    if (IsQuibZero) {
        // Hide +/-/toggle buttons on Quib Zero
        $('#btnMinus').fadeOut();
        $('#btnPlus').fadeOut();
        $('#TimerToggle').fadeOut();
    }
    else {
        // Show +/-/toggle buttons on play
        $('#btnMinus').fadeIn();
        $('#btnPlus').fadeIn();
        $('#TimerToggle').fadeIn();
    }
}

// Change quib zero button
function ToggleQuibZeroButton(IsQuibZero) {
    if (IsQuibZero) {
        $('#imgQuibZero').attr("src", localStorage.getItem('environment') + "Images/QuibZero1.png");
    }
    else {
        //$('#imgQuibZero').attr("src", localStorage.getItem('environment') + "Images/quib%20zero.png");
        $('#imgQuibZero').attr("src", localStorage.getItem('environment') + "Images/QuibZero2.png");
    }
}

// hide quib / movie scruber
function ToggleSliderButtons(IsQuibZero) {
    if (IsQuibZero) {
        $('#MovieScrubber').fadeOut();
        $('#QuibScrubber').fadeOut();
    }
    else {
        $('#MovieScrubber').fadeIn();
        $('#QuibScrubber').fadeIn();
    }
}

// Change quib zero button
function ToggleComposeQuibButton(IsQuibZero) {
    if (localStorage.getItem('UserId') == null && localStorage.getItem('UserId') == undefined && localStorage.getItem('UserId') == 0) {
        $('#btn-composequib').val('Write a quib...');
    }
    else {
        if (IsQuibZero) {
            $('#btn-composequib').val('Write a quib zero...');
        }
        else {
            $('#btn-composequib').val('Write a quib...');
        }
    }
}

// Update ui controls if quib zeros (timer and timeline)
function UpdateUIControls(IsQuibZero) {
    ToggleQuibZeroButton(IsQuibZero);
    ToggleSliderButtons(IsQuibZero);
    ToggleTimerNavButtons(IsQuibZero);
    ToggleComposeQuibButton(IsQuibZero);
}