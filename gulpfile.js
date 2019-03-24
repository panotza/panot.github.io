const path = require('path')
const gulp = require('gulp')
const plumber = require('gulp-plumber')
const del = require('del')
const terser = require('gulp-terser')
const htmlmin = require('gulp-htmlmin')
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')
const postcss = require('gulp-postcss')
const rev = require('gulp-rev')
const revRewrite = require('gulp-rev-rewrite')
const revDelete = require('gulp-rev-delete-original')

// constants
const OUT = 'build'

// clean assets
function clean() {
	return del([OUT])
}

function script() {
	return gulp
		.src('./src/*.js')
		.pipe(plumber())
		.pipe(terser())
		.pipe(gulp.dest(OUT))
}

function style() {
	return gulp
		.src('./src/*.css')
		.pipe(plumber())
		.pipe(postcss([autoprefixer(), cssnano()]))
		.pipe(gulp.dest(OUT))
}

function html() {
	return gulp
		.src('src/*.html')
		.pipe(plumber())
		.pipe(htmlmin({ collapseWhitespace: true }))
		.pipe(gulp.dest(OUT))
}

function revision() {
	return gulp
		.src(path.join(OUT, '**/*.{css,js}'))
		.pipe(plumber())
		.pipe(rev())
		.pipe(revDelete())
		.pipe(gulp.dest(OUT))
		.pipe(rev.manifest())
		.pipe(gulp.dest(OUT))
}

function revreplace() {
	const manifest = gulp.src(path.join(OUT, 'rev-manifest.json'))

	return gulp
		.src(path.join(OUT, '*.html'))
		.pipe(plumber())
		.pipe(revRewrite({ manifest }))
		.pipe(gulp.dest(OUT))
}

const build = gulp.series(
	clean,
	gulp.parallel(script, style, html),
	revision,
	revreplace
)

// export tasks
exports.clean = clean
exports.default = build
