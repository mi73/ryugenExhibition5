var gulp            = require('gulp');
var util            = require('gulp-util');
var pleeease        = require('gulp-pleeease');
var plumber         = require('gulp-plumber');
var browserSync     = require('browser-sync');
var sass            = require('gulp-sass');
var pug             = require('gulp-pug');
var s3              = require('gulp-s3');

// var removeAttributes = require('gulp-css-remove-attributes');


/*--------------------------------------------------------*/

gulp.task('sass', function () {
  gulp
    .src('./resources/scss/**/*.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(pleeease({
      autoprefixer: {"browsers": ["last 4 versions", 'ie 11', "Android 2.3"]},
      minifier: !util.env.d
    }))
    // .pipe(removeAttributes(['-ms-filter'], {compress: true}))
    .pipe(gulp.dest('./build/css/'));
});

gulp.task('sass_sp', function () {
  gulp
    .src('./resources/sp/scss/**/*.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(pleeease({
      autoprefixer: {"browsers": ["last 4 versions", 'ie 10', "Android 2.3"]},
      minifier: !util.env.d
    }))
    // .pipe(removeAttributes(['-webkit-clip-path'], {compress: true}))
    .pipe(gulp.dest('./build/sp/css/'));
});

gulp.task('pug', function (){
   gulp.src([
     './resources/pug/**/*.pug',
     '!./resources/pug/modules/*.pug'
     ])
     .pipe(plumber())
     .pipe(pug({pretty: util.env.d}))
     .pipe(gulp.dest('./build/'));
});

gulp.task('pug_sp', function (){
   gulp.src([
     './resources/sp/pug/**/*.pug',
     '!./resources/sp/pug/modules/*.pug'
     ])
     .pipe(plumber())
     .pipe(pug({pretty: util.env.d}))
     .pipe(gulp.dest('./build/sp/'));
});

gulp.task('watch', function () {
  gulp.watch(['./resources/scss/**/*.scss'], ['sass']);
  gulp.watch(['./resources/pug/**/*.pug'], ['pug']);
  gulp.watch(['./resources/sp/scss/**/*.scss'], ['sass_sp']);
  gulp.watch(['./resources/sp/pug/**/*.pug'], ['pug_sp']);
});


// DEV SERVER
gulp.task('server', function() {
  browserSync.init({
    port: 3000,
    server: {
      baseDir: "./build"
    }
  });

  gulp.watch('./build/**/*.html', ['serverReload']);
  gulp.watch('./build/**/*.css', ['serverReload']);
  gulp.watch('./build/**/*.js', ['serverReload']);
});

gulp.task('serverReload', function() {
  browserSync.reload();
});

gulp.task('build', ['sass', 'pug','sass_sp', 'pug_sp', 'sprite', 'sprite_sp', 'webpack']);
gulp.task('default', ['watch','pug','sass_sp', 'pug_sp', 'server']);


var AWS = {
  "key":    'AKIAJEYPLDA3CNA5YYNA',//process.env.AWS_ACCESS_KEY_ID,
  "secret": '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',//process.env.AWS_SECRET_ACCESS_KEY,
  "bucket": "exhibition5.ryugen.jp",
  "region": "ap-northeast-1"
};

gulp.task('deploy', () => {
  gulp.src('./build/**').pipe(s3(AWS));
});