// src/controllers/UserController.js
import UserService from '../services/userService';

class UserController {
    async create(req, res) {
        try {
            const user = await UserService.createUser(req.body);
            res.status(201).json({ message: 'Usuário cadastrado com sucesso', user });
        } catch (error) {
            res.status(400).json({ err: error.message });
        }
    }

    async get(req, res) {
        try {
            const user = await UserService.findUserById(req.params.userId);
            res.status(200).json(user);
        } catch (error) {
            res.status(404).json({ err: error.message });
        }
    }

    async update(req, res) {
        try {
            const user = await UserService.updateUser(req.params.userId, req.body);
            res.status(200).json({ message: 'Usuário atualizado com sucesso', user });
        } catch (error) {
            res.status(400).json({ err: error.message });
        }
    }

    async delete(req, res) {
        try {
            await UserService.deleteUser(req.params.userId);
            res.status(200).json({ message: 'Usuário deletado com sucesso' });
        } catch (error) {
            res.status(400).json({ err: error.message });
        }
    }

    async list(req, res) {
        try {
            const users = await UserService.listUsers();
            res.status(200).json(users);
        } catch (error) {
            res.status(400).json({ err: error.message });
        }
    }
}

export default new UserController();
