// to run tasks, do Ctrl+Shift+B

var sourceDirName = "./src";
var outputFileName = "account-book-simulator-2.js";
var outputDirName = "./output";
var debugDirName = "./output/debug";
var releaseDirName = "./output/release";
var electronObjDirName = "./obj/electron";
var electronDirName = "./output/electron";
var objDirName = "./obj";
var outputHTMLFileName = "_Layout.html"
var gulp = require('gulp');
var path = require('path');
var plumber = require('gulp-plumber');  // error handling
var runSequence = require('run-sequence');



var del = require("del");
gulp.task('clean_all', function () {
	return del([
		path.join(outputDirName, '**/*'),
		path.join(objDirName, '**/*')
	]);
});
gulp.task('clean_debug', function () {
	return del([
		path.join(debugDirName, '**/*'),
		path.join(objDirName, '**/*')
	]);
});
gulp.task('clean_release', function () {
	return del([
		path.join(releaseDirName, '**/*')
	]);
});



gulp.task('copy_debug', function () {
	// copy library js files to output folder.
	gulp.src([
		'./node_modules/jquery/dist/jquery.min.js',
		'./node_modules/bootstrap/dist/js/bootstrap.min.js',
		'./node_modules/jquery-ui-dist/jquery-ui.min.js',
		'./node_modules/chart.js/dist/Chart.bundle.min.js',
		'./node_modules/bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js',
		'./node_modules/bootstrap-datepicker/dist/locales/bootstrap-datepicker.ja.min.js',
		path.join(sourceDirName, 'lib/bootstrap-number-input/bootstrap-number-input.js')
	]).pipe(gulp.dest(path.join(debugDirName, 'js')));

	// copy library css files to output folder.
	gulp.src([
		'./node_modules/bootstrap/dist/css/bootstrap.min.css',
		'./node_modules/jquery-ui-dist/jquery-ui.min.css',
		'./node_modules/bootstrap-datepicker/dist/css/bootstrap-datepicker3.min.css'
	]).pipe(gulp.dest(path.join(debugDirName, 'css')));

	// copy image files without sprite.
	gulp.src([
		path.join(sourceDirName, 'images/*'),
		'!./src/images/sprite/**/*'
	]).pipe(gulp.dest(path.join(debugDirName, 'images')));

	// copy font files to output folder.
	gulp.src([
		'./node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.eot',
		'./node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.svg',
		'./node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.ttf',
		'./node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.woff',
		'./node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.woff2'
	]).pipe(gulp.dest(path.join(debugDirName, 'fonts')));
});



gulp.task('copy_release', function () {
	// copy library js files to output folder.
	gulp.src([
		'./node_modules/jquery/dist/jquery.min.js',
		'./node_modules/bootstrap/dist/js/bootstrap.min.js',
		'./node_modules/jquery-ui-dist/jquery-ui.min.js',
		'./node_modules/chart.js/dist/Chart.bundle.min.js',
		'./node_modules/bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js',
		'./node_modules/bootstrap-datepicker/dist/locales/bootstrap-datepicker.ja.min.js',
		path.join(sourceDirName, 'lib/bootstrap-number-input/bootstrap-number-input.js')
	]).pipe(gulp.dest(path.join(releaseDirName, 'js')));

	// copy library css files to output folder.
	gulp.src([
		'./node_modules/bootstrap/dist/css/bootstrap.min.css',
		'./node_modules/jquery-ui-dist/jquery-ui.min.css',
		'./node_modules/bootstrap-datepicker/dist/css/bootstrap-datepicker3.min.css'
	]).pipe(gulp.dest(path.join(releaseDirName, 'css')));

	// copy image files without sprite.
	gulp.src([
		path.join(debugDirName, 'images/**/*')
	]).pipe(gulp.dest(path.join(releaseDirName, 'images')));

	// copy font files to output folder.
	gulp.src([
		'./node_modules/bootstrap/dist/fonts/*'
	]).pipe(gulp.dest(path.join(releaseDirName, 'fonts')));
});



var ect = require('gulp-ect');
gulp.task('ect', function () {
	return gulp.src([
		path.join(sourceDirName, 'views/**/*.html'),
		'!./node_modules/**',   // except files below node_modules folder
		'!./**/_*.html'			// except specific name HTML files
	]).pipe(plumber())
		.pipe(ect({ ext: '.html' }))
		.pipe(gulp.dest(debugDirName));
});



