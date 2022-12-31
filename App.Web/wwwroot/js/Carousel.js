var count = 0;
var inc = 0;
var itemDisplay = 4;
var slider;
var itemleft;
var itemslide;

$(document).ready(function () {
    slider = $('.slider-width')[0];
    itemleft = $(".item").length % itemDisplay;
    itemslide = Math.floor($(".item").length / itemDisplay) - 1;
   
});


$(document).on('click', '#next', function () {
    if (inc !== itemslide + itemleft) {
        if (inc == itemslide) {
            inc = inc + itemleft;
            count = count - (screen.width / itemDisplay) * itemleft;
        }
        else {
            inc++;
            count = count - screen.width;
        }
    }
    slider.style.left = count + "px";
});


$(document).on('click', '#prev', function () {
    if (inc !== 0) {
        if (inc == itemleft) {
            inc = inc - itemleft;
            count = count + (screen.width / itemDisplay) * itemleft;
        }
        else {
            inc--;
            count = count + screen.width;
        }
    }
   slider.style.left = count + "px";
});



