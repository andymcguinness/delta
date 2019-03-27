/*
 * File: Gruntfile.js
 * Description: Loads all Grunt plugins and defines tasks
 * Dependencies: grunt-contrib-sass, grunt-contrib-watch
 *
 * @package delta
 */

module.exports = function(grunt) {
  
    /* === Configuring our Static Files Info === */


    /* === Initial Config === */
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        staticFiles: {
            sourceDir: 'src/',
            destDir: 'dist/',
            sourceFileType: '.pug',
            destFileType: '.html'
        },
        sass: {
            dist: {
                options: {
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
        },
        pug: {
            compile: {
              options: {
                  pretty: true
              },
              files: '<%= staticFiles.filePaths %>'
            }
        }
    });

    /* === Static Site Filepath Generator Function === */
    /**
     * Does what it says on the box: generates a static site filepath.
     *
     * obj staticFilesObj: This is pulled from Grunt's config. So-called "Basic" Grunt tasks ignore Grunt's config variables.
     *
     * string sourceDir: The file path of the source directory. Include the slash.
     * string destDir: The file path of the destination directory. Include the slash.
     * string sourceFileType: The file types we're looking for. Include the dot.
     * string destFileType: The file type we're ending with. Include the dot.
     *
     * returns: object filePaths: Can be fed into any Grunt function.
     *
     */

     grunt.registerTask('staticFiles', function ()  {
        var filePaths = {},
            staticFilesObj = grunt.config('staticFiles');

        grunt.file.expand( { filter: 'isFile' }, staticFilesObj.sourceDir + '*' + staticFilesObj.sourceFileType ).forEach(function (filePath) {
          var fileName = filePath.split('/').pop().split('.')[0];

          
          if (fileName == 'index') {
            filePaths[ staticFilesObj.destDir +  fileName + staticFilesObj.destFileType ] = staticFilesObj.sourceDir + fileName + staticFilesObj.sourceFileType;
          } else {
            filePaths [ staticFilesObj.destDir + fileName + '/index' + staticFilesObj.destFileType ] = staticFilesObj.sourceDir + fileName + staticFilesObj.sourceFileType;
          }
            
        });

       grunt.config.set('staticFiles.filePaths', filePaths);

    });
  

    /* === Loading Plugins === */
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-pug');

    /* === Register Tasks === */
    grunt.registerTask('default', ['staticFiles', 'sass', 'pug', 'watch']);
};
