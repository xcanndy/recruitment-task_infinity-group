const gulp = require('gulp'),
  $ = require('gulp-load-plugins')({
    lazy: true,
    pattern: '*'
  }),
  browserSync = require('browser-sync').create(),
  del = require('del'),
  runSequence = require('run-sequence'),
  log = require('fancy-log'),
  colors = require('ansi-colors')
  pump = require('pump');


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

gulp.task('images', () => {
  return gulp.src('app/images/**/*.+(png|jpg|gif|svg)')
  .pipe($.cache($.imagemin()))
  .pipe(gulp.dest('dist/images'))
});

gulp.task('js', (cb) => {
  pump([gulp.src('app/js/*.js'),
    $.babel({
        presets: ['env']
      }),
    gulp.dest('app/js/es5')
  ], cb)  
})

gulp.task('useref', (cb) => {
  pump([
    gulp.src(['app/*.html', 'app/*.json']),
    $.useref(),
    $.if('app/js/es5/*.js', $.babel({ presets: ['env'] }), $.uglify()),
    $.if('app/*.css', $.cssnano()),
    gulp.dest('dist')
  ], cb)
});

gulp.task('clean:dist', () => {
  return del.sync('dist');
})

gulp.task('watch', ['server', 'sass'], () => {
    gulp.watch('app/sass/**/*.+(sass|scss)', ['sass']);
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('build:prod', callback => {
  runSequence('clean:dist', 
    ['sass', 'js'],
    ['useref', 'images'], 
    callback
  )
});

gulp.task('default', callback => {
  runSequence(['sass', 'server', 'watch'], callback)
});
  



