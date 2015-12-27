var gulp = require('gulp'),
	browserSync = require("browser-sync")
	sass = require('gulp-sass'),
	compass = require('gulp-compass'),
	jade = require('gulp-jade'); // Плагин для Jade

gulp.task('jade', function() { // задача на jade
   return gulp.src('index.jade')
        .pipe(jade({
            pretty: true
        }))  // Собираем Jade только в папке ./assets/template/ исключая файлы с _*
        .on('error', console.log) // Если есть ошибки, выводим и продолжаем
    .pipe(gulp.dest('.')) // Записываем собранные файлы
}); 
gulp.task('compass', function() {
  gulp.src('./sass/*.scss')
    .pipe(compass({
      config_file: './config.rb',
      css: 'css',
      sass: 'sass'
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
	gulp.watch('sass/*.scss', ['compass']);
	gulp.watch('./*.jade', ['compass']);
	gulp.watch([
		'index.html',
		'css/*.css'
	]).on('change', browserSync.reload);
});
gulp.task('default', ['server','watch']);