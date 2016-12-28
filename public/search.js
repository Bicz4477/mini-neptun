$(function () {
    $('#search [name=name]').on('input', function () {
        $.get('/ajax/search', {
            q: $(this).val()
        }).done(function (result) {
            console.log(result)
            let html = '';
            for (let i = 0; i < result.length; i++) {
                const subject = result[i];
                html += '<a class="list-group-item" href="/subject/' + subject.id + '">' + subject.name + '</a>';
            }
            
            $('.suggestions').html(html);

        });
    });
}) 