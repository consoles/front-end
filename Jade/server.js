/**
 * Created by gaopengfei on 2015/12/15.
 */

var http = require('http');
var jade = require('jade');

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});

    // 1.compile
    var fn = jade.compile('div #{course}', {});
    var html = fn({course: 'Jade Compile'});
    res.write(html);

    // 2.render
    html = jade.render('div #{course}', {course: 'Jade render'});
    res.write(html);

    // 3.renderFile(use the `pretty` arguments to makesure the html look like beautiful)
    html = jade.renderFile('useLayout.jade', {course: 'Jade renderFile', pretty: true});
    res.write(html);

    res.end();
}).listen(3000);
console.log('Server listening on port 3000');