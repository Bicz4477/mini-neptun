var id = -1;

$(document).on('click', '#confirm', function (e) {
    e.preventDefault();
    const data = { "id" : id};
    Promise.resolve(
        $.ajax({
            url: '/ajax/deal',
            method: 'POST',
            data,
            dataType: 'json',
            headers: { 'csrf-token': $('[name="_csrf"]').val() }
        })
    ).then(json => {
        if (json.success) {
            $('#data').load(window.location.href + ' #data', function () {

            });
        } else {
            $('#hiba').modal('show');
            $('#data').load(window.location.href + ' #data', function () {

            });
        }
    })
})

$(document).on('click', '#button', function (event) {
    event.preventDefault();
    id = $(this).attr("href").split("=")[1];
});
