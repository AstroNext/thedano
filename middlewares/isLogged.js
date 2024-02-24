module.exports = (req, res, next) => {
    if(req && req.session && req.session.isLoggedIn != "undefined"){
        if (!req.session.isLoggedIn) {
            res.locals.isLoggedIn = false
            next();
        } else {
            res.locals.isLoggedIn = req.session.isLoggedIn
            res.locals.user = req.session.user
            next();
        }
    }
    next();
};