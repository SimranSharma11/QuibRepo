// MY STREAM - Delete quib
function DeleteQuibById(QuibId) {
    $('#delete-quib-modal').modal('show');
    $('#DeleteQuibId').val(QuibId);
}
function decrement() {
   // quibTimePrepend = quibContent[0].time.toString().toHHMMSS();
    console.log($('#mystreamtimer').val());
    var hms = $('#mystreamtimer').val();
    var a = hms.split(':'); 
    var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);
   seconds = seconds + 1;
    seconds =seconds.toString().toHHMMSS();
    console.log(seconds);
    $('#mystreamtimer').val(seconds);
}

// Timer minus (-) button click of timer
function increment() {
    console.log($('#mystreamtimer').val());
    var hms = $('#mystreamtimer').val();
    var a = hms.split(':');
    var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);
    seconds = seconds - 1;
   seconds = seconds.toString().toHHMMSS();
    console.log(seconds);  
  
}

// MY STREAM - Delete quib
function ConfirmDeleteQuibById(QuibId) {
    
    $.ajax({
        url: localStorage.getItem('environment') + '/api/QuibStream/DeleteQuibById',
        type: 'delete',
        dataType: 'text',
        data: { Id: QuibId },
        success: function (response) {
            if (response != undefined && response != null) {
                $('input.quibId[value="' + QuibId + '"]').parents('.mystream-wrapper').remove();
                // My stream tally
                $('#MyStreamCount').text(parseInt($('#MyStreamCount').text()) - 1);
            }
            else {
                alert("Can't complete action at this time. Please try again later.");
            }
        }
    });
    $('#delete-quib-modal').modal('hide');
}

// MY STREAM - Delete bumped quib
function DeleteBumpQuibById(QuibId) {
    $('#delete-bump-modal').modal('show');
    $('#DeleteBumpQuibId').val(QuibId);
}

//MY STREAM
function ConfirmDeleteBumpQuibById(QuibId) {
    var userid = 66;
    var movieId = localStorage.getItem('MovieId');
    var quibId = QuibId;
    $.ajax({
        //async: false,
        url: localStorage.getItem('environment') + '/api/QuibStream/DeleteBump?quibId=' + quibId + '&userId=' + userid + '&movieId=' + movieId,
        dataType: 'text',
        type: 'delete',
        success: function (response) {
            if (response != undefined && response != null) {
                $('input.quibId[value="' + QuibId + '"]').parents('.mystream-wrapper').remove();
            }
            else {
                alert("Can't complete action at this time. Please try again later.");
            }
        }
    });
    $('#delete-bump-modal').modal('hide');
}

