module.exports = function (grunt) {

  //jit grunt로 모듈 로딩.
  require('jit-grunt')(grunt);

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        options: {
          singleRun: true
        }
      }
    }
  });

  // 카르마를 대신 실행시켜준다.
  grunt.loadNpmTasks('grunt-karma');
  // Node 스크립트 파일을 실행시켜준다.
  grunt.loadNpmTasks('grunt-execute');

  // Default task(s).
  grunt.registerTask('jasmine_test', ['karma:unit']); //grunt 명령어로 실행할 작업

};
 