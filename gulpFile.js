var gulp = require("gulp"),
    sass = require("gulp-sass"),
    browserSync = require("browser-sync"),
    concat = require("gulp-concat"),
    uglify = require("gulp-uglifyjs"),
    del = require("del")
    cleanCSS = require('gulp-clean-css');
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant');
    cache = require('gulp-cache'),
    autoprefixer = require('gulp-autoprefixer');

gulp.task('clearCache', function () {
    return cache.clearAll();
})

gulp.task("sass", function(){
    return gulp.src('app/sass/main.sass')
      .pipe(sass())
      .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
      .pipe(gulp.dest("app/css"))
})

gulp.task("clean", function(){
  return del.sync('dist');
})

gulp.task('img', function() {
    return gulp.src('app/img/**/*')
        .pipe(cache(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('dist/img/'));
});

gulp.task('build-dist-js', function() {
    return gulp.src(["app/js/*.js"])
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js/'));
});

gulp.task('minify-css',["sass"], () => {
  return gulp.src('app/css/main.css')
    .pipe(concat("main.min.css"))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist/css/'));
});
//
gulp.task("build", ["clean","minify-css","build-dist-js"],  function(){
  var buildFonts = gulp.src("app/fonts/**/*")
  .pipe(gulp.dest("dist/fonts/"))
  var buildHTML = gulp.src("app/index.html")
  .pipe(gulp.dest("dist/"))
})

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: 'app'
        },
        notify: false
    });
});

gulp.task('watch', ['browser-sync', 'sass'], function() {
    gulp.watch('app/sass/**/*.sass', ['sass',browserSync.reload]);
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('default', ['watch']);
