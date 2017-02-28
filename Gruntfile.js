/*
 * File: Gruntfile.js
 * Description: Loads all Grunt plugins and defines tasks
 * Dependencies: grunt-contrib-sass, grunt-contrib-watch
 *
 * @package delta
 */

module.exports = function(grunt) {
    /* === Initial Config === */
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            dist: {
                options: {
                    sourcemap: 'none',
                    style: 'expanded'
                },
                files: {
                    'dist/css/main.css': 'src/scss/main.scss'
                }
            }
        },
        watch: {
            scripts: {
                files: ['src/scss/*.scss', 'src/scss/*/*.scss'],
                tasks: ['sass']
            }
        }
    });

    /* === Loading Plugins === */
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');

    /* === Register Tasks === */
    grunt.registerTask('default', ['sass', 'watch']);
};
