function submitMovie() {
    var data = $("form").serialize();
    alert(data);
    $.ajax({
        type: 'POST',
        url: '/api/ChooseMovies',
        contentType: 'application/json', 
        data: data,
        success: function (result) {
            alert('Successfully received Data ');
            console.log(result);
        },
        error: function () {
            alert('Failed to receive the Data');
            console.log('Failed ');
        }
    })
}