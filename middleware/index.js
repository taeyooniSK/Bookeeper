module.exports = {
    isLoggedIn(req, res, next){
        if(req.isAuthenticated()){
            return next();
        }
        req.flash("error", "Please login to see the page");
        res.redirect("/login");
    }
}