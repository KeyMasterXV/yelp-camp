const express = require("express"),
      app = express(),
      bodyParser = require("body-parser"),
      mongoose = require("mongoose"),
      passport = require("passport"),
      LocalStrategy = require("passport-local"),
      methodOverride = require("method-override"),
      flash = require("connect-flash");

const User = require("./models/user"),
      seedDB = require("./seeds");

const campgroundRoutes = require("./routes/campgrounds"),
      commentRoutes = require("./routes/comments"),
      indexRoutes = require("./routes/index");

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true});

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
app.use(require("express-session")({
    secret: "secret secret secret",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
})

app.use(indexRoutes);
app.use(campgroundRoutes);
app.use(commentRoutes);

app.listen(8080, () => {
    console.log("CONNECTED");
});