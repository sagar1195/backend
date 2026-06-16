import bcrypt from "bcrypt";
import { User } from "../../models/user.model.js";
import { AppError } from "../../utils/error.util.js";
import { generateToken } from "../../utils/jwt.util.js";

export const authService = {
  register: async (name: string, email: string, password: string) => {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new AppError("Email already exists", 409);
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashPassword,
    });

    return user;
  },
  login: async (email: string, password: string) => {
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      throw new AppError("Invalid credentials", 401);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new AppError("Invalid credentials", 401);
    }

    const token = generateToken(user.id);

    return { user, token };
  },
};
