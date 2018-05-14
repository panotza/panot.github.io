'use strict'

const gulp = require('gulp')
const minify = require('gulp-babel-minify')
const csso = require('gulp-csso')
const del = require('del')
const htmlmin = require('gulp-htmlmin')
const runSequence = require('run-sequence')
const rev = require('gulp-rev')
const revReplace = require('gulp-rev-replace')
const path = require('path')

const DEST = path.join(__dirname, 'dist')

gulp.task('scripts', () => {
  return gulp.src('./script.js')
    .pipe(minify())
    .pipe(rev())
    .pipe(gulp.dest(DEST))
    .pipe(rev.manifest({
      cwd: DEST,
      merge: true // merge with the existing manifest if one exists
    }))
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
    .pipe(rev())
    .pipe(gulp.dest(DEST))
    .pipe(rev.manifest())
    .pipe(gulp.dest(DEST))
})

// Gulp task to replace revision files in html
gulp.task('revreplace', () => {
  const manifest = gulp.src(path.join(DEST, 'rev-manifest.json'))
  return gulp.src(path.join(DEST, 'index.html'))
    .pipe(revReplace({manifest: manifest}))
    .pipe(gulp.dest(DEST))
})

// Clean output directory
gulp.task('clean', () => del([DEST]))

// Gulp task to minify all files
gulp.task('default', ['clean'], () => {
  runSequence(
    'styles',
    'scripts',
    'pages',
    'revreplace'
  )
})
