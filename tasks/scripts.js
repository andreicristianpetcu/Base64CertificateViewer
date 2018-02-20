import gulp from 'gulp'
import gulpif from 'gulp-if'
import {
  log,
  colors
} from 'gulp-util'
import gp_concat from 'gulp-concat'
import named from 'vinyl-named'
import webpack from 'webpack'
import gulpWebpack from 'webpack-stream'
import plumber from 'gulp-plumber'
import livereload from 'gulp-livereload'
import args from './lib/args'

const ENV = args.production ? 'production' : 'development'

gulp.task('scripts', (cb) => {
  return gulp.src([
      'app/scripts/forge.min.js',
      'app/scripts/background.js'
    ])
    .pipe(plumber({
      errorHandler() {}
    }))
    .pipe(named())
    .pipe(gp_concat('concatenated_background.js'))
    .pipe(gulp.dest(`dist/${args.vendor}/scripts`))
    .pipe(gulpif(args.watch, livereload()))
});