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

gulp.task('styles:sass', () => {
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

gulp.task('images',callback => {
  pump([
    gulp.src('app/images/**/*.+(png|jpg|gif|svg)'),
    $.cache($.imagemin()),
    gulp.dest('dist/images')
  ], callback)
});

gulp.task('js:minify', callback => {
  pump([
    gulp.src('app/js/*.js'),
    $.babel({
      presets: ['env']
    }),
    $.uglify(),
    $.rename('main.min.js'),
    gulp.dest('dist/js')
  ], callback)
})

gulp.task('useref', callback => {
  const jsFilter = $.filter('app/js/*.js', {restore: true});
  const cssFilter = $.filter('app/css/*.css', {restore: true});

  pump([
    gulp.src(['app/*.html', 'app/*.json']),
    $.useref(),
    // js: es6 => es5 + minify
    jsFilter,
    $.babel({
      presets: ['env']
    }),
    $.uglify(),
    jsFilter.restore,
    // css: minify
    cssFilter,
    $.cssnano(),
    cssFilter.restore,
    gulp.dest('dist')
  ], callback)

});

gulp.task('clean:dist', () => {
  return del.sync('dist');
})

gulp.task('watch', ['server', 'sass'], () => {
    gulp.watch('app/sass/**/*.+(sass|scss)', ['styles:sass']);
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('build:prod', callback => {
  runSequence('clean:dist', 'styles:sass',
    ['useref', 'images'], 
    callback
  )
});

gulp.task('default', callback => {
  runSequence(['styles', 'server', 'watch'], callback)
});
  



