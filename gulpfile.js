var gulp         = require('gulp');
var sass         = require('gulp-sass');
var browserSync  = require('browser-sync');
var concat       = require('gulp-concat');
var uglifyjs     = require('gulp-uglifyjs');
var autoPrefixer = require('gulp-autoprefixer');
var babel        = require('gulp-babel');

// var nodeBourbon  = require('node-bourbon');
// nodeBourbon.with('app/sass');

gulp.task('sass', function(){
    return gulp.src('src/sass/**/*.sass')
        .pipe(sass())
        .pipe(autoPrefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('libscss', ['fonts'],function(){
    return gulp.src([
        "node_modules/reset-css/reset.css",
        "node_modules/normalize.css/normalize.css",
        "node_modules/font-awesome/css/font-awesome.min.css",
    ])
        .pipe(concat('libs.min.css'))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('fonts', function(){
    return gulp.src([
        "node_modules/font-awesome/fonts/*"
    ])
        .pipe(gulp.dest('dist/fonts'));
});

// gulp.task('img', function(){
//     return gulp.src([
//         "node_modules/ion-rangeslider/img/*"
//     ])
//         .pipe(gulp.dest('app/img'));
// });

// gulp.task('libsjs', function(){
//     return gulp.src([
//         "node_modules/jquery/dist/jquery.min.js",
//         "node_modules/ion-rangeslider/js/ion.rangeSlider.min.js",
//         "node_modules/pickerjs/dist/picker.js",
//         "node_modules/semantic-ui/dist/semantic.min.js",
//     ])
//         .pipe(concat('libs.min.js'))
//         .pipe(uglifyjs())
//         .pipe(gulp.dest('app/js'));
// });

gulp.task('js', function(){
    return gulp.src([
        "src/js/main.js",
        "src/js/sections.js",
    ])
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(concat('canvas-editor.js'))
        // .pipe(uglifyjs())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('browser-sync', function() { // Создаем таск browser-sync
    browserSync({ // Выполняем browserSync
        server: { // Определяем параметры сервера
            baseDir: '.',
            https: false
        },
        notify: false // Отключаем уведомления
    });
});

gulp.task('watch', ['browser-sync', 'sass', 'js'], function() {
    gulp.watch('src/sass/**/*.sass', ['sass']);
    gulp.watch('src/js/**/*.js', ['js']);
    gulp.watch('*.html', browserSync.reload);
    gulp.watch('src/js/**/*.js', browserSync.reload);
});