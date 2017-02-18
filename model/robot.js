var request = require('request');
const crypto = require('crypto');
var fs = require('fs');

var robotUrl = 'http://www.tuling123.com/openapi/api';
var apikey = '';
var userId = '';

fs.readFile('./apikey.txt', function(err, data) {
    apikey = data.toString();
});

function Talk() {};
Talk.prototype.getData = function(data, success, err) {

    request.post({
        url: robotUrl,
        form: {
            "key": apikey,
            "info": data
        }
    }, function calllback(err, response, body) {
        if (err) {
            err || err();
        } else {
            // console.log(response);
            console.log(body);
            success(JSON.parse(body));
        }
    });

}


function MD5(str) {
    const md5 = crypto.createHash('md5');
    return md5.update(str, 'utf-8').digest('hex');
}

function aesEncrypt(key, data) {
    const cipher = crypto.createCipher('aes128', key);
    var crypted = cipher.update(data, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
}

function aesDecrypt(key, encrypted) {
    const decipher = crypto.createDecipher('aes128', key);
    var decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}



module.exports = Talk;