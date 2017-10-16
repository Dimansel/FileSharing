var gulp = require("gulp"),
    sass = require("gulp-sass"),
    browserSync = require("browser-sync")

gulp.task('a', function() {
  console.log("Hi, i`m work this time!");
})

gulp.task('browser-sync', function() { // Создаем таск browser-sync
    browserSync({ // Выполняем browserSync
        server: { // Определяем параметры сервера
            baseDir: 'app' // Директория для сервера - app
        },
        notify: false // Отключаем уведомления
    });
});

gulp.task("sass1", function(){
  return gulp.src('app/sass/icon.sass')
    .pipe(sass())
    .pipe(gulp.dest("app/css"))
})

gulp.task("sass", function(){
    return gulp.src('app/sass/main.sass')
      .pipe(sass())
      .pipe(gulp.dest("app/css"))
})

gulp.task('watch', ['browser-sync', 'sass', 'sass1'], function() {
    gulp.watch('app/sass/**/*.sass', ['sass',browserSync.reload]); // Наблюдение за sass файлами в папке sass
    gulp.watch('app/*.html', browserSync.reload); // Наблюдение за HTML файлами в корне проекта
    gulp.watch('app/js/**/*.js', browserSync.reload);   // Наблюдение за JS файлами в папке js
});
