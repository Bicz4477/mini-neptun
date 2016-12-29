$(document).on('click', '#button', function (event) {
    event.preventDefault();
    $('#confirmDialog').modal('show');
});
$(document).on('click', '#confirm', function (event) {
    window.location.href = $('#button').attr('href');
});
