const gulp = require('gulp'),
  $ = require('gulp-load-plugins')({
    lazy: true,
    pattern: '*'
  }),
  browserSync = require('browser-sync').create(),
  del = require('del'),
  runSequence = require('run-sequence'),
  log = require('fancy-log'),
  colors = require('ansi-colors');


gulp.task('server', () => {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
    injectChanges: true
  })
})

gulp.task('sass', () => {
  log( colors.yellow('Compiling SASS to CSS') );

  return gulp.src('app/sass/**/*.+(sass|scss)')
    .pipe($.sourcemaps.init())
      .pipe($.sass())
      .pipe($.autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
      }))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('images', function(){
  return $.src('app/images/**/*.+(png|jpg|gif|svg)')
  .pipe($.cache($.imagemin()))
  .pipe(gulp.dest('dist/images'))
});

gulp.task('useref', function(){
  return $.src('app/*.html')
    .pipe($.useref())
    // uglify js
    .pipe($.if('*.js', uglify()))
    // minify css
    .pipe($.if('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
});

gulp.task('clean:dist', function() {
  return del.sync('dist');
})

gulp.task('watch', ['server', 'sass'], () => {
  gulp.watch('app/sass/**/*.+(sass|scss)', ['sass']);
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('build', callback => {
  runSequence('clean:dist', 
    ['sass', 'useref', 'images', 'fonts'], 
    callback
  )
});

gulp.task('default', callback => {
  runSequence(['sass', 'server', 'watch'], callback)
});
  