// Save quib from quib comose area
// MY STREAM - Post quib
function UpdateQuibPostedDate(QuibId, Body) {
    // loading popup
    setTimeout(function () {
        $.ajax({
            url: localStorage.getItem('environment') + '/api/QuibStream/UpdateQuibPostedDate?QuibId=' + parseInt(QuibId) + '&Body=' + Body,
            type: 'Put',
            dataType: 'text',
            beforeSend: function () {
                // setting a timeout
                $('.popup_load').show();
            },
            success: function (response) {
          
                var SeedquibClass = "";

                if (response != undefined && response != null) {
                    $('.popup_load').css('display', 'none');

                    var newQuib = JSON.parse(response);
                    var time = "";

                    if (newQuib[0].isQuibZero == true)
                        time = 'QUIB ZERO';
                    else
                        time = newQuib[0].time.toString().toHHMMSS();

                    var avatar = null;

                    if (newQuib[0].isSeedQuib) {
                        SeedquibClass = "quib-Seed";
                        switch (newQuib[0].seedQuibType) {
                            case "exc":
                                //avatar = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsSAAALEgHS3X78AAABOklEQVRYw+2XsWrCQBzGP6uDSyct0kk6RGhAuFLB1VnoQ+QdfIBODu4ieYJAwHcQnDM5CKEkiFOF65GkDglInQ56Gf+ROwLe9g33v9/33d2fu4YL/MHgeDC5eL0B2paFaRDAKQqMPY8M0PwAPikT35dLvEwmAIAn28bv5YKf7VZfAp3BQNGP/T6pTn3PAA9DRedJohegSFNFZ3GsF6DsOOdcL0DZ8cn3NSdAdHwzgP+Ov3c7/QC3GpUApPPyldSeQPlKagOQzrPDwQyAdJ4LYQZANqN0vzcDIJtRstkYSoBzFOdzlRLVAE6+DxFFlQAa91dxbQHaloU318U0CGAvFmSAFnXi62wG5jgAgN5wiCyOcVyt9CXwPBopussYqQ4ZIFyvFR0RPyfkLfiaz5ELgS5jiDyP3A3vfeAKd5h1K4V+TpsAAAAASUVORK5CYII=';
                                avatar = "/Images/user32/seedExclaimation.png";
                                SeedSymbol = "<input type='text' readOnly='true' value='!' style='text-align:center;width:30px;margin-right:5px;' />";
                                break;
                            case "que":
                                //avatar = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsSAAALEgHS3X78AAACRUlEQVRYw+2XP0gbYRTAf7YlBFLNIgkBRUWvcEpoCgfV7cASodglweDqFJw9FQJCJwen4CKZMkkgIC5OAUtQWqgQDQRiwMaLdGgNNmJtoEqlHYIHsWpyfyQd+qb37t73vt+9797jfW0x+E0L5VErN/8nAJ7ocbYLAqKi4JEk3F6v9vxUVfmyu0shFuMsnX6YDAxEIgR3dgB4PzND3GYjMTRENh7H4XIxGAwSSKUYXFrSBfD4Dbxt5OQKhXi1vExudZW9cJiLUgmAX5UKXzc2OFZVngUCAHQND/Pj6orK9rZ1GZDm5wE4yWZvfV9OJsmvrWn2y9nZpjPQEMApy9p5t/f13emnrq9rus3hYCASsQagQxQ1vXd09E6/cjJZZ7f39FgD8H1/X9PdXi+uUKipwM1KQ4CzdJrjXE6zL8rlW/3sglBnnx8dNQXQVB94NzmJqCicZLN31nnXxISmX1arfFpctA7g58EBe+HwvT69Y2Oanr/xP9wnlrRipyzTPTIC1LpiI1jLAZ4rClBL/YeFBV1rTQM4ZZl+vx+ArUjkr3J8cIDrr/8YjfJ5ZUX3elMAdkGg3++nmEqRn5szFMMUgKgonKoqW+PjhmOYAvBIEplo1EwIcwBP3W5D524JgFOWqRSLpjY3BdAhinwrFEwDtP0fy40ssgsCL2IxXmcyuofQm6JrLL8WUVHwTU0BtSHlXFUNV4OhDHgkqc7u9PkMZ8AQQGlzU9Mvq1UOEwnDAIaroHt6mk6fj8NEQvdtyBIAq6TlZfgHzdKwUcrZKTQAAAAASUVORK5CYII=';
                                avatar = "/Images/user32/seedQuestion.png";
                                SeedSymbol = "<input type='text' readOnly='true' value='?' style='text-align:center;width:30px;margin-right:5px;' />";
                                break;
                            case "equ":
                                //avatar = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsSAAALEgHS3X78AAAAaElEQVRYw2OcycDwn2EAAdNAWj7qgFEHjDpg1AGjDmBgYGBgwSYoFhbGYFJeTlWLthkbD84QYBytDUe8A7DmAn4HBwalyEiqWnQ+PZ14B/BpajIYJCbSxQGjuWDUAaMOGHXAqANGHQAAWdYN+0tRu40AAAAASUVORK5CYII=';
                                avatar = "/Images/user32/seedEquals.png";
                                SeedSymbol = "<input type='text' readOnly='true' value='\"' style='text-align:center;width:30px;margin-right:5px;' />";
                                break;
                            case "col":
                                //avatar = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsSAAALEgHS3X78AAAArElEQVRYw2OcycDwn2EAAdNAWj7qgFEHDG0HcKiqMhjOnMngdfYsg1ZXF9kOYCFXo2ZJCYNBYiIDAwMDg7iuLsPn+/cZHk+fTr8QkDQxQeGLGBiQZQ7ZDri1di0K/97y5WSZQ3YU3GlrY/j5/j2DiIEBw73lyxk+HjhAljmMo3XBqANGHTDqgCHrgNHacMBrwwd798LZv75+Jbs2pKgyks3MHK0NRx0w6gCKAQBoBDxBbN3dTQAAAABJRU5ErkJggg==';
                                avatar = "/Images/user32/seedColon.png";
                                SeedSymbol = "<input type='text' readOnly='true' value=':' style='text-align:center;width:30px;margin-right:5px;' />";
                                break;
                            default:
                                //avatar = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsSAAALEgHS3X78AAABOklEQVRYw+2XsWrCQBzGP6uDSyct0kk6RGhAuFLB1VnoQ+QdfIBODu4ieYJAwHcQnDM5CKEkiFOF65GkDglInQ56Gf+ROwLe9g33v9/33d2fu4YL/MHgeDC5eL0B2paFaRDAKQqMPY8M0PwAPikT35dLvEwmAIAn28bv5YKf7VZfAp3BQNGP/T6pTn3PAA9DRedJohegSFNFZ3GsF6DsOOdcL0DZ8cn3NSdAdHwzgP+Ov3c7/QC3GpUApPPyldSeQPlKagOQzrPDwQyAdJ4LYQZANqN0vzcDIJtRstkYSoBzFOdzlRLVAE6+DxFFlQAa91dxbQHaloU318U0CGAvFmSAFnXi62wG5jgAgN5wiCyOcVyt9CXwPBopussYqQ4ZIFyvFR0RPyfkLfiaz5ELgS5jiDyP3A3vfeAKd5h1K4V+TpsAAAAASUVORK5CYII=';
                                avatar = "/Images/user32/seedExclaimation.png";
                                SeedSymbol = "<input type='text' readOnly='true' value='X' style='text-align:center;width:30px;margin-right:5px;' />";
                        }
                    }
                    else {
                        avatar = newQuib[0].avatarBase32ImagePath;

                        if (!avatar) {
                            //avatar = "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";
                            avatar = "/Images/user32/AvatarBase32.png";
                        }
                    }


                    // newQuib.Id
                    var body = (newQuib[0].isScreenshot == false) ? newQuib[0].body : "<img style='height:auto; width:100%;' id='img" + newQuib[0].id + "' src='" + newQuib[0].body + "' />";

                    if (newQuib[0].isScreenshot == false) {
                        $('[value=' + newQuib[0].id + ' ]').parent('.mystream-wrapper').before("<div class='mystream-wrapper'>" +
                            "<div class='mystream-item' " +
                            "<div class='panel panel-default quib-item-inner'>" +
                            "<div class='panel-body' style='padding: 0; border:none'>" +
                            "<div class=''>" +
                            "<div class='quib-compose-header'>" +
                            "<img src='" + avatar + "' class='avatar-quibcomposer' />" +
                            "<span class='composer-name " + SeedquibClass + "' style='font-weight: bold'> " + newQuib[0].displayName + "</span>" +
                            "<input type='hidden' class='quibId' value='" + newQuib[0].id + "'>" +
                            "<div class='quib-compose-timer-wrapper'>" +
                            "<input type='text' class='form-control quib-compose-timer mystream-time' value='" + time + "' readonly='true' />" +
                            "</div>" +
                            "<div class='compose-side-header' style='float: right'>" +

                            "</div>" +
                            "</div>" +
                            "<div class='quib-composer " + SeedquibClass + "'>" +
                            body +
                            
                            "</div>" +
                            "<button class='btn btn-default btn-stream'style='float:left'onclick='DeleteQuibById(" + newQuib[0].id + ")'>unpost</button>" +
                            "" +
                            "</div>" +
                            "</div>" +
                            "</div>" +

                            //"<div style='clear: both; margin: 4px 0; height: 16px'><span class='btn btn-default btn-stream' style='float: left' onclick='DeleteBumpQuibById(" + object[obj].Id + ")'>Delete</span>" +

                            "</div>" +
                            "</div>").remove();
                    }
                    else {
                        $('[value=' + newQuib[0].id + ' ]').parent('.mystream-wrapper').before("<div class='mystream-wrapper'>" +
                            "<div class='mystream-item' " +
                            "<div class='panel panel-default quib-item-inner'>" +
                            "<div class='panel-body' style='padding: 0; border:none'>" +
                            "<div class=''>" +
                            "<div class='quib-compose-header'>" +
                            "<input type='hidden' class='quibId' value='" + newQuib[0].id + "'>" +
                            "<div class='quib-compose-timer-wrapper' style='top: 0;'>" +
                            "<input type='text' class='form-control quib-compose-timer mystream-time' value='" + time + "' readonly='true' />" +
                            "</div>" +
                            "<div class='compose-side-header' style='float: right'>" +
                            "</div>" +
                            "</div>" +
                            "<div class='quib-composer " + SeedquibClass + "' style='margin-top: -20px;'>" +
                            body +
                           
                            "</div>" +
                            "<button class='btn btn-default btn-stream'style='float:left'onclick='DeleteQuibById(" + newQuib[0].id + ")'>unpost</button>" +
                            "" +
                            "</div>" +
                            "</div>" +
                            "</div>" +
                            "</div>" +
                            "</div>").remove();
                    }

                    if ((newQuib.IsQuibZero && IsQuibZeroOpen) || (!newQuib.IsQuibZero && !IsQuibZeroOpen)) {
                        // Adding quib dynamically to quib stream after post
                        AddPostedQuibInQuibStream(newQuib);
                    }

                    // to put new pipes on timeline
                    drawTimeLine();
                }
                else {
                    alert("Can't complete action at this time. Please try again later.");
                }
            },
            complete: function () {
                $('.popup_load').css('display', 'none');
                //if (!IsQuibZeroOpen)
                //    $(".btnPlay").trigger('click');
            }
        });
    }, 100);
    // closing popup of 'are you sure you want to post a quib?'
    $('#post-quib-modal').modal('hide');
    $('#postall-quib-modal').modal('hide');
}

