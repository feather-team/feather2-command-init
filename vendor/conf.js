feather.config.merge({
	project: {
		name: '${project.name}',
		modulename: '${project.modulename}',
		charset: '${project.charset}'
	},

	template: {
		suffix: '${template.suffix}',
		engine: '${template.engine}'
	},

	statics: '${statics}'
});