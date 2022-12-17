// Store tags in database
function AddUpdateTagMap(SelectedQuibId, tagIds) {
    $.ajax({
        //async: false,
        url: localStorage.getItem('environment') + '/QuibStream/AddUpdateTagMap',
        type: 'POST',
        dataType: 'text',
        data: { quibId: SelectedQuibId, tagIds: tagIds.join() },
        success: function (response) {
            if (response != undefined && response != null) {
                // Successfully updated tags
            }
            else {
                alert("Can't complete action at this time. Please try again later.");
            }
        }
    });
}

// Get tag details for a quib from database
function GetTagMapByUserIdAndQuibId(SelectedQuibId) {
    var TagIds;
    $.ajax({
        async: false,
        url: localStorage.getItem('environment') + '/QuibStream/GetTagMapByUserIdAndQuibId',
        type: 'POST',
        dataType: 'text',
        data: { quibId: SelectedQuibId },
        success: function (response) {
            if (response != undefined && response != null) {
                TagIds = JSON.parse(response);
            }
            else {
                alert("Can't complete action at this time. Please try again later.");
            }
        }
    });

    return TagIds;
}

// Update tag checkboxes
function UpdateTagCheckbox(TagIds) {
    var chkBox;

    // uncheck all checkboxes
    $('#divTags').find('input[type=checkbox]:checked').removeAttr('checked');

    for (i = 0; i < TagIds.length; i++) {
        chkBox = "#" + TagIds[i];
        $(chkBox).prop('checked', true);
    }
}