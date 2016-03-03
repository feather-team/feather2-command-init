<?php
//URL重定向文件

//demo1 url为空时，重定向至/main.html
/*
//key为正则表达式
return array(
	'#^/?$#' => 'main.html'
);
*/

//demo2 随即url重定向
/*
return array(
	'#^/submitResult#' => array('test/success.json', 'test/error.json')
);
*/

return array();