import gulp from 'gulp'
import gulpif from 'gulp-if'
import {
  log,
  colors
} from 'gulp-util'
import livereload from 'gulp-livereload'
import args from './lib/args'

const ENV = args.production ? 'production' : 'development'

gulp.task('scripts', () => {
  return gulp.src(['app/scripts/**/*.js'])
    .pipe(gulp.dest(`dist/${args.vendor}/scripts`))
    .pipe(gulpif(args.watch, livereload()))
})
