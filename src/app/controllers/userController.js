import bcrypt from 'bcryptjs';

import UserSchema from '../schemas/userSchema';
import validateUser from '../validations/UserValidation';

class UserController {
  async create(req, res) {
    const user = req.body;

    const isValidUser = await validateUser(user);

    if (isValidUser) {
      user.password_hash = await bcrypt.hash(user.password, 8);

      try {
        await UserSchema.create(user);

        return res
          .status(200)
          .json({ message: 'Usuário cadastrado com sucesso' });
      } catch (error) {
        return res.status(200).json({ err: 'Email já cadastrado' });
      }
    }

    return res.status(400).json({ err: 'Formulário inválido' });
  }
}

export default new UserController();
