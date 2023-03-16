const jwt = require('jsonwebtoken');

const validaAcesso = (req, res, next) => {
    const token = req.headers.authorization;

    if (req.path != "/login") {
        jwt.verify(token, process.env.KEY, (err, data) => {
            if (err != null) {
                if (err.message == "jwt expired") {
                    res.redirect('your/404/path.html');
                }
                else res.status(404).json(err).end();
            }
            else {
                if (data.tipo == "user") {
                    res.status(401).end();
                } else {
                    next()
                }
            }
        })
    } else {
        next()
    }
}

module.exports = validaAcesso