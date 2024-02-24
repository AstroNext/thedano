module.exports = (req, res, next) => {
    if (!req.session.isLoggedIn) {
        return res.redirect("/login");
    }
    res.locals.isLoggedIn = req.session.isLoggedIn
    res.locals.user = req.session.user
    next();
};