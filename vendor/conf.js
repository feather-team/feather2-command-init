feather.config.merge({
	project: {
		name: '${project.name}',
		modulename: '${project.modulename}',
		charset: '${project.charset}'
	},

	template: {
		suffix: '${template.suffix}'
	},

	statics: '${statics}'
});