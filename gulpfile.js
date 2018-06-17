const rename = require("gulp-rename");
const sass = require("gulp-sass");
const path = require("path");
const gulp = require("gulp");

gulp.task("sass", function() {
  return gulp
    .src("styles/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(rename("style.css"))
    .pipe(gulp.dest("public/css"));
});

gulp.task("js", function() {
  return gulp
    .src("scripts/**/*.js")
    .pipe(gulp.dest("public/js"));
});

gulp.task("watch", function(){
  gulp.watch("scripts/**/*.js", ["js"]);
  gulp.watch("styles/**/*.scss", ["sass"]);
})

gulp.task("default", ["sass", "js", "watch"]);
