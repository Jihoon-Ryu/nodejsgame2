import gulp from "gulp";
import sass from "gulp-sass";

//assets => static

const paths = {
    styles: {
        src: "assets/scss/styles.scss",
        dest: "src/static/styles"
    }
};

//assets(src)에 들렀다가 => sass변환 => static(dest)에 감.
export function styles() {
    return gulp.src(paths.styles.src, {allowEmpty:true}).pipe(sass()).pipe(gulp.dest(paths.styles.dest));
}