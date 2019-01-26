import gulp from 'gulp'

gulp.task('copyExternalScripts', () => {
  return gulp.src('node_modules/node-forge/dist/forge.min.js')
    .pipe(gulp.dest(`app/scripts`))
})
