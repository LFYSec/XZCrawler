var Crawler = require("crawler");
var fs = require("fs")
var cheerio = require('cheerio')
var func  = require('./func')
const { exec } = require('child_process');

var c = new Crawler({
    callback : function (error, res, done) {
        t_id = res.request.uri.href.split("/")[4];
        if(error){
            console.log(`[!!!]${t_id}\terror`);
        }else{
          if (res.statusCode == 200) {
            var $ = cheerio.load(res.body);
            title = $("title").text().slice(0, -7);
            filename = $("title").text().slice(0, -7);
            if(filename.indexOf('/') >= 0){
                filename = filename.replace('/',' or ');
            }
            //console.log(filename);
            func.editStatic($);
            func.editImg($, t_id);
            fs.writeFile(res.options.dir + t_id + ".html", $.html(), function(error){
                if(error){
                    fs.writeFile('log', error+"\n", {flag:'a'}, ()=>{});
                    return console.error(error);
                }
                console.log(`[+] ${t_id} ${filename} OK!`);
                fs.writeFile('log', `[+] ${filename} OK!\n`, {flag:'a'}, ()=>{});
            });
            if(title != "400"){
                var cmd = `echo '<a href="files/${t_id}.html">${t_id} | ${title}</a></br>\n' >> ${res.options.dir}../index.html`;
                //exec(cmd);
            }
          }
        }
        done();
    }
});

for(var i=0; i<=9999; i++){
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
