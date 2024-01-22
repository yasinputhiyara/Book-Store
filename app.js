var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");

var db = require("./config/connection");
// const handlebars = require('express-hbs');
var Handlebars = require("handlebars");
var exhbs = require("express-handlebars");



var adminRouter = require("./routes/admin");
var superAdminRouter = require("./routes/superAdmin");
var usersRouter = require("./routes/users");

var app = express();


// view engine setup
app.engine(
  "hbs",
  exhbs.engine({
    extname: "hbs",
    defaultLayout: "layout",
    layoutsDir: __dirname + "/views/layout/",
    partialsDir: __dirname + "/views/partials/",
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowedProtoMethodsByDefault: true,
    },
  })
);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  session({
    secret: "secret-key",
    cookie: { maxAge: 600000 },
    resave: true,
    saveUninitialized: true,
  })
);

app.use(express.static(path.join(__dirname, "public")));



app.use("/super-admin", superAdminRouter);
app.use("/admin", adminRouter);
app.use("/", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
