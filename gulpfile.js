// Core modules
var p = require('path')
var ver = require('./package.json').version

// Node modules
var gulp = require('gulp')
var gp_bump = require('gulp-bump')
var gp_clean = require('gulp-clean')
var gp_concat = require('gulp-concat')
var gp_rename = require('gulp-rename')
var gp_uglify = require('gulp-uglify')
var p = require('path')

var build = {
  /**
   * Format build directory path
   */
  path: function(path) {
    if( ! path) path = ''
    return p.join('build', path)
  },


  /**
   * Format version query string
   */
  version: function() {
    return '?v' + ver
  }
}

// Bump version
gulp.task('bump', function(){
  gulp.src(['./bower.json', './package.json'])
  .pipe(gp_bump({
    type:'minor'
  }))
  .pipe(gulp.dest('./'))
})

// Clean build directory
 gulp.task('clean', function () {
  return gulp.src('build', {
    // read: false
  })
  .pipe(gp_clean())
})

// Copy static assets
gulp.task('assets', function() {
  // Manifest
  gulp.src('src/manifest.json')
  .pipe(gulp.dest(build.path()))
  // icons
  gulp.src('src/icons/*')
  .pipe(gulp.dest(build.path('icons')))
})

// Build app JS
gulp.task('js', function() {
  gulp.src([
    'src/js/get-assets.js',
    'src/js/background.js'
  ])
  // .pipe(gp_concat('concat.js'))
  // .pipe(gp_rename('app.js'))
  // .pipe(gp_uglify())
  .pipe(gulp.dest(build.path('js')))
})

// Build vendor JS
gulp.task('vendor-js', function() {
  gulp.src([
    'src/bower_components/jquery/dist/jquery.min.js'
  ])
  .pipe(gp_concat('concat.js'))
  .pipe(gp_rename('vendor.js'))
  .pipe(gp_uglify())
  .pipe(gulp.dest(build.path('js')))
})

// Build task
gulp.task('build', ['assets', 'js', 'vendor-js'])

// Default task
gulp.task('default', ['build'])