// Adding posted quib into quib stream
function AddPostedQuibInQuibStream(Quib) {

    var Time = Quib[0].time;
    var avatar = null;
    var SeedquibClass = "";
    if (Quib[0].isSeedQuib) {
        SeedquibClass = "quib-Seed";
        switch (Quib[0].seedQuibType) {
            case "exc":
                // avatar = 'iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsSAAALEgHS3X78AAABOklEQVRYw+2XsWrCQBzGP6uDSyct0kk6RGhAuFLB1VnoQ+QdfIBODu4ieYJAwHcQnDM5CKEkiFOF65GkDglInQ56Gf+ROwLe9g33v9/33d2fu4YL/MHgeDC5eL0B2paFaRDAKQqMPY8M0PwAPikT35dLvEwmAIAn28bv5YKf7VZfAp3BQNGP/T6pTn3PAA9DRedJohegSFNFZ3GsF6DsOOdcL0DZ8cn3NSdAdHwzgP+Ov3c7/QC3GpUApPPyldSeQPlKagOQzrPDwQyAdJ4LYQZANqN0vzcDIJtRstkYSoBzFOdzlRLVAE6+DxFFlQAa91dxbQHaloU318U0CGAvFmSAFnXi62wG5jgAgN5wiCyOcVyt9CXwPBopussYqQ4ZIFyvFR0RPyfkLfiaz5ELgS5jiDyP3A3vfeAKd5h1K4V+TpsAAAAASUVORK5CYII=';
                avatar = "/Images/user32/seedExclaimation.png";
                break;
            case "que":
                //  avatar = 'iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsSAAALEgHS3X78AAAB10lEQVRYw+2WTUsbURSGH6WoMJZBhIQQskkxhcD4gaCESpiFSBFB3IS4dCGSnQHxJ2QxILhSAu4dAtmFLgQlulAqUgRBaW2TRQ3SVAijBowb3Ygakpm58QMR5izPvPe8zzn3zsxtSsINbxjNb2nuADgADkDDAEFNI6hpQlpfLEY4k3kZAFckQuTkhMD4OGd7e5batq4uhjc3CScSXBQKtrU/iHQ9ODvLn7U1tsbGbM2/3nWdmZjAyGafByCrKn3T00LmAEMrK0guF+mBAa6Oj0WGa70FXxYWANiNx20L+WIxfKEQh6mUsLklgKyquBWFUi4nVPBzNArA2f6+sLklgHd0tKFC7u5uAM6PjhpaZ3oGWmUZgA6/n75kko9eL+0eD7/SaX4nEjX6FkkCoGdujsrMDJ2BAJenp+zG45YTtH0LWiSJ3qmph04Vhf/b26Yn/NPISJW2Xdf51t9vWt90Cwrr66aL/JOTNbm/Ozt1tW5FsWzQFKCYSvHv4KDus4ph1OR+6npdbblYfBoAwEY0Simfr8qV8nkO5+drJ7C8zPfFxarcdbnMj6UlS4AmkTthUNNolWUqhlHX/HHIqnq/RbnVVduvoRDAa8b7+h07AA6AA+AAvEbcAgITjqrNm3S6AAAAAElFTkSuQmCC';
                avatar = "/Images/user32/seedQuestion.png";
                break;
            case "equ":
                //  avatar = 'iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsSAAALEgHS3X78AAAAaElEQVRYw2OcycDwn2EAAdNAWj7qgFEHjDpg1AGjDmBgYGBgwSYoFhbGYFJeTlWLthkbD84QYBytDUe8A7DmAn4HBwalyEiqWnQ+PZ14B/BpajIYJCbSxQGjuWDUAaMOGHXAqANGHQAAWdYN+0tRu40AAAAASUVORK5CYII=';
                avatar = "/Images/user32/seedEquals.png";
                break;
            case "quo":
                // avatar = 'iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsSAAALEgHS3X78AAAB10lEQVRYw+2WTUsbURSGH6WoMJZBhIQQskkxhcD4gaCESpiFSBFB3IS4dCGSnQHxJ2QxILhSAu4dAtmFLgQlulAqUgRBaW2TRQ3SVAijBowb3Ygakpm58QMR5izPvPe8zzn3zsxtSsINbxjNb2nuADgADkDDAEFNI6hpQlpfLEY4k3kZAFckQuTkhMD4OGd7e5batq4uhjc3CScSXBQKtrU/iHQ9ODvLn7U1tsbGbM2/3nWdmZjAyGafByCrKn3T00LmAEMrK0guF+mBAa6Oj0WGa70FXxYWANiNx20L+WIxfKEQh6mUsLklgKyquBWFUi4nVPBzNArA2f6+sLklgHd0tKFC7u5uAM6PjhpaZ3oGWmUZgA6/n75kko9eL+0eD7/SaX4nEjX6FkkCoGdujsrMDJ2BAJenp+zG45YTtH0LWiSJ3qmph04Vhf/b26Yn/NPISJW2Xdf51t9vWt90Cwrr66aL/JOTNbm/Ozt1tW5FsWzQFKCYSvHv4KDus4ph1OR+6npdbblYfBoAwEY0Simfr8qV8nkO5+drJ7C8zPfFxarcdbnMj6UlS4AmkTthUNNolWUqhlHX/HHIqnq/RbnVVduvoRDAa8b7+h07AA6AA+AAvEbcAgITjqrNm3S6AAAAAElFTkSuQmCC';
                avatar = "/Images/user32/seedQuote.png";
                break;
            case "col":
                // avatar = 'iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsSAAALEgHS3X78AAAArElEQVRYw2OcycDwn2EAAdNAWj7qgFEHDG0HcKiqMhjOnMngdfYsg1ZXF9kOYCFXo2ZJCYNBYiIDAwMDg7iuLsPn+/cZHk+fTr8QkDQxQeGLGBiQZQ7ZDri1di0K/97y5WSZQ3YU3GlrY/j5/j2DiIEBw73lyxk+HjhAljmMo3XBqANGHTDqgCHrgNHacMBrwwd798LZv75+Jbs2pKgyks3MHK0NRx0w6gCKAQBoBDxBbN3dTQAAAABJRU5ErkJggg==';
                avatar = "/Images/user32/seedColon.png";
                break;
            default:
                // avatar = 'iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsSAAALEgHS3X78AAABOklEQVRYw+2XsWrCQBzGP6uDSyct0kk6RGhAuFLB1VnoQ+QdfIBODu4ieYJAwHcQnDM5CKEkiFOF65GkDglInQ56Gf+ROwLe9g33v9/33d2fu4YL/MHgeDC5eL0B2paFaRDAKQqMPY8M0PwAPikT35dLvEwmAIAn28bv5YKf7VZfAp3BQNGP/T6pTn3PAA9DRedJohegSFNFZ3GsF6DsOOdcL0DZ8cn3NSdAdHwzgP+Ov3c7/QC3GpUApPPyldSeQPlKagOQzrPDwQyAdJ4LYQZANqN0vzcDIJtRstkYSoBzFOdzlRLVAE6+DxFFlQAa91dxbQHaloU318U0CGAvFmSAFnXi62wG5jgAgN5wiCyOcVyt9CXwPBopussYqQ4ZIFyvFR0RPyfkLfiaz5ELgS5jiDyP3A3vfeAKd5h1K4V+TpsAAAAASUVORK5CYII=';
                avatar = "/Images/user32/seedExclaimation.png";
        }
    }
    else {
        //avatar = Quib.AvatarBase64Thumb;
        avatar = Quib[0].avatarBase32ImagePath;

        if (!avatar) {
            //avatar = "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";
            avatar = "/Images/user32/AvatarBase32.png";
        }
    }


    var body = (Quib[0].isScreenshot == false) ? Quib[0].body : "<img style='height:auto; width:100%;' id='img" + Quib[0].id + "' src='" + Quib[0].body + "' />";
    if (false) {
        Time = 'QUIB ZERO';

        if (Quib.IsScreenshot == false) {
            $('#quibContainer').append("<div class='quib-item'>" +
                "<div class='panel panel-default quib-item-inner inner1'>" +
                "<div class='panel-body' style='padding: 0'>" +
                "<div class='quib-compose-wrapper'>" +
                "<div class='quib-compose-header'>" +
                "<img src='" + avatar + "' class='avatar-quibcomposer' />" +
                "<span class='composer-name " + SeedquibClass + " ' style='font-weight: bold'> " + Quib.DisplayName + "</span>" +
                "<span id='QuibId' class='hide'>" + Quib.Id + "</span>" +
                "<div class='quib-compose-timer-wrapper'>" +
                "<input type='text' class='form-control quib-compose-timer' value='" + Time + "' readonly='true' />" +
                "</div>" +
                "<div class='compose-side-header' style='float: right'>" +
                //"<a class='img-tag'>" +
                //    "<img src='/Images/tag.png' />" +
                //"</a>" +
                "<a class='img-bump'>" +
                "<img src='" + localStorage.getItem('environment') + "Images/bump-red.png' />" +
                "</a>" +
                "</div>" +
                "</div>" +
                "<div class='quib-composer " + SeedquibClass + "'>" +
                body +
                "</div>" +
                "</div>" +
                "</div>" +
                "</div>");
        }
        else {
            $('#quibContainer').append("<div class='quib-item'>" +
                "<div class='panel panel-default quib-item-inner inner1'>" +
                "<div class='panel-body' style='padding: 0'>" +
                "<div class='quib-compose-wrapper'>" +
                "<div class='quib-compose-header'>" +
                "<span id='QuibId' class='hide'>" + Quib.Id + "</span>" +
                "<div class='quib-compose-timer-wrapper' style='top: 0;'>" +
                "<input type='text' class='form-control quib-compose-timer' value='" + Time + "' readonly='true' />" +
                "</div>" +
                "<div class='compose-side-header' style='float: right'>" +
                "<a class='img-bump'>" +
                "<img src='" + localStorage.getItem('environment') + "Images/bump-red.png' />" +
                "</a>" +
                "</div>" +
                "</div>" +
                "<div class='quib-composer " + SeedquibClass + "' style='margin-top: -20px;'>" +
                body +
                "</div>" +
                "</div>" +
                "</div>" +
                "</div>");
        }
    }
    else {

        var isSmallerQuibPresent = false;
        for (i = Quib[0].time; i > 0; i--) {

            objList = $(".quib-item .quib-compose-timer[value='" + i + "']").last();

            if (objList.length > 0) {
                isSmallerQuibPresent = true;

                if (Quib[0].isScreenshot == false) {

                    objList.parents('.quib-item').after("<div class='quib-item'>" +
                        "<div class='panel panel-default quib-item-inner inner1'>" +
                        "<div class='panel-body' style='padding: 0'>" +
                        "<div class='quib-compose-wrapper'>" +
                        "<div class='quib-compose-header'>" +
                        "<img src='" + avatar + "' class='avatar-quibcomposer' />" +
                        "<span class='composer-name " + SeedquibClass + "' style='font-weight: bold'> " + Quib[0].displayName + "</span>" +
                        "<span id='QuibId' class='hide'>" + Quib[0].id + "</span>" +
                        "<div class='quib-compose-timer-wrapper'>" +
                        "<input type='text' class='form-control quib-compose-timer' value='" + Quib[0].time + "' readonly='true' />" +
                        "</div>" +
                        "<div class='compose-side-header' style='float: right'>" +
                        //"<a class='img-tag'>" +
                        //    "<img src='/Images/tag.png' />" +
                        //"</a>" +
                        "<a class='img-bump'>" +
                        "<img src='" + localStorage.getItem('environment') + "Images/bump-red.png' />" +
                        "</a>" +
                        "</div>" +
                        "</div>" +
                        "<div class='quib-composer  " + SeedquibClass + "'>" +
                        Quib[0].body +
                        "</div>" +
                        "</div>" +
                        "</div>" +
                        "</div>");
                }
                else {
                    objList.parents('.quib-item').after("<div class='quib-item'>" +
                        "<div class='panel panel-default quib-item-inner inner1'>" +
                        "<div class='panel-body' style='padding: 0'>" +
                        "<div class='quib-compose-wrapper'>" +
                        "<div class='quib-compose-header'>" +
                        "<span id='QuibId' class='hide'>" + Quib[0].id + "</span>" +
                        "<div class='quib-compose-timer-wrapper' style='top: 0;'>" +
                        "<input type='text' class='form-control quib-compose-timer' value='" + Quib[0].time + "' readonly='true' />" +
                        "</div>" +
                        "<div class='compose-side-header' style='float: right'>" +
                        //"<a class='img-tag'>" +
                        //    "<img src='/Images/tag.png' />" +
                        //"</a>" +
                        "<a class='img-bump'>" +
                        "<img src='" + localStorage.getItem('environment') + "Images/bump-red.png' />" +
                        "</a>" +
                        "</div>" +
                        "</div>" +
                        "<div class='quib-composer  " + SeedquibClass + "' style='margin-top: -20px;'>" +
                        body +
                        "</div>" +
                        "</div>" +
                        "</div>" +
                        "</div>");
                }
                $("span:contains('" + Quib[0].id + "')").parent().find('.quib-compose-timer').formatTime();
                break;
            }
        }

        if (!isSmallerQuibPresent) {

            if (Quib.IsScreenshot == false) {
                $('#quibContainer .movie-poster-wrapper').after("<div class='quib-item'>" +
                    "<div class='panel panel-default quib-item-inner inner1'>" +
                    "<div class='panel-body' style='padding: 0'>" +
                    "<div class='quib-compose-wrapper'>" +
                    "<div class='quib-compose-header'>" +
                    "<img src='" + avatar + "' class='avatar-quibcomposer' />" +
                    "<span class='composer-name " + SeedquibClass + "' style='font-weight: bold'> " + Quib[0].displayName + "</span>" +
                    "<span id='QuibId' class='hide'>" + Quib[0].id + "</span>" +
                    "<div class='quib-compose-timer-wrapper'>" +
                    "<input type='text' class='form-control quib-compose-timer' value='" + Quib[0].time + "' readonly='true' />" +
                    "</div>" +
                    "<div class='compose-side-header' style='float: right'>" +
                    //"<a class='img-tag'>" +
                    //    "<img src='/Images/tag.png' />" +
                    //"</a>" +
                    "<a class='img-bump'>" +
                    "<img src='/Images/bump-red.png' />" +
                    "</a>" +
                    "</div>" +
                    "</div>" +
                    "<div class='quib-composer'>" +
                    Quib[0].body +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "</div>");
            }
            else {
                $('#quibContainer .movie-poster-wrapper').after("<div class='quib-item'>" +
                    "<div class='panel panel-default quib-item-inner inner1'>" +
                    "<div class='panel-body' style='padding: 0'>" +
                    "<div class='quib-compose-wrapper'>" +
                    "<div class='quib-compose-header'>" +
                    "<span id='QuibId' class='hide'>" + Quib[0].id + "</span>" +
                    "<div class='quib-compose-timer-wrapper' style='top: 0;'>" +
                    "<input type='text' class='form-control quib-compose-timer' value='" + Quib[0].time + "' readonly='true' />" +
                    "</div>" +
                    "<div class='compose-side-header' style='float: right'>" +
                    "<a class='img-bump'>" +
                    "<img src='/Images/bump-red.png' />" +
                    "</a>" +
                    "</div>" +
                    "</div>" +
                    "<div class='quib-composer' style='margin-top: -20px;'>" +
                    Quib[0].body +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "</div>");
            }
            $("span:contains('" + Quib[0].id + "')").parent().find('.quib-compose-timer').formatTime();
        }
    }

    ApplyStyleToQuibStream();

    BindBumpClick();
    BindQuibTimeStampClick();
    BindTagClick();
}

