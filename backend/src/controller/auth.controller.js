class AuthController {
    constructor() {
        this.adminPass = process.env.ADMIN_PW;
    }

    authenticateAdmin(req, res, next) {
        this._authenticate(req, res, next, this.adminPass);
    }

    _authenticate(req, res, next, pass) {
        const b64auth = (req.headers.authorization || '').split(' ')[1] || ''
        const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':')

        // user name can be anything. Webapp uses "user" and "admin".
        if (login && password && password === pass) {
            next();
            return;
        }

        res.status(401)
            .send('Authentication failed');
    }
}

module.exports = AuthController;
