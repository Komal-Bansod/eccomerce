import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ValidationError } from 'joi';
import { comparePassword, generatePublicId, setTimesTamp, createNotification } from '../../common/common-functions';
import { ERROR, LOGIN, NOTIFICATION_MESSAGE  } from '../../common/global-constants';
import { getJwt, getRefreshJwt } from '../../helpers/jwt.helper';
import { expiredValidSession } from '../../helpers/session.helper';
import { loginSchema } from '../../helpers/validation/auth.validation';
import { logsErrorAndUrl, responseGenerators, responseValidation } from '../../lib';
import Sessions from '../../models/session.model';
import User from '../../models/user.model';

export const loginHandler = async (req: Request, res: Response) => {
  try {
    await loginSchema.validateAsync(req.body);
    const { email, password } = req.body;

    const user = await User.aggregate([
      {
        $lookup: {
          from: 'roles',
          localField: 'role_id',
          foreignField: 'public_id',
          as: 'role',
          pipeline: [{ $project: { name: 1, public_id: 1, _id: 0, permissions: 1 } }],
        },
      },
      {
        $match: {
          email,
          is_deleted: false,
        },
      },
      { $unwind: '$role' },
    ]);


    if (!user[0]) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send(responseValidation(StatusCodes.BAD_REQUEST, LOGIN.USER_NOT_FOUND, true));
    }
    if (!user[0].is_active) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send(responseValidation(StatusCodes.BAD_REQUEST, LOGIN.NOT_ACTIVE_USER, true));
    }

    const isMatch = await comparePassword(password, user[0].password);
    if (!isMatch) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .send(responseValidation(StatusCodes.UNAUTHORIZED, LOGIN.INVALID_CRED, true));
    }
    // generate jwt token
    const jwt = getJwt({
      mobile: user[0].mobile,
      email: user[0].email,
      first_name: user[0].first_name,
      last_name: user[0].last_name,
      userId: user[0].public_id,
      guideId: user[0].guide_id,
      role: user[0].role.name,
      roleId: user[0].role.public_id,

    });

    // generate jwt refresh token
    const refreshJWT = getRefreshJwt({
      mobile: user[0].mobile,
      email: user[0].email,
      first_name: user[0].first_name,
      last_name: user[0].last_name,
      userId: user[0].public_id,
      role: user[0].role.name,
      roleId: user[0].role.public_id,
    });

    // set expired session
    expiredValidSession({
      userId: user[0].public_id,
      userType: user[0].role.role_name,
    });

    // create session
    await new Sessions({
      access_token: jwt,
      refresh_token: refreshJWT,
      user_type: user[0].role.role_name,
      user_agent: req.headers['user-agent'],
      created_by: user[0].public_id,
      user_id: user[0].public_id,
      is_expired: false,
      created_at: setTimesTamp(),
      public_id: generatePublicId(),
    }).save();

    // set user data
    const userData = {
      user_id: user[0].public_id,
      first_name: user[0].first_name,
      last_name: user[0].last_name,
      email: user[0].email,
      role: user[0].role.name,
    };
    createNotification(user[0].public_id,NOTIFICATION_MESSAGE.USER_LOGIN)

    return res
      .status(StatusCodes.OK)
      .send(responseGenerators(userData, StatusCodes.OK, LOGIN.SUCCESS, false, jwt, refreshJWT));
  } catch (error) {
    // set logs Error function
    logsErrorAndUrl(req, error);
    if (error instanceof ValidationError) {
      return res.status(StatusCodes.BAD_REQUEST).send(responseValidation(StatusCodes.BAD_REQUEST, error.message, true));
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(responseGenerators({}, StatusCodes.INTERNAL_SERVER_ERROR, ERROR.INTERNAL_SERVER_ERROR, true));
  }
};
