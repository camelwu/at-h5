/**
 * `uglify`
 *
 * ---------------------------------------------------------------
 *
 * Minify client-side JavaScript files using UglifyJS.
 *
 * For usage docs see:
 *   https://github.com/gruntjs/grunt-contrib-uglify
 *
 */
module.exports = function (grunt) {
    var pkg = grunt.file.readJSON('package.json');
    var name = pkg.name;
    var date = grunt.template.today("yyyy-mm-dd'T'HH:MM:ss");
    grunt.config.set('uglify', {
        dev: {
            options: {
                banner: '/*! asiatravel FE team '+name+'-----'+date+' */\n',
                compress:{
                    dead_code:true
                }
            },
            files: [{
                    expand:true,
                    cwd:'.tmp/',//js目录下
                    src:[
                        '**/*.js',  //所有js文件
                        '!**/jquery.js',   //过滤不压缩的文件
                        '!**/*.min.js',
                        '!**/coords_china.js',
                        '!**/coords_w_en.js'
                    ],
                    dest: '.tmp/'//输出到此目录下
                    //ext:'.js'
                }]
        },
        build: {
            dist: {
                src: ['.tmp/public/concat/production.js'],
                dest: '.tmp/public/min/production.min.js'
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
};
