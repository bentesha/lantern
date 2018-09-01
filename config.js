module.exports = {
  port: 8080,
  session: {
    secret: "xsjd83s?x/s3ywy9s948"
  },
  templates: {
    path: "views",
    watch: true,
    extension: ".html"
  },
  urls: {
    login: "/login",
    home: "/"
  },
  db: 'development'
};