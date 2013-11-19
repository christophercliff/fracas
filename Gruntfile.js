module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-browserify')
    grunt.loadNpmTasks('grunt-contrib-jshint')
    grunt.loadNpmTasks('grunt-mocha')

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        browserify: {
            test: {
                options: {
                    debug: true
                },
                src: './test/index.js',
                dest: './test/runner/index.js'
            }
        },
        jshint: {
            options: {
                eqeqeq: true,
                immed: true,
                latedef: 'nofunc',
                newcap: true,
                quotmark: 'single',
                trailing: true,
                unused: true,
                asi: true,
                boss: true,
                expr: true,
                laxbreak: true,
                laxcomma: true,
                scripturl: true,
                sub: true,
                loopfunc: true
            },
            all: ['./lib/**/*.js']
        },
        mocha: {
            test: {
                options: {
                    run: true,
                    reporter: 'Spec',
                    log: true
                },
                src: './test/runner/index.html'
            }
        }
    })

    grunt.registerTask('test', [
        'jshint:all',
        'browserify:test',
        'mocha:test'
    ])

}
