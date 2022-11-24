import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ValidationError } from 'joi';
import { setTimesTamp, createNotification } from '../../common/common-functions';
import { ERROR, FORGOT_PASSWORD, LOGIN, NOTIFICATION_MESSAGE, REGISTER } from '../../common/global-constants';
import { getJwtF } from '../../helpers/jwt.helper';
import { expiredValidSession } from '../../helpers/session.helper';
import { forgotPasswordSchema } from '../../helpers/validation/forgot-password.validation';
import { logsErrorAndUrl, responseGenerators, responseValidation } from '../../lib';
import User from '../../models/user.model';


export const forgotPassword = async (req: Request, res: Response) => {
  try {
    await forgotPasswordSchema.validateAsync(req.body);
    const { email } = req.body;
    const findCredential = await User.findOne({ email: email })

    if (!findCredential) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send(responseGenerators({}, StatusCodes.BAD_REQUEST, FORGOT_PASSWORD.INVALID_EMAIL, true));
    }

    if (findCredential) {
      let forgotPasswordToken = getJwtF({
        email: email,
        userId: findCredential.public_id
      });
      // find user by email and update token
      await User.findOneAndUpdate({ email: email },
        {
          forgot_password_token: forgotPasswordToken,
          updated_by: '',
          updated_at: setTimesTamp(),
        },
        { new: true },)

      createNotification(findCredential.public_id, NOTIFICATION_MESSAGE.FORGOT_PASSWORD)

      return res
        .status(StatusCodes.OK)
        .send(responseGenerators({}, StatusCodes.OK, FORGOT_PASSWORD.EMAIL_SENT_SUCCESS, false));
    }


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
