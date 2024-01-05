// src/services/UserService.js
import bcrypt from 'bcryptjs';
import UserSchema from '../schemas/userSchema';
import validateUser from '../validations/userValidation';

class UserService {
  async createUser(userData) {
    const isValidUser = await validateUser(userData);

    if (!isValidUser) {
      throw new Error('Formulário inválido');
    }

    userData.password_hash = await bcrypt.hash(userData.password, 8);

    try {
      const user = await UserSchema.create(userData);
      delete user.password_hash;
      return user;
    } catch (error) {
      if (error.code === 11000) {
        // MongoDB duplicate key error
        throw new Error('Email já cadastrado');
      }
      throw error;
    }
  }

  async findUserById(userId) {
    const user = await UserSchema.findById(userId);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }
    return user;
  }

  async updateUser(userId, updateData) {
    const user = await this.findUserById(userId);
    Object.assign(user, updateData);
    await user.save();
    return user;
  }

  async deleteUser(userId) {
    const user = await this.findUserById(userId);
    await user.remove();
    return user;
  }

  async listUsers() {
    const users = await UserSchema.find({});
    return users;
  }
}

export default new UserService();
