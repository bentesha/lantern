const rename = require("gulp-rename");
const sass = require("gulp-sass");
const path = require("path");
const gulp = require("gulp");

gulp.task("sass", function() {
  return gulp
    .src("admin/styles/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(rename("style.css"))
    .pipe(gulp.dest("admin/public/css"));
});

gulp.task("js", function() {
  return gulp
    .src("admin/scripts/**/*.js")
    .pipe(gulp.dest("admin/public/js"));
});

gulp.task("watch", function(){
  gulp.watch("admin/scripts/**/*.js", ["js"]);
  gulp.watch("admin/styles/**/*.scss", ["sass"]);
})

gulp.task("default", ["sass", "js", "watch"]);
