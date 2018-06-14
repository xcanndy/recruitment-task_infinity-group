const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const useref = require('gulp-useref');
const uglify = require('gulp-uglify');
const gulpIf = require('gulp-if');
const cssnano = require('gulp-cssnano');
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');
const del = require('del');
const runSequence = require('run-sequence');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');

gulp.task('browserSync', () => {
  browserSync.init({
    server: {
      baseDir: 'app'
    }
  })
})

gulp.task('sass', () => {
  return gulp.src('app/sass/**/*.+(sass|scss)')
    .pipe(sourcemaps.init())
      .pipe(sass())
      .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
      }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('images', function(){
  return gulp.src('app/images/**/*.+(png|jpg|gif|svg)')
  .pipe(cache(imagemin()))
  .pipe(gulp.dest('dist/images'))
});

gulp.task('useref', function(){
  return gulp.src('app/*.html')
    .pipe(useref())
    // uglify js
    .pipe(gulpIf('*.js', uglify()))
    // minify css
    .piipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
});

gulp.task('clean:dist', function() {
  return del.sync('dist');
})

gulp.task('watch', ['browserSync'], () => {
  gulp.watch('app/sass/**/*.sass', ['sass'], browserSync.reload());
  gulp.watch('app/*.html', browserSync.reload());
  gulp.watch('app/js/**/*.js', browserSync.reload());
});

gulp.task('build', callback => {
  runSequence('clean:dist', 
    ['sass', 'useref', 'images', 'fonts'], 
    callback
  )
});

gulp.task('default', callback => {
  runSequence(['sass', 'browserSync', 'watch'],
  callback)
});
  



