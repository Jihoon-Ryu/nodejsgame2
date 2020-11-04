import gulp from "gulp";
import sass from "gulp-sass";
import autoprefixer from "gulp-autoprefixer";
import minifyCSS from "gulp-csso";
import del from "del";
import bro from "gulp-browserify";
import babel from "babelify";

sass.compiler = require("node-sass");

//명사 정의

const paths = {
    styles: {
        src: "assets/scss/styles.scss",
        dest: "src/static/styles",
        watch: "assets/scss/**/*.scss"
    },
    js: {
      src: "assets/js/main.js",
      dest: "src/static/js",
      watch: "assets/js/**/*.js"
    }
};

//새로 만들기 전에 전에 있던 것 없애기

function clean() {
  return del("src/static");
}

/* 같은의미
const clean =() => del(["src/static"]);
*/ 

//scss => css
//assets(src)에 들렀다가 => sass변환 => static(dest)에 감.
function styles() {
    return gulp
      .src(paths.styles.src, {allowEmpty:true})
      .pipe(sass())
      .pipe(
        autoprefixer({
          browsers: ["last 2 versions"],
          cascade: false
        })
      )
      .pipe(minifyCSS())
      .pipe(gulp.dest(paths.styles.dest));
  }

//browserify : 브라우저js에서 nodejs에서 처럼 require(import)로 module을 가져와 쓸 수 있게 해줌

const js = () => {
  gulp.src(paths.js.src).pipe(
    bro({
      transform: [
        babel.configure({
          presets: ["@babel/preset-env"]
        })
      ]
    })
  ).pipe(gulp.dest(paths.js.dest));
  gulp.watch(paths.js.watch, js);
}

//파일에 변화가 있는지 감시하다, 변화 발생시 styles실행

function watchFiles() {
    gulp.watch(paths.styles.watch, styles);
  }

//다음 순서대로 실행  

const dev = gulp.series([clean, styles, js, watchFiles]);
  
export default dev;