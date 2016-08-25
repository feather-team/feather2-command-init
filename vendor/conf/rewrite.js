module.exports = {
    '^/(?:\\?main|$)': '/index.html', // xxx.com | xxx.com/ | xxx.com?main => index.html
    '^/ajax/test$': '/data/ajax/test.json',
    '^/ajax/callback': function(req, res){  //可以是一个函数
        res.send('hello, world!');
    }
}