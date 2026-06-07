const session = require('express-session');

const sessionMiddleware = session({
    secret: process.env.SESSION_SECRET || 'default_secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // 1 day
    }
});

const login = (req, res) => {
    const { username, password } = req.body;
    // Here you would typically validate the user credentials
    // For demonstration, we'll assume a successful login
    req.session.user = { username };
    res.status(200).json({ message: 'Login successful', user: req.session.user });
};

const logout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ message: 'Logout failed' });
        }
        res.status(200).json({ message: 'Logout successful' });
    });
};

const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
};

module.exports = {
    sessionMiddleware,
    login,
    logout,
    isAuthenticated
};