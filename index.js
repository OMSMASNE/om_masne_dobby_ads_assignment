const express = require('express');
const express_session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const sqlite3 = require('sqlite3');
const LocalStrategy = require('passport-local');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express_session({ secret: 'tests', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));
app.use(cors());
app.use(cookieParser());

db = new sqlite3.Database('accounts.sql');

db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS users(\
            userID INTEGER PRIMARY KEY,\
            username varchar(255),\
            password varchar(255)\
        );");
});

passport.use(new LocalStrategy(function (username, password, done) {
    db.get('SELECT userID, username, password FROM users WHERE username = ?', username, function(err, row) {
        if (!row)
        {
            console.log("No user found.");
            return done(null, false, { message: 'Incorrect username or password.' });
        }

        if(row.password == password)
        {
            console.log("User logged in.");
            return done(null, row);
        }
        else
        {
            console.log("Password incorrect");
            return done(null, false, { message: 'Incorrect username or password.' });
        }
    });
}));

passport.serializeUser(function(user, done) {
    return done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

app.post('/signup-server', (req, res) => {
    let message = "";

    var username = req.body.username;
    var password = req.body.password;

    db.serialize(() => {
        db.get("SELECT username FROM users WHERE username=?;", username, (err, row) => {
            if(row === undefined)
            {    
                db.run("INSERT INTO users (userID, username, password) VALUES (NULL, ?, ?)", username, password, (err) => {
                    if(err === null)
                    {
                        console.log("User add with username: " + username);
                        message = 'Account created successfully.<br><br>You can now login to your account.';
                        res.send(message);
                    }
                    else
                    {
                        console.log("ERROR: User adding error.");
                        message = 'ERROR: User adding error.';
                        res.send(message);
                    }
                });
            }
            else
            {
                console.log("Username taken.");
                message = 'Username already taken.<br><br>Please try with some other username.';
                res.send(message);
            }
        });
    });
})

app.post('/login-server',
    passport.authenticate('local', { failureRedirect: '/login' }),
    (req, res) => {
        res.cookie('auth', '1');
        res.redirect('/main')
    }
)

app.post('/logout-server', (req, res) => {

    // req.logout();

    res.cookie('cookieName', '', {
        maxAge: 0,
        overwrite: true,
    });

    res.cookie('auth', '0', { maxAge: 0 });

    res.redirect('/');
});

app.post('/test', (req, res) => {
    res.send("OK!");
});

app.use('/', express.static(path.join(__dirname, 'frontend', 'build')));

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
});

const port = process.env.PORT || 8080;

app.listen(port);

console.log("App is listening on port: " + port);
