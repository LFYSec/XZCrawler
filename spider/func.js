const {
    imgCrawler
} = require('./imageCrawl')

var editStatic = ($) => {
    $('script').each(function(){
        var src =  $(this).attr('src');
        if(src && src.substr(0,7) == '/static'){
            $(this).attr('src', './../'+src);
        }
    });

    $('link').each(function(){
        var href = $(this).attr('href');
        if(href && href.substr(0,7) == '/static'){
            $(this).attr('href', './../'+href);
        }
    });
}

var editImg = ($) => {
    $('img').each(function(){
        var src = $(this).attr('src')
        if(src){
            picname = src.substr(src.lastIndexOf('/')+1);
            if(src.indexOf('avatars')>0){
                imgCrawler.queue({
                    uri: src,
                    filename: picname,
                    isAvat: true
                });
                $(this).attr('src', './../media/avatars/'+picname);
            }else{
                imgCrawler.queue({
                    uri: src,
                    filename: picname,
                    isAvat: false
                });
                $(this).attr('src', './../media/picture/'+picname);
            } 
        }
        
    })
}

module.exports = {
    editStatic,
    editImg
}