//local demo
/*
module.exports = {
	from: '/static',
	to: '../../abc',
	subOnly: true
}
*/

//remote demo
/*
module.exports = [
	{
		from: '/static',
		to: '/data/users/xxx/static',
		subOnly: true,
		receiver: 'http://xx.com/receiver.php'	//将deploy目录下的receiver.php文件拷贝至服务器端
	},

	{
		from: '/view',
		to: '/data/users/xxx/view',
		subOnly: true,
		receiver: 'http://xx.com/receiver.php'	//将deploy目录下的receiver.php文件拷贝至服务器端
	}
]
*/

module.exports = {
	to: '../../' + feather.config.get('project.name')
};