'use strict'

const gulp = require('gulp')
const uglify = require('gulp-uglify')
const csso = require('gulp-csso')
const del = require('del')
const htmlmin = require('gulp-htmlmin')
const runSequence = require('run-sequence')

const DEST = './dist/'

gulp.task('scripts', () => {
  return gulp.src('./script.js')
    .pipe(uglify())
    .pipe(gulp.dest(DEST))
})

// Gulp task to minify HTML files
gulp.task('pages', () => {
  return gulp.src(['./index.html'])
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true
    }))
    .pipe(gulp.dest(DEST))
})

// Gulp task to minify CSS files
gulp.task('styles', function () {
  return gulp.src('./styles.css')
    .pipe(csso())
    .pipe(gulp.dest(DEST))
})

// Clean output directory
gulp.task('clean', () => del([DEST]))

// Gulp task to minify all files
gulp.task('default', ['clean'], () => {
  runSequence(
    'styles',
    'scripts',
    'pages'
  )
})
