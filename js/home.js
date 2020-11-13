$(document).ready(function () {
    loadFilms();
    loadSliders();
});

function loadFilms() {
    $.ajax({
        dataType: "json",
        url: 'https://sky-frontend.herokuapp.com/movies',
        success: function (data) {
            for (let index = 0; index < data[0].items.length; index++) {
                var divDestaque = $('<div>').addClass('div-destaque');
                var imgDestaque = $('<img>').addClass('img-destaque img img-responsive').attr('src', data[0].items[index].images[0].url);
                $(divDestaque).append($(imgDestaque));
                $('.line-destaque').append($(divDestaque));
            }


            setTimeout(function () {
                $('.line-destaque').slick({
                    dots: true,
                    infinite: true,
                    speed: 2000,
                    slidesToShow: 3,
                    initialSlide: 1,
                    centerMode: true,
                    variableWidth: true,
                    centerPadding: '60px',
                    customPaging: function (slider, i) {
                        return '<a class="my-slider" href="#"> &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp;</a>';
                    },
                    responsive: [{
                        breakpoint: 640,
                        settings: {
                            arrows: false,
                            dots: false,
                            centerMode: true,
                            slidesToShow: 1
                        }
                    }]
                });
            }, 100);

            for (let index = 0; index < data[2].movies.length; index++) {
                var divContainer = $('<div>').addClass('item');
                var imgFilm = $('<img>').attr('src', data[2].movies[index].images[0].url);
                var eleg = $('<svg class="icon-elegibility" viewBox="0 0 24 24"><g fill="none" fill-rule="evenodd"><circle cx="12" cy="12" r="10" fill="#000" fill-opacity=".6"></circle><path fill="#FFF" d="M12 0c6.627 0 12 5.373 12 12s-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0zm0 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z"></path><path fill="#FFF" fill-rule="nonzero" d="M12 5.167c1.678 0 2.917 1.22 2.917 2.916v1.75h.583c.671 0 1.167.489 1.167 1.167v4.667c0 .678-.496 1.166-1.167 1.166H8.549c-.672 0-1.216-.55-1.216-1.228V11c0-.678.496-1.167 1.167-1.167h.583v-1.75c0-1.695 1.24-2.916 2.917-2.916zm.583 7h-1.166V14.5h1.166v-2.333zM12 6.333c-1.007 0-1.75.733-1.75 1.75v1.75h3.5v-1.75c0-1.017-.743-1.75-1.75-1.75z"></path></g></svg>');

                $(divContainer).html($(imgFilm));
                $(divContainer).append($(eleg));

                $('.mais-temidos').append($(divContainer));
                $('.cinema-nacional').append($(divContainer).clone());
                $('.dc-comics').append($(divContainer).clone());
                $('.marvel').append($(divContainer).clone());

            }

            loadSliders();
        }
    });
}

function loadSliders() {
    $('.move-left').remove();
    $('.move-right').remove();

    $('.filmes').each(function () {
        $(this).offset({ left: 80 });
    });

    $('.filmes').each(function () {
        var anterior = $('<div>').addClass("move-left dot").text("<");
        var proximo = $('<div>').addClass("move-right dot").text(">");

        var container = $(this);

        $(anterior).click(function () {
            if ($(':animated').length) {
                return false;
            }

            var curLeft = $(container).offset().left;
            var destLeft = curLeft + 220;

            if (destLeft > 80)
                destLeft = 80;

            $(container).animate({ left: destLeft });
        });

        $(proximo).click(function () {
            if ($(':animated').length) {
                return false;
            }

            var curLeft = $(container).offset().left;
            var destLeft = curLeft - 220;

            //checar o tamanho da tela
            if ((destLeft * -1) + $(window).width() >= $(container).width()) {
                destLeft = $(window).width() - $(container).width();
            }

            $(container).animate({ left: destLeft });

        });

        $(container).parent().mouseenter(function () {
            $(anterior).addClass('move-left-hover');
            $(proximo).addClass('move-right-hover');
        }).mouseleave(function () {
            $(anterior).removeClass('move-left-hover');
            $(proximo).removeClass('move-right-hover');
        });

        $(this).parent().prepend($(anterior));
        $(this).parent().append($(proximo));
    });

    window.onresize = function () {
        loadSliders();
    }
}