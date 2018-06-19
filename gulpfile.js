const rename = require("gulp-rename");
const sass = require("gulp-sass");
const path = require("path");
const gulp = require("gulp");
const log = require("gulplog");
const browserify = require("browserify");
const vueify = require("vueify");
const source = require("vinyl-source-stream");
const sourcemaps = require("gulp-sourcemaps");
const babelify = require("babelify");
const buffer = require("vinyl-buffer");

gulp.task("sass", function() {
  return gulp
    .src("styles/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(rename("style.css"))
    .pipe(gulp.dest("public/css"));
});

gulp.task("js", function() {
  return browserify("scripts/app.js")
    .transform(vueify)
    .transform(babelify.configure({
      presets: ["env"]
    }))
    .bundle()
    .on("error", function(error){
      log.error("Browserify Error", error.message);
      this.emit("end");
    })
    .pipe(source("main.js"))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest("public/js"));
});

gulp.task("watch", function() {
  gulp.watch("scripts/**/*", ["js"]);
  gulp.watch("styles/**/*.scss", ["sass"]);
});

gulp.task("default", ["sass", "js", "watch"]);
