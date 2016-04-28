/**
 * Compress CSS files.
 *
 * ---------------------------------------------------------------
 *
 * Minify the intermediate concatenated CSS stylesheet which was
 * prepared by the `concat` task at `.tmp/public/concat/production.css`.
 *
 * Together with the `concat` task, this is the final step that minifies
 * all CSS files from `assets/styles/` (and potentially your LESS importer
 * file from `assets/styles/importer.less`)
 *
 * For usage docs see:
 *   https://github.com/gruntjs/grunt-contrib-cssmin
 *
 */
module.exports = function (grunt) {
    var pkg = grunt.file.readJSON('package.json');
    var name = pkg.name;
    var date = grunt.template.today("yyyy-mm-dd'T'HH:MM:ss");
    grunt.config.set('cssmin', {
       
        dev: {
            options: {
                banner: '/*!asiatravel FE team '+name+'-----'+date+' */\n'
            },
            files: [{
                    expand:true,
                    cwd:'.tmp/',//js目录下
                    src:[
                        '**/*.css',  //所有css文件
                    ],
                    dest: '.tmp/'//输出到此目录下
                    //ext:'.css'
                }]
        },
        build: {
            dist: {
                src: ['.tmp/public/concat/production.css'],
                dest: '.tmp/public/min/production.min.css'
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-cssmin');
};
