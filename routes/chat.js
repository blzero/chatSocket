var express = require('express');
var router = express.Router();
var fs = require('fs');
var io = require('socket.io').listen(8080);
var robot = require('../model/robot');


/* GET home page. */
router.get('/', function(req, res, next) {

    if (req.url.indexOf('.css') != -1) {
        var t = fs.readFile('./stylesheets/chat.css');
        res.end(t);
    }
    if (req.url.indexOf('.io.js') != -1) {
        var t = fs.readFile('./javascripts/socket.io.js');
        res.end(t);
    }

    res.render('chat', { title: '聊天室' });
});

//创建 socket 
io.on('connection', function(socket) {

    //接收到消息
    socket.on('message', function(data) {
        // 机器人
        if (data.type == 1) {
            var r1 = new robot();

            r1.getData(data.content, function success(content) {
                socket.send(content);
            });

        } else {
            //把当前用户发送的消息，发送个其他用户
            socket.broadcast.send(data.content)
        }

    });

});



module.exports = router;