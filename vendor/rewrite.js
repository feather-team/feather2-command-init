//URL重定向文件

//demo1 url为空时，重定向至/main.html
/*
//key为正则表达式
module.exports = {
	'^/?$': 'main.html'
};
*/

//demo2 随即url重定向
/*
module.exports = {
	'^/submitResult': ['test/success.json', 'test/error.json']
};
*/

module.exports = {
	
};