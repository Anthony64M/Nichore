import { NextApiRequest, NextApiResponse } from "next";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { User } from "../../entities";
import { BaseController } from "@controllers/BaseController";
import { ARTSY_ERROR } from "@errors";


class AuthController extends BaseController<User> {
  constructor () {
    super(
      User
    )
  }

  authenticate = async (request: NextApiRequest, response: NextApiResponse) => {
    const { email, password } = request.body;

    const user = await this.repository.findOne({ email }); //if user with this email exists

    if (!user) {
      throw new ARTSY_ERROR("EMAIL_OR_PASSWORD_INCORRECT")
    }

    let isPasswordValid = false

    try {
      isPasswordValid = await bcrypt.compare(password, user.password);
    } catch (e) {
      throw new ARTSY_ERROR("EMAIL_OR_PASSWORD_INCORRECT")
    }

    if (!isPasswordValid) {
      throw new ARTSY_ERROR("EMAIL_OR_PASSWORD_INCORRECT")
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET); //creating token

    return response.status(200).json({ user, token });
  }
}

export { AuthController };
