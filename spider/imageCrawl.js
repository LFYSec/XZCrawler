var Crawler = require("crawler")
var fs = require('fs')

var imgCrawler = new Crawler({
    encoding: null,
    jQuery: null,
    callback: function(error, res, done){
        if(error){
            console.log(error);
        }else{
            var fn = res.options.filename;
            var writeStream;
            if(res.options.isAvat){
                writeStream = fs.createWriteStream("html/media/avatars/" + fn);
            }else{
                writeStream = fs.createWriteStream("html/media/picture/" + fn);
            }
            writeStream.on('error', (err) => {
                console.error('[-] Crawl image error:', err);
                fs.writeFile('log', "[-] Crawl image error: "+error+"\n", {flag:'a'}, ()=>{});
            });
            writeStream.on('finish', () => {
                //console.log(`[+] Crawl image [${fn}] success`);
            });
            writeStream.write(res.body);
            writeStream.end();
        }
        done();
    }
})

module.exports = {
    imgCrawler
}