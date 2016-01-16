#!/usr/bin/env node

/**
 * 提取网站上的所有图片
 */
'use strict';

const http = require('http');
const fs = require('fs');

const cheerio = require('cheerio');
const colors = require('colors');

let getImg = (imgUrl) =
>
{
    http.get(imgUrl, res = > {
        let body = [];
    res.on('data', chunk = > {
        body.push(chunk);
}
)
;
res.on('end', () = > {
    body = Buffer.concat(body);
let fileName = imgUrl.replace('http://www.w3cplus.com/demo/css3/CSS3Fullbackground/', '');
fs.writeFile(fileName, body, err = > {
    if(err)
    throw Error('Save file wrong!');
console.info(
`
Write
${fileName}
success
`.
rainbow
)
;
})
;
})
;
})
;
}

let parseHtml = (htmlDoc) =
>
{
    let $ = cheerio.load(htmlDoc);
    let imgElements = $('img');
    imgElements.each((index, imgElement) = > {
        let imgUrl = 'http://www.w3cplus.com/demo/css3/CSS3Fullbackground/' + $(imgElement).attr('src');
    console.log('imgUrl:'.blue, imgUrl.cyan);
    getImg(imgUrl);
}
)
;
}
;

let htmlDownloader = (url) =
>
{
    http.get(url, res = > {
        let body = [];
    res.on('data', chunk = > {
        body.push(chunk);
}
)
;
res.on('end', () = > {
    body = Buffer.concat(body);
let htmlDoc = body.toString();
parseHtml(htmlDoc);
})
;
})
;
}
;

let showInfo = () =
>
{
    // console.log('请输入需要下载图片的网址：');
    // node app.js param1 param2
    // 0    1      2      3
    let url = process.argv[2];
    htmlDownloader(url);
}
;

let main = () =
>
{
    showInfo();
}
;

main();