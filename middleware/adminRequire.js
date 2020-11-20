module.exports = function (req, res, next) {
    if (!req.session.currentUser) {
        return res.redirect('/auth/login');
    }
    if (req.session.currentUser.username !== 'admin') {
        return res.redirect('/');
    }
    next();
};