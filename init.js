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
					    feather.util.write(root + '/conf/conf.js', conf);		    	

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