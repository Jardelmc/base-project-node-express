// src/services/AuthService.js

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserSchema from '../schemas/userSchema';

class AuthService {
  async authenticateUser(email, password) {
    if (!email || !password) {
      throw new Error('Preencha todos os campos');
    }

    const user = await UserSchema.findOne({ email });
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      throw new Error('Senha incorreta');
    }

    const token = jwt.sign({ email }, process.env.SECRET_KEY);

    return {
      name: user.name,
      token,
    };
  }
}

export default new AuthService();
