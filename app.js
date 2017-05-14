// ************************************************
//              3RD PARTY PACKAGES
// ************************************************
let express = require('express'),
    expressSession = require('express-session'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    passport = require('passport');
    passportLocalMongoose = require('passport-local-mongoose'),
    LocalStrategy = require('passport-local'),
    {mongoose} = require('./db/mongoose'),
    flash = require('connect-flash');

// ************************************************
//              CUSTOM IMPORTS
// ************************************************
let User = require('./models/user.js'),
    IndexRoutes = require('./routes/index.js'),
    AdvertRoutes = require('./routes/adverts.js'),
    BlogRoutes = require('./routes/blogs.js'),
    AndroidRoutes = require('./routes/android.js');

// ************************************************
//              APP USAGE STATEMENTS
// ************************************************
let app = express();

const port = process.env.PORT || 3000;

// Tell the app to use express session to manage cookies/user data etc
app.use(expressSession({
  secret: 'Student Hub Encryption Message',
  resave: false,
  saveUninitialized: false
}));

// Tell the app to use method override to enable HTML put and delete requests
app.use(methodOverride("_method"));
app.use(flash());

// Tell the app to use passport authentication and the local strategy
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Tell the app to set EJS as a view engine,for server side rendering
app.set("view engine", "ejs");

// Tell the app where to find the public folder
app.use(express.static(__dirname + "/public"));

app.use((request, response, next) =>
{
  response.locals.user = request.user;
  response.locals.errorMessage = request.flash("error");
  response.locals.successMessage = request.flash("success");
  response.locals.infoMessage = request.flash("info");
  next();
});

// Tell the app to use body parser
app.use(bodyParser.urlencoded({
  extended: true
}));

// Tell the app where to find the routes
app.use(IndexRoutes);
app.use(AdvertRoutes);
app.use(BlogRoutes);
app.use(AndroidRoutes);

app.listen(port, () =>
{
  console.log(`Server running on port ${port}`)
});
