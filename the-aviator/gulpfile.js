var gulp, browserify, babelify, source, sass, clean, config;

gulp = require('gulp');
browserify = require('browserify');
babelify = require('babelify');
source = require('vinyl-source-stream');
sass = require('gulp-sass');
clean = require('gulp-clean');

config = {
	js: {
		src: './src/app.js',
		dist: './dist/'
	},
	css: {
		src: './src/app.scss',
		dist: './dist/'
	}
};

gulp.task('default', ['bundle-js', 'bundle-css', 'bundle-html'], function () {
	gulp.watch('src/**/*.js', ['bundle-js']);
	gulp.watch('src/**/*.scss', ['bundle-css']);
	gulp.watch('src/**/*.html', ['bundle-html']);
});

gulp.task('clean', function() {
	return gulp.src('.dist/', {read: false})
		.pipe(clean());
});

gulp.task('bundle-js', function () {
	return browserify(config.js.src)
		.transform("babelify", {presets: ['es2015']})
		.bundle()
		.on('error', err => console.log(err))
		.pipe(source('app.min.js'))
		.pipe(gulp.dest(config.js.dist));
});

gulp.task('bundle-css', function () {
	return gulp.src(config.css.src)
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest(config.css.dist));
});

gulp.task('bundle-html', function() {
	return gulp.src('./src/**/*.html')
		.pipe(gulp.dest('./dist'));
});