var minifyHTML = require('gulp-minify-html');
gulp.task('minify-html', function () {
	return gulp.src(path.join(debugDirName, '**/*.html'))
		.pipe(minifyHTML({ empty: true }))
		.pipe(gulp.dest(releaseDirName));
});



var spritesmith = require('gulp.spritesmith');
gulp.task('sprite', function () {
	let spriteData = gulp.src('./src/images/sprite/*.png')
		.pipe(spritesmith({
			imgName: 'sprite.png',                        // スプライト画像
			cssName: '_sprite.scss',                      // 生成される CSS テンプレート
			imgPath: '../images/sprite.png', // 生成される CSS テンプレートに記載されるスプライト画像パス
			cssFormat: 'css',                            // フォーマット拡張子
			cssOpts: {
				cssSelector: function (sprite) {
					return '.' + sprite.name;
				}
			}
		}));
	spriteData.img
		.pipe(gulp.dest(path.join(debugDirName, 'images')));     // imgName で指定したスプライト画像の保存先
	return spriteData.css
		.pipe(gulp.dest('./obj'));       // cssName で指定した CSS テンプレートの保存先
});



var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
gulp.task('sass', function () {
	return gulp.src([
		path.join(sourceDirName, 'views/**/*.scss'),
		'!./node_modules/**'    // except files below node_modules folder
	]).pipe(plumber())
		.pipe(sass())
		.pipe(autoprefixer())
		.pipe(gulp.dest(path.join(debugDirName, 'css')));
});



var minifyCSS = require('gulp-clean-css');
gulp.task('minify-css', function () {
	return gulp.src([
		path.join(debugDirName, '**/*.css'),
		'!./node_modules/**'    // except files below node_modules folder
	]).pipe(minifyCSS())
		.pipe(gulp.dest(releaseDirName));
});



var tslint = require('gulp-tslint');
gulp.task('tslint', function () {
	return gulp.src([
		path.join(sourceDirName, 'ts/**/*.ts'),
		'!./node_modules/**'    // except files below node_modules folder
	]).pipe(plumber())
		.pipe(tslint())
		.pipe(tslint.report());
});



var typescript = require('gulp-typescript');
gulp.task('ts', function () {
	return gulp.src([
		path.join(sourceDirName, 'ts/**/*.ts'),
		'!./node_modules/**'    // except files below node_modules folder
	]).pipe(typescript({
		removeComments: true,
		out: outputFileName
	})).pipe(gulp.dest(path.join(debugDirName, 'js')));
});



uglify = require('gulp-uglify');
gulp.task('minify-js', function () {
	return gulp.src([
		path.join(debugDirName, '**/*.js'),
		'!./node_modules/**'    // except files below node_modules folder
	]).pipe(uglify())
		.pipe(gulp.dest(releaseDirName));
});



// Open the output HTML file using the default OS browser App.
var open = require('gulp-open');
gulp.task('test', function () {
	return gulp.src(path.join(debugDirName, outputHTMLFileName))
		.pipe(open());
});



gulp.task('rebuild_debug', function () {
	runSequence(
		'clean_debug',
		//'tslint',
		'sprite',
		['copy_debug', 'ect', 'sass', 'ts'],
		'test'
	);
});



gulp.task('rebuild_release', function () {
	runSequence(
		'clean_release',
		['copy_release', 'minify-html', 'minify-css', 'minify-js']
	);
});



gulp.task('rebuild_all', function () {
	runSequence(
		'clean_all',
		'tslint',
		'sprite',
		['copy_debug', 'ect', 'sass', 'ts'],
		['copy_release', 'minify-html', 'minify-css', 'minify-js']
	);
});



var packager = require('electron-packager');
gulp.task('electron', function () {

	// releaseフォルダからelectron用の一時フォルダにファイルをコピーする。
	gulp.src([
		path.join(releaseDirName, '**/*'),
		path.join(sourceDirName, 'electron/*')
	]).pipe(
		gulp.dest(electronObjDirName)
	);

	// electronパッケージを生成する。
	packager({
		dir: electronObjDirName,
		out: electronDirName,
		name: 'LifeMochiSimulator',
		arch: 'x64',
		platform: 'win32',
		electronVersion: '1.7.6',
		overwrite: true
	}, function (err, path) {
		if (err) console.log(err);
		console.log("Done: " + path);
	});
});
