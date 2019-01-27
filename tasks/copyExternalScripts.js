import gulp from 'gulp'
import args from './lib/args'

gulp.task('copyExternalScripts', () => {
  return gulp.src('node_modules/node-forge/dist/forge.min.js')
    .pipe(gulp.dest(`dist/${args.vendor}/scripts`))
})