function AddQuib() {
    var deferred = $.Deferred();
    var seconds;
    var quibId;
    var hms = ComposeQuibTime;
    var SeedQuibType = null;
    var IsSeedQuib = false;
    var IsScreenshot = false;
    var SeedSymbol;

    var body = $('#txtComposeQuib').val().trim();
   
    // Checking if quib is seed quib or not
    body.split('\n')[0]

    if (body.split('\n')[0] == '!') {
        IsSeedQuib = true;
        SeedQuibType = 'exc';
        body = body.replace('!\n', '');
    }
    else if (body.split('\n')[0] == '?') {
        IsSeedQuib = true;
        SeedQuibType = 'que';
        body = body.replace('?\n', '');
    }
    else if (body.split('\n')[0] == '"') {
        IsSeedQuib = true;
        SeedQuibType = 'quo';
        body = body.replace('"\n', '');
    }
    else if (body.split('\n')[0] == ':') {
        IsSeedQuib = true;
        SeedQuibType = 'col';
        body = body.replace(':\n', '');
    }
    else if (body.split('\n')[0] == '=') {
        IsSeedQuib = true;
        SeedQuibType = 'equ';
        body = body.replace('=\n', '');
    }
    if (body.length == 0 && imageString != undefined && imageString != null && imageString.length > 0) {
        body = imageString;
        IsScreenshot = true;
    }
    if (hms == "QUIB ZERO")
        seconds = 0;
    else
        seconds = ConvertTimeToSeconds(hms);
    var movieId = localStorage.getItem("MovieId");
    var UserId = localStorage.getItem("UserId");
    $.ajax({
        async: false,
        url: localStorage.getItem('environment') + '/api/QuibStream/AddQuib?body=' + body + '&UserId=' + UserId + '&ParentId=' + 3 + '&Time=' + seconds + '&isSeedQuib=' + IsSeedQuib + '&isSeedQuibType=' + SeedQuibType + '&MovieId=' + movieId + '&isScreenShot=' + IsScreenshot,
        type: 'POST',
        dataType: 'text',
      
        success: function (response) {
            if (response != undefined && response != null && response.length > 0) {
                var SeedquibClass = "";

                quibContent = JSON.parse(response);
                //quibContent = {
                //    Body: response.split("~")[1].toString().replace('""', ''),
                //    Id: parseInt(response.split("~")[0].toString().replace('"','')),
                //    IsSeedQuib: IsSeedQuib,
                //    SeedQuibType: SeedQuibType,
                //    IsQuibZero: IsQuibZeroOpen,
                //    Time: seconds,
                //    IsScreenshot: IsScreenshot
                //}

                var IsSmallerQuibPresent = false;
                var objList = "";
                SeedSymbol = "";
                if (quibContent[0].isSeedQuib) {
                    SeedquibClass = "quib-Seed";
                }
                else {
                    SeedquibClass = "";
                }


                if (!quibContent[0].isScreenshot)
                    contentTexarea = "<textarea class='unposted-quibs Unposted-quibs2 " + SeedquibClass + " '>" + quibContent[0].body + "</textarea>";
                else
                    contentTexarea = "<div class='unposted-quibs'><img style='height:auto; width:100%;' id='img" + quibContent[0].id + "' src='" + quibContent[0].body + "' /></div>";

                contentPostDelete = "<span class='btn btn-default btn-stream' style='float: left' onclick='DeleteQuibById(" + quibContent[0].id + ")'>Delete</span>";
                contentPostDelete += "<span id=" + quibContent.id + " class='btn btn-default btn-stream' style='float: right' data-toggle='modal' data-target='#post-quib-modal' onClick='PostQuib(" + quibContent[0].id + ")'>Post</span>";

                if (quibContent[0].isSeedQuib) {
                    switch (quibContent[0].seedQuibType) {
                        case "exc":
                            SeedSymbol = "<input type='text' readOnly='true' value='!' style='text-align:center;width:30px;margin-right:5px;' />";
                            break;
                        case "que":
                            SeedSymbol = "<input type='text' readOnly='true' value='?' style='text-align:center;width:30px;margin-right:5px;' />";
                            break;
                        case "equ":
                            SeedSymbol = "<input type='text' readOnly='true' value='=' style='text-align:center;width:30px;margin-right:5px;' />";
                            break;
                        case "quo":
                            SeedSymbol = "<input type='text' readOnly='true' value='\"' style='text-align:center;width:30px;margin-right:5px;' />";
                            break;
                        case "col":
                            SeedSymbol = "<input type='text' readOnly='true' value=':' style='text-align:center;width:30px;margin-right:5px;' />";
                            break;
                        default:
                            SeedSymbol = "<input type='text' readOnly='true' value='X' style='text-align:center;width:30px;margin-right:5px;' />";
                    }
                }

                if (!quibContent[0].isQuibZero) {
                    var quibTime = "";
                    for (i = quibContent[0].time; i >= 0; i--) {
                        if (i == 0) {
                            quibTime = "QUIB ZERO";
                        }
                        else {
                            quibTime = i.toString().toHHMMSS();
                        }

                        objList = $(".mystream-time[value='" + quibTime + "']").last();

                        if (objList.length > 0) {

                            IsSmallerQuibPresent = true;

                            objList.parents('.mystream-wrapper').after("<div class='mystream-wrapper'>" +
                                "<input type='hidden' class='quibId' value='" + quibContent[0].id + "'>" +
                                SeedSymbol +
                                "<a class='btnMinus'>" +
                                " <img src='/Images/minus.png'/>" +
                                "</a>" +
                                "<input class='myStreamQuibTime mystream-time movie-timer' readonly='true' value='" + quibContent[0].time.toString().toHHMMSS() + "'/>" +
                                "<a class='btnPlus'>" +
                                " <img src='/Images/plus.png'/>" +
                                "</a>" +
                              
                                contentTexarea +
                                "<div style='clear: both; margin: 4px 0; height: 16px'>" +
                                contentPostDelete +
                                "</div>" +
                                "</div>");
                            //var that = $(".mystream-time[value='" + quibTime + "']").last().parent().find('textarea');
                            //that.height( that.height() + 100);
                            break;
                        }

                    }

                }
                else {
                   
                    // Check if quib zero are present in my stream
                    objList = $(".mystream-time[value='QUIB ZERO']").last();

                    if (objList.length > 0) {
                        IsSmallerQuibPresent = true;
                        objList.parents('.mystream-wrapper').after("<div class='mystream-wrapper'>" +
                            "<input type='hidden' class='quibId' value='" + quibContent[0].id + "'>" +
                            SeedSymbol +
                            "<a class='btnMinus'>" +
                            " <img src='/Images/minus.png'/>" +
                            "</a>" +
                            "<input class='myStreamQuibTime mystream-time movie-timer' readonly='true' value='QUIB ZERO'/>" +
                            "<a class='btnPlus'>" +
                            " <img src='/Images/plus.png'/>" +
                            "</a>" +
                            contentTexarea +
                            "<div style='clear: both; margin: 4px 0; height: 16px'>" +
                            contentPostDelete +
                            "</div>" +
                            "</div>");
                    }
                    //$(".mystream-time[value='QUIB ZERO']").last().parent().height(this.scrollHeight + $(this).height() + 6);
                }

                if (!IsSmallerQuibPresent) {
                    // Pre-pend quib
                    var quibTimePrepend = "";
                    if (quibContent[0].time == 0) {
                        quibTimePrepend = "QUIB ZERO";
                    }
                    else {
                        quibTimePrepend = quibContent[0].time.toString().toHHMMSS();
                    }
                    $('#myStreamPanel').prepend("<div class='mystream-wrapper'>" +
                        "<input type='hidden' class='quibId' value='" + quibContent[0].id + "'>" +
                        SeedSymbol +
                        "<a class='btnMinus'style='margin-left: 100px;'>"+
                        "<img src='/Images/minus.png' onclick='increment();'/>" +
                         "</a>"+
                        "<input id='mystreamtimer'style='width: 64px; height: 20px; top: 36 %;' class='myStreamQuibTime mystream-time movie-timer' value='" + quibTimePrepend + "'/>" +
                        "<a class='btnPlus'>" +
                        " <img src='/Images/plus.png'onclick='decrement();'/>" +
                        "</a>" +
                        contentTexarea +
                        "<div style='clear: both; margin: 4px 0; height: 16px'>" +
                        contentPostDelete +
                        "</div>" +
                        "</div>"
                    )

                }

                // My stream tally
                $('#MyStreamCount').text(parseInt($('#MyStreamCount').text()) + 1);
                ResizeMyStreamTextArea();
                // Clear text of compose box and reduce height to default
                $('#txtComposeQuib').val("");

                quibId = quibContent[0].id;
                deferred.resolve(quibId);

            }
        }
    });

    return deferred.promise();
}


