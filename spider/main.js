var Crawler = require("crawler");
var fs = require("fs")
var cheerio = require('cheerio')
var func  = require('./func')

var c = new Crawler({
    callback : function (error, res, done) {
        if(error){
            console.log(error);
        }else{
            var $ = cheerio.load(res.body);
            filename = $("title").text().slice(0, -7);
            if(filename.indexOf('/') >= 0){
                filename = filename.replace('/',' or ');
            }
            //console.log(filename);
            func.editStatic($);
            func.editImg($);
            fs.writeFile(res.options.dir + filename + ".html", $.html(), function(error){
                if(error){
                    fs.writeFile('log', error+"\n", {flag:'a'}, ()=>{});
                    return console.error(error);
                }
                console.log(`[+] ${filename} OK!`);
                fs.writeFile('log', `[+] ${filename} OK!\n`, {flag:'a'}, ()=>{});
            });

        }
        done();
    }
});


for(var i=0; i<=7000; i++){
    c.queue({
        uri: "https://xz.aliyun.com/t/"+i.toString(),
        dir: "./html/files/"
    });
}
/*
c.queue({
    uri: "https://xz.aliyun.com/t/6474",
    dir: "./html/files/",
});

c.queue({
    uri: "https://xz.aliyun.com/t/5681",
    dir: "./html/files/"
});
*/