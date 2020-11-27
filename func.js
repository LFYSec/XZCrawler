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

var editImg = ($, t_id) => {
    $('img').each(function(){
        var src = $(this).attr('src')
        if(src){
            src = src.replace("xianzhi.aliyun.com", "xz.aliyun.com");
            src = src.split('?')[0];
            src = src.split('#')[0];
            picname = src.substr(src.lastIndexOf('/')+1);
            console.log(`[+] ${t_id}\t${picname}`)
            if(src.indexOf('avatars')>0){
                imgCrawler.queue({
                    uri: src,
                    filename: picname,
                    isAvat: true,
                    tid: t_id
                });
                $(this).attr('src', './../media/avatars/'+picname);
            }else{
                imgCrawler.queue({
                    uri: src,
                    filename: picname,
                    isAvat: false,
                    tid: t_id
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
