var gulp = require('gulp');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');

gulp.task('default', function() {
  // place code for your default task here
});

// image use ref
var inlinehtmlimg = require('gulp-inline-image-html');
gulp.task('useref', function(){
  return gulp.src('./*.html')
    .pipe(useref())
    // Minifies only if it's a JavaScript file
    .pipe(gulpIf('*.js', uglify()))
    // Minifies only if it's a CSS file
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulpIf('*.html', inlinehtmlimg()))
    .pipe(gulp.dest('dist'))
});


// image related task
var merge = require('merge-stream');
var imageResize = require('gulp-image-resize');
var imagemin = require('gulp-imagemin');

gulp.task('image', function () {
  // generate small and medium images
  var smallImages = gulp.src('images/**/*.+(png|jpg|gif|svg)')
    .pipe(imageResize({
      width: '40%',
      height: '40%',
      imageMagick: true
    }))
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images/small'))

  var mediumImages = gulp.src('images/**/*.+(png|jpg|gif|svg)')
    .pipe(imageResize({
      width: '80%',
      height: '80%',
      imageMagick: true
    }))
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images/medium'))

  // minimize all the image size
  var originalImages = gulp.src('images/**/*.+(png|jpg|gif|svg)')
    .pipe(imagemin())

  return merge(smallImages, mediumImages, originalImages)
})

// gulp.task('images', function(){
//   return gulp.src('images/**/*.+(png|jpg|gif|svg)')
//   .pipe(imagemin())
//   .pipe(gulp.dest('dist/images'))
// });

// gulp.task('imagesinlinehtml', function () {
//   return gulp.src('./*.html')
//   .pipe(inlinehtmlimg('images'))
//   .pipe(gulp.dest('dist'))
// })
//
//



var del = require('del');
gulp.task('clean:dist', function() {
  return del.sync('dist');
})


gulp.task('fonts', function() {
  return gulp.src('assets/fonts/**/*')
  .pipe(gulp.dest('dist/fonts'))
})


