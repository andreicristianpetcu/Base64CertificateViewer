import gulp from 'gulp'
import gulpSequence from 'gulp-sequence'

gulp.task('build', gulpSequence(
  'clean', [
    'manifest',
    'scripts',
    'copyExternalScripts',
    'styles',
    'pages',
    'locales',
    'images',
    'fonts',
    'chromereload'
  ]
))
