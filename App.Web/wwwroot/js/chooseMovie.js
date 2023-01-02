var scrwdt = 0;
scrwdt = screen.width;
var deferred = $.Deferred();
function StyleMovieList() {
    var deferred = $.Deferred();
    var Col = 0;
    var TotalHight = 0;
    var margin_bottom = 10;
    var margin_right = 14;
    var leftPos = 0;
    
    $(".movie-container").children().each(function () {
     
        if (scrwdt > 768) {
            TotalHight = TotalHight + margin_bottom + $(this).height();
            var topPos = (TotalHight - (margin_bottom + $(this).height()))-10;
            if (TotalHight > $(".movie-container").height()) {
                Col = Col + 1;
                leftPos = (($(this).width() + margin_right) * Col);
                TotalHight = $(this).height() + margin_bottom;
                topPos = -10;
            }
            $(this).css('top', topPos + 'px')
            $(this).css('left', leftPos + 'px')
        } else {
            $('.prev-arrows').css('display', 'none')
            $('.next-arrows').css('display', 'none')
            $(this).css('position', 'relative')
            $(this).css('left', '0px')
            $(this).css('top', '0px')

        }
    })

    setTimeout(function () {
        deferred.resolve('success');
    }, 500);
    return deferred.promise();

}

function RecentStyleMovieList() {
   
   
    setTimeout(function () {
        deferred.resolve('success');
    }, 500);
    return deferred.promise();
}
function ActiveStyleMovieList() {

  
    setTimeout(function () {
        deferred.resolve('success');
    }, 500);
    return deferred.promise();
}

