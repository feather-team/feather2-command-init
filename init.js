'use strict';

exports.name = 'init';
exports.usage = '[options] <path>'
exports.desc = 'auto create your project';
exports.register = function(commander){
	commander
		.option('-n, --name [name]', 'project name', String, '_default')
		.option('-m, --modulename [name]', 'project modulename', String, '')
		.option('-c, --charset [value]', 'project charset', String, 'utf-8')
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

					    var modulename = config['project.modulename'];

					    feather.util.write(_path + 'conf.js', conf);
					    feather.util.mkdir(_path + 'page/' + modulename);
					    feather.util.write(_path + 'index.' + config['template.suffix'], 'welcome to ' + feather.cli.name);
					    feather.util.mkdir(_path + 'test');
					    feather.util.mkdir(_path + 'static/' + modulename);
					    feather.util.mkdir(_path + 'static/' + modulename);
					    feather.util.mkdir(_path + 'static/' + modulename);
					    feather.util.mkdir(_path + 'components/' + modulename);
					    feather.util.mkdir(_path + 'widget/' + modulename);
						rl.close();
					}else{
						configStep();
					}
				});
			})();
		    
		    return;
		    
		});
};