$(function(){
    $('ul li h2').click(function(){
        $(this)
            .toggleClass('active')
            .next()
            .slideToggle()
            .parent()
            .siblings()
            .find('ol')
            .slideUp()
            .prev()
            .removeClass('active')
    })

    $('ul li ol li').click(function(){
        $('ul li li').css('backgroundColor','#ff0').find('a').css('color','#f00')
        $(this).css('backgroundColor','#0f0').find('a').css('color','#eee')
    })
})