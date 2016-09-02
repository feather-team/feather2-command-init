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
				feather.log.on.error('project dir is required!\n');
				return;
			}

			var root = process.cwd() + '/' + path + '/';

		    if(feather.util.exists(root)){
		    	feather.log.on.error(path + ' already exists!\n');
		    	return;
		    }

		    feather.util.copy(__dirname + '/vendor', root);
		  	feather.log.on.notice(path + ' created success!\n');
		    return;
		});
};