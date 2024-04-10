const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = 'jwt_secret_key';
const TOKEN_HEADER_KEY = 'token_header_key';

class AuthController {
    //[POST] /login
    login(req, res) {
        try {
            const { email, password } = req.body;
            if (email === 'zerot.host@gmail.com' && password === 'admin@123') {
                let data = {
                    time: Date(),
                    data: {
                        email: email,
                        role: 'admin',
                    },
                };
                const token = jwt.sign(data, JWT_SECRET_KEY);
                return res.status(200).send(token);
            } else {
                return res.status(401).send({ message: 'Unauthorized' });
            }
        } catch (error) {
            return res.status(401).send(error);
        }
    }
}

module.exports = new AuthController();
