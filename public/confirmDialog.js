$(document).ready(function() {
    $('#button').click(function(event){
        event.preventDefault();
        $('#confirmDialog').modal('show');
    });
    $('#confirm').click(function(event){
        window.location.href = $('#button').attr('href');
    });
});