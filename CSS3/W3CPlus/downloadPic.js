/**
 * 将指定数组的图片下载到本地
 */
'use strict';

const fs = require('fs');
const http = require('http');

const colors = require('colors');

let prefix = 'http://www.w3cplus.com/demo/css3/CSS3Fullbackground/';

let urls = [
    'http://www.w3cplus.com/demo/css3/CSS3Fullbackground/sbg1.jpg',
    'http://www.w3cplus.com/demo/css3/CSS3Fullbackground/sbg2.jpg',
    'http://www.w3cplus.com/demo/css3/CSS3Fullbackground/sbg3.jpg',
    'http://www.w3cplus.com/demo/css3/CSS3Fullbackground/sbg4.jpg',
    'http://www.w3cplus.com/demo/css3/CSS3Fullbackground/sbg5.jpg'
];

for (let i = 0; i < urls.length; i++) {
    let url = urls[i];
    let fileName = url.replace(prefix, '');
    http.get(url, res = > {
        let data = [];
    res.on('data', chunk = > {
        data.push(chunk);
}
)
;
res.on('end', () = > {
    data = Buffer.concat(data);
fs.writeFile(fileName, data, err = > {
    if(err)
    throw Error('Failure');
console.log(
`
success
to
write
${fileName}`.
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