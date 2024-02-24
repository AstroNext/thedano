module.exports = function(req, res, next) {
    var _render = res.render;
    res.render = function(view, options, fn) {
        options = options ? options : {};
        options['page'] = req.app.get(view) ? req.app.get(view) : req.app.get('404');
        _render.call(this, req.app.get('rootLayout'), options, fn);
    }
    next();
}