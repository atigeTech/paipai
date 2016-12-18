var gulp = require('gulp');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var run = require('run-sequence');

gulp.task('default', function (cb) {
    run('clean:dist', 'html', 'image', 'copy')
})

// clean
var del = require('del');
gulp.task('clean:dist', function () {
    return del.sync('dist');
})

// html related task
var inlinehtmlimg = require('gulp-inline-image-html');
var htmlmin = require('gulp-htmlmin');
gulp.task('html', function () {
    return gulp.src('./*.html')
        .pipe(useref())
        // Minifies only if it's a JavaScript file
        .pipe(gulpIf('*.js', uglify()))
        // Minifies only if it's a CSS file
        .pipe(gulpIf('*.css', cssnano()))
        .pipe(gulpIf('*.html', htmlmin({
            collapseWhitespace: true
        })))
        // .pipe(gulpIf('*.html', inlinehtmlimg()))
        .pipe(gulp.dest('dist'))
});


// image related task
var merge = require('merge-stream');
var imageResize = require('gulp-image-resize');
var imagemin = require('gulp-imagemin');

gulp.task('image', function () {


    // generate small and medium images
    var smallImages = gulp.src('images/**/*.+(png|jpg|gif|svg|jpeg)')
        .pipe(gulpIf('hupai.jpg', imageResize({
            width: '30%',
            height: '30%'
        }), imageResize({
            width: '40%',
            height: '40%'
        })))
        .pipe(gulpIf('*.jpeg', imageResize({
            format: 'jpg'
        })))
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images/small'))

    var mediumImages = gulp.src('images/**/*.+(png|jpg|gif|svg|jpeg)')
        .pipe(imageResize({
            width: '80%',
            height: '80%'
        }))
        .pipe(gulpIf('*.jpeg', imageResize({
            format: 'jpg'
        })))
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images/medium'))

    // minimize all the image size
    var originalImages = gulp.src('images/**/*.+(png|jpg|gif|svg|jpeg)')
        .pipe(gulpIf('*.jpeg', imageResize({
            format: 'jpg'
        })))
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))

    var combineAll = merge(smallImages, mediumImages, originalImages)

    return combineAll
})

// copy rest files to dest
gulp.task('copy', function () {
    return gulp.src('assets/**/*')
        .pipe(gulp.dest('dist/assets'))
})