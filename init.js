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
				feather.log.error('invalid path');
				return;
			}

			var _path = process.cwd() + '/' + path + '/';

		    if(feather.util.exists(_path)){
		    	feather.log.error(path + ' is exists!');
		    	return;
		    }
		    
		    feather.util.mkdir(_path);
		    
		    var options = arguments[arguments.length - 1];
		    var conf = feather.util.read(__dirname + '/vendor/conf.js');

		    ['name', 'modulename', 'charset'].forEach(function(name){
		    	conf = conf.replace('${' + name + '}', options[name]);
		    });

		    conf = conf.replace('${cliname}', feather.cli.name);

		    feather.util.write(_path + 'conf.js', conf);
		    feather.util.mkdir(_path + 'page/' + options.modulename);
		    feather.util.write(_path + 'index.' + feather.config.get('template.suffix'), 'welcome to ' + feather.cli.name);
		    feather.util.mkdir(_path + 'test');
		    feather.util.mkdir(_path + 'static/' + options.modulename);
		    feather.util.mkdir(_path + 'static/' + options.modulename);
		    feather.util.mkdir(_path + 'static/' + options.modulename);
		    feather.util.mkdir(_path + 'components/' + options.modulename);
		    feather.util.mkdir(_path + 'widget/' + options.modulename);
		});
};