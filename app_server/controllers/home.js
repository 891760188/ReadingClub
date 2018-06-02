module.exports.index = function (req, res) {
    res.render('index', { title: 'Index' });
};

module.exports.books = function (req, res) {
    res.render('books', { title: 'Books'});
};

module.exports.about = function (req, res) {
    res.render('about', { title: 'About' });
};

