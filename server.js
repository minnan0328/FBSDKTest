const https = require('https');
const fs = require('fs');
var express = require('express');
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
// var FBAPI = require('./FBAPI')
var app = express();
// const IP = '192.168.0.13';
const IP = 'localhost';
const Port = '8000';
const options = {
    key: fs.readFileSync('./https/client-key.pem'),
    ca: [fs.readFileSync('./https/cert.pem')],
    cert: fs.readFileSync('./https/client-cert.pem')
};
var server = https.createServer(options, app)
app.use(
    express.urlencoded({
        extended: false
    })
)
// app.use('/api', FBAPI)
app.set('public', path.join(__dirname, './public'))
app.engine('html', require('ejs').renderFile)
app.set('dist engine', 'html')


// 訪問靜態資源
app.use(express.static(path.resolve(__dirname, './public')))
// 訪問單頁
app.get('*', function (req, res) {
    var html = fs.readFileSync(path.resolve(__dirname, 'public/index.html'), 'utf-8')
    res.send(html)
})

app.use(cookieParser())
app.use(function (req, res, next) {
    next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {

    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // render the error page
    res.status(err.status || 500)
    res.json({
        message: err.message,
        error: err
    })
    // res.render('error')
})

server.listen(Port,IP, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("http://%s:%s", host, port)
});
module.exports = app