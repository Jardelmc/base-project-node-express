import AuthService from '../services/authService';

class SessionController {
    async create(req, res) {
        try {
            const { email, password } = req.body;
            const signedUser = await AuthService.authenticateUser(email, password);
            res.status(200).json(signedUser);
        } catch (error) {
            res.status(400).json({ err: error.message });
        }
    }
}

export default new SessionController();