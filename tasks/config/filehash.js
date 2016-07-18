/**
 * Created by lichengjun on 16/7/18.
 */
/**
 * `filehash`
 *
 * ---------------------------------------------------------------
 *
 * Create version mapping for your static files
 *
 * For usage docs see:
 *   https://www.npmjs.com/package/grunt-file-hash
 *
 */
module.exports = function (grunt) {
  grunt.config.set('filehash', {
    dev: {
      options: {
        //mapping: '#{= dest}/hash.json',                      // the mapping file path
        //mappingKey: '{{= cwd}}/{{= basename}}{{= extname}}', // mapping key options
        //mappingValue: '{{= dest}}/{{= basename}}.{{= hash}}{{= extname}}', // mapping value options
        etag: null,
        algorithm: 'md5', // the algorithm to create the hash
        //rename: '#{= dirname}/#{= basename}_#{= hash}#{= extname}', // save the original file as what
        keep: true,      // should we keep the original file or not
        merge: false,    // merge hash results into existing `hash.json` file or override it.
        hashlen: 10,     // length for hashsum digest
      },
      files: [{
        expand:true,
        cwd:'.tmp/',//js目录下
        src:[
          '**/*.js',  //所有js文件
          '**/*.css', //所有的CSS文件
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

  grunt.loadNpmTasks('grunt-file-hash');
};
