module.exports = {
    '^/(?:\\?main|$)': '/index.html', // xxx.com | xxx.com/ | xxx.com?main => index.html
    '^/ajax/test$': '/data/ajax/test.json'
}