var spdy = require('spdy');
var fs = require('fs');

spdy.createServer({
  key: fs.readFileSync(__dirname + '/keys/spdy-key.pem'),
  cert: fs.readFileSync(__dirname + '/keys/spdy-cert.pem'),
  ca: fs.readFileSync(__dirname + '/keys/spdy-csr.pem'),
}, function(req, res) {
  var headers = {
    'content-type': 'application/javascript',
    'cache-control': 'max-age=3600'
  };

  res.push('/test@^1.2.3', headers, function(err, stream) {
    stream.on('error', function(e) {
      console.log(e);
      read.unpipe(stream);
    });
    var read = fs.createReadStream('large-file');
    read.pipe(stream);
  });

  res.writeHead(200, { 'content-type': 'text/html' });
  res.end('hello world');

}).listen(4443);