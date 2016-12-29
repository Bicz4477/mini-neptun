$(document).on('click', '.signup', function (e) {
    e.preventDefault();
    const data = { "cid": $(this).attr("href").split("/")[2] };
    Promise.resolve(
        $.ajax({
            url: '/ajax/signup',
            method: 'POST',
            data,
            dataType: 'json',
            headers: { 'csrf-token': $('[name="_csrf"]').val() }
        })
    ).then(json => {
        if (json.success) {
            $('#data').load(window.location.href + ' #data', function () {

            })
        }
    }
        )
})
$(document).on('click', '#down', function (e) {
    const data = { "cid": $("#button").attr("href").split("/")[2] };
    Promise.resolve(
        $.ajax({
            url: '/ajax/signdown',
            method: 'POST',
            data,
            dataType: 'json',
            headers: { 'csrf-token': $('[name="_csrf"]').val() }
        })
    ).then(json => {
        if (json.success) {
            $('#data').load(window.location.href + ' #data', function () {

            })
        }
    }
        )
})