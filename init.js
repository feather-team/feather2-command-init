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

			var _path = process.cwd() + '/' + path + '/';

		    if(feather.util.exists(_path)){
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
					name: 'project.modulename',
					desc: 'project modulename:'
				},
				{
					name: 'project.charset',
					desc: 'project charset:',
					_default: 'utf-8'
				},
				{
					name: 'project.mode',
					desc: 'project mode',
					_default: 'php'
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
						feather.util.mkdir(_path);
		    
					    var conf = feather.util.read(__dirname + '/vendor/conf.js');

					    for(var i in config){
					    	conf = conf.replace('${' + i + '}', config[i]);
					    }

					    var modulename = config['project.modulename'], vendor = __dirname + '/vendor/';
					    var confPath = _path + 'conf/';

					    feather.util.write(_path + 'feather-conf.js', conf);
						feather.util.mkdir(_path + 'page/' + modulename);

					    if(!modulename || modulename == 'common'){
					    	feather.util.write(_path + 'index.' + config['template.suffix'], feather.util.read(vendor + 'index.html'));
					    	feather.util.write(_path + 'test/_global_.php', feather.util.read(vendor + 'global.php'));
					    	feather.util.write(_path + 'test/index.php', feather.util.read(vendor + 'test.php'));
					    }else{
					    	feather.util.mkdir(_path + 'test');
					    }
					    
					    feather.util.mkdir(_path + 'static/' + modulename);
					    feather.util.mkdir(_path + 'components');
					    feather.util.mkdir(_path + 'widget/' + modulename);
					    feather.util.write(confPath + 'pack.json', '{}');
						feather.util.write(confPath + 'rewrite.php', feather.util.read(vendor + 'rewrite.php'));
					    feather.util.write(confPath + 'deploy/local.js', feather.util.read(vendor + 'deploy.js'));
					    feather.util.write(confPath + 'deploy/receiver.php', feather.util.read(vendor + 'receiver.php'));

					    if(config['project.mode'] == 'php'){
					    	feather.util.mkdir(_path + 'plugins/');
					    	feather.util.write(confPath + 'compatible.php', '<?php\r\n//php兼容文件\r\n//error_reporting(E_ALL & ~E_NOTICE);');
					    }

						rl.close();
					}else{
						configStep();
					}
				});
			})();
		    
		    return;
		    
		});
};