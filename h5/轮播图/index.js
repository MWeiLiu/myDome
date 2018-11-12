$(function () {

    for(var i = 0; i < $('.box1 li').length; i++){
        $('.box1 li').eq(i).css('left', i * $('.box1 li').width());
    }


    var s = 2000,
        x = 0;

    function box2(x) {
        $('.box2 li').eq(x).find('div').animate({
            width: '100%'
        }, s, function () {
            $('.box2 li').eq(x).find('div').css('width', '0');
            $('.box1').css('left', -x * $('.box1 li').width());
        });
    }

    box2(x)

    setInterval(function () {
        x++;

        if(x == $('.box1 li').length){
            x = 0;
        }

        box2(x);

    }, s)

})