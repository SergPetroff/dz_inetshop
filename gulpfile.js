var gulp = require('gulp'),
	browserSync = require("browser-sync")
	sass = require('gulp-sass'),
	compass = require('gulp-compass'),
	jade = require('gulp-jade'); // Плагин для Jade

gulp.task('jade', function() { // задача на jade
   gulp.src('app/jade/index.jade')
        .pipe(jade({
            pretty: true
        }))  
        .on('error', console.log) // Если есть ошибки, выводим и продолжаем
    .pipe(gulp.dest('./')) // Записываем собранные файлы
}); 
gulp.task('compass', function() {
  gulp.src('app/sass/*.scss') 
    .pipe(compass({
      config_file: './config.rb',
      css: 'app/css',
      sass: 'app/sass'
    }))
    .pipe(gulp.dest('./'));
});
 

gulp.task('server',function (){
	browserSync({
		port: 3000,
		server: {
			baseDir: './'
		}
	});
});


gulp.task('watch', function() {
	gulp.watch('app/sass/**/*.scss', ['compass']);
	gulp.watch('app/jade/**/*.jade', ['jade']);
	gulp.watch([
		'index.html',
		'app/css/*.css'
	]).on('change', browserSync.reload);
});
gulp.task('default', ['compass','jade','server','watch']);