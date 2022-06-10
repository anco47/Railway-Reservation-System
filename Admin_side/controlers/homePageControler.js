


let getHomePage = (req, res) => {
    return res.render('homepage', {
        user: req.user
    });
}


exports = module.exports = {
    getHomePage
}
