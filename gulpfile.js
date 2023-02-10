import gulp from 'gulp';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import { deleteAsync } from 'del';
import rename from 'gulp-rename';
import GulpCleanCss from 'gulp-clean-css';

const sass = gulpSass(dartSass);
const paths = {
  styles: {
    src: 'src/styles/*.scss',
    dest: 'dist/css/'
  },
  // scripts: {
  //   src: 'src/scripts/*.js',
  //   dest: 'dist/js/'
  // }
}

export function clean() {
  return deleteAsync(['dist']);
}

export function styles() {
  return gulp.src(paths.styles.src)
    .pipe(sass())
    .pipe(GulpCleanCss())
    .pipe(rename({
      basename: "main",
      suffix: ".min"
    }))
    .pipe(gulp.dest(paths.styles.dest))
}

export function watch() {
  gulp.watch(paths.styles.src, styles)
}

export const build = gulp.series(clean, styles, watch);

export default build;