var CryptoJS = require('crypto-js')
var request = require('request-promise')



function encrypt (text, originKey) {
    var originKey = originKey.slice(0, 16),
        key = CryptoJS.enc.Utf8.parse(originKey),
        iv = CryptoJS.enc.Utf8.parse(originKey),
        msg = JSON.stringify(text)
    var ciphertext = CryptoJS.AES.encrypt(msg, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return ciphertext.toString()
}

function decrypt (text, originKey) {
    var originKey = originKey.slice(0, 16),
        key = CryptoJS.enc.Utf8.parse(originKey),
        iv = CryptoJS.enc.Utf8.parse(originKey)
    var bytes = CryptoJS.AES.decrypt(text, key, {
        iv: iv
    })
    var plaintext = CryptoJS.enc.Utf8.stringify(bytes)
    return plaintext
}

function extend (target) {
    var sources = [].slice.call(arguments, 1)
    sources.forEach(function (source) {
        for (var prop in source) {
            target[prop] = source[prop]
        }
    })
    return target
}
function getSig(data) {
    var str = 'wx7a727ff7d940bb3f';
    data.forEach(function (res) {
        str += '_' + res.key + ':' + res.value;
    });
    return hash(str);
}
function hash(str) {
    var seed = 31;
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
        hash = hash * seed + str.charCodeAt(i);
        hash = hash & 0x3FFFFFF;
    }
    return hash;
}
var score = 10000,
    session_id = 'CcySqacaV3V4DxUMMr8i3Q@oUrsf0Sybcde9HaylmbuPtb_rpeY';

var headers = {
    'User-Agent': 'MicroMessenger/6.6.1.1220(0x26060133) NetType/WIFI Language/zh_CN',
    'Referer': 'https://servicewechat.com/wx7a727ff7d940bb3f/14/page-frame.html',
    'Content-Type': 'application/json',
    'Accept-Language': 'zh-cn',
    'Accept': '*/*'
}
var data = [{
    'key': 'newscore',
    'value': score
},{
    'key':'level',
    'value':203
},{
    'key':'baoshi',
    'value':10
},{
    'key':'combo',
    'value':60
}];
var base_req = {
    'appid': 'wx7a727ff7d940bb3f',
    'game_behav_list': data,
    'sync_type': 1,
    'sig': getSig(data),
    'use_time': 2004
}
var base_site = 'https://game.weixin.qq.com/cgi-bin/gametetrisws/syncgame?session_id='+session_id

var path = 'wxagame_getuserinfo'
request({
    method: 'POST',
    url: base_site,
    headers: headers,
    json: true,
    body: base_req
}).then(function (response) { 
    console.log(response);
}).catch(function (error) {
    console.log(error);
})

