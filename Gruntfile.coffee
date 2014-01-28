module.exports = (grunt) ->

	pkg = grunt.file.readJSON 'package.json'

  # Project configuration.
	grunt.initConfig
		pkgFile: 'package.json'
		pkg: pkg

		'npm-contributors':
			options:
				commitMessage: 'chore: update contributors'

		bump:
			options:
				commitMessage: 'chore: release v%VERSION%'
				pushTo: 'origin'

		'auto-release':
			options:
				checkTravisBuild: false

		jshint:
			options:
				# Expected an assignment or function call and instead saw an expression.
				'-W030': true,
				globals:
					node: true,
					console: true,
					module: true,
					require: true
			all:
				src: ['*.js', 'src/**/*.js']

		coffeelint:
			options:
				no_tabs: {level: 'ignore'}
				indentation: {level: 'ignore'}
				max_line_length:
					level: 'error'
					value: 110
			dev: ['*.coffee', 'lib/*.coffee', 'test/*.coffee']

		csslint:
			options:
				'import': false
				'adjoining-classes': false
				'box-model': false
				'box-sizing': false
				'known-properties': false
				'display-property-grouping': false
			src: ['src/css/*.css']

		clean:
			build: ['build']
			dist: ['dist/index.js']

		copy:
			# copies js files to temporary build dir
			js:
				src: '**/*.js'
				dest: 'build'
				cwd: 'src'
				expand: true
				flatten: true
				filter: 'isFile'
			# copies css files to temporary build dir
			css:
				src: '**/*.css'
				dest: 'build'
				cwd: 'src/css'
				expand: true
				flatten: true
				filter: 'isFile'

		concat:
			# concats js files from build and build/lib dirs
			js:
				src: ['build/*.js', '!build/index.js']
				dest: 'build/all.js'

		includes:
			# includes build/all.js into build/viewer.js
			build:
				src: 'build/index.js'
				dest: 'dist/'
				cwd: '.'
				flatten: true
				options:
					includeRegexp: /^\s*\/\/\s*include\s+['"]?([^'"]+)['"]?\s*$/
					duplicates: false
					debug: true

		uglify:
			debug:
				options:
					banner: '/*! <%= pkg.name %> v<%= pkg.version %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
					mangle: false
					beautify: true
					preserveComments: 'some'
					bracketize: true
					semicolons: true
				files:
					'dist/d3.gems.js': 'dist/index.js'
			min:
				options:
					banner: '/*! <%= pkg.name %> v<%= pkg.version %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
					mangle: false
				files:
					'dist/d3.gems.min.js': 'dist/index.js'

		cssmin:
			all:
				files:
					'dist/d3.gems.css': 'build/*.css'

	grunt.loadNpmTasks 'grunt-contrib-jshint'
	grunt.loadNpmTasks 'grunt-coffeelint'
	grunt.loadNpmTasks 'grunt-contrib-csslint'
	grunt.loadNpmTasks 'grunt-npm'
	grunt.loadNpmTasks 'grunt-bump'
	grunt.loadNpmTasks 'grunt-auto-release'
	grunt.loadNpmTasks 'grunt-contrib-clean'
	grunt.loadNpmTasks 'grunt-contrib-copy'
	grunt.loadNpmTasks 'grunt-contrib-concat'
	grunt.loadNpmTasks 'grunt-includes'
	grunt.loadNpmTasks 'grunt-contrib-uglify'
	grunt.loadNpmTasks 'grunt-contrib-cssmin'

	grunt.registerTask 'release', 'Bump the version and publish to NPM.',
		(type) -> grunt.task.run [
			'npm-contributors',
			"bump:#{type||'patch'}",
			'npm-publish'
		]

	grunt.registerTask 'lint', ['coffeelint', 'jshint', 'csslint']
	grunt.registerTask 'test', ['lint']

	grunt.registerTask 'build', [
		'clean:build',
		'copy',
		'concat',
		'includes',
		'uglify',
		'cssmin',
		'clean:dist',
	]

	grunt.registerTask 'default', ['build', 'test']
