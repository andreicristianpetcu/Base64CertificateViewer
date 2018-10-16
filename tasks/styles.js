import gulp from 'gulp'
import gulpif from 'gulp-if'
import livereload from 'gulp-livereload'
import args from './lib/args'

gulp.task('styles', () => {
  return gulp.src(['app/styles/*.css'])
    .pipe(gulp.dest(`dist/${args.vendor}/styles`))
    .pipe(gulpif(args.watch, livereload()))
})