// MY STREAM - Get all quibs from database for a user
function GetQuibByUserIdAndMovieId() {
    var content;
    var deferred = $.Deferred();
    var MovieId = localStorage.getItem('MovieId');
    var UserId = localStorage.getItem('UserId');
    $.ajax({
        async: false,
        url: localStorage.getItem('environment') + '/GetQuibByUserIdAndMovieId?MovieId=' + MovieId + '&UserId=' + UserId ,
        type: 'get',
        dataType: 'text',
        data: { movieId: queryStringValuefromKey("movieId") },
        success: function (response) {
            if (response != undefined && response != null) {
                content = response;
                LoadAllQuibsMyStream(response);
                deferred.resolve(JSON.parse(response));
            }
            else {
                alert("Can't complete action at this time. Please try again later.");
                deferred.resolve(response);
            }

        },
        complete: function (jqXHR, status) {
            $('.popup_load').css('display', 'none');
        }
    });
    return deferred.promise();
}

// MY STREAM - Loading all quibs we got from database for a user
function LoadAllQuibsMyStream(quibs) {
    $('#myStreamPanel').empty();
    var object = JSON.parse(quibs);
    var time = 0;
    var content = '';
    var contentTexarea = '';
    var contentPostDelete = '';
    var avatar = null;
    var SeedSymbol;

    for (var obj in object) {
        if (quibs.hasOwnProperty(obj)) {
            if (!(object[obj].isSeedQuib)) {
                SeedSymbol = '';
                contentPostDelete = '';
                contentTexarea = '';

                if (object[obj].isQuibZero == true)
                    time = 'QUIB ZERO';
                else
                    time = object[obj].time;

                if (object[obj].userId == localStorage.getItem("UserId")) {

                    contentTexarea = "<textarea readonly='true'>" + object[obj].body + "</textarea>";

                    // DELETE button not required for posted quibs
                    //contentPostDelete = "<span class='btn btn-default btn-stream' style='float: left' onclick='DeleteQuibById(" + object[obj].Id + ")'>Delete</span>";
                    if (object[obj].isPosted == false) {
                        contentTexarea = "<textarea class='unposted-quibs'>" + object[obj].body + "</textarea>";
                        contentPostDelete = "<span class='btn btn-default btn-stream' style='float: left' onclick='DeleteQuibById(" + object[obj].id + ")'>Delete</span>";
                       // contentPostDelete += "<span id=" + object[obj].id + " class='btn btn-default btn-stream' style='float: right' data-toggle='modal' data-target='#post-quib-modal' onClick='PostQuib(" + object[obj].id + ")'>Post</span>";
                    }
                   if (object[obj].isBumped == true) {
                        contentTexarea = "<textarea class='unposted-quibs'>" + object[obj].body + "</textarea>";
                        contentPostDelete = "<span class='btn btn-default btn-stream' style='float: left' onclick='DeleteQuibById(" + object[obj].id + ")'>Remove</span>";
                      //  contentPostDelete += "<span id=" + object[obj].id + " class='btn btn-default btn-stream' style='float: right' data-toggle='modal' data-target='#post-quib-modal' onClick='PostQuib(" + object[obj].id + ")'>Post</span>";
                    }
                }
               
                else {

                    if (object[obj].isBumped == true) {
                        contentTexarea = "<textarea class='unposted-quibs'>" + object[obj].body + "</textarea>";
                        contentPostDelete = "<span class='btn btn-default btn-stream' style='float: left' onclick='DeleteQuibById(" + object[obj].id + ")'>Remove</span>";
                       
                    }
                    else {
                        contentTexarea = "<textarea readonly='true'>" + object[obj].body + "</textarea>";
                        contentPostDelete = "<span class='btn btn-default btn-stream' style='float: left' onclick='DeleteBumpQuibById(" + object[obj].id + ")'>Delete</span>";
                       // contentPostDelete += "<span id=" + object[obj].id + " class='btn btn-default btn-stream' style='float: right' data-toggle='modal'>Post</span>";
                    }
                }

                if (object[obj].isSeedQuib) {
                    switch (object[obj].seedQuibType) {
                        case "exc":
                            //avatar = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsSAAALEgHS3X78AAABOklEQVRYw+2XsWrCQBzGP6uDSyct0kk6RGhAuFLB1VnoQ+QdfIBODu4ieYJAwHcQnDM5CKEkiFOF65GkDglInQ56Gf+ROwLe9g33v9/33d2fu4YL/MHgeDC5eL0B2paFaRDAKQqMPY8M0PwAPikT35dLvEwmAIAn28bv5YKf7VZfAp3BQNGP/T6pTn3PAA9DRedJohegSFNFZ3GsF6DsOOdcL0DZ8cn3NSdAdHwzgP+Ov3c7/QC3GpUApPPyldSeQPlKagOQzrPDwQyAdJ4LYQZANqN0vzcDIJtRstkYSoBzFOdzlRLVAE6+DxFFlQAa91dxbQHaloU318U0CGAvFmSAFnXi62wG5jgAgN5wiCyOcVyt9CXwPBopussYqQ4ZIFyvFR0RPyfkLfiaz5ELgS5jiDyP3A3vfeAKd5h1K4V+TpsAAAAASUVORK5CYII=';
                            avatar = "/Images/user32/seedExclaimation.png";
                            SeedSymbol = "<input type='text' readOnly='true' value='!' style='text-align:center;width:30px;margin-right:5px;' />";
                            break;
                        case "que":
                            //avatar = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsSAAALEgHS3X78AAACRUlEQVRYw+2XP0gbYRTAf7YlBFLNIgkBRUWvcEpoCgfV7cASodglweDqFJw9FQJCJwen4CKZMkkgIC5OAUtQWqgQDQRiwMaLdGgNNmJtoEqlHYIHsWpyfyQd+qb37t73vt+9797jfW0x+E0L5VErN/8nAJ7ocbYLAqKi4JEk3F6v9vxUVfmyu0shFuMsnX6YDAxEIgR3dgB4PzND3GYjMTRENh7H4XIxGAwSSKUYXFrSBfD4Dbxt5OQKhXi1vExudZW9cJiLUgmAX5UKXzc2OFZVngUCAHQND/Pj6orK9rZ1GZDm5wE4yWZvfV9OJsmvrWn2y9nZpjPQEMApy9p5t/f13emnrq9rus3hYCASsQagQxQ1vXd09E6/cjJZZ7f39FgD8H1/X9PdXi+uUKipwM1KQ4CzdJrjXE6zL8rlW/3sglBnnx8dNQXQVB94NzmJqCicZLN31nnXxISmX1arfFpctA7g58EBe+HwvT69Y2Oanr/xP9wnlrRipyzTPTIC1LpiI1jLAZ4rClBL/YeFBV1rTQM4ZZl+vx+ArUjkr3J8cIDrr/8YjfJ5ZUX3elMAdkGg3++nmEqRn5szFMMUgKgonKoqW+PjhmOYAvBIEplo1EwIcwBP3W5D524JgFOWqRSLpjY3BdAhinwrFEwDtP0fy40ssgsCL2IxXmcyuofQm6JrLL8WUVHwTU0BtSHlXFUNV4OhDHgkqc7u9PkMZ8AQQGlzU9Mvq1UOEwnDAIaroHt6mk6fj8NEQvdtyBIAq6TlZfgHzdKwUcrZKTQAAAAASUVORK5CYII=';
                            avatar = "/Images/user32/seedQuestion.png";
                            SeedSymbol = "<input type='text' readOnly='true' value='?' style='text-align:center;width:30px;margin-right:5px;' />";
                            break;
                        case "equ":
                            //avatar = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsSAAALEgHS3X78AAAAaElEQVRYw2OcycDwn2EAAdNAWj7qgFEHjDpg1AGjDmBgYGBgwSYoFhbGYFJeTlWLthkbD84QYBytDUe8A7DmAn4HBwalyEiqWnQ+PZ14B/BpajIYJCbSxQGjuWDUAaMOGHXAqANGHQAAWdYN+0tRu40AAAAASUVORK5CYII=';
                            avatar = "/Images/user32/seedEquals.png";
                            SeedSymbol = "<input type='text' readOnly='true' value='=' style='text-align:center;width:30px;margin-right:5px;' />";
                            break;
                        case "quo":
                            //avatar = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsSAAALEgHS3X78AAAB10lEQVRYw+2WTUsbURSGH6WoMJZBhIQQskkxhcD4gaCESpiFSBFB3IS4dCGSnQHxJ2QxILhSAu4dAtmFLgQlulAqUgRBaW2TRQ3SVAijBowb3Ygakpm58QMR5izPvPe8zzn3zsxtSsINbxjNb2nuADgADkDDAEFNI6hpQlpfLEY4k3kZAFckQuTkhMD4OGd7e5batq4uhjc3CScSXBQKtrU/iHQ9ODvLn7U1tsbGbM2/3nWdmZjAyGafByCrKn3T00LmAEMrK0guF+mBAa6Oj0WGa70FXxYWANiNx20L+WIxfKEQh6mUsLklgKyquBWFUi4nVPBzNArA2f6+sLklgHd0tKFC7u5uAM6PjhpaZ3oGWmUZgA6/n75kko9eL+0eD7/SaX4nEjX6FkkCoGdujsrMDJ2BAJenp+zG45YTtH0LWiSJ3qmph04Vhf/b26Yn/NPISJW2Xdf51t9vWt90Cwrr66aL/JOTNbm/Ozt1tW5FsWzQFKCYSvHv4KDus4ph1OR+6npdbblYfBoAwEY0Simfr8qV8nkO5+drJ7C8zPfFxarcdbnMj6UlS4AmkTthUNNolWUqhlHX/HHIqnq/RbnVVduvoRDAa8b7+h07AA6AA+AAvEbcAgITjqrNm3S6AAAAAElFTkSuQmCC';
                            avatar = "/Images/user32/seedQuote.png";
                            SeedSymbol = "<input type='text' readOnly='true' value='\"' style='text-align:center;width:30px;margin-right:5px;' />";
                            break;
                        case "col":
                            //avatar = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsSAAALEgHS3X78AAAArElEQVRYw2OcycDwn2EAAdNAWj7qgFEHDG0HcKiqMhjOnMngdfYsg1ZXF9kOYCFXo2ZJCYNBYiIDAwMDg7iuLsPn+/cZHk+fTr8QkDQxQeGLGBiQZQ7ZDri1di0K/97y5WSZQ3YU3GlrY/j5/j2DiIEBw73lyxk+HjhAljmMo3XBqANGHTDqgCHrgNHacMBrwwd798LZv75+Jbs2pKgyks3MHK0NRx0w6gCKAQBoBDxBbN3dTQAAAABJRU5ErkJggg==';
                            avatar = "/Images/user32/seedColon.png";
                            SeedSymbol = "<input type='text' readOnly='true' value=':' style='text-align:center;width:30px;margin-right:5px;' />";
                            break;
                        default:
                            //avatar = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsSAAALEgHS3X78AAABOklEQVRYw+2XsWrCQBzGP6uDSyct0kk6RGhAuFLB1VnoQ+QdfIBODu4ieYJAwHcQnDM5CKEkiFOF65GkDglInQ56Gf+ROwLe9g33v9/33d2fu4YL/MHgeDC5eL0B2paFaRDAKQqMPY8M0PwAPikT35dLvEwmAIAn28bv5YKf7VZfAp3BQNGP/T6pTn3PAA9DRedJohegSFNFZ3GsF6DsOOdcL0DZ8cn3NSdAdHwzgP+Ov3c7/QC3GpUApPPyldSeQPlKagOQzrPDwQyAdJ4LYQZANqN0vzcDIJtRstkYSoBzFOdzlRLVAE6+DxFFlQAa91dxbQHaloU318U0CGAvFmSAFnXi62wG5jgAgN5wiCyOcVyt9CXwPBopussYqQ4ZIFyvFR0RPyfkLfiaz5ELgS5jiDyP3A3vfeAKd5h1K4V+TpsAAAAASUVORK5CYII=';
                            avatar = "/Images/user32/seedExclaimation.png";
                            SeedSymbol = "<input type='text' readOnly='true' value='X' style='text-align:center;width:30px;margin-right:5px;' />";
                    }
                }
                else {
                    //avatar = object[obj].AvatarBase64Thumb;
                    avatar = object[obj].avatarBase32ImagePath;//Anish modified
                    if (!avatar) {
                        //avatar = "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";
                        avatar = "/Images/user32/AvatarBase32.png";
                    }
                }


                if (object[obj].userId != localStorage.getItem("UserId")) {

                    if (!object[obj].isQuibZero) {
                        time = time.toString().toHHMMSS();
                    }

                    content += "<div class='mystream-wrapper'>" +
                        "<div class='mystream-item' " +
                        "<div class='panel panel-default quib-item-inner'>" +
                        "<div class='panel-body' style='padding: 0; border:none'>" +
                        "<div class=''>" +
                        "<div class='quib-compose-header'>" +
                        "<img src='" + avatar + "' class='avatar-quibcomposer' />" +/*Anish Modified*/
                        "<span class='composer-name' style='font-weight: bold'> " + object[obj].displayName + "</span>" +
                        "<input type='hidden' class='quibId' value='" + object[obj].id + "'>" +
                        "<div class='quib-compose-timer-wrapper'>" +
                        "<input type='text' class='form-control quib-compose-timer mystream-time' value='" + time + "' readonly='true' />" +
                        "</div>" +
                        "<div class='compose-side-header' style='float: right'>" +
                        //"<a class='img-tag'>" +
                        //    "<img src='/Images/tag.png' />" +
                        //"</a>" +
                        //"<a class='img-bump'>" +
                        //    "<img src='/Images/bump-red.png' />" +
                        //"</a>" +
                        "</div>" +
                        "</div>" +
                        "<div class='quib-composer'>" +
                        object[obj].body +
                        "</div>" +
                        contentPostDelete +
                        "" +
                        "</div>" +
                        "</div>" +
                      
                        "</div>" +
                       
                        //"<div style='clear: both; margin: 4px 0; height: 16px'><span class='btn btn-default btn-stream' style='float: left' onclick='DeleteBumpQuibById(" + object[obj].id + ")'>Delete</span>" +
                        //"<span id='480' class='btn btn-default btn-stream' style='float: right'>Post</span></div>" +
                        "</div>" +
                        "</div>";
                }
                else if (object[obj].isPosted) {

                    if (!object[obj].isQuibZero) {
                        time = time.toString().toHHMMSS();
                    }

                    content += "<div class='mystream-wrapper'>" +
                        "<div class='mystream-item' " +
                        "<div class='panel panel-default quib-item-inner'>" +
                        "<div class='panel-body' style='padding: 0; border:none'>" +
                        "<div class=''>" +
                        "<div class='quib-compose-header'>" +
                        "<img src='" + avatar + "' class='avatar-quibcomposer' />" +
                        "<span class='composer-name' style='font-weight: bold'> " + object[obj].displayName + "</span>" +
                        "<input type='hidden' class='quibId' value='" + object[obj].id + "'>" +
                        "<div class='quib-compose-timer-wrapper'>" +
                        "<input type='text' class='form-control quib-compose-timer mystream-time' value='" + time + "' readonly='true' />" +
                        "</div>" +
                        "<div class='compose-side-header' style='float: right'>" +
                        //"<a class='img-tag'>" +
                        //    "<img src='/Images/tag.png' />" +
                        //"</a>" +
                        //"<a class='img-bump'>" +
                        //    "<img src='/Images/bump-red.png' />" +
                        //"</a>" +
                        "</div>" +
                        "</div>" +
                        "<div class='quib-composer'>" +
                        object[obj].body +
                        "</div>" +
                        "" +
                        "</div>" +
                        "</div>" +
                        "</div>" +

                        //"<div style='clear: both; margin: 4px 0; height: 16px'><span class='btn btn-default btn-stream' style='float: left' onclick='DeleteQuibById(480)'>Delete</span>" +
                        //"<span id='480' class='btn btn-default btn-stream' style='float: right' data-toggle='modal' data-target='#post-quib-modal' onclick='PostQuib(480)'>Post</span></div>" +
                        "</div>" +
                        "</div>";
                }
                else {
                    if (!object[obj].isQuibZero) {
                        time = time.toString().toHHMMSS();
                    }

                    content += "<div class='mystream-wrapper'>" +
                        "<input type='hidden' class='quibId' value='" + object[obj].id + "'>" +
                        SeedSymbol +
                        "<input class='myStreamQuibTime mystream-time' readonly='true' value='" + time + "'/>" +
                        contentTexarea +
                        "<div style='clear: both; margin: 4px 0; height: 16px'>" +
                        contentPostDelete +
                        "</div>" +
                        "</div>";
                }
            }
        }
    }
    $('#myStreamPanel').append(content);
    $('#MyStreamCount').text(object.length);
    //$(".new-quibs").animate({ scrollTop: $(this).height() }, "slow");

    BindMyStreamTimeStampClick();
    BindQuibTimeStampClick();

    ResizeMyStreamTextArea();
}

// setting value of id and body of post quib popup
function PostQuib(QuibId) {
    $('#PostQuibId').val(QuibId);
    /*var QuibBody = $('#' + QuibId).parent().parent().find('.unposted-quibs').val();*/
    var QuibBody = $('.unposted-quibs').val().trim() ;
    if (QuibBody == undefined || QuibBody == null || QuibBody.length == 0)
        QuibBody = $('#img' + QuibId).attr('src');
    $('#PostQuibBody').val(QuibBody);
    cancelUploadImage();
}


// Rezise text box bigger for unposted quibs
function ResizeMyStreamTextArea() {
    $('.unposted-quibs').each(function () {
        $(this).height(this.scrollHeight + $(this).height() + 6);
    });
}

function ResizeMyStreamTextArea2() {
    $('.Unposted-quibs2').each(function () {
        $(this).height(this.scrollHeight + $(this).height() + 6);
        $(this).removeClass('Unposted-quibs2');
    });
}

