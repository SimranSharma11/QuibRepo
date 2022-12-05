var csliderflag = true;
$(document).ready(function () {
  

    // Setting thumb image source on avatar change
    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#imgMoviePoster').attr('src', e.target.result);
            }
            reader.readAsDataURL(input.files[0]);
        }
    }

    function readURLMovie(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#imgMoviePoster').attr('src', e.target.result);
            }
            reader.readAsDataURL(input.files[0]);
        }
    }

    function readURLUser(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#imgUserPoster').attr('src', e.target.result);
            }
            reader.readAsDataURL(input.files[0]);
        }
    }

    // Redirecting to community page on header avatar click
    $('#ImgAvtrLogo,.ImgAvtrLogo').on("click", function (e) {
        if (localStorage.getItem('UserId') == 'GUEST') {
            $('#register-modal').modal('show');
        }
        else {
            e.preventDefault();
            $('.popup_load').css("display", "block");
            window.location.href = localStorage.getItem('environment') + "Profile?UserId=" + localStorage.getItem('UserId');

            setTimeout(function () {
                $('.popup_load').css("display", "none");
            }, 2000);


        }
    });

    // Avatar upload change
    $("#fileMoviePoster").on("change", function () {
        readURLMovie(this);
    });

    $("#fileUserPoster").on("change", function () {
        readURLUser(this);
    });


    $(".choose-movie-wrapper").swipe({
        swipeRight: function (event, direction, distance, duration, fingerCount, fingerData) {
            slideLeft();
        },
        swipeLeft: function (event, direction, distance, duration, fingerCount, fingerData) {
            slideRight();
        }
    });


    function scrollByNew(x) {
        csliderflag = false;
        $('.choose-movie-list').stop().animate({
            scrollLeft: '+=' + x,
        }, 800, function () {
            // Animation complete.
            csliderflag = true;
        });
    }
    function scroll(y) {
        csliderflag = false;
        $('.choose-movie-list').stop().animate({
            scrollTop: '+=' + y,
        }, 800, function () {
            // Animation complete.
            csliderflag = true;
        });
    }

    $('.right').click(function () {
        slideRight();
    });

    $('.left').click(function () {
        slideLeft();
    });
    $('.upbtn').click(function () {
        slideUp();
    });
    function slideUp() {
        console.log("Up");

        var y = $(window).scrollTop();
        $(window).scrollTop(y - screen.height);
    }
    $('.downbtn').click(function () {
        slideDown();
    });
    function slideDown() {
        console.log("DOWN");
        var y = $(window).scrollTop();
        $(window).scrollTop(y + screen.height);
    }
    function slideRight() {
        if (csliderflag) {
            var scrollval = $('.choose-movie-list').width();
            scrollByNew(scrollval);
            if ($('.choose-movie-list').width() < 768) {
                console.log("works");
                var scrollval = $('.choose-movie-list').height();
                scroll(scrollval);
            }
        }
    }

    function slideLeft() {
        if (csliderflag) {
            var scrollval = $('.choose-movie-list').width();
            scrollByNew(-scrollval);
            if ($('.choose-movie-list').width() < 768) {
                console.log("works");
                var scrollval = $('.choose-movie-list').height();
                $(movie)
                scroll(scrollval);
            }
        }
    }
});


$(window).resize(StyleMovieList);



// Applying style to the list of dynamically loaded movies (called from window.load and loading movies)
function StyleMovieList() {
    var deferred = $.Deferred();
    var Col = 0;
    var TotalHight = 0;
    var margin_bottom = 10;
    var margin_right = 0;
    var leftPos = 0;

    $(".movie-container").children().each(function () {
        TotalHight = TotalHight + margin_bottom + $(this).height();
        var topPos = TotalHight - (margin_bottom + $(this).height());
        if (TotalHight > $(".movie-container").height()) {
            Col = Col + 1;
            leftPos = ($(this).width() + margin_right) * Col;
            TotalHight = $(this).height() + margin_bottom;
            topPos = 0;
        }
        $(this).css('top', topPos + 'px')
        $(this).css('left', leftPos + 'px')

    })

    setTimeout(function () {
        deferred.resolve('success');
    }, 500);
    return deferred.promise();

}

// Redirect to quib stream page
function RedirectToQuibStreamPage(MovieId) {
    $('.popup_load').css("display", "block");
    window.location.href = localStorage.getItem('environment') + "/ChooseMovie/QuibStream?MovieId=" + MovieId + "&isQuibZero=" + true;
    setTimeout(function () {
        $('.popup_load').css("display", "none");
    }, 2000);
}

