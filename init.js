'use strict';

exports.name = 'init';
exports.usage = '<path>'
exports.desc = 'auto create your project';
exports.register = function(commander){
	commander
		.action(function(){
			var args = Array.prototype.slice.call(arguments);
			var path = args.shift();

			if(typeof path != 'string'){
				feather.log.error('project dir is required!');
				return;
			}

			var root = process.cwd() + '/' + path + '/';

		    if(feather.util.exists(root)){
		    	feather.log.error(path + ' already exists!');
		    	return;
		    }

		    var i = 0, config = {};
		    var DEFAULT_PROPERTY = [
				{
					name: 'project.name',
					desc: 'project name:',
					_default: '_default'
				},
				{
					name: 'project.charset',
					desc: 'project charset:',
					_default: 'utf-8'
				},
				{
					name: 'template.suffix',
					desc: 'template suffix:',
					_default: 'html'
				},
				{
					name: 'statics',
					desc: 'statics:',
					_default: '/static'
				}
			];

			var readline = require('readline');
			var rl = readline.createInterface({
				input: process.stdin,
				output: process.stdout
			});

		    (function configStep(){
				var current = DEFAULT_PROPERTY.shift();

				rl.question(current.desc + (current._default ? ' (' + current._default + ') ' : ' '), function(answer){
					config[current.name] = answer || current._default || '';
					
					if(!DEFAULT_PROPERTY.length){
					    var templateDir = __dirname + '/template/';
					    var conf = feather.util.read(templateDir + 'conf.js');

					    for(var i in config){
					    	conf = conf.replace('${' + i + '}', config[i]);
					    }

					    feather.util.copy(__dirname + '/vendor', root);
					    feather.util.write(root + 'feather-conf.js', conf);
						feather.util.write(root + 'index.' + config['template.suffix'], feather.util.read(templateDir + 'index.html'));
						//exports.create2Has(_path, config);					    	

						rl.close();
						process.exit();
					}else{
						configStep();
					}
				});
			})();
		    
		    return;
		    
		});
};

function writeIfNotExists(path, content){
	if(!feather.util.exists(path)){
		feather.util.write(path, content);
	}
}

exports.create2Has = function(projectDir, config){
	projectDir += '/';

	var suffix = config['template.suffix'], confPath = projectDir + 'conf/';
	var vendor = __dirname + '/vendor/';

	writeIfNotExists(projectDir + 'test/index.' + suffix, '此目录下所有目录仅供开发阶段进行测试使用，非预览模式不会产出');
	writeIfNotExists(confPath + 'pack.json', '{}');
    writeIfNotExists(confPath + 'deploy/local.js', feather.util.read(vendor + 'deploy.js'));
    writeIfNotExists(confPath + 'deploy/receiver.php', feather.util.read(vendor + 'receiver.php'));

    writeIfNotExists(confPath + 'rewrite.php', feather.util.read(vendor + 'rewrite.php'));

	feather.util.mkdir(projectDir + 'plugins/');
	writeIfNotExists(confPath + 'compatible.php', '<?php\r\n//php兼容文件\r\n//error_reporting(E_ALL & ~E_NOTICE);');

	var modulename = config['project.modulename'];

	if(modulename == 'common' || !modulename){
		writeIfNotExists(confPath + 'compatible.php', '<?php\r\n//php兼容文件\r\n//error_reporting(E_ALL & ~E_NOTICE);');
		var local = feather.util.read(vendor + 'engine.local', true), online = feather.util.read(vendor + 'engine.online', true);
		writeIfNotExists(confPath + 'engine/local.php', local.replace(/#suffix#/, suffix));
		writeIfNotExists(confPath + 'engine/online.php', online.replace(/#suffix#/, suffix));
	}
